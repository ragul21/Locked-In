"use client";

import { useState } from "react";

export default function DashboardNavbar({ onCreateClick }) {
  const [accountOpen, setAccountOpen] = useState(false);

  return (
    <nav className="border-b h-16">
      <div className="container mx-auto h-full px-4">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black text-white flex items-center justify-center font-bold">
              L
            </div>
            <span className="font-semibold">Locked In</span>
          </div>

          <div className="flex-1 px-8">
            <input
              type="text"
              placeholder="Search rooms..."
              className="w-full border px-3 py-2"
            />
          </div>

          <div className="relative flex items-center gap-4">
            <button
              onClick={onCreateClick}
              className="bg-black text-white px-4 py-2 cursor-pointer hover:bg-black/85"
            >
              Create Room
            </button>

            <button
              onClick={() => setAccountOpen((prev) => !prev)}
              className="border px-3 py-2 cursor-pointer hover:bg-black/5"
            >
              Account
            </button>

            {accountOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setAccountOpen(false)}
                />

                <div className="absolute right-0 top-12 w-40 border bg-white z-20 shadow">
                  <button className="w-full text-left px-4 py-2 hover:bg-black/5 cursor-pointer">
                    Profile
                  </button>

                  <button className="w-full text-left px-4 py-2 text-red-600 hover:bg-black/5 cursor-pointer">
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
