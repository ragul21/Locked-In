// ============================================================================================
//                                       NAV BAR PAGE
// ============================================================================================

"use client";

export default function Header({ onAuthClick }) {
  return (
    /* used a flex container for nav bar layout */
    /* LOGO and company name goes in a single flex box rowise with gap 2 */
    /* LOGO + COMPANY NAME  and  LOGIN button goes in a single justify between row wise flex */
    /* Also LOGO itself goes inside a flex to center it in a box */
    <header className="border-b border-black/8 py-6 sticky top-0 bg-white/95 backdrop-blur-sm z-50">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-black flex items-center justify-center text-white font-bold text-lg">
            L
          </div>
          <span className="text-xl font-bold tracking-tight">Locked In</span>
        </div>

        <button
          onClick={() => onAuthClick("login")} //CHANGED THE STATE IN HOME PAGE SO RE RENDER HAPPENS WITH A LOGIN MODAL
          className="bg-black text-white hover:bg-black/85 px-6 py-2.5 text-sm font-semibold transition-all duration-200"
        >
          Sign In
        </button>
      </div>
    </header>
  );
}
