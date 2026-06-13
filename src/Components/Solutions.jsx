import React, { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const containerClass = 'mx-auto max-w-[1200px] px-5 md:px-8'

const solutions = [
  {
    num: '01',
    id: 'infrastructure',
    name: 'Infrastructure',
    desc: 'Heavy civil installations, utility networks, roads, and transport system engineering.',
    img: '/assets/infrastructure.png'
  },
  {
    num: '02',
    id: 'mep',
    name: 'MEP Services',
    desc: 'Advanced mechanical, electrical, plumbing, and fire safety systems for major towers.',
    img: '/assets/villa.png'
  },
  {
    num: '03',
    id: 'civil',
    name: 'Civil Works',
    desc: 'Structural concrete, substructures, architectural framing, and masonry works.',
    img: '/assets/hero.png'
  },
  {
    num: '04',
    id: 'chemical',
    name: 'Chemical',
    desc: 'Industrial process piping, storage tanks, and chemical plant infrastructure.',
    img: '/assets/worker.png'
  },
  {
    num: '05',
    id: 'water',
    name: 'Water',
    desc: 'Filtration plants, sewage treatment, potable water grids, and pumping stations.',
    img: '/assets/infrastructure.png'
  },
  {
    num: '06',
    id: 'energy',
    name: 'Energy',
    desc: 'Substations, grid hookups, sustainable solar arrays, and smart power auditing.',
    img: '/assets/hero_industrial.png'
  }
]

// Reusable 3D Tilt Card for Solutions
function SolutionCard3D({ sol, index, imageY }) {
  const cardRef = useRef(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const card = cardRef.current
    const box = card.getBoundingClientRect()
    const x = (e.clientX - box.left) / box.width - 0.5
    const y = (e.clientY - box.top) / box.height - 0.5
    setRotateX(-y * 10) // 10 degrees tilt limit
    setRotateY(x * 10)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      ref={cardRef}
      id={sol.id}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative h-[440px] cursor-pointer overflow-hidden rounded-3xl border border-white/[0.06] bg-[#0c1e16] shadow-2xl scroll-mt-24 w-full"
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
      }}
      animate={{
        rotateX,
        rotateY,
        scale: isHovered ? 1.02 : 1,
        borderColor: isHovered ? 'rgba(0, 255, 196, 0.3)' : 'rgba(255,255,255,0.06)',
        boxShadow: isHovered 
          ? '0 30px 60px -15px rgba(7, 20, 15, 0.4), 0 0 20px rgba(0, 255, 196, 0.05)' 
          : '0 10px 30px rgba(0, 0, 0, 0.2)'
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        delay: (index % 3) * 0.08,
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {/* Background Image with Scroll Parallax */}
      <div className="absolute inset-0 overflow-hidden -z-20">
        <motion.img
          src={sol.img}
          alt={sol.name}
          className="absolute inset-x-0 top-[-15%] h-[130%] w-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ y: imageY }}
          loading="lazy"
        />
      </div>

      {/* Grid Pattern Overlay that lights up on hover */}
      <div 
        className="absolute inset-0 -z-10 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500"
        style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.15) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Gradient overlay - dark transition to glowing forest green */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10 transition-all duration-500 group-hover:from-[#07140f]/98 group-hover:via-[#07140f]/70 -z-10" />

      {/* Top — number badge (Z = 40px) */}
      <div 
        className="absolute left-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-[0.75rem] font-bold opacity-60 transition-all duration-500 group-hover:opacity-100 group-hover:bg-[#00ffc4]/15 group-hover:text-[#00ffc4] group-hover:border-[#00ffc4]/30"
        style={{ transform: isHovered ? 'translateZ(40px)' : 'translateZ(0px)', transition: 'transform 0.25s ease-out' }}
      >
        {sol.num}
      </div>

      {/* Technical coordinate code overlay (Z = 30px) */}
      <div 
        className="absolute right-6 top-6 font-mono text-[7px] text-white/30 tracking-widest pointer-events-none select-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ transform: isHovered ? 'translateZ(30px)' : 'translateZ(0px)', transition: 'transform 0.25s ease-out' }}
      >
        SYS: {sol.id.toUpperCase()}_NODE_25
      </div>

      {/* Bottom — content (Z = 50px) */}
      <div 
        className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10 transition-all duration-500"
        style={{ 
          transform: isHovered ? 'translateZ(50px)' : 'translateZ(0px)',
          transition: 'transform 0.25s ease-out'
        }}
      >
        <div className="flex items-end justify-between gap-3">
          <div className="space-y-1">
            <span className="block text-[0.7rem] font-bold uppercase tracking-[2px] text-[#00ffc4]/80 transition-all duration-300">
              Service {sol.num}
            </span>
            <span className="text-[1.35rem] font-bold leading-tight block text-white tracking-wide uppercase font-body">
              {sol.name}
            </span>
            
            {/* Collapsible description that expands on hover */}
            <p className="max-h-0 opacity-0 overflow-hidden text-[0.82rem] text-white/70 transition-all duration-500 ease-out group-hover:max-h-[70px] group-hover:opacity-100 group-hover:mt-2.5 leading-relaxed">
              {sol.desc}
            </p>
          </div>
          
          {/* Action Button - Rotates to point directly up on hover */}
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white border border-white/10 backdrop-blur-sm transition-all duration-300 group-hover:bg-[#00ffc4] group-hover:text-[#07140f] group-hover:border-[#00ffc4] group-hover:rotate-45"
          >
            <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </div>
        </div>
      </div>

      {/* Decorative Technical blueprint lines */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/0 group-hover:border-[#00ffc4]/40 rounded-tl-2xl transition-all duration-300 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/0 group-hover:border-[#00ffc4]/40 rounded-br-2xl transition-all duration-300 pointer-events-none" />
    </motion.div>
  )
}

function Solutions() {
  const containerRef = useRef(null)
  
  // Track scroll progress of the Solutions section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Opposite translation directions for background overlays
  const glowY1 = useTransform(scrollYProgress, [0, 1], [-80, 80])
  const glowY2 = useTransform(scrollYProgress, [0, 1], [80, -80])

  // Parallax displacement for images inside the cards
  const imageY = useTransform(scrollYProgress, [0, 1], [-30, 30])

  return (
    <section 
      ref={containerRef}
      id="solutions" 
      className="bg-[#07140f] py-24 text-white md:py-32 relative overflow-hidden"
    >
      {/* Decorative blurred background glow highlights with Scroll Parallax */}
      <motion.div 
        style={{ y: glowY1 }}
        className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#00ffc4]/5 blur-[120px] pointer-events-none" 
      />
      <motion.div 
        style={{ y: glowY2 }}
        className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[350px] h-[350px] rounded-full bg-[#00664f]/10 blur-[100px] pointer-events-none" 
      />

      <div className={containerClass}>
        {/* Header */}
        <div className="mb-16 max-w-[600px] relative z-10">
          <div className="section-label-light text-[#00ffc4] text-xs font-semibold uppercase tracking-[3px]">
            Our Solutions
          </div>
          <motion.h2
            className="mt-4 font-body text-[clamp(1.7rem,3.2vw,2.5rem)] font-extrabold normal-case leading-[1.2] tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            We offer a great number of services
          </motion.h2>
          <motion.div
            className="mt-4 h-[3px] w-16 rounded-full bg-[#00ffc4]"
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 relative z-10">
          {solutions.map((sol, index) => (
            <SolutionCard3D 
              key={index} 
              sol={sol} 
              index={index} 
              imageY={imageY} 
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Solutions