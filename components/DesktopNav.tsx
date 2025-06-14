import Link from 'next/link'
import React from 'react'

export interface DesktopNavProps {
    navItems: { href: string; label: string }[];
}

export  function DesktopNav({ navItems }: DesktopNavProps) {
  return (
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>  )
}
