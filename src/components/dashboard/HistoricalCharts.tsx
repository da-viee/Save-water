"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface ChartDataPoint {
  time: string;
  distance: number;
  ph: number;
}

interface HistoricalChartsProps {
  data: ChartDataPoint[];
}

export default function HistoricalCharts({ data }: HistoricalChartsProps) {
  const handleExportCSV = () => {
    if (!data || data.length === 0) return;
    const headers = ["Time", "Water Depth (cm)", "pH Level"];
    const csvContent = [
      headers.join(","),
      ...data.map(row => `${row.time},${row.distance.toFixed(2)},${row.ph.toFixed(2)}`)
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "water_level_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!data || data.length === 0) {
    return (
      <div className="bg-white border border-gray-200 shadow-md h-96 flex items-center justify-center">
        <p className="text-gray-500 font-bold uppercase tracking-widest">No historical data available.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 shadow-md p-4 md:p-8 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b border-gray-100 pb-4 gap-4">
        <div>
          <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter">24-Hour Trend Analysis</h3>
          <p className="text-sm text-gray-500 font-bold mt-1 tracking-widest">Live data from ThingSpeak IoT Network</p>
        </div>
        <button 
          onClick={handleExportCSV}
          className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-sm font-black text-gray-700 px-6 py-3 transition-colors uppercase tracking-widest"
        >
          Export CSV
        </button>
      </div>

      <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Distance / Water Level Chart */}
        <div className="flex flex-col bg-gray-50 p-6 border border-gray-100 min-h-[280px]">
          <h4 className="text-sm font-black text-[#00A99D] mb-6 flex items-center gap-2 uppercase tracking-widest">
            <span className="w-3 h-3 bg-[#00A99D]"></span>
            Water Depth (cm)
          </h4>
          <div className="flex-grow w-full min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorDistance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00A99D" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#00A99D" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis 
                  dataKey="time" 
                  stroke="#9ca3af" 
                  tick={{fill: '#6b7280', fontSize: 12, fontWeight: 'bold'}} 
                  tickMargin={10}
                />
                <YAxis 
                  stroke="#9ca3af" 
                  tick={{fill: '#6b7280', fontSize: 12, fontWeight: 'bold'}} 
                />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e5e7eb', color: '#111827', borderRadius: '0px', padding: '10px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  itemStyle={{ color: '#00A99D', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="distance" stroke="#00A99D" strokeWidth={3} fillOpacity={1} fill="url(#colorDistance)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* pH Level Chart */}
        <div className="flex flex-col bg-gray-50 p-6 border border-gray-100 min-h-[280px]">
          <h4 className="text-sm font-black text-[#F99D26] mb-6 flex items-center gap-2 uppercase tracking-widest">
            <span className="w-3 h-3 bg-[#F99D26]"></span>
            pH Level
          </h4>
          <div className="flex-grow w-full min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis 
                  dataKey="time" 
                  stroke="#9ca3af" 
                  tick={{fill: '#6b7280', fontSize: 12, fontWeight: 'bold'}} 
                  tickMargin={10}
                />
                <YAxis 
                  stroke="#9ca3af" 
                  tick={{fill: '#6b7280', fontSize: 12, fontWeight: 'bold'}} 
                  domain={[0, 14]}
                />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e5e7eb', color: '#111827', borderRadius: '0px', padding: '10px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  itemStyle={{ color: '#F99D26', fontWeight: 'bold' }}
                />
                <Line type="monotone" dataKey="ph" stroke="#F99D26" strokeWidth={3} dot={{ r: 4, fill: '#fff', strokeWidth: 2 }} activeDot={{ r: 7 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
