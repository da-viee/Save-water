import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 top-0 left-0 border-b border-gray-200 bg-white/90 backdrop-blur-md shadow-sm">
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
            <span className="text-gray-900 font-bold text-sm">MENU</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
