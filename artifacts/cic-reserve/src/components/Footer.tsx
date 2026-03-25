import { motion } from "framer-motion";
import { useLang } from "@/context/LangContext";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="py-16 bg-[#020202] relative">
      <div className="glow-line absolute top-0 left-0 right-0" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3"
          >
            <div className="w-8 h-8 border border-[#C4A77D]/40 rounded-sm flex items-center justify-center">
              <span className="text-[#C4A77D] text-xs font-bold tracking-widest">CIC</span>
            </div>
            <div>
              <div className="text-[#F0F0F0] font-semibold tracking-widest text-sm uppercase">
                CIC Reserve
              </div>
              <div className="text-[#404040] text-xs">{t.footer.tagline}</div>
            </div>
          </motion.div>

          {/* Center */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-center"
          >
            <a
              href="https://cicreserve.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#404040] text-xs tracking-widest hover:text-[#C4A77D] transition-colors"
            >
              cicreserve.xyz
            </a>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-right"
          >
            <div className="text-[#303030] text-xs">
              © 2025 CIC Reserve. {t.footer.rights}
            </div>
          </motion.div>
        </div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-8 pt-8 border-t border-[#111]"
        >
          <p className="text-[#303030] text-xs text-center leading-relaxed">
            {t.footer.disclaimer}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
