"use client";
import { useState } from "react";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/Howitworks";
import Features from "@/components/Features";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import AuthModal from "@/components/AuthModal";

export default function Home() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");

  const openAuthModal = (mode) => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  return (
    <>
      <Navbar onAuthClick={openAuthModal} />
      <Hero onGetStarted={openAuthModal} />

      <HowItWorks />
      <Features />
      <CTA onCTAClick={openAuthModal} />
      <Footer />

      {isAuthOpen && (
        <AuthModal mode={authMode} onClose={() => setIsAuthOpen(false)} />
      )}
    </>
  );
}
