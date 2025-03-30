import axios from "axios";

const API_KEY = "api_key"; // Replace with your actual API key
const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateText?key=${API_KEY}`;


interface GeminiResponse {
  candidates?: { output?: string }[];
}

export const getGeminiResponse = async (prompt: string): Promise<string> => {
  try {
    const response = await axios.post<GeminiResponse>(
        API_URL,
        {
          contents: [{ parts: [{ text: prompt }] }], // Correct request format
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

    return response.data.candidates?.[0]?.output || "No response received.";
  } catch (error:) {
    console.error("Error fetching Gemini API:", error.response?.data || error.message);
    return "Error generating response.";
  }
};

// Hardcoded prompt test
const testPrompt = async () => {
    console.log("Testing Gemini API...");
    const response = await getGeminiResponse("Tell me a fun fact about space.");
    console.log("Gemini API Response:", response);
  };
  
  // Run the test function if this file is executed directly
  if (require.main === module) {
    testPrompt();
  }