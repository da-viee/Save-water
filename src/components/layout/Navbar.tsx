import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 top-0 left-0 border-b border-gray-200 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-black text-gray-900 tracking-tighter">
                SAVE THE <span className="text-[#00A99D]">WATERS</span>
              </span>
            </Link>
          </div>
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-600 hover:text-[#00A99D] transition-colors text-sm font-bold tracking-wide uppercase">
              Advocacy
            </Link>
            <Link href="/map" className="text-gray-600 hover:text-[#00A99D] transition-colors text-sm font-bold tracking-wide uppercase">
              Live Map
            </Link>
            <Link href="/report" className="text-gray-600 hover:text-[#E5243B] transition-colors text-sm font-bold tracking-wide uppercase">
              Report Violation
            </Link>
          </div>
          <div className="md:hidden">
            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              <span className="text-sm font-black">{menuOpen ? '✕' : '☰'}</span>
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white py-4">
            <div className="flex flex-col gap-3 px-2">
              <Link href="/" className="text-gray-700 hover:text-[#00A99D] font-bold uppercase tracking-wide text-sm" onClick={() => setMenuOpen(false)}>
                Advocacy
              </Link>
              <Link href="/map" className="text-gray-700 hover:text-[#00A99D] font-bold uppercase tracking-wide text-sm" onClick={() => setMenuOpen(false)}>
                Live Map
              </Link>
              <Link href="/report" className="text-gray-700 hover:text-[#E5243B] font-bold uppercase tracking-wide text-sm" onClick={() => setMenuOpen(false)}>
                Report Violation
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
