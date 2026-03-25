import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle2, Clock, Circle } from "lucide-react";
import { useLang } from "@/context/LangContext";

export default function Roadmap() {
  const { t } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const phases = [
    {
      title: t.roadmap.phase1Title,
      status: t.roadmap.phase1Status,
      items: t.roadmap.phase1Items,
      active: true,
      statusColor: "#C4A77D",
    },
    {
      title: t.roadmap.phase2Title,
      status: t.roadmap.phase2Status,
      items: t.roadmap.phase2Items,
      active: false,
      statusColor: "#505050",
    },
    {
      title: t.roadmap.phase3Title,
      status: t.roadmap.phase3Status,
      items: t.roadmap.phase3Items,
      active: false,
      statusColor: "#505050",
    },
  ];

  return (
    <section id="roadmap" ref={ref} className="py-32 bg-[#030303] relative">
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
            Strategic Timeline
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#F0F0F0] mb-4">
            {t.roadmap.title}
          </h2>
          <p className="text-[#606060] max-w-xl mx-auto text-base leading-relaxed">
            {t.roadmap.subtitle}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-6 left-0 right-0 h-px hidden md:block">
            <motion.div
              className="h-full bg-gradient-to-r from-[#C4A77D]/40 via-[#C4A77D]/20 to-transparent"
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.3, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "left" }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {phases.map((phase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.2, duration: 0.7 }}
                className="relative"
              >
                {/* Phase node */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-12 h-12 rounded-sm border flex items-center justify-center flex-shrink-0 z-10"
                    style={{
                      borderColor: phase.active ? "#C4A77D" : "#2A2A2A",
                      background: phase.active ? "rgba(196,167,125,0.08)" : "rgba(255,255,255,0.02)",
                    }}
                  >
                    {phase.active ? (
                      <CheckCircle2 size={20} color="#C4A77D" />
                    ) : i === 1 ? (
                      <Clock size={20} color="#505050" />
                    ) : (
                      <Circle size={20} color="#303030" />
                    )}
                  </div>
                  <div>
                    <div
                      className="text-xs font-mono tracking-wider uppercase px-2 py-0.5 rounded-full border inline-block"
                      style={{
                        color: phase.statusColor,
                        borderColor: phase.active ? "#C4A77D30" : "#2A2A2A",
                        background: phase.active ? "rgba(196,167,125,0.08)" : "transparent",
                      }}
                    >
                      {phase.status}
                    </div>
                  </div>
                </div>

                {/* Card */}
                <div
                  className="glass-card rounded-sm p-6 transition-all duration-300"
                  style={{
                    borderColor: phase.active ? "rgba(196,167,125,0.2)" : "rgba(196,167,125,0.08)",
                  }}
                >
                  <h3
                    className="font-semibold text-base mb-5"
                    style={{ color: phase.active ? "#F0F0F0" : "#606060" }}
                  >
                    {phase.title}
                  </h3>
                  <ul className="space-y-3">
                    {phase.items.map((item, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: -10 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: i * 0.2 + j * 0.07 + 0.4, duration: 0.4 }}
                        className="flex items-start gap-2.5"
                      >
                        <div
                          className="w-1 h-1 rounded-full mt-2 flex-shrink-0"
                          style={{ backgroundColor: phase.active ? "#C4A77D" : "#3A3A3A" }}
                        />
                        <span
                          className="text-sm leading-relaxed"
                          style={{ color: phase.active ? "#C0C0C0" : "#505050" }}
                        >
                          {item}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
