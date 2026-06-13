import React, { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const containerClass = 'mx-auto max-w-[1200px] px-5 md:px-8'

/* Animated counter component */
function AnimatedCounter({ target, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (!isInView) return
    const num = parseInt(target)
    if (isNaN(num)) {
      setCount(target)
      return
    }

    let start = 0
    const duration = 2000
    const step = Math.max(1, Math.floor(num / (duration / 16)))
    const timer = setInterval(() => {
      start += step
      if (start >= num) {
        setCount(num)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, 16)
    return () => clearInterval(timer)
  }, [isInView, target])

  return (
    <span ref={ref} className="tabular-nums">
      {typeof count === 'number' ? count.toLocaleString() : target}
      {suffix}
    </span>
  )
}

function Stats() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  
  // States for 3D Tilt effect
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e) => {
    const card = e.currentTarget
    const box = card.getBoundingClientRect()
    const x = e.clientX - box.left - box.width / 2
    const y = e.clientY - box.top - box.height / 2
    
    // Tilt limit is 12 degrees
    const rX = -(y / (box.height / 2)) * 12
    const rY = (x / (box.width / 2)) * 12
    
    setRotateX(rX)
    setRotateY(rY)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  const stats = [
    { value: 500, suffix: '+', label: 'Completed Projects' },
    { value: 500, suffix: 'M+', label: 'Turnover (AED)' },
    { value: 25, suffix: '+', label: 'Years Experience' },
  ]

  return (
    <section className="bg-[#fcfbf7] py-24 md:py-32 overflow-hidden">
      <div className={containerClass}>
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-20">
          
          {/* Interactive 3D Video Card Column */}
          <motion.div
            className="relative cursor-pointer"
            style={{ perspective: 1000 }}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* 3D Tilt Wrapper */}
            <motion.div
              className="overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] relative group"
              animate={{ rotateX, rotateY }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={() => setIsVideoOpen(true)}
            >
              <img
                src="/assets/hero_industrial.png"
                alt="Island Tower Project"
                className="block w-full transition-transform duration-700 group-hover:scale-103 object-cover aspect-[4/3]"
              />
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/25 transition-all duration-300 group-hover:bg-black/15">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 border border-white/30 backdrop-blur-md transition-transform duration-300 group-hover:scale-110">
                  <span className="ml-1 text-2xl text-white">▶</span>
                </div>
              </div>
            </motion.div>
            
            {/* Decorative 3D Offset Border */}
            <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-2xl border-2 border-[#00664f]/15" />
          </motion.div>

          {/* Text + Stats Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="text-[#00664f] text-xs font-semibold uppercase tracking-[3px] mb-3">
              Who We Are
            </div>
            
            <h2 className="mb-10 font-body text-[clamp(1.5rem,2.8vw,2.2rem)] font-extrabold normal-case leading-[1.25] text-gray-900 tracking-tight">
              Industry leader providing integrated solutions across multiple sectors
            </h2>

            {/* Stats Cards Grid */}
            <div className="mb-10 grid grid-cols-3 gap-5 max-[600px]:grid-cols-1 max-[600px]:gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="rounded-xl border border-gray-100 bg-white p-5 text-center shadow-md transition-all duration-300"
                  whileHover={{ 
                    y: -8, 
                    scale: 1.04, 
                    boxShadow: '0 15px 30px rgba(0, 102, 79, 0.08)',
                    borderColor: 'rgba(0, 102, 79, 0.15)'
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                >
                  <h3 className="mb-1 text-[2.2rem] font-black text-[#00664f] tracking-tight">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </h3>
                  <p className="text-[0.68rem] font-bold uppercase tracking-[1.5px] text-gray-400">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Premium Download Brochure Button */}
            <motion.button
              className="group relative cursor-pointer overflow-hidden rounded-full border-none bg-[#07140f] px-10 py-4 text-[0.85rem] font-bold tracking-[0.5px] text-white transition-all duration-400 shadow-md hover:shadow-lg"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                DOWNLOAD BROCHURE 
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 13l-7 7-7-7m14-6L12 14 5 7" />
                </svg>
              </span>
              <div className="absolute inset-0 -translate-x-full bg-[#00664f] transition-transform duration-400 group-hover:translate-x-0" />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* ── LIGHTBOX VIDEO MODAL ───────────────────────────── */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
            onClick={() => setIsVideoOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-black shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsVideoOpen(false)}
                className="absolute right-4 top-4 z-50 rounded-full bg-black/50 p-2 text-white/70 hover:bg-black/80 hover:text-white transition-colors"
                aria-label="Close video"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Video Player */}
              <div className="aspect-video w-full bg-black">
                <video
                  className="h-full w-full object-contain"
                  controls
                  autoPlay
                  playsInline
                >
                  <source
                    src="https://player.vimeo.com/external/543008752.hd.mp4?s=dcf0cd4dba619c5298388c36ef2496ed51cc333e&profile_id=175"
                    type="video/mp4"
                  />
                </video>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Stats