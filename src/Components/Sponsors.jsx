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

        {/* Infinite Partners Marquee */}
        <div className="relative overflow-hidden py-4 marquee-fade-mask">
          <div className="animate-marquee flex gap-6">
            {/* First render list */}
            {sponsors.map((s, i) => (
              <div
                key={`s1-${i}`}
                className="group flex h-[145px] w-[240px] shrink-0 items-center justify-center rounded-2xl border border-gray-200 bg-white p-7 transition-all duration-300 hover:border-[#00664f]/40 hover:shadow-lg hover:shadow-black/5"
              >
                <img
                  src={s.img}
                  alt={s.name}
                  className="max-h-[76px] max-w-full object-contain transition-transform duration-500 group-hover:scale-108"
                  loading="lazy"
                />
              </div>
            ))}
            {/* Duplicated render list for seamless looping */}
            {sponsors.map((s, i) => (
              <div
                key={`s2-${i}`}
                className="group flex h-[145px] w-[240px] shrink-0 items-center justify-center rounded-2xl border border-gray-200 bg-white p-7 transition-all duration-300 hover:border-[#00664f]/40 hover:shadow-lg hover:shadow-black/5"
              >
                <img
                  src={s.img}
                  alt={s.name}
                  className="max-h-[76px] max-w-full object-contain transition-transform duration-500 group-hover:scale-108"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Sponsors