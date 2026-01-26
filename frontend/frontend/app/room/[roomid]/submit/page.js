"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SubmitPage() {
  /* To navigate people to other pages */
  const router = useRouter();

  /* These are for state initialization  */
  /* For input reading , to read the input feilds  */

  const [githubLink, setGithubLink] = useState("");
  const [notes, setNotes] = useState("");

  /* This is to re render conditionally the review or loading  */
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState(null);

  /* button is only disabled if both the feilds are empty */
  const isSubmitDisabled = !githubLink.trim();

  const handleSubmit = async () => {
    /* if the feilds are empty return */
    if (isSubmitDisabled) return;

    /* render this loading state we are doing a async next and it will take time till that we will show the loading  */
    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/api/demo-review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          githubLink,
          designSummary: notes,
        }),
      });

      /* once i get the response i stringfy it and store it in the data variable  */
      const data = await res.json();

      /* now we have the AI response so we can run the state to show the response in the screen */
      setReview(data);
    } catch (err) {
      console.error("Submit failed", err);
    } finally {
      setLoading(false);
    }
  };

  /* If the loading is true then render this */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-lg font-medium">Reviewing your submission...</p>
        </div>
      </div>
    );
  }

  if (review) {
    return (
      <div className="min-h-screen bg-white p-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">AI Review</h1>
          <p className="text-gray-600 mb-6">
            <a
              href={review.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {review.githubLink}
            </a>
          </p>

          <div className="whitespace-pre-wrap">{review.aiReview}</div>

          <button
            onClick={() => {
              setReview(null);

              setGithubLink("");
              setNotes("");
            }}
            className="mt-8 px-6 py-2 bg-black text-white rounded font-medium hover:bg-gray-800"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md border border-black p-8 flex flex-col gap-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Submit Your Work</h1>
          <p className="text-sm text-black/70 mt-2">
            The session has ended. Please submit your work below.
          </p>
        </div>

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
