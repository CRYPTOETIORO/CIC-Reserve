import Hero from "@/components/Hero";
import IndexDashboard from "@/components/IndexDashboard";
import Scarcity from "@/components/Scarcity";
import Whitepaper from "@/components/Whitepaper";
import Roadmap from "@/components/Roadmap";

export default function HomePage() {
  return (
    <>
      <Hero />
      <IndexDashboard />
      <Scarcity />
      <Whitepaper />
      <Roadmap />
    </>
  );
}
