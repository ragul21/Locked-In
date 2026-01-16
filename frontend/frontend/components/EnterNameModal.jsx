"use client";
import { useState } from "react";

export default function EnterNameModal({ onSubmit }) {
  const [name, setName] = useState("");

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-sm p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Enter your name</h2>

        <input
          type="text"
          placeholder="Your name"
          className="w-full border px-3 py-2 rounded mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          onClick={() => {
            if (!name.trim()) return;
            onSubmit(name.trim());
          }}
          className="w-full bg-black text-white py-2 rounded"
        >
          Join Room
        </button>
      </div>
    </div>
  );
}
