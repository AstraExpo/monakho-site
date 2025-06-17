import React from 'react'

export function HeroContact() {
  return (
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Get Connected
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We would love to hear from you! Whether you have questions, want to join our community, or need prayer, we are
            here to connect.
          </p>
        </div>
      </section>  )
}
