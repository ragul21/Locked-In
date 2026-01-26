import express from "express";

const router = express.Router();

router.post("/demo-review", async (req, res) => {
  /* we are extracting the data from the request body */
  const { githubLink, designSummary } = req.body;

  /* if there is not github link send error response */
  if (!githubLink) {
    return res.status(400).json({ error: "GitHub link is required" });
  }

  try {
    /* THIS IS THE PROMPT THAT I AM SENDING TO THE AI , TO GENERATE THE OUTPUT */
    const prompt = `You are an expert software development mentor reviewing a student's project.

**GitHub Repository:** ${githubLink}

**Student's Notes:**
${designSummary || "No additional notes provided"}

Provide professional feedback covering:

## 📊 Project Assessment
Your analysis of the project

## 💡 Strengths
What they did well

## 🎯 Improvements
Specific suggestions

## ⭐ Overall Rating
Rate out of 10 and encourage them

Keep it constructive and professional.`;

    /* I AM USING FREE GROQ API FOR ANALYSIS */

    /* BACKEND IS MAKING A REQUEST TO THE GROQ API TO DO THE ANALYSIS OF THE PROJECT SUBMISSION */

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          /* secret api key that is stored in the env variables  */
          /* proves that i have permission to use the API */
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile", // MODEL THAT I WANT IS ATTACHED IN THE BODY OF THE REQUEST
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],

          /* how creative and deterministic the AI is  */
          temperature: 0.7,

          /* controls the response limit of the model */
          max_tokens: 2000,
        }),
      },
    );

    /* if the response is not ok then we throw an error object with error message that we got from the groq api */
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Groq API error:", errorData);
      throw new Error(errorData.error?.message || "AI request failed");
    }

    /* This only runs if the we get success from the groq api  */
    /* we parse the response text into js object  */
    const data = await response.json();

    /* this is the actual AI response that resides in the data */
    /* THIS WILL HAVE THE RESPONSE THAT WE ARE GOING TO SHOW IN THE UI Page  */
    const aiReview = data.choices[0].message.content;

    /* sending this back to the user to show it in the UI */
    res.json({
      success: true,
      aiReview: aiReview,
      githubLink: githubLink,
      designSummary: designSummary,
    });
  } catch (err) {
    /* catch will handle the error object if AI throws any error response */
    console.error("Review error:", err);
    res.status(500).json({
      error: "Failed to generate review",
      details: err.message,
    });
  }
});

export default router;
