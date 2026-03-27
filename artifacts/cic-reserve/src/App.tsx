import { useMemo } from "react";
import { Switch, Route } from "wouter";
import { LangProvider } from "@/context/LangContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomePage from "@/pages/HomePage";
import TokenPage from "@/pages/TokenPage";
import PresalePage from "@/pages/PresalePage";

import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";

const SOLANA_RPC = "https://api.mainnet-beta.solana.com";

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
  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
    []
  );

  return (
    <ConnectionProvider endpoint={SOLANA_RPC}>
      <WalletProvider wallets={wallets} autoConnect={false}>
        <LangProvider>
          <div className="min-h-screen bg-[#050505]">
            <Navbar />
            <Router />
            <Footer />
          </div>
        </LangProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
