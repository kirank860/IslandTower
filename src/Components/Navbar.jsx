import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Home', href: 'home' },
  {
    label: 'About Us',
    href: 'about',
    children: [
      { label: 'Our Story', href: 'story' },
      { label: 'Leadership', href: 'leadership' },
      { label: 'Certifications', href: 'certifications' },
    ],
  },
  {
    label: 'How We Work',
    href: 'work',
    children: [
      { label: 'Our Process', href: 'process' },
      { label: 'Quality Control', href: 'quality' },
    ],
  },
  {
    label: 'Our Expertise',
    href: 'expertise',
    children: [
      { label: 'Infrastructure', href: 'infrastructure' },
      { label: 'MEP Services', href: 'mep' },
      { label: 'Civil Works', href: 'civil' },
      { label: 'Chemical', href: 'chemical' },
      { label: 'Water & Energy', href: 'water' },
    ],
  },
  { label: 'Projects', href: 'projects' },
  { label: 'R&D', href: 'rd' },
  { label: 'Media Center', href: 'media' },
  { label: 'Careers', href: 'careers' },
  { label: 'Contact Us', href: 'contact' },
]

/* ─── Desktop Dropdown ─────────────────────────────────── */
function DropdownMenu({ items, isOpen, scrolled }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="absolute left-0 top-full z-50 min-w-[230px] overflow-hidden rounded-xl mt-1"
          style={{
            background: scrolled
              ? 'rgba(255, 255, 255, 0.98)'
              : 'rgba(15, 25, 20, 0.96)',
            border: scrolled
              ? '1px solid rgba(0, 0, 0, 0.06)'
              : '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
            backdropFilter: 'blur(20px)',
          }}
          initial={{ opacity: 0, y: 8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.96 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
        >
          <div className="py-2.5">
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`block px-5 py-2.5 text-[0.82rem] font-medium tracking-wide transition-all duration-200 ${
                  scrolled
                    ? 'text-gray-700 hover:bg-[#00664f]/5 hover:text-[#00664f]'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ─── Desktop Nav Item ─────────────────────────────────── */
function NavItem({ link, scrolled }) {
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const baseClass = `relative whitespace-nowrap px-3 py-2 text-[0.8rem] xl:text-[0.84rem] font-semibold tracking-wide transition-all duration-300`
  const colorClass = scrolled
    ? 'text-gray-700 hover:text-[#00664f]'
    : 'text-white/80 hover:text-white'

  const labelSpan = <span className="relative z-10">{link.label}</span>
  
  const hoverIndicator = hovered && (
    <motion.span
      layoutId="navUnderline"
      className={`absolute bottom-0 left-3 right-3 h-[2px] rounded-full ${
        scrolled ? 'bg-[#00664f]' : 'bg-white'
      }`}
      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
    />
  )

  if (!link.children) {
    return (
      <a
        href={link.href}
        className={`${baseClass} ${colorClass}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {labelSpan}
        {hoverIndicator}
      </a>
    )
  }

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => {
        setOpen(true)
        setHovered(true)
      }}
      onMouseLeave={() => {
        setOpen(false)
        setHovered(false)
      }}
    >
      <button
        className={`${baseClass} ${colorClass} flex items-center gap-1`}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        {labelSpan}
        <svg
          className={`h-3 w-3 shrink-0 opacity-60 transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
        {hoverIndicator}
      </button>
      <DropdownMenu items={link.children} isOpen={open} scrolled={scrolled} />
    </div>
  )
}

/* ─── Mobile Accordion Item ────────────────────────────── */
function MobileNavItem({ link, onClose }) {
  const [open, setOpen] = useState(false)

  if (!link.children) {
    return (
      <a
        href={link.href}
        onClick={onClose}
        className="flex items-center justify-between rounded-xl px-5 py-3.5 text-[0.92rem] font-semibold text-white/80 transition-all duration-300 hover:bg-white/5 hover:text-white"
      >
        <span>{link.label}</span>
        <svg
          className="h-3.5 w-3.5 opacity-40"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </a>
    )
  }

  return (
    <div className="space-y-1">
      <button
        className={`flex w-full items-center justify-between rounded-xl px-5 py-3.5 text-[0.92rem] font-semibold transition-all duration-300 ${
          open 
            ? 'bg-[#00ffc4]/10 text-[#00ffc4]' 
            : 'text-white/80 hover:bg-white/5 hover:text-white'
        }`}
        onClick={() => setOpen(!open)}
      >
        <span>{link.label}</span>
        <svg
          className={`h-4 w-4 opacity-60 transition-transform duration-300 ${
            open ? 'rotate-180 text-[#00ffc4]' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden pl-4 pr-2"
          >
            <div className="border-l border-white/10 my-1 py-1 space-y-1">
              {link.children.map((child) => (
                <a
                  key={child.href}
                  href={child.href}
                  onClick={onClose}
                  className="block rounded-lg py-2.5 pl-5 pr-4 text-[0.84rem] text-white/50 hover:text-[#00ffc4] hover:bg-white/[0.02] transition-all duration-200"
                >
                  {child.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─── Main Navbar ──────────────────────────────────────── */
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [logoError, setLogoError] = useState(false)
  const [drawerLogoError, setDrawerLogoError] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      {/* ── TOP BAR ────────── */}
      <motion.div
        className="hidden sm:block"
        initial={false}
        animate={{
          height: scrolled ? 0 : 'auto',
          opacity: scrolled ? 0 : 1,
        }}
        transition={{ duration: 0.3 }}
        style={{
          background: 'transparent',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1001,
          overflow: 'hidden',
        }}
      >
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-2.5">
          <div className="flex items-center gap-2">
            <svg
              className="h-3.5 w-3.5 shrink-0 text-white/50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="text-[0.73rem] tracking-wide text-white/55">
              Dubai, UAE &nbsp;|&nbsp; Riyadh, Saudi Arabia
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="mailto:info@islandtoweruae.ae"
              className="flex items-center gap-1.5 text-[0.73rem] text-white/55 transition-colors hover:text-white/90"
            >
              <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              info@islandtoweruae.ae
            </a>
            <a
              href="tel:+97142573677"
              className="flex items-center gap-1.5 text-[0.73rem] text-white/55 transition-colors hover:text-white/90"
            >
              <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +971 4 257 3677
            </a>
          </div>
        </div>
      </motion.div>

      {/* ── MAIN HEADER ─────────────────────────────────── */}
      <header
        className={`fixed left-0 right-0 z-[1000] transition-all duration-300 ${
          scrolled
            ? 'top-0 bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100/50 py-0'
            : 'top-0 sm:top-7 bg-transparent py-2'
        }`}
      >
        <div
          className={`mx-auto flex max-w-[1280px] items-center justify-between gap-6 px-6 transition-all duration-300 ${
            scrolled ? 'h-[66px]' : 'h-[80px]'
          }`}
        >
          {/* ── Logo ── */}
          <a href="#home" className="flex shrink-0 items-center gap-2.5" aria-label="Island Tower Home">
            {!logoError ? (
              <img
                src="/assets/logo.png"
                alt="Island Tower"
                className="h-[26px] md:h-[26px] w-auto object-contain transition-all duration-300"
                style={{
                  filter: scrolled ? 'brightness(0)' : 'brightness(10)',
                }}
                onError={() => setLogoError(true)}
              />
            ) : (
              <div className="flex items-center gap-2.5">
                <svg viewBox="0 0 38 46" className="h-[28px] md:h-[34px] w-auto" fill="none">
                  <polygon
                    points="19,3 36,43 2,43"
                    fill="none"
                    stroke={scrolled ? '#000000' : '#fff'}
                    strokeWidth="2.2"
                  />
                  <line x1="19" y1="3" x2="19" y2="43" stroke={scrolled ? '#000000' : '#fff'} strokeWidth="1.4" />
                  <line x1="10" y1="27" x2="28" y2="27" stroke={scrolled ? '#000000' : '#fff'} strokeWidth="1.4" />
                  <line x1="13.5" y1="17" x2="24.5" y2="17" stroke={scrolled ? '#000000' : '#fff'} strokeWidth="1.4" />
                </svg>
                <div>
                  <div
                    className={`text-[0.75rem] md:text-[0.82rem] font-black leading-none tracking-[2px] md:tracking-[2.5px] transition-colors duration-300 ${
                      scrolled ? 'text-black' : 'text-white'
                    }`}
                  >
                    ISLAND TOWER
                  </div>
                  <div
                    className={`mt-[3px] text-[0.38rem] md:text-[0.42rem] uppercase tracking-[1.5px] md:tracking-[2px] transition-colors duration-300 ${
                      scrolled ? 'text-gray-600' : 'text-white/40'
                    }`}
                  >
                    Electromechanical Works LLC
                  </div>
                </div>
              </div>
            )}
          </a>

          {/* ── Desktop Nav ── */}
          <nav
            className="hidden flex-1 flex-nowrap items-center justify-center xl:flex"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <NavItem key={link.href} link={link} scrolled={scrolled} />
            ))}
          </nav>

          {/* ── Right: Search + Hamburger ── */}
          <div className="flex shrink-0 items-center gap-1.5">
            <button
              className={`flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 ${
                scrolled
                  ? 'text-gray-700 hover:bg-[#00664f]/10 hover:text-[#00664f]'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
            >
              <svg
                className="h-[18px] w-[18px]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            <button
              className={`flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-full transition-all duration-300 xl:hidden ${
                scrolled
                  ? 'text-gray-700 hover:bg-[#00664f]/10 hover:text-[#00664f]'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation"
            >
              <span className="block h-[1.5px] w-[20px] rounded-full bg-current" />
              <span className="block h-[1.5px] w-[20px] rounded-full bg-current" />
              <span className="block h-[1.5px] w-[13px] self-end rounded-full bg-current" />
            </button>
          </div>
        </div>
      </header>

      {/* ── MOBILE DRAWER ───────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[1100] bg-black/60 backdrop-blur-[4px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.aside
              className="fixed bottom-0 left-0 top-0 z-[1200] flex w-[min(320px,85vw)] flex-col bg-[#07140f]/92 backdrop-blur-2xl shadow-[20px_0_60px_rgba(0,0,0,0.6)]"
              style={{ borderRight: '1px solid rgba(255, 255, 255, 0.08)' }}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{
                type: 'tween',
                duration: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              aria-label="Mobile navigation"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-6 py-6 border-b border-white/[0.06]">
                <a
                  href="#home"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2.5"
                >
                  {!drawerLogoError ? (
                    <img
                      src="/assets/logo.png"
                      alt="Island Tower"
                      className="h-[32px] w-auto object-contain"
                      style={{ filter: 'brightness(10)' }}
                      onError={() => setDrawerLogoError(true)}
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <svg viewBox="0 0 38 46" className="h-[30px] w-auto" fill="none">
                        <polygon points="19,3 36,43 2,43" fill="none" stroke="#fff" strokeWidth="2.2" />
                        <line x1="19" y1="3" x2="19" y2="43" stroke="#fff" strokeWidth="1.4" />
                        <line x1="10" y1="27" x2="28" y2="27" stroke="#fff" strokeWidth="1.4" />
                        <line x1="13.5" y1="17" x2="24.5" y2="17" stroke="#fff" strokeWidth="1.4" />
                      </svg>
                      <div>
                        <div className="text-[0.7rem] font-black tracking-[2px] text-white">
                          ISLAND TOWER
                        </div>
                        <div className="text-[0.38rem] uppercase tracking-[1.5px] text-white/40">
                          Electromechanical Works LLC
                        </div>
                      </div>
                    </div>
                  )}
                </a>
                <button
                  className="flex h-8 w-8 items-center justify-center rounded-full text-white/40 transition-colors hover:bg-white/10 hover:text-white"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Integrated Search Bar inside Mobile Drawer */}
              <div className="px-6 py-4">
                <button
                  onClick={() => {
                    setMenuOpen(false)
                    setSearchOpen(true)
                  }}
                  className="flex w-full items-center gap-3 rounded-full bg-white/[0.04] hover:bg-white/[0.08] px-4.5 py-3 text-left text-[0.85rem] text-white/40 border border-white/[0.08] transition-all duration-300"
                >
                  <svg className="h-4 w-4 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>Search site...</span>
                </button>
              </div>

              {/* Navigation Items list */}
              <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.035, duration: 0.18 }}
                  >
                    <MobileNavItem link={link} onClose={() => setMenuOpen(false)} />
                  </motion.div>
                ))}
              </nav>

              {/* Drawer Contact Card Footer */}
              <div className="mt-auto border-t border-white/[0.06] bg-black/20 p-6 space-y-3.5">
                <a
                  href="mailto:info@islandtoweruae.ae"
                  className="flex items-center gap-3 text-white/55 hover:text-white transition-colors text-[0.8rem] font-medium"
                >
                  <svg className="h-4 w-4 text-[#00ffc4] opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>info@islandtoweruae.ae</span>
                </a>
                <a
                  href="tel:+97142573677"
                  className="flex items-center gap-3 text-white/55 hover:text-white transition-colors text-[0.8rem] font-medium"
                >
                  <svg className="h-4 w-4 text-[#00ffc4] opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+971 4 257 3677</span>
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── SEARCH MODAL OVERLAY ───────────────────────────── */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] flex items-center justify-center bg-[#0a1a14]/80 p-4 backdrop-blur-xl"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-[#12221b]/95 p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="text-lg font-semibold text-white">Search Island Tower</h3>
                <button
                  onClick={() => setSearchOpen(false)}
                  className="rounded-full p-1.5 text-white/50 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="mt-6 relative">
                <input
                  type="text"
                  placeholder="Search for projects, services, careers..."
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-4 pl-12 pr-4 text-white placeholder-white/40 outline-none ring-2 ring-transparent transition-all focus:border-[#00664f] focus:ring-[#00664f]/20"
                  autoFocus
                />
                <svg className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div className="mt-6">
                <p className="text-xs font-semibold tracking-wider text-white/40 uppercase">Suggested searches</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {['MEP Services', 'Infrastructure', 'Dubai Projects', 'Careers', 'Water & Energy'].map((tag) => (
                    <button
                      key={tag}
                      className="rounded-lg bg-white/5 px-3 py-1.5 text-xs text-white/70 hover:bg-[#00664f]/20 hover:text-white transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}