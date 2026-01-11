"use client";

export default function CTA({ onCTAClick }) {
  return (
    <section className="py-24 border-b border-black/8">
      <div className="container mx-auto px-4">
        <div className="bg-black text-white px-12 py-16 text-center rounded-lg">
          <h2 className="text-4xl font-bold mb-6">Ready to get locked in?</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Join teams that are shipping. Start your first session today.
          </p>
          <button
            onClick={() => onCTAClick("signup")}
            className="bg-white text-black hover:bg-white/90 px-8 py-3 text-base font-semibold rounded transition-all duration-200"
          >
            Create Account
          </button>
        </div>
      </div>
    </section>
  );
}
