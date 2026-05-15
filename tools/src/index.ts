import { OpenAI } from "openai";
// import promptSync from "prompt-sync";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const context: OpenAI.ChatCompletionMessageParam[] = [
  {
    role: "system",
    content:
      "You are a helpful assistant. Answer in max 2 lines. Keep answers short and concise",
  },
  {
    role: "user",
    content: "What is the current time in UAE?",
  },
];

async function callOpenAITools() {
  const response = await openai.chat.completions.create({
    model: "gpt-5.4-mini",
    messages: context,
  });

  const responseMessage = response.choices[0]?.message;

  console.log(responseMessage?.content);
}

callOpenAITools();
