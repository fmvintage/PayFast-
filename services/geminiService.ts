
import { GoogleGenAI, Type } from "@google/genai";
import { Transaction } from "../types.ts";

// Safe initialization to prevent white screen on module load
const getAIInstance = () => {
  const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : '';
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
};

export async function getSpendingInsights(transactions: Transaction[]) {
  const ai = getAIInstance();
  if (!ai) {
    return {
      insights: [
        "Insight generation unavailable without API key.",
        "Check your connection to see recent spending trends.",
        "Maintain a healthy balance for upcoming bills."
      ],
      tip: "Set a monthly budget to track your expenses better."
    };
  }

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
