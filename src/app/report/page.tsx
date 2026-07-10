import ReportViolationForm from "@/components/forms/ReportViolationForm";

export default function ReportPage() {
  return (
    <div className="flex-grow bg-white py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Text */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-100 text-[#E5243B] text-sm font-black mb-6 uppercase tracking-widest shadow-sm">
            ISO Corporate Enforcement
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 tracking-tighter uppercase">
            See Something. <br/>
            <span className="text-[#E5243B]">Say Something.</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed">
            Our IoT sensors can detect the pollution, but we need citizens to identify the polluters. Upload photos of illegal dumping to hold corporations accountable.
          </p>
        </div>

        {/* Form Container */}
        <ReportViolationForm />
        
        {/* Trust Indicators */}
        <div className="mt-16 text-center text-sm font-bold uppercase tracking-widest text-gray-500 flex flex-col sm:flex-row justify-center items-center gap-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            End-to-End Encrypted
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            Anonymous Supported
          </div>
        </div>

      </div>
    </div>
  );
}
