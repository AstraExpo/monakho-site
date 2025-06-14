import Link from "next/link";
import React from "react";

export function QuickLinks() {
  return (
    <div>
      <h3 className="text-white font-semibold mb-4">Quick Links</h3>
      <ul className="space-y-2">
        <li>
          <Link
            href="/about"
            className="text-gray-400 hover:text-white transition-colors"
          >
            About Us
          </Link>
        </li>
        <li>
          <Link
            href="/worship-events"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Events
          </Link>
        </li>
        <li>
          <Link
            href="/gifts"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Content
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Contact
          </Link>
        </li>
      </ul>
    </div>
  );
}
