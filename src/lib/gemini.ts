import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function diagnosePlant(imageData: string, mimeType: string = "image/jpeg") {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }

  const model = "gemini-3-flash-preview";
  
  const prompt = `
    You are a professional arborist and plant pathologist. 
    Analyze this photo of a plant. 
    Identify the plant if possible.
    Look for symptoms of pests, diseases, nutrient deficiencies, or environmental stress.
    Provide a concise clinical assessment.
    
    Return the response in JSON format with the following fields:
    {
      "plantName": "Common name",
      "scientificName": "Scientific name",
      "healthStatus": "Issue Detected | Healthy",
      "observation": "Brief description of what you see on the leaves/foliage",
      "diagnosis": "Specific plant issue or disease",
      "treatment": "Recommended treatment (e.g., apply organic fungicide)",
      "careAdjustment": "Recommended adjustment (e.g., reduce watering)",
      "recoveryEst": "Estimated recovery time (e.g., 14-21 Days)"
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: [
        {
          parts: [
            { text: prompt },
            {
              inlineData: {
                data: imageData.split(',')[1] || imageData,
                mimeType
              }
            }
          ]
        }
      ],
      config: {
        responseMimeType: "application/json"
      }
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("AI Diagnosis failed:", error);
    throw error;
  }
}
