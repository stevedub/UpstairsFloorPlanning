import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { sheetLayoutData } from '../data/sheetLayoutData.js'
import { lifeproofLayoutData } from '../data/lifeproofData.js'
import { roomBounds3D } from '../data/floorData.js'
import {
  Eye,
  Layers,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Info,
  CheckCircle2,
  Scissors,
  MapPin,
  Image as ImageIcon,
  Sparkles,
  ShieldCheck,
  Compass
} from 'lucide-react'

export const FloorPlan3D = ({ activeStep, setActiveStep }) => {
  const mountRef = useRef(null)
  const [activeLayer, setActiveLayer] = useState('plywood') // 'plywood' | 'lifeproof' | 'subfloor'
  const [showWalls, setShowWalls] = useState(true)
  const [showPdfOverlay, setShowPdfOverlay] = useState(false)
  const [selectedSheet, setSelectedSheet] = useState(sheetLayoutData[0])

  // LifeProof Progression State
  const [activeLvpStep, setActiveLvpStep] = useState(1)
  const [selectedLvpRow, setSelectedLvpRow] = useState(lifeproofLayoutData[0])

  const [isPlaying, setIsPlaying] = useState(false)
  const [cameraMode, setCameraMode] = useState('3d')

  const sceneRef = useRef(null)
  const cameraRef = useRef(null)
  const controlsRef = useRef(null)
  const rendererRef = useRef(null)
  const sheetMeshesRef = useRef([])
  const lifeproofMeshesRef = useRef([])
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
        if (activeLayer === 'lifeproof') {
          setActiveLvpStep(prev => {
            if (prev >= lifeproofLayoutData.length) {
              setIsPlaying(false)
              return prev
            }
            return prev + 1
          })
        } else {
          setActiveStep(prev => {
            if (prev >= sheetLayoutData.length) {
              setIsPlaying(false)
              return prev
            }
            return prev + 1
          })
        }
      }, 1100)
    }
    return () => clearInterval(interval)
  }, [isPlaying, activeLayer, setActiveStep])

  // Sync selected sheet with activeStep
  useEffect(() => {
    const sheet = sheetLayoutData.find(s => s.stepNumber === activeStep)
    if (sheet) {
      setSelectedSheet(sheet)
    }
  }, [activeStep])

  // Sync selected LifeProof row with activeLvpStep
  useEffect(() => {
    const row = lifeproofLayoutData.find(r => r.stepNumber === activeLvpStep)
    if (row) {
      setSelectedLvpRow(row)
    }
  }, [activeLvpStep])

  // Update starting pin position based on active layer
  useEffect(() => {
    if (!startPinGroupRef.current) return
    if (activeLayer === 'lifeproof') {
      // East exterior wall start: (12.71, -11.98)
      startPinGroupRef.current.position.set(12.35, 0.1, -11.98)
    } else {
      // Primary outside corner: (12.71, -11.98)
      startPinGroupRef.current.position.set(12.71, 0.1, -11.98)
    }
  }, [activeLayer])

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

    // Renderer with hardware clipping enabled
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = false
    renderer.localClippingEnabled = true // Enable GPU clipping planes for subfloor boundary
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

    // =========================================================================
    // 1. SUBFLOOR LAYER: EAST-WEST JOISTS & CONTINUOUS 1x6 DIAGONAL SLATS
    // =========================================================================
    // Hardware clipping planes stop joists and slats cleanly at the exterior walls:
    const subfloorClipPlanes = [
      new THREE.Plane(new THREE.Vector3(1, 0, 0), 12.75),   // West wall: x >= -12.75
      new THREE.Plane(new THREE.Vector3(-1, 0, 0), 12.75),  // East wall: x <= 12.75
      new THREE.Plane(new THREE.Vector3(0, 0, 1), 12.00),   // North wall: z >= -12.00
      new THREE.Plane(new THREE.Vector3(0, 0, -1), 11.05)   // South wall: z <= 11.05
    ]

    const joistMat = new THREE.MeshStandardMaterial({
      color: 0x453120,
      roughness: 0.85,
      clippingPlanes: subfloorClipPlanes
    })

    // East-West Joists (parallel to X axis), spaced along Z at 16" (1.33 ft) centers
    for (let z = -12.0; z <= 11.0; z += 1.33) {
      const joistGeo = new THREE.BoxGeometry(25.6, 0.14, 0.12)
      const joistMesh = new THREE.Mesh(joistGeo, joistMat)
      joistMesh.position.set(0, -0.05, z)
      subfloorGroup.add(joistMesh)
    }

    // Continuous 1x6 Diagonal Slats at 45°:
    // Placed at y = 0.02 directly atop joists, clearly visible across the entire floor,
    // with hardware GPU clipping at the exterior walls so 0% extends outside!
    const slatMat = new THREE.MeshStandardMaterial({
      color: 0x9e683b, // warm, rich Douglas fir / pine subfloor board tone
      roughness: 0.65,
      clippingPlanes: subfloorClipPlanes
    })
    const slatEdgeMat = new THREE.LineBasicMaterial({
      color: 0x3d2410, // dark gap line between 1x6 boards
      linewidth: 1.5,
      clippingPlanes: subfloorClipPlanes
    })

    for (let offset = -28; offset <= 28; offset += 0.48) { // 0.48 ft = 5.75" board width
      const slatGeo = new THREE.BoxGeometry(0.44, 0.03, 38)
      const slatMesh = new THREE.Mesh(slatGeo, slatMat)
      slatMesh.position.set(offset * 0.707, 0.02, -offset * 0.707 - 0.5)
      slatMesh.rotation.y = Math.PI / 4

      const edges = new THREE.EdgesGeometry(slatGeo)
      const edgeLine = new THREE.LineSegments(edges, slatEdgeMat)
      slatMesh.add(edgeLine)

      subfloorGroup.add(slatMesh)
    }

    // =========================================================================
    // 2. PLYWOOD LAYER - IRREGULAR POLYGONS & RECTANGLES (ZERO OVERLAPS)
    // =========================================================================
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

    // =========================================================================
    // 3. LIFEPROOF COBBLESTONE VINYL PLANK LAYER (100% UNIFIED NORTH-SOUTH)
    // =========================================================================
    // Every single plank across all rooms and closets runs in the EXACT same North-South direction.
    lifeproofMeshesRef.current = []
    const toneColors = [0x827468, 0x918377, 0x75675b] // Warm Greige, Natural Taupe, Smoked Oak
    const plankEdgeMat = new THREE.LineBasicMaterial({ color: 0x3d3229, linewidth: 1.5 })

    lifeproofLayoutData.forEach((row) => {
      const rowGroup = new THREE.Group()
      rowGroup.userData = { lvpRow: row }

      row.planks.forEach((p) => {
        const plankGeo = new THREE.BoxGeometry(p.w - 0.02, 0.04, p.d - 0.02)
        const toneColor = toneColors[p.tone % toneColors.length]
        const plankMat = new THREE.MeshStandardMaterial({
          color: toneColor,
          roughness: 0.48,
          metalness: 0.04
        })

        const plankMesh = new THREE.Mesh(plankGeo, plankMat)
        plankMesh.position.set(p.x + p.w / 2, 0.08, p.z + p.d / 2)
        plankMesh.userData = { lvpRow: row, plank: p }

        // Micro-beveled dark perimeter seam
        const edges = new THREE.EdgesGeometry(plankGeo)
        const edgeLine = new THREE.LineSegments(edges, plankEdgeMat)
        plankMesh.add(edgeLine)

        rowGroup.add(plankMesh)
      })

      lifeproofGroup.add(rowGroup)
      lifeproofMeshesRef.current.push(rowGroup)
    })

    // =========================================================================
    // 4. EXCLUDED 5PC BATHROOM & BATH CLOSET (CRIMSON RED)
    // =========================================================================
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
    bathCloMesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(bathCloGeo), new THREE.LineBasicMaterial({ color: 0xb91c1c })))
    wallsGroup.add(bathCloMesh)

    // =========================================================================
    // 5. INTERIOR & EXTERIOR WALLS
    // =========================================================================
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.8,
      metalness: 0.1,
      transparent: true,
      opacity: 0.88
    })
    const wallHeight = 1.6
    const wallThick = 0.28

    const createWallSegment = (x, z, w, d) => {
      const geo = new THREE.BoxGeometry(w, wallHeight, d)
      const mesh = new THREE.Mesh(geo, wallMat)
      mesh.position.set(x + w / 2, wallHeight / 2, z + d / 2)
      wallsGroup.add(mesh)
    }

    // Exterior Perimeter Walls
    createWallSegment(-12.86, -12.12, 25.72, wallThick) // North
    createWallSegment(12.71, -12.12, wallThick, 15.75)  // East
    createWallSegment(0.81, 11.02, 12.04, wallThick)    // South East
    createWallSegment(-12.86, 11.02, 10.65, wallThick)  // South West
    createWallSegment(-12.86, -12.12, wallThick, 23.28) // West

    // Solid Interior Partition Walls
    createWallSegment(0.81, -11.98, wallThick, 11.48) // Primary / Bed 2 divider
    createWallSegment(0.81, 1.19, 1.58, wallThick)    // Primary / closet return
    createWallSegment(7.98, 1.19, 1.59, wallThick)    // Primary / closet east return
    createWallSegment(9.57, 1.19, wallThick, 2.30)    // Closet East wall
    createWallSegment(0.81, 3.49, 11.90, wallThick)   // Master Closet / 5PC Bath wall
    createWallSegment(-12.72, -3.01, 3.35, wallThick) // Bed 2 / Bed 3 North Closet wall
    createWallSegment(-12.72, -0.65, 3.35, wallThick) // Bed 3 North Closet south wall
    createWallSegment(-9.37, -3.01, wallThick, 2.36)  // Closet divider wall
    createWallSegment(-4.35, -3.01, wallThick, 2.36)  // Bed 2 closet / linen divider
    createWallSegment(-9.37, -0.65, 5.02, wallThick)  // Bed 2 closet solid south wall
    createWallSegment(-2.35, -3.01, wallThick, 0.40)  // Linen north return
    createWallSegment(-2.35, -1.85, wallThick, 3.70)  // Hallway west wall
    createWallSegment(-2.35, 4.50, wallThick, 3.69)   // Hallway south section
    createWallSegment(-12.72, 9.12, 5.53, wallThick)  // Bed 3 south alcove return
    createWallSegment(-7.19, 9.12, wallThick, 1.90)   // Bed 3 south closet west wall
    createWallSegment(-2.35, 9.12, wallThick, 1.90)   // Bed 3 south closet east wall
    createWallSegment(0.81, 6.5, wallThick, 4.52)     // Hallway east stair wall

    // AUTHENTIC GREY DOORWAY THRESHOLD MARKERS (1:1 with FloorPlan.pdf grey door drawings)
    const doorMat = new THREE.MeshBasicMaterial({ color: 0xdfdfdf, side: THREE.DoubleSide })
    const addGreyDoor = (x, z, w, d) => {
      const geo = new THREE.PlaneGeometry(w, d)
      const mesh = new THREE.Mesh(geo, doorMat)
      mesh.rotation.x = -Math.PI / 2
      mesh.position.set(x + w / 2, 0.065, z + d / 2)
      wallsGroup.add(mesh)
    }

    addGreyDoor(-9.37, -3.01, 5.02, wallThick)   // Bed 2 Closet (Middle)
    addGreyDoor(-12.72, -0.65, 3.35, wallThick)  // Bed 3 North Closet
    addGreyDoor(-2.35, -3.01, wallThick, 2.36)   // Hallway Linen Closet
    addGreyDoor(-7.19, 9.12, 4.84, wallThick)    // Bed 3 South Closet
    addGreyDoor(2.39, 1.19, 5.59, wallThick)     // Master Closet Sliding Door
    addGreyDoor(-2.35, -2.61, 1.85, wallThick)   // Bed 2 Entry Door
    addGreyDoor(-2.35, 1.85, wallThick, 2.65)    // Bed 3 Entry Door
    addGreyDoor(0.81, -0.50, wallThick, 1.00)    // Primary Entry Door

    // 6. EXACT STARTING ARROW PIN
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

    // Raycaster Click Handler
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    const onPointerDown = (event) => {
      const rect = renderer.domElement.getBoundingClientRect()
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

      raycaster.setFromCamera(mouse, camera)

      if (activeLayer === 'lifeproof') {
        const allPlanks = lifeproofMeshesRef.current.flatMap(g => g.children.filter(c => c.isMesh))
        const hits = raycaster.intersectObjects(allPlanks, false)
        if (hits.length > 0) {
          const hit = hits[0].object
          if (hit.userData && hit.userData.lvpRow) {
            setSelectedLvpRow(hit.userData.lvpRow)
            setActiveLvpStep(hit.userData.lvpRow.stepNumber)
          }
        }
      } else if (activeLayer === 'plywood') {
        const intersects = raycaster.intersectObjects(sheetMeshesRef.current, false)
        if (intersects.length > 0) {
          const hit = intersects[0].object
          if (hit.userData && hit.userData.sheet) {
            setSelectedSheet(hit.userData.sheet)
            setActiveStep(hit.userData.sheet.stepNumber)
          }
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
  }, [activeLayer])

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

  // Update Plywood Sheet Progression Highlight
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
  }, [activeStep, activeLayer])

  // Update LifeProof Row Progression Highlight
  useEffect(() => {
    if (!lifeproofMeshesRef.current || lifeproofMeshesRef.current.length === 0) return
    const toneColors = [0x827468, 0x918377, 0x75675b]

    lifeproofMeshesRef.current.forEach((rowGroup) => {
      const row = rowGroup.userData.lvpRow
      const isLaid = row.stepNumber <= activeLvpStep
      rowGroup.visible = isLaid

      const isCurrent = row.stepNumber === activeLvpStep
      rowGroup.children.forEach((childMesh) => {
        if (childMesh.isMesh) {
          if (isCurrent) {
            childMesh.material.color.setHex(0x38bdf8) // bright cyan highlight for active row
          } else {
            const toneIdx = childMesh.userData.plank?.tone || 0
            childMesh.material.color.setHex(toneColors[toneIdx % toneColors.length])
          }
        }
      })
    })
  }, [activeLvpStep, activeLayer])

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
              <span>1/2" Plywood Cuts (28)</span>
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
              <span>LifeProof LVP Rows ({lifeproofLayoutData.length})</span>
            </button>
            <button
              onClick={() => setActiveLayer('subfloor')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeLayer === 'subfloor'
                  ? 'bg-amber-700 text-white shadow'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>1×6 Slats & Joists (E-W)</span>
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
              <div className="text-white font-bold">
                {activeLayer === 'lifeproof' ? 'LifeProof Start: Row 1' : 'Plywood Start: Sheet #1'}
              </div>
              <div className="text-[10px] text-amber-400 font-mono">
                {activeLayer === 'lifeproof' ? 'East Outside Wall (x=12.71)' : 'Primary NE Corner (under red pin)'}
              </div>
            </div>
          </div>
        </div>

        {/* Legend Overlay at Bottom Left */}
        <div className="absolute bottom-24 left-4 z-20 pointer-events-none hidden sm:block">
          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 backdrop-blur-md space-y-1.5 text-xs">
            <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-1">
              {activeLayer === 'lifeproof' ? 'LifeProof LVP Guide' : activeLayer === 'subfloor' ? 'Subfloor Framing' : 'Architectural Guide'}
            </div>

            {activeLayer === 'lifeproof' ? (
              <>
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-sm bg-[#827468]" />
                  <span className="text-slate-300">LifeProof Cobblestone Oak (North-South)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-sm bg-sky-400" />
                  <span className="text-slate-300">Active Laying Row</span>
                </div>
              </>
            ) : activeLayer === 'subfloor' ? (
              <>
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-sm bg-[#453120]" />
                  <span className="text-slate-300">East-West Floor Joists (16" OC)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-sm bg-[#9e683b]" />
                  <span className="text-slate-300">1×6 Diagonal Slats (Clipped to Walls)</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-sm bg-emerald-500" />
                  <span className="text-slate-300">Full 4×8 Factory Sheet</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-sm bg-amber-500" />
                  <span className="text-slate-300">Irregular Cut (L-Shape / Wrap)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-sm bg-sky-400" />
                  <span className="text-slate-300">Active Selected Sheet</span>
                </div>
              </>
            )}

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
                title={isPlaying ? 'Pause sequence' : 'Auto-play placement progression'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>

              <button
                onClick={() => {
                  if (activeLayer === 'lifeproof') {
                    setActiveLvpStep(prev => Math.max(1, prev - 1))
                  } else {
                    setActiveStep(prev => Math.max(1, prev - 1))
                  }
                }}
                disabled={activeLayer === 'lifeproof' ? activeLvpStep <= 1 : activeStep <= 1}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 transition"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="text-xs font-mono">
                <span className="text-slate-400">{activeLayer === 'lifeproof' ? 'LVP Row: ' : 'Plywood: '}</span>
                <span className="text-amber-400 font-bold text-sm">
                  {activeLayer === 'lifeproof' ? activeLvpStep : activeStep}
                </span>
                <span className="text-slate-500">
                  {' / '}
                  {activeLayer === 'lifeproof' ? lifeproofLayoutData.length : sheetLayoutData.length}
                </span>
              </div>

              <button
                onClick={() => {
                  if (activeLayer === 'lifeproof') {
                    setActiveLvpStep(prev => Math.min(lifeproofLayoutData.length, prev + 1))
                  } else {
                    setActiveStep(prev => Math.min(sheetLayoutData.length, prev + 1))
                  }
                }}
                disabled={activeLayer === 'lifeproof' ? activeLvpStep >= lifeproofLayoutData.length : activeStep >= sheetLayoutData.length}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 transition"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Scrubber slider bar */}
            <div className="flex-1 max-w-md mx-2">
              <input
                type="range"
                min="1"
                max={activeLayer === 'lifeproof' ? lifeproofLayoutData.length : sheetLayoutData.length}
                value={activeLayer === 'lifeproof' ? activeLvpStep : activeStep}
                onChange={(e) => {
                  const val = parseInt(e.target.value)
                  if (activeLayer === 'lifeproof') {
                    setActiveLvpStep(val)
                  } else {
                    setActiveStep(val)
                  }
                }}
                className="w-full accent-amber-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                <span>1. Primary (East Wall)</span>
                <span>2. Hallway Spine</span>
                <span>3. Bed 2 (NW)</span>
                <span>4. Bed 3 (SW)</span>
              </div>
            </div>

            <div className="text-xs text-slate-300 flex items-center space-x-2">
              <span className="hidden md:inline text-slate-400 font-mono text-[11px]">
                {activeLayer === 'lifeproof' ? 'Click any plank in 3D to inspect cut specs' : 'Click any sheet in 3D to inspect cut specs'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* DYNAMIC INSPECTOR CARD */}
      {activeLayer === 'lifeproof' && selectedLvpRow && (
        <div className="glass-panel-glow rounded-2xl border p-6 sm:p-8 transition-all duration-300">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-mono font-black text-xl shadow-lg bg-blue-500/20 text-blue-400 border border-blue-500/30">
                #{selectedLvpRow.stepNumber}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    Row {selectedLvpRow.rowNumber} of {lifeproofLayoutData.length}
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {selectedLvpRow.zone}
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                    100% Unified North-South Orientation
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mt-1">
                  {selectedLvpRow.positionText}
                </h3>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-right">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">Row Width</div>
                <div className="text-lg font-bold font-mono text-amber-400">{selectedLvpRow.widthInches}"</div>
              </div>
              <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-right">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">Run Length</div>
                <div className="text-lg font-bold font-mono text-emerald-400">{selectedLvpRow.totalLengthFt} ft</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
              <div className="text-xs font-semibold text-amber-400 flex items-center space-x-1.5">
                <Scissors className="w-3.5 h-3.5" />
                <span>Starter Plank Cut (Stagger Pattern)</span>
              </div>
              <p className="text-sm text-slate-200 font-medium leading-relaxed">
                {selectedLvpRow.starterCut}
              </p>
              <div className="text-[11px] text-slate-400 font-mono">
                Stagger: {selectedLvpRow.staggerOffset} from adjacent row
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
              <div className="text-xs font-semibold text-emerald-400 flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>End Plank Cut & Offcut Utilization</span>
              </div>
              <p className="text-sm text-slate-200 font-medium leading-relaxed">
                {selectedLvpRow.endCut}
              </p>
              <div className="text-[11px] text-slate-400">
                Planks in row: {selectedLvpRow.plankCount} ({selectedLvpRow.fullPlanksCount} full factory planks)
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
              <div className="text-xs font-semibold text-blue-400 flex items-center space-x-1.5">
                <Info className="w-3.5 h-3.5" />
                <span>Continuous Flow & Transition Notes</span>
              </div>
              <p className="text-sm text-slate-300 text-xs leading-relaxed">
                <strong>Doorway / Notch:</strong> {selectedLvpRow.notchInfo}
              </p>
              <p className="text-[11px] text-slate-400 leading-relaxed mt-1">
                {selectedLvpRow.specialNotes}
              </p>
            </div>
          </div>
        </div>
      )}

      {activeLayer === 'plywood' && selectedSheet && (
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
                    Step {selectedSheet.stepNumber} of {sheetLayoutData.length}
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

      {activeLayer === 'subfloor' && (
        <div className="glass-panel-glow rounded-2xl border p-6 sm:p-8 transition-all duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-amber-700/20 border border-amber-600/30 flex items-center justify-center text-amber-400">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  Subfloor Framing & 1×6 Diagonal Slat Subfloor
                </h3>
                <p className="text-xs text-slate-400">
                  Floor joists run East-West across rooms. Continuous 1×6 diagonal slats are hardware-clipped strictly inside exterior walls.
                </p>
              </div>
            </div>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
              0% Exterior Overhang
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
              <span className="text-[10px] font-mono uppercase text-slate-500">Joist Orientation</span>
              <div className="font-bold text-slate-200 mt-1">East-West Spanning (16" OC)</div>
              <p className="text-slate-400 text-[11px] mt-1">
                Joists run parallel to front exterior wall, spaced every 16 inches along Z.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
              <span className="text-[10px] font-mono uppercase text-slate-500">1×6 Board Subfloor</span>
              <div className="font-bold text-slate-200 mt-1">Continuous 45° Diagonal Boards</div>
              <p className="text-slate-400 text-[11px] mt-1">
                Slats run continuously over joists at 45 degrees, stopping cleanly at the exterior walls.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
              <span className="text-[10px] font-mono uppercase text-slate-500">Crucial Rule</span>
              <div className="font-bold text-amber-400 mt-1">No Glue on Slat Subfloor</div>
              <p className="text-slate-400 text-[11px] mt-1">
                APA standard: Mechanically fasten 1/2" plywood with Paulin screws only.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
