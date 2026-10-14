// BUILT-BY: opus-4.6
'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useAppStore } from '@/stores/app-store';
import { commandPaletteActions } from '@/../../data/content';
import {
  FiSearch, FiArrowRight, FiSun, FiMoon, FiMessageCircle,
  FiCopy, FiDownload, FiExternalLink, FiHash,
} from 'react-icons/fi';

/**
 * Command Palette — Cmd/Ctrl+K to open.
 * Search, navigate, toggle theme, open chat, copy email, etc.
 */
export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { setTheme, resolvedTheme } = useTheme();
  const toggleChat = useAppStore((s) => s.toggleChat);

  // Open with Cmd/Ctrl+K
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setQuery('');
      setActiveIdx(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Filter actions
  const filtered = useMemo(() => {
    if (!query.trim()) return commandPaletteActions;
    const q = query.toLowerCase();
    return commandPaletteActions.filter(
      (a) => a.label.toLowerCase().includes(q) || a.section.toLowerCase().includes(q)
    );
  }, [query]);

  // Group by section
  const grouped = useMemo(() => {
    const map = new Map<string, typeof filtered>();
    for (const item of filtered) {
      const group = map.get(item.section) || [];
      group.push(item);
      map.set(item.section, group);
    }
    return map;
  }, [filtered]);

  // Flatten for keyboard nav
  const flatItems = useMemo(() => filtered, [filtered]);

  // Reset active index when filter changes
  useEffect(() => {
    setActiveIdx(0);
  }, [query]);

  // Scroll active item into view
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-idx="${activeIdx}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [activeIdx]);

  const executeAction = useCallback((item: typeof commandPaletteActions[0]) => {
    setOpen(false);
    switch (item.action) {
      case 'navigate':
        document.querySelector(item.target)?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'theme':
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
        break;
      case 'chat':
        toggleChat();
        break;
      case 'copy-email':
        navigator.clipboard.writeText(item.target);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        break;
      case 'download':
        window.open(item.target, '_blank');
        break;
      case 'link':
        router.push(item.target);
        break;
      case 'external':
        window.open(item.target, '_blank');
        break;
    }
  }, [resolvedTheme, setTheme, toggleChat, router]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, flatItems.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && flatItems[activeIdx]) {
      e.preventDefault();
      executeAction(flatItems[activeIdx]);
    }
  };

  const getIcon = (action: string) => {
    switch (action) {
      case 'navigate': return <FiHash size={14} />;
      case 'theme': return resolvedTheme === 'dark' ? <FiSun size={14} /> : <FiMoon size={14} />;
      case 'chat': return <FiMessageCircle size={14} />;
      case 'copy-email': return <FiCopy size={14} />;
      case 'download': return <FiDownload size={14} />;
      case 'link': return <FiArrowRight size={14} />;
      case 'external': return <FiExternalLink size={14} />;
      default: return <FiArrowRight size={14} />;
    }
  };

  let globalIdx = -1;

  return (
    <>
      {/* Copied toast */}
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[70] bg-accent text-white px-4 py-2 font-mono text-xs tracking-wider uppercase"
          >
            Email copied!
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* Panel */}
            <motion.div
              className="fixed inset-x-0 top-[15vh] z-[61] mx-auto w-full max-w-lg px-4"
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.15 }}
            >
              <div
                className="bg-bg-card border border-border-primary shadow-lg overflow-hidden"
                role="dialog"
                aria-label="Command palette"
                onKeyDown={handleKeyDown}
              >
                {/* Search input */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-border-primary">
                  <FiSearch size={16} className="text-text-muted shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Type a command or search..."
                    className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none font-mono"
                  />
                  <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 font-mono text-[10px] text-text-muted border border-border-primary">
                    ESC
                  </kbd>
                </div>

                {/* Results */}
                <div ref={listRef} className="max-h-[50vh] overflow-y-auto py-2" data-lenis-prevent>
                  {flatItems.length === 0 && (
                    <div className="px-4 py-8 text-center text-text-muted text-sm font-mono">
                      No results for &quot;{query}&quot;
                    </div>
                  )}

                  {[...grouped.entries()].map(([section, items]) => (
                    <div key={section}>
                      <div className="px-4 py-1.5 font-mono text-[10px] text-text-muted uppercase tracking-widest">
                        {section}
                      </div>
                      {items.map((item) => {
                        globalIdx++;
                        const idx = globalIdx;
                        const isActive = idx === activeIdx;
                        return (
                          <button
                            key={item.id}
                            data-idx={idx}
                            onClick={() => executeAction(item)}
                            onMouseEnter={() => setActiveIdx(idx)}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors cursor-pointer ${
                              isActive
                                ? 'bg-surface-hover text-text-primary border-l-2 border-accent'
                                : 'text-text-secondary hover:text-text-primary border-l-2 border-transparent'
                            }`}
                          >
                            <span className={`shrink-0 ${isActive ? 'text-accent' : 'text-text-muted'}`}>
                              {getIcon(item.action)}
                            </span>
                            <span className="flex-1">{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>

                {/* Footer hint */}
                <div className="px-4 py-2 border-t border-border-primary flex items-center gap-4 text-text-muted">
                  <span className="font-mono text-[10px]">↑↓ Navigate</span>
                  <span className="font-mono text-[10px]">↵ Select</span>
                  <span className="font-mono text-[10px]">Esc Close</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
