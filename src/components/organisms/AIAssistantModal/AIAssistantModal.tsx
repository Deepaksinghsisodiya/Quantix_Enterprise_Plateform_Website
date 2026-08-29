'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  Send,
  X,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Calendar,
  GripHorizontal,
  Zap,
  DollarSign,
  ShieldCheck,
} from 'lucide-react';
import { useContactModal } from '@/context/ContactModalContext';

export interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  isActionable?: boolean;
  actionType?: 'BOOK_DEMO' | 'CONTACT_SALES';
}

export interface AIAssistantProps {
  variant?: 'floating' | 'embedded';
  title?: string;
  subtitle?: string;
  className?: string;
}

const QUICK_SUGGESTIONS = [
  {
    icon: <Zap className="h-3.5 w-3.5 text-primary" />,
    label: 'Multi-Store Chain Sync',
    query: 'How does Quantix handle multi-location chain sync?',
  },
  {
    icon: <DollarSign className="h-3.5 w-3.5 text-emerald-500" />,
    label: 'Enterprise Pricing',
    query: 'What is the Enterprise pricing structure?',
  },
  {
    icon: <Calendar className="h-3.5 w-3.5 text-blue-500" />,
    label: 'Book a Live Demo',
    query: 'I want to schedule a 1-on-1 enterprise demo',
  },
  {
    icon: <ShieldCheck className="h-3.5 w-3.5 text-amber-500" />,
    label: 'Offline Cloud Mode',
    query: 'Does Quantix POS work offline without internet?',
  },
];

export const AIAssistantModal: React.FC<AIAssistantProps> = ({
  variant = 'floating',
  title = "Quantix Enterprise AI",
  subtitle = "24/7 Smart Lead & Chain Operations Advisor",
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(variant === 'embedded');
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const { openModal } = useContactModal();
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: '👋 Welcome to Quantix Enterprise! I am your AI Lead & Chain Operations Advisor. How can I assist your business today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  // Auto scroll to bottom
  useEffect(() => {
    if (isOpen || variant === 'embedded') {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping, variant]);

  const handleOpenToggle = () => {
    if (variant === 'embedded') return;
    setIsOpen(!isOpen);
    if (!isOpen) setHasUnread(false);
  };

  const generateAIResponse = async (userQuery: string) => {
    setIsTyping(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userQuery, platform: 'Quantix Enterprise' }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.reply) {
          addMessage('ai', data.reply, data.isActionable, data.actionType);
          setIsTyping(false);
          return;
        }
      }
    } catch {
      // Fallback
    }

    // Intelligent Enterprise KB engine
    setTimeout(() => {
      const lower = userQuery.toLowerCase();
      let responseText = "";
      let action: 'BOOK_DEMO' | 'CONTACT_SALES' | undefined = undefined;

      if (lower.includes('demo') || lower.includes('schedule') || lower.includes('book') || lower.includes('meeting')) {
        responseText = "I would be happy to schedule a 1-on-1 live demonstration with an Enterprise POS Specialist! Click below to select your preferred date & time.";
        action = 'BOOK_DEMO';
      } else if (lower.includes('pricing') || lower.includes('cost') || lower.includes('plan') || lower.includes('price')) {
        responseText = "Quantix Enterprise features custom volume pricing based on your outlet matrix and terminal counts. Includes 24/7 priority SLA, dedicated onboarding manager, and custom API integrations.";
        action = 'CONTACT_SALES';
      } else if (lower.includes('chain') || lower.includes('multi') || lower.includes('sync') || lower.includes('outlet')) {
        responseText = "Quantix Enterprise offers real-time cloud synchronization across 10 to 1,000+ locations. Centralize menu matrices, pricing rules, staff RBAC permissions, and aggregated P&L analytics.";
      } else if (lower.includes('offline') || lower.includes('internet') || lower.includes('down')) {
        responseText = "Yes! Quantix Enterprise includes zero-downtime offline mode. Registers process sales continuously without internet, automatically syncing back to the cloud once connected.";
      } else if (lower.includes('hardware') || lower.includes('terminal') || lower.includes('device')) {
        responseText = "Quantix POS is 100% cloud-native & hardware agnostic. Works seamlessly on Windows PCs, iPads, Android tablets, touch terminals, and receipt printers.";
      } else {
        responseText = `Thank you for asking! Quantix Enterprise is built for high-volume multi-store chains with cloud POS, real-time matrix sync, and 24/7 dedicated support. Would you like to see a live demo?`;
        action = 'BOOK_DEMO';
      }

      addMessage('ai', responseText, !!action, action);
      setIsTyping(false);
    }, 850);
  };

  const addMessage = (sender: 'ai' | 'user', text: string, isActionable?: boolean, actionType?: 'BOOK_DEMO' | 'CONTACT_SALES') => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      sender,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isActionable,
      actionType,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userText = input.trim();
    setInput('');
    addMessage('user', userText);
    generateAIResponse(userText);
  };

  const handleSuggestionClick = (query: string) => {
    if (isTyping) return;
    addMessage('user', query);
    generateAIResponse(query);
  };

  const handleActionClick = (actionType?: 'BOOK_DEMO' | 'CONTACT_SALES') => {
    if (actionType === 'BOOK_DEMO') {
      openModal('1-on-1 Enterprise AI Demo Booking', 'AI_ASSISTANT_DEMO');
    } else {
      openModal('Enterprise Custom Pricing Inquiry', 'AI_ASSISTANT_PRICING');
    }
  };

  // REUSABLE CHAT UI
  const renderChatUI = () => (
    <div className={`w-full h-full flex flex-col bg-white dark:bg-slate-950 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-2xl overflow-hidden backdrop-blur-2xl ${className}`}>
      
      {/* Draggable Top Header Bar */}
      <div className="bg-slate-900 dark:bg-slate-950 p-4 text-white flex items-center justify-between border-b border-slate-800 shadow-sm relative shrink-0 select-none">
        
        {/* Drag Handle Bar */}
        {variant === 'floating' && (
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 flex items-center justify-center cursor-grab active:cursor-grabbing group py-1 px-4">
            <div className="w-10 h-1 bg-slate-700/80 rounded-full group-hover:bg-slate-500 transition-colors" />
          </div>
        )}

        <div className="flex items-center gap-3 pt-1.5 relative z-10">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-primary to-primary-dark text-white shadow-md shadow-primary/30 border border-white/20">
            <Bot className="h-5 w-5" />
            <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-slate-900" />
            </span>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-syne text-sm font-extrabold tracking-wide text-white">{title}</h3>
              <span className="bg-primary/20 text-primary-light text-[9px] font-bold px-2 py-0.5 rounded-full border border-primary/30 uppercase tracking-wider">LIVE</span>
            </div>
            <p className="text-[11px] text-slate-300 font-medium">{subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 pt-1.5 relative z-10">
          <button
            onClick={() => setMessages([{
              id: Date.now().toString(),
              sender: 'ai',
              text: '👋 Chat reset! How can I assist your Enterprise POS team today?',
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            }])}
            title="Reset conversation"
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
          >
            <RefreshCw className="h-4 w-4" />
          </button>

          {variant === 'floating' && (
            <button
              onClick={handleOpenToggle}
              title="Close Assistant"
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 bg-slate-50/50 dark:bg-slate-950/80 no-scrollbar">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className="flex items-end gap-2.5 max-w-[88%]">
              {msg.sender === 'ai' && (
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-2xs mb-1">
                  <Bot className="h-4 w-4" />
                </div>
              )}

              <div
                className={`p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-primary text-white rounded-tr-xs font-medium shadow-md shadow-primary/20'
                    : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-tl-xs border border-slate-200/90 dark:border-slate-800 shadow-2xs'
                }`}
              >
                {msg.text}

                {/* Convertible Lead Call to Action */}
                {msg.isActionable && (
                  <div className="mt-3 pt-2.5 border-t border-slate-200/80 dark:border-slate-800">
                    <button
                      onClick={() => handleActionClick(msg.actionType)}
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary hover:bg-primary-dark text-white px-4 py-2.5 text-xs sm:text-sm font-bold transition-all shadow-md active:scale-95 cursor-pointer group"
                    >
                      <Calendar className="h-3.5 w-3.5" />
                      <span>
                        {msg.actionType === 'BOOK_DEMO' ? 'Book 1-on-1 Enterprise Demo' : 'Contact Enterprise Sales'}
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                )}

                <span className="block text-[9px] mt-1.5 opacity-60 text-right font-medium">
                  {msg.timestamp}
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-center gap-2 text-slate-400">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white">
              <Bot className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2.5 rounded-2xl shadow-2xs">
              <span className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Clean Quick Suggestion Chips Container */}
      <div className="px-4 py-3 bg-white dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800/80 overflow-x-auto no-scrollbar shrink-0">
        <div className="flex gap-2 min-w-max">
          {QUICK_SUGGESTIONS.map((sug, idx) => (
            <button
              key={idx}
              onClick={() => handleSuggestionClick(sug.query)}
              className="flex items-center gap-1.5 text-xs font-bold bg-slate-100/90 hover:bg-primary/10 hover:text-primary dark:bg-slate-900 dark:hover:bg-primary/20 text-slate-700 dark:text-slate-200 px-3.5 py-2 rounded-full transition-all duration-200 border border-slate-200/90 dark:border-slate-800 cursor-pointer shadow-2xs hover:border-primary/40 active:scale-95 shrink-0"
            >
              <span>{sug.icon}</span>
              <span>{sug.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Input Form Footer */}
      <form
        onSubmit={handleSend}
        className="p-3.5 sm:p-4 bg-white dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center gap-2.5 shrink-0"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about enterprise sync, pricing, demo..."
          className="flex-1 bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
        />

        <button
          type="submit"
          disabled={!input.trim() || isTyping}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary hover:bg-primary-dark disabled:opacity-40 text-white shadow-md transition-all active:scale-95 cursor-pointer"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );

  // IF EMBEDDED INLINE VARIANT
  if (variant === 'embedded') {
    return (
      <div className={`w-full h-[540px] max-w-2xl mx-auto my-6 ${className}`}>
        {renderChatUI()}
      </div>
    );
  }

  // IF FLOATING & DRAGGABLE MODAL VARIANT (POSITIONED ON BOTTOM-LEFT)
  return (
    <div className={`fixed bottom-6 left-4 sm:left-6 z-50 font-sans pointer-events-auto ${className}`}>
      
      {/* Floating Trigger Button (Bottom-Left) */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleOpenToggle}
            aria-label="Open Quantix Enterprise AI Advisor"
            className="relative flex items-center gap-3 rounded-full bg-slate-900/95 dark:bg-slate-900/95 text-white px-5 py-3 shadow-2xl shadow-slate-950/40 border border-slate-700/80 backdrop-blur-md cursor-pointer group"
          >
            {hasUnread && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 border-2 border-slate-900" />
              </span>
            )}

            <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-primary to-primary-dark shadow-md shadow-primary/30">
              <Bot className="h-5 w-5 text-white group-hover:scale-110 transition-transform" />
            </div>

            <div className="text-left hidden sm:block">
              <div className="flex items-center gap-1.5">
                <p className="text-xs font-syne font-black tracking-wide leading-none text-white">Quantix AI</p>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-[10px] text-slate-300 font-medium leading-tight mt-0.5">Enterprise POS Advisor</p>
            </div>

            <Sparkles className="h-4 w-4 text-amber-400 animate-pulse ml-0.5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating DRAGGABLE Popup Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            drag
            dragMomentum={false}
            dragElastic={0.05}
            initial={{ opacity: 0, y: 25, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.94 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-[94vw] sm:w-[420px] h-[550px] max-h-[85vh] cursor-grab active:cursor-grabbing"
          >
            {renderChatUI()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIAssistantModal;
