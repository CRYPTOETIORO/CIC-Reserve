import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Flame, Shield, Coins } from "lucide-react";
import { useLang } from "@/context/LangContext";

const INITIAL_SUPPLY = 500000;
const FINAL_SUPPLY = 250000;
const BURN_RATE = 0.5;
const SIMULATED_BURNED = 48320;

function AnimatedNumber({ value, inView }: { value: number; inView: boolean }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value]);

  return (
    <span className="counter">{current.toLocaleString()}</span>
  );
}

export default function Scarcity() {
  const { t } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const burnedPct = (SIMULATED_BURNED / INITIAL_SUPPLY) * 100;
  const remainingPct = ((INITIAL_SUPPLY - SIMULATED_BURNED) / INITIAL_SUPPLY) * 100;

  const mechanics = [
    {
      icon: Flame,
      title: t.scarcity.mechanic1Title,
      desc: t.scarcity.mechanic1Desc,
      color: "#C4A77D",
    },
    {
      icon: Shield,
      title: t.scarcity.mechanic2Title,
      desc: t.scarcity.mechanic2Desc,
      color: "#C4A77D",
    },
    {
      icon: Coins,
      title: t.scarcity.mechanic3Title,
      desc: t.scarcity.mechanic3Desc,
      color: "#C4A77D",
    },
  ];

  return (
    <section id="scarcity" ref={ref} className="py-32 bg-[#030303] relative">
      <div className="glow-line absolute top-0 left-0 right-0" />
      <div className="absolute inset-0 bg-grid opacity-30" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-[#C4A77D] text-xs tracking-[0.3em] uppercase mb-4 font-medium">
            Deflationary Model
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#F0F0F0] mb-4">
            {t.scarcity.title}
          </h2>
          <p className="text-[#606060] max-w-xl mx-auto text-base leading-relaxed">
            {t.scarcity.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left: Supply stats */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="space-y-6"
          >
            {/* Supply stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: t.scarcity.initialSupply, value: INITIAL_SUPPLY, suffix: "CIC" },
                { label: t.scarcity.burnRate, value: BURN_RATE, suffix: "%" },
                { label: t.scarcity.finalSupply, value: FINAL_SUPPLY, suffix: "CIC" },
                { label: t.scarcity.burnedSoFar, value: SIMULATED_BURNED, suffix: "CIC" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="glass-card rounded-sm p-5 transition-all duration-300"
                >
                  <div className="text-[#C4A77D] text-xl md:text-2xl font-bold counter mb-1">
                    {inView ? (
                      stat.value < 10 ? (
                        <>{stat.value}{stat.suffix}</>
                      ) : (
                        <><AnimatedNumber value={stat.value} inView={inView} /> <span className="text-sm">{stat.suffix}</span></>
                      )
                    ) : (
                      <span>—</span>
                    )}
                  </div>
                  <div className="text-[#505050] text-xs tracking-wider uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Supply bar visual */}
            <div className="glass-card rounded-sm p-6">
              <div className="flex justify-between text-xs text-[#606060] mb-3 uppercase tracking-wider">
                <span>{t.scarcity.burnedSoFar}</span>
                <span>{t.scarcity.remaining}</span>
              </div>
              <div className="h-3 bg-[#111] rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #C4A77D, #8B6914)",
                  }}
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${burnedPct}%` } : { width: 0 }}
                  transition={{ delay: 0.5, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <div className="flex justify-between text-xs mt-2">
                <span className="text-[#C4A77D] font-medium">
                  {burnedPct.toFixed(1)}% burned
                </span>
                <span className="text-[#606060]">
                  {remainingPct.toFixed(1)}% remaining
                </span>
              </div>
            </div>

            {/* Journey line */}
            <div className="relative pl-6">
              <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-[#C4A77D] via-[#C4A77D]/30 to-transparent" />
              {[
                { label: `500,000 CIC`, sublabel: "Genesis Supply", top: true },
                { label: "↓ Auto-burn 0.5% per tx", sublabel: "Deflationary pressure", top: false },
                { label: `250,000 CIC`, sublabel: "Final Floor — burn halts", top: false },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.15, duration: 0.5 }}
                  className="mb-4 last:mb-0"
                >
                  <div className="absolute left-0 top-1 -translate-x-1.5 w-3 h-3 rounded-full border border-[#C4A77D]/60 bg-[#050505]" style={{ top: `${i * 40 + 8}px` }} />
                  <div className="text-[#E0E0E0] text-sm font-medium">{item.label}</div>
                  <div className="text-[#505050] text-xs">{item.sublabel}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Mechanics */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="space-y-5"
          >
            {mechanics.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.15, duration: 0.6 }}
                className="glass-card rounded-sm p-6 group transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-sm border border-[#C4A77D]/20 flex items-center justify-center flex-shrink-0 group-hover:border-[#C4A77D]/50 transition-colors">
                    <m.icon size={18} color="#C4A77D" />
                  </div>
                  <div>
                    <h3 className="text-[#E0E0E0] font-semibold text-sm mb-2">
                      {m.title}
                    </h3>
                    <p className="text-[#606060] text-sm leading-relaxed">
                      {m.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
