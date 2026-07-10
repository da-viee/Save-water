"use client";

interface PhMeterProps {
  phValue: number;
}

export default function PhMeter({ phValue }: PhMeterProps) {
  // Determine status and colors
  let statusMessage = "Ecosystem Optimal (Safe for marine life, human contact, and local aquaculture).";
  let statusColor = "text-[#00A99D]"; // SDG Green
  let indicatorColor = "bg-[#00A99D]";
  let titleColor = "text-[#00A99D]";

  if (phValue < 6.5) {
    statusMessage = "Unsafe Acidic Level (Suspected industrial chemical runoff or organic decay).";
    statusColor = "text-[#E5243B]"; // SDG Red
    indicatorColor = "bg-[#E5243B]";
    titleColor = "text-[#E5243B]";
  } else if (phValue > 8.5) {
    statusMessage = "Unsafe Alkaline Level (Suspected raw domestic sewage or heavy soap/detergent contamination).";
    statusColor = "text-[#F99D26]"; // SDG Orange
    indicatorColor = "bg-[#F99D26]";
    titleColor = "text-[#F99D26]";
  }

  // Calculate position percentage (0 to 14 mapped to 0% to 100%)
  const positionPercentage = Math.min(Math.max((phValue / 14) * 100, 0), 100);

  return (
    <div className="bg-white border border-gray-200 shadow-md h-full flex flex-col">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter">pH Analysis</h3>
      </div>
      
      <div className="flex-grow flex flex-col justify-center gap-8 p-6">
        {/* Value Display */}
        <div className="text-center">
          <div className={`text-7xl font-black tracking-tighter ${titleColor}`}>
            {phValue.toFixed(1)}
          </div>
          <div className="text-gray-500 font-bold uppercase tracking-widest mt-1 text-xs">pH SCALE</div>
        </div>

        {/* Gauge Bar */}
        <div className="relative pt-4 pb-2 px-2">
          {/* Gradient Bar */}
          <div className="h-4 w-full bg-gradient-to-r from-[#E5243B] via-[#00A99D] to-[#F99D26] shadow-inner"></div>
          
          {/* Indicator Pin */}
          <div 
            className="absolute top-0 -ml-2 w-4 h-10 flex flex-col items-center transition-all duration-1000 ease-out"
            style={{ left: `${positionPercentage}%` }}
          >
            <div className={`w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] ${indicatorColor.replace('bg-', 'border-t-')}`}></div>
            <div className={`w-1 h-5 ${indicatorColor} shadow-md`}></div>
          </div>
          
          {/* Scale Markers */}
          <div className="flex justify-between mt-3 text-[10px] text-gray-500 font-bold uppercase">
            <span>0 Acidic</span>
            <span>7 Neutral</span>
            <span>14 Alkaline</span>
          </div>
        </div>

        {/* Diagnostic Text */}
        <div className="bg-gray-50 p-4 border-l-4 border-gray-200" style={{ borderLeftColor: indicatorColor.replace('bg-', '') }}>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1 font-bold">Diagnostic Result</p>
          <p className={`text-sm ${statusColor} font-semibold leading-relaxed`}>
            {statusMessage}
          </p>
        </div>
      </div>
    </div>
  );
}
