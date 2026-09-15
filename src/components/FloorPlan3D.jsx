import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { sheetLayoutData } from '../data/sheetLayoutData.js'
import { roomBounds3D } from '../data/floorData.js'
import { Eye, Layers, Play, Pause, ChevronLeft, ChevronRight, Info, CheckCircle2, Scissors, MapPin, Image as ImageIcon, Sparkles } from 'lucide-react'

export const FloorPlan3D = ({ activeStep, setActiveStep }) => {
  const mountRef = useRef(null)
  const [activeLayer, setActiveLayer] = useState('plywood') // 'plywood' | 'lifeproof' | 'subfloor'
  const [showWalls, setShowWalls] = useState(true)
  const [showPdfOverlay, setShowPdfOverlay] = useState(false)
  const [selectedSheet, setSelectedSheet] = useState(sheetLayoutData[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [cameraMode, setCameraMode] = useState('3d')

  const sceneRef = useRef(null)
  const cameraRef = useRef(null)
  const controlsRef = useRef(null)
  const rendererRef = useRef(null)
  const sheetMeshesRef = useRef([])
  const lifeproofGroupRef = useRef(null)
  const subfloorGroupRef = useRef(null)
  const plywoodGroupRef = useRef(null)
  const wallsGroupRef = useRef(null)
  const pdfOverlayMeshRef = useRef(null)
  const startPinGroupRef = useRef(null)

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
    const height = container.clientHeight || 580

    // Scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x0a0e17)
    sceneRef.current = scene

    // Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.5, 200)
    camera.position.set(16, 26, 20)
    cameraRef.current = camera

    // Renderer (No shadows to eliminate artifacts)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = false
    container.innerHTML = ''
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.08
    controls.maxPolarAngle = Math.PI / 2 - 0.02
    controls.minDistance = 6
    controls.maxDistance = 60
    controls.target.set(0, 0, -0.6)
    controlsRef.current = controls

    // Soft architectural lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9)
    scene.add(ambientLight)

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x1e293b, 0.55)
    scene.add(hemiLight)

    const keyLight = new THREE.DirectionalLight(0xfff7ed, 0.75)
    keyLight.position.set(15, 30, 20)
    scene.add(keyLight)

    const fillLight = new THREE.DirectionalLight(0x93c5fd, 0.35)
    fillLight.position.set(-20, 25, -20)
    scene.add(fillLight)

    // Base Floor Plate / Grid
    const groundGeo = new THREE.PlaneGeometry(55, 55)
    const groundMat = new THREE.MeshBasicMaterial({ color: 0x070b12 })
    const ground = new THREE.Mesh(groundGeo, groundMat)
    ground.rotation.x = -Math.PI / 2
    ground.position.y = -0.05
    scene.add(ground)

    const grid = new THREE.GridHelper(50, 50, 0x1e293b, 0x0f172a)
    grid.position.y = -0.04
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

    // PDF Blueprint Texture Overlay
    const textureLoader = new THREE.TextureLoader()
    textureLoader.load('/floorplan_cropped.png', (texture) => {
      texture.anisotropy = 16
      const overlayGeo = new THREE.PlaneGeometry(27.1, 25.6)
      const overlayMat = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.85,
        side: THREE.DoubleSide
      })
      const overlayMesh = new THREE.Mesh(overlayGeo, overlayMat)
      overlayMesh.rotation.x = -Math.PI / 2
      overlayMesh.position.set(0.4, 0.015, -0.6)
      overlayMesh.visible = false
      scene.add(overlayMesh)
      pdfOverlayMeshRef.current = overlayMesh
    })

    // 1. SUBFLOOR LAYER (1x6 diagonal slats over joists)
    const slatMat = new THREE.MeshStandardMaterial({ color: 0x855331, roughness: 0.7 })
    const joistMat = new THREE.MeshStandardMaterial({ color: 0x453120, roughness: 0.85 })

    for (let x = -13.5; x <= 13.5; x += 1.33) {
      const joistGeo = new THREE.BoxGeometry(0.12, 0.15, 27)
      const joistMesh = new THREE.Mesh(joistGeo, joistMat)
      joistMesh.position.set(x, -0.06, -0.5)
      subfloorGroup.add(joistMesh)
    }

    for (let offset = -30; offset <= 30; offset += 0.52) {
      const slatGeo = new THREE.BoxGeometry(0.48, 0.03, 34)
      const slatMesh = new THREE.Mesh(slatGeo, slatMat)
      slatMesh.position.set(0, 0, -0.5)
      slatMesh.rotation.y = Math.PI / 4
      slatMesh.position.x = offset * 0.707
      slatMesh.position.z = -offset * 0.707 - 0.5
      subfloorGroup.add(slatMesh)
    }

    // 2. PLYWOOD LAYER - IRREGULAR POLYGONS & RECTANGLES (ZERO OVERLAPS)
    sheetMeshesRef.current = []
    sheetLayoutData.forEach((sheet) => {
      const shape = new THREE.Shape()
      sheet.polygon.forEach(([px, pz], idx) => {
        if (idx === 0) shape.moveTo(px, pz)
        else shape.lineTo(px, pz)
      })
      shape.closePath()

      const extrudeSettings = { depth: 0.06, bevelEnabled: false }
      const sheetGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings)
      sheetGeo.rotateX(Math.PI / 2)
      sheetGeo.translate(0, 0.06, 0)

      const isFull = sheet.status === 'full'
      const baseColor = isFull ? 0x10b981 : 0xf59e0b
      const sheetMat = new THREE.MeshStandardMaterial({
        color: baseColor,
        roughness: 0.55,
        metalness: 0.05
      })

      const mesh = new THREE.Mesh(sheetGeo, sheetMat)
      mesh.userData = { sheet }

      const edges = new THREE.EdgesGeometry(sheetGeo)
      const lineMat = new THREE.LineBasicMaterial({
        color: isFull ? 0x047857 : 0xb45309,
        linewidth: 2.5
      })
      const wireframe = new THREE.LineSegments(edges, lineMat)
      mesh.add(wireframe)

      plywoodGroup.add(mesh)
      sheetMeshesRef.current.push(mesh)
    })

    // 3. LIFEPROOF COBBLESTONE VINYL PLANK LAYER
    const plankMat = new THREE.MeshStandardMaterial({
      color: 0x695e54,
      roughness: 0.45,
      metalness: 0.05
    })
    Object.entries(roomBounds3D).forEach(([roomId, b]) => {
      if (roomId === 'bath-5pc' || roomId === 'bath-closet' || roomId === 'stairs') return

      const roomPlankGeo = new THREE.BoxGeometry(b.w - 0.06, 0.05, b.d - 0.06)
      const roomPlankMesh = new THREE.Mesh(roomPlankGeo, plankMat)
      roomPlankMesh.position.set(b.x + b.w / 2, 0.08, b.z + b.d / 2)

      const plankEdges = new THREE.EdgesGeometry(roomPlankGeo)
      const edgeLine = new THREE.LineSegments(plankEdges, new THREE.LineBasicMaterial({ color: 0x42382f }))
      roomPlankMesh.add(edgeLine)

      lifeproofGroup.add(roomPlankMesh)
    })

    // 4. EXCLUDED 5PC BATHROOM & BATH CLOSET (CRIMSON RED)
    const bathBounds = roomBounds3D['bath-5pc']
    const bathGeo = new THREE.BoxGeometry(bathBounds.w - 0.08, 0.07, bathBounds.d - 0.08)
    const bathMat = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      roughness: 0.4,
      transparent: true,
      opacity: 0.65
    })
    const bathMesh = new THREE.Mesh(bathGeo, bathMat)
    bathMesh.position.set(bathBounds.x + bathBounds.w / 2, 0.05, bathBounds.z + bathBounds.d / 2)
    const bathEdges = new THREE.EdgesGeometry(bathGeo)
    bathMesh.add(new THREE.LineSegments(bathEdges, new THREE.LineBasicMaterial({ color: 0xb91c1c, linewidth: 2.5 })))
    wallsGroup.add(bathMesh)

    const bathCloBounds = roomBounds3D['bath-closet']
    const bathCloGeo = new THREE.BoxGeometry(bathCloBounds.w - 0.08, 0.07, bathCloBounds.d - 0.08)
    const bathCloMesh = new THREE.Mesh(bathCloGeo, bathMat)
    bathCloMesh.position.set(bathCloBounds.x + bathCloBounds.w / 2, 0.05, bathCloBounds.z + bathCloBounds.d / 2)
    const bathCloEdges = new THREE.EdgesGeometry(bathCloGeo)
    bathCloMesh.add(new THREE.LineSegments(bathCloEdges, new THREE.LineBasicMaterial({ color: 0xb91c1c, linewidth: 2.5 })))
    wallsGroup.add(bathCloMesh)

    // Stairs Opening ("DN") with 8 step treads
    const stairBounds = roomBounds3D['stairs']
    for (let i = 0; i < 8; i++) {
      const stepD = stairBounds.d / 8
      const stepGeo = new THREE.BoxGeometry(stairBounds.w - 0.1, 0.02, stepD)
      const stepMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.9 })
      const stepMesh = new THREE.Mesh(stepGeo, stepMat)
      stepMesh.position.set(
        stairBounds.x + stairBounds.w / 2,
        -0.03 - (i * 0.06),
        stairBounds.z + (i * stepD) + stepD / 2
      )
      wallsGroup.add(stepMesh)
    }

    // 5. ARCHITECTURAL WALLS & MASTER CLOSET ENCLOSURE
    const wallMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.8 })
    const interiorWallMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.8 })
    const windowMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.1, transparent: true, opacity: 0.85 })

    const wallHeight = 1.6
    const wallThick = 0.38

    const createWallSegment = (x, z, w, d, isExterior = false) => {
      const geo = new THREE.BoxGeometry(w, wallHeight, d)
      const mesh = new THREE.Mesh(geo, isExterior ? wallMat : interiorWallMat)
      mesh.position.set(x + w / 2, wallHeight / 2, z + d / 2)
      wallsGroup.add(mesh)
      return mesh
    }

    // Exterior Perimeter
    createWallSegment(-13.1, -12.36, 26.2, wallThick, true) // North exterior wall

    // East Exterior Wall with windows
    createWallSegment(12.71, -12.36, wallThick, 6.0, true)
    const eastWinGeo = new THREE.BoxGeometry(wallThick + 0.05, 0.8, 4.0)
    const eastWin = new THREE.Mesh(eastWinGeo, windowMat)
    eastWin.position.set(12.71 + wallThick / 2, wallHeight / 2, -3.5)
    wallsGroup.add(eastWin)
    createWallSegment(12.71, -1.5, wallThick, 6.5, true)
    const bathWinGeo = new THREE.BoxGeometry(wallThick + 0.05, 0.8, 2.5)
    const bathWin = new THREE.Mesh(bathWinGeo, windowMat)
    bathWin.position.set(12.71 + wallThick / 2, wallHeight / 2, 6.5)
    wallsGroup.add(bathWin)
    createWallSegment(12.71, 8.0, wallThick, 3.2, true)

    // West Exterior Wall with windows
    createWallSegment(-13.1, -12.36, wallThick, 4.0, true)
    const b2WinGeo = new THREE.BoxGeometry(wallThick + 0.05, 0.8, 4.5)
    const b2Win = new THREE.Mesh(b2WinGeo, windowMat)
    b2Win.position.set(-13.1 + wallThick / 2, wallHeight / 2, -6.5)
    wallsGroup.add(b2Win)
    createWallSegment(-13.1, -4.0, wallThick, 6.0, true)
    const b3WinGeo = new THREE.BoxGeometry(wallThick + 0.05, 0.8, 4.5)
    const b3Win = new THREE.Mesh(b3WinGeo, windowMat)
    b3Win.position.set(-13.1 + wallThick / 2, wallHeight / 2, 4.5)
    wallsGroup.add(b3Win)
    createWallSegment(-13.1, 7.0, wallThick, 4.2, true)

    // South Exterior Walls
    createWallSegment(-13.1, 11.02, 10.75, wallThick, true)
    createWallSegment(-2.35, 12.8, 3.54, wallThick, true)
    createWallSegment(0.81, 11.02, 12.28, wallThick, true)

    // Interior Walls
    // Divider between Bedroom 2 and Primary (X: 0.81, Z: -11.98 to -2.61)
    createWallSegment(0.81, -11.98, wallThick, 9.37)

    // Bedroom 2 South Wall (stops Hallway from extending north!)
    createWallSegment(-13.1, -2.61, 8.0, wallThick)
    createWallSegment(-0.5, -2.61, 1.31, wallThick) // leaves doorway between -2.35 and -0.5

    // Divider between Hallway and Primary Bedroom
    createWallSegment(0.81, 0.5, wallThick, 0.69) // leaves doorway into Primary

    // MASTER CLOSET ENCLOSURE WALLS
    createWallSegment(0.81, 1.19, 1.8, wallThick) // Left return
    createWallSegment(7.5, 1.19, 2.07, wallThick) // Right return
    const closetHeaderGeo = new THREE.BoxGeometry(4.89, 0.35, wallThick)
    const closetHeader = new THREE.Mesh(closetHeaderGeo, interiorWallMat)
    closetHeader.position.set(2.61 + 4.89 / 2, wallHeight - 0.175, 1.19 + wallThick / 2)
    wallsGroup.add(closetHeader)
    createWallSegment(9.57, 1.19, wallThick, 2.30) // East return wall
    createWallSegment(0.81, 3.49, 11.9, wallThick) // South wall to 5PC Bath

    // Closets between Bedroom 2 and Bedroom 3
    createWallSegment(-13.1, -0.65, 10.75, wallThick)
    createWallSegment(-9.37, -2.61, wallThick, 1.96)
    createWallSegment(-4.35, -2.61, wallThick, 1.96)

    // Bedroom 3 / Hallway divider
    createWallSegment(-2.35, -0.65, wallThick, 2.5)
    createWallSegment(-2.35, 4.5, wallThick, 6.52)

    // Hallway / 5PC Bath divider
    createWallSegment(0.81, 6.5, wallThick, 4.52)

    // 6. EXACT STARTING ARROW PIN (Primary Outside Corner)
    const pinGroup = new THREE.Group()
    startPinGroupRef.current = pinGroup

    const arrowConeGeo = new THREE.ConeGeometry(0.35, 0.8, 16)
    const arrowConeMat = new THREE.MeshBasicMaterial({ color: 0xef4444 })
    const arrowCone = new THREE.Mesh(arrowConeGeo, arrowConeMat)
    arrowCone.rotation.x = Math.PI
    arrowCone.position.set(0, 0.7, 0)
    pinGroup.add(arrowCone)

    const pinStemGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.6, 12)
    const pinStemMat = new THREE.MeshBasicMaterial({ color: 0xffffff })
    const pinStem = new THREE.Mesh(pinStemGeo, pinStemMat)
    pinStem.position.set(0, 1.3, 0)
    pinGroup.add(pinStem)

    const ringGeo = new THREE.RingGeometry(0.3, 0.5, 32)
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xef4444, side: THREE.DoubleSide })
    const ringMesh = new THREE.Mesh(ringGeo, ringMat)
    ringMesh.rotation.x = -Math.PI / 2
    ringMesh.position.set(0, 0.1, 0)
    pinGroup.add(ringMesh)

    pinGroup.position.set(12.71, 0.1, -11.98)
    scene.add(pinGroup)

    // Sheet Click Raycaster
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
    let clock = new THREE.Clock()
    const animate = () => {
      animId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      if (startPinGroupRef.current) {
        startPinGroupRef.current.position.y = 0.1 + Math.sin(t * 3.5) * 0.1
      }

      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      if (!container) return
      const w = container.clientWidth
      const h = container.clientHeight || 580
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
    if (subfloorGroupRef.current) subfloorGroupRef.current.visible = activeLayer === 'subfloor'
    if (plywoodGroupRef.current) plywoodGroupRef.current.visible = activeLayer === 'plywood'
    if (lifeproofGroupRef.current) lifeproofGroupRef.current.visible = activeLayer === 'lifeproof'
  }, [activeLayer])

  // Update Wall Visibility
  useEffect(() => {
    if (wallsGroupRef.current) wallsGroupRef.current.visible = showWalls
  }, [showWalls])

  // Update Blueprint Texture Visibility
  useEffect(() => {
    if (pdfOverlayMeshRef.current) {
      pdfOverlayMeshRef.current.visible = showPdfOverlay
    }
  }, [showPdfOverlay])

  // Update Sheet Progression Highlight
  useEffect(() => {
    if (!sheetMeshesRef.current || sheetMeshesRef.current.length === 0) return

    sheetMeshesRef.current.forEach((mesh) => {
      const sheet = mesh.userData.sheet
      const isLaid = sheet.stepNumber <= activeStep
      mesh.visible = isLaid

      const isCurrent = sheet.stepNumber === activeStep
      const isFull = sheet.status === 'full'

      if (isCurrent) {
        mesh.material.color.setHex(0x38bdf8) // bright cyan highlight
      } else {
        mesh.material.color.setHex(isFull ? 0x10b981 : 0xf59e0b)
      }
    })
  }, [activeStep])

  // Camera Presets
  const setCameraPreset = (mode) => {
    setCameraMode(mode)
    if (!cameraRef.current || !controlsRef.current) return

    if (mode === 'top') {
      cameraRef.current.position.set(0, 32, -0.6)
      controlsRef.current.target.set(0, 0, -0.6)
    } else if (mode === '3d') {
      cameraRef.current.position.set(16, 26, 20)
      controlsRef.current.target.set(0, 0, -1)
    } else if (mode === 'primary') {
      cameraRef.current.position.set(15, 14, -6)
      controlsRef.current.target.set(8.7, 0, -7.0)
    } else if (mode === 'hallway') {
      cameraRef.current.position.set(-1, 16, 12)
      controlsRef.current.target.set(-0.8, 0, 1.0)
    }
  }

  return (
    <div className="space-y-6">
      {/* 3D Visualizer Canvas & Controls Bar */}
      <div className="relative rounded-2xl overflow-hidden glass-panel border border-slate-800 shadow-2xl">
        {/* Top Floating Controls */}
        <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
          {/* Layer Selector */}
          <div className="flex items-center space-x-1 p-1 rounded-xl bg-slate-900/95 border border-slate-700/80 backdrop-blur-md pointer-events-auto shadow-lg">
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
              <span>1×6 Slats</span>
            </button>
          </div>

          {/* Camera View Presets & Toggles */}
          <div className="flex items-center space-x-2 pointer-events-auto">
            <div className="flex items-center space-x-1 p-1 rounded-xl bg-slate-900/95 border border-slate-700/80 backdrop-blur-md text-xs font-mono">
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
                2D Blueprint
              </button>
              <button
                onClick={() => setCameraPreset('primary')}
                className={`px-2.5 py-1 rounded-lg transition ${cameraMode === 'primary' ? 'bg-slate-700 text-white font-bold' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Start Corner
              </button>
              <button
                onClick={() => setCameraPreset('hallway')}
                className={`px-2.5 py-1 rounded-lg transition ${cameraMode === 'hallway' ? 'bg-slate-700 text-white font-bold' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Hallway Hub
              </button>
            </div>

            {/* Toggle PDF Blueprint Overlay */}
            <button
              onClick={() => setShowPdfOverlay(!showPdfOverlay)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border backdrop-blur-md transition ${
                showPdfOverlay
                  ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                  : 'bg-slate-900/80 border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
              title="Show exact PDF drawing underlay"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>PDF Underlay</span>
            </button>

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

        {/* 3D Canvas Mount */}
        <div ref={mountRef} className="w-full h-[540px] sm:h-[620px] cursor-grab active:cursor-grabbing" />

        {/* Start Position Callout Tag */}
        <div className="absolute top-20 right-4 z-20 pointer-events-none hidden sm:block">
          <div className="p-3 rounded-xl bg-slate-900/90 border border-amber-500/40 backdrop-blur-md flex items-center space-x-2 text-xs">
            <MapPin className="w-4 h-4 text-red-500 shrink-0 animate-bounce" />
            <div>
              <div className="text-white font-bold">Start Marker: Sheet #1</div>
              <div className="text-[10px] text-amber-400 font-mono">Primary NE Corner (under red pin)</div>
            </div>
          </div>
        </div>

        {/* Legend Overlay at Bottom Left */}
        <div className="absolute bottom-20 left-4 z-20 pointer-events-none hidden sm:block">
          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 backdrop-blur-md space-y-1.5 text-xs">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">Architectural Guide</div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-sm bg-emerald-500" />
              <span className="text-slate-300">Full 4×8 Factory Sheet</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-sm bg-amber-500" />
              <span className="text-slate-300">Irregular Cut (L-Shape / T-Notch / Wrap)</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-sm bg-sky-400" />
              <span className="text-slate-300">Active Selected Sheet</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-sm bg-red-500/70 border border-red-400" />
              <span className="text-red-400 font-bold">5PC Bath & Closet (EXCLUDED)</span>
            </div>
          </div>
        </div>

        {/* Bottom Interactive Progression Scrubber */}
        <div className="absolute bottom-4 left-4 right-4 z-20">
          <div className="p-3 sm:p-4 rounded-xl bg-slate-950/95 border border-slate-800/90 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xl">
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
                <span>1. Primary Corner</span>
                <span>2. Hallway</span>
                <span>3. Bed 2 (touching Primary)</span>
                <span>4. Bed 3 (final)</span>
              </div>
            </div>

            <div className="text-xs text-slate-300 flex items-center space-x-2">
              <span className="hidden md:inline text-slate-400 font-mono text-[11px]">Click any sheet in 3D to inspect cut specs</span>
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
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {selectedSheet.zone}
                  </span>
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                    selectedSheet.status === 'full'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    {selectedSheet.shapeType}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mt-1">
                  {selectedSheet.position}
                </h3>
              </div>
            </div>

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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
              <div className="text-xs font-semibold text-amber-400 flex items-center space-x-1.5">
                <Scissors className="w-3.5 h-3.5" />
                <span>Exact Cut Instructions (Maximize Sheet Size)</span>
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
                <span>Installation Sequence & Doorway Rule</span>
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
