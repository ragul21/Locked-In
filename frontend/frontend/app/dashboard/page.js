// ============================================================================================
//                                        DASHBOARD PAGE
// ============================================================================================

"use client";

import { useEffect, useState } from "react";
import DashboardNavbar from "@/components/DashboardNavbar";
import MyRoomCard from "@/components/MyRoomCard";
import CreateRoomModal from "@/components/CreateRoomModal";

export default function DashboardPage() {
  // -------------STATE TO HANDLE THE CREATE ROOM MODAL WHEN USER CLICKS--------------------//
  const [isCreateRoomOpen, setIsCreateRoomOpen] = useState(false);

  /* TOKEN CHECKING FOR DASHBOARD PAGE RUNS AFTER THE FIRST RENDER OF THE PAGE */
  useEffect(() => {
    const checkAuth = async () => {
      // Instead of checking localStorage, ping the backend to verify cookie
      const response = await fetch("http://localhost:4000/users/me", {
        credentials: "include", // Send cookie automatically
      });

      if (response.status === 401) {
        window.location.href = "/";
      }
    };

    checkAuth();
  }, []);

  //----------------------------MOCK DATA OBJECT THAT I PASSED TO THE ROOM CARD COMPONENT FOR RENDERING THE DASHBOARD ---------------------//

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

  //---------------------------------UI RENDERING---------------------------------------------//
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

      {/*-------------------- CONDITIONAL RENDERING OF THE CREATE ROOM MODAL----------------------- */}
      {isCreateRoomOpen && (
        <CreateRoomModal
          onClose={() => setIsCreateRoomOpen(false)} //TO CLOSE THE MODAL IF USER CLICKS OUTSIDE OR X Button
          /* WHEN USER CLICKS CREATE , TAKE THE OBJECT DATA SEND IT TO THE ROOM PAGE THROUGH URL AS QUERY PARAMETERS */
          onCreate={(room) => {
            setIsCreateRoomOpen(false); //CLOSE THE MODAL AFTER USER CLICKS ON CREATE

            sessionStorage.setItem("username", room.username); //STORE IT IN THE BROWSER AS ITS SENSITIVE

            /* OBJECT DATA IS SENT THROUGH THE URL  */
            window.location.href = `/room/${room.id}?name=${encodeURIComponent(
              room.name,
            )}&desc=${encodeURIComponent(room.description)}&end=${encodeURIComponent(room.endTime)}`;
          }}
        />
      )}
    </>
  );
}
