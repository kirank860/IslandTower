import React from 'react'
import Navbar from './Components/Navbar'
import Hero from './Components/Hero'
import Stats from './Components/Stats'
import About from './Components/About'
import Solutions from './Components/Solutions'
import Sponsors from './Components/Sponsors'
import Footer from './Components/Footer'

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Stats />
      <About />
      <Solutions />
      <Sponsors />
      <Footer />
    </div>
  )
}

export default App
