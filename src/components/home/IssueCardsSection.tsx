"use client";

import { useState } from "react";

const ISSUES = [
  {
    id: "01",
    color: "#E5243B",
    icon: "💸",
    title: "Cost of Flooding in Nigeria",
    tag: "Economic Impact",
    summary: "Flooding costs Nigeria billions annually in property damage, displacement, and lost livelihoods.",
    detail:
      "Nigeria loses an estimated ₦3.5 trillion ($2.3B USD) per year to flooding — from destroyed farmland, collapsed infrastructure, and displaced communities. In Lagos alone, a single major flood event can displace over 300,000 residents. Without early-warning IoT systems, communities have no time to evacuate or protect assets. Our sensor network provides real-time alerts that can save lives and prevent billions in avoidable losses.",
  },
  {
    id: "02",
    color: "#DDA83A",
    icon: "🐟",
    title: "Endangered Aquatic Species",
    tag: "Biodiversity Crisis",
    summary: "Industrial waste is pushing critically endangered fish, turtles, and manatees to extinction.",
    detail:
      "The West African manatee, African river otter, and sawfish are all critically endangered in Lagos waters. Chemical dumping raises water acidity beyond survival thresholds for these animals. Commercial fishermen report catching 90% fewer fish than a decade ago. If pollution continues unchecked, marine ecologists estimate these species will be locally extinct by 2040. Our pH and water level data helps identify illegal discharge events in real time.",
  },
  {
    id: "03",
    color: "#4C9F38",
    icon: "🐬",
    title: "Lagos' Fleeing Marine Life",
    tag: "Ecosystem Collapse",
    summary: "Dolphins, whales, and sharks that once graced Lagos waters have completely disappeared.",
    detail:
      "Historical records from the 1970s confirm that spinner dolphins, humpback whales, and bull sharks were regular inhabitants of Lagos Lagoon and Bight of Benin. By the 1990s, they were gone. Hydroacoustic pollution from dredging, combined with raw sewage raising water temperatures and destroying oxygen levels, forced these animals to migrate permanently. Restoring water quality is the only path to bringing them back.",
  },
  {
    id: "04",
    color: "#C5192D",
    icon: "🍽️",
    title: "The Danger of Eating Endangered Fish",
    tag: "Public Health",
    summary: "Eating fish from polluted Lagos waters exposes millions to mercury, lead, and cholera.",
    detail:
      "Fish caught in contaminated Lagos waterways carry heavy metals (lead, cadmium, mercury) at levels 4–10× the WHO safe limit. Consuming these fish causes neurological damage, kidney failure, and cancer over time. The communities most affected — in Makoko, Ijora, and Ajegunle — rely on this fish as their primary protein source. Our water quality data, published openly, helps health authorities issue targeted warnings.",
  },
  {
    id: "05",
    color: "#FF3A21",
    icon: "🏚️",
    title: "Makoko: A Community Under Water",
    tag: "Displacement",
    summary: "Over 100,000 people live on stilts above rising, toxic floodwater in Makoko.",
    detail:
      "Makoko is Africa's largest floating slum, home to an estimated 100,000–300,000 residents whose homes sit directly above Lagos Lagoon. Regular flooding — worsened by climate change — now reaches chest height inside homes during peak rainy season. Children are being born into a health crisis, with cholera, typhoid, and skin infections rampant. Our IoT monitoring station at Makoko provides the hard data needed for government intervention and disaster relief allocation.",
  },
  {
    id: "06",
    color: "#26BDE2",
    icon: "🌊",
    title: "Climate Change & Rising Sea Levels",
    tag: "Climate Crisis",
    summary: "Lagos faces 1.5m of sea level rise by 2100, threatening to permanently submerge low-lying areas.",
    detail:
      "IPCC projections indicate that Lagos — a coastal city barely 2 metres above sea level in many areas — faces catastrophic inundation by 2100. Sea level rise, combined with urban heat islands and deforested mangrove buffers, means flooding events that used to happen once a decade now happen annually. Monitoring real-time water levels with our IoT network is the first step in building a city-wide early warning system.",
  },
  {
    id: "07",
    color: "#FD6925",
    icon: "🏭",
    title: "Industrial Waste & Corporate Impunity",
    tag: "Pollution",
    summary: "Factories discharge directly into Lagos waterways with little to no consequence.",
    detail:
      "LASEPA (Lagos State Environmental Protection Agency) has documented over 2,000 unlicensed industrial discharge points along Lagos waterways. Heavy fines are rarely enforced. Without evidence, polluters cannot be prosecuted. Our IoT sensors create a timestamped, tamper-proof data trail of pH spikes and abnormal water level changes — providing the kind of evidence that can hold corporations legally accountable in court.",
  },
  {
    id: "08",
    color: "#A21942",
    icon: "🧪",
    title: "Water Acidity & Ecosystem Collapse",
    tag: "Water Quality",
    summary: "Industrial runoff drops water pH below 5.5, making it literally as acidic as vinegar.",
    detail:
      "Normal healthy lagoon water sits at pH 7.0–8.5. Readings from our sensor have recorded pH values as low as 5.1 during discharge events — comparable to black coffee. At this acidity, fish cannot breathe, coral-like microorganisms die, and plankton populations collapse, destroying the entire food chain from the bottom up. Our real-time pH monitoring catches these events within minutes of occurring.",
  },
  {
    id: "09",
    color: "#19486A",
    icon: "👶",
    title: "Children Born into a Health Crisis",
    tag: "Human Cost",
    summary: "Waterborne diseases claim thousands of children's lives in Lagos annually.",
    detail:
      "Cholera, typhoid, and bilharzia are endemic in flood-prone Lagos communities. The 2022 cholera outbreak — primarily driven by floodwater contamination — killed over 2,700 people nationwide, with Lagos accounting for the highest death toll. Children under 5 are the most vulnerable. Access to real-time water quality data could enable NGOs and health agencies to pre-position medical supplies before outbreaks peak.",
  },
];

export default function IssueCardsSection() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="py-24 bg-white border-t-4 border-gray-100">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-[#E5243B] font-black tracking-widest uppercase text-sm mb-3">
              Why This Matters
            </p>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tighter leading-none">
              THE CRISIS IN<br />
              <span className="text-[#00A99D]">PLAIN NUMBERS</span>
            </h2>
          </div>
          <p className="text-gray-500 font-medium max-w-sm text-lg leading-relaxed">
            Hover any card to learn the full story. Every metric below is a reason this sensor network exists.
          </p>
        </div>
      </div>

      {/* SDG-style Hover Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-0 border-l border-t border-gray-200">
          {ISSUES.map((issue) => {
            const isHovered = hovered === issue.id;
            return (
              <div
                key={issue.id}
                onMouseEnter={() => setHovered(issue.id)}
                onMouseLeave={() => setHovered(null)}
                className="relative border-r border-b border-gray-200 overflow-hidden cursor-pointer group"
                style={{ minHeight: "380px" }}
              >
                {/* Default State */}
                <div
                  className="absolute inset-0 flex flex-col justify-end p-5 transition-all duration-500"
                  style={{
                    opacity: isHovered ? 0 : 1,
                    transform: isHovered ? "translateY(-8px)" : "translateY(0)",
                    background: `linear-gradient(160deg, white 40%, ${issue.color}18 100%)`,
                  }}
                >
                  {/* Top: number + icon */}
                  <div className="flex items-start justify-between mb-auto pt-2">
                    <span
                      className="text-5xl font-black leading-none opacity-10"
                      style={{ color: issue.color }}
                    >
                      {issue.id}
                    </span>
                    <span className="text-3xl">{issue.icon}</span>
                  </div>

                  {/* Bottom: tag + title */}
                  <div className="mt-8">
                    <span
                      className="text-[10px] font-black uppercase tracking-widest mb-2 block"
                      style={{ color: issue.color }}
                    >
                      {issue.tag}
                    </span>
                    <h3 className="text-gray-900 font-black text-sm leading-snug uppercase tracking-tight">
                      {issue.title}
                    </h3>
                    <p className="text-gray-400 text-[11px] font-medium mt-2 leading-relaxed line-clamp-2">
                      {issue.summary}
                    </p>
                  </div>

                  {/* Hover hint */}
                  <div className="mt-4 flex items-center gap-1 opacity-40">
                    <div className="w-4 h-[2px]" style={{ backgroundColor: issue.color }} />
                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">
                      Hover to learn more
                    </span>
                  </div>
                </div>

                {/* Hovered State */}
                <div
                  className="absolute inset-0 flex flex-col justify-between p-5 transition-all duration-500"
                  style={{
                    backgroundColor: issue.color,
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? "translateY(0)" : "translateY(12px)",
                  }}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-white/30 text-4xl font-black leading-none">{issue.id}</span>
                    <span className="text-2xl">{issue.icon}</span>
                  </div>

                  <div>
                    <span className="text-white/70 text-[10px] font-black uppercase tracking-widest block mb-2">
                      {issue.tag}
                    </span>
                    <h3 className="text-white font-black text-sm uppercase tracking-tight leading-snug mb-3">
                      {issue.title}
                    </h3>
                    <p className="text-white/85 text-[11px] font-medium leading-relaxed">
                      {issue.detail}
                    </p>
                  </div>

                  <div className="w-8 h-[3px] bg-white/40 mt-2" />
                </div>
              </div>
            );
          })}

          {/* CTA card */}
          <div className="relative border-r border-b border-gray-200 bg-gray-900 flex flex-col justify-between p-5" style={{ minHeight: "380px" }}>
            <span className="text-white/10 text-5xl font-black leading-none">+</span>
            <div>
              <h3 className="text-white font-black text-sm uppercase tracking-tight leading-snug mb-3">
                Be Part of the Solution
              </h3>
              <p className="text-gray-400 text-[11px] font-medium leading-relaxed mb-5">
                Our IoT network is live in Makoko. Help us expand to all 57 Lagos waterways.
              </p>
              <a
                href="/report"
                className="inline-block bg-[#E5243B] text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 hover:bg-[#C5192D] transition-colors"
              >
                Report a Violation →
              </a>
            </div>
            <div className="w-8 h-[3px] bg-white/20" />
          </div>
        </div>
      </div>

      {/* Stats row — SDG style bold numbers */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-2 md:grid-cols-4 border-l border-t border-gray-200">
          {[
            { value: "₦3.5T", label: "Lost to flooding per year", color: "#E5243B" },
            { value: "300K+", label: "Displaced per flood event", color: "#F99D26" },
            { value: "2,700", label: "Cholera deaths in 2022", color: "#00A99D" },
            { value: "90%", label: "Decline in fish catch (10yr)", color: "#26BDE2" },
          ].map((stat) => (
            <div key={stat.label} className="border-r border-b border-gray-200 p-8">
              <div className="text-4xl md:text-5xl font-black leading-none mb-2" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <p className="text-gray-500 text-sm font-bold uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
