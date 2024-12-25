// Default
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY || "",
  dangerouslyAllowBrowser: true,
});

export async function getApiResponse(prompt: string): Promise<string> {
  try {
    if (!process.env.NEXT_PUBLIC_GROQ_API_KEY) {
      throw new Error(
        "API Key is missing. Please set NEXT_PUBLIC_GROQ_API_KEY."
      );
    }

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama3-8b-8192",
    });

    // Return the content of the response
    return completion.choices[0]?.message?.content || "No response received.";
  } catch (err) {
    console.error("Error fetching response:", err);
    return "Error fetching response. Please try again.";
  }
}
