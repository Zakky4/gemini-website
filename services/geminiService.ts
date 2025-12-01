import { GoogleGenAI, GenerateContentStreamResult } from "@google/genai";
import { Message } from "../types";

const SYSTEM_INSTRUCTION = `
You are "Aetheria", the AI Solutions Architect for Aetheria Code. 
Aetheria Code is a premium software development agency specializing in:
1. AI-Integrated Web Applications (RAG, Agents, LLM integration).
2. High-performance React & Next.js Systems.
3. Automated Business Workflows.

Your Tone: Professional, futuristic, concise, and helpful. You are knowledgeable but approachable.
Goal: Answer visitor questions about web development and AI, and encourage them to book a consultation for complex projects.

If asked about pricing: Mention that we offer bespoke solutions starting at $10,000 USD for MVP development, but specific quotes require a discovery call.
If asked about tech stack: We prefer React, TypeScript, Node.js, Python, and Google Cloud/AWS.

Keep responses under 100 words unless technical detail is requested. 
`;

let client: GoogleGenAI | null = null;

const getClient = () => {
  if (!client) {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.error("API Key not found");
      throw new Error("API Key is missing");
    }
    client = new GoogleGenAI({ apiKey });
  }
  return client;
};

export const streamChatResponse = async (
  history: Message[],
  newMessage: string
): Promise<GenerateContentStreamResult> => {
  const ai = getClient();
  
  // Transform history for the API
  // Note: We are using a simplified stateless approach for this demo or 
  // could use multi-turn chat if we maintained the chat object. 
  // For robustness in this stateless function, we send context + prompt.
  
  // In a real app, you'd likely use ai.chats.create() and keep the instance alive,
  // or pass full history in 'contents'. 
  // Here we will use generateContentStream with system instruction context.

  const model = 'gemini-2.5-flash';

  // Construct a prompt that includes history context visually for the model
  // since we aren't maintaining a stateful Chat object in this service function
  // to avoid complexity with React state/service synchronization for this specific demo.
  const conversationContext = history
    .map(m => `${m.role === 'user' ? 'Visitor' : 'Aetheria'}: ${m.content}`)
    .join('\n');

  const fullPrompt = `${conversationContext}\nVisitor: ${newMessage}\nAetheria:`;

  return await ai.models.generateContentStream({
    model: model,
    contents: fullPrompt,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
    }
  });
};
