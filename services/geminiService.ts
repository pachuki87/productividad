
import { GoogleGenAI, Type } from "@google/genai";
import { WeeklyData } from '../types';

export const getProductivityInsights = async (data: WeeklyData) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `Analyze the following weekly productivity data:
  Week Starting: ${data.weekStart}
  Days Progress: ${data.days.map(d => `${d.name}: ${d.progress}%`).join(', ')}
  Habits performance: ${data.habits.map(h => `${h.name}: ${Math.round((h.history.filter(v => v).length / 7) * 100)}%`).join(', ')}
  
  Provide a short, motivating summary in Spanish (max 3 sentences) and 3 specific tips for the upcoming week.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      }
    });

    return response.text || "No se pudieron obtener insights en este momento.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Ocurrió un error al contactar a la IA.";
  }
};
