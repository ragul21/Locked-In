"use client";
import { useState, useEffect } from "react";

import ProfileNavbar from "@/components/ProfileNavbar";

export default function Profile() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(
        "http://localhost:4000/users/59030e4a-bee6-4cae-b4ef-30f60abee286"
      );

      const data = await response.json();
      setUser(data);
    };

    fetchUser();
  }, []);

  if (!user) {
    return <p className="text-center mt-10">Loading profile...</p>;
  }

  return (
    <>
      <ProfileNavbar />

      <section className="min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto border rounded-lg p-8">
            <div className="flex flex-col items-center text-center gap-3">
              <div className="w-24 h-24 rounded-full bg-black/10 flex items-center justify-center">
                {/* profile photo later */}
              </div>

              <h2 className="text-2xl font-bold">{user.firstName}</h2>
              <p className="text-sm text-black/60">
                Joined {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
            <hr className="my-8" />
            <div className="space-y-6">
              <div>
                <p className="text-xs uppercase text-black/50 mb-1">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>

              <div>
                <p className="text-xs uppercase text-black/50 mb-1">About</p>
                <p className="text-black/80">
                  Focused developer building minimal tools.
                </p>
              </div>

              <div>
                <p className="text-xs uppercase text-black/50 mb-1">
                  Account Status
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Active
                </p>
              </div>
            </div>
            <div className="flex gap-4 mt-10">
              <button className="flex-1 border py-2 cursor-pointer hover:bg-black/5">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
