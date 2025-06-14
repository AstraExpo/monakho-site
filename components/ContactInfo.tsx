import { Mail, Phone, MapPin } from 'lucide-react'
import React from 'react'

export function ContactInfo() {
  return (
          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-gray-400">
                <Mail className="h-4 w-4" />
                <span>hello@monakho.org</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <Phone className="h-4 w-4" />
                <span>+254 711 547617</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <MapPin className="h-4 w-4" />
                <span>Online & Everywhere</span>
              </li>
            </ul>
          </div>  )
}
