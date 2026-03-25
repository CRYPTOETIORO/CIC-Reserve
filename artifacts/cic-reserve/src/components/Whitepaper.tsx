import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Globe, Lock, Leaf, ExternalLink } from "lucide-react";
import { useLang } from "@/context/LangContext";

export default function Whitepaper() {
  const { t } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const sections = [
    {
      icon: Globe,
      title: t.whitepaper.section1Title,
      desc: t.whitepaper.section1Desc,
      number: "01",
    },
    {
      icon: Lock,
      title: t.whitepaper.section2Title,
      desc: t.whitepaper.section2Desc,
      number: "02",
    },
    {
      icon: Leaf,
      title: t.whitepaper.section3Title,
      desc: t.whitepaper.section3Desc,
      number: "03",
    },
  ];

  return (
    <section id="whitepaper" ref={ref} className="py-32 bg-[#050505] relative">
      <div className="glow-line absolute top-0 left-0 right-0" />
      <div className="absolute inset-0 bg-grid opacity-30" />

      {/* Side label */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden xl:block">
        <span
          className="text-[#2A2A2A] text-xs tracking-[0.4em] uppercase font-medium"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          Whitepaper Lite
        </span>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-[#C4A77D] text-xs tracking-[0.3em] uppercase mb-4 font-medium">
            Foundation
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#F0F0F0] mb-4">
            {t.whitepaper.title}
          </h2>
          <p className="text-[#606060] max-w-xl mx-auto text-base leading-relaxed">
            {t.whitepaper.subtitle}
          </p>
        </motion.div>

        {/* Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {sections.map((sec, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.7 }}
              className="glass-card rounded-sm p-8 group transition-all duration-300 relative overflow-hidden"
            >
              {/* Large number */}
              <div className="absolute top-4 right-6 text-[80px] font-bold text-[#C4A77D]/04 leading-none select-none pointer-events-none">
                {sec.number}
              </div>

              {/* Icon */}
              <div className="w-12 h-12 border border-[#C4A77D]/20 rounded-sm flex items-center justify-center mb-6 group-hover:border-[#C4A77D]/50 transition-colors">
                <sec.icon size={20} color="#C4A77D" />
              </div>

              <h3 className="text-[#F0F0F0] font-semibold text-lg mb-4">
                {sec.title}
              </h3>
              <p className="text-[#606060] text-sm leading-relaxed">
                {sec.desc}
              </p>

              {/* Bottom accent */}
              <div className="mt-6 h-px bg-gradient-to-r from-[#C4A77D]/20 to-transparent" />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center"
        >
          <a
            href="#"
            className="group inline-flex items-center gap-3 px-8 py-3.5 border border-[#C4A77D]/30 text-[#C4A77D] font-semibold text-sm tracking-wider uppercase rounded-sm hover:border-[#C4A77D]/60 hover:bg-[#C4A77D]/5 transition-all duration-300"
          >
            {t.whitepaper.readFull}
            <ExternalLink
              size={14}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
