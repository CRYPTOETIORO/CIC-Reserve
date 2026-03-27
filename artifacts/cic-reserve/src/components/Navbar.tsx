import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";
import { useLocation, Link } from "wouter";
import { useLang } from "@/context/LangContext";

export default function Navbar() {
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  const isHome = location === "/";
  const isToken = location === "/token";
  const isPresale = location === "/presale";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const homeLinks = [
    { label: t.nav.index, href: "#index" },
    { label: t.nav.scarcity, href: "#scarcity" },
    { label: t.nav.whitepaper, href: "#whitepaper" },
    { label: t.nav.roadmap, href: "#roadmap" },
  ];

  const navLinkClass = (active: boolean) =>
    `text-xs tracking-wider uppercase transition-colors duration-300 relative group whitespace-nowrap ${
      active ? "text-[#C4A77D] font-semibold" : "text-[#A0A0A0] hover:text-[#F0F0F0] font-normal"
    }`;

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#050505]/92 backdrop-blur-xl border-b border-[#C4A77D]/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo + Brand */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <img
              src="https://i.imgur.com/aWWHkV1.png"
              alt="CIC Logo"
              className="w-8 h-8 object-contain rounded-sm"
            />
            <div className="flex flex-col leading-none">
              <span className="text-[#F0F0F0] font-bold text-sm tracking-wide leading-tight">
                Compos Index Cap
              </span>
              <span className="text-[#C4A77D] text-[10px] tracking-[0.18em] uppercase font-medium leading-tight">
                CIC Reserve
              </span>
            </div>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-5 lg:gap-7">
            {/* Anchor links — home page only */}
            {isHome && homeLinks.map((link) => (
              <a key={link.href} href={link.href}
                className="text-[#A0A0A0] hover:text-[#F0F0F0] text-xs tracking-wider uppercase transition-colors duration-300 relative group whitespace-nowrap">
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#C4A77D] group-hover:w-full transition-all duration-300" />
              </a>
            ))}

            {/* Home link — shown when not on home */}
            {!isHome && (
              <Link href="/" className={navLinkClass(false)}>
                Home
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#C4A77D] group-hover:w-full transition-all duration-300" />
              </Link>
            )}

            {/* $CIC */}
            <Link href="/token" className={navLinkClass(isToken)}>
              $CIC
              <span className={`absolute -bottom-0.5 left-0 h-px bg-[#C4A77D] transition-all duration-300 ${isToken ? "w-full" : "w-0 group-hover:w-full"}`} />
            </Link>

            {/* Pre-sale — highlighted with live indicator */}
            <Link href="/presale"
              className={`flex items-center gap-1.5 text-xs tracking-wider uppercase transition-all duration-300 relative group whitespace-nowrap font-semibold ${
                isPresale ? "text-amber-400" : "text-amber-500/80 hover:text-amber-400"
              }`}>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 pulse-gold flex-shrink-0" />
              Pre-sale
              <span className={`absolute -bottom-0.5 left-0 h-px bg-amber-400 transition-all duration-300 ${isPresale ? "w-full" : "w-0 group-hover:w-full"}`} />
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Language switcher */}
            <div className="hidden sm:flex items-center gap-1 text-xs">
              <button onClick={() => setLang("en")}
                className={`px-2 py-1 rounded transition-colors ${
                  lang === "en"
                    ? "text-[#C4A77D] border border-[#C4A77D]/40"
                    : "text-[#606060] hover:text-[#A0A0A0]"
                }`}>EN</button>
              <span className="text-[#303030]">|</span>
              <button onClick={() => setLang("es")}
                className={`px-2 py-1 rounded transition-colors ${
                  lang === "es"
                    ? "text-[#C4A77D] border border-[#C4A77D]/40"
                    : "text-[#606060] hover:text-[#A0A0A0]"
                }`}>ES</button>
            </div>

            {/* Presale CTA pill — desktop only, not on presale page */}
            {!isPresale && (
              <Link href="/presale"
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/6 text-amber-400 text-[10px] font-bold tracking-widest uppercase hover:border-amber-400/50 hover:bg-amber-500/10 transition-all duration-200">
                <Zap size={10} />
                Buy $CIC
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden text-[#A0A0A0] hover:text-[#F0F0F0] transition-colors p-1"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
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
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-[#080808]/97 backdrop-blur-xl border-b border-[#C4A77D]/10 pb-4"
          >
            {isHome && homeLinks.map((link) => (
              <a key={link.href} href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-6 py-3.5 text-[#A0A0A0] hover:text-[#C4A77D] text-sm tracking-wider uppercase transition-colors border-b border-[#111]">
                {link.label}
              </a>
            ))}

            {!isHome && (
              <Link href="/" onClick={() => setMobileOpen(false)}
                className="block px-6 py-3.5 text-[#A0A0A0] hover:text-[#C4A77D] text-sm tracking-wider uppercase transition-colors border-b border-[#111]">
                Home
              </Link>
            )}

            <Link href="/token" onClick={() => setMobileOpen(false)}
              className={`block px-6 py-3.5 text-sm tracking-wider uppercase transition-colors font-semibold border-b border-[#111] ${
                isToken ? "text-[#C4A77D]" : "text-[#A0A0A0] hover:text-[#C4A77D]"
              }`}>
              $CIC Token
            </Link>

            <Link href="/presale" onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-2 px-6 py-3.5 text-sm tracking-wider uppercase transition-colors font-bold ${
                isPresale ? "text-amber-400" : "text-amber-500/80 hover:text-amber-400"
              }`}>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 pulse-gold" />
              Pre-sale · Buy $CIC
            </Link>

            {/* Mobile lang switcher */}
            <div className="flex items-center gap-3 px-6 pt-3">
              <button onClick={() => setLang("en")}
                className={`text-xs px-2 py-1 rounded transition-colors ${lang === "en" ? "text-[#C4A77D] border border-[#C4A77D]/40" : "text-[#606060]"}`}>EN</button>
              <span className="text-[#303030] text-xs">|</span>
              <button onClick={() => setLang("es")}
                className={`text-xs px-2 py-1 rounded transition-colors ${lang === "es" ? "text-[#C4A77D] border border-[#C4A77D]/40" : "text-[#606060]"}`}>ES</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
