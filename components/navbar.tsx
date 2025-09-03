"use client";

import { useState } from "react";
import Link from "next/link";
import { LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DesktopNav } from "./DesktopNav";
import Image from "next/image";
import { navItems } from "./data/Items";
import { useAuth } from "@/app/context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/client" className="flex items-center space-x-2 group">
            <div className="relative">
              <Image
                width={40}
                height={40}
                className="h-8 w-8 text-blue-400 group-hover:text-blue-300 transition-colors"
                src={"/logo.png"}
                alt={"Monakho Ministry Logo"}
              />
              <div className="absolute inset-0 h-8 w-8 bg-blue-400/20 rounded-full blur-md group-hover:bg-blue-300/30 transition-colors"></div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Monakho Ministry
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <DesktopNav navItems={navItems} />
            <Button
              variant="ghost"
              className="text-gray-300 hover:text-white flex items-center gap-1"
              onClick={() => logout()}
            >
              <LogOut size={18} />
              Logout
            </Button>
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black/40 backdrop-blur-md rounded-lg mt-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 text-gray-300 hover:text-white transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {/* Logout for mobile */}
              <button
                onClick={() => {
                  setIsOpen(false);
                  logout();
                }}
                className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white transition-colors flex items-center gap-2"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
