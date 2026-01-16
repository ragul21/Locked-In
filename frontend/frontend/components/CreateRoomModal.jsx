"use client";
import { useState } from "react";
export default function CreateRoomModal({ onClose, onCreate }) {
  {
    /*----------------------state to remember the data typed in modal---------------------------------------  */
  }

  const [roomName, setRoomName] = useState("");
  const [roomDescription, setRoomDescription] = useState("");
  const [userName, setUserName] = useState(""); //to remember the name of person who created the room

  {
    /*----------------------UI RENDERING---------------------------------------  */
  }

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
          {/*----------------------dynamically remember the input values using onchange eventobject and re render the UI for every key stroke ---------------------------------------  */}
          <input
            className="w-full border px-3 py-2"
            placeholder="Your name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            className="w-full border px-3 py-2"
            placeholder="Room name"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
          {/*without value and on change we cant make react remember what the input value is and showing  whats in the memory dynamically in input fields*/}
          <textarea
            className="w-full border px-3 py-2"
            rows={3}
            placeholder="Room description"
            value={roomDescription}
            onChange={(e) => setRoomDescription(e.target.value)}
          />

          {/*-------------------------------------------------------------------------------------------------------  */}

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
          <button
            onClick={() => {
              if (!roomName || !roomDescription || !userName) {
                alert("please fill all the details ");
                return;
              }

              const roomData = {
                id: "room-" + Math.random().toString().slice(2),
                name: roomName,
                description: roomDescription,
                username: userName,
              };
              onCreate(roomData);
            }}
            className="bg-black text-white px-4 py-2 cursor-pointer hover:bg-black/85 transition"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
