import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { sheetLayoutData } from '../data/sheetLayoutData.js'
import { roomBounds3D } from '../data/floorData.js'
import { Eye, Layers, Compass, Play, Pause, ChevronLeft, ChevronRight, Info, CheckCircle2, Scissors, HelpCircle } from 'lucide-react'

export const FloorPlan3D = ({ activeStep, setActiveStep }) => {
  const mountRef = useRef(null)
  const [activeLayer, setActiveLayer] = useState('plywood') // 'plywood' | 'lifeproof' | 'subfloor'
  const [showWalls, setShowWalls] = useState(true)
  const [selectedSheet, setSelectedSheet] = useState(sheetLayoutData[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [cameraMode, setCameraMode] = useState('3d') // '3d' | 'top'

  const sceneRef = useRef(null)
  const cameraRef = useRef(null)
  const controlsRef = useRef(null)
  const rendererRef = useRef(null)
  const sheetMeshesRef = useRef([])
  const lifeproofGroupRef = useRef(null)
  const subfloorGroupRef = useRef(null)
  const plywoodGroupRef = useRef(null)
  const wallsGroupRef = useRef(null)

  // Auto-play progression
  useEffect(() => {
    let interval = null
    if (isPlaying) {
      interval = setInterval(() => {
        setActiveStep(prev => {
          if (prev >= sheetLayoutData.length) {
            setIsPlaying(false)
            return prev
          }
          return prev + 1
        })
      }, 1200)
    }
    return () => clearInterval(interval)
  }, [isPlaying, setActiveStep])

  // Sync selected sheet with activeStep
  useEffect(() => {
    const sheet = sheetLayoutData.find(s => s.stepNumber === activeStep)
    if (sheet) {
      setSelectedSheet(sheet)
    }
  }, [activeStep])

  // Three.js Scene Setup
  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    const width = container.clientWidth
    const height = container.clientHeight || 550

    // Scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x090d16) // deep slate background
    sceneRef.current = scene

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.5, 200)
    camera.position.set(18, 26, 22)
    cameraRef.current = camera

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    container.innerHTML = ''
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.08
    controls.maxPolarAngle = Math.PI / 2 - 0.05
    controls.minDistance = 6
    controls.maxDistance = 55
    controls.target.set(0, 0, -2)
    controlsRef.current = controls

    // Ambient & Directional Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75)
    scene.add(ambientLight)

    const dirLight = new THREE.DirectionalLight(0xfff8ee, 1.2)
    dirLight.position.set(15, 30, 20)
    dirLight.castShadow = true
    dirLight.shadow.mapSize.width = 2048
    dirLight.shadow.mapSize.height = 2048
    dirLight.shadow.bias = -0.0005
    scene.add(dirLight)

    const fillLight = new THREE.DirectionalLight(0x88bbff, 0.4)
    fillLight.position.set(-20, 20, -20)
    scene.add(fillLight)

    // Foundation Base Ground
    const groundGeo = new THREE.PlaneGeometry(60, 60)
    const groundMat = new THREE.MeshStandardMaterial({ color: 0x070a10, roughness: 0.9 })
    const ground = new THREE.Mesh(groundGeo, groundMat)
    ground.rotation.x = -Math.PI / 2
    ground.position.y = -0.15
    ground.receiveShadow = true
    scene.add(ground)

    // Grid Floor Guide
    const grid = new THREE.GridHelper(50, 50, 0x1e293b, 0x0f172a)
    grid.position.y = -0.12
    scene.add(grid)

    // Groups
    const subfloorGroup = new THREE.Group()
    const plywoodGroup = new THREE.Group()
    const lifeproofGroup = new THREE.Group()
    const wallsGroup = new THREE.Group()

    scene.add(subfloorGroup)
    scene.add(plywoodGroup)
    scene.add(lifeproofGroup)
    scene.add(wallsGroup)

    subfloorGroupRef.current = subfloorGroup
    plywoodGroupRef.current = plywoodGroup
    lifeproofGroupRef.current = lifeproofGroup
    wallsGroupRef.current = wallsGroup

    // 1. BUILD SUBFLOOR (1x6 diagonal slats over joists)
    // Slat boards running at 45° angle across rooms
    const slatMat = new THREE.MeshStandardMaterial({ color: 0x855331, roughness: 0.85 })
    const joistMat = new THREE.MeshStandardMaterial({ color: 0x4a3525, roughness: 0.9 })

    // Floor joists running north-south under diagonal slats
    for (let x = -13.5; x <= 13.5; x += 1.33) { // 16" on-center = 1.33 ft
      const joistGeo = new THREE.BoxGeometry(0.12, 0.15, 30)
      const joistMesh = new THREE.Mesh(joistGeo, joistMat)
      joistMesh.position.set(x, -0.08, -3)
      subfloorGroup.add(joistMesh)
    }

    // 1x6 diagonal slats (5.5" width slats at 45 degrees)
    for (let offset = -35; offset <= 35; offset += 0.52) { // 0.52 ft = ~6 inches
      const slatGeo = new THREE.BoxGeometry(0.48, 0.05, 38)
      const slatMesh = new THREE.Mesh(slatGeo, slatMat)
      slatMesh.position.set(0, 0, -3)
      slatMesh.rotation.y = Math.PI / 4 // 45 degrees
      slatMesh.position.x = offset * 0.707
      slatMesh.position.z = -offset * 0.707 - 3
      slatMesh.receiveShadow = true
      subfloorGroup.add(slatMesh)
    }

    // 2. BUILD PLYWOOD UNDERLAYMENT SHEETS (4x8 BCX Fir)
    sheetMeshesRef.current = []
    sheetLayoutData.forEach((sheet) => {
      const { x, z, w, d } = sheet.targetCoords
      const sheetGeo = new THREE.BoxGeometry(w - 0.04, 0.08, d - 0.04) // gap visualizer

      // Color coding: Full sheet = vibrant emerald/teal, Cut sheet = warm amber/orange
      const isFull = sheet.status === 'full'
      const baseColor = isFull ? 0x10b981 : 0xf59e0b
      const sheetMat = new THREE.MeshStandardMaterial({
        color: baseColor,
        roughness: 0.65,
        metalness: 0.1
      })

      const mesh = new THREE.Mesh(sheetGeo, sheetMat)
      // center position of sheet box
      mesh.position.set(x + w / 2, 0.06, z + d / 2)
      mesh.castShadow = true
      mesh.receiveShadow = true
      mesh.userData = { sheet }

      // Outline edge lines
      const edges = new THREE.EdgesGeometry(sheetGeo)
      const lineMat = new THREE.LineBasicMaterial({ color: isFull ? 0x059669 : 0xd97706, linewidth: 2 })
      const wireframe = new THREE.LineSegments(edges, lineMat)
      mesh.add(wireframe)

      plywoodGroup.add(mesh)
      sheetMeshesRef.current.push(mesh)
    })

    // 3. BUILD LIFEPROOF VINYL PLANK LAYER (Cobblestone)
    const plankMat = new THREE.MeshStandardMaterial({
      color: 0x6e6358, // Cobblestone warm taupe/grey tone
      roughness: 0.45,
      metalness: 0.05
    })
    // Generate staggered planks covering included rooms
    Object.entries(roomBounds3D).forEach(([roomId, b]) => {
      if (roomId === 'bath-5pc' || roomId === 'bath-closet' || roomId === 'stairs') return

      const roomPlankGeo = new THREE.BoxGeometry(b.w - 0.08, 0.04, b.d - 0.08)
      const roomPlankMesh = new THREE.Mesh(roomPlankGeo, plankMat)
      roomPlankMesh.position.set(b.x + b.w / 2, 0.12, b.z + b.d / 2)
      roomPlankMesh.receiveShadow = true

      // Texture seam lines
      const plankEdges = new THREE.EdgesGeometry(roomPlankGeo)
      const edgeLine = new THREE.LineSegments(plankEdges, new THREE.LineBasicMaterial({ color: 0x473e35 }))
      roomPlankMesh.add(edgeLine)

      lifeproofGroup.add(roomPlankMesh)
    })

    // Excluded Bath Floor (Slate Blue with Hatch lines)
    const bathBounds = roomBounds3D['bath-5pc']
    const bathGeo = new THREE.BoxGeometry(bathBounds.w, 0.07, bathBounds.d)
    const bathMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.5 })
    const bathMesh = new THREE.Mesh(bathGeo, bathMat)
    bathMesh.position.set(bathBounds.x + bathBounds.w / 2, 0.05, bathBounds.z + bathBounds.d / 2)
    wallsGroup.add(bathMesh)

    // Bath Closet
    const bathCloBounds = roomBounds3D['bath-closet']
    const bathCloGeo = new THREE.BoxGeometry(bathCloBounds.w, 0.07, bathCloBounds.d)
    const bathCloMesh = new THREE.Mesh(bathCloGeo, bathMat)
    bathCloMesh.position.set(bathCloBounds.x + bathCloBounds.w / 2, 0.05, bathCloBounds.z + bathCloBounds.d / 2)
    wallsGroup.add(bathCloMesh)

    // Stairs Opening ("DN")
    const stairBounds = roomBounds3D['stairs']
    const stairGeo = new THREE.BoxGeometry(stairBounds.w, 0.02, stairBounds.d)
    const stairMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.9 })
    const stairMesh = new THREE.Mesh(stairGeo, stairMat)
    stairMesh.position.set(stairBounds.x + stairBounds.w / 2, -0.05, stairBounds.z + stairBounds.d / 2)
    wallsGroup.add(stairMesh)

    // 4. BUILD 3D WALLS & ROOM PARTITIONS (Glassmorphism transparent walls)
    const wallMat = new THREE.MeshPhysicalMaterial({
      color: 0x94a3b8,
      transparent: true,
      opacity: 0.25,
      roughness: 0.2,
      transmission: 0.4,
      thickness: 0.5
    })
    const wallHeight = 2.2
    const wallThick = 0.35

    const createWall = (x, z, w, d) => {
      const geo = new THREE.BoxGeometry(w, wallHeight, d)
      const mesh = new THREE.Mesh(geo, wallMat)
      mesh.position.set(x + w / 2, wallHeight / 2, z + d / 2)
      mesh.castShadow = true
      wallsGroup.add(mesh)
    }

    // Exterior Perimeter Walls
    createWall(-13.5, -16.0, 26.5, wallThick) // North wall
    createWall(-13.5, -16.0, wallThick, 22.85) // West wall
    createWall(13.0, -16.0, wallThick, 25.4) // East wall
    createWall(-13.5, 6.85, 10.0, wallThick) // South Bed 3 wall
    createWall(1.5, 9.4, 11.5, wallThick) // South Bath wall

    // Interior dividing walls
    createWall(1.5, -16.0, wallThick, 15.5) // Primary / Hallway divider
    createWall(-13.5, -7.0, 10.0, wallThick) // Bed 2 / Bed 3 divider
    createWall(-3.5, -16.0, wallThick, 9.0) // Bed 2 / Hallway divider
    createWall(-3.5, -4.4, wallThick, 11.25) // Bed 3 / Hallway divider
    createWall(1.5, 2.3, 11.5, wallThick) // Primary / Bath divider

    // Starting Point Marker in Primary Bedroom Outside Corner (User's planned start)
    const startPinGeo = new THREE.CylinderGeometry(0.3, 0.02, 1.2, 16)
    const startPinMat = new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0xb91c1c, emissiveIntensity: 0.8 })
    const startPin = new THREE.Mesh(startPinGeo, startPinMat)
    startPin.position.set(11.0, 1.0, -14.0)
    startPin.rotation.x = Math.PI
    scene.add(startPin)

    // Raycaster for sheet clicking
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    const onPointerDown = (event) => {
      const rect = renderer.domElement.getBoundingClientRect()
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(sheetMeshesRef.current, false)

      if (intersects.length > 0) {
        const hit = intersects[0].object
        if (hit.userData && hit.userData.sheet) {
          setSelectedSheet(hit.userData.sheet)
          setActiveStep(hit.userData.sheet.stepNumber)
        }
      }
    }

    renderer.domElement.addEventListener('pointerdown', onPointerDown)

    // Animation Loop
    let animId
    const animate = () => {
      animId = requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    // Resize Handler
    const handleResize = () => {
      if (!container) return
      const w = container.clientWidth
      const h = container.clientHeight || 550
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animId)
      renderer.domElement.removeEventListener('pointerdown', onPointerDown)
      renderer.dispose()
    }
  }, [])

  // Update Layer Visibility
  useEffect(() => {
    if (subfloorGroupRef.current) {
      subfloorGroupRef.current.visible = activeLayer === 'subfloor'
    }
    if (plywoodGroupRef.current) {
      plywoodGroupRef.current.visible = activeLayer === 'plywood'
    }
    if (lifeproofGroupRef.current) {
      lifeproofGroupRef.current.visible = activeLayer === 'lifeproof'
    }
  }, [activeLayer])

  // Update Wall Visibility
  useEffect(() => {
    if (wallsGroupRef.current) {
      wallsGroupRef.current.visible = showWalls
    }
  }, [showWalls])

  // Update Sheet Highlight & Step Progression Visibility
  useEffect(() => {
    if (!sheetMeshesRef.current || sheetMeshesRef.current.length === 0) return

    sheetMeshesRef.current.forEach((mesh) => {
      const sheet = mesh.userData.sheet
      // Visibility based on step scrubber
      const isLaid = sheet.stepNumber <= activeStep
      mesh.visible = isLaid

      // Highlight active sheet
      const isCurrent = sheet.stepNumber === activeStep
      const isFull = sheet.status === 'full'

      if (isCurrent) {
        mesh.material.color.setHex(0x38bdf8) // bright cyan/sky blue
        mesh.material.emissive.setHex(0x0284c7)
        mesh.material.emissiveIntensity = 0.6
      } else {
        mesh.material.color.setHex(isFull ? 0x10b981 : 0xf59e0b)
        mesh.material.emissive.setHex(0x000000)
        mesh.material.emissiveIntensity = 0
      }
    })
  }, [activeStep])

  // Camera Presets
  const setCameraPreset = (mode) => {
    setCameraMode(mode)
    if (!cameraRef.current || !controlsRef.current) return

    if (mode === 'top') {
      // Top-Down Orthographic feel
      cameraRef.current.position.set(0, 36, -3.5)
      controlsRef.current.target.set(0, 0, -3.5)
    } else if (mode === '3d') {
      // 3D Perspective angle
      cameraRef.current.position.set(18, 26, 22)
      controlsRef.current.target.set(0, 0, -2)
    } else if (mode === 'primary') {
      // Focused on Primary Bedroom corner start
      cameraRef.current.position.set(16, 14, -6)
      controlsRef.current.target.set(7.5, 0, -8)
    } else if (mode === 'hallway') {
      // Focused on Central Hallway & transitions
      cameraRef.current.position.set(-1, 16, 12)
      controlsRef.current.target.set(-1, 0, 0)
    }
  }

  return (
    <div className="space-y-6">
      {/* 3D Visualizer Canvas & Controls Bar */}
      <div className="relative rounded-2xl overflow-hidden glass-panel border border-slate-800 shadow-2xl">
        {/* Top Floating Header & Layer Switcher */}
        <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
          {/* Layer Selector */}
          <div className="flex items-center space-x-1.5 p-1 rounded-xl bg-slate-900/90 border border-slate-700/80 backdrop-blur-md pointer-events-auto shadow-lg">
            <button
              onClick={() => setActiveLayer('plywood')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeLayer === 'plywood'
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>1/2" Plywood Cuts</span>
            </button>
            <button
              onClick={() => setActiveLayer('lifeproof')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeLayer === 'lifeproof'
                  ? 'bg-blue-500 text-white shadow'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>LifeProof LVP</span>
            </button>
            <button
              onClick={() => setActiveLayer('subfloor')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeLayer === 'subfloor'
                  ? 'bg-amber-700 text-white shadow'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>1×6 Slat Subfloor</span>
            </button>
          </div>

          {/* Camera View Presets */}
          <div className="flex items-center space-x-2 pointer-events-auto">
            <div className="flex items-center space-x-1 p-1 rounded-xl bg-slate-900/90 border border-slate-700/80 backdrop-blur-md text-xs font-mono">
              <button
                onClick={() => setCameraPreset('3d')}
                className={`px-2.5 py-1 rounded-lg transition ${cameraMode === '3d' ? 'bg-slate-700 text-white font-bold' : 'text-slate-400 hover:text-slate-200'}`}
              >
                3D View
              </button>
              <button
                onClick={() => setCameraPreset('top')}
                className={`px-2.5 py-1 rounded-lg transition ${cameraMode === 'top' ? 'bg-slate-700 text-white font-bold' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Top Blueprint
              </button>
              <button
                onClick={() => setCameraPreset('primary')}
                className={`px-2.5 py-1 rounded-lg transition ${cameraMode === 'primary' ? 'bg-slate-700 text-white font-bold' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Primary Corner
              </button>
              <button
                onClick={() => setCameraPreset('hallway')}
                className={`px-2.5 py-1 rounded-lg transition ${cameraMode === 'hallway' ? 'bg-slate-700 text-white font-bold' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Hallway Hub
              </button>
            </div>

            <button
              onClick={() => setShowWalls(!showWalls)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border backdrop-blur-md transition ${
                showWalls
                  ? 'bg-slate-800/90 border-slate-600 text-white'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400'
              }`}
            >
              {showWalls ? 'Hide Walls' : 'Show Walls'}
            </button>
          </div>
        </div>

        {/* 3D WebGL Canvas Mount */}
        <div ref={mountRef} className="w-full h-[520px] sm:h-[600px] cursor-grab active:cursor-grabbing" />

        {/* Legend Overlay at Bottom Left */}
        <div className="absolute bottom-20 left-4 z-20 pointer-events-none hidden sm:block">
          <div className="p-3 rounded-xl bg-slate-900/85 border border-slate-800/80 backdrop-blur-md space-y-1.5 text-xs">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">Color Key</div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-sm bg-emerald-500" />
              <span className="text-slate-300">Full 4x8 Factory Sheet (No cut)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-sm bg-amber-500" />
              <span className="text-slate-300">Custom Cut Sheet (Rip / Cross / Stagger)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-sm bg-sky-400" />
              <span className="text-slate-300">Active Selected Sheet</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-sm bg-red-500" />
              <span className="text-slate-300">Start Point (Primary Outside Wall Corner)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-sm bg-slate-600" />
              <span className="text-slate-400">Excluded Bath & Bath Closet</span>
            </div>
          </div>
        </div>

        {/* Bottom Interactive Progression Scrubber */}
        <div className="absolute bottom-4 left-4 right-4 z-20">
          <div className="p-3 sm:p-4 rounded-xl bg-slate-950/90 border border-slate-800/80 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xl">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`p-2.5 rounded-xl font-bold flex items-center justify-center transition shadow-md ${
                  isPlaying
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-slate-800 hover:bg-slate-700 text-white'
                }`}
                title={isPlaying ? 'Pause sequence' : 'Auto-play sheet placement'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>

              <button
                onClick={() => setActiveStep(prev => Math.max(1, prev - 1))}
                disabled={activeStep <= 1}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 transition"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="text-xs font-mono">
                <span className="text-slate-400">Sheet: </span>
                <span className="text-amber-400 font-bold text-sm">{activeStep}</span>
                <span className="text-slate-500"> / {sheetLayoutData.length}</span>
              </div>

              <button
                onClick={() => setActiveStep(prev => Math.min(sheetLayoutData.length, prev + 1))}
                disabled={activeStep >= sheetLayoutData.length}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 transition"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Slider bar */}
            <div className="flex-1 max-w-md mx-2">
              <input
                type="range"
                min="1"
                max={sheetLayoutData.length}
                value={activeStep}
                onChange={(e) => setActiveStep(parseInt(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                <span>Start: Primary Corner</span>
                <span>Hallway Hub</span>
                <span>Finish: Closets</span>
              </div>
            </div>

            {/* Quick action button to view cuts */}
            <div className="text-xs text-slate-300 flex items-center space-x-2">
              <span className="hidden md:inline text-slate-400">Click any sheet in 3D to inspect cut specs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sheet Cut Inspector Card for Selected Sheet */}
      {selectedSheet && (
        <div className="glass-panel-glow rounded-2xl border p-6 sm:p-8 transition-all duration-300">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-mono font-black text-xl shadow-lg ${
                selectedSheet.status === 'full'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
              }`}>
                #{selectedSheet.sheetNumber}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    Step {selectedSheet.stepNumber} of 20
                  </span>
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                    selectedSheet.status === 'full'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    {selectedSheet.type}
                  </span>
                  <span className="text-xs font-mono text-slate-400">{selectedSheet.room}</span>
                </div>
                <h3 className="text-xl font-bold text-white mt-1">
                  {selectedSheet.position}
                </h3>
              </div>
            </div>

            {/* Quick Dimensions Badge */}
            <div className="flex items-center space-x-3">
              <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-right">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">Installed Size</div>
                <div className="text-lg font-bold font-mono text-amber-400">{selectedSheet.dimsText}</div>
              </div>
              <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-right">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">Paulin Screws</div>
                <div className="text-lg font-bold font-mono text-emerald-400">~{selectedSheet.fastenersCount} pcs</div>
              </div>
            </div>
          </div>

          {/* Cut Specification Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
              <div className="text-xs font-semibold text-amber-400 flex items-center space-x-1.5">
                <Scissors className="w-3.5 h-3.5" />
                <span>Exact Cut Instructions</span>
              </div>
              <p className="text-sm text-slate-200 font-medium leading-relaxed">
                {selectedSheet.cutDimensions}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
              <div className="text-xs font-semibold text-emerald-400 flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Off-Cut & Waste Reutilization</span>
              </div>
              <p className="text-sm text-slate-200 font-medium leading-relaxed">
                {selectedSheet.offcut}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
              <div className="text-xs font-semibold text-blue-400 flex items-center space-x-1.5">
                <Info className="w-3.5 h-3.5" />
                <span>Installation & Gap Rule</span>
              </div>
              <p className="text-sm text-slate-300 text-xs leading-relaxed">
                {selectedSheet.notes}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
