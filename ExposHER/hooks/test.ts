import { GoogleGenAI } from "@google/genai";

const ai: GoogleGenAI = new GoogleGenAI({ apiKey: "api_key" });

async function main(): Promise<void> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: "Can you give me a short roadmap if I wanted to become a cybersecurity analyst.",
    });

    // Print the response to command prompt
    console.log("AI Response:");
    console.log("------------");
    console.log(response.text);
    console.log("------------");
  } catch (error) {
    console.error("Error generating content:", error);
  }
}

// Execute the main function
main().catch(error => console.error("Unhandled error:", error));