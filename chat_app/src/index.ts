import { OpenAI } from "openai";
import dotenv from "dotenv";
import promptSync from "prompt-sync";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

type Context = {
  role: "system" | "user" | "assistant";
  content: string;
}[];

const context: Context = [
  {
    role: "system",
    content:
      "You are a helpful assistant. Answer in max 2 lines. Keep answers short and concise`",
  },
  {
    role: "user",
    content: "Hello, how are you?",
  },
];

async function chatCompletions() {
  const response = await openai.chat.completions.create({
    model: "gpt-5.4-mini",
    messages: context,
  });

  const responseMessage = response.choices[0]?.message;

  context.push({
    role: "assistant",
    content: responseMessage?.content ?? "No response",
  });
  console.log(`
    Role: ${response.choices[0]?.message?.role}
    Content: ${response.choices[0]?.message?.content}
`);
}

async function run() {
  const input = promptSync({ sigint: true });

  while (true) {
    const userInput = input("") as string;

    if (userInput.toLowerCase() === "exit") {
      console.log("Exiting chat");
      break;
    }

    context.push({
      role: "user",
      content: userInput,
    });

    await chatCompletions();
  }
}

run();
