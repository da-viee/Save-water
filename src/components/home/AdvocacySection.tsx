export default function AdvocacySection() {
  return (
    <section className="py-24 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <div>
            <div className="mb-4 text-[#F99D26] font-black tracking-widest uppercase text-sm">
              The Campaign
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
              BRING BACK LAGOS <br />
              <span className="text-[#00A99D]">
                MARINE LIFE
              </span>
            </h2>
            
            <div className="space-y-6 text-gray-600 text-lg font-medium">
              <p>
                Native marine life, including dolphins and whales that were once common in Lagos waters, have been driven away by uncontrolled chemical dumping, dredging noise, and untreated sewage.
              </p>
              <p>
                <strong className="text-gray-900 font-bold">The Solution:</strong> Our IoT sensor network collects hard, un-fakeable data to help local environmental agencies (like LASEPA) enforce ISO corporate compliance. By stopping toxic industrial waste at the source, we pave the way for marine ecosystems to heal and aquatic life to return.
              </p>
            </div>

            <div className="mt-10 bg-white border border-gray-200 p-8 shadow-md">
              <h3 className="text-gray-900 font-black mb-2 text-2xl uppercase tracking-tight">Join the Initiative</h3>
              <p className="text-gray-500 text-sm mb-6 font-medium">
                Sign the petition to demand stricter enforcement of environmental laws on our waterfronts.
              </p>
              <form className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="flex-grow bg-gray-50 border-2 border-gray-300 px-5 py-4 text-gray-900 focus:outline-none focus:border-[#00A99D] transition-colors font-medium"
                  required
                />
                <button 
                  type="submit"
                  className="bg-[#00A99D] hover:bg-[#008C82] text-white font-black px-8 py-4 transition-colors whitespace-nowrap uppercase tracking-wider"
                >
                  Sign Petition
                </button>
              </form>
            </div>
          </div>

          {/* Image/Visual Content */}
          <div className="relative">
            <div className="absolute -inset-4 bg-[#E5243B] transform rotate-3 opacity-20"></div>
            <div className="relative bg-white border border-gray-200 p-4 shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1621451537084-482c73073e0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Polluted water visualization" 
                className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 p-4 border border-gray-200 backdrop-blur-sm">
                <p className="font-black text-gray-900 text-xl uppercase tracking-tighter">The True Cost of Inaction</p>
                <p className="text-sm text-gray-600 font-bold mt-1">Industrial runoff affecting local fisheries</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
