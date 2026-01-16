"use client";
import { io } from "socket.io-client";
import { useParams, useSearchParams } from "next/navigation";
import { MicOff, MessageSquare, Monitor, LogOut } from "lucide-react";
import { useEffect, useState } from "react";

export default function RoomPage() {
  const [members, setMember] = useState([]);
  const searchParams = useSearchParams();
  const params = useParams();

  const roomId = params.roomid;
  const name = searchParams.get("name");
  const description = searchParams.get("desc");

  useEffect(() => {
    if (!roomId) return;
    const socket = io("http://localhost:4000"); //calls the backend , creates a client socket object for itself

    socket.on("connect", () => {
      console.log("FRONTEND connected", socket.id);
      socket.emit("join-room", roomId);
    });

    socket.on("disconnect", () => {
      // we use this socket object to emit (communicate with server ) and listen what server sends us
      console.log("FRONTEND disconnected");
    });

    socket.on("user-joined", (id) => {
      console.log("Someone joined:", id);
    });

    return () => {
      socket.disconnect(); //gracefull termination when user exits , we are using this is as a clean up function
    };
  }, [roomId]);

  return (
    <>
      <nav className="border-b">
        {/*---------------------------horizontal centering so items dont stretch to extreme ends ----------------------------------*/}

        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          {/*---------------------------left flex item which is a flex itself to align items vertically----------------------------------*/}
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">{name || "untitled room"} </h1>
            <p className="text-sm text-black/60 ">
              {description || "No description provided"}
            </p>
          </div>
          {/*---------------------------Right flex item which is a flex itself to align items vertically----------------------------------*/}
          <div>
            <p className="font-semibold">44:58</p>
            <p className="text-sm text-black/60">Time Remaining</p>
          </div>
        </div>
      </nav>

      {/*----------------------Grid for the main layout the main layout which is asymmentric holding the screen share and members ----------------------------------*/}

      <main className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* LEFT SECTION */}
          <div className="col-span-8 ">
            {/* Screen Share / Video Area */}
            <div className="mb-6">
              <div className="w-full aspect-video border rounded-lg bg-black/5 flex items-center justify-center">
                <p className="text-sm text-black/40">
                  Screen share will appear here
                </p>
              </div>
            </div>
            {/* other left section parts */}

            <div className="mb-6">
              <h2 className="text-sm font-semibold">Share Room</h2>
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="text"
                  readOnly
                  value="https://example.com/join/room-xyz"
                  className="flex-1 border rounded px-3 py-2 text-sm bg-black/5"
                />
                <button className="border rounded px-3 py-2 text-sm hover:bg-black/5">
                  Copy
                </button>
              </div>
            </div>
            {/* controls */}
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-4">Controls</h3>

              <div className="flex items-center justify-center gap-6">
                <button className="border p-4 rounded-lg hover:bg-black/5">
                  <MicOff size={22} />
                </button>

                <button className="border p-4 rounded-lg hover:bg-black/5">
                  <Monitor size={22} />
                </button>

                <button className="border p-4 rounded-lg hover:bg-black/5">
                  <MessageSquare size={22} />
                </button>

                <button className="border p-4 rounded-lg hover:bg-black/5 text-red-600">
                  <LogOut size={22} />
                </button>
              </div>
            </div>

            {/* room info */}

            <div className="border rounded-lg p-4 mt-6">
              <h3 className="font-semibold mb-4">Room Info</h3>

              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-black/50">Room ID:</span>{" "}
                  <span className="font-medium">{roomId}</span>
                </div>

                <div>
                  <span className="text-black/50">Members:</span>{" "}
                  <span className="font-medium">5</span>
                </div>

                <div>
                  <span className="text-black/50">Status:</span>{" "}
                  <span className="font-medium text-green-600">Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* VERTICAL DIVIDER */}
          <div className="col-span-1 flex justify-center">
            <div className="w-px bg-black/10 h-full" />
          </div>

          {/* RIGHT SECTION */}
          <div className="col-span-3">
            <div className="pl-6">
              <h3 className="font-semibold mb-4">Members ({members.length})</h3>

              <div className="space-y-3">
                {members.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center gap-3 border rounded-lg p-3"
                  >
                    <div className="w-9 h-9 rounded-md bg-black text-white flex items-center justify-center font-semibold">
                      {member.name[0]}
                    </div>

                    <div>
                      <p className="font-medium">{member.name}</p>
                      {member.role === "admin" && (
                        <p className="text-xs text-black/50">Admin</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
