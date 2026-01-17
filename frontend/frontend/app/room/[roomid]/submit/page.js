"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SubmitPage() {
  const router = useRouter(); // to navigate to next page nextjs router function

  const [docLink, setDocLink] = useState(""); // using states for forcing user to provide values for submission
  const [githubLink, setGithubLink] = useState("");
  const [notes, setNotes] = useState("");

  const isSubmitDisabled = !docLink.trim() || !githubLink.trim(); //only when both false we get true to let user click the button

  const handleSubmit = () => {
    if (isSubmitDisabled) return;

    // later: send to backend
    // for now: just go back to dashboard
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md border border-black p-8 flex flex-col gap-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Submit Your Work</h1>
          <p className="text-sm text-black/70 mt-2">
            The session has ended. Please submit your work below.
          </p>
        </div>

        {/* document link */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Document Link *</label>
          <input
            type="text"
            value={docLink}
            onChange={(e) => setDocLink(e.target.value)}
            placeholder="https://docs.google.com/..."
            className="border border-black px-3 py-2 outline-none"
          />
        </div>

        {/* git hub link */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">GitHub Repository *</label>
          <input
            type="text"
            value={githubLink}
            onChange={(e) => setGithubLink(e.target.value)}
            placeholder="https://github.com/username/repo"
            className="border border-black px-3 py-2 outline-none"
          />
        </div>

        {/* additional notes */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">
            Additional Notes (optional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            placeholder="Anything you'd like to add..."
            className="border border-black px-3 py-2 outline-none resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
          className={`mt-4 px-4 py-2 border border-black font-semibold transition
            ${
              isSubmitDisabled
                ? "bg-white text-black opacity-50 cursor-not-allowed"
                : "bg-black text-white hover:bg-black/90"
            }`}
        >
          Submit Work
        </button>
      </div>
    </div>
  );
}
