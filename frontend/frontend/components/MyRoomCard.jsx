// ============================================================================================
//                                        THIS IS ROOM CARD UI COMPONENT
// ============================================================================================

"use client";

export default function MyRoomCard({ room }) {
  return (
    <div className="border border-black/15 p-6 max-w-xl">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-lg">{room.name}</h3>
          <p className="text-sm text-black/60">{room.description}</p>
        </div>

        <span className="text-xs border px-2 py-1">{room.status}</span>
      </div>

      <div className="flex justify-between text-sm mb-2">
        <span className="text-black/60">Members</span>
        <span className="font-semibold">
          {room.members} / {room.maxMembers}
        </span>
      </div>

      <div className="flex justify-between text-sm mb-4">
        <span className="text-black/60">Time Remaining</span>
        <span className="font-semibold">{room.timeRemaining} min</span>
      </div>

      <div className="flex gap-2 mb-4">
        {room.tags.map((tag) => (
          <span key={tag} className="border px-2 py-1 text-xs">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex gap-4">
        <button className="flex-1 bg-black text-white py-2 font-semibold">
          🔒 Locked In
        </button>
        <button className="flex-1 border border-black py-2 font-semibold">
          Leave
        </button>
      </div>
    </div>
  );
}
