import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Globe, Lock, Leaf, ExternalLink } from "lucide-react";
import { useLang } from "@/context/LangContext";

export default function Whitepaper() {
  const { t } = useLang();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const sections = [
    { icon: Globe, title: t.whitepaper.section1Title, desc: t.whitepaper.section1Desc, number: "01" },
    { icon: Lock, title: t.whitepaper.section2Title, desc: t.whitepaper.section2Desc, number: "02" },
    { icon: Leaf, title: t.whitepaper.section3Title, desc: t.whitepaper.section3Desc, number: "03" },
  ];

  return (
    <section id="whitepaper" ref={ref} className="py-20 sm:py-32 bg-[#050505] relative">
      <div className="glow-line absolute top-0 left-0 right-0" />
      <div className="absolute inset-0 bg-grid opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-20"
        >
          <p className="text-[#C4A77D] text-[10px] sm:text-xs tracking-[0.25em] uppercase mb-3 sm:mb-4 font-medium">
            Foundation
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#F0F0F0] mb-3 sm:mb-4">
            {t.whitepaper.title}
          </h2>
          <p className="text-[#606060] max-w-xl mx-auto text-sm sm:text-base leading-relaxed px-2">
            {t.whitepaper.subtitle}
          </p>
        </motion.div>

        {/* Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 mb-12 sm:mb-16">
          {sections.map((sec, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.7 }}
              className="glass-card rounded-sm p-6 sm:p-8 group transition-all duration-300 relative overflow-hidden"
            >
              <div
                className="absolute top-3 right-4 font-bold text-[#C4A77D]/[0.04] leading-none select-none pointer-events-none"
                style={{ fontSize: "clamp(50px, 10vw, 80px)" }}
              >
                {sec.number}
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 border border-[#C4A77D]/20 rounded-sm flex items-center justify-center mb-5 sm:mb-6 group-hover:border-[#C4A77D]/50 transition-colors">
                <sec.icon size={18} color="#C4A77D" />
              </div>
              <h3 className="text-[#F0F0F0] font-semibold text-base sm:text-lg mb-3 sm:mb-4">
                {sec.title}
              </h3>
              <p className="text-[#606060] text-xs sm:text-sm leading-relaxed">{sec.desc}</p>
              <div className="mt-5 sm:mt-6 h-px bg-gradient-to-r from-[#C4A77D]/20 to-transparent" />
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
            className="group inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-3.5 border border-[#C4A77D]/30 text-[#C4A77D] font-semibold text-xs sm:text-sm tracking-wider uppercase rounded-sm hover:border-[#C4A77D]/60 hover:bg-[#C4A77D]/5 transition-all duration-300"
          >
            {t.whitepaper.readFull}
            <ExternalLink size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
