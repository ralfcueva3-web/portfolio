// BUILT-BY: opus-4.6
'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageCircle, FiX, FiSend, FiCornerDownLeft } from 'react-icons/fi';
import { useAppStore } from '@/stores/app-store';
import { suggestedQuestions } from '@/../../data/content';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isStreaming?: boolean;
}

/**
 * "Ask My Portfolio" floating chat widget.
 * Streams responses from /api/chat, styled to match editorial design.
 * Supports suggested question chips, markdown rendering, and keyboard nav.
 */
export default function ChatWidget() {
  const isChatOpen = useAppStore((s) => s.isChatOpen);
  const toggleChat = useAppStore((s) => s.toggleChat);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isChatOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isChatOpen]);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: content.trim(),
    };

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: '',
      isStreaming: true,
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to get response');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        let accumulated = '';
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          accumulated += decoder.decode(value, { stream: true });
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMessage.id
                ? { ...m, content: accumulated }
                : m
            )
          );
        }
        // Mark streaming as complete
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMessage.id
              ? { ...m, isStreaming: false }
              : m
          )
        );
      }
    } catch (error) {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMessage.id
            ? {
                ...m,
                content: 'Sorry, I couldn\'t process that. Please try again.',
                isStreaming: false,
              }
            : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Floating trigger button */}
      <motion.button
        onClick={toggleChat}
        className={cn(
          'fixed bottom-6 right-6 z-50 w-12 h-12 flex items-center justify-center',
          'border border-border-primary bg-bg-card text-text-primary',
          'hover:border-accent hover:text-accent transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
          isChatOpen && 'hidden'
        )}
        style={{ borderRadius: '50%' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open AI chat assistant"
      >
        <FiMessageCircle size={20} />
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] h-[520px] max-h-[calc(100vh-6rem)] flex flex-col bg-bg-card border border-border-primary shadow-lg"
            role="dialog"
            aria-label="AI Portfolio Assistant"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border-primary">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success" />
                <span className="font-mono text-xs text-text-secondary tracking-wide uppercase">
                  Ask my portfolio
                </span>
              </div>
              <button
                onClick={toggleChat}
                className="w-7 h-7 flex items-center justify-center text-text-muted hover:text-text-primary transition-colors"
                aria-label="Close chat"
              >
                <FiX size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4" data-lenis-prevent>
              {messages.length === 0 && (
                <div className="space-y-4">
                  <p className="text-text-secondary text-sm">
                    Ask me anything about Raman&apos;s work, skills, or projects.
                  </p>
                  {/* Suggested chips */}
                  <div className="flex flex-wrap gap-2">
                    {suggestedQuestions.map((q) => (
                      <button
                        key={q}
                        onClick={() => sendMessage(q)}
                        className="text-xs px-3 py-1.5 border border-border-primary text-text-secondary hover:text-accent hover:border-accent transition-colors font-mono"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    'text-sm leading-relaxed',
                    message.role === 'user'
                      ? 'text-text-primary pl-8'
                      : 'text-text-secondary'
                  )}
                >
                  {message.role === 'user' && (
                    <div className="font-mono text-[10px] text-accent mb-1 uppercase tracking-wider">
                      You
                    </div>
                  )}
                  {message.role === 'assistant' && (
                    <div className="font-mono text-[10px] text-text-muted mb-1 uppercase tracking-wider">
                      Ralph.ai
                    </div>
                  )}
                  <div className="prose prose-sm prose-invert max-w-none [&_p]:m-0 [&_ul]:my-1 [&_li]:my-0">
                    {message.role === 'assistant' ? (
                      <ReactMarkdown>{message.content || '...'}</ReactMarkdown>
                    ) : (
                      <p>{message.content}</p>
                    )}
                  </div>
                  {message.isStreaming && (
                    <span className="inline-block w-1.5 h-4 bg-accent animate-pulse ml-0.5" />
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="px-4 py-3 border-t border-border-primary">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask something..."
                  disabled={isLoading}
                  className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none font-body"
                  aria-label="Chat message"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="w-8 h-8 flex items-center justify-center text-text-muted hover:text-accent disabled:opacity-30 transition-colors"
                  aria-label="Send message"
                >
                  {isLoading ? (
                    <span className="w-4 h-4 border border-text-muted border-t-accent rounded-full animate-spin" />
                  ) : (
                    <FiCornerDownLeft size={16} />
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
