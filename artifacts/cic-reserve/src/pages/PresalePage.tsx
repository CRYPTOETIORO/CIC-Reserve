import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Copy, CheckCheck, Shield, Snowflake, Wallet,
  AlertTriangle, ArrowRight, X, ChevronRight,
  TrendingUp, Users, Lock, ExternalLink
} from "lucide-react";

const CONTRACT = "7WerPaG3zJfzHLPGJGBvCJzutb2hmirVvHeZv9ru312Y";
const SOL_RATE = 10000; // 1 SOL = 10,000 $CIC
const PRESALE_SUPPLY = 200000;
const PRESALE_PROGRESS = 15; // %
const PRESALE_SOLD = Math.round(PRESALE_SUPPLY * PRESALE_PROGRESS / 100);
const PRESALE_REMAINING = PRESALE_SUPPLY - PRESALE_SOLD;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.09, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ─── Wallet Modal ─── */
const WALLETS = [
  { name: "Phantom", color: "#AB9FF2", icon: "👻" },
  { name: "Solflare", color: "#FC8C01", icon: "☀️" },
  { name: "Backpack", color: "#E33E3F", icon: "🎒" },
];

function WalletModal({ onClose, onConnect }: { onClose: () => void; onConnect: (name: string) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-sm bg-[#0A0A0A] border border-[#C4A77D]/20 rounded-sm p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-[#F0F0F0] font-bold text-base">Connect Wallet</h3>
            <p className="text-[#505050] text-xs mt-0.5">Select your Solana wallet</p>
          </div>
          <button onClick={onClose}
            className="w-7 h-7 rounded-sm border border-[#222] flex items-center justify-center hover:border-[#C4A77D]/30 transition-colors">
            <X size={14} className="text-[#606060]" />
          </button>
        </div>

        {/* Wallets */}
        <div className="space-y-2.5">
          {WALLETS.map((w) => (
            <button key={w.name} onClick={() => onConnect(w.name)}
              className="w-full flex items-center gap-3 px-4 py-3.5 rounded-sm border border-[#1A1A1A] hover:border-[#C4A77D]/25 hover:bg-[#C4A77D]/4 transition-all duration-200 group">
              <span className="text-xl">{w.icon}</span>
              <span className="text-[#E0E0E0] font-medium text-sm group-hover:text-[#F0F0F0] transition-colors">
                {w.name}
              </span>
              <ChevronRight size={14} className="ml-auto text-[#404040] group-hover:text-[#C4A77D] transition-colors" />
            </button>
          ))}
        </div>

        <p className="text-[#303030] text-[10px] text-center mt-5 leading-relaxed">
          By connecting, you agree to the terms of the $CIC Genesis Pre-sale.
        </p>
      </motion.div>
    </motion.div>
  );
}

/* ─── Scarcity Banner ─── */
function ScarcityBanner() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="relative z-40 bg-gradient-to-r from-amber-950/90 via-[#1A1200] to-amber-950/90 border-b border-amber-600/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <AlertTriangle size={14} className="text-amber-400 flex-shrink-0" />
          <p className="text-amber-200 text-[10px] sm:text-xs font-semibold tracking-wide leading-tight">
            <span className="text-amber-400 font-bold">⚠️ LIMITED SUPPLY:</span>
            {" "}Only{" "}
            <span className="text-amber-300 font-bold">40% of total supply</span>
            {" "}(200,000 $CIC) available for pre-sale.{" "}
            <span className="text-amber-400 font-bold">{PRESALE_REMAINING.toLocaleString()} $CIC remaining.</span>
          </p>
        </div>
        <button onClick={() => setDismissed(true)}
          className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-amber-600 hover:text-amber-400 transition-colors">
          <X size={12} />
        </button>
      </div>
    </motion.div>
  );
}

/* ─── Hero ─── */
function PresaleHero({ walletName, onOpenWallet }: { walletName: string | null; onOpenWallet: () => void }) {
  return (
    <section className="relative min-h-[70vh] sm:min-h-[75vh] flex flex-col items-center justify-center overflow-hidden bg-[#050505] pt-16 pb-8">
      <div className="absolute inset-0 bg-grid opacity-80" />
      <div className="absolute inset-0 radial-glow" />

      {/* Corner accents */}
      <div className="absolute top-24 left-4 w-10 h-10 border-l-2 border-t-2 border-[#C4A77D]/15" />
      <div className="absolute top-24 right-4 w-10 h-10 border-r-2 border-t-2 border-[#C4A77D]/15" />

      {/* Animated pulse orb */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(196,167,125,0.04) 0%, transparent 65%)" }}
        animate={{ scale: [1, 1.07, 1], opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center w-full">
        {/* Event badge */}
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible"
          className="inline-flex mb-6">
          <div className="flex items-center gap-2 px-4 py-1.5 border border-[#C4A77D]/25 rounded-full bg-[#C4A77D]/5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C4A77D] pulse-gold" />
            <span className="text-[#C4A77D] text-[10px] sm:text-xs tracking-[0.22em] uppercase font-semibold">
              Genesis Pre-sale · Now Live
            </span>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible"
          className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.08] mb-4">
          <span className="text-[#F0F0F0]">Genesis Pre-sale:</span>
          <br />
          <span className="text-transparent bg-clip-text"
            style={{ backgroundImage: "linear-gradient(135deg, #C4A77D 0%, #E8D5B0 50%, #C4A77D 100%)" }}>
            $CIC Index Reserve
          </span>
        </motion.h1>

        <motion.p custom={2} variants={fadeUp} initial="hidden" animate="visible"
          className="text-[#707070] text-sm sm:text-base mb-8 leading-relaxed max-w-xl mx-auto">
          Secure your position in the next generation of Solana assets.
          <br className="hidden sm:block" />
          The world's first crypto index token — 500,000 $CIC, forever.
        </motion.p>

        {/* Wallet connect CTA */}
        <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible">
          {walletName ? (
            <div className="inline-flex items-center gap-2 px-5 py-2.5 border border-green-500/30 rounded-sm bg-green-500/5">
              <span className="w-2 h-2 rounded-full bg-green-400 pulse-gold" />
              <span className="text-green-400 text-xs font-semibold tracking-wide">
                {walletName} Connected
              </span>
            </div>
          ) : (
            <button onClick={onOpenWallet}
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#C4A77D] text-[#050505] font-bold text-xs tracking-widest uppercase rounded-sm hover:bg-[#D4B78D] active:scale-[0.98] transition-all duration-200">
              <Wallet size={15} />
              Connect Wallet to Participate
              <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          )}
        </motion.div>

        {/* Key stats row */}
        <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible"
          className="flex flex-wrap items-center justify-center gap-5 sm:gap-8 mt-10 pt-8 border-t border-[#111]">
          {[
            { label: "Pre-sale Price", value: "1 SOL", sub: "= 10,000 $CIC" },
            { label: "Total Available", value: "200,000", sub: "$CIC" },
            { label: "Progress", value: `${PRESALE_PROGRESS}%`, sub: "Sold" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-[#C4A77D] font-bold text-lg sm:text-xl leading-tight">
                {s.value} <span className="text-[#505050] text-sm font-normal">{s.sub}</span>
              </div>
              <div className="text-[#404040] text-[10px] tracking-widest uppercase mt-0.5">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Purchase Dashboard ─── */
function PurchaseDashboard({ walletName, onOpenWallet }: { walletName: string | null; onOpenWallet: () => void }) {
  const [solAmount, setSolAmount] = useState("");
  const [buyClicked, setBuyClicked] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const cicAmount = solAmount ? (parseFloat(solAmount) * SOL_RATE).toLocaleString() : "";
  const isConnected = !!walletName;

  const handleBuy = () => {
    if (!isConnected || !solAmount) return;
    setBuyClicked(true);
    setTimeout(() => setBuyClicked(false), 2500);
  };

  return (
    <section className="py-16 sm:py-24 bg-[#030303] relative">
      <div className="glow-line absolute top-0 left-0 right-0" />
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div ref={ref} custom={0} variants={fadeUp} initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-10 sm:mb-14">
          <p className="text-[#C4A77D] text-[10px] sm:text-xs tracking-[0.3em] uppercase mb-3 font-medium">
            Purchase Portal
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#F0F0F0] mb-2">
            Buy $CIC
          </h2>
          <p className="text-[#505050] text-sm">
            Presale rate: <span className="text-[#C4A77D] font-semibold">1 SOL = {SOL_RATE.toLocaleString()} $CIC</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Main purchase card */}
          <motion.div custom={1} variants={fadeUp} initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="lg:col-span-3 glass-card rounded-sm p-6 sm:p-8">

            {/* Wallet status */}
            <div className="flex items-center justify-between mb-6 pb-5 border-b border-[#111]">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-400 pulse-gold" : "bg-[#404040]"}`} />
                <span className={`text-xs font-semibold tracking-wide ${isConnected ? "text-green-400" : "text-[#505050]"}`}>
                  {isConnected ? `${walletName} · Connected` : "Wallet Not Connected"}
                </span>
              </div>
              {!isConnected && (
                <button onClick={onOpenWallet}
                  className="flex items-center gap-1.5 px-3 py-1.5 border border-[#C4A77D]/25 rounded-sm text-[#C4A77D] text-[10px] font-semibold tracking-wider uppercase hover:border-[#C4A77D]/50 hover:bg-[#C4A77D]/5 transition-all">
                  <Wallet size={11} />
                  Connect
                </button>
              )}
            </div>

            {/* SOL input */}
            <div className="mb-4">
              <label className="block text-[#505050] text-[10px] tracking-[0.25em] uppercase mb-2 font-medium">
                You Pay
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={solAmount}
                  onChange={(e) => setSolAmount(e.target.value)}
                  placeholder="0.00"
                  disabled={!isConnected}
                  className={`w-full bg-[#080808] border rounded-sm px-4 py-3.5 text-[#F0F0F0] font-mono text-base placeholder-[#303030] focus:outline-none transition-all duration-200 pr-16 ${
                    isConnected
                      ? "border-[#2A2A2A] focus:border-[#C4A77D]/40"
                      : "border-[#151515] opacity-50 cursor-not-allowed"
                  }`}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                  <span className="text-sm">◎</span>
                  <span className="text-[#C4A77D] font-bold text-sm">SOL</span>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center my-3">
              <div className="w-8 h-8 rounded-full border border-[#1A1A1A] flex items-center justify-center bg-[#080808]">
                <ArrowRight size={14} className="text-[#C4A77D] rotate-90" />
              </div>
            </div>

            {/* CIC output */}
            <div className="mb-6">
              <label className="block text-[#505050] text-[10px] tracking-[0.25em] uppercase mb-2 font-medium">
                You Receive
              </label>
              <div className="relative">
                <input
                  type="text"
                  readOnly
                  value={cicAmount}
                  placeholder="0"
                  className="w-full bg-[#060606] border border-[#1A1A1A] rounded-sm px-4 py-3.5 text-[#C4A77D] font-mono text-base placeholder-[#252525] focus:outline-none cursor-default pr-20"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <img src="https://i.imgur.com/aWWHkV1.png" alt="" className="w-4 h-4 object-contain inline mr-1.5 opacity-70" />
                  <span className="text-[#C4A77D] font-bold text-sm">$CIC</span>
                </div>
              </div>
            </div>

            {/* Rate info */}
            <div className="flex items-center justify-between px-3 py-2 bg-[#0A0A0A] rounded-sm border border-[#111] mb-6 text-xs">
              <span className="text-[#404040]">Rate</span>
              <span className="text-[#C4A77D] font-mono font-semibold">1 SOL = {SOL_RATE.toLocaleString()} $CIC</span>
            </div>

            {/* Buy button */}
            <AnimatePresence mode="wait">
              {buyClicked ? (
                <motion.div key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full py-3.5 rounded-sm bg-green-500/10 border border-green-500/30 flex items-center justify-center gap-2">
                  <span className="text-green-400 text-sm font-semibold">✓ Transaction Submitted</span>
                </motion.div>
              ) : (
                <motion.button key="buy"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={handleBuy}
                  disabled={!isConnected || !solAmount}
                  className={`w-full py-3.5 rounded-sm font-bold text-sm tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
                    isConnected && solAmount
                      ? "bg-[#C4A77D] text-[#050505] hover:bg-[#D4B78D] active:scale-[0.99] shadow-lg shadow-[#C4A77D]/10"
                      : "bg-[#111] text-[#404040] cursor-not-allowed border border-[#1A1A1A]"
                  }`}>
                  {!isConnected ? (
                    <><Wallet size={14} /> Connect Wallet First</>
                  ) : !solAmount ? (
                    "Enter SOL Amount"
                  ) : (
                    <>Buy {cicAmount} $CIC <ArrowRight size={13} /></>
                  )}
                </motion.button>
              )}
            </AnimatePresence>

            {isConnected && (
              <p className="text-[#303030] text-[10px] text-center mt-3 leading-relaxed">
                By purchasing, you confirm you understand the risks. Not financial advice.
              </p>
            )}
          </motion.div>

          {/* Right info cards */}
          <div className="lg:col-span-2 space-y-4">
            {/* Progress card */}
            <motion.div custom={2} variants={fadeUp} initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="glass-card rounded-sm p-5 sm:p-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[#C4A77D] text-[10px] tracking-[0.3em] uppercase font-medium">Pre-sale Progress</p>
                <span className="text-[#C4A77D] font-bold text-sm">{PRESALE_PROGRESS}%</span>
              </div>

              {/* Progress bar */}
              <div className="h-2 bg-[#111] rounded-full overflow-hidden mb-3 relative">
                <motion.div
                  className="h-full rounded-full relative overflow-hidden"
                  style={{ background: "linear-gradient(90deg, #C4A77D, #E8D5B0, #C4A77D)" }}
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${PRESALE_PROGRESS}%` } : { width: 0 }}
                  transition={{ delay: 0.6, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 1.8 }}
                  />
                </motion.div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <div className="text-[#C4A77D] font-bold">{PRESALE_SOLD.toLocaleString()}</div>
                  <div className="text-[#404040] text-[10px]">$CIC sold</div>
                </div>
                <div className="text-right">
                  <div className="text-[#E0E0E0] font-bold">{PRESALE_REMAINING.toLocaleString()}</div>
                  <div className="text-[#404040] text-[10px]">remaining</div>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-[#111]">
                <div className="flex items-center gap-1.5">
                  <Users size={11} className="text-[#C4A77D]" />
                  <span className="text-[#505050] text-[10px]">15% of Pre-sale Goal reached</span>
                </div>
              </div>
            </motion.div>

            {/* Quick stats */}
            <motion.div custom={3} variants={fadeUp} initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="glass-card rounded-sm p-5 sm:p-6 space-y-3">
              <p className="text-[#505050] text-[10px] tracking-[0.3em] uppercase font-medium mb-4">Pre-sale Details</p>
              {[
                { icon: TrendingUp, label: "Rate", value: "1 SOL = 10,000 $CIC" },
                { icon: Lock, label: "Total Supply", value: "500,000 $CIC" },
                { icon: Users, label: "Presale Allocation", value: "200,000 $CIC (40%)" },
                { icon: Shield, label: "Network", value: "Solana · Token-2022" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div className="w-6 h-6 border border-[#C4A77D]/15 rounded-sm flex items-center justify-center flex-shrink-0">
                    <item.icon size={11} className="text-[#C4A77D]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[#404040] text-[10px]">{item.label}</div>
                    <div className="text-[#C0C0C0] text-xs font-semibold truncate">{item.value}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Security Badges ─── */
function SecuritySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const badges = [
    {
      emoji: "🛡️",
      icon: Shield,
      title: "Mint Authority",
      highlight: "REVOKED",
      statusColor: "green",
      desc: "No new tokens can ever be created. The 500,000 $CIC supply is permanently fixed — no inflation, no rug.",
    },
    {
      emoji: "❄️",
      icon: Snowflake,
      title: "Freeze Authority",
      highlight: "DISABLED",
      statusColor: "green",
      desc: "Your $CIC holdings can never be frozen or seized. Full custody remains yours at all times.",
    },
    {
      emoji: "🔒",
      icon: Lock,
      title: "Team Tokens",
      highlight: "LOCKED",
      statusColor: "blue",
      desc: "Team allocation is time-locked on-chain. No insider can dump on pre-sale participants.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#050505] relative">
      <div className="glow-line absolute top-0 left-0 right-0" />
      <div className="absolute inset-0 bg-grid opacity-25" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div ref={ref} custom={0} variants={fadeUp} initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-10 sm:mb-14">
          <p className="text-[#C4A77D] text-[10px] sm:text-xs tracking-[0.3em] uppercase mb-3 font-medium">
            Investor Protection
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#F0F0F0] mb-3">
            Security & Trust
          </h2>
          <p className="text-[#505050] max-w-md mx-auto text-sm leading-relaxed">
            Three immutable guarantees verified on-chain before you send a single SOL.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {badges.map((b, i) => (
            <motion.div key={i} custom={i + 1} variants={fadeUp} initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="glass-card rounded-sm p-6 relative overflow-hidden group">
              <div className="absolute top-3 right-4 text-5xl opacity-[0.05] select-none pointer-events-none leading-none">
                {b.emoji}
              </div>

              {/* Status dot */}
              <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border mb-5 ${
                b.statusColor === "green"
                  ? "border-green-500/25 bg-green-500/5"
                  : "border-blue-500/25 bg-blue-500/5"
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full pulse-gold ${
                  b.statusColor === "green" ? "bg-green-400" : "bg-blue-400"
                }`} />
                <span className={`text-[9px] sm:text-[10px] font-bold tracking-widest uppercase ${
                  b.statusColor === "green" ? "text-green-400" : "text-blue-400"
                }`}>{b.highlight}</span>
              </div>

              <h3 className="text-[#F0F0F0] font-bold text-base mb-1">{b.title}</h3>
              <p className="text-[#606060] text-xs sm:text-sm leading-relaxed">{b.desc}</p>

              <div className="mt-4 h-px bg-gradient-to-r from-[#C4A77D]/10 to-transparent" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Contract Section ─── */
function ContractSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [copied, setCopied] = useState(false);

  const copyContract = () => {
    navigator.clipboard.writeText(CONTRACT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section className="py-14 sm:py-20 bg-[#030303] relative">
      <div className="glow-line absolute top-0 left-0 right-0" />

      <div ref={ref} className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <motion.div custom={0} variants={fadeUp} initial="hidden"
          animate={inView ? "visible" : "hidden"}>
          <p className="text-[#C4A77D] text-[10px] sm:text-xs tracking-[0.3em] uppercase mb-3 font-medium">
            Verified Contract
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#F0F0F0] mb-2">Token Details</h2>
          <p className="text-[#505050] text-sm mb-8">
            Always verify the contract before purchasing. The official $CIC address is:
          </p>
        </motion.div>

        <motion.div custom={1} variants={fadeUp} initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="glass-card rounded-sm p-5 sm:p-7 border border-[#C4A77D]/15">

          {/* Contract address box */}
          <div className="flex items-center gap-3 p-4 bg-[#080808] border border-[#1A1A1A] rounded-sm mb-4">
            <div className="flex-1 min-w-0">
              <p className="text-[#404040] text-[9px] tracking-[0.25em] uppercase mb-1.5">Contract Address (Solana)</p>
              <p className="text-[#C4A77D] font-mono text-[10px] sm:text-xs break-all leading-relaxed tracking-wide">
                {CONTRACT}
              </p>
            </div>
            <button onClick={copyContract}
              className="flex-shrink-0 w-9 h-9 rounded-sm border border-[#C4A77D]/20 flex items-center justify-center hover:border-[#C4A77D]/50 hover:bg-[#C4A77D]/8 transition-all duration-200"
              title="Copy contract address">
              {copied
                ? <CheckCheck size={15} className="text-green-400" />
                : <Copy size={15} className="text-[#C4A77D]" />}
            </button>
          </div>

          <AnimatePresence>
            {copied && (
              <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-green-400 text-xs mb-4">
                ✓ Contract address copied to clipboard
              </motion.p>
            )}
          </AnimatePresence>

          {/* Token meta */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
            {[
              { label: "Standard", value: "Token-2022" },
              { label: "Network", value: "Solana" },
              { label: "Total Supply", value: "500,000" },
              { label: "Decimals", value: "9" },
            ].map((item, i) => (
              <div key={i} className="text-center p-2.5 bg-[#080808] rounded-sm border border-[#111]">
                <div className="text-[#C4A77D] font-bold text-sm">{item.value}</div>
                <div className="text-[#404040] text-[10px] uppercase tracking-wider mt-0.5">{item.label}</div>
              </div>
            ))}
          </div>

          {/* Verify link */}
          <a href={`https://solscan.io/token/${CONTRACT}`} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#C4A77D]/60 hover:text-[#C4A77D] text-xs transition-colors">
            <ExternalLink size={12} />
            Verify on Solscan
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Main export ─── */
export default function PresalePage() {
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const [walletName, setWalletName] = useState<string | null>(null);

  const handleConnect = (name: string) => {
    setWalletName(name);
    setWalletModalOpen(false);
  };

  const handleDisconnect = () => setWalletName(null);

  return (
    <>
      {/* Scarcity banner sits right below navbar (pt-16 on next section handles nav offset) */}
      <div className="pt-16">
        <ScarcityBanner />
      </div>

      <PresaleHero walletName={walletName} onOpenWallet={() => setWalletModalOpen(true)} />
      <PurchaseDashboard walletName={walletName} onOpenWallet={() => setWalletModalOpen(true)} />
      <SecuritySection />
      <ContractSection />

      {/* Wallet modal */}
      <AnimatePresence>
        {walletModalOpen && (
          <WalletModal
            onClose={() => setWalletModalOpen(false)}
            onConnect={handleConnect}
          />
        )}
      </AnimatePresence>
    </>
  );
}
