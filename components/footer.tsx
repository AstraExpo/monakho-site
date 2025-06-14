import { Heart, Music, Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";
import { QuickLinks } from "./QuickLinks";
import { ContactInfo } from "./ContactInfo";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black/40 backdrop-blur-md border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Mission */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Image
                width={40}
                height={40}
                className="h-8 w-8 text-blue-400"
                src={"/logo.png"}
                alt={"Monakho Ministry Logo"}
              />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Monakho Ministry
              </span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              To worship God in Truth And Spirit and leading souls into His
              Glorious presence by the Holy Spirit, Sacred music and holy
              inspired writings and books that transform hearts and nations by
              Gods Word. Giving LOVE & Life meaning in the world:{" "}
              <strong>John 3:16</strong>
            </p>
            <div className="flex space-x-4">
              <Link
                href={"/gifts"}
                className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
              >
                <Music className="h-5 w-5 text-white" />
              </Link>
              <Link
                href={"/about"}
                className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
              >
                <Heart className="h-5 w-5 text-white" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <QuickLinks />

          {/* Contact Info */}
          <ContactInfo />
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Monakho Ministry. Made with{" "}
            <Heart className="inline h-4 w-4 text-red-400" /> for the community.
          </p>
        </div>
      </div>
    </footer>
  );
}
