import React, { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const containerClass = 'mx-auto max-w-[1200px] px-5 md:px-8'

const keyFacts = [
  { title: 'Established in 1997', text: 'Over two decades of engineering leadership and turnkey infrastructure delivery.' },
  { title: 'Dubai Headquarters', text: 'Headquartered in Dubai, with extensive operations across the E.M.E.A region.' },
  { title: 'Diverse Specialization', text: 'In Infrastructure, MEP, Civil, Chemical, Water, and Energy sectors.' },
  { title: 'Approved Contractor', text: 'Licensed for ROW and civil works by RTA and Dubai Municipality.' },
  { title: 'Turnkey Project Expertise', text: 'Ensures seamless execution from feasibility to testing and final handover.' },
  { title: 'Quality & Sustainability', text: 'Committed to green energy installations, district cooling, and safety compliance.' },
  { title: 'Proven Track Record', text: 'A history of successful prestigious electromechanical contracts and region builds.' }
]

function About() {
  const [isMobile, setIsMobile] = useState(false)

  // Track resizing to disable dramatic parallax vertical offsets on mobile to prevent layout gaps
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Section Scroll Tracking for Parallel Parallax Scroll Effect
  const sec1Ref = useRef(null)
  const { scrollYProgress: s1Progress } = useScroll({
    target: sec1Ref,
    offset: ["start end", "end start"]
  })
  
  const sec2Ref = useRef(null)
  const { scrollYProgress: s2Progress } = useScroll({
    target: sec2Ref,
    offset: ["start end", "end start"]
  })

  const sec3Ref = useRef(null)
  const { scrollYProgress: s3Progress } = useScroll({
    target: sec3Ref,
    offset: ["start end", "end start"]
  })

  // Parallel scroll translations mapped to progress
  // Section 1: Inner images slide inside card windows
  const s1ImageY1 = useTransform(s1Progress, [0, 1], [-45, 45])
  const s1ImageY2 = useTransform(s1Progress, [0, 1], [-65, 65])

  // Section 1: Entire columns slide past each other at different speeds (desktop only)
  const s1CardY1 = useTransform(s1Progress, [0, 1], [40, -40])
  const s1CardY2 = useTransform(s1Progress, [0, 1], [100, -100])

  // Section 2: Banner container scales up as it enters viewport
  const s2Scale = useTransform(s2Progress, [0, 0.45], [0.96, 1])
  const s2VideoY = useTransform(s2Progress, [0, 1], [-70, 70])
  const s2TextY = useTransform(s2Progress, [0, 1], [35, -35])

  // Section 3: Left and right columns slide past each other
  const s3LeftY = useTransform(s3Progress, [0, 1], [30, -30])
  const s3RightY = useTransform(s3Progress, [0, 1], [-30, 30])

  // Conditional values based on viewport checks
  const cardY1 = isMobile ? 0 : s1CardY1
  const cardY2 = isMobile ? 0 : s1CardY2
  const bannerScale = isMobile ? 1 : s2Scale
  const videoY = isMobile ? 0 : s2VideoY
  const textY = isMobile ? 0 : s2TextY
  const leftY = isMobile ? 0 : s3LeftY
  const rightY = isMobile ? 0 : s3RightY

  // Common Transition Curves
  const smoothEase = [0.16, 1, 0.3, 1] // Luxury ease-out curve

  return (
    <section 
      id="about" 
      className="bg-white relative overflow-hidden"
    >
      {/* Decorative Technical Grid Lines */}
      <div className="absolute top-0 bottom-0 left-6 md:left-12 border-l border-dashed border-gray-100 pointer-events-none select-none z-0" />
      <div className="absolute top-0 bottom-0 right-6 md:right-12 border-r border-dashed border-gray-100 pointer-events-none select-none z-0" />

      <div className={`${containerClass} relative z-10`}>
        
        {/* ── SECTION 1: LEGACY & COLLABORATION SPLIT ────────────────── */}
        <div ref={sec1Ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-24 md:mb-32 pt-12 md:pt-20">
          
          {/* Legacy Column */}
          <motion.div 
            className="flex flex-col"
            style={{ y: cardY1 }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-80px' }}
            transition={{ duration: 0.8, ease: smoothEase }}
          >
            {/* Parallax Image Window */}
            <div className="relative overflow-hidden rounded-2xl h-[280px] md:h-[340px] mb-8 border border-black/5 shadow-xl">
              <motion.img
                src="/assets/worker.png"
                alt="Legacy Engineering Works"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ y: s1ImageY1, scale: 1.25 }}
              />
              {/* Decorative Blueprint Corner Lines */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#00ffc4]/50 pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#00ffc4]/50 pointer-events-none" />
            </div>

            <motion.div 
              className="text-[#00664f] text-[10px] md:text-[11px] font-bold tracking-[3px] uppercase mb-3"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: '-80px' }}
              transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            >
              OUR ROOTED HISTORY
            </motion.div>
            
            <motion.h2 
              className="text-[2rem] md:text-[2.5rem] font-bold text-[#07140f] leading-none mb-4 tracking-tight uppercase font-body"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
            >
              Legacy
            </motion.h2>
            
            <motion.p 
              className="text-gray-600 text-[0.92rem] leading-[1.8] mb-6 max-w-[500px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            >
              Over 25 years since its inception, Island Tower Electromechanical Works LLC has emerged as a market leader in the EMEA region, delivering high-quality turnkey projects from its Dubai headquarters. Specializing in infrastructure, MEP, and civil works, our partnerships are rooted in shared values, quality execution, and engineering excellence.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, margin: '-80px' }}
              transition={{ duration: 0.5, delay: 0.25, ease: 'easeOut' }}
            >
              <a 
                href="#history" 
                className="inline-flex items-center gap-3 bg-[#e2e1da] hover:bg-[#d6d5cd] text-[#07140f] font-bold text-[0.78rem] tracking-[0.5px] px-6 py-3.5 rounded-full transition-all duration-300"
              >
                Our History
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#07140f]/5 text-[#07140f]">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                  </svg>
                </span>
              </a>
            </motion.div>
          </motion.div>

          {/* Collaboration Column */}
          <motion.div 
            className="flex flex-col"
            style={{ y: cardY2 }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: smoothEase }}
          >
            {/* Parallax Image Window */}
            <div className="relative overflow-hidden rounded-2xl h-[280px] md:h-[340px] mb-8 border border-black/5 shadow-xl">
              <motion.img
                src="/assets/detail.png"
                alt="Island Tower Professional Team"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ y: s1ImageY2, scale: 1.25 }}
              />
              {/* Decorative Blueprint Corner Lines */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#00ffc4]/50 pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#00ffc4]/50 pointer-events-none" />
            </div>

            <motion.div 
              className="text-[#00664f] text-[10px] md:text-[11px] font-bold tracking-[3px] uppercase mb-3"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: '-80px' }}
              transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            >
              INTEGRATED SOLUTIONS
            </motion.div>
            
            <motion.h2 
              className="text-[2rem] md:text-[2.5rem] font-bold text-[#07140f] leading-none mb-4 tracking-tight uppercase font-body"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
            >
              Collaboration
            </motion.h2>
            
            <motion.p 
              className="text-gray-600 text-[0.92rem] leading-[1.8] mb-6 max-w-[500px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            >
              Drawing on a wealth of shared expertise and technical coordination, our engineering and management teams are empowered to deliver broader electromechanical services, explore new infrastructure markets, and expand employee career opportunities — a core pillar of our turnkey contractor model.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, margin: '-80px' }}
              transition={{ duration: 0.5, delay: 0.25, ease: 'easeOut' }}
            >
              <a 
                href="#solutions" 
                className="inline-flex items-center gap-3 bg-[#e2e1da] hover:bg-[#d6d5cd] text-[#07140f] font-bold text-[0.78rem] tracking-[0.5px] px-6 py-3.5 rounded-full transition-all duration-300"
              >
                Our Model
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#07140f]/5 text-[#07140f]">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                  </svg>
                </span>
              </a>
            </motion.div>
          </motion.div>

        </div>

        {/* ── SECTION 2: IMMERSIVE BACKGROUND VIDEO BANNER ────────────── */}
        <motion.div 
          ref={sec2Ref}
          className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden aspect-[16/10] md:aspect-[21/9] min-h-[400px] mb-24 md:mb-32 shadow-2xl border border-black/5"
          style={{ scale: bannerScale }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, margin: '-80px' }}
          transition={{ duration: 0.8 }}
        >
          {/* Loop Construction Video Background */}
          <motion.video
            className="absolute inset-0 w-full h-full object-fill"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/assets/dubai.png"
            src="https://player.vimeo.com/external/383097790.hd.mp4?s=c5a93378921fbbeb25dd71e49033afdd915466eb&profile_id=175"
            style={{ y: videoY, scale: 1.25 }}
          />
          
          {/* Dark shade overlay */}
          <div className="absolute inset-0 bg-black/45 backdrop-blur-[0.5px] z-10" />
          
          {/* HUD scan overlay effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#00ffc4]/5 via-transparent to-transparent pointer-events-none z-10" />

          {/* Overlaid Banner Text Content */}
          <motion.div 
            className="absolute inset-0 flex flex-col justify-between p-8 md:p-16 text-white z-20"
            style={{ y: textY }}
          >
            {/* Live Indicator tag */}
            <div className="flex justify-between items-start">
              <motion.span 
                className="inline-flex items-center gap-1.5 rounded bg-white/10 px-2.5 py-1 backdrop-blur-md border border-white/10 text-[0.6rem] font-bold uppercase tracking-widest text-[#00ffc4]"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, margin: '-80px' }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00ffc4] opacity-75"></span>
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#00ffc4]"></span>
                </span>
                Active build telemetry
              </motion.span>
              
              <span className="text-[0.6rem] font-mono text-white/50 tracking-wider hidden sm:inline">
                ESTABLISHED 1997 | DUBAI OFFICE
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-end mt-auto">
              <div className="lg:col-span-5">
                <motion.h3 
                  className="text-[2.2rem] md:text-[3.2rem] font-black leading-none tracking-tight text-white uppercase font-body"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: '-80px' }}
                  transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
                >
                  Technical<br />
                  precision
                </motion.h3>
              </div>
              
              <div className="lg:col-span-7">
                <motion.p 
                  className="text-white/80 text-[0.88rem] md:text-[0.98rem] leading-relaxed max-w-[580px] mb-6 md:mb-0"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: '-80px' }}
                  transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
                >
                  From humble beginnings, Island Tower has evolved into a premier contractor, offering integrated engineering solutions in district cooling network projects, drainage systems, excavation and shoring, NDRC, wastewater treatment, roadworks, HVAC, and structural steel works. Our operatives are driven by accountability, craft, and safety in their work.
                </motion.p>
              </div>
            </div>

            {/* Banner button */}
            <div className="mt-8 flex justify-between items-center border-t border-white/10 pt-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, margin: '-80px' }}
                transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
              >
                <a 
                  href="#solutions" 
                  className="inline-flex items-center gap-3 bg-[#e2e1da] hover:bg-white text-[#07140f] font-bold text-[0.8rem] tracking-[0.5px] px-6 py-3 rounded-full transition-all duration-300"
                >
                  Learn More
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#07140f]/5 text-[#07140f]">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                    </svg>
                  </span>
                </a>
              </motion.div>
              
              <div className="text-[0.6rem] font-mono text-white/40 tracking-widest hidden md:inline">
                ISO 9001 | ISO 14001 | ISO 45001 CERTIFIED
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ── SECTION 3: KEY FACTS & METRICS GRID ─────────────────── */}
        <div ref={sec3Ref} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Description Column */}
          <motion.div 
            className="lg:col-span-5"
            style={{ y: leftY }}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: '-80px' }}
            transition={{ duration: 0.8, ease: smoothEase }}
          >
            <h2 className="font-body text-[clamp(1.8rem,3.5vw,2.6rem)] font-extrabold leading-[1.2] text-[#07140f] tracking-tight mb-6">
              A turnkey scale —<br />
              <span className="font-serif italic font-normal text-[#00664f]">our numbers</span> at a glance
            </h2>
            <p className="text-gray-600 text-[0.95rem] leading-[1.8] max-w-[460px]">
              Island Tower's numbers today are the result of purposeful strategy, safety standards, and technical stewardship since our founding. We combine robust logistics with electromechanical precision.
            </p>
          </motion.div>

          {/* Right Metrics Grid Column */}
          <motion.div 
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16 lg:pl-8"
            style={{ y: rightY }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-80px' }}
            transition={{ duration: 0.8, ease: smoothEase }}
          >
            
            {/* Metric 1 */}
            <motion.div 
              className="flex items-start gap-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.05, ease: 'easeOut' }}
            >
              <div className="text-gray-400 shrink-0 mt-1">
                <svg className="w-12 h-12 stroke-current" fill="none" viewBox="0 0 48 48" strokeWidth={1.5}>
                  <circle cx="20" cy="24" r="12" />
                  <circle cx="28" cy="24" r="12" />
                </svg>
              </div>
              <div>
                <h4 className="text-[2.8rem] font-bold text-[#07140f] leading-none mb-2 tracking-tight">25+</h4>
                <p className="text-[0.68rem] font-bold uppercase tracking-wider text-gray-400">Years of leadership</p>
                <p className="text-[0.8rem] text-gray-500 mt-1 leading-relaxed">Delivering turnkey infrastructure projects across EMEA regions.</p>
              </div>
            </motion.div>

            {/* Metric 2 */}
            <motion.div 
              className="flex items-start gap-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
            >
              <div className="text-gray-400 shrink-0 mt-1">
                <svg className="w-12 h-12 stroke-current" fill="none" viewBox="0 0 48 48" strokeWidth={1.5}>
                  <circle cx="24" cy="24" r="16" />
                  <path d="M8 24h32M24 8a16 16 0 010 32M24 8a16 16 0 000 32" />
                </svg>
              </div>
              <div>
                <h4 className="text-[2.8rem] font-bold text-[#07140f] leading-none mb-2 tracking-tight">500+</h4>
                <p className="text-[0.68rem] font-bold uppercase tracking-wider text-gray-400">Projects Delivered</p>
                <p className="text-[0.8rem] text-gray-500 mt-1 leading-relaxed">Electromechanical, district cooling, and civil installations completed.</p>
              </div>
            </motion.div>

            {/* Metric 3 */}
            <motion.div 
              className="flex items-start gap-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
            >
              <div className="text-gray-400 shrink-0 mt-1">
                <svg className="w-12 h-12 stroke-current" fill="none" viewBox="0 0 48 48" strokeWidth={1.5}>
                  <rect x="12" y="10" width="24" height="28" rx="3" />
                  <path d="M18 24l4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <h4 className="text-[2.8rem] font-bold text-[#07140f] leading-none mb-2 tracking-tight">ISO</h4>
                <p className="text-[0.68rem] font-bold uppercase tracking-wider text-gray-400">Quality Assured</p>
                <p className="text-[0.8rem] text-gray-500 mt-1 leading-relaxed">Certified for safety, environmental standards, and execution.</p>
              </div>
            </motion.div>

            {/* Metric 4 */}
            <motion.div 
              className="flex items-start gap-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
            >
              <div className="text-gray-400 shrink-0 mt-1">
                <svg className="w-12 h-12 stroke-current" fill="none" viewBox="0 0 48 48" strokeWidth={1.5}>
                  <circle cx="24" cy="24" r="8" />
                  <circle cx="24" cy="24" r="16" strokeDasharray="4 4" />
                  <path d="M24 2v4M24 42v4M2 24h4M42 24h4" />
                </svg>
              </div>
              <div>
                <h4 className="text-[2.8rem] font-bold text-[#07140f] leading-none mb-2 tracking-tight">RTA</h4>
                <p className="text-[0.68rem] font-bold uppercase tracking-wider text-gray-400">Approved Contractor</p>
                <p className="text-[0.8rem] text-gray-500 mt-1 leading-relaxed">Approved for civil infrastructure works by Dubai authorities.</p>
              </div>
            </motion.div>

          </motion.div>

        </div>

        {/* ── SECTION 4: DETAILED FACTS FEATURES CHECKLIST ───────── */}
        <div className="mt-24 pt-16 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {keyFacts.map((fact, i) => (
            <motion.div
              key={i}
              className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50/60 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#00664f]/10 text-[#00664f] mt-0.5">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <div>
                <h5 className="text-[0.92rem] font-bold text-[#07140f] leading-snug">
                  {fact.title}
                </h5>
                {fact.text && (
                  <p className="text-gray-500 text-[0.82rem] leading-relaxed mt-1">
                    {fact.text}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default About