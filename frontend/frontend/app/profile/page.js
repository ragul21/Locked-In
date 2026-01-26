// ============================================================================================
//                                        THIS IS THE PROFILE PAGE
// ============================================================================================

"use client";

import { useState, useEffect } from "react";

import ProfileNavbar from "@/components/ProfileNavbar";

export default function Profile() {
  /* ----------------------------------STATES TO MANAGE FOR EDITING USER NAME AND SHOWING USER DATE IN THE UI-------------------- */
  const [user, setUser] = useState(null);
  const [isEditMode, setEditMode] = useState(false);
  const [editFirstName, setEditFirstName] = useState("");

  /*----------------------------------------------------------------------------------------------------------------- */

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      /* if the user does not have the token redirect them to the homepage */
      if (!token) {
        window.location.href = "/";

        return;
      }

      const response = await fetch(
        "http://localhost:4000/users/me", // page renders with null data but then after render we have use effect that runs once and it fetches then triggers render again and now the values pop up in the screen
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      /* ONCE IT GETS THE DATA BACK WE EXTRACT THE BODY */
      const data = await response.json();

      setUser(data); // WE UPDATE THE STATE TO RENDER IT IN THE PAGE
    };

    fetchUser();
  }, []);

  //----------------------------THIS HANDLES THE DELETE BUTTON THIS WILL DO DELETE REQUEST TO THE BACKEND AND FORCE THE USER TO THE DASHBOARD--------------------------------------------------------//

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    await fetch("http://localhost:4000/users/me", {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    alert("user deleted");

    window.location.href = "/";
  };

  //-------------------------------IF USER CLICKS SAVE TO DB USING POST-----------------------------------------------------//

  const handlesave = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:4000/users/me", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        firstName: editFirstName,
      }),
    });

    const updateduser = await response.json();
    setUser(updateduser);
    setEditMode(false);
  };

  //----------------UNTILL WE GET THE USER DATA FROM THE BACKEND SHOW LOADING PAGE AND WAIT----------------//
  if (!user) {
    return <p className="text-center mt-10">Loading profile...</p>;
  }
  //----------------ONCE WE GET ACTUAL DATA FROM DB THIS BLOCK WILL RUN AND ABOVE WONT-----------------------------------//
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
              {/* WHEN USER CLICKS EDIT BUTTON , WE CONDITIONALLY RENDER AND SHOW THE INPUT FEILD */}
              {isEditMode ? (
                <input
                  className="text-2xl font-bold border px-2 py-1"
                  value={editFirstName}
                  onChange={(e) => setEditFirstName(e.target.value)}
                />
              ) : (
                <h2 className="text-2xl font-bold">{user.firstName}</h2>
              )}

              <p className="text-sm text-black/60">
                Joined {new Date(user.createdAt).toLocaleDateString()}{" "}
                {/* WE TAKE THE CREATED AT FROM DB TO DISPLAY JOINED DATE HERE */}
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
              <div>
                <button
                  onClick={handleDelete}
                  className="text-2xl font-extrabold text-red-600 cursor-pointer"
                >
                  {" "}
                  Delete Account{" "}
                </button>
              </div>
            </div>

            <div className="flex gap-4 mt-10">
              {!isEditMode ? (
                <button
                  onClick={() => {
                    setEditFirstName(user.firstName); // copy backend value into temp state
                    setEditMode(true);
                  }}
                  className="flex-1 border py-2 cursor-pointer hover:bg-black/5"
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    onClick={handlesave}
                    className="flex-1 bg-black text-white py-2"
                  >
                    Save
                  </button>

                  <button
                    onClick={() => {
                      setEditMode(false); // exit edit mode
                      setEditFirstName(user.firstName); // discard edits
                    }}
                    className="flex-1 border py-2 hover:bg-black/5"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
