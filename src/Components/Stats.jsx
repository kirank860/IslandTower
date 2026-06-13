import React, { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence, useInView, useScroll, useTransform, useMotionTemplate } from 'framer-motion'

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

/* Reusable Glass 3D Stats Card */
function Glass3DCard({ children, delay = 0 }) {
  const cardRef = useRef(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const box = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - box.left) / box.width - 0.5
    const y = (e.clientY - box.top) / box.height - 0.5
    setRotateX(-y * 14) // 14 degrees max tilt
    setRotateY(x * 14)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setRotateX(0)
        setRotateY(0)
      }}
      className="relative rounded-2xl border border-white/60 bg-white/60 p-6 text-center backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.03)] transition-all duration-300 w-full"
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
      }}
      animate={{
        rotateX,
        rotateY,
        scale: isHovered ? 1.04 : 1,
        borderColor: isHovered ? 'rgba(0, 102, 79, 0.2)' : 'rgba(255,255,255,0.6)',
        boxShadow: isHovered 
          ? '0 20px 45px -10px rgba(7,20,15,0.06), 0 0 15px rgba(0, 255, 196, 0.04)' 
          : '0 8px 32px rgba(0,0,0,0.03)'
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay, duration: 0.6 }}
    >
      <div 
        style={{ 
          transform: isHovered ? 'translateZ(40px)' : 'translateZ(0px)',
          transition: 'transform 0.25s ease-out',
          transformStyle: 'preserve-3d'
        }}
      >
        {children}
      </div>
      {/* Decorative corners */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#00ffc4]/0 group-hover:border-[#00ffc4]/40 rounded-tl-xl transition-all duration-300 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#00ffc4]/0 group-hover:border-[#00ffc4]/40 rounded-br-xl transition-all duration-300 pointer-events-none" />
    </motion.div>
  )
}

/* Reusable 3D Process Step Card */
function ProcessCard3D({ step, title, description, delay = 0 }) {
  const cardRef = useRef(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const box = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - box.left) / box.width - 0.5
    const y = (e.clientY - box.top) / box.height - 0.5
    setRotateX(-y * 12) // 12 degrees max tilt
    setRotateY(x * 12)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setRotateX(0)
        setRotateY(0)
      }}
      className="relative rounded-2xl border border-white/5 bg-[#07140f] p-8 text-left overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.15)] transition-all duration-300 w-full min-h-[260px] flex flex-col justify-between"
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
      }}
      animate={{
        rotateX,
        rotateY,
        scale: isHovered ? 1.03 : 1,
        borderColor: isHovered ? 'rgba(0, 255, 196, 0.25)' : 'rgba(255,255,255,0.05)',
        boxShadow: isHovered 
          ? '0 30px 60px -10px rgba(7,20,15,0.3), 0 0 20px rgba(0, 255, 196, 0.08)' 
          : '0 12px 40px rgba(0,0,0,0.15)'
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay, duration: 0.7, ease: [0.21, 0.85, 0.46, 1] }}
    >
      <div 
        className="relative z-10 flex flex-col h-full justify-between"
        style={{ 
          transform: isHovered ? 'translateZ(30px)' : 'translateZ(0px)',
          transition: 'transform 0.25s ease-out',
          transformStyle: 'preserve-3d'
        }}
      >
        <div>
          {/* Accent small line */}
          <div className="w-6 h-[2px] bg-[#00ffc4] mb-5 opacity-80" />
          <h4 className="text-[1.12rem] font-bold text-white tracking-tight mb-3">
            {title}
          </h4>
          <p className="text-gray-400 text-[0.8rem] leading-relaxed">
            {description}
          </p>
        </div>
      </div>
      
      {/* Huge Translucent background number */}
      <span 
        className="absolute bottom-2 left-6 text-[6.5rem] font-black text-white/[0.03] select-none pointer-events-none transition-colors duration-300 font-body"
        style={{
          transform: isHovered ? 'translateZ(10px) scale(1.05)' : 'translateZ(0px) scale(1)',
          transition: 'transform 0.25s ease-out',
          color: isHovered ? 'rgba(0, 255, 196, 0.04)' : 'rgba(255,255,255,0.02)'
        }}
      >
        {step}
      </span>
      
      {/* Glowing card border decoration on hover */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#00ffc4]/0 group-hover:border-[#00ffc4]/40 rounded-tl-xl transition-all duration-300 pointer-events-none" />
    </motion.div>
  )
}

function Stats() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const sectionRef = useRef(null)
  const mediaCardRef = useRef(null)

  // Dynamic responsive values for curve height and initial offset translation
  const [dimensions, setDimensions] = useState({ curveHeight: 260, shiftAmount: -25 })

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768
      setDimensions({
        curveHeight: isMobile ? 120 : 260,
        shiftAmount: isMobile ? -12 : -25
      })
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  // Framer Motion Scroll Tracking
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"]
  })

  // Morph border-radius dome shape to flat line based on scroll progress
  const rx = useTransform(scrollYProgress, [0, 0.85], [50, 0])
  const ry = useTransform(scrollYProgress, [0, 0.85], [dimensions.curveHeight, 0])
  const borderRadius = useMotionTemplate`${rx}% ${rx}% 0% 0% / ${ry}px ${ry}px 0px 0px`

  // Pull section upward slightly on page load, and transition to its natural flow on scroll
  const sectionY = useTransform(scrollYProgress, [0, 0.85], [dimensions.shiftAmount, 0])

  // Parallax translation for inner contents rising up
  const contentY = useTransform(scrollYProgress, [0.1, 0.9], [100, 0])
  const contentOpacity = useTransform(scrollYProgress, [0.1, 0.85], [0.15, 1])

  // 3D Parallax Background Outline Image Movements
  // (bgY1 goes up, bgY2 goes down; counter-parallax increases the 3D Z-depth effect)
  const bgY1 = useTransform(scrollYProgress, [0, 1], [120, -120])
  const bgY2 = useTransform(scrollYProgress, [0, 1], [-100, 100])
  
  // 3D Tilt for Video Media Card
  const [mediaRotateX, setMediaRotateX] = useState(0)
  const [mediaRotateY, setMediaRotateY] = useState(0)
  const [mediaHovered, setMediaHovered] = useState(false)

  const handleMediaMouseMove = (e) => {
    if (!mediaCardRef.current) return
    const card = mediaCardRef.current
    const box = card.getBoundingClientRect()
    const x = (e.clientX - box.left) / box.width - 0.5
    const y = (e.clientY - box.top) / box.height - 0.5
    setMediaRotateX(-y * 8) // 8 degrees tilt limit
    setMediaRotateY(x * 8)
  }

  const handleMediaMouseLeave = () => {
    setMediaHovered(false)
    setMediaRotateX(0)
    setMediaRotateY(0)
  }

  // Interactive Magnetic Button
  const btnRef = useRef(null)
  const [btnX, setBtnX] = useState(0)
  const [btnY, setBtnY] = useState(0)

  const handleBtnMouseMove = (e) => {
    if (!btnRef.current) return
    const btn = btnRef.current
    const box = btn.getBoundingClientRect()
    const x = e.clientX - (box.left + box.width / 2)
    const y = e.clientY - (box.top + box.height / 2)
    setBtnX(x * 0.2)
    setBtnY(y * 0.2)
  }

  const handleBtnMouseLeave = () => {
    setBtnX(0)
    setBtnY(0)
  }

  return (
    <motion.section 
      ref={sectionRef}
      id="about-details"
      className="bg-[#fcfbf7] py-24 md:py-32 overflow-hidden relative z-10 shadow-[0_-25px_60px_rgba(7,20,15,0.15)]"
      style={{ 
        borderTopLeftRadius: borderRadius,
        borderTopRightRadius: borderRadius,
        borderRadius: borderRadius,
        y: sectionY
      }}
    >
      {/* 3D PARALLAX BACKGROUND OUTLINE BLUEPRINTS */}
      {/* Left Blueprint: Slides upward on scroll */}
      <motion.img 
        src="/assets/infrastructure.png" 
        alt="Technical infrastructure drawing" 
        className="absolute left-[-60px] md:left-[-100px] top-[12%] w-[320px] md:w-[480px] h-auto opacity-[0.04] pointer-events-none select-none filter grayscale contrast-125 z-0"
        style={{ y: bgY1, rotate: -5 }}
      />
      {/* Right Blueprint: Slides downward on scroll (counter-parallax) */}
      <motion.img 
        src="/assets/detail.png" 
        alt="Technical engineering detail" 
        className="absolute right-[-70px] md:right-[-120px] bottom-[15%] w-[280px] md:w-[440px] h-auto opacity-[0.04] pointer-events-none select-none filter grayscale contrast-125 z-0"
        style={{ y: bgY2, rotate: 6 }}
      />

      {/* Decorative Dashed Margins / Technical Blueprint Lines */}
      <div className="absolute top-0 bottom-0 left-6 md:left-12 border-l border-dashed border-gray-200 pointer-events-none select-none z-0" />
      <div className="absolute top-0 bottom-0 right-6 md:right-12 border-r border-dashed border-gray-200 pointer-events-none select-none z-0" />

      {/* Decorative Technical Plus-Grids */}
      <div className="absolute top-12 right-12 md:right-20 grid grid-cols-5 gap-1.5 opacity-25 select-none pointer-events-none text-gray-300 font-mono text-[9px] z-0">
        {Array.from({ length: 25 }).map((_, i) => <span key={i}>+</span>)}
      </div>
      <div className="absolute bottom-12 left-12 md:left-20 grid grid-cols-5 gap-1.5 opacity-25 select-none pointer-events-none text-gray-300 font-mono text-[9px] z-0">
        {Array.from({ length: 25 }).map((_, i) => <span key={i}>+</span>)}
      </div>

      {/* Background Holographic Circles */}
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#00ffc4]/3 to-transparent rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-gradient-to-br from-[#00664f]/3 to-transparent rounded-full filter blur-3xl pointer-events-none" />

      {/* Parallax Content Wrapper */}
      <motion.div 
        className={`${containerClass} relative z-10`}
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {/* ROW 1: Header Titles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start mb-16">
          <div className="md:col-span-7">
            <div className="text-[#00664f] text-[10px] md:text-[11px] font-bold tracking-[3px] uppercase mb-4">
              WHO WE ARE
            </div>
            <h2 className="font-body text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold leading-[1.15] text-[#07140f] tracking-tight max-w-[620px]">
              Who We Are As Your Engineering & Infrastructure Partner
            </h2>
          </div>
          
          <div className="md:col-span-5 md:pt-10">
            <p className="text-gray-600 text-[clamp(0.85rem,1.8vw,0.98rem)] leading-relaxed">
              Our role is more than delivering electromechanical installations. We work alongside you as a premier engineering partner—translating complex specifications into clear choices and designing high-durability concrete, civil, and energy-efficient installations aligned with your goals, safety standards, and project parameters.
            </p>
          </div>
        </div>

        {/* ROW 2: Holographic 3D Layered Media Card */}
        <motion.div
          ref={mediaCardRef}
          className="relative cursor-pointer mb-28 max-w-[1100px] mx-auto select-none"
          style={{ 
            perspective: 1500,
            transformStyle: 'preserve-3d'
          }}
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
          onMouseMove={handleMediaMouseMove}
          onMouseEnter={() => setMediaHovered(true)}
          onMouseLeave={handleMediaMouseLeave}
          onClick={() => setIsVideoOpen(true)}
        >
          {/* Main 3D Card Frame */}
          <motion.div
            className="overflow-hidden rounded-2xl shadow-[0_25px_60px_rgba(7,20,15,0.06)] relative border border-white/45 bg-black"
            style={{ transformStyle: 'preserve-3d' }}
            animate={{ 
              rotateX: mediaRotateX, 
              rotateY: mediaRotateY,
              scale: mediaHovered ? 1.02 : 1,
              boxShadow: mediaHovered 
                ? '0 35px 80px rgba(7,20,15,0.14), 0 0 25px rgba(0, 255, 196, 0.05)' 
                : '0 25px 60px rgba(7,20,15,0.06)'
            }}
            transition={{ type: 'spring', damping: 25, stiffness: 120 }}
          >
            {/* Base Layer: Media Image asset */}
            <img
              src="/assets/bluewaters.png"
              alt="Island Tower Project Skyline"
              className="block w-full object-cover aspect-[21/9] min-h-[250px] transition-transform duration-700 hover:scale-103"
            />
            
            {/* Holographic scanning scanline */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#00ffc4]/3 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Play Button Overlay (Z = 70px) */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/15 transition-all duration-300">
              <motion.div 
                className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 border border-white/30 backdrop-blur-md relative"
                style={{ transform: mediaHovered ? 'translateZ(70px)' : 'translateZ(0px)' }}
                animate={{ 
                  scale: mediaHovered ? 1.15 : 1,
                  borderColor: mediaHovered ? '#00ffc4' : 'rgba(255,255,255,0.3)'
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 12 }}
              >
                <span className="absolute inset-0 rounded-full border border-[#00ffc4]/40 animate-ping opacity-50 pointer-events-none" />
                <svg className={`h-5 w-5 transition-all duration-300 ${mediaHovered ? 'text-[#00ffc4] scale-110' : 'text-white'}`} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </motion.div>
            </div>

            {/* Technical HUD Floating Telemetry Card (Z = 50px) */}
            <motion.div 
              className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-lg p-2.5 text-left pointer-events-none select-none hidden sm:block text-[#00ffc4]"
              style={{ transform: mediaHovered ? 'translateZ(50px)' : 'translateZ(0px)' }}
              animate={{ opacity: mediaHovered ? 0.95 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-[7px] tracking-[1.5px] font-bold text-white/50 uppercase leading-none mb-1">PROJECT COORDINATES</div>
              <div className="font-mono text-[8px] leading-none text-white/90">25.0458° N, 55.2708° E | DUBAI</div>
            </motion.div>
          </motion.div>
          
          {/* Back offset border decoration */}
          <motion.div 
            className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-2xl border-2 border-dashed border-[#00664f]/15" 
            animate={{ 
              x: mediaHovered ? 6 : 0, 
              y: mediaHovered ? 6 : 0,
              borderColor: mediaHovered ? 'rgba(0,255,196,0.2)' : 'rgba(0,102,79,0.1)'
            }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          />
        </motion.div>

        {/* ROW 3: Stats reveal (Centered layout from Sobha Realty) */}
        <div className="text-center max-w-[950px] mx-auto relative">
          <div className="text-[#00664f] text-[10px] md:text-[11px] font-bold tracking-[3px] uppercase mb-4">
            WHAT WE GOT
          </div>
          
          {/* Headline featuring luxury serif font detail */}
          <h3 className="font-body text-[clamp(1.4rem,3vw,2.1rem)] font-bold leading-[1.28] text-[#07140f] tracking-tight mb-16 mx-auto max-w-[800px]">
            More Than Services — We Engineer, <span className="font-serif italic font-normal text-[#00664f]">Construct</span>, And Help You Build With Confidence.
          </h3>

          {/* Stats Glass Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 justify-items-center mb-16">
            {/* Stat 1 Card */}
            <Glass3DCard delay={0.05}>
              <div className="absolute top-4 right-4 flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full  opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 " />
              </div>
              <h4 
                className="text-[2.2rem] md:text-[2.8rem] font-black text-[#00664f] leading-none mb-3 tracking-tight"
                style={{ transform: 'translateZ(45px)' }}
              >
                <AnimatedCounter target={500} suffix="+" />
              </h4>
              <p 
                className="text-gray-500 text-[0.7rem] font-bold uppercase tracking-[1px] leading-relaxed max-w-[185px] mx-auto"
                style={{ transform: 'translateZ(20px)' }}
              >
                Completed Projects across the Middle East region
              </p>
            </Glass3DCard>

            {/* Stat 2 Card */}
            <Glass3DCard delay={0.12}>
              <div className="absolute top-4 right-4 flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-ful opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5" />
              </div>
              <h4 
                className="text-[2.2rem] md:text-[2.8rem] font-black text-[#00664f] leading-none mb-3 tracking-tight"
                style={{ transform: 'translateZ(45px)' }}
              >
                <AnimatedCounter target={500} suffix="M+" />
              </h4>
              <p 
                className="text-gray-500 text-[0.7rem] font-bold uppercase tracking-[1px] leading-relaxed max-w-[185px] mx-auto"
                style={{ transform: 'translateZ(20px)' }}
              >
                AED Turnover Delivered for corporate clients
              </p>
            </Glass3DCard>

            {/* Stat 3 Card */}
            <Glass3DCard delay={0.2}>
              <div className="absolute top-4 right-4 flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 ]" />
              </div>
              <h4 
                className="text-[2.2rem] md:text-[2.8rem] font-black text-[#00664f] leading-none mb-3 tracking-tight"
                style={{ transform: 'translateZ(45px)' }}
              >
                <AnimatedCounter target={25} suffix="+" />
              </h4>
              <p 
                className="text-gray-500 text-[0.7rem] font-bold uppercase tracking-[1px] leading-relaxed max-w-[185px] mx-auto"
                style={{ transform: 'translateZ(20px)' }}
              >
                Years of Electromechanical & MEP Experience
              </p>
            </Glass3DCard>
          </div>

          {/* Centered Premium Magnetic Download Brochure Button */}
          <div className="flex justify-center">
            <motion.button
              ref={btnRef}
              onMouseMove={handleBtnMouseMove}
              onMouseLeave={handleBtnMouseLeave}
              className="group relative cursor-pointer overflow-hidden rounded-full bg-[#07140f] px-9 py-4 text-[0.78rem] font-bold tracking-[1px] text-white transition-all duration-300 shadow-[0_10px_30px_rgba(7,20,15,0.1)] hover:shadow-[0_15px_35px_rgba(0,102,79,0.2)] border-none inline-flex"
              animate={{ x: btnX, y: btnY }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
              whileTap={{ scale: 0.96 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                DOWNLOAD BROCHURE 
                <svg 
                  className="h-3.5 w-3.5 text-[#00ffc4] transition-transform duration-300 group-hover:translate-y-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  strokeWidth={3}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 13l-7 7-7-7m14-6L12 14 5 7" />
                </svg>
              </span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-[#00664f] to-[#00aa85] transition-transform duration-500 ease-out group-hover:translate-x-0" />
            </motion.button>
          </div>
        </div>

        {/* Divider between Stats and "How We Partner" Section */}
        <div className="border-t border-dashed border-gray-200 my-20 md:my-28 pointer-events-none select-none" />

        {/* ROW 4: "How We Partner" Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start mb-16">
          <div className="md:col-span-7">
            <div className="text-[#00664f] text-[10px] md:text-[11px] font-bold tracking-[3px] uppercase mb-4">
              HOW WE PARTNER
            </div>
            <h2 className="font-body text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold leading-[1.15] text-[#07140f] tracking-tight max-w-[620px]">
              How We Partner With You
            </h2>
          </div>
          
          <div className="md:col-span-5 md:pt-10">
            <p className="text-gray-600 text-[clamp(0.85rem,1.8vw,0.98rem)] leading-relaxed">
              Every client is different, but our way of working is consistent: listen carefully, analyze rigorously, design thoughtfully, and stay present over time. Our process is transparent, collaborative, and structured so you always know what to expect.
            </p>
          </div>
        </div>

        {/* Process Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <ProcessCard3D 
            step="01" 
            title="Understand Your World" 
            description="Feasibility, specifications review, and structural planning." 
            delay={0.05} 
          />
          <ProcessCard3D 
            step="02" 
            title="Engineer & Design" 
            description="Comprehensive MEP, HVAC, water, and civil blueprint optimization." 
            delay={0.15} 
          />
          <ProcessCard3D 
            step="03" 
            title="Construct & Commission" 
            description="On-site mechanical, electrical, and structural concrete installations under safety supervision." 
            delay={0.25} 
          />
          <ProcessCard3D 
            step="04" 
            title="Maintain & Support" 
            description="Post-construction audits, lifecycle maintenance, and mechanical tuning." 
            delay={0.35} 
          />
        </div>
      </motion.div>

      {/* ── LIGHTBOX VIDEO MODAL ───────────────────────────── */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/95 p-4 backdrop-blur-lg"
            onClick={() => setIsVideoOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ type: 'spring', damping: 25 }}
              className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-[#07140f] border border-[#00664f]/30 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsVideoOpen(false)}
                className="absolute right-4 top-4 z-50 rounded-full bg-black/60 p-2 text-white/80 hover:bg-black/95 hover:text-[#00ffc4] border border-white/10 transition-colors"
                aria-label="Close video player"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="aspect-video w-full bg-black">
                <video
                  className="h-full w-full object-contain"
                  controls
                  autoPlay
                  playsInline
                  preload="auto"
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
    </motion.section>
  )
}

export default Stats