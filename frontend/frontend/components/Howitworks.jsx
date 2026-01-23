// ============================================================================================
//                                       HOW IT WORKS PAGE
// ============================================================================================

"use client";

export default function HowItWorks() {
  return (
    <section className="py-32 border-b border-black/8">
      <div className="container mx-auto px-4">
        {/* Heading part with a 80px margin on the bottom */}
        <h2 className="text-5xl font-bold mb-20 tracking-tight text-center">
          How it works
        </h2>

        {/*Three column grid for medium screens and up and for mobile one column grid*/}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* 1st box , flex column container stacked vertically so yes a grid column which is a flex column container */}
          <div className="flex flex-col">
            <div className="flex items-center justify-center h-16 w-16 bg-black text-white font-bold text-2xl mb-6 mx-auto">
              1
            </div>
            <h3 className="text-2xl font-bold mb-4 text-center">
              Create or join
            </h3>
            <p className="text-black/60 leading-relaxed text-center">
              Set up an invite-only room with a clear goal and fixed time limit.
              Define what success looks like.
            </p>
          </div>

          {/* 2 box */}
          <div className="flex flex-col">
            <div className="flex items-center justify-center h-16 w-16 bg-black text-white font-bold text-2xl mb-6 mx-auto">
              2
            </div>
            <h3 className="text-2xl font-bold mb-4 text-center">
              Lock in & build
            </h3>
            <p className="text-black/60 leading-relaxed text-center">
              Declare your contribution, resolve overlaps with teammates, and
              start the timer. No distractions.
            </p>
          </div>

          {/* 3 box */}
          <div className="flex flex-col">
            <div className="flex items-center justify-center h-16 w-16 bg-black text-white font-bold text-2xl mb-6 mx-auto">
              3
            </div>
            <h3 className="text-2xl font-bold mb-4 text-center">
              Submit & celebrate
            </h3>
            <p className="text-black/60 leading-relaxed text-center">
              Submit your work before time ends. See what everyone built.
              Celebrate the momentum.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
