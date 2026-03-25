import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLang } from "@/context/LangContext";

export default function Navbar() {
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: t.nav.index, href: "#index" },
    { label: t.nav.scarcity, href: "#scarcity" },
    { label: t.nav.whitepaper, href: "#whitepaper" },
    { label: t.nav.roadmap, href: "#roadmap" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#050505]/90 backdrop-blur-xl border-b border-[#C4A77D]/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-8 h-8 border border-[#C4A77D] rounded-sm flex items-center justify-center">
              <span className="text-[#C4A77D] text-xs font-bold tracking-widest">CIC</span>
            </div>
            <span className="text-[#F0F0F0] font-semibold tracking-widest text-sm uppercase">
              Reserve
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[#A0A0A0] hover:text-[#F0F0F0] text-sm tracking-wider uppercase transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#C4A77D] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Language switcher */}
            <div className="flex items-center gap-1 text-xs">
              <button
                onClick={() => setLang("en")}
                className={`px-2 py-1 rounded transition-colors ${
                  lang === "en"
                    ? "text-[#C4A77D] border border-[#C4A77D]/40"
                    : "text-[#606060] hover:text-[#A0A0A0]"
                }`}
              >
                EN
              </button>
              <span className="text-[#303030]">|</span>
              <button
                onClick={() => setLang("es")}
                className={`px-2 py-1 rounded transition-colors ${
                  lang === "es"
                    ? "text-[#C4A77D] border border-[#C4A77D]/40"
                    : "text-[#606060] hover:text-[#A0A0A0]"
                }`}
              >
                ES
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-[#A0A0A0] hover:text-[#F0F0F0] transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-[#080808]/95 backdrop-blur-xl border-b border-[#C4A77D]/10 py-6"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-6 py-3 text-[#A0A0A0] hover:text-[#C4A77D] text-sm tracking-wider uppercase transition-colors"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
