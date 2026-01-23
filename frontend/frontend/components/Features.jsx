// ============================================================================================
//                                       FEATURES PAGE
// ============================================================================================

"use client";

export default function Features() {
  return (
    <section className="py-32 border-b border-black/8 bg-black/2">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold mb-20 tracking-tight text-center">
          Why Locked In
        </h2>
        {/* 2 COLUMN GRID FOR MEDIUM SCREENS AND ABOVE AND 1 COLUMN GRID FOR MOBILE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* 1 box */}
          <div className="space-y-4">
            <div className="text-4xl font-bold">⚡</div>
            <h3 className="text-2xl font-bold">Real Accountability</h3>
            <p className="text-black/65 leading-relaxed">
              Time pressure and public commitment transform intentions into
              shipped work. No more "I'll do it later."
            </p>
          </div>
          {/* 2 box */}
          <div className="space-y-4">
            <div className="text-4xl font-bold">🎯</div>
            <h3 className="text-2xl font-bold">Laser Focus</h3>
            <p className="text-black/65 leading-relaxed">
              Dedicated time blocks eliminate context switching. Build with
              singular purpose alongside your team.
            </p>
          </div>
          {/* 3 box */}
          <div className="space-y-4">
            <div className="text-4xl font-bold">🤝</div>
            <h3 className="text-2xl font-bold">Shared Momentum</h3>
            <p className="text-black/65 leading-relaxed">
              Build alongside others with aligned goals. Mutual encouragement
              and collective energy drive results.
            </p>
          </div>
          {/* 4 box */}
          <div className="space-y-4">
            <div className="text-4xl font-bold">📊</div>
            <h3 className="text-2xl font-bold">Measurable Progress</h3>
            <p className="text-black/65 leading-relaxed">
              Track what gets shipped. See patterns. Celebrate wins. Build a
              culture of execution.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
