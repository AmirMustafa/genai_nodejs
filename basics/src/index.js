import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function run() {
  const userInput = "What is the meaning of life?";

  const response = await openai.chat.completions.create({
    model: "gpt-5.4-mini", // ✅ cheapest good model
    messages: [
      {
        role: "user",
        content: `${userInput} Answer in max 2 lines. Keep answers short and concise`,
      },
    ],
    max_completion_tokens: 50, // ✅ biggest cost control
    temperature: 0.5, // ✅ stable (less randomness = less tokens sometimes)
    top_p: 1, // optional
  });

  console.log(`Response: ${response.choices[0].message.content}`);
}

run();
