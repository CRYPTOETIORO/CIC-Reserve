import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLang } from "@/context/LangContext";

const assets = [
  { key: "btc", symbol: "BTC", pct: 20, color: "#F7931A" },
  { key: "eth", symbol: "ETH", pct: 15, color: "#627EEA" },
  { key: "bch", symbol: "BCH", pct: 15, color: "#8DC351" },
  { key: "sol", symbol: "SOL", pct: 10, color: "#9945FF" },
  { key: "trx", symbol: "TRX", pct: 10, color: "#EF0027" },
  { key: "xrp", symbol: "XRP", pct: 10, color: "#346AA9" },
  { key: "bnb", symbol: "BNB", pct: 10, color: "#F3BA2F" },
  { key: "doge", symbol: "DOGE", pct: 5, color: "#C2A633" },
  { key: "stable", symbol: "STABLE", pct: 5, color: "#26A17B" },
] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function IndexDashboard() {
  const { t } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="index" ref={ref} className="py-20 sm:py-32 bg-[#050505] relative">
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="glow-line absolute top-0 left-0 right-0" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-20"
        >
          <p className="text-[#C4A77D] text-[10px] sm:text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-4 font-medium">
            Portfolio Composition
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#F0F0F0] mb-3 sm:mb-4">
            {t.index.title}
          </h2>
          <p className="text-[#606060] max-w-xl mx-auto text-sm sm:text-base leading-relaxed px-2">
            {t.index.subtitle}
          </p>
        </motion.div>

        {/* Main grid — stacked on mobile, side-by-side on lg */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Asset list */}
          <div className="space-y-2 sm:space-y-3">
            {assets.map((asset, i) => {
              const assetInfo = t.index.assets[asset.key];
              return (
                <motion.div
                  key={asset.key}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  className="glass-card rounded-sm p-3 sm:p-4 group cursor-default transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: asset.color }}
                    />
                    <span
                      className="text-[10px] sm:text-xs font-mono font-bold tracking-widest w-12 sm:w-16 flex-shrink-0"
                      style={{ color: asset.color }}
                    >
                      {asset.symbol}
                    </span>
                    <div className="flex-1 min-w-0">
                      <span className="text-[#E0E0E0] text-xs sm:text-sm font-medium">
                        {assetInfo.name}
                      </span>
                      <span className="text-[#505050] text-[10px] sm:text-xs ml-1 sm:ml-2 hidden sm:inline">
                        {assetInfo.desc}
                      </span>
                    </div>
                    <span className="text-[#C4A77D] font-bold text-base sm:text-lg counter flex-shrink-0">
                      {asset.pct}%
                    </span>
                  </div>
                  {/* Progress bar */}
                  <div className="mt-2 sm:mt-3 h-px bg-[#1A1A1A] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: asset.color, opacity: 0.6 }}
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${asset.pct * 5}%` } : { width: 0 }}
                      transition={{
                        delay: i * 0.07 + 0.3,
                        duration: 0.8,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Donut chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center justify-center mt-4 lg:mt-0"
          >
            <div className="relative w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 float">
              <DonutChart assets={assets} inView={inView} />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <img
                  src="https://i.imgur.com/aWWHkV1.png"
                  alt="CIC Logo"
                  className="w-10 h-10 sm:w-12 sm:h-12 object-contain mb-1"
                />
                <span className="text-[#505050] text-[9px] sm:text-xs tracking-widest uppercase">
                  Index
                </span>
              </div>
            </div>

            {/* Legend */}
            <div className="mt-6 sm:mt-8 grid grid-cols-3 gap-x-4 gap-y-2 w-full max-w-xs">
              {assets.map((a) => (
                <div key={a.key} className="flex items-center gap-1.5">
                  <div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: a.color }}
                  />
                  <span className="text-[#606060] text-[10px] sm:text-xs">{a.symbol}</span>
                  <span className="text-[#C4A77D] text-[10px] sm:text-xs font-bold ml-auto">{a.pct}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function DonutChart({ assets, inView }: { assets: typeof assets; inView: boolean }) {
  const size = 288;
  const cx = size / 2;
  const cy = size / 2;
  const radius = 110;
  const innerRadius = 72;
  const gap = 2;

  let cumulativeAngle = -90;
  const total = assets.reduce((s, a) => s + a.pct, 0);

  const paths = assets.map((asset) => {
    const angle = (asset.pct / total) * 360;
    const startAngle = cumulativeAngle;
    const endAngle = cumulativeAngle + angle - gap;
    cumulativeAngle += angle;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = cx + radius * Math.cos(startRad);
    const y1 = cy + radius * Math.sin(startRad);
    const x2 = cx + radius * Math.cos(endRad);
    const y2 = cy + radius * Math.sin(endRad);

    const ix1 = cx + innerRadius * Math.cos(startRad);
    const iy1 = cy + innerRadius * Math.sin(startRad);
    const ix2 = cx + innerRadius * Math.cos(endRad);
    const iy2 = cy + innerRadius * Math.sin(endRad);

    const largeArc = angle > 180 ? 1 : 0;
    const d = [
      `M ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
      `L ${ix2} ${iy2}`,
      `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${ix1} ${iy1}`,
      "Z",
    ].join(" ");

    return { d, color: asset.color, key: asset.key };
  });

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`} className="drop-shadow-2xl">
      <circle cx={cx} cy={cy} r={radius + 8} fill="none" stroke="rgba(196,167,125,0.08)" strokeWidth="16" />
      <circle cx={cx} cy={cy} r={innerRadius - 4} fill="#080808" />
      {paths.map((p, i) => (
        <motion.path
          key={p.key}
          d={p.d}
          fill={p.color}
          opacity={0.75}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 0.75, scale: 1 } : {}}
          transition={{ delay: i * 0.06 + 0.3, duration: 0.5 }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
          className="hover:opacity-100 transition-opacity"
        />
      ))}
    </svg>
  );
}
