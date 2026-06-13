import React, { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

const containerClass = 'mx-auto max-w-[1200px] px-5 md:px-8'

const milestones = [
  {
    year: '1997',
    title: 'Founding & Water Networks',
    location: 'Dubai HQ',
    desc: 'Island Tower Electromechanical Works was founded in Dubai, delivering key municipal utility pipe connections and water infrastructure routing across the UAE.',
    highlight: 'Pipeline Span: 42 km',
    svg: (
      <svg className="w-full h-full text-[#00ffc4]/15" viewBox="0 0 100 100" fill="none" stroke="currentColor">
        <circle cx="50" cy="50" r="30" strokeWidth="0.8" strokeDasharray="3 3" />
        <path d="M10 50 H90 M50 10 V90" strokeWidth="0.5" />
        <path d="M25 25 L75 75 M25 75 L75 25" strokeWidth="0.5" strokeDasharray="1 1" />
      </svg>
    )
  },
  {
    year: '2005',
    title: 'High-Rise Skyscraper MEP',
    location: 'Dubai Marina',
    desc: 'Contracted for full turnkey MEP execution on high-density skyscraper landmarks, proving our electromechanical capacity for core mechanical piping, HVAC systems, and fire protection networks.',
    highlight: 'Buildings: 12 Towers',
    svg: (
      <svg className="w-full h-full text-[#00ffc4]/15" viewBox="0 0 100 100" fill="none" stroke="currentColor">
        <rect x="35" y="15" width="30" height="75" strokeWidth="0.8" />
        <line x1="35" y1="30" x2="65" y2="30" strokeWidth="0.5" />
        <line x1="35" y1="45" x2="65" y2="45" strokeWidth="0.5" />
        <line x1="35" y1="60" x2="65" y2="60" strokeWidth="0.5" />
        <line x1="35" y1="75" x2="65" y2="75" strokeWidth="0.5" />
        <path d="M20 90 H80" strokeWidth="1" />
      </svg>
    )
  },
  {
    year: '2012',
    title: 'District Cooling Rollout',
    location: 'Downtown District',
    desc: 'Pioneered regional environmental mechanical services by integrating large-capacity district cooling pipelines, ventilation plants, and low-energy HVAC chiller units for local municipal regions.',
    highlight: 'Total Capacity: 24,000 RT',
    svg: (
      <svg className="w-full h-full text-[#00ffc4]/15" viewBox="0 0 100 100" fill="none" stroke="currentColor">
        <circle cx="50" cy="50" r="35" strokeWidth="0.8" />
        <path d="M50 15 V85 M15 50 H85" strokeWidth="0.5" strokeDasharray="2 2" />
        <circle cx="50" cy="50" r="10" strokeWidth="0.8" />
        <path d="M28 28 L72 72 M28 72 L72 28" strokeWidth="0.5" />
      </svg>
    )
  },
  {
    year: '2019',
    title: 'GCC Infrastructure Expansion',
    location: 'Riyadh Office',
    desc: 'Expanded civil engineering, deep shoring, chemical process piping, and road infrastructure works into Abu Dhabi, Riyadh, and Jeddah to capture broader regional growth.',
    highlight: 'Active Workforce: 1,500+',
    svg: (
      <svg className="w-full h-full text-[#00ffc4]/15" viewBox="0 0 100 100" fill="none" stroke="currentColor">
        <polygon points="50,15 90,85 10,85" strokeWidth="0.8" />
        <line x1="50" y1="15" x2="50" y2="85" strokeWidth="0.5" />
        <line x1="30" y1="50" x2="70" y2="50" strokeWidth="0.5" />
        <circle cx="50" cy="55" r="12" strokeWidth="0.5" fill="none" />
      </svg>
    )
  },
  {
    year: '2026',
    title: 'Next-Gen Smart Utility Grids',
    location: 'Abu Dhabi Hub',
    desc: 'Deploying solar distribution grids, power grid routing, wastewater filtration stations, and real-time interactive 3D digital twins for active telemetry monitoring.',
    highlight: 'Renewables: 150+ MW',
    svg: (
      <svg className="w-full h-full text-[#00ffc4]/15" viewBox="0 0 100 100" fill="none" stroke="currentColor">
        <circle cx="50" cy="50" r="40" strokeWidth="0.8" />
        <circle cx="50" cy="50" r="25" strokeWidth="0.5" />
        <path d="M50 10 L50 90 M10 50 L90 50" strokeWidth="0.5" strokeDasharray="3 3" />
        <polygon points="50,35 65,50 50,65 35,50" strokeWidth="0.8" />
      </svg>
    )
  }
]

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
  const [activeTimelineTab, setActiveTimelineTab] = useState(0)

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
        <div id="story" ref={sec1Ref} className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-24 md:mb-32 pt-12 md:pt-20">
          
          {/* Legacy Column Card */}
          <motion.div 
            className="flex flex-col border border-gray-200/60 bg-[#fcfbf7]/40 rounded-3xl p-6 md:p-8 shadow-[0_15px_45px_-10px_rgba(7,20,15,0.02)] hover:border-[#00664f]/30 hover:bg-white hover:shadow-[0_25px_60px_-15px_rgba(7,20,15,0.07)] transition-all duration-400 group"
            style={{ y: cardY1 }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-80px' }}
            transition={{ duration: 0.8, ease: smoothEase }}
          >
            {/* Parallax Image Window */}
            <div className="relative overflow-hidden rounded-2xl h-[260px] md:h-[300px] mb-8 border border-black/5 shadow-md">
              <motion.img
                src="/assets/legacy_worker.jpg"
                alt="Legacy Engineering Works"
                className="absolute inset-x-0 top-[-15%] h-[130%] w-full object-cover transition-transform duration-700 group-hover:scale-103"
                style={{ y: s1ImageY1 }}
                loading="lazy"
              />
              {/* Decorative Blueprint Corner Lines */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#00ffc4]/50 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#00ffc4]/50 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Technical Telemetry Tag */}
              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded text-[7px] font-mono text-[#00ffc4] opacity-0 group-hover:opacity-90 transition-opacity duration-300">
                SCALE: 1:250 | PLOT_1
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-[#00664f] text-[10px] md:text-[11px] font-bold tracking-[3px] uppercase">
                OUR ROOTED HISTORY
              </div>
              
              <h3 className="text-[1.5rem] md:text-[1.8rem] font-bold text-[#07140f] leading-none tracking-tight uppercase font-body">
                Legacy
              </h3>
              
              <p className="text-gray-600 text-[0.88rem] leading-[1.75] min-h-[100px]">
                Over 25 years since its inception, Island Tower Electromechanical Works LLC has emerged as a market leader in the EMEA region, delivering high-quality turnkey projects from its Dubai headquarters. Specializing in infrastructure, MEP, and civil works, our partnerships are rooted in shared values, quality execution, and engineering excellence.
              </p>
              
              <div className="pt-2">
                <a 
                  href="#history" 
                  className="inline-flex items-center gap-3 bg-[#e2e1da] hover:bg-[#07140f] hover:text-white text-[#07140f] font-bold text-[0.75rem] tracking-[0.5px] px-5 py-3 rounded-full transition-all duration-300 group/btn"
                >
                  Our History
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#07140f]/5 text-[#07140f] group-hover/btn:bg-white/15 group-hover/btn:text-white transition-colors">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                    </svg>
                  </span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Collaboration Column Card */}
          <motion.div 
            className="flex flex-col border border-gray-200/60 bg-[#fcfbf7]/40 rounded-3xl p-6 md:p-8 shadow-[0_15px_45px_-10px_rgba(7,20,15,0.02)] hover:border-[#00664f]/30 hover:bg-white hover:shadow-[0_25px_60px_-15px_rgba(7,20,15,0.07)] transition-all duration-400 group"
            style={{ y: cardY2 }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: smoothEase }}
          >
            {/* Parallax Image Window */}
            <div className="relative overflow-hidden rounded-2xl h-[260px] md:h-[300px] mb-8 border border-black/5 shadow-md">
              <motion.img
                src="/assets/collaboration_mep.jpg"
                alt="Island Tower Professional Team"
                className="absolute inset-x-0 top-[-15%] h-[130%] w-full object-cover transition-transform duration-700 group-hover:scale-103"
                style={{ y: s1ImageY2 }}
                loading="lazy"
              />
              {/* Decorative Blueprint Corner Lines */}
              <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#00ffc4]/50 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#00ffc4]/50 pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Technical Telemetry Tag */}
              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded text-[7px] font-mono text-[#00ffc4] opacity-0 group-hover:opacity-90 transition-opacity duration-300">
                GRID: BIM_ACTIVE | REF_2
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-[#00664f] text-[10px] md:text-[11px] font-bold tracking-[3px] uppercase">
                INTEGRATED SOLUTIONS
              </div>
              
              <h3 className="text-[1.5rem] md:text-[1.8rem] font-bold text-[#07140f] leading-none tracking-tight uppercase font-body">
                Collaboration
              </h3>
              
              <p className="text-gray-600 text-[0.88rem] leading-[1.75] min-h-[100px]">
                Drawing on a wealth of shared expertise and technical coordination, our engineering and management teams are empowered to deliver broader electromechanical services, explore new infrastructure markets, and expand employee career opportunities — a core pillar of our turnkey contractor model.
              </p>
              
              <div className="pt-2">
                <a 
                  href="#solutions" 
                  className="inline-flex items-center gap-3 bg-[#e2e1da] hover:bg-[#07140f] hover:text-white text-[#07140f] font-bold text-[0.75rem] tracking-[0.5px] px-5 py-3 rounded-full transition-all duration-300 group/btn"
                >
                  Our Model
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#07140f]/5 text-[#07140f] group-hover/btn:bg-white/15 group-hover/btn:text-white transition-colors">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                    </svg>
                  </span>
                </a>
              </div>
            </div>
          </motion.div>

        </div>

        {/* ── SECTION 1.5: INTERACTIVE HISTORY TIMELINE ────────────────── */}
        <div id="history" className="mb-24 md:mb-32 border-t border-gray-150 pt-20 scroll-mt-24">
          <div className="text-center max-w-[700px] mx-auto mb-16">
            <span className="text-[#00664f] text-[10px] md:text-[11px] font-bold tracking-[3px] uppercase mb-3 block">
              // LEGACY LOGS
            </span>
            <h3 className="font-body text-[clamp(1.5rem,3.2vw,2.4rem)] font-extrabold text-[#07140f] tracking-tight leading-none uppercase">
              25+ Years of Engineering Growth
            </h3>
            <p className="text-gray-500 text-xs md:text-[13px] mt-3 leading-relaxed">
              Explore the critical milestones that defined Island Tower's expansion from a localized pipe-contractor into a regional electromechanical contractor.
            </p>
          </div>

          {/* Interactive Timeline Track */}
          <div className="relative max-w-4xl mx-auto mb-16 px-4">
            {/* Connecting line */}
            <div className="absolute top-[21px] left-8 right-8 h-[2px] bg-gray-200 -z-10" />
            <div 
              className="absolute top-[21px] left-8 h-[2px] bg-[#00664f] transition-all duration-500 -z-10" 
              style={{ width: `${(activeTimelineTab / (milestones.length - 1)) * 90}%` }}
            />

            <div className="flex justify-between items-center">
              {milestones.map((m, idx) => (
                <button
                  key={m.year}
                  onClick={() => setActiveTimelineTab(idx)}
                  className="flex flex-col items-center gap-2.5 cursor-pointer relative z-10 focus:outline-none group bg-transparent border-none"
                >
                  {/* Glowing dial node */}
                  <div 
                    className={`h-11 w-11 rounded-full border-2 flex items-center justify-center font-body text-[11px] font-bold transition-all duration-300 ${
                      activeTimelineTab === idx 
                        ? 'bg-[#07140f] text-[#00ffc4] border-[#07140f] scale-110 shadow-[0_0_15px_rgba(0,255,196,0.3)]' 
                        : 'bg-white text-gray-500 border-gray-300 hover:border-gray-500 hover:text-gray-800'
                    }`}
                  >
                    {m.year.slice(2)}
                  </div>
                  <span className={`text-[10px] font-bold tracking-wider font-mono uppercase ${
                    activeTimelineTab === idx ? 'text-[#00664f]' : 'text-gray-400 group-hover:text-gray-600'
                  }`}>
                    {m.year}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Card Viewer */}
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTimelineTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-[#fcfbf7]/60 border border-gray-150 p-6 md:p-10 rounded-3xl relative overflow-hidden"
              >
                {/* Tech Blueprint Visual (Right on Desktop, Top on Mobile) */}
                <div className="md:col-span-5 flex justify-center order-first md:order-last">
                  <div className="relative w-[180px] h-[180px] md:w-[220px] md:h-[220px] rounded-2xl border border-gray-200 bg-white/70 flex items-center justify-center p-6 shadow-sm overflow-hidden group">
                    {/* Concentric rings decoration */}
                    <div className="absolute inset-4 border border-dashed border-gray-100 rounded-full animate-[spin_50s_linear_infinite]" />
                    <div className="absolute inset-10 border border-gray-100 rounded-full animate-[spin_25s_linear_infinite_reverse]" />
                    <motion.div 
                      className="w-full h-full relative z-10 text-[#00664f]/70"
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
                    >
                      {milestones[activeTimelineTab].svg}
                    </motion.div>
                    {/* HUD metrics overlay */}
                    <div className="absolute bottom-2 left-3 font-mono text-[7px] text-gray-400 select-none">GRID: TELEMETRY_ACTIVE</div>
                  </div>
                </div>

                {/* Milestone Details */}
                <div className="md:col-span-7 space-y-4">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="text-[2.2rem] md:text-[2.8rem] font-black leading-none text-[#00664f] tracking-tight font-body">
                      {milestones[activeTimelineTab].year}
                    </span>
                    <span className="rounded bg-[#07140f] text-[#00ffc4] text-[8px] font-bold uppercase tracking-[1.5px] px-2 py-1">
                      {milestones[activeTimelineTab].location}
                    </span>
                  </div>
                  
                  <h4 className="text-[1.12rem] font-bold text-gray-900 tracking-tight leading-tight uppercase">
                    {milestones[activeTimelineTab].title}
                  </h4>
                  
                  <p className="text-gray-600 text-[0.88rem] leading-[1.75]">
                    {milestones[activeTimelineTab].desc}
                  </p>

                  <div className="pt-3 border-t border-gray-200/60 flex items-center gap-2">
                    <span className="text-[8px] font-bold tracking-widest text-gray-400 font-mono uppercase">PROJECT STACK VALUE:</span>
                    <span className="text-[0.82rem] font-bold text-gray-800 font-mono">
                      {milestones[activeTimelineTab].highlight}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── SECTION 2: IMMERSIVE BACKGROUND VIDEO BANNER ────────────── */}
        <motion.div 
          id="certifications"
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
            preload="metadata"
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
        <div id="leadership" ref={sec3Ref} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
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