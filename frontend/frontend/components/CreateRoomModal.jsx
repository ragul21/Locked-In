"use client";

export default function CreateRoomModal({ onClose }) {
  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 cursor-pointer"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg p-6 cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Create Room</h2>
          <button
            onClick={onClose}
            className="cursor-pointer hover:text-black/70 transition"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <input className="w-full border px-3 py-2" placeholder="Room name" />
          <textarea
            className="w-full border px-3 py-2"
            rows={3}
            placeholder="Room description"
          />
          <input type="datetime-local" className="w-full border px-3 py-2" />
          <input type="datetime-local" className="w-full border px-3 py-2" />
          <input
            type="number"
            min={1}
            max={10}
            defaultValue={10}
            className="w-full border px-3 py-2"
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="border px-4 py-2 cursor-pointer hover:bg-black/5 transition"
          >
            Cancel
          </button>
          <button className="bg-black text-white px-4 py-2 cursor-pointer hover:bg-black/85 transition">
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
