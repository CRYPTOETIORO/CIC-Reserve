import { Switch, Route } from "wouter";
import { LangProvider } from "@/context/LangContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomePage from "@/pages/HomePage";
import TokenPage from "@/pages/TokenPage";
import PresalePage from "@/pages/PresalePage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/token" component={TokenPage} />
      <Route path="/presale" component={PresalePage} />
    </Switch>
  );
}

export default function App() {
  return (
    <LangProvider>
      <div className="min-h-screen bg-[#050505]">
        <Navbar />
        <Router />
        <Footer />
      </div>
    </LangProvider>
  );
}
