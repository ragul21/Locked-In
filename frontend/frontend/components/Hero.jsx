"use client";

export default function Hero({ onGetStarted }) {
  return (
    <section className="py-32 border-b border-black/8 bg-gradient-to-b from-white to-black/[0.03]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-block mb-6 px-4 py-2 bg-black/5 border border-black/10 text-sm font-medium">
            Time-boxed accountability
          </div>

          {/* Headline */}
          <h1 className="text-7xl font-bold tracking-tight mb-8 leading-tight">
            Get locked in. Ship it.
          </h1>

          {/* Description */}
          <p className="text-xl text-black/65 mb-12 leading-relaxed max-w-2xl mx-auto font-light">
            Invite-only voice sessions where commitment meets deadline. Declare
            what you'll build, lock in with your team, and submit before time
            runs out.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onGetStarted("signup")}
              className="bg-black text-white hover:bg-black/85 px-8 py-3 text-base font-semibold flex items-center justify-center gap-2 transition-all duration-200"
            >
              Get Started →
            </button>

            <button className="border-2 border-black text-black hover:bg-black/5 px-8 py-3 text-base font-semibold transition-all duration-200">
              Watch Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
