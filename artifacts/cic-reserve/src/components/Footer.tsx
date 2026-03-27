import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, CheckCheck, Zap } from "lucide-react";
import { useLang } from "@/context/LangContext";
import { Link } from "wouter";

const CONTRACT = "7WerPaG3zJfzHLPGJGBvCJzutb2hmirVvHeZv9ru312Y";

export default function Footer() {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);

  const copyContract = () => {
    navigator.clipboard.writeText(CONTRACT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <footer className="bg-[#020202] relative">
      <div className="glow-line absolute top-0 left-0 right-0" />

      {/* Contract address band */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="border-b border-[#111] py-5 px-4 sm:px-6"
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5">
          <span className="text-[#404040] text-[10px] tracking-[0.3em] uppercase flex-shrink-0">
            $CIC Contract
          </span>

          <div className="flex items-center gap-2 min-w-0">
            <a
              href={`https://solscan.io/token/${CONTRACT}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C4A77D]/50 hover:text-[#C4A77D] font-mono text-[9px] sm:text-[10px] tracking-wide break-all transition-colors leading-relaxed text-center sm:text-left"
            >
              {CONTRACT}
            </a>
            <button
              onClick={copyContract}
              className="flex-shrink-0 w-7 h-7 rounded-sm border border-[#C4A77D]/15 flex items-center justify-center hover:border-[#C4A77D]/40 hover:bg-[#C4A77D]/5 transition-all duration-200"
              title="Copy contract address"
              aria-label="Copy contract address"
            >
              {copied
                ? <CheckCheck size={12} className="text-green-400" />
                : <Copy size={12} className="text-[#C4A77D]/60" />}
            </button>
          </div>

          {copied && (
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-green-400 text-[10px] flex-shrink-0"
            >
              ✓ Copied
            </motion.span>
          )}
        </div>
      </motion.div>

      {/* Main footer */}
      <div className="py-10 sm:py-14 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-3"
            >
              <img
                src="https://i.imgur.com/aWWHkV1.png"
                alt="CIC Logo"
                className="w-8 h-8 object-contain rounded-sm opacity-80"
              />
              <div>
                <div className="text-[#F0F0F0] font-semibold tracking-wide text-sm">
                  Compos Index Cap
                </div>
                <div className="text-[#404040] text-xs">{t.footer.tagline}</div>
              </div>
            </motion.div>

            {/* Center nav links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.8 }}
              className="flex items-center gap-5 flex-wrap justify-center"
            >
              <a href="/#index" className="text-[#404040] text-xs tracking-widest hover:text-[#C4A77D] transition-colors uppercase">
                Index
              </a>
              <a href="/#whitepaper" className="text-[#404040] text-xs tracking-widest hover:text-[#C4A77D] transition-colors uppercase">
                Whitepaper
              </a>
              <a href="/#roadmap" className="text-[#404040] text-xs tracking-widest hover:text-[#C4A77D] transition-colors uppercase">
                Roadmap
              </a>
              <Link href="/token" className="text-[#C4A77D]/60 text-xs tracking-widest hover:text-[#C4A77D] transition-colors uppercase font-semibold">
                $CIC
              </Link>
              <Link href="/presale" className="flex items-center gap-1.5 text-amber-500/70 text-xs tracking-widest hover:text-amber-400 transition-colors uppercase font-bold">
                <Zap size={10} />
                Pre-sale
              </Link>
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
              className="text-center sm:text-right"
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
            className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-[#111]"
          >
            <p className="text-[#303030] text-[10px] sm:text-xs text-center leading-relaxed">
              {t.footer.disclaimer}
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
