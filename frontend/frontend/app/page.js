// ============================================================================================
//                                        LANDING PAGE
// ============================================================================================

"use client";

//========================= IMPORT SECTION ===========================//

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/Howitworks";
import Features from "@/components/Features";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import AuthModal from "@/components/AuthModal";

//=====================================================================//

export default function Home() {
  /* "login" -- means show login modal , "signup means show signup modal" ,
   "false" - initial state dont show modal , "true" show the modal */
  const [isAuthOpen, setIsAuthOpen] = useState(false); // ("should we show the modal or not ") this state controls the authentication modal
  const [authMode, setAuthMode] = useState("login"); // ("which modal should we show ") this state switches between sign up and login modal

  /* openAuthModal is a crucial function that gets passed to the components
  like navbar , hero, cta which has login and sign up modals , this will trigger the 
  conditional rendering in the landing page */

  const openAuthModal = (mode) => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  //==================================UI RENDERING LOGIC=====================================================//

  return (
    /* Multiple render statements must be bundled in a react fragment or a element like div */
    /* components are rendered in order for the landing page  */
    /* Navbar , Hero , CTA page all have login or sign up button so we need to pass the onclick function
    and manage state here in this home page to conditionally render the modal */
    <>
      <Navbar onAuthClick={openAuthModal} />
      <Hero onGetStarted={openAuthModal} />

      <HowItWorks />
      <Features />
      <CTA onCTAClick={openAuthModal} />
      <Footer />

      {/* conditional rendering of the modal using short circuiting must go inside {} as this is not plain html and js logic 
      (false && true returns falsy value meaning no result is rendered , if (true && true) last truthy value is rendered) */}
      {/* intial status FALSE && TRUE -- "MODAL WONT SHOW UP UNTILL CLICKED FROM NAV OR CTA" */}
      {isAuthOpen && (
        <AuthModal mode={authMode} onClose={() => setIsAuthOpen(false)} />
      )}
    </>
  );
}
