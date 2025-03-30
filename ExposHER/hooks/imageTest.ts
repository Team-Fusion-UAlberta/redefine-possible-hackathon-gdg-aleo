import { GoogleGenAI } from "@google/genai";
import * as fs from "fs";
import * as path from "path";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "api_key" });

async function generateImage(): Promise<void> {
    const inputImagePath = path.join(__dirname, "../assets/images/geminiprofilepicture.png");
    
    try {
        const imageData = fs.readFileSync(inputImagePath);
        const base64Image = imageData.toString('base64');

        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash-exp-image-generation',
            contents: [
                { text: "Can you create an image of me standing next to a cat?" },
                { 
                    inlineData: {
                        mimeType: 'image/png',
                        data: base64Image
                    }
                }
            ]
        });

        if (!response.candidates?.[0]?.content?.parts) {
            throw new Error("No response parts found");
        }

        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData?.data) {  // Added null check here
                const outputDir = path.join(__dirname, "../assets/images");
                if (!fs.existsSync(outputDir)) {
                    fs.mkdirSync(outputDir, { recursive: true });
                }
                
                const outputPath = path.join(outputDir, "edited-image.png");
                fs.writeFileSync(outputPath, Buffer.from(part.inlineData.data, 'base64'));
                console.log(`✅ Edited image saved to: ${outputPath}`);
            } else if (part.text) {
                console.log("📝 Text response:", part.text);
            }
        }
    } catch (error) {
        console.error("❌ Error:", error instanceof Error ? error.message : error);
    }
}

generateImage().catch(console.error);