import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const containerClass = 'mx-auto max-w-[1200px] px-5 md:px-8'

const slides = [
  {
    label: 'Since 1998',
    headingWords: ['Leading', 'Infrastructure', 'Contractor'],
    subtitle: 'Island Tower is building the future — a premier electromechanical contractor delivering engineering excellence across the Middle East.',
    video: '/assets/video_4.mp4'
  },
  {
    label: 'MEP Services',
    headingWords: ['Engineering', 'Precision', 'Solutions'],
    subtitle: 'Providing world-class mechanical, electrical, and plumbing installations for signature skyscrapers and industrial facilities.',
    video: '/assets/video_1.mp4'
  },
  {
    label: 'Civil Works',
    headingWords: ['Constructing', 'Modern', 'Landmarks'],
    subtitle: 'Transforming landscapes with high-durability concrete structures, civil engineering projects, and architectural marvels.',
    video: '/assets/video_3.mp4'
  },
  {
    label: 'Water & Energy',
    headingWords: ['Sustainable', 'Energy', 'Systems'],
    subtitle: 'Pioneering smart water treatment, distribution grids, and energy-efficient installations for sustainable urban growth.',
    video: '/assets/video_2.mp4'
  }
]

function Hero() {
  const videoRef = useRef(null)
  const [offsetY, setOffsetY] = useState(0)
  const [contentOffsetY, setContentOffsetY] = useState(0)
  const [gridOffsetY, setGridOffsetY] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isChanging, setIsChanging] = useState(false)

  // 3D Mouse Parallax States
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  // Touch handlers for mobile swipe
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const minSwipeDistance = 50

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY * 0.42)
      setContentOffsetY(window.scrollY * -0.15)
      setGridOffsetY(window.scrollY * 0.2)
    }
    
    // 3D Cursor Parallax effect
    const handleMouseMove = (e) => {
      const x = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2)
      const y = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2)
      
      // Max tilt angle is 6 degrees
      setRotateX(-y * 6)
      setRotateY(x * 6)
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const changeSlide = (newIndex) => {
    if (isChanging) return
    setIsChanging(true)
    setTimeout(() => {
      setCurrentIndex(newIndex)
      setIsChanging(false)
    }, 300) // matches fade duration
  }

  const nextSlide = () => {
    const nextIndex = (currentIndex + 1) % slides.length
    changeSlide(nextIndex)
  }

  const prevSlide = () => {
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length
    changeSlide(prevIndex)
  }

  // Swipe gesture handlers for mobile
  const handleTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      nextSlide()
    } else if (isRightSwipe) {
      prevSlide()
    }
  }

  return (
    <section
      id="home"
      className="relative flex h-screen min-h-[600px] items-center overflow-hidden text-white"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Video Background Container with fade transition */}
      <motion.div
        className="absolute inset-0 -z-10 bg-[#07140e]"
        style={{ transform: `translateY(${offsetY}px) scale(1.12)` }}
        animate={{ opacity: isChanging ? 0.2 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <video
          key={currentIndex}
          ref={videoRef}
          className="h-full w-full object-cover transition-opacity duration-300"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src={slides[currentIndex].video} type="video/mp4" />
        </video>
      </motion.div>

      {/* Floating 3D Holographic Blueprint Grid Overlay */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center opacity-20"
        style={{ transform: `translateY(${gridOffsetY}px)` }}
      >
        <motion.div
          className="w-[450px] h-[450px] border border-white/5 rounded-full relative flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
        >
          {/* Inner 3D Grid pattern */}
          <div className="absolute inset-4 border border-dashed border-white/10 rounded-full" />
          <div className="absolute inset-12 border border-white/5 rounded-full" />
          <svg className="w-full h-full text-white/5" viewBox="0 0 100 100">
            <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="0.1" />
            <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="0.1" />
            <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.1" fill="none" />
            <path d="M 20,20 L 80,80 M 20,80 L 80,20" stroke="currentColor" strokeWidth="0.08" strokeDasharray="1 1" />
          </svg>
        </motion.div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[rgba(0,30,20,0.75)] via-[rgba(0,20,14,0.5)] to-[rgba(0,0,0,0.75)]" />

      {/* Content Container (Perspective setup for 3D cursor tilt) */}
      <div 
        className={`${containerClass} relative z-[1] w-full pt-8 sm:pt-0`}
        style={{ perspective: '1000px' }}
      >
        <motion.div
          className="max-w-[800px]"
          animate={{ rotateX, rotateY }}
          transition={{ type: 'spring', damping: 30, stiffness: 100 }}
          style={{ transformStyle: 'preserve-3d', y: contentOffsetY }}
        >
          {/* Section label */}
          <motion.div
            key={`label-${currentIndex}`}
            className="section-label-light mb-5 text-[#00ffc4] font-semibold tracking-[3px] text-xs uppercase"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ translateZ: '40px' }} // 3D Layer offset
          >
            {slides[currentIndex].label}
          </motion.div>

          {/* Heading — word-by-word 3D swing reveal */}
          <h1 
            className="mb-6 text-[clamp(1.8rem,5.5vw,4.2rem)] font-extrabold leading-[1.05] tracking-tight uppercase"
            style={{ perspective: '1000px', transformStyle: 'preserve-3d', translateZ: '60px' }}
          >
            {slides[currentIndex].headingWords.map((word, i) => (
              <motion.span
                key={`word-${currentIndex}-${word}-${i}`}
                className="mr-[0.3em] inline-block"
                initial={{ opacity: 0, y: 60, rotateX: -45, z: -100 }}
                animate={{ opacity: 1, y: 0, rotateX: 0, z: 0 }}
                transition={{
                  delay: i * 0.08,
                  duration: 0.7,
                  ease: [0.215, 0.61, 0.355, 1], // Cinematic ease-out swing
                }}
                style={{ transformOrigin: 'top center' }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Subtitle */}
          <motion.p
            key={`sub-${currentIndex}`}
            className="mb-8 max-w-[560px] text-[clamp(0.9rem,1.8vw,1.1rem)] leading-[1.75] text-white/80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            style={{ translateZ: '30px' }}
          >
            {slides[currentIndex].subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            style={{ translateZ: '20px' }}
          >
            <a
              href="#about"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-8 md:px-10 py-3.5 md:py-4 text-[0.82rem] font-bold tracking-[0.5px] text-[#00664f] transition-all duration-400"
            >
              <span className="relative z-10">EXPLORE PROJECTS</span>
              <svg className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              <div className="absolute inset-0 -translate-x-full bg-[#00664f] transition-transform duration-400 group-hover:translate-x-0" />
              <span className="absolute inset-0 z-10 flex items-center justify-center gap-2 font-bold text-white opacity-0 transition-opacity duration-400 group-hover:opacity-100">
                EXPLORE PROJECTS
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/20 px-6 md:px-8 py-3.5 md:py-4 text-[0.82rem] font-bold tracking-[0.5px] text-white transition-all duration-300 hover:border-white hover:bg-white/10"
            >
              CONTACT US
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Slider controls (Arrows + Dots in a single responsive row) */}
      <div className="absolute bottom-12 left-6 right-6 z-10 flex items-center justify-between sm:bottom-10 sm:left-8 sm:right-8 md:left-12 md:right-12">
        {/* Pagination Dots */}
        <div className="flex gap-2.5">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => changeSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === index ? 'w-8 bg-[#00ffc4]' : 'w-2 bg-white/30 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Action Arrows */}
        <div className="flex items-center gap-3">
          <button
            onClick={prevSlide}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/30 text-white backdrop-blur-md transition-all hover:bg-white hover:text-black hover:border-white"
            aria-label="Previous Video"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-[11px] sm:text-xs font-semibold tracking-[2px] text-white/60">
            {String(currentIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </span>
          <button
            onClick={nextSlide}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/30 text-white backdrop-blur-md transition-all hover:bg-white hover:text-black hover:border-white"
            aria-label="Next Video"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Scroll indicator (Hidden on mobile to prevent clutter) */}
      <motion.div
        className="scroll-indicator text-white hidden md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
     
        <motion.svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7" />
        </motion.svg>
      </motion.div>
    </section>
  )
}

export default Hero