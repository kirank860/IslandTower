import React, { useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import ThreeDModal from './ThreeDModal'

const containerClass = 'mx-auto max-w-[1200px] px-5 md:px-8'

const projectShowcase = [
  {
    type: 'tower',
    title: 'Signature Civil Structures',
    subtitle: 'Structural Wireframe Skyscraper',
    desc: 'Interactive 3D model detailing the concrete core, perimeter columns, helical truss bracing, and high-wind structural dynamics of signature towers.',
    badge: 'Civil Engineering',
    img: '/assets/dubai.png',
    telemetry: 'Nodes: 90 | Segments: 200'
  },
  {
    type: 'pipes',
    title: 'MEP Systems & Piping Grid',
    subtitle: 'Mechanical Pipeline Telemetry',
    desc: 'Real-time 3D fluid pipeline inspector mapping multi-axis district cooling pipes, junctions, pressure valves, and animated neon current flows.',
    badge: 'Mechanical & Plumbing',
    img: '/assets/hero_industrial.png',
    telemetry: 'Flow Velocity: 4.8 m/s'
  },
  {
    type: 'energy',
    title: 'Water & Energy Utility Grid',
    subtitle: 'Solar Substation Grid Array',
    desc: 'Procedural 3D solar collector grid mapping mechanical tilt angles, ground support trusses, and glowing energy transmission pipelines.',
    badge: 'Infrastructure & Solar',
    img: '/assets/infrastructure.png',
    telemetry: 'Capacity: 1.2 MW Grid'
  }
]

export default function ThreeDShowcase() {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState('tower')
  const containerRef = useRef(null)

  // Track scroll progress of the Showroom section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Opposite translations for background glows
  const glowY1 = useTransform(scrollYProgress, [0, 1], [-70, 70])
  const glowY2 = useTransform(scrollYProgress, [0, 1], [70, -70])

  // Parallax displacement for card images
  const imageY = useTransform(scrollYProgress, [0, 1], [-25, 25])

  const openProjectModal = (type) => {
    setSelectedProject(type)
    setModalOpen(true)
  }

  return (
    <section 
      ref={containerRef}
      id="three-d-showroom" 
      className="bg-[#fcfbf7] py-24 md:py-32 relative overflow-hidden scroll-mt-24 border-t border-gray-100"
    >
      {/* Aesthetic layout helper lines */}
      <div className="absolute top-0 bottom-0 left-6 md:left-12 border-l border-dashed border-gray-100 pointer-events-none select-none z-0" />
      <div className="absolute top-0 bottom-0 right-6 md:right-12 border-r border-dashed border-gray-100 pointer-events-none select-none z-0" />
      
      <motion.div 
        style={{ y: glowY1 }}
        className="absolute top-[20%] right-[-50px] w-72 h-72 rounded-full bg-[#00664f]/5 filter blur-[90px] pointer-events-none" 
      />
      <motion.div 
        style={{ y: glowY2 }}
        className="absolute bottom-[10%] left-[-50px] w-80 h-80 rounded-full bg-[#00ffc4]/5 filter blur-[100px] pointer-events-none" 
      />

      <div className={`${containerClass} relative z-10`}>
        {/* Section Header */}
        <div className="mb-20 max-w-[700px]">
          <div className="text-[#00664f] text-[10px] md:text-[11px] font-bold tracking-[3px] uppercase mb-4">
            NEXT GEN ENGINEERING
          </div>
          <h2 className="font-body text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold leading-[1.15] text-[#07140f] tracking-tight">
            Interactive 3D Project Showroom
          </h2>
          <p className="text-gray-500 text-[clamp(0.85rem,1.8vw,0.98rem)] leading-relaxed mt-4">
            Launch our real-time interactive vector-grid model viewers. Drag, zoom, and rotate the digital blueprint designs to inspect structural specifications. Optimized for immediate high-speed loading.
          </p>
          <div className="mt-6 h-[3px] w-16 bg-[#00664f] rounded-full" />
        </div>

        {/* 3D Showroom Cards Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projectShowcase.map((proj, i) => (
            <motion.div
              key={proj.type}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg transition-all duration-400 min-h-[460px]"
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ 
                y: -10,
                boxShadow: '0 25px 50px -15px rgba(7, 20, 15, 0.12)',
                borderColor: 'rgba(0, 102, 79, 0.15)'
              }}
            >
              <div>
                {/* Visual Image container with blueprint hover grid overlay */}
                <div className="relative overflow-hidden aspect-[16/10] bg-black">
                  <motion.img
                    src={proj.img}
                    alt={proj.title}
                    className="absolute inset-x-0 top-[-10%] h-[120%] w-full object-cover opacity-85 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-70"
                    style={{ y: imageY }}
                    loading="lazy"
                  />
                  
                  {/* Neon badge */}
                  <span className="absolute left-4 top-4 bg-[#07140f]/80 backdrop-blur-md text-[#00ffc4] text-[8px] font-bold tracking-[1.5px] uppercase px-3 py-1 rounded-md border border-[#00ffc4]/20">
                    {proj.badge}
                  </span>

                  {/* Blueprint scanlines overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                </div>

                {/* Info Text */}
                <div className="p-6 md:p-8 space-y-3">
                  <span className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-widest block">
                    {proj.subtitle}
                  </span>
                  <h4 className="text-[1.2rem] font-bold text-[#07140f] tracking-tight leading-snug">
                    {proj.title}
                  </h4>
                  <p className="text-gray-500 text-[0.82rem] leading-relaxed">
                    {proj.desc}
                  </p>
                </div>
              </div>

              {/* Bottom footer bar with button */}
              <div className="border-t border-gray-100 p-6 flex flex-col justify-end bg-gray-50/50 group-hover:bg-[#00664f]/5 transition-colors duration-400">
                <div className="flex justify-between items-center mb-4 text-[9px] font-mono text-gray-400 uppercase tracking-wider">
                  <span>TELEMETRY STACK:</span>
                  <span className="font-bold text-[#00664f]">{proj.telemetry}</span>
                </div>
                <button
                  onClick={() => openProjectModal(proj.type)}
                  className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#07140f] py-3.5 text-center text-[0.75rem] font-bold tracking-[1px] text-white transition-all duration-300 hover:shadow-lg border-none cursor-pointer"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    LAUNCH 3D INSPECTOR
                    <svg 
                      className="h-3.5 w-3.5 text-[#00ffc4] transition-transform duration-300 group-hover:translate-x-1" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor" 
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-[#00664f] to-[#009977] transition-transform duration-400 ease-out group-hover:translate-x-0" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main 3D Modal instance */}
      <ThreeDModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        initialProject={selectedProject}
      />
    </section>
  )
}
