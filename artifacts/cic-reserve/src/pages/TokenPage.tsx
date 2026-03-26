import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Copy, CheckCheck, Shield, Snowflake, FileCheck,
  ExternalLink, CheckCircle2, Clock, Circle, Zap,
  TrendingUp, Lock, ArrowUpRight
} from "lucide-react";
import { useLang } from "@/context/LangContext";

const CONTRACT = "7WerPaG3zJfzHLPGJGBvCJzutb2hmirVvHeZv9ru312Y";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ─── Section wrapper ─── */
function Section({ id, children, dark = false }: { id?: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <section id={id} className={`py-20 sm:py-28 relative ${dark ? "bg-[#030303]" : "bg-[#050505]"}`}>
      <div className="glow-line absolute top-0 left-0 right-0" />
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6">{children}</div>
    </section>
  );
}

/* ─── Section header ─── */
function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"}
      variants={fadeUp} className="text-center mb-12 sm:mb-16">
      <p className="text-[#C4A77D] text-[10px] sm:text-xs tracking-[0.3em] uppercase mb-3 font-medium">{eyebrow}</p>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#F0F0F0] mb-3">{title}</h2>
      {subtitle && <p className="text-[#606060] max-w-xl mx-auto text-sm sm:text-base leading-relaxed px-2">{subtitle}</p>}
    </motion.div>
  );
}

/* ─── Hero ─── */
function TokenHero() {
  const [copied, setCopied] = useState(false);

  const copyContract = () => {
    navigator.clipboard.writeText(CONTRACT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section className="relative min-h-[100svh] sm:min-h-[85vh] flex flex-col items-center justify-center overflow-hidden bg-[#050505] pt-16 pb-8 sm:pb-0">
      <div className="absolute inset-0 bg-grid opacity-100" />
      <div className="absolute inset-0 radial-glow" />

      {/* Orb */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(196,167,125,0.05) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.06, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Corner accents */}
      <div className="absolute top-24 left-4 w-8 h-8 border-l border-t border-[#C4A77D]/20" />
      <div className="absolute top-24 right-4 w-8 h-8 border-r border-t border-[#C4A77D]/20" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center w-full">
        {/* Badge */}
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="inline-flex mb-6">
          <div className="flex items-center gap-2 px-4 py-1.5 border border-[#C4A77D]/25 rounded-full bg-[#C4A77D]/5">
            <img src="https://i.imgur.com/aWWHkV1.png" alt="CIC" className="w-4 h-4 object-contain" />
            <span className="text-[#C4A77D] text-[10px] sm:text-xs tracking-[0.2em] uppercase font-medium">
              Solana · Token-2022
            </span>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible"
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight mb-3">
          <span className="text-[#F0F0F0]">Compos Index Cap</span>
          <br />
          <span className="text-transparent bg-clip-text"
            style={{ backgroundImage: "linear-gradient(135deg, #C4A77D 0%, #E8D5B0 50%, #C4A77D 100%)" }}>
            $CIC
          </span>
        </motion.h1>

        <motion.p custom={2} variants={fadeUp} initial="hidden" animate="visible"
          className="text-[#606060] text-sm sm:text-base mb-10 leading-relaxed">
          The world's first crypto index token on Solana — engineered for long-term capital preservation.
        </motion.p>

        {/* Contract box */}
        <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible"
          className="mb-8">
          <p className="text-[#505050] text-[10px] tracking-[0.3em] uppercase mb-2">Contract Address</p>
          <div className="inline-flex items-center gap-3 px-4 sm:px-5 py-3 border border-[#C4A77D]/20 rounded-sm bg-[#0A0A0A] group max-w-full">
            <span className="text-[#C4A77D] font-mono text-[10px] sm:text-xs tracking-wide break-all text-left">
              {CONTRACT}
            </span>
            <button
              onClick={copyContract}
              className="flex-shrink-0 w-8 h-8 rounded-sm border border-[#C4A77D]/20 flex items-center justify-center hover:border-[#C4A77D]/60 hover:bg-[#C4A77D]/8 transition-all duration-200"
              title="Copy contract"
            >
              {copied
                ? <CheckCheck size={14} className="text-green-400" />
                : <Copy size={14} className="text-[#C4A77D]" />}
            </button>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={copied ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
            className="text-green-400 text-xs mt-2">
            ✓ Copied to clipboard
          </motion.p>
        </motion.div>

        {/* CTA buttons */}
        <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible"
          className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href={`https://solscan.io/token/${CONTRACT}`} target="_blank" rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#C4A77D] text-[#050505] font-semibold text-xs tracking-wider uppercase rounded-sm hover:bg-[#D4B78D] transition-colors">
            View on Solscan
            <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
          <a href="#tokenomics"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-[#C4A77D]/30 text-[#C4A77D] font-semibold text-xs tracking-wider uppercase rounded-sm hover:border-[#C4A77D]/60 hover:bg-[#C4A77D]/5 transition-all">
            Explore Tokenomics
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Tokenomics ─── */
function Tokenomics() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const distribution = [
    { label: "Presale", pct: 40, color: "#C4A77D" },
    { label: "Liquidity", pct: 30, color: "#627EEA" },
    { label: "Marketing", pct: 15, color: "#9945FF" },
    { label: "Index Reserve", pct: 10, color: "#26A17B" },
    { label: "Team (Locked)", pct: 5, color: "#505050" },
  ];

  const stats = [
    { label: "Total Supply", value: "500,000", suffix: "$CIC", icon: Zap },
    { label: "Network", value: "Solana", suffix: "", icon: TrendingUp },
    { label: "Standard", value: "Token-2022", suffix: "", icon: Shield },
    { label: "Team Tokens", value: "Locked", suffix: "", icon: Lock },
  ];

  return (
    <Section id="tokenomics" dark>
      <SectionHeader
        eyebrow="Supply & Distribution"
        title="Tokenomics"
        subtitle="Designed for scarcity, fairness, and long-term value preservation."
      />

      <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Stats */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {stats.map((s, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="glass-card rounded-sm p-4 sm:p-5">
                <div className="w-8 h-8 border border-[#C4A77D]/20 rounded-sm flex items-center justify-center mb-3">
                  <s.icon size={14} color="#C4A77D" />
                </div>
                <div className="text-[#C4A77D] font-bold text-sm sm:text-base leading-tight break-words">
                  {s.value}
                  {s.suffix && <span className="text-[10px] ml-1 text-[#C4A77D]/70">{s.suffix}</span>}
                </div>
                <div className="text-[#505050] text-[10px] sm:text-xs tracking-wider uppercase mt-0.5">{s.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Low emission note */}
          <motion.div custom={4} variants={fadeUp} initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="glass-card rounded-sm p-4 sm:p-5 border border-[#C4A77D]/15">
            <div className="flex items-start gap-3">
              <span className="text-xl">⚡</span>
              <div>
                <p className="text-[#E0E0E0] text-sm font-semibold mb-1">Ultra-Low Emission</p>
                <p className="text-[#606060] text-xs leading-relaxed">
                  With only 500,000 $CIC ever minted — less than many wallets hold in a single token — scarcity is built into the protocol from day one. Combined with auto-burn, every transaction makes each remaining token more valuable.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Distribution chart */}
        <div className="space-y-3">
          <p className="text-[#505050] text-[10px] tracking-[0.3em] uppercase mb-4">Distribution</p>
          {distribution.map((d, i) => (
            <motion.div key={i} custom={i + 2} variants={fadeUp} initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
              <span className="text-[#A0A0A0] text-xs w-20 sm:w-28 flex-shrink-0">{d.label}</span>
              <div className="flex-1 h-1.5 bg-[#111] rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: d.color, opacity: 0.7 }}
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${d.pct}%` } : { width: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <span className="text-[#C4A77D] font-bold text-sm w-10 text-right flex-shrink-0">{d.pct}%</span>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─── Security ─── */
function Security() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const badges = [
    {
      emoji: "🛡️",
      icon: Shield,
      title: "Mint Authority",
      subtitle: "Revoked — Immutable",
      desc: "No new tokens can ever be created. The total supply is permanently fixed at 500,000 $CIC. No entity — including the team — can inflate the supply.",
      highlight: "REVOKED",
    },
    {
      emoji: "❄️",
      icon: Snowflake,
      title: "Freeze Authority",
      subtitle: "Disabled — Funds Always Free",
      desc: "No wallet or authority can freeze your $CIC holdings. Your funds remain under your full control at all times, with no risk of asset seizure.",
      highlight: "DISABLED",
    },
    {
      emoji: "📜",
      icon: FileCheck,
      title: "Verified Contract",
      subtitle: "Community Audited",
      desc: "The $CIC contract is fully open and verifiable on Solscan. Built on the Token-2022 standard — Solana's most advanced and security-hardened token framework.",
      highlight: "VERIFIED",
    },
  ];

  return (
    <Section id="security">
      <SectionHeader
        eyebrow="Trust & Transparency"
        title="Security & Transparency"
        subtitle="Three pillars of immutable, verifiable security baked into the protocol."
      />
      <div ref={ref} className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {badges.map((b, i) => (
          <motion.div key={i} custom={i} variants={fadeUp} initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="glass-card rounded-sm p-6 sm:p-7 group transition-all duration-300 relative overflow-hidden">
            {/* Background emoji */}
            <div className="absolute top-3 right-4 text-5xl opacity-[0.06] select-none pointer-events-none leading-none">
              {b.emoji}
            </div>

            {/* Status badge */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-green-500/20 bg-green-500/5 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 pulse-gold" style={{ animationName: "pulse-gold" }} />
              <span className="text-green-400 text-[9px] sm:text-[10px] font-bold tracking-widest uppercase">{b.highlight}</span>
            </div>

            <h3 className="text-[#F0F0F0] font-bold text-base sm:text-lg mb-0.5">{b.title}</h3>
            <p className="text-[#C4A77D] text-xs mb-4 tracking-wide">{b.subtitle}</p>
            <p className="text-[#606060] text-xs sm:text-sm leading-relaxed">{b.desc}</p>

            <div className="mt-5 h-px bg-gradient-to-r from-[#C4A77D]/15 to-transparent" />
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ─── Value Strategy ─── */
function ValueStrategy() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <Section id="strategy" dark>
      <div ref={ref} className="max-w-3xl mx-auto">
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}
          className="text-center mb-10">
          <p className="text-[#C4A77D] text-[10px] sm:text-xs tracking-[0.3em] uppercase mb-3 font-medium">Philosophy</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#F0F0F0]">Value Strategy</h2>
        </motion.div>

        <motion.div custom={1} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"}
          className="glass-card rounded-sm p-7 sm:p-10 relative overflow-hidden">
          {/* Quote mark */}
          <div className="absolute top-5 left-7 text-7xl text-[#C4A77D]/06 font-serif leading-none select-none pointer-events-none">"</div>

          <p className="text-[#C0C0C0] text-base sm:text-lg leading-relaxed text-center italic mb-8">
            $CIC is not a speculation coin. It is an index designed for long-term capital preservation, using Solana's most advanced standard to guarantee immutability.
          </p>
          <div className="h-px bg-gradient-to-r from-transparent via-[#C4A77D]/25 to-transparent mb-8" />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-center">
            {[
              { icon: "🏦", title: "Capital Preservation", desc: "Not designed for quick gains — engineered to retain and grow value over years, not days." },
              { icon: "🔒", title: "Immutability First", desc: "Built on Token-2022, Solana's most secure standard, with all authority keys permanently revoked." },
              { icon: "📊", title: "Index-Backed", desc: "Every $CIC represents exposure to a diversified basket of the 9 most strategic crypto assets." },
            ].map((item, i) => (
              <motion.div key={i} custom={i + 2} variants={fadeUp} initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="flex flex-col items-center gap-2">
                <div className="text-2xl mb-1">{item.icon}</div>
                <h4 className="text-[#E0E0E0] font-semibold text-sm">{item.title}</h4>
                <p className="text-[#505050] text-xs leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

/* ─── Roadmap ─── */
function TokenRoadmap() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const phases = [
    {
      icon: CheckCircle2,
      iconColor: "#C4A77D",
      status: "Completed",
      statusColor: "#C4A77D",
      statusBg: "rgba(196,167,125,0.08)",
      statusBorder: "rgba(196,167,125,0.25)",
      title: "Phase 1",
      subtitle: "Token Deployment",
      items: [
        "Token-2022 contract deployed on Solana",
        "Mint & Freeze Authority permanently revoked",
        "Contract verified on Solscan",
        "500,000 $CIC minted — supply locked forever",
      ],
      active: true,
    },
    {
      icon: Clock,
      iconColor: "#9945FF",
      status: "In Progress",
      statusColor: "#9945FF",
      statusBg: "rgba(153,69,255,0.08)",
      statusBorder: "rgba(153,69,255,0.25)",
      title: "Phase 2",
      subtitle: "Presale Dashboard Launch",
      items: [
        "Presale dashboard live at cicreserve.xyz",
        "Community whitelist & allocation system",
        "Transparent on-chain presale tracking",
        "Index dashboard beta release",
      ],
      active: false,
    },
    {
      icon: Circle,
      iconColor: "#404040",
      status: "Coming Soon",
      statusColor: "#505050",
      statusBg: "transparent",
      statusBorder: "#2A2A2A",
      title: "Phase 3",
      subtitle: "Raydium & Jupiter Listing",
      items: [
        "Raydium liquidity pool creation",
        "Jupiter aggregator listing",
        "Full index dashboard launch",
        "DAO governance activation",
      ],
      active: false,
    },
  ];

  return (
    <Section id="token-roadmap">
      <SectionHeader
        eyebrow="Strategic Timeline"
        title="Roadmap"
        subtitle="Three precise phases from token genesis to global adoption."
      />
      <div ref={ref} className="space-y-5">
        {phases.map((p, i) => (
          <motion.div key={i} custom={i} variants={fadeUp} initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="glass-card rounded-sm p-5 sm:p-7 transition-all duration-300"
            style={{ borderColor: p.active ? "rgba(196,167,125,0.2)" : "rgba(196,167,125,0.07)" }}>
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              {/* Left */}
              <div className="flex sm:flex-col items-center sm:items-center gap-3 sm:gap-2 sm:w-28 flex-shrink-0">
                <div className="w-10 h-10 rounded-sm border flex items-center justify-center flex-shrink-0"
                  style={{ borderColor: p.active ? "#C4A77D" : "#2A2A2A", background: p.statusBg }}>
                  <p.icon size={18} color={p.iconColor} />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[#C0C0C0] text-sm font-bold">{p.title}</span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[9px] font-bold tracking-widest uppercase"
                    style={{ color: p.statusColor, borderColor: p.statusBorder, background: p.statusBg }}>
                    {p.active && <span className="w-1 h-1 rounded-full bg-[#C4A77D] pulse-gold" />}
                    {p.status}
                  </span>
                </div>
              </div>

              {/* Right */}
              <div className="flex-1 min-w-0">
                <h3 className="text-[#F0F0F0] font-semibold text-base mb-3" style={{ color: p.active ? "#F0F0F0" : "#606060" }}>
                  {p.subtitle}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                  {p.items.map((item, j) => (
                    <motion.div key={j} custom={i * 2 + j} variants={fadeUp} initial="hidden"
                      animate={inView ? "visible" : "hidden"}
                      className="flex items-start gap-2">
                      <div className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0"
                        style={{ backgroundColor: p.active ? "#C4A77D" : "#3A3A3A" }} />
                      <span className="text-xs leading-relaxed"
                        style={{ color: p.active ? "#C0C0C0" : "#505050" }}>
                        {item}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ─── External Links ─── */
function ExternalLinks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const links = [
    {
      label: "Solscan",
      desc: "View contract, holders, and on-chain transactions.",
      href: `https://solscan.io/token/${CONTRACT}`,
      emoji: "🔍",
    },
    {
      label: "Jupiter",
      desc: "Swap $CIC on Jupiter aggregator (Phase 3).",
      href: "https://jup.ag",
      emoji: "🪐",
    },
    {
      label: "Raydium",
      desc: "Liquidity pool — launching in Phase 3.",
      href: "https://raydium.io",
      emoji: "⚡",
    },
    {
      label: "Whitepaper",
      desc: "Full protocol documentation and index methodology.",
      href: "#",
      emoji: "📄",
    },
  ];

  return (
    <Section id="links" dark>
      <SectionHeader
        eyebrow="Ecosystem"
        title="External Links"
        subtitle="Everything you need to explore, trade, and verify $CIC."
      />
      <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {links.map((link, i) => (
          <motion.a key={i} href={link.href} target="_blank" rel="noopener noreferrer"
            custom={i} variants={fadeUp} initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="glass-card rounded-sm p-5 sm:p-6 group flex items-center gap-4 transition-all duration-300 hover:border-[#C4A77D]/30">
            <div className="text-2xl flex-shrink-0">{link.emoji}</div>
            <div className="flex-1 min-w-0">
              <div className="text-[#E0E0E0] font-semibold text-sm group-hover:text-[#C4A77D] transition-colors">
                {link.label}
              </div>
              <div className="text-[#505050] text-xs mt-0.5 leading-relaxed">{link.desc}</div>
            </div>
            <ExternalLink size={14} className="text-[#404040] group-hover:text-[#C4A77D] transition-colors flex-shrink-0" />
          </motion.a>
        ))}
      </div>

      {/* Contract reminder */}
      <motion.div custom={4} variants={fadeUp} initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="mt-8 text-center">
        <p className="text-[#404040] text-[10px] sm:text-xs tracking-widest uppercase mb-2">Official Contract Address</p>
        <p className="text-[#C4A77D]/60 font-mono text-[9px] sm:text-[10px] break-all">{CONTRACT}</p>
      </motion.div>
    </Section>
  );
}

/* ─── Main export ─── */
export default function TokenPage() {
  return (
    <>
      <TokenHero />
      <Tokenomics />
      <Security />
      <ValueStrategy />
      <TokenRoadmap />
      <ExternalLinks />
    </>
  );
}
