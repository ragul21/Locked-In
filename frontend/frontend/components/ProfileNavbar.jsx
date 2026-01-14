"use client";

import { useState } from "react";

export default function DashboardNavbar() {
  function handleBack() {
    window.location.href = "/dashboard";
  }
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
          <div>
            <h1 className="text-2xl font-semibold">Profile</h1>
          </div>

          <div>
            <button
              onClick={handleBack}
              className="text-2xl font-semibold cursor-pointer"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
