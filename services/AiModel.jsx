import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.EXPO_PUBLIC_OPENROUTER_API_KEY,
});

export const CalculateCaloriesAI = async (PROMPT) =>
  await openai.chat.completions.create({
    model: "meta-llama/llama-3-70b-instruct",
    messages: [{ role: "user", content: PROMPT }],
  });

// console.log(CalculateCalories.choices[0].message);
