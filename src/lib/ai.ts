// BUILT-BY: opus-4.6
import Groq from 'groq-sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';

// Load knowledge base at module level (cached)
const knowledgePath = path.join(process.cwd(), 'data', 'knowledge.md');
let knowledgeBase = '';
try {
  knowledgeBase = fs.readFileSync(knowledgePath, 'utf-8');
} catch {
  console.warn('Knowledge base not found at', knowledgePath);
}

const SYSTEM_PROMPT = `You are an AI assistant embedded in Ayush's (Kova) developer portfolio at Kova.dev. Answer questions about his background, skills, projects, and experience based on the knowledge base below.

Rules:
- Be concise, professional, and slightly informal (match the site's tone)
- Only answer questions related to Ayush's professional background
- If asked about unrelated topics, redirect: "I'm here to talk about Ayush's work. Ask about his skills, projects, or experience."
- Keep responses under 150 words unless more detail is requested
- Use markdown formatting for lists and code when appropriate
- Never make up information not in the knowledge base

--- KNOWLEDGE BASE ---
${knowledgeBase}
--- END KNOWLEDGE BASE ---`;

// Initialize clients
const groqClient = process.env.GROQ_API_KEY ? new Groq({ apiKey: process.env.GROQ_API_KEY }) : null;
const geminiClient = process.env.GOOGLE_AI_API_KEY ? new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY) : null;

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

/**
 * Stream chat response using Groq (primary) with Gemini fallback.
 * Returns a ReadableStream of text chunks.
 */
export async function streamChat(messages: ChatMessage[]): Promise<ReadableStream<string>> {
  if (groqClient) {
    try {
      return await streamFromGroq(messages);
    } catch (error) {
      console.error('Groq failed, trying Gemini fallback:', error);
    }
  }

  if (geminiClient) {
    return await streamFromGemini(messages);
  }

  throw new Error('No AI provider configured. Set GROQ_API_KEY or GOOGLE_AI_API_KEY.');
}

async function streamFromGroq(messages: ChatMessage[]): Promise<ReadableStream<string>> {
  const stream = await groqClient!.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages.map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content })),
    ],
    stream: true,
    max_tokens: 500,
    temperature: 0.7,
  });

  return new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const text = chunk.choices[0]?.delta?.content;
        if (text) controller.enqueue(text);
      }
      controller.close();
    },
  });
}

async function streamFromGemini(messages: ChatMessage[]): Promise<ReadableStream<string>> {
  const model = geminiClient!.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const chat = model.startChat({
    history: [
      { role: 'user', parts: [{ text: 'System context: ' + SYSTEM_PROMPT }] },
      { role: 'model', parts: [{ text: "Understood. I'll act as Ayush's portfolio assistant." }] },
      ...messages.slice(0, -1).map((m) => ({
        role: m.role === 'user' ? ('user' as const) : ('model' as const),
        parts: [{ text: m.content }],
      })),
    ],
  });

  const lastMessage = messages[messages.length - 1];
  const result = await chat.sendMessageStream(lastMessage.content);

  return new ReadableStream({
    async start(controller) {
      for await (const chunk of result.stream) {
        const text = chunk.text();
        if (text) controller.enqueue(text);
      }
      controller.close();
    },
  });
}

/**
 * Generate a project summary tailored to a specific audience role.
 */
export async function generateSummary(
  projectId: string,
  role: 'recruiter' | 'engineer' | 'founder'
): Promise<string> {
  const { projects } = await import('../../data/content');
  const project = projects.find((p) => p.id === projectId);
  if (!project) throw new Error(`Project ${projectId} not found`);

  const rolePrompts: Record<string, string> = {
    recruiter:
      'Explain this project to a technical recruiter. Focus on impact, scale, and technologies. 2-3 sentences.',
    engineer:
      'Explain this project to a senior engineer. Focus on architecture, technical challenges, and implementation. 3-4 sentences.',
    founder:
      'Explain this project to a startup founder. Focus on business value, user impact, and product thinking. 2-3 sentences.',
  };

  const prompt = `${rolePrompts[role]}\n\nProject: ${project.title}\nDescription: ${project.longDescription}\nTech Stack: ${project.stack.join(', ')}`;

  if (groqClient) {
    const response = await groqClient.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 200,
      temperature: 0.7,
    });
    return response.choices[0]?.message?.content || 'Unable to generate summary.';
  }

  if (geminiClient) {
    const model = geminiClient.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    return result.response.text();
  }

  throw new Error('No AI provider configured.');
}
