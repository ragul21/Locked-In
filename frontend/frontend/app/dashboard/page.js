"use client";

import { useEffect, useState } from "react";
import DashboardNavbar from "@/components/DashboardNavbar";
import MyRoomCard from "@/components/MyRoomCard";
import CreateRoomModal from "@/components/CreateRoomModal";

export default function DashboardPage() {
  const [isCreateRoomOpen, setIsCreateRoomOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      {
        /* if client does not have token redirect them to landing page ,
                                                         prevents users from accessing the dashboard page straight from url without logging in  */
      }
      window.location.href = "/";
    }
  }, []);

  const myRoom = {
    name: "Design Sprint",
    description: "Create new UI mockups for dashboard",
    status: "ACTIVE",
    members: 5,
    maxMembers: 10,
    timeRemaining: 45,
    tags: ["Design", "Code", "Documentation"],
  };

  const myRoom_active_1 = {
    name: "Bug Bash",
    description: "Find and fix critical bugs",
    status: "ACTIVE",
    members: 3,
    maxMembers: 8,
    timeRemaining: 75,
    tags: ["Testing", "Code"],
  };

  const myRoom_active_2 = {
    name: "API Refactor",
    description: "Refactor legacy backend APIs",
    status: "ACTIVE",
    members: 4,
    maxMembers: 6,
    timeRemaining: 30,
    tags: ["Code", "Backend"],
  };

  const myRoom_active_3 = {
    name: "API Cleanup",
    description: "Clean up and standardize backend APIs",
    status: "SCHEDULED",
    members: 4,
    maxMembers: 6,
    timeRemaining: 60,
    tags: ["Backend", "Code"],
  };

  const myRoom_active_4 = {
    name: "UI Polish",
    description: "Improve spacing, colors, and accessibility",
    status: "SCHEDULED",
    members: 2,
    maxMembers: 5,
    timeRemaining: 90,
    tags: ["Design", "Frontend"],
  };

  return (
    <>
      <DashboardNavbar onCreateClick={() => setIsCreateRoomOpen(true)} />

      <main className="container mx-auto px-4 py-12">
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-6">My Rooms</h2>
          <MyRoomCard room={myRoom} />
        </section>

        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-6">Active Rooms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MyRoomCard room={myRoom_active_2} />
            <MyRoomCard room={myRoom_active_1} />
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-6">Scheduled Rooms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MyRoomCard room={myRoom_active_3} />
            <MyRoomCard room={myRoom_active_4} />
          </div>
        </section>
      </main>

      {isCreateRoomOpen && (
        <CreateRoomModal
          onClose={() => setIsCreateRoomOpen(false)}
          onCreate={(room) => {
            setIsCreateRoomOpen(false); //create room data is passed as query parameters by safely encoding it
            window.location.href = `/room/${room.id}?name=${encodeURIComponent(
              room.name
            )}&desc=${encodeURIComponent(
              room.description
            )}&username=${encodeURIComponent(room.username)}`;
          }}
        />
      )}
    </>
  );
}
