"use client";

import dynamic from 'next/dynamic';

// Dynamically import MapComponent to prevent SSR issues with Leaflet
const MapWithNoSSR = dynamic(() => import('@/components/map/MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[calc(100vh-80px)] bg-neutral-900 animate-pulse flex items-center justify-center flex-col gap-4">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-blue-400 font-medium tracking-widest uppercase text-sm">Initializing GIS Engine</p>
    </div>
  ),
});

export default function MapPage() {
  return (
    <div className="flex-grow flex flex-col bg-neutral-950">
      <div className="w-full bg-neutral-900 border-b border-white/10 px-6 py-3 flex justify-between items-center z-10 relative">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Lagos Monitoring Grid</h1>
          <p className="text-xs text-neutral-400 uppercase tracking-widest">Active Regional Sensors</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span className="text-xs text-neutral-300">Live Node</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
            <span className="text-xs text-neutral-300">Simulated Node</span>
          </div>
        </div>
      </div>
      <MapWithNoSSR />
    </div>
  );
}
