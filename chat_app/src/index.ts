import { OpenAI } from "openai";
import dotenv from "dotenv";
import promptSync from "prompt-sync";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function run() {
  const input = promptSync({ sigint: true });

  while (true) {
    const userInput = input("") as string;

    if (userInput.toLowerCase() === "exit") {
      console.log("Exiting chat");
      break;
    }

    const response = await openai.chat.completions.create({
      model: "gpt-5.4-mini",
      messages: [
        {
          role: "user",
          content: `${userInput} Answer in max 2 lines. Keep answers short and concise`,
        },
      ],
    });
    console.log(
      `Response: ${response.choices[0]?.message?.content ?? "No Response"}`,
    );
  }
}

run();
