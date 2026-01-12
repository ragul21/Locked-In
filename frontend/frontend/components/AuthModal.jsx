"use client";
import { useState } from "react";

export default function AuthModal({ mode, onClose }) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmitButton = async () => {
    if (mode === "login") {
      //this is for login
      if (!email || !password) {
        setError("Please fill all fields");
        return;
      }

      setError("");

      const response = await fetch("http://localhost:4000/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message);
        return;
      }

      onClose();
      window.location.href = "/dashboard";
      return;
    }

    //this is for signup
    if (!firstName || !email || !password) {
      setError("please fill all the fields");

      return;
    }
    {
      /* basic frontend validation check to notify the user */
    }
    const trimmed_email = email.trim();
    if (
      !email.includes("@") ||
      !email.includes(".") ||
      trimmed_email.includes(" ")
    ) {
      setError("please enter valid email ");
      return;
    }

    if (password.length < 6) {
      setError("Password must be atleast 6 characters long");
      return;
    }

    setError("");

    const response = await fetch("http://localhost:4000/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // we check the fetch response if its ok == true we allow user to go to dashboard
        //if not we stop and show the error message inline
        firstName,
        email,
        password,
      }),
    });
    if (response.ok == false) {
      const date = await response.json(); // this will take time as we have to read the stream and wait till we get all the chunks of text
      setError(date.message); // fetch returns us the promise object with meta date fast but body will be still streaming from the source or buffered , this is how its designed
      return;
    }
    onClose();
    window.location.href = "/dashboard";
  };

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
        {/* Title */}
        <h2 className="text-2xl font-bold mb-2">
          {mode === "login" ? "Welcome back" : "Create your account"}
        </h2>
        {/* Subtitle */}
        <p className="text-black/60 mb-6">
          {mode === "login"
            ? "Sign in to your account to continue"
            : "Start your first session in minutes"}
        </p>
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
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="••••••••"
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>
        {error && <p className="text-red-600 text-sm mt - 2 ">{error}</p>}{" "}
        {/* conditional rendering for inline error */}
        {/* Action button */}
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
