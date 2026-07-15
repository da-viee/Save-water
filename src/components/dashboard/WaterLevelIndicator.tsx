"use client";

import { motion } from "framer-motion";

interface WaterLevelProps {
  distanceValue: number; // 0 to 200 cm (distance from sensor to water surface)
  phValue: number;
}

export default function WaterLevelIndicator({ distanceValue, phValue }: WaterLevelProps) {
  const isAcidic = phValue < 6.5;
  const isAlkaline = phValue > 8.5;
  const isFlood = distanceValue < 30;
  const isLowLevel = distanceValue > 150;

  let textColor = "text-[#00A99D]";
  let statusMessage = "SAFE: ECOSYSTEM NORMAL";
  let waveFill = "#0ea5e9";
  let statusBgColor = "bg-[#00A99D]";
  let waterBodyColor = "#0ea5e9";

  if (isAcidic) {
    textColor = "text-[#E5243B]";
    statusMessage = "DANGER: ACIDIC WATER";
    waveFill = "#ef4444";
    statusBgColor = "bg-[#E5243B]";
    waterBodyColor = "#ef4444";
  } else if (isAlkaline) {
    textColor = "text-[#F99D26]";
    statusMessage = "WARNING: ALKALINE WATER";
    waveFill = "#f97316";
    statusBgColor = "bg-[#F99D26]";
    waterBodyColor = "#f97316";
  } else {
    waveFill = "#0ea5e9";
    statusBgColor = "bg-[#00A99D]";
    waterBodyColor = "#0ea5e9";
  }

  if (isFlood) {
    textColor = "text-[#E5243B]";
    statusMessage = "DANGER: FLOODING DETECTED";
    waveFill = "#ef4444";
    statusBgColor = "bg-[#E5243B]";
    waterBodyColor = "#ef4444";
  } else if (isLowLevel && !isAcidic && !isAlkaline) {
    textColor = "text-[#F99D26]";
    statusMessage = "WARNING: LEVEL DEPLETED";
    statusBgColor = "bg-[#F99D26]";
    // keep the water itself safe blue when pH is normal
    waterBodyColor = "#0ea5e9";
  }

  // --- ACCURATE FILL & DEPTH CALCULATION ---
  // The sensor is mounted 200cm above the ground.
  // When distanceValue = 200cm, water depth is 0cm (empty).
  // When distanceValue = 0cm, water depth is 200cm (fully flooded).
  const sensorHeight = 200;
  const safeDistance = Math.min(Math.max(distanceValue, 0), sensorHeight);
  const floodDepthCm = sensorHeight - safeDistance; // actual depth of water on ground
  const fillPercentage = (floodDepthCm / sensorHeight) * 100;

  // --- HEIGHT MARKERS ---
  // Positioned as a percentage of the 200cm total height
  // Boots: 20cm -> 10%
  // Bike: 45cm -> 22.5%
  // Car Engine: 60cm -> 30%
  // SUV Engine: 80cm -> 40%

  return (
    <div className="bg-white border border-gray-200 shadow-md h-full flex flex-col relative overflow-hidden">
      {/* Header SDG Style Block */}
      <div className="p-6 border-b border-gray-100 flex justify-between items-start">
        <div>
          <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">Water Level Indicator</h3>
          <p className={`text-sm mt-1 font-bold ${textColor} uppercase tracking-widest`}>
            {statusMessage}
          </p>
        </div>
        <div className="text-right">
          <div className={`text-white ${statusBgColor} px-3 py-1 font-black text-xl shadow-sm inline-block`}>
            {floodDepthCm.toFixed(2)} <span className="text-sm font-medium">cm Depth</span>
          </div>
        </div>
      </div>

      <div className="flex-grow flex flex-col items-start justify-end relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #e0f7ff 0%, #f0fbff 55%, #d4f5d4 80%, #b8e8b8 100%)' }}>

        {/* Cartoon Background Scene */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 400 300"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
          style={{ zIndex: 0 }}
        >
          {/* Sky gradient */}
          <defs>
            <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#bae6fd" />
              <stop offset="100%" stopColor="#e0f7ff" />
            </linearGradient>
            <linearGradient id="hillGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#86efac" />
              <stop offset="100%" stopColor="#4ade80" />
            </linearGradient>
            <linearGradient id="hill2Grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a7f3d0" />
              <stop offset="100%" stopColor="#6ee7b7" />
            </linearGradient>
          </defs>

          {/* Sky */}
          <rect width="400" height="300" fill="url(#skyGrad)" />

          {/* Cloud 1 */}
          <g opacity="0.9">
            <ellipse cx="60" cy="55" rx="28" ry="16" fill="white" />
            <ellipse cx="80" cy="48" rx="22" ry="18" fill="white" />
            <ellipse cx="100" cy="55" rx="25" ry="14" fill="white" />
            <ellipse cx="40" cy="60" rx="18" ry="12" fill="white" />
          </g>

          {/* Cloud 2 */}
          <g opacity="0.85">
            <ellipse cx="250" cy="40" rx="32" ry="15" fill="white" />
            <ellipse cx="272" cy="32" rx="24" ry="19" fill="white" />
            <ellipse cx="295" cy="40" rx="28" ry="14" fill="white" />
            <ellipse cx="230" cy="45" rx="20" ry="11" fill="white" />
          </g>

          {/* Cloud 3 (small) */}
          <g opacity="0.75">
            <ellipse cx="170" cy="65" rx="18" ry="9" fill="white" />
            <ellipse cx="183" cy="59" rx="14" ry="11" fill="white" />
            <ellipse cx="196" cy="65" rx="16" ry="8" fill="white" />
          </g>

          {/* Back hills */}
          <ellipse cx="100" cy="260" rx="180" ry="90" fill="url(#hill2Grad)" opacity="0.5" />
          <ellipse cx="340" cy="280" rx="160" ry="80" fill="url(#hill2Grad)" opacity="0.4" />

          {/* Ground hill */}
          <path d="M 0 210 Q 80 160 160 190 Q 240 215 320 170 Q 360 150 400 180 L 400 300 L 0 300 Z" fill="url(#hillGrad)" />

          {/* Tree 1 — left side */}
          {/* trunk */}
          <rect x="38" y="195" width="8" height="40" rx="2" fill="#92400e" />
          {/* foliage layers */}
          <ellipse cx="42" cy="195" rx="22" ry="20" fill="#16a34a" />
          <ellipse cx="42" cy="178" rx="16" ry="16" fill="#15803d" />
          <ellipse cx="42" cy="165" rx="10" ry="12" fill="#166534" />

          {/* Tree 2 — left, taller */}
          <rect x="78" y="185" width="10" height="50" rx="2" fill="#92400e" />
          <ellipse cx="83" cy="183" rx="26" ry="22" fill="#22c55e" />
          <ellipse cx="83" cy="163" rx="19" ry="17" fill="#16a34a" />
          <ellipse cx="83" cy="148" rx="12" ry="13" fill="#15803d" />

          {/* Tree 3 — mid left */}
          <rect x="120" y="200" width="7" height="35" rx="2" fill="#78350f" />
          <ellipse cx="123" cy="200" rx="18" ry="16" fill="#4ade80" />
          <ellipse cx="123" cy="186" rx="13" ry="13" fill="#22c55e" />
          <ellipse cx="123" cy="175" rx="8" ry="10" fill="#16a34a" />

          {/* Bush / shrub left */}
          <ellipse cx="20" cy="232" rx="16" ry="10" fill="#86efac" />
          <ellipse cx="35" cy="228" rx="13" ry="9" fill="#4ade80" />

          {/* Small distant tree right side */}
          <rect x="340" y="200" width="6" height="30" rx="2" fill="#92400e" />
          <ellipse cx="343" cy="200" rx="16" ry="14" fill="#16a34a" />
          <ellipse cx="343" cy="188" rx="11" ry="11" fill="#15803d" />

          {/* Bush right */}
          <ellipse cx="375" cy="230" rx="18" ry="11" fill="#86efac" />
          <ellipse cx="390" cy="226" rx="12" ry="8" fill="#4ade80" />
        </svg>


        {/* Height Markers — mathematically aligned to the water fill percentage */}
        <div className="absolute inset-y-0 right-0 w-44 border-l-2 border-dashed border-gray-300 pointer-events-none" style={{ zIndex: 30 }}>
          {/* SUV Engine — 80cm depth (40% height) */}
          <div className="absolute w-full border-t border-red-300" style={{ bottom: '40%' }}>
            <span className="absolute -top-3 left-3 bg-[#E5243B] text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 shadow-md whitespace-nowrap">
              SUV Engine — 80cm
            </span>
          </div>
          {/* Car Engine — 60cm depth (30% height) */}
          <div className="absolute w-full border-t border-orange-300" style={{ bottom: '30%' }}>
            <span className="absolute -top-3 left-3 bg-[#F99D26] text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 shadow-md whitespace-nowrap">
              Car Engine — 60cm
            </span>
          </div>
          {/* Bike — 45cm depth (22.5% height) */}
          <div className="absolute w-full border-t border-blue-300" style={{ bottom: '22.5%' }}>
            <span className="absolute -top-3 left-3 bg-[#0077B6] text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 shadow-md whitespace-nowrap">
              Bike — 45cm
            </span>
          </div>
          {/* Boots — 20cm depth (10% height) */}
          <div className="absolute w-full border-t border-teal-300" style={{ bottom: '10%' }}>
            <span className="absolute -top-3 left-3 bg-[#00A99D] text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 shadow-md whitespace-nowrap">
              Boots (Walking) — 20cm
            </span>
          </div>
        </div>
        {/* Car SVG — front-view, RIGHT half visible, hugging the right edge of card */}
        {/* Attribution: "Car" icon by Yon ten from the Noun Project */}
        <div
          className="absolute z-10 left-[-35%] md:left-[-67%]"
          style={{
            width: '100%',   /* ← increase this % to make car wider */
            height: '150%',  /* ← increase this % to make car taller */
            bottom: '-45%', /* ← make more negative to push car further down */
            overflow: 'hidden',
          }}
        >
          {/* The SVG viewBox is 100×125. We shift it left by 50 units inside the SVG
              so only the right half (50-100 x range) is visible */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="50 0 50 100"
            className="w-full h-full"
            preserveAspectRatio="xMaxYMax meet"
          >
            <g fill="#1e293b">
              {/* Left mirror/light cluster */}
              <path d="M38.78,50.09h0a25.58,25.58,0,0,0-9.28-3.35,2.47,2.47,0,0,0-2.18.83,2.49,2.49,0,0,0-.53,2.27A7.17,7.17,0,0,0,28.61,53a1,1,0,0,0,.6.29c.13,0,2.58.26,5.86.26.91,0,1.88,0,2.88-.06a1.82,1.82,0,0,0,.83-3.4Zm-9,1.31a5.3,5.3,0,0,1-1.11-2,.55.55,0,0,1,.12-.51.57.57,0,0,1,.48-.18,23.13,23.13,0,0,1,8.2,2.91A65.2,65.2,0,0,1,29.77,51.4Zm8,.37h0l.48-.84Z"/>
              {/* Right mirror/light cluster */}
              <path d="M61.22,50.09h0a1.82,1.82,0,0,0,.83,3.4c1,0,2,.06,2.88.06,3.28,0,5.73-.24,5.86-.26a1,1,0,0,0,.6-.29,7.17,7.17,0,0,0,1.82-3.16,2.49,2.49,0,0,0-.53-2.27,2.47,2.47,0,0,0-2.18-.83A25.58,25.58,0,0,0,61.22,50.09Zm10-1.25a.55.55,0,0,1,.12.51,5.3,5.3,0,0,1-1.11,2,65.2,65.2,0,0,1-7.69.17,23.13,23.13,0,0,1,8.2-2.91A.57.57,0,0,1,71.22,48.84Z"/>
              {/* Main body */}
              <path d="M78.06,40.77a3.31,3.31,0,0,0-3.31-3.31H70.63a1,1,0,0,0-1,1V40c-.2-.66-.46-1.42-.75-2.21-1.24-3.28-2.64-5.48-4.17-6.56a.91.91,0,0,0-.42-.17A130.07,130.07,0,0,0,50.55,30h-1.1a130.07,130.07,0,0,0-13.77,1.13.91.91,0,0,0-.42.17c-1.53,1.08-2.93,3.28-4.17,6.56-.29.79-.55,1.55-.75,2.21V38.43a1,1,0,0,0-1-1H25.25a3.33,3.33,0,0,0,0,6.65h.61c-.55.39-1,.77-1.44,1.1a4.37,4.37,0,0,0-1.6,3.39V61.54h0v6a2.48,2.48,0,0,0,2.47,2.47h5.35a2.47,2.47,0,0,0,2.47-2.47V64.78H66.87v2.81a2.47,2.47,0,0,0,2.47,2.47h5.35a2.48,2.48,0,0,0,2.47-2.47v-6h0V48.6a4.37,4.37,0,0,0-1.6-3.39c-.41-.33-.89-.71-1.44-1.1h.61A3.34,3.34,0,0,0,78.06,40.77ZM71.6,41.92V39.4h3.15a1.38,1.38,0,0,1,1.38,1.37,1.4,1.4,0,0,1-1.4,1.4H71.56A1,1,0,0,0,71.6,41.92ZM36.2,33A123.77,123.77,0,0,1,50,31.88,123.77,123.77,0,0,1,63.8,33c2,1.6,3.57,6,4.3,8.6H31.9C32.63,39,34.19,34.56,36.2,33ZM23.87,40.77a1.38,1.38,0,0,1,1.38-1.37H28.4v2.52a1,1,0,0,0,0,.25H25.27A1.4,1.4,0,0,1,23.87,40.77ZM31.2,67.59a.54.54,0,0,1-.54.53H25.31a.53.53,0,0,1-.53-.53V64.51a3.24,3.24,0,0,0,1.29.27H31.2Zm18.36-4.75h-15V61.47a4.12,4.12,0,0,1,4.11-4.11H61.29a4.12,4.12,0,0,1,4.11,4.11v1.37H49.56Zm25.13,5.28H69.34a.54.54,0,0,1-.54-.53V64.78h5.13a3.24,3.24,0,0,0,1.29-.27v3.08A.53.53,0,0,1,74.69,68.12Zm.53-19.52V61.54h0a1.29,1.29,0,0,1-1.29,1.29H67.34V61.47a6.06,6.06,0,0,0-6.05-6H38.71a6.06,6.06,0,0,0-6.05,6v1.37H26.07a1.29,1.29,0,0,1-1.29-1.29h0V48.6a2.41,2.41,0,0,1,.89-1.89,22,22,0,0,1,5.18-3.21h38.3a22,22,0,0,1,5.18,3.21A2.41,2.41,0,0,1,75.22,48.6Z"/>
            </g>
          </svg>
        </div>

        {/* Multi-Layered Water Animation Overlay */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none"
          initial={{ height: "0%" }}
          animate={{ height: `${fillPercentage}%` }}
          transition={{ type: "spring", stiffness: 40, damping: 20 }}
          style={{ zIndex: 20 }}
        >
          {/* Solid water body matching the pH-based water color */}
          <div className="absolute top-[30px] bottom-0 left-0 right-0" style={{ backgroundColor: waterBodyColor, opacity: 0.85 }} />

          {/* Wave Layer 1 (Back, slower, lighter opacity) */}
          <motion.div 
            className="absolute top-0 left-0 right-0 h-[40px] opacity-40 w-[200%]"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,40 C300,120 300,-40 600,40 C900,120 900,-40 1200,40 L1200,120 L0,120 Z' fill='${encodeURIComponent(waveFill)}'/%3E%3C/svg%3E")`,
              backgroundSize: '50% 100%',
              backgroundRepeat: 'repeat-x'
            }}
          />

          {/* Wave Layer 2 (Front, faster, higher opacity) */}
          <motion.div 
            className="absolute top-[10px] left-0 right-0 h-[30px] opacity-90 w-[200%]"
            animate={{ x: ["-50%", "0%"] }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,40 C300,120 300,-40 600,40 C900,120 900,-40 1200,40 L1200,120 L0,120 Z' fill='${encodeURIComponent(waveFill)}'/%3E%3C/svg%3E")`,
              backgroundSize: '50% 100%',
              backgroundRepeat: 'repeat-x'
            }}
          />
        </motion.div>
      </div>

      {/* Attribution — required by Noun Project license */}
      <div className="px-4 py-2 border-t border-gray-100 bg-white">
        <p className="text-[9px] text-gray-400 font-medium tracking-wide">
          Car icon by <span className="font-bold text-gray-500">Yon ten</span> from the{' '}
          <a
            href="https://thenounproject.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-[#00A99D] transition-colors"
          >
            Noun Project
          </a>
        </p>
      </div>
    </div>
  );
}
