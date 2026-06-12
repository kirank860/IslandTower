import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './Components/Navbar'

const containerClass = 'mx-auto max-w-[1200px] px-5 md:px-8'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About Us', href: '#about' },
    { label: 'How We Work', href: '#work' },
    { label: 'Our Expertise', href: '#expertise' },
    { label: 'Projects', href: '#projects' },
    { label: 'R&D', href: '#rd' },
    { label: 'Media Center', href: '#media' },
    { label: 'Careers', href: '#careers' },
    { label: 'Contact Us', href: '#contact' },
  ]

  const solutions = [
    { num: '01', name: 'Infrastructure', img: '/assets/infrastructure.png' },
    { num: '02', name: 'MEP Services', img: '/assets/villa.png' },
    { num: '03', name: 'Civil Works', img: '/assets/hero.png' },
    { num: '04', name: 'Chemical', img: '/assets/worker.png' },
    { num: '05', name: 'Water', img: '/assets/infrastructure.png' },
    { num: '06', name: 'Energy', img: '/assets/hero_industrial.png' },
  ]

  const sponsors = [
    { name: 'EMPOWER', sub: 'Energy Solutions', color: '#1a7a3e', initial: 'E' },
    { name: 'EMICOOL', sub: '', color: '#004a99', initial: 'Em' },
    { name: 'RTA', sub: '', color: '#e30613', initial: 'RTA' },
    { name: 'EMAAR', sub: '', color: '#1a1a1a', initial: 'E' },
    { name: 'Dubai Municipality', sub: '', color: '#006b3f', initial: 'DM' },
    { name: 'NAKHEEL', sub: '', color: '#3a7dc9', initial: 'N' },
  ]

  return (
    <div className="min-h-screen">
      <Navbar />

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[1200] bg-black/65 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.nav
              className="fixed bottom-0 right-0 top-0 z-[1300] flex w-[min(340px,90vw)] flex-col border-l border-white/[0.08] bg-[#0d0d0d] shadow-[-20px_0_60px_rgba(0,0,0,0.6)]"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.35, ease: 'easeInOut' }}
              aria-label="Mobile navigation"
            >
              <div className="flex items-center justify-between border-b border-white/[0.08] px-8 py-6">
                <div className="font-heading text-base font-extrabold tracking-[1.5px] text-white">
                  ISLAND TOWER
                </div>
                <button
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-none bg-white/[0.08] text-[1.1rem] text-white/70 transition-colors hover:bg-white/[0.15] hover:text-white"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                >
                  ✕
                </button>
              </div>
              <div className="flex-1 overflow-y-auto py-6">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-5 border-b border-white/[0.04] px-8 py-4 text-[0.95rem] font-medium text-white/70 transition-all hover:bg-white/[0.05] hover:pl-10 hover:text-white"
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <span className="min-w-6 font-heading text-[0.7rem] font-bold tracking-[1px] text-emerald">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {link.label}
                  </motion.a>
                ))}
              </div>
              <div className="border-t border-white/[0.08] px-8 py-6 text-[0.78rem] leading-loose text-white/35">
                <p>info@islandtoweruae.ae</p>
                <p>+971 4 257 3677</p>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {/* Hero */}
      <section id="home" className="relative flex min-h-[550px] h-[90vh] items-center overflow-hidden text-white max-[768px]:h-[75vh] max-[480px]:h-[85vh]">
        <video className="absolute inset-0 -z-10 h-full w-full object-cover" autoPlay muted loop playsInline>
          <source src="/assets/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-[rgba(0,51,34,0.75)] to-[rgba(0,0,0,0.55)]" />
        <div className={`${containerClass} relative z-[1]`}>
          <motion.div
            className="max-w-[720px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.h1
              className="mb-5 text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.1] max-[600px]:text-[1.8rem]"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Leading Infrastructure Contractor
            </motion.h1>
            <motion.p
              className="mb-8 max-w-[520px] text-[clamp(0.95rem,2vw,1.15rem)] leading-[1.7] opacity-90"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Island Tower is building the future — a premier electromechanical contractor delivering engineering excellence across the Middle East.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }}>
              <a
                href="#about"
                className="inline-block rounded-full border-2 border-white bg-white px-10 py-[0.9rem] text-[0.85rem] font-bold tracking-[0.5px] text-emerald transition-all duration-300 hover:bg-transparent hover:text-white max-[480px]:px-7 max-[480px]:py-[0.8rem] max-[480px]:text-[0.8rem]"
              >
                EXPLORE PROJECTS →
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-secondary-bg py-20">
        <div className={containerClass}>
          <div className="grid grid-cols-1 items-center gap-12 nav:grid-cols-2 nav:gap-20">
            <motion.div
              className="relative overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img src="/assets/hero_industrial.png" alt="Corporate" className="block w-full" />
              <div className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/30 text-6xl text-white">
                <span>▶</span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="mb-10 font-body text-[clamp(1.3rem,2.5vw,2rem)] font-bold normal-case leading-[1.4] text-emerald">
                Industry leader providing integrated solutions across multiple sectors
              </h2>
              <div className="mb-10 flex flex-wrap gap-10 max-[600px]:gap-6">
                <div>
                  <h3 className="mb-1 text-[2.5rem] text-emerald">500+</h3>
                  <p className="text-xs font-bold uppercase tracking-[1px] text-[#999]">Completed Projects</p>
                </div>
                <div>
                  <h3 className="mb-1 text-[2.5rem] text-emerald">500M+</h3>
                  <p className="text-xs font-bold uppercase tracking-[1px] text-[#999]">Turnover</p>
                </div>
                <div>
                  <h3 className="mb-1 text-[2.5rem] text-emerald">25+</h3>
                  <p className="text-xs font-bold uppercase tracking-[1px] text-[#999]">Years Experience</p>
                </div>
              </div>
              <button className="cursor-pointer rounded-lg border-none bg-accent-red px-10 py-4 text-[0.9rem] font-bold text-white transition-all duration-300 hover:bg-accent-red-hover">
                DOWNLOAD BROCHURE ↓
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="bg-white py-[100px]">
        <div className={containerClass}>
          <div className="grid grid-cols-1 items-center gap-10 nav:grid-cols-2 nav:gap-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="/assets/worker.png"
                alt="Electromechanical Worker"
                className="max-h-[500px] w-full rounded-2xl object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="mb-5 inline-block rounded-[20px] bg-[#f0f0f0] px-4 py-[0.35rem] text-[0.7rem] font-bold uppercase tracking-[1.5px]">
                Our Legacy
              </div>
              <h2 className="mb-6 font-body text-[clamp(1.4rem,3vw,2.2rem)] font-bold normal-case leading-[1.3] text-emerald">
                Island Tower Electromechanical
              </h2>
              <p className="mb-4 text-[0.95rem] leading-[1.85] text-muted">
                Over 25 years since its inception, Island Tower Electromechanical Works LLC has emerged as a market leader in the EMEA region, delivering high-quality turnkey projects from its Dubai headquarters.
              </p>
              <p className="mb-4 text-[0.95rem] leading-[1.85] text-muted">
                Specializing in infrastructure, MEP, and civil projects, Island Tower has also expanded into the Chemical and Energy sectors, serving as a premier integrated contractor.
              </p>
              <a
                href="#solutions"
                className="mt-4 inline-block rounded-full bg-brand px-10 py-[0.9rem] text-[0.85rem] font-bold tracking-[0.5px] text-white transition-all duration-300"
              >
                LEARN MORE
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section id="solutions" className="bg-brand py-[100px] text-white">
        <div className={containerClass}>
          <div className="mb-12">
            <div className="mb-5 inline-block rounded-[20px] bg-white/15 px-4 py-[0.35rem] text-[0.7rem] font-bold uppercase tracking-[1.5px] text-white">
              Our Solutions
            </div>
            <motion.h2
              className="mt-4 font-body text-[clamp(1.5rem,3vw,2.5rem)] font-bold normal-case"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              We offer a great number of services
            </motion.h2>
          </div>
          <div className="grid grid-cols-2 gap-4 max-[480px]:grid-cols-1 lg:grid-cols-3">
            {solutions.map((sol, index) => (
              <motion.div
                key={index}
                className="group relative h-[380px] cursor-pointer overflow-hidden rounded-[10px] max-[768px]:h-[260px]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (index % 3) * 0.15, duration: 0.6 }}
                whileHover={{ y: -8 }}
              >
                <img
                  src={sol.img}
                  alt={sol.name}
                  className="h-full w-full object-cover opacity-60 transition-all duration-300 group-hover:scale-[1.08] group-hover:opacity-75"
                />
                <div className="absolute bottom-6 left-6 right-6 flex items-center gap-3">
                  <span className="text-[1.8rem] font-bold opacity-70">{sol.num}</span>
                  <span className="flex-1 text-[1.1rem] font-bold">{sol.name}</span>
                  <span className="text-[1.2rem] opacity-80">↗</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsors */}
      <section className="border-y border-border-light bg-white py-[70px]">
        <div className={containerClass}>
          <motion.h3
            className="mb-10 text-center font-body text-[0.9rem] font-bold uppercase tracking-[2px] text-emerald"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our Trusted Clients &amp; Partners
          </motion.h3>
          <div className="grid grid-cols-2 gap-4 max-[600px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {sponsors.map((s, i) => (
              <motion.div
                key={i}
                className="flex min-h-[110px] cursor-pointer flex-col items-center gap-2.5 rounded-[10px] border border-border-light px-3 py-6 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ scale: 1.05, boxShadow: '0 8px 30px rgba(0,0,0,0.12)' }}
              >
                <div
                  className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-full text-[0.9rem] font-extrabold text-white"
                  style={{ background: s.color }}
                >
                  {s.initial}
                </div>
                <div className="text-center text-[0.7rem] font-bold uppercase tracking-[0.5px] text-[#333]">
                  {s.name}
                </div>
                {s.sub && <div className="text-center text-[0.6rem] text-[#999]">{s.sub}</div>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-dark py-20 pb-8 text-white">
        <div className={containerClass}>
          <div className="mb-12 grid grid-cols-1 gap-8 min-[601px]:grid-cols-2 min-[1025px]:grid-cols-[2fr_1fr_1fr_1fr] min-[1025px]:gap-12">
            <div>
              <h3 className="mb-4 text-[1.1rem] tracking-[2px] text-white">ISLAND TOWER</h3>
              <p className="text-[0.85rem] leading-[1.8] text-[#aaa]">
                Building excellence across the Middle East with integrated electromechanical solutions for over two decades.
              </p>
            </div>
            <div>
              <h4 className="mb-5 text-[0.85rem] uppercase tracking-[1px] text-white">Service Areas</h4>
              <ul className="text-[0.82rem] leading-[2.3] text-[#aaa]">
                <li>Infrastructure</li>
                <li>MEP Solutions</li>
                <li>Civil Construction</li>
                <li>Water &amp; Energy</li>
                <li>Chemical Works</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-5 text-[0.85rem] uppercase tracking-[1px] text-white">Our Address</h4>
              <p className="text-[0.82rem] leading-[1.9] text-[#aaa]">
                Flat 217 – Damascus Street<br />Dubai, United Arab Emirates
              </p>
            </div>
            <div>
              <h4 className="mb-5 text-[0.85rem] uppercase tracking-[1px] text-white">Contact Us</h4>
              <p className="text-[0.82rem] leading-[1.9] text-[#aaa]">+971 4 257 3677</p>
              <p className="text-[0.82rem] leading-[1.9] text-[#aaa]">info@islandtoweruae.ae</p>
              <div className="mt-4 flex gap-3">
                {['FB', 'TW', 'IG', 'LN'].map((social) => (
                  <span
                    key={social}
                    className="flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-full bg-white/10 text-[0.65rem] font-bold transition-all duration-300 hover:bg-brand"
                  >
                    {social}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-white/[0.08] pt-6 text-center text-[0.75rem] text-[#555]">
            © 2026 Island Tower Electromechanical Works LLC. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  )
}

export default App
