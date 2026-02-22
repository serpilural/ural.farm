"use client";

import { useLanguage } from "./language-context";

const HARVEST_CONFIG = {
  year: 2026,
  harvestDate:   { tr: "26 Eylül 2026",  en: "September 26, 2026" },
  roastingDate:  { tr: "Ekim 2026",       en: "October 2026" },
  packagingDate: { tr: "Ekim 2026",       en: "October 2026" },
  deliveryDate:  { tr: "Kasım 2026",      en: "November 2026" },
  totalPackages: 1200,
};

const steps = (t: typeof HARVEST_CONFIG) => [
  { icon: "🌿", label: { tr: "Hasat",      en: "Harvest"   }, date: t.harvestDate   },
  { icon: "🔥", label: { tr: "Kavurma",    en: "Roasting"  }, date: t.roastingDate  },
  { icon: "📦", label: { tr: "Paketleme",  en: "Packaging" }, date: t.packagingDate },
  { icon: "🚪", label: { tr: "Kapınız",    en: "Your Door" }, date: t.deliveryDate  },
];

export function FreshnessTimeline() {
  const { lang } = useLanguage();
  const s = steps(HARVEST_CONFIG);

  return (
    <div className="w-full my-6">
      {/* Timeline */}
      <div className="flex items-start justify-between relative">
        {/* Connecting line */}
        <div className="absolute top-5 left-0 right-0 h-px bg-[#C2653A]/30 z-0" />
        {s.map((step, i) => (
          <div key={i} className="flex flex-col items-center z-10 flex-1">
            <div className="w-10 h-10 rounded-full bg-[#F5F0E8] border border-[#C2653A]/40 flex items-center justify-center text-lg mb-2">
              {step.icon}
            </div>
            <span className="text-[11px] font-semibold text-[#3A3F2B] uppercase tracking-wide text-center">
              {step.label[lang]}
            </span>
            <span className="text-[11px] text-[#C2653A] text-center mt-0.5">
              {step.date[lang]}
            </span>
          </div>
        ))}
      </div>
      {/* Harvest limit line */}
      <p className="text-center text-[12px] text-[#3A3F2B]/50 mt-5 tracking-wide">
        {lang === "tr"
          ? `${HARVEST_CONFIG.year} hasadı — yalnızca ${HARVEST_CONFIG.totalPackages.toLocaleString()} paket`
          : `${HARVEST_CONFIG.year} harvest — ${HARVEST_CONFIG.totalPackages.toLocaleString()} packages only`}
      </p>
    </div>
  );
}
