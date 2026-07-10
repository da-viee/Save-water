"use client";

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import WaterLevelIndicator from '@/components/dashboard/WaterLevelIndicator';
import PhMeter from '@/components/dashboard/PhMeter';
import HistoricalCharts from '@/components/dashboard/HistoricalCharts';

// Map of stations for titles
const stationInfo: Record<string, string> = {
  makoko: "Makoko (Case Study)",
  lekki: "Lekki Phase 1",
  ikorodu: "Ikorodu Terminal"
};

interface FeedData {
  created_at: string;
  field1: string; // Distance
  field2: string; // pH
}

interface ThingSpeakResponse {
  channel: any;
  feeds: FeedData[];
}

export default function StationDashboard({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const stationId = resolvedParams.id;
  const stationName = stationInfo[stationId] || "Unknown Station";
  const isLive = stationId === 'makoko';

  const [distance, setDistance] = useState<number>(45); // Default safe mock
  const [ph, setPh] = useState<number>(7.2); // Default safe mock
  const [chartData, setChartData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const channelId = "3417136";
    
    const fetchData = async () => {
      try {
        const res = await fetch(`https://api.thingspeak.com/channels/${channelId}/feeds.json?results=24`);
        if (!res.ok) throw new Error("Failed to fetch");
        
        const data: ThingSpeakResponse = await res.json();
        
        if (data.feeds && data.feeds.length > 0) {
          const lastFeed = data.feeds[data.feeds.length - 1];
          const lastDistance = parseFloat(lastFeed.field1);
          const lastPh = parseFloat(lastFeed.field2);
          
          if (!isNaN(lastDistance)) setDistance(lastDistance);
          if (!isNaN(lastPh)) setPh(lastPh);
 
          const formattedChartData = data.feeds.map(feed => {
            const date = new Date(feed.created_at);
            const rawDistance = parseFloat(feed.field1) || 0;
            return {
              time: `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`,
              distance: Math.max(0, 200 - rawDistance), // convert to water depth
              ph: parseFloat(feed.field2) || 0
            };
          });
          setChartData(formattedChartData);
        } else {
          useMockData();
        }
      } catch (error) {
        useMockData();
      } finally {
        setIsLoading(false);
      }
    };
 
    const useMockData = () => {
      const mockHist = [];
      const now = new Date();
      for(let i=24; i>=0; i--) {
        const t = new Date(now.getTime() - i * 60 * 60 * 1000);
        mockHist.push({
          time: `${t.getHours()}:00`,
          distance: Math.max(0, 200 - (175 + Math.random() * 10)), // depth mock ~25cm
          ph: 6.2 + (Math.random() * 0.2 - 0.1)
        });
      }
      setChartData(mockHist);
      setDistance(175); // 25cm depth mock
      setPh(6.2);
    };

    if (isLive) {
      fetchData();
      const interval = setInterval(fetchData, 15000);
      return () => clearInterval(interval);
    } else {
      // Direct local simulation for Lekki/Ikorodu with updates every 5s
      const runSimulation = () => {
        const mockHist = [];
        const now = new Date();
        const baseDistance = stationId === 'lekki' ? 140 : 170; // Lekki is 60cm depth (distance=140), Ikorodu is 30cm depth (distance=170)
        const basePh = stationId === 'lekki' ? 7.4 : 6.8;

        for(let i=24; i>=0; i--) {
          const t = new Date(now.getTime() - i * 60 * 60 * 1000);
          mockHist.push({
            time: `${t.getHours()}:00`,
            distance: baseDistance + Math.sin(i) * 5 + (Math.random() * 2 - 1),
            ph: basePh + Math.cos(i) * 0.1 + (Math.random() * 0.04 - 0.02)
          });
        }
        setChartData(mockHist);
        
        // Add random fluctuation to current reading
        setDistance(baseDistance + (Math.random() * 4 - 2));
        setPh(Number((basePh + (Math.random() * 0.2 - 0.1)).toFixed(2)));
        setIsLoading(false);
      };
      
      runSimulation();
      const interval = setInterval(runSimulation, 5000);
      return () => clearInterval(interval);
    }
 
  }, [stationId, isLive]);

  if (isLoading) {
    return <div className="flex-grow flex items-center justify-center bg-gray-50 text-gray-900 animate-pulse font-bold text-xl uppercase tracking-widest">Loading Sensor Data...</div>;
  }

  let showHealthWarning = false;
  let healthWarningMsg = "";
  if (ph < 6.5 || ph > 8.5 || distance < 30) {
    showHealthWarning = true;
    healthWarningMsg = distance < 30 
      ? "CRITICAL: Flooding detected. High risk of property damage and waterborne pathogens. Evacuate low-lying areas."
      : "WARNING: Water conditions are unsafe. High risk of chemical burns or pathogens. Avoid contact with skin.";
  }

  return (
    <div className="flex-grow flex flex-col bg-gray-50 p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 bg-white p-6 shadow-sm border border-gray-200">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <Link href="/map" className="text-gray-400 hover:text-[#E5243B] transition-colors p-2 bg-gray-100 rounded-full hover:bg-red-50">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter uppercase">{stationName}</h1>
          </div>
          <p className="text-sm text-gray-500 font-bold tracking-widest ml-14">NODE_ID: {stationId.toUpperCase()} | REGION: LAGOS LAGOON</p>
        </div>
        
        <div className={`flex items-center gap-3 py-2 px-6 border-2 ${isLive ? 'border-[#00A99D] bg-[#00A99D]/10' : 'border-[#F99D26] bg-[#F99D26]/10'}`}>
          <div className="relative flex h-3 w-3">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isLive ? 'bg-[#00A99D]' : 'bg-[#F99D26]'} opacity-75`}></span>
            <span className={`relative inline-flex rounded-full h-3 w-3 ${isLive ? 'bg-[#00A99D]' : 'bg-[#F99D26]'}`}></span>
          </div>
          <span className={`text-sm font-black uppercase tracking-wider ${isLive ? 'text-[#00A99D]' : 'text-[#F99D26]'}`}>
            {isLive ? 'SYSTEM ONLINE' : 'SIMULATED DATA'}
          </span>
        </div>
      </div>

      {/* Health Warning Banner */}
      {showHealthWarning && (
        <div className="mb-8 bg-[#E5243B] p-6 flex items-start gap-4 shadow-lg text-white">
          <div className="mt-1">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <h4 className="font-black uppercase tracking-widest text-lg mb-1">Public Health Alert</h4>
            <p className="font-medium text-red-50">{healthWarningMsg}</p>
          </div>
        </div>
      )}

      {/* Main Dashboard Grid - Resized Proportions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 h-[450px]">
          <WaterLevelIndicator distanceValue={distance} phValue={ph} />
        </div>
        <div className="lg:col-span-1 h-[450px]">
          <PhMeter phValue={ph} />
        </div>
      </div>

      {/* Bottom Charts Section */}
      <div className="h-auto">
        <HistoricalCharts data={chartData} />
      </div>
    </div>
  );
}
