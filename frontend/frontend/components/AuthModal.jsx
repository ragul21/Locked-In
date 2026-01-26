// ============================================================================================
//                                 SIGN UP AND LOGIN MODAL
// ============================================================================================

"use client";

/* WE ARE CONDITIONALLY RENDERING THE MODAL BASED ON MODE LOGIN OR SIGN UP AS WELL TO REMEMBER WHAT USER
TYPES IN THE INPUT FEILDS OF THE MODAL  */

import { useState } from "react";

//=============================COMPONENT==============================================================//

export default function AuthModal({ mode, onClose }) {
  //---------------STATES TO REMEMBER THE INPUT FEILDS USER TYPES IN MODAL---------------------//
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  //-------------------------------------------HANDLING THE SUBMIT BUTTON FOR BOTH LOGIN AND SIGN UP--------------------------------------------------------------------//

  const handleSubmitButton = async () => {
    /* BASIC VALIDATIONS IN THE UI , MAKING SURE USER GIVES ALL THE INPUT NEEDED FOR THE LOGIN MODAL */
    if (mode === "login") {
      //IF ANY ONE OF IT IS MISSING SHOW THE ERROR STATE IN THE UI PAGE
      if (!email || !password) {
        setError("Please fill all fields");
        return;
      }

      setError(""); // CLEAR ANY PREVIOUS ERROR RESPONSE

      /* SENDING AN FETCH RESPONSE TO THE LOGIN API OF BACKEND */

      const response = await fetch("http://localhost:4000/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }), //SENDING EMAIL AND PASSWORD IN THE LOGIN REQUEST AS THAT IS WHAT WE NEED
      });

      // ----------------PAUSED UNTILL WE GET THE RESPONSE OBJECT , THEN BELOW WE READ THE BODY OF THE RESPONSE OBJECT ----------------//

      const data = await response.json(); // getting the body out of response , which might be still streaming from source so i used await here

      if (!response.ok) {
        setError(data.message);
        return;
      }
      localStorage.setItem("token", data.token);
      onClose();
      window.location.href = "/dashboard";
      return;
    }

    // ------------------------- SIGN UP BUTTON HANDLING AND VALIDATIONS ------------------------/

    /* THIS BLOCK WILL RUN WHEN SIGN UP BUTTON TOGGLED */

    /* This below if condition is responsible for ensuring user filled all the fields of the modal */

    if (!firstName || !email || !password) {
      setError("please fill all the fields");

      return;
    }

    /* Below are the basic validations for inputs  */
    /* For email we are ensuring @ and . exsist and no spaces for the email */
    const trimmed_email = email.trim();
    if (
      !email.includes("@") ||
      !email.includes(".") ||
      trimmed_email.includes(" ")
    ) {
      setError("please enter valid email "); // if the email validation fails call the set error
      return;
    }

    /* This below if is for password validation , if the password length is lesser than 6
    call the error state */

    if (password.length < 6) {
      setError("Password must be atleast 6 characters long");
      return;
    }

    setError(""); // to clear the previous error response

    //-------------------------------validation part over---------------------------------------------------------//

    //-------------FETCH HAPPENS POST CLICKING THE SUBMIT BUTTON -------------------------------------------------//

    /* SENDS HTTP REQUEST TO THE BACKEND NODE JS SERVER WHICH IS LISTENING */

    const response = await fetch("http://localhost:4000/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        email,
        password,
      }),
    });

    // ----------------------------------WAITING FOR RESPONSE , FREEZED ! ----------------------------------------------------------------------------------------------------------------------------------------------------------------//

    //----------------------------------BELOW WONT RUN UNTILL WE GET THE RESPONSE FROM THE BACKEND AS ITS A TIME TAKING FUNCTION WHICH IS ASYNCHRONOUS BY NATURE---------------------------------------------------------------------------//

    const data = await response.json(); // this will take time as we have to read the stream and wait till we get all the chunks of text
    /* once we got all the stream of text in body , it will converted into a js object and we extract the value from the promise */
    // fetch returns us the promise object with meta date fast but body will be still streaming from the source or buffered , this is how its designed
    if (response.ok == false) {
      setError(data.message);
      return;
    }

    localStorage.setItem("token", data.token); //storing the token in localstorage of the browser that we got from the response
    onClose(); //closes the modal
    window.location.href = "/dashboard"; //takes me to the dashboard page with the token
  };

  // ----------------------------------------UI RENDERING -----------------------------------------//

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md rounded-lg p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end">
          <button className="text-xl" onClick={onClose}>
            &times;
          </button>
        </div>
        {/*------------------- LOGIN OR SIGN UP MODAL RENDERING UI --------------*/}
        {/* IF MODE IS SIGN UP SHOW CREATE YOUR ACCOUNT IN MODAL OR ELSE WELCOME BACK*/}
        <h2 className="text-2xl font-bold mb-2">
          {mode === "login" ? "Welcome back" : "Create your account"}
        </h2>
        {/* SUBTEXT BASED ON MODE LOGIN OR SIGNUP*/}
        <p className="text-black/60 mb-6">
          {mode === "login"
            ? "Sign in to your account to continue"
            : "Start your first session in minutes"}
        </p>
        {/* SUBTEXT BASED ON MODE LOGIN OR SIGNUP*/}
        <div className="space-y-4">
          {mode === "signup" && (
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium mb-1"
              >
                First Name
              </label>
              <input
                value={firstName} //show the value in react memory as user types
                onChange={(e) => setFirstName(e.target.value)} //change the state for every keystroke
                placeholder="John"
                className="w-full border rounded px-3 py-2"
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              value={email} //show the value in react memory as user types
              onChange={(e) => setEmail(e.target.value)} //change the state for every keystroke
              placeholder="you@example.com"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Password
            </label>
            <input
              value={password} //show the value in react memory as user types
              onChange={(e) => setPassword(e.target.value)} //change the state for every keystroke
              type="password"
              placeholder="••••••••"
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>
        {/* -------------------------------------------------------------------- */}
        {/* This below is the error message that will display at the
        bottom of the modal if the user missed any fields,below the password block  */}
        {error && <p className="text-red-600 text-sm mt - 2 ">{error}</p>}{" "}
        {/* conditional rendering for inline error */}
        {/*button rendering based on login or signup*/}
        <button
          onClick={handleSubmitButton}
          type="button"
          className="w-full bg-black text-white py-2.5 rounded-md font-semibold mt-6"
        >
          {mode === "login" ? "Sign In" : "Create Account"}
        </button>
      </div>
    </div>
  );
}
