import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Home', href: '#home' },
  {
    label: 'About Us',
    href: '#about',
    children: [
      { label: 'Our Story', href: '#story' },
      { label: 'Leadership', href: '#leadership' },
      { label: 'Certifications', href: '#certifications' },
    ],
  },
  {
    label: 'How We Work',
    href: '#work',
    children: [
      { label: 'Our Process', href: '#process' },
      { label: 'Quality Control', href: '#quality' },
    ],
  },
  {
    label: 'Our Expertise',
    href: '#expertise',
    children: [
      { label: 'Infrastructure', href: '#infrastructure' },
      { label: 'MEP Services', href: '#mep' },
      { label: 'Civil Works', href: '#civil' },
      { label: 'Chemical', href: '#chemical' },
      { label: 'Water & Energy', href: '#water' },
    ],
  },
  { label: 'Projects', href: '#projects' },
  { label: 'R&D', href: '#rd' },
  { label: 'Media Center', href: '#media' },
  { label: 'Careers', href: '#careers' },
  { label: 'Contact Us', href: '#contact' },
]

/* ─── Desktop Dropdown ─────────────────────────────────── */
function DropdownMenu({ items, isOpen }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="absolute left-0 top-[calc(100%+4px)] z-50 min-w-[200px] overflow-hidden rounded-lg"
          style={{
            background: 'linear-gradient(160deg,#1b2d3e 0%,#162436 100%)',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 16px 48px rgba(0,0,0,0.45)',
          }}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
        >
          <div className="h-[2px] w-full" style={{ background: 'linear-gradient(90deg,transparent,rgba(180,50,50,0.7),transparent)' }} />
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block border-b border-white/[0.06] px-5 py-3 text-[0.8rem] font-normal text-white/65 transition-colors last:border-0 hover:bg-white/[0.05] hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ─── Desktop Nav Item ─────────────────────────────────── */
function NavItem({ link }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const cls =
    'relative whitespace-nowrap px-3 py-2 text-[0.82rem] font-medium text-white/80 transition-colors duration-150 hover:text-white'

  if (!link.children) {
    return (
      <a href={link.href} className={cls}>
        {link.label}
      </a>
    )
  }

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className={`${cls} flex items-center gap-1`}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        {link.label}
        <svg
          className={`h-3 w-3 shrink-0 opacity-60 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <DropdownMenu items={link.children} isOpen={open} />
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
        className="flex items-center justify-between border-b border-white/[0.07] px-6 py-4 text-[0.88rem] font-medium text-white/70 transition-colors hover:bg-white/[0.04] hover:text-white"
      >
        {link.label}
        <svg className="h-3.5 w-3.5 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </a>
    )
  }

  return (
    <div className="border-b border-white/[0.07]">
      <button
        className="flex w-full items-center justify-between px-6 py-4 text-[0.88rem] font-medium text-white/70 transition-colors hover:bg-white/[0.04] hover:text-white"
        onClick={() => setOpen(!open)}
      >
        {link.label}
        <svg
          className={`h-4 w-4 shrink-0 text-white/30 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
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
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
            style={{ background: 'rgba(0,0,0,0.15)' }}
          >
            {link.children.map((child) => (
              <a
                key={child.href}
                href={child.href}
                onClick={onClose}
                className="block border-b border-white/[0.05] px-9 py-3 text-[0.8rem] text-white/50 last:border-0 hover:text-white"
              >
                {child.label}
              </a>
            ))}
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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  /* The navy-to-slate gradient that matches the screenshot */
  const bgGradient = 'linear-gradient(135deg, #1a2e42 0%, #1e3448 35%, #243b52 70%, #1e3040 100%)'

  return (
    <>
      {/* ── TOP BAR ─────────────────────────────────────── */}
      <div
        className="hidden sm:block"
        style={{
          background: bgGradient,
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-2.5">
          {/* Left: location */}
          <div className="flex items-center gap-2">
            <svg className="h-3.5 w-3.5 shrink-0 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-[0.73rem] tracking-wide text-white/55">
              Dubai, UAE &nbsp;|&nbsp; Riyadh, Saudi Arabia
            </span>
          </div>

          {/* Right: contact */}
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
      </div>

      {/* ── MAIN HEADER ─────────────────────────────────── */}
      <header
        className="sticky top-0 z-[1000] transition-all duration-300"
        style={{
          background: bgGradient,
          borderBottom: scrolled
            ? '1px solid rgba(255,255,255,0.06)'
            : '1px solid rgba(255,255,255,0.08)',
          boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.35)' : 'none',
        }}
      >
        <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between gap-6 px-6">

          {/* ── Logo ── */}
          <a href="#home" className="flex shrink-0 items-center gap-2.5" aria-label="Island Tower Home">
            <img
              src="/assets/logo.png"
              alt="Island Tower"
              className="h-[46px] w-auto object-contain"
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'flex'
              }}
            />
            {/* SVG fallback — always visible if img fails */}
            <div style={{ display: 'none' }} className="items-center gap-2.5">
              {/* Triangle tower icon */}
              <svg viewBox="0 0 38 46" className="h-[44px] w-auto" fill="none">
                <polygon points="19,3 36,43 2,43" fill="none" stroke="#c0392b" strokeWidth="2.2" />
                <line x1="19" y1="3" x2="19" y2="43" stroke="#c0392b" strokeWidth="1.4" />
                <line x1="10" y1="27" x2="28" y2="27" stroke="#c0392b" strokeWidth="1.4" />
                <line x1="13.5" y1="17" x2="24.5" y2="17" stroke="#c0392b" strokeWidth="1.4" />
              </svg>
              <div>
                <div className="text-[0.82rem] font-black leading-none tracking-[2.5px] text-white">
                  ISLAND TOWER
                </div>
                <div className="mt-[3px] text-[0.42rem] tracking-[2px] text-white/40 uppercase">
                  Electromechanical Works LLC
                </div>
              </div>
            </div>
          </a>

          {/* ── Desktop Nav ── */}
          <nav
            className="hidden flex-1 flex-nowrap items-center justify-center xl:flex"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <NavItem key={link.href} link={link} />
            ))}
          </nav>

          {/* ── Right: Search + Hamburger ── */}
          <div className="flex shrink-0 items-center gap-1">
            {/* Search */}
            <button
              className="flex h-9 w-9 items-center justify-center rounded-md text-white/55 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Search"
            >
              <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Hamburger — below xl */}
            <button
              className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-md text-white/70 transition-colors hover:bg-white/10 hover:text-white xl:hidden"
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
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[1100] bg-black/50 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.aside
              className="fixed bottom-0 left-0 top-0 z-[1200] flex w-[min(300px,85vw)] flex-col"
              style={{
                background: bgGradient,
                borderRight: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '12px 0 40px rgba(0,0,0,0.5)',
              }}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.28, ease: 'easeInOut' }}
              aria-label="Mobile navigation"
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-5 py-4"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
              >
                <a href="#home" onClick={() => setMenuOpen(false)} className="flex items-center gap-2.5">
                  <img
                    src="/assets/logo.png"
                    alt="Island Tower"
                    className="h-[36px] w-auto object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'flex'
                    }}
                  />
                  <div style={{ display: 'none' }} className="items-center gap-2">
                    <svg viewBox="0 0 38 46" className="h-[34px] w-auto" fill="none">
                      <polygon points="19,3 36,43 2,43" fill="none" stroke="#c0392b" strokeWidth="2.2" />
                      <line x1="19" y1="3" x2="19" y2="43" stroke="#c0392b" strokeWidth="1.4" />
                      <line x1="10" y1="27" x2="28" y2="27" stroke="#c0392b" strokeWidth="1.4" />
                      <line x1="13.5" y1="17" x2="24.5" y2="17" stroke="#c0392b" strokeWidth="1.4" />
                    </svg>
                    <div>
                      <div className="text-[0.7rem] font-black tracking-[2px] text-white">ISLAND TOWER</div>
                      <div className="text-[0.38rem] tracking-[1.5px] text-white/40 uppercase">Electromechanical Works LLC</div>
                    </div>
                  </div>
                </a>

                <button
                  className="flex h-7 w-7 items-center justify-center rounded-full text-white/40 transition-colors hover:bg-white/10 hover:text-white"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close"
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Links */}
              <nav className="flex-1 overflow-y-auto py-1">
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

              {/* Footer */}
              <div
                className="px-5 py-4"
                style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
              >
                <p className="text-[0.68rem] text-white/30">info@islandtoweruae.ae</p>
                <p className="mt-0.5 text-[0.68rem] text-white/30">+971 4 257 3677</p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}