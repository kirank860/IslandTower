import React, { lazy, Suspense } from 'react'
import { ReactLenis } from 'lenis/react'
import Navbar from './Components/Navbar'
import Hero from './Components/Hero'
import About from './Components/About'

// Lazy-loaded components
const Stats = lazy(() => import('./Components/Stats'))
const Solutions = lazy(() => import('./Components/Solutions'))
const ThreeDShowcase = lazy(() => import('./Components/ThreeDShowcase'))
const Sponsors = lazy(() => import('./Components/Sponsors'))
const Footer = lazy(() => import('./Components/Footer'))

function App() {
  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.2, smoothTouch: true }}>
      <div className="min-h-screen font-body antialiased">
        <Navbar />
        <Hero />
        
        <Suspense fallback={null}>
          <Stats />
        </Suspense>
        
        <About />
        
        <Suspense fallback={null}>
          <Solutions />
        </Suspense>
        
        <Suspense fallback={null}>
          <ThreeDShowcase />
        </Suspense>
        
        <Suspense fallback={null}>
          <Sponsors />
        </Suspense>
        
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </ReactLenis>
  )
}

export default App
