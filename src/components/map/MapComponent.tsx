"use client";

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Link from 'next/link';

// Fix for default Leaflet markers in Next.js
const customIcon = typeof window !== 'undefined' ? new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
}) : null;

// Markers Data
const stations = [
  {
    id: 'makoko',
    name: 'Makoko (Case Study)',
    position: [6.4965, 3.3963] as [number, number],
    status: 'LIVE GPRS FEED',
    isLive: true
  },
  {
    id: 'lekki',
    name: 'Lekki Phase 1',
    position: [6.4468, 3.4619] as [number, number],
    status: 'Simulated Demo Station',
    isLive: false
  },
  {
    id: 'ikorodu',
    name: 'Ikorodu Terminal',
    position: [6.5910, 3.5042] as [number, number],
    status: 'Simulated Demo Station',
    isLive: false
  },
  {
    id: 'victoria-island',
    name: 'Victoria Island',
    position: [6.4281, 3.4219] as [number, number],
    status: 'Simulated Demo Station',
    isLive: false
  },
  {
    id: 'apapa',
    name: 'Apapa Port',
    position: [6.4452, 3.3615] as [number, number],
    status: 'Simulated Demo Station',
    isLive: false
  },
  {
    id: 'epe',
    name: 'Epe Marina',
    position: [6.5841, 3.9833] as [number, number],
    status: 'Simulated Demo Station',
    isLive: false
  },
  {
    id: 'badagry',
    name: 'Badagry Creek',
    position: [6.4316, 2.8876] as [number, number],
    status: 'Simulated Demo Station',
    isLive: false
  }
];

export default function MapComponent() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="w-full h-[calc(100vh-80px)] bg-neutral-900 animate-pulse flex items-center justify-center text-white">Loading Map Engine...</div>;
  }

  return (
    <div className="w-full h-[calc(100vh-80px)] relative z-0">
      <MapContainer 
        center={[6.5050, 3.4350]} 
        zoom={12} 
        zoomControl={false}
        className="w-full h-full"
        style={{ background: '#0a0a0a' }}
      >
        {/* We use OpenStreetMap tiles, filtering them to a darker tone using CSS if needed, but for now standard is fine */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          className="map-tiles"
        />
        <ZoomControl position="bottomright" />

        {stations.map((station) => (
          <Marker 
            key={station.id}
            position={station.position} 
            icon={customIcon as L.Icon}
          >
            <Popup>
              <div className="text-center font-sans p-1 min-w-[150px]">
                <p className="font-bold text-gray-900 text-sm mb-2">{station.name}</p>
                <div className={`mb-3 text-[10px] font-bold px-2 py-1 rounded-full inline-block ${station.isLive ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {station.isLive ? (
                    <span className="flex items-center justify-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                      {station.status}
                    </span>
                  ) : (
                    <span>{station.status}</span>
                  )}
                </div>
                <Link 
                  href={`/station/${station.id}`}
                  className="block w-full py-2 bg-blue-600 text-white rounded-md text-xs font-bold hover:bg-blue-700 transition-colors text-center"
                >
                  View Dashboard
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      {/* Custom Global Styles for Map Tiles to make it look premium/darkish if desired */}
      <style jsx global>{`
        .leaflet-container {
          background-color: #0a0a0a !important;
          font-family: inherit;
        }
        .map-tiles {
          filter: brightness(0.8) contrast(1.2) grayscale(0.2);
        }
        .leaflet-popup-content-wrapper {
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }
        .leaflet-popup-content {
          margin: 10px;
        }
      `}</style>
    </div>
  );
}
