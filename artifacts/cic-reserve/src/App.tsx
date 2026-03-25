import { LangProvider } from "@/context/LangContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import IndexDashboard from "@/components/IndexDashboard";
import Scarcity from "@/components/Scarcity";
import Whitepaper from "@/components/Whitepaper";
import Roadmap from "@/components/Roadmap";
import Footer from "@/components/Footer";

export default function App() {
  return (
    <LangProvider>
      <div className="min-h-screen bg-[#050505]">
        <Navbar />
        <Hero />
        <IndexDashboard />
        <Scarcity />
        <Whitepaper />
        <Roadmap />
        <Footer />
      </div>
    </LangProvider>
  );
}
