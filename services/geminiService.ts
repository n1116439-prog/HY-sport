
import { GoogleGenAI } from "@google/genai";

export async function askCaptainSmart(prompt: string, context: string): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: `You are a helpful sports activity captain named Kevin. 
        Context of the activity: ${context}. 
        Answer the user's question politely and concisely in Traditional Chinese (zh-TW). 
        Keep it friendly and encouraging.`
      }
    });
    return response.text || "抱歉，目前無法回應。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "系統忙碌中，請稍後再試。";
  }
}
