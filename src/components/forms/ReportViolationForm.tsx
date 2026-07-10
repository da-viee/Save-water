"use client";

import { useState } from "react";

export default function ReportViolationForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => setStatus("idle"), 3000);
    }, 1500);
  };

  return (
    <div className="bg-white border border-gray-200 p-8 shadow-xl relative overflow-hidden">
      {status === "success" && (
        <div className="absolute inset-0 z-20 bg-[#00A99D] flex flex-col items-center justify-center text-white p-8 text-center animate-in fade-in zoom-in duration-300">
          <svg className="w-20 h-20 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-3xl font-black mb-4 uppercase tracking-tight">Report Submitted Successfully</h3>
          <p className="text-teal-50 max-w-md font-medium text-lg leading-relaxed">Thank you for protecting our waters. Your report has been logged to the LASEPA enforcement queue and mapped on the GIS grid.</p>
        </div>
      )}

      <div className="mb-10 pb-6 border-b border-gray-100">
        <h2 className="text-3xl font-black text-gray-900 mb-3 uppercase tracking-tighter">Report Illegal Dumping</h2>
        <p className="text-gray-500 font-medium">Submit photographic evidence of corporate or industrial pollution. This data will be publicly mapped to increase accountability.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-xs font-black text-gray-900 uppercase tracking-widest">Location / Area</label>
            <input 
              required
              type="text" 
              placeholder="e.g. Apapa Port, Lekki Phase 1" 
              className="w-full bg-gray-50 border-2 border-gray-200 px-5 py-4 text-gray-900 focus:outline-none focus:border-[#E5243B] transition-colors font-medium"
            />
          </div>
          <div className="space-y-3">
            <label className="text-xs font-black text-gray-900 uppercase tracking-widest">Type of Violation</label>
            <select className="w-full bg-gray-50 border-2 border-gray-200 px-5 py-4 text-gray-900 focus:outline-none focus:border-[#E5243B] transition-colors appearance-none font-medium">
              <option>Industrial Chemical Discharge</option>
              <option>Raw Sewage Dumping</option>
              <option>Plastic/Solid Waste Dump</option>
              <option>Oil Spill / Leak</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-xs font-black text-gray-900 uppercase tracking-widest">Description</label>
          <textarea 
            required
            rows={4} 
            placeholder="Please provide details about the incident..." 
            className="w-full bg-gray-50 border-2 border-gray-200 px-5 py-4 text-gray-900 focus:outline-none focus:border-[#E5243B] transition-colors resize-none font-medium"
          ></textarea>
        </div>

        <div className="space-y-3">
          <label className="text-xs font-black text-gray-900 uppercase tracking-widest">Photographic Evidence</label>
          <div className="border-2 border-dashed border-gray-300 hover:border-[#E5243B] bg-gray-50 p-12 text-center transition-colors cursor-pointer group">
            <svg className="w-12 h-12 text-gray-400 mx-auto mb-4 group-hover:text-[#E5243B] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-gray-600 font-bold">Click to upload or drag and drop</p>
            <p className="text-gray-400 text-sm mt-2 font-medium">PNG, JPG, up to 10MB</p>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-4">
          <input type="checkbox" id="anon" className="w-5 h-5 bg-white border-gray-300 text-[#E5243B] focus:ring-[#E5243B]" />
          <label htmlFor="anon" className="text-sm font-bold text-gray-700 cursor-pointer">Submit anonymously to protect identity</label>
        </div>

        <button 
          type="submit" 
          disabled={status === "submitting"}
          className={`w-full font-black text-white py-5 text-lg uppercase tracking-widest transition-all ${
            status === "submitting" ? "bg-gray-400 cursor-not-allowed" : "bg-[#E5243B] hover:bg-[#C5192D] shadow-lg hover:shadow-xl"
          }`}
        >
          {status === "submitting" ? "Processing Report..." : "Submit Violation Report"}
        </button>
      </form>
    </div>
  );
}
