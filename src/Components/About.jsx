import React, { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const containerClass = 'mx-auto max-w-[1200px] px-5 md:px-8'

const keyFacts = [
  { title: 'Established in 1997' },
  { title: 'Headquartered in Dubai,', text: 'with extensive operations across the E.M.E.A region.' },
  { title: 'Diverse Specialization', text: 'in Infrastructure, MEP, Civil, Chemical, Water, and Energy sectors.' },
  { title: 'Approved Contractor', text: 'for ROW and civil works by RTA and Dubai Municipality.' },
  { title: 'Turnkey Project Expertise', text: 'ensures seamless execution from start to finish.' },
  { title: 'Committed to Quality and Sustainability' },
  { title: 'Proven Track Record', text: 'of prestigious projects.' }
]

function About() {
  const imgRef = useRef(null)
  const isImgInView = useInView(imgRef, { once: true, margin: '-100px' })
  const [imgRevealed, setImgRevealed] = useState(false)

  useEffect(() => {
    if (isImgInView) setImgRevealed(true)
  }, [isImgInView])

  const paragraphs = [
    'Over 25 years since its inception, Island Tower Electromechanical Works LLC has emerged as a market leader in the EMEA region, delivering high-quality turnkey projects from its Dubai headquarters. Specializing in infrastructure, MEP, and civil projects, Island Tower has also expanded into the Chemical and Energy sectors.',
    'From humble beginnings, Island Tower has evolved into a premier contractor, offering integrated solutions in district cooling network projects, drainage systems, chilled water flushing, excavation and shoring, NDRC, aqua jetting, chemical trading, solar parking, wastewater treatment, roadworks, HVAC, and both structural and non-structural steel works, among many other services.'
  ]

  return (
    <section id="about" className="bg-white py-24 md:py-32 relative overflow-hidden">
      <div className={containerClass}>
        
        {/* ── SECTION 1: OUR LEGACY ───────────────────────────── */}
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-20">
          
          {/* Media Collage Column */}
          <div ref={imgRef} className="relative py-4 pr-0 sm:pr-8">
            
            {/* Main Image with clip-path reveal */}
            <div className="relative overflow-hidden rounded-2xl aspect-[4/5] max-h-[480px] w-full shadow-2xl border border-black/5">
              <motion.div
                initial={{ clipPath: 'inset(0 100% 0 0)' }}
                animate={imgRevealed ? { clipPath: 'inset(0 0% 0 0)' } : {}}
                transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="h-full w-full"
              >
                <motion.img
                  src="/assets/worker.png"
                  alt="Electromechanical Construction"
                  className="h-full w-full object-cover"
                  initial={{ scale: 1.15 }}
                  animate={imgRevealed ? { scale: 1 } : {}}
                  transition={{ duration: 1.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                />
              </motion.div>
            </div>

            {/* Floating Construction Time-lapse Video Card */}
            <motion.div
              className="absolute -bottom-6 -right-4 hidden sm:block w-[180px] md:w-[220px] aspect-[4/3] overflow-hidden rounded-xl border-4 border-white bg-white shadow-2xl"
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={imgRevealed ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5, type: 'spring' }}
            >
              <div className="relative h-full w-full bg-gray-100">
                <video
                  className="h-full w-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source
                    src="https://player.vimeo.com/external/383097790.hd.mp4?s=c5a93378921fbbeb25dd71e49033afdd915466eb&profile_id=175"
                    type="video/mp4"
                  />
                </video>
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute bottom-2 left-2 flex items-center gap-1.5 rounded bg-black/40 px-2 py-0.5 backdrop-blur-[2px]">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75 animate-duration-1000"></span>
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500"></span>
                  </span>
                  <span className="text-[0.55rem] font-bold uppercase tracking-wider text-white">LIVE BUILD</span>
                </div>
              </div>
            </motion.div>

            {/* Rotating Stamp Badge */}
            <motion.div
              className="absolute -top-6 -left-6 z-10 hidden md:block"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={imgRevealed ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-[#00664f] shadow-lg">
                {/* Spinning text stamp */}
                <motion.svg
                  viewBox="0 0 100 100"
                  className="absolute h-20 w-20 fill-white font-semibold text-[0.62rem] tracking-widest"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 16, ease: 'linear' }}
                >
                  <path
                    id="circlePath"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="transparent"
                  />
                  <text>
                    <textPath href="#circlePath" spacing="auto" startOffset="0%">
                      ENGINEERING EXCELLENCE • SINCE 1998 •
                    </textPath>
                  </text>
                </motion.svg>
                {/* Center Building Icon */}
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </motion.div>
          </div>

          {/* Text content — staggered paragraphs */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="text-[#00664f] text-xs font-semibold uppercase tracking-[3px]">
              Our Legacy
            </div>
            
            <motion.h2
              className="mt-4 mb-6 font-body text-[clamp(1.7rem,3vw,2.4rem)] font-extrabold normal-case leading-[1.2] text-gray-900 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              Island Tower Electromechanical
            </motion.h2>

            <div className="space-y-4">
              {paragraphs.map((text, i) => (
                <motion.p
                  key={i}
                  className="text-[0.95rem] leading-[1.85] text-gray-600"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.15 }}
                >
                  {text}
                </motion.p>
              ))}
            </div>

            {/* Staggered Highlights Grid */}
            <div className="mt-8 grid grid-cols-2 gap-6 border-t border-gray-100 pt-8">
              <div className="space-y-1">
                <h3 className="text-2xl font-black text-[#00664f]">25+ Years</h3>
                <p className="text-[0.68rem] font-bold uppercase tracking-wider text-gray-400">Industry Leadership</p>
                <p className="text-[0.8rem] text-gray-500 leading-normal">Delivering turnkey infrastructure since 1998.</p>
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-black text-[#00664f]">ISO Certs</h3>
                <p className="text-[0.68rem] font-bold uppercase tracking-wider text-gray-400">Quality Assured</p>
                <p className="text-[0.8rem] text-gray-500 leading-normal">Certified safety standards & project delivery.</p>
              </div>
            </div>

            <motion.a
              href="#solutions"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[#00664f] px-10 py-4 text-[0.85rem] font-bold tracking-[0.5px] text-white transition-all duration-300 hover:bg-[#004d38] hover:shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              LEARN MORE
              <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
          </motion.div>
        </div>

        {/* ── SECTION 2: KEY FACTS ───────────────────────────── */}
        <div className="mt-24 md:mt-32 pt-24 md:pt-32 border-t border-gray-100">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-20">
            
            {/* Left Column: Key Facts text and list */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="inline-block rounded-full bg-gray-100 px-4 py-1.5 text-[0.7rem] font-bold uppercase tracking-[1.5px] text-gray-600 mb-4">
                Key Facts
              </div>
              
              <motion.h2
                className="mb-8 font-body text-[clamp(1.7rem,3vw,2.4rem)] font-extrabold normal-case leading-[1.2] text-gray-900 tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                Island Tower Electromechanical
              </motion.h2>

              {/* Bullet List */}
              <div className="space-y-4">
                {keyFacts.map((fact, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-3.5"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  >
                    {/* Custom Red/Orange Checkmark Icon */}
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-500 mt-1">
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <p className="text-[0.92rem] leading-[1.6] text-gray-600">
                      <strong className="font-bold text-gray-950">{fact.title}</strong>
                      {fact.text && ` ${fact.text}`}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Column: Key Facts Image */}
            <div>
              <motion.div
                className="relative overflow-hidden rounded-2xl aspect-[4/3] shadow-2xl border border-black/5"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <img
                  src="/assets/detail.png" // Wrench worker image file
                  alt="Island Tower Professional Team"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-103"
                />
              </motion.div>
            </div>
            
          </div>
        </div>

      </div>
    </section>
  )
}

export default About