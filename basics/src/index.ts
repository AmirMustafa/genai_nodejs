import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function run() {
  const userInput = "How to learn AI with Node and Pythons ?";

  const response = await openai.chat.completions.create({
    model: "gpt-5.4-mini", // ✅ cheapest good model
    messages: [
      {
        role: "user",
        content: `${userInput} Answer in max 2 lines. Keep answers short and concise`,
      },
      //   {
      //     role: "system",
      //     content: `You are a helpful assistant for learning AI with Node and Python. Provide concise and informative answers to user questions about AI, Node.js, and Python. Keep responses short and to the point.`,
      //   },
      //   {
      //     role: "assistant",
      //     content: `Sure! To learn AI with Node and Python, start with online courses on platforms like Coursera or Udemy. Practice coding AI projects using libraries like TensorFlow.js for Node and TensorFlow or PyTorch for Python.`,
      //   },
    ],
    max_completion_tokens: +process.env.MAX_COMPLETION_TOKENS || 50, // ✅ biggest cost control
    temperature: +process.env.TEMPERATURE || 0.5, // ✅ stable (less randomness = less tokens sometimes)
    top_p: +process.env.TOP_P || 1, // optional
  });

  console.log(`Response: ${response.choices[0].message.content}`);
}

run();
