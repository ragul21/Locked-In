"use client";

export default function Header({ onAuthClick }) {
  return (
    <header className="border-b border-black/8 py-6 sticky top-0 bg-white/95 backdrop-blur-sm z-50">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-black flex items-center justify-center text-white font-bold text-lg">
            L
          </div>
          <span className="text-xl font-bold tracking-tight">Locked In</span>
        </div>

        <button
          onClick={() => onAuthClick("login")}
          className="bg-black text-white hover:bg-black/85 px-6 py-2.5 text-sm font-semibold transition-all duration-200"
        >
          Sign In
        </button>
      </div>
    </header>
  );
}
