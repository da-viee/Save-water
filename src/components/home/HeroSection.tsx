import Link from 'next/link';

export default function HeroSection() {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-white">
      {/* Abstract SDG style geometric blocks instead of dark image */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-[#E5243B] rounded-sm transform rotate-12"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#00A99D] rounded-full transform -rotate-12"></div>
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-[#F99D26] rounded-sm transform rotate-45"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-[#00A99D] shadow-sm text-[#00A99D] text-sm font-bold mb-8 uppercase tracking-widest">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00A99D] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00A99D]"></span>
          </span>
          Live IoT Sensor Network Active
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-gray-900 mb-6 max-w-5xl leading-none">
          PROTECTING NIGERIA'S <br/>
          <span className="text-[#00A99D]">
            WATERFRONTS
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mb-12 font-medium leading-relaxed">
          Real-time IoT surveillance for climate resilience, ecological safety, and ending unregulated industrial pollution in Lagos Lagoon.
        </p>

        <Link 
          href="/map" 
          className="group relative inline-flex items-center justify-center px-10 py-5 text-lg font-black text-white bg-[#E5243B] overflow-hidden transition-all hover:bg-[#C5192D] shadow-lg hover:shadow-xl"
        >
          <span className="relative z-10 flex items-center gap-3 tracking-widest uppercase">
            Explore Live Map
            <svg className="w-6 h-6 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        </Link>
      </div>
    </div>
  );
}
