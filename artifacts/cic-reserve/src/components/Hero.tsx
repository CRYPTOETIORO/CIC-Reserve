import { motion } from "framer-motion";
import { ArrowDown, Shield, Zap } from "lucide-react";
import { useLang } from "@/context/LangContext";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] as any },
  }),
};

export default function Hero() {
  const { t } = useLang();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#050505] pt-16">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid opacity-100" />
      <div className="absolute inset-0 radial-glow" />

      {/* Animated orb */}
      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] md:w-[600px] h-[300px] sm:h-[500px] md:h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(196,167,125,0.05) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Corner accents — hidden on small screens */}
      <div className="absolute top-24 left-4 sm:left-8 w-8 sm:w-12 h-8 sm:h-12 border-l border-t border-[#C4A77D]/20" />
      <div className="absolute top-24 right-4 sm:right-8 w-8 sm:w-12 h-8 sm:h-12 border-r border-t border-[#C4A77D]/20" />
      <div className="absolute bottom-16 left-4 sm:left-8 w-8 sm:w-12 h-8 sm:h-12 border-l border-b border-[#C4A77D]/20 hidden sm:block" />
      <div className="absolute bottom-16 right-4 sm:right-8 w-8 sm:w-12 h-8 sm:h-12 border-r border-b border-[#C4A77D]/20 hidden sm:block" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center w-full">
        {/* Badge */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-2 mb-6 sm:mb-8"
        >
          <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 border border-[#C4A77D]/25 rounded-full bg-[#C4A77D]/5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C4A77D] pulse-gold flex-shrink-0" />
            <span className="text-[#C4A77D] text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase font-medium">
              {t.hero.badge}
            </span>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] mb-4 sm:mb-6"
        >
          <span className="text-[#F0F0F0]">{t.hero.title}</span>
          <br />
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage: "linear-gradient(135deg, #C4A77D 0%, #E8D5B0 50%, #C4A77D 100%)",
            }}
          >
            {t.hero.titleAccent}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-[#808080] text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed px-2"
        >
          {t.hero.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col xs:flex-row sm:flex-row gap-3 sm:gap-4 justify-center mb-12 sm:mb-20"
        >
          <a
            href="#index"
            className="group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-[#C4A77D] text-[#050505] font-semibold text-xs sm:text-sm tracking-wider uppercase rounded-sm hover:bg-[#D4B78D] transition-colors duration-300"
          >
            {t.hero.cta}
            <ArrowDown size={13} className="group-hover:translate-y-0.5 transition-transform" />
          </a>
          <a
            href="#whitepaper"
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 border border-[#C4A77D]/30 text-[#C4A77D] font-semibold text-xs sm:text-sm tracking-wider uppercase rounded-sm hover:border-[#C4A77D]/60 hover:bg-[#C4A77D]/5 transition-all duration-300"
          >
            {t.hero.ctaSecondary}
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-3 gap-px max-w-lg sm:max-w-2xl mx-auto"
        >
          {[
            { label: t.hero.stat1Label, value: t.hero.stat1Value, icon: Shield },
            { label: t.hero.stat2Label, value: t.hero.stat2Value, icon: Zap },
            { label: t.hero.stat3Label, value: t.hero.stat3Value, icon: Zap },
          ].map((stat, i) => (
            <div
              key={i}
              className="flex flex-col items-center py-4 sm:py-6 px-2 sm:px-4 border border-[#C4A77D]/10"
              style={{ background: "rgba(196,167,125,0.02)" }}
            >
              <span
                className="text-xl sm:text-2xl md:text-3xl font-bold counter mb-1"
                style={{ color: "#C4A77D" }}
              >
                {stat.value}
              </span>
              <span className="text-[#606060] text-[9px] sm:text-xs tracking-wide uppercase text-center leading-tight">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-px h-8 sm:h-12 bg-gradient-to-b from-transparent to-[#C4A77D]/40" />
        <ArrowDown size={11} className="text-[#C4A77D]/40" />
      </motion.div>
    </section>
  );
}
