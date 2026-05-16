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
    content: "What is the current time in New York?",
  },
];

// Creating out own tool / function to get the current time in New York
function getTimeInNewYork() {
  return new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
}

async function callOpenAITools() {
  const response = await openai.chat.completions.create({
    model: "gpt-5.4-mini",
    messages: context,
    tools: [
      {
        type: "function",
        function: {
          name: "getTimeInNewYork",
          description: "Get the current time in New York",
        },
      },
    ],
    tool_choice: "auto", // Let the model decide when to call the tool
  });

  // step 2 - check if the model wants to call the tool
  const willInvokeTool = response.choices[0]?.finish_reason === "tool_calls";
  const toolCall = response.choices[0]?.message.tool_calls?.[0];

  if (willInvokeTool && toolCall) {
    const toolName = "function" in toolCall ? toolCall.function.name : "";

    if (toolName === "getTimeInNewYork") {
      const time = getTimeInNewYork();
      const responseMessage = response.choices[0]?.message;

      if (responseMessage) {
        context.push(responseMessage);
      }

      context.push({
        role: "tool",
        content: time,
        tool_call_id: toolCall?.id ?? "",
      });
    }
  }

  const secondResponse = await openai.chat.completions.create({
    model: "gpt-5.4-mini",
    messages: context,
  });

  const responseMessage = secondResponse.choices[0]?.message;
  console.log(responseMessage?.content);
}

callOpenAITools();
