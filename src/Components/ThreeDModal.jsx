import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Procedural 3D Model Generator
// Generates vertices, edges, and faces for the selected design
function generateModel(type) {
  const vertices = []
  const edges = []
  const faces = [] // format: { indices: [v1, v2, v3, v4], colorOffset: number }

  if (type === 'tower') {
    // Generate Skyscraper Model
    // 10 floors, 8 points per floor + central core
    const floors = 10
    const pointsPerFloor = 8
    const radius = 30
    const heightPerFloor = 22

    // Vertices
    for (let f = 0; f < floors; f++) {
      const y = -100 + f * heightPerFloor
      // Taper radius slightly as tower goes up
      const r = radius * (1 - (f / floors) * 0.45)
      // Twist the floor angle slightly for dynamic architectural look
      const angleOffset = (f * Math.PI) / 16

      for (let p = 0; p < pointsPerFloor; p++) {
        const theta = (p * Math.PI * 2) / pointsPerFloor + angleOffset
        const x = Math.cos(theta) * r
        const z = Math.sin(theta) * r
        vertices.push({ x, y, z })
      }
    }

    // Central core column points
    const coreStartIndex = vertices.length
    for (let f = 0; f < floors; f++) {
      vertices.push({ x: 0, y: -100 + f * heightPerFloor, z: 0 })
    }

    // Edges
    for (let f = 0; f < floors; f++) {
      const base = f * pointsPerFloor

      // 1. Horizontal floor ring connections
      for (let p = 0; p < pointsPerFloor; p++) {
        edges.push([base + p, base + ((p + 1) % pointsPerFloor)])
      }

      // 2. Vertical columns to floor above
      if (f < floors - 1) {
        const nextBase = (f + 1) * pointsPerFloor
        for (let p = 0; p < pointsPerFloor; p++) {
          edges.push([base + p, nextBase + p])
          
          // Helix cross braces
          edges.push([base + p, nextBase + ((p + 1) % pointsPerFloor)])
        }
      }

      // 3. Connect to core column
      edges.push([base, coreStartIndex + f])
      edges.push([base + 4, coreStartIndex + f])
    }

    // Core column vertical edges
    for (let f = 0; f < floors - 1; f++) {
      edges.push([coreStartIndex + f, coreStartIndex + f + 1])
    }

    // Faces for Solid Shading Mode
    for (let f = 0; f < floors - 1; f++) {
      const base = f * pointsPerFloor
      const nextBase = (f + 1) * pointsPerFloor
      for (let p = 0; p < pointsPerFloor; p++) {
        faces.push({
          indices: [
            base + p,
            base + ((p + 1) % pointsPerFloor),
            nextBase + ((p + 1) % pointsPerFloor),
            nextBase + p
          ],
          colorOffset: f * 10
        })
      }
    }

  } else if (type === 'pipes') {
    // Generate MEP Chiller / Piping Grid
    // Interlocking 3D pipe network
    const segments = 24
    const pipeCount = 4
    const pipeRadius = 6

    // Pipe 1: Vertical main pipe
    for (let i = 0; i <= segments; i++) {
      const y = -110 + i * 10
      const x = -20
      const z = -20
      // Draw a ring of vertices around segment
      const startIdx = vertices.length
      for (let r = 0; r < 6; r++) {
        const theta = (r * Math.PI * 2) / 6
        vertices.push({
          x: x + Math.cos(theta) * pipeRadius,
          y,
          z: z + Math.sin(theta) * pipeRadius
        })
      }
      // Connect ring
      if (i > 0) {
        const prevStart = startIdx - 6
        for (let r = 0; r < 6; r++) {
          edges.push([prevStart + r, startIdx + r])
          edges.push([startIdx + r, startIdx + ((r + 1) % 6)])
        }
      } else {
        for (let r = 0; r < 6; r++) {
          edges.push([startIdx + r, startIdx + ((r + 1) % 6)])
        }
      }
    }

    // Pipe 2: Horizontal branch crossing X axis
    const pipe2StartIdx = vertices.length
    for (let i = 0; i <= 16; i++) {
      const x = -30 + i * 8
      const y = 0
      const z = -20
      const startIdx = vertices.length
      for (let r = 0; r < 6; r++) {
        const theta = (r * Math.PI * 2) / 6
        vertices.push({
          x,
          y: y + Math.cos(theta) * pipeRadius,
          z: z + Math.sin(theta) * pipeRadius
        })
      }
      if (i > 0) {
        const prevStart = startIdx - 6
        for (let r = 0; r < 6; r++) {
          edges.push([prevStart + r, startIdx + r])
          edges.push([startIdx + r, startIdx + ((r + 1) % 6)])
        }
      } else {
        for (let r = 0; r < 6; r++) {
          edges.push([startIdx + r, startIdx + ((r + 1) % 6)])
        }
      }
    }

    // Pipe 3: Z-axis pipe connecting from horizontal branch
    for (let i = 0; i <= 14; i++) {
      const z = -20 + i * 8
      const x = 50
      const y = 0
      const startIdx = vertices.length
      for (let r = 0; r < 6; r++) {
        const theta = (r * Math.PI * 2) / 6
        vertices.push({
          x: x + Math.cos(theta) * pipeRadius,
          y: y + Math.sin(theta) * pipeRadius,
          z
        })
      }
      if (i > 0) {
        const prevStart = startIdx - 6
        for (let r = 0; r < 6; r++) {
          edges.push([prevStart + r, startIdx + r])
          edges.push([startIdx + r, startIdx + ((r + 1) % 6)])
        }
      } else {
        for (let r = 0; r < 6; r++) {
          edges.push([startIdx + r, startIdx + ((r + 1) % 6)])
        }
      }
    }

    // Procedural faces for visual depth shading
    for (let v = 0; v < vertices.length - 6; v += 6) {
      // Don't bridge between separate pipe sections
      if (v + 6 < vertices.length && Math.abs(vertices[v].y - vertices[v+6].y) < 15) {
        for (let r = 0; r < 6; r++) {
          faces.push({
            indices: [v + r, v + ((r + 1) % 6), v + 6 + ((r + 1) % 6), v + 6 + r],
            colorOffset: v * 0.1
          })
        }
      }
    }

  } else if (type === 'energy') {
    // Generate Solar Energy Panel & Grid
    // 3 rows x 4 columns of angled solar array grids
    const rows = 3
    const cols = 4
    const panelW = 20
    const panelH = 14
    const supportHeight = 12

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Center position of panel
        const cx = -60 + c * 40
        const cz = -40 + r * 40
        const cy = -10

        // Panel angle (tilted towards Z axis)
        const tilt = Math.PI / 6 // 30 degrees
        
        // 4 corners of the solar panel card
        const vIdx = vertices.length
        vertices.push({
          x: cx - panelW / 2,
          y: cy + Math.sin(tilt) * (panelH / 2),
          z: cz - Math.cos(tilt) * (panelH / 2)
        })
        vertices.push({
          x: cx + panelW / 2,
          y: cy + Math.sin(tilt) * (panelH / 2),
          z: cz - Math.cos(tilt) * (panelH / 2)
        })
        vertices.push({
          x: cx + panelW / 2,
          y: cy - Math.sin(tilt) * (panelH / 2),
          z: cz + Math.cos(tilt) * (panelH / 2)
        })
        vertices.push({
          x: cx - panelW / 2,
          y: cy - Math.sin(tilt) * (panelH / 2),
          z: cz + Math.cos(tilt) * (panelH / 2)
        })

        // Base support points on ground (y = -35)
        const baseIdx = vertices.length
        vertices.push({ x: cx - panelW / 3, y: -45, z: cz - 5 })
        vertices.push({ x: cx + panelW / 3, y: -45, z: cz - 5 })

        // Edges connecting panel perimeter
        edges.push([vIdx, vIdx + 1])
        edges.push([vIdx + 1, vIdx + 2])
        edges.push([vIdx + 2, vIdx + 3])
        edges.push([vIdx + 3, vIdx])
        
        // Cross wire grids in panel face
        edges.push([vIdx, vIdx + 2])

        // Supports
        edges.push([vIdx, baseIdx])
        edges.push([vIdx + 1, baseIdx + 1])
        edges.push([baseIdx, baseIdx + 1])

        // Solar cell subgrids
        faces.push({
          indices: [vIdx, vIdx + 1, vIdx + 2, vIdx + 3],
          colorOffset: (r + c) * 15
        })
      }
    }
  }

  return { vertices, edges, faces }
}

export default function ThreeDModal({ isOpen, onClose, initialProject = 'tower' }) {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  
  // Design State variables
  const [modelType, setModelType] = useState(initialProject)
  const [themeColor, setThemeColor] = useState('cyan') // cyan, gold, green
  const [renderMode, setRenderMode] = useState('wireframe') // points, wireframe, solid
  const [isRotating, setIsRotating] = useState(true)
  const [cameraView, setCameraView] = useState('perspective')

  // 3D Rotations
  const [yaw, setYaw] = useState(0)     // Horizontal Y-axis rotation
  const [pitch, setPitch] = useState(0.2) // Vertical X-axis rotation
  const [scale, setScale] = useState(1.1) // Zoom factor

  // Interactive mouse drag
  const isDragging = useRef(false)
  const prevMousePos = useRef({ x: 0, y: 0 })

  // Active procedural telemetry
  const [telemetry, setTelemetry] = useState({
    fps: 60,
    vertexCount: 0,
    edgeCount: 0,
    customField: 'Static load OK',
    customVal: '98.4%',
    flowRate: 0
  })

  // Synchronize initial selection on opening
  useEffect(() => {
    if (isOpen) {
      setModelType(initialProject)
      setCameraView('perspective')
      setScale(1.1)
      setYaw(0)
      setPitch(0.25)
    }
  }, [isOpen, initialProject])

  // Camera views handler
  const handleCameraChange = (view) => {
    setCameraView(view)
    setIsRotating(false)
    if (view === 'perspective') {
      setYaw(0.5)
      setPitch(0.35)
    } else if (view === 'top') {
      setYaw(0)
      setPitch(Math.PI / 2)
    } else if (view === 'front') {
      setYaw(0)
      setPitch(0)
    } else if (view === 'isometric') {
      setYaw(Math.PI / 4)
      setPitch(Math.atan(Math.SQRT1_2))
    }
  }

  // Touch handlers for mobile
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      isDragging.current = true
      prevMousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    }
  }

  const handleTouchMove = (e) => {
    if (isDragging.current && e.touches.length === 1) {
      const deltaX = e.touches[0].clientX - prevMousePos.current.x
      const deltaY = e.touches[0].clientY - prevMousePos.current.y
      setYaw((prev) => prev + deltaX * 0.007)
      setPitch((prev) => Math.max(-Math.PI / 2 + 0.01, Math.min(Math.PI / 2 - 0.01, prev - deltaY * 0.007)))
      prevMousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    }
  }

  // Mouse controls
  const handleMouseDown = (e) => {
    isDragging.current = true
    prevMousePos.current = { x: e.clientX, y: e.clientY }
  }

  const handleMouseMove = (e) => {
    if (isDragging.current) {
      const deltaX = e.clientX - prevMousePos.current.x
      const deltaY = e.clientY - prevMousePos.current.y
      setYaw((prev) => prev + deltaX * 0.007)
      setPitch((prev) => Math.max(-Math.PI / 2 + 0.01, Math.min(Math.PI / 2 - 0.01, prev - deltaY * 0.007)))
      prevMousePos.current = { x: e.clientX, y: e.clientY }
    }
  }

  const handleMouseUp = () => {
    isDragging.current = false
  }

  const handleWheel = (e) => {
    e.preventDefault()
    setScale((prev) => Math.max(0.4, Math.min(2.5, prev - e.deltaY * 0.001)))
  }

  // 3D Canvas Projection Engine Loop
  useEffect(() => {
    if (!isOpen || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationFrameId
    let lastTime = performance.now()
    let frames = 0
    let lastFpsUpdateTime = performance.now()

    // Load geometry
    const model = generateModel(modelType)
    setTelemetry((prev) => ({
      ...prev,
      vertexCount: model.vertices.length,
      edgeCount: model.edges.length,
      customField: modelType === 'tower' ? 'Structural Integrity' : modelType === 'pipes' ? 'Flow Telemetry' : 'Power Generation Output',
      customVal: modelType === 'tower' ? '99.8%' : modelType === 'pipes' ? '4,500 L/min' : '150 kW'
    }))

    // Setup dimensions
    const resizeCanvas = () => {
      const rect = canvas.parentNode.getBoundingClientRect()
      canvas.width = rect.width * window.devicePixelRatio
      canvas.height = rect.height * window.devicePixelRatio
      canvas.style.width = '100%'
      canvas.style.height = '100%'
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Palette Colors Configuration
    const getColors = () => {
      if (themeColor === 'cyan') {
        return {
          glow: 'rgba(0, 255, 196, 0.95)',
          fill: 'rgba(0, 255, 196, 0.07)',
          stroke: 'rgba(0, 255, 196, 0.45)',
          grid: 'rgba(0, 255, 196, 0.05)',
          node: 'rgba(0, 255, 196, 0.8)'
        }
      } else if (themeColor === 'gold') {
        return {
          glow: 'rgba(212, 163, 89, 0.95)',
          fill: 'rgba(212, 163, 89, 0.06)',
          stroke: 'rgba(212, 163, 89, 0.45)',
          grid: 'rgba(212, 163, 89, 0.04)',
          node: 'rgba(212, 163, 89, 0.8)'
        }
      } else {
        // Emerald Green
        return {
          glow: 'rgba(0, 204, 136, 0.95)',
          fill: 'rgba(0, 204, 136, 0.07)',
          stroke: 'rgba(0, 204, 136, 0.45)',
          grid: 'rgba(0, 204, 136, 0.05)',
          node: 'rgba(0, 204, 136, 0.8)'
        }
      }
    }

    // Animation Loop
    let localYaw = yaw
    const render = () => {
      const colors = getColors()
      const w = canvas.width / window.devicePixelRatio
      const h = canvas.height / window.devicePixelRatio
      const cx = w / 2
      const cy = h / 2

      // FPS tracking
      const now = performance.now()
      frames++
      if (now > lastFpsUpdateTime + 1000) {
        setTelemetry((prev) => ({ ...prev, fps: Math.round((frames * 1000) / (now - lastFpsUpdateTime)) }))
        frames = 0
        lastFpsUpdateTime = now
      }

      // Physics/Telemetry simulated update
      setTelemetry((prev) => ({
        ...prev,
        flowRate: (prev.flowRate + 1) % 100
      }))

      // Auto rotation
      if (isRotating && !isDragging.current) {
        localYaw += 0.004
        setYaw(localYaw)
      } else {
        localYaw = yaw
      }

      ctx.clearRect(0, 0, w, h)

      // Draw background tech grid blueprint layout
      ctx.strokeStyle = colors.grid
      ctx.lineWidth = 0.5
      const gridSize = 35
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, h)
        ctx.stroke()
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.stroke()
      }

      // Draw concentric HUD targeting rings
      ctx.beginPath()
      ctx.arc(cx, cy, Math.min(w, h) * 0.42, 0, Math.PI * 2)
      ctx.strokeStyle = colors.grid
      ctx.lineWidth = 1
      ctx.setLineDash([3, 12])
      ctx.stroke()
      ctx.setLineDash([])

      // 3D Vector Projection
      const D = 450 // Perspective view distance
      const cosY = Math.cos(localYaw)
      const sinY = Math.sin(localYaw)
      const cosP = Math.cos(pitch)
      const sinP = Math.sin(pitch)

      const projected = model.vertices.map((v) => {
        // Rotate around Y-axis (Yaw)
        const x1 = v.x * cosY - v.z * sinY
        const z1 = v.x * sinY + v.z * cosY

        // Rotate around X-axis (Pitch)
        const y2 = v.y * cosP - z1 * sinP
        const z2 = v.y * sinP + z1 * cosP

        // Apply scale/zoom
        const xs = x1 * scale * 1.5
        const ys = y2 * scale * 1.5
        const zs = z2 * scale * 1.5

        // Perspective factor
        const perspective = D / (D + zs)
        const screenX = cx + xs * perspective
        const screenY = cy + ys * perspective

        return { x: screenX, y: screenY, z: zs, valid: (D + zs) > 10 }
      })

      // PIPELINE PARTICLE FLOW SIMULATION (Animated fluid dots inside pipes)
      const flowProgress = (now * 0.02) % 100
      
      // RENDERING MODES
      if (renderMode === 'solid' && model.faces.length > 0) {
        // 1. Faceted Solid mode (Painters Algorithm: sort faces by depth)
        const facesWithDepth = model.faces.map((face) => {
          let sumZ = 0
          let validCount = 0
          face.indices.forEach((idx) => {
            if (projected[idx] && projected[idx].valid) {
              sumZ += projected[idx].z
              validCount++
            }
          })
          return { face, avgZ: validCount > 0 ? sumZ / validCount : 9999 }
        })

        // Sort descending: draw furthest faces first
        facesWithDepth.sort((a, b) => b.avgZ - a.avgZ)

        facesWithDepth.forEach(({ face }) => {
          ctx.beginPath()
          const first = projected[face.indices[0]]
          if (!first || !first.valid) return

          ctx.moveTo(first.x, first.y)
          for (let i = 1; i < face.indices.length; i++) {
            const pt = projected[face.indices[i]]
            if (pt && pt.valid) {
              ctx.lineTo(pt.x, pt.y)
            }
          }
          ctx.closePath()
          
          // Render shaded panel faces
          ctx.fillStyle = colors.fill
          ctx.fill()
          ctx.strokeStyle = colors.stroke
          ctx.lineWidth = 1
          ctx.stroke()
        })
      } else if (renderMode === 'wireframe') {
        // 2. Wireframe mode (Draw lines linking edges)
        ctx.strokeStyle = colors.stroke
        ctx.lineWidth = 1.2
        model.edges.forEach(([v1, v2]) => {
          const pt1 = projected[v1]
          const pt2 = projected[v2]
          if (pt1 && pt2 && pt1.valid && pt2.valid) {
            ctx.beginPath()
            ctx.moveTo(pt1.x, pt1.y)
            ctx.lineTo(pt2.x, pt2.y)
            ctx.stroke()
          }
        })
      }

      // Draw flowing neon particle indicators in Piping mode
      if (modelType === 'pipes' && renderMode !== 'solid') {
        ctx.fillStyle = colors.glow
        // Select core path nodes along vertical pipe (vertices index 0 to segments)
        // Draw 3 dynamic floating particles flowing along the pipeline
        for (let flow = 0; flow < 3; flow++) {
          const nodeIdx = Math.floor(((flowProgress + flow * 33) % 100) * 0.24) * 6
          const p = projected[nodeIdx]
          if (p && p.valid) {
            ctx.beginPath()
            ctx.arc(p.x, p.y, 4, 0, Math.PI * 2)
            ctx.shadowColor = colors.glow
            ctx.shadowBlur = 10
            ctx.fill()
            ctx.shadowBlur = 0 // reset
          }
        }
      }

      // 3. Points Mode / Nodes rendering
      if (renderMode === 'points' || renderMode === 'wireframe') {
        ctx.fillStyle = colors.node
        projected.forEach((pt) => {
          if (pt && pt.valid) {
            ctx.beginPath()
            ctx.arc(pt.x, pt.y, 2.5, 0, Math.PI * 2)
            ctx.fill()
          }
        })
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [isOpen, modelType, themeColor, renderMode, yaw, pitch, scale, isRotating])

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          ref={containerRef}
          className="fixed inset-0 z-[2500] flex items-center justify-center bg-black/85 p-4 md:p-8 backdrop-blur-xl select-none"
        >
          {/* Backdrop exit clickable overlay */}
          <div className="absolute inset-0 z-0" onClick={onClose} />

          {/* Core Panel Window */}
          <motion.div
            initial={{ scale: 0.92, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.92, y: 30, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="relative z-10 grid h-full max-h-[750px] w-full max-w-[1150px] grid-cols-1 overflow-hidden rounded-3xl border border-white/10 bg-[#07130e]/95 shadow-[0_25px_80px_rgba(0,0,0,0.8)] md:grid-cols-12"
          >
            {/* 1. Left Side: Active Telemetry Info & Toggles (4 cols) */}
            <div className="flex flex-col justify-between border-b border-white/[0.08] p-6 bg-black/30 md:border-b-0 md:border-r md:col-span-4 md:p-8">
              <div className="space-y-6">
                {/* Header */}
                <div>
                  <div className="text-[10px] font-bold tracking-[3px] text-[#00ffc4] uppercase">
                    ACTIVE TELEMETRY VIEW
                  </div>
                  <h3 className="mt-1 font-body text-[1.25rem] font-bold text-white uppercase tracking-wider">
                    {modelType === 'tower' ? 'Signature Tower' : modelType === 'pipes' ? 'District Piping' : 'Solar Power Grid'}
                  </h3>
                  <p className="text-[0.75rem] text-white/50 mt-1.5 leading-relaxed">
                    Interactive engineering structural model. Click and drag the model grid to inspect vector projection.
                  </p>
                </div>

                {/* Model Selector tabs */}
                <div className="space-y-2">
                  <span className="block text-[9px] font-bold tracking-wider text-white/40 uppercase">Select 3D Component</span>
                  <div className="grid grid-cols-3 gap-1.5 bg-white/5 rounded-xl p-1 border border-white/[0.05]">
                    {[
                      { type: 'tower', label: 'Civil' },
                      { type: 'pipes', label: 'MEP' },
                      { type: 'energy', label: 'Utility' }
                    ].map((btn) => (
                      <button
                        key={btn.type}
                        onClick={() => setModelType(btn.type)}
                        className={`rounded-lg py-2 text-[0.75rem] font-bold transition-all ${
                          modelType === btn.type
                            ? 'bg-[#00664f] text-white shadow-md'
                            : 'text-white/60 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Render Style Toggle */}
                <div className="space-y-2">
                  <span className="block text-[9px] font-bold tracking-wider text-white/40 uppercase">Render Engine Mode</span>
                  <div className="grid grid-cols-3 gap-1.5 bg-white/5 rounded-xl p-1 border border-white/[0.05]">
                    {[
                      { mode: 'points', label: 'Nodes' },
                      { mode: 'wireframe', label: 'Wire' },
                      { mode: 'solid', label: 'Solid' }
                    ].map((btn) => (
                      <button
                        key={btn.mode}
                        onClick={() => setRenderMode(btn.mode)}
                        className={`rounded-lg py-2 text-[0.75rem] font-bold transition-all ${
                          renderMode === btn.mode
                            ? 'bg-[#00664f] text-white shadow-md'
                            : 'text-white/60 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Camera presets */}
                <div className="space-y-2">
                  <span className="block text-[9px] font-bold tracking-wider text-white/40 uppercase">Camera View Preset</span>
                  <div className="grid grid-cols-4 gap-1 bg-white/5 rounded-xl p-1 border border-white/[0.05]">
                    {[
                      { view: 'perspective', label: '3D' },
                      { view: 'isometric', label: 'ISO' },
                      { view: 'front', label: 'FRNT' },
                      { view: 'top', label: 'TOP' }
                    ].map((btn) => (
                      <button
                        key={btn.view}
                        onClick={() => handleCameraChange(btn.view)}
                        className={`rounded-md py-1.5 text-[0.66rem] font-bold tracking-wider transition-all ${
                          cameraView === btn.view
                            ? 'bg-[#00ffc4] text-black font-extrabold'
                            : 'text-white/60 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Theme colors */}
                <div className="space-y-2">
                  <span className="block text-[9px] font-bold tracking-wider text-white/40 uppercase">Holographic Color Filter</span>
                  <div className="flex gap-3 items-center">
                    {[
                      { key: 'cyan', color: 'bg-[#00ffc4]' },
                      { key: 'gold', color: 'bg-[#d4a359]' },
                      { key: 'green', color: 'bg-[#00cc88]' }
                    ].map((c) => (
                      <button
                        key={c.key}
                        onClick={() => setThemeColor(c.key)}
                        className={`h-7 w-7 rounded-full transition-all border-2 flex items-center justify-center ${
                          themeColor === c.key
                            ? 'border-white scale-110 shadow-lg'
                            : 'border-transparent opacity-65 hover:opacity-100 hover:scale-105'
                        }`}
                      >
                        <span className={`h-4 w-4 rounded-full ${c.color}`} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Technical Telemetry panel */}
              <div className="mt-6 border-t border-white/10 pt-6 space-y-3 font-mono text-[10px] text-white/55">
                <div className="flex justify-between items-center bg-white/[0.02] p-2 rounded-lg border border-white/[0.04]">
                  <span>ENGINE FRAME RATE:</span>
                  <span className="text-[#00ffc4] font-bold">{telemetry.fps} FPS</span>
                </div>
                <div className="flex justify-between items-center bg-white/[0.02] p-2 rounded-lg border border-white/[0.04]">
                  <span>VERTICES / EDGES:</span>
                  <span className="text-white">{telemetry.vertexCount} / {telemetry.edgeCount}</span>
                </div>
                <div className="flex justify-between items-center bg-white/[0.02] p-2 rounded-lg border border-white/[0.04]">
                  <span>{telemetry.customField.toUpperCase()}:</span>
                  <span className="text-white font-semibold">{telemetry.customVal}</span>
                </div>
              </div>
            </div>

            {/* 2. Right Side: Interactive 3D Canvas rendering window (8 cols) */}
            <div className="relative flex flex-col items-center justify-center overflow-hidden bg-[#040b08] md:col-span-8 h-[380px] md:h-full">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute right-6 top-6 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white transition-all hover:bg-white hover:text-black hover:border-white"
                aria-label="Close interactive modal"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Canvas viewport wrapper */}
              <div 
                className="absolute inset-0 cursor-grab active:cursor-grabbing flex items-center justify-center"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleMouseUp}
                onWheel={handleWheel}
              >
                <canvas ref={canvasRef} className="block" />
              </div>

              {/* Holographic Controls floating HUD */}
              <div className="absolute bottom-6 left-6 right-6 z-20 flex justify-between items-center bg-black/50 border border-white/10 backdrop-blur-md px-4 py-3 rounded-xl pointer-events-auto">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsRotating(!isRotating)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white transition-all hover:bg-[#00664f]"
                    title={isRotating ? "Pause Auto Rotation" : "Play Auto Rotation"}
                  >
                    {isRotating ? (
                      <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                      </svg>
                    ) : (
                      <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </button>
                  <span className="text-[10px] font-mono font-bold tracking-wider text-white/50 uppercase">
                    {isRotating ? 'Auto-Orbiting' : 'Manual View'}
                  </span>
                </div>
                
                <div className="hidden sm:flex items-center gap-4 text-[9px] font-mono text-white/40 uppercase tracking-widest">
                  <span>Drag to rotate</span>
                  <span className="h-3 w-[1px] bg-white/20" />
                  <span>Scroll to zoom</span>
                </div>
              </div>

              {/* Tech Corner Crosshairs decoration */}
              <div className="absolute top-4 left-4 h-4 w-4 border-t border-l border-white/25 pointer-events-none" />
              <div className="absolute top-4 right-4 h-4 w-4 border-t border-r border-white/25 pointer-events-none" />
              <div className="absolute bottom-4 left-4 h-4 w-4 border-b border-l border-white/25 pointer-events-none" />
              <div className="absolute bottom-4 right-4 h-4 w-4 border-b border-r border-white/25 pointer-events-none" />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
