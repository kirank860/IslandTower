import React from 'react'
import { motion } from 'framer-motion'

const containerClass = 'mx-auto max-w-[1200px] px-5 md:px-8'

const sponsors = [
  { name: 'EMPOWER', img: '/assets/empower.png' },
  { name: 'EMICOOL', img: '/assets/emicool.png' },
  { name: 'RTA', img: '/assets/rta.png' },
  { name: 'EMAAR', img: '/assets/emaar.png' },
  { name: 'Dubai Municipality', img: '/assets/dubai-municipality.png' },
  { name: 'NAKHEEL', img: '/assets/nakheel.png' },
]

function Sponsors() {
  return (
    <section className="bg-[#fcfbf7] py-24 md:py-32 border-t border-gray-100">
      <div className={containerClass}>
        {/* Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-[#00664f] text-xs font-semibold uppercase tracking-[3px] mb-3">
            Partners
          </div>
          <h3 className="mt-2 font-body text-[clamp(1.5rem,3vw,2.2rem)] font-extrabold normal-case text-gray-900 tracking-tight">
            Our Trusted Clients &amp; Partners
          </h3>
          <div className="mt-4 mx-auto h-[3px] w-12 rounded-full bg-[#00664f]" />
        </motion.div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-3 xl:grid-cols-6">
          {sponsors.map((s, i) => (
            <motion.div
              key={i}
              className="group flex h-[140px] cursor-pointer items-center justify-center rounded-xl border border-gray-200 bg-white p-6 transition-all duration-400"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              whileHover={{
                y: -6,
                boxShadow: '0 15px 30px rgba(0, 0, 0, 0.05)',
                borderColor: 'rgba(0, 102, 79, 0.15)',
              }}
            >
              {/* Logo image — grayscale by default, colored on hover */}
              <img
                src={s.img}
                alt={s.name}
                className="max-h-19 max-w-full object-contain  transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Sponsors