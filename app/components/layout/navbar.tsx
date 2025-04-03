import { ThemeToggle } from "./theme-toggle";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { navItems } from "../../lib/data";

export function Navbar() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  return (
    <nav className="w-full p-4 bg-gray-900 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold">
          <Link to="/" className="hover:text-gray-300">
            Monakho Ministry
          </Link>
        </h1>
        {/* Navbar Links (Desktop) */}
        <div className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="text-lg hover:text-gray-300"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Theme Toggle and Mobile Menu Icon */}
        <div className="flex items-center space-x-4">
          {/* Theme toggle */}
          <ThemeToggle />

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 space-y-4 px-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="block text-lg hover:text-gray-300"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
