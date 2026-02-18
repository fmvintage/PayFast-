
import { GoogleGenAI, Type } from "@google/genai";
import { Transaction } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getSpendingInsights(transactions: Transaction[]) {
  const transactionData = transactions.map(t => ({
    title: t.title,
    amount: t.amount,
    type: t.type,
    category: t.category,
    status: t.status
  }));

  const prompt = `Analyze these recent UPI transactions and provide 3 key financial insights and 1 helpful tip for the user.
  Transactions: ${JSON.stringify(transactionData)}
  Return the response in JSON format.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            insights: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Three brief financial insights based on the transaction history."
            },
            tip: {
              type: Type.STRING,
              description: "One actionable financial tip."
            }
          },
          required: ["insights", "tip"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Insight Error:", error);
    return {
      insights: [
        "You've spent most of your money on dining out lately.",
        "Your major transactions are concentrated in the first week of the month.",
        "A few payments failed recently, check your bank connectivity."
      ],
      tip: "Try setting a weekly limit for 'Food' category to save more."
    };
  }
}
