import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <span className="text-xl font-black text-gray-900 tracking-tighter">
              SAVE THE <span className="text-[#00A99D]">WATERS</span>
            </span>
            <p className="text-gray-500 mt-2 text-sm max-w-sm">
              Real-time IoT surveillance for climate resilience and ecological safety across Lagos State waterfronts.
            </p>
          </div>
          <div className="flex space-x-6">
            <Link href="/" className="text-gray-500 hover:text-gray-900 font-medium text-sm uppercase">
              Home
            </Link>
            <Link href="/map" className="text-gray-500 hover:text-gray-900 font-medium text-sm uppercase">
              Live Map
            </Link>
            <Link href="/report" className="text-gray-500 hover:text-gray-900 font-medium text-sm uppercase">
              Report Violation
            </Link>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 flex justify-between items-center text-gray-400 text-xs font-bold">
          <p>&copy; {new Date().getFullYear()} Save the Waters Initiative. All rights reserved.</p>
          <p>Powered by Next.js & Leaflet</p>
        </div>
      </div>
    </footer>
  );
}
