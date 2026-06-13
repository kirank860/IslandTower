import React from 'react'
import { motion } from 'framer-motion'

const containerClass = 'mx-auto max-w-[1200px] px-5 md:px-8'

const solutions = [
  {
    num: '01',
    name: 'Infrastructure',
    desc: 'Heavy civil installations, utility networks, roads, and transport system engineering.',
    img: '/assets/infrastructure.png'
  },
  {
    num: '02',
    name: 'MEP Services',
    desc: 'Advanced mechanical, electrical, plumbing, and fire safety systems for major towers.',
    img: '/assets/villa.png'
  },
  {
    num: '03',
    name: 'Civil Works',
    desc: 'Structural concrete, substructures, architectural framing, and masonry works.',
    img: '/assets/hero.png'
  },
  {
    num: '04',
    name: 'Chemical',
    desc: 'Industrial process piping, storage tanks, and chemical plant infrastructure.',
    img: '/assets/worker.png'
  },
  {
    num: '05',
    name: 'Water',
    desc: 'Filtration plants, sewage treatment, potable water grids, and pumping stations.',
    img: '/assets/infrastructure.png'
  },
  {
    num: '06',
    name: 'Energy',
    desc: 'Substations, grid hookups, sustainable solar arrays, and smart power auditing.',
    img: '/assets/hero_industrial.png'
  }
]

function Solutions() {
  return (
    <section id="solutions" className="bg-[#07140f] py-24 text-white md:py-32 relative overflow-hidden">
      {/* Decorative blurred background glow highlights */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#00ffc4]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[350px] h-[350px] rounded-full bg-[#00664f]/10 blur-[100px] pointer-events-none" />

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
            <motion.div
              key={index}
              className="group relative h-[420px] cursor-pointer overflow-hidden rounded-2xl border border-white/[0.04] bg-[#0c1e16] shadow-xl"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                delay: (index % 3) * 0.1,
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              whileHover={{ y: -10 }}
            >
              {/* Background Image */}
              <img
                src={sol.img}
                alt={sol.name}
                className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
              />

              {/* Gradient overlay - dark transition to glowing forest green */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/5 transition-all duration-500 group-hover:from-[#07140f]/95 group-hover:via-[#07140f]/60" />

              {/* Top — number badge */}
              <div className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-[0.75rem] font-bold opacity-50 transition-all duration-500 group-hover:opacity-100 group-hover:bg-[#00ffc4]/15 group-hover:text-[#00ffc4] group-hover:border-[#00ffc4]/30">
                {sol.num}
              </div>

              {/* Bottom — content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10 transition-all duration-500 group-hover:bottom-2">
                <div className="flex items-end justify-between gap-3">
                  <div className="space-y-1">
                    <span className="block text-[0.7rem] font-bold uppercase tracking-[2px] text-[#00ffc4]/80 transition-all duration-300">
                      Service {sol.num}
                    </span>
                    <span className="text-[1.25rem] font-bold leading-tight block">{sol.name}</span>
                    
                    {/* Collapsible description that expands on hover */}
                    <p className="max-h-0 opacity-0 overflow-hidden text-[0.82rem] text-white/70 transition-all duration-500 ease-out group-hover:max-h-[60px] group-hover:opacity-100 group-hover:mt-2">
                      {sol.desc}
                    </p>
                  </div>
                  
                  {/* Action Button - Rotates to point directly up on hover */}
                  <motion.div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white border border-white/10 backdrop-blur-sm transition-all duration-300 group-hover:bg-[#00ffc4] group-hover:text-[#07140f] group-hover:border-[#00ffc4] group-hover:rotate-45"
                    whileHover={{ scale: 1.15 }}
                  >
                    <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Solutions