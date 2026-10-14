// BUILT-BY: opus-4.6
import { NextRequest, NextResponse } from 'next/server';
import { streamChat, type ChatMessage } from '@/lib/ai';
import { sanitizeInput } from '@/lib/sanitize';
import { isRateLimited, getClientIp } from '@/lib/rate-limit';

/**
 * POST /api/chat — Streaming AI chat endpoint.
 * Groq primary, Gemini fallback.
 */
export async function POST(request: NextRequest) {
  // Rate limiting
  const ip = getClientIp(request);
  if (isRateLimited(ip, 20, 60000)) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait a moment.' },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const messages: ChatMessage[] = (body.messages || []).map(
      (m: { role: string; content: string }) => ({
        role: m.role as 'user' | 'assistant',
        content: sanitizeInput(m.content, 1000),
      })
    );

    if (messages.length === 0) {
      return NextResponse.json({ error: 'No messages provided.' }, { status: 400 });
    }

    const stream = await streamChat(messages);
    const encoder = new TextEncoder();

    const readableStream = new ReadableStream({
      async start(controller) {
        const reader = stream.getReader();
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            controller.enqueue(encoder.encode(value));
          }
        } catch (error) {
          console.error('Stream error:', error);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Transfer-Encoding': 'chunked',
      },
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'AI service unavailable. Please try again later.' },
      { status: 503 }
    );
  }
}
