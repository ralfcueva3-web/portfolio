import { create } from 'zustand';

export type CursorVariant = 'default' | 'hover' | 'text' | 'hidden';

export interface AppState {
  /** Whether the loading screen is showing */
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;

  /** Current cursor variant for the magnetic cursor */
  cursorVariant: CursorVariant;
  setCursorVariant: (variant: CursorVariant) => void;
  cursorText: string;
  setCursorText: (text: string) => void;

  /** Whether the AI chat widget is open */
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
  toggleChat: () => void;

  /** Active section for nav highlighting */
  activeSection: string;
  setActiveSection: (section: string) => void;
}

/**
 * Global application Zustand store managing loading screen, cursor variant,
 * AI chat dialog state, and active navigation section.
 */
export const useAppStore = create<AppState>((set) => ({
  isLoading: true,
  setIsLoading: (loading) => set({ isLoading: loading }),

  cursorVariant: 'default',
  setCursorVariant: (variant) => set({ cursorVariant: variant }),
  cursorText: '',
  setCursorText: (text) => set({ cursorText: text }),

  isChatOpen: false,
  setIsChatOpen: (open) => set({ isChatOpen: open }),
  toggleChat: () => set((s) => ({ isChatOpen: !s.isChatOpen })),

  activeSection: '',
  setActiveSection: (section) => set({ activeSection: section }),
}));
