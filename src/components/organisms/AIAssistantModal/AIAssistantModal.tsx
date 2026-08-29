'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  Send,
  X,
  Sparkles,
  User,
  ArrowRight,
  RefreshCw,
  Building2,
  Calendar,
  ShieldCheck,
  Zap,
  ChevronDown,
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

const QUICK_SUGGESTIONS = [
  { label: '🏢 Multi-Store Chain Sync', query: 'How does Quantix handle multi-location chain sync?' },
  { label: '💰 Enterprise Pricing', query: 'What is the Enterprise pricing structure?' },
  { label: '📅 Book a Live Demo', query: 'I want to schedule a 1-on-1 enterprise demo' },
  { label: '⚡ Offline Cloud Mode', query: 'Does Quantix POS work offline without internet?' },
];

export const AIAssistantModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const { openModal } = useContactModal();
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: '👋 Hi! I am Quantix AI, your 24/7 Enterprise Lead & POS Assistant. How can I help scale your multi-store operations today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  // Auto scroll to bottom
  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  const handleOpenToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) setHasUnread(false);
  };

  const generateAIResponse = async (userQuery: string) => {
    setIsTyping(true);

    try {
      // Call backend API endpoint if configured
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
      // Fallback to intelligent local Enterprise KB engine
    }

    // Intelligent local Enterprise KB engine fallback
    setTimeout(() => {
      const lower = userQuery.toLowerCase();
      let responseText = "";
      let action: 'BOOK_DEMO' | 'CONTACT_SALES' | undefined = undefined;

      if (lower.includes('demo') || lower.includes('schedule') || lower.includes('book') || lower.includes('meeting')) {
        responseText = "I'd be happy to arrange a personalized 1-on-1 Enterprise POS demonstration for your team! Click below to select your preferred date & time with an Enterprise Specialist.";
        action = 'BOOK_DEMO';
      } else if (lower.includes('pricing') || lower.includes('cost') || lower.includes('plan') || lower.includes('price')) {
        responseText = "Quantix Enterprise offers custom volume pricing tailored to your total outlet count and terminal requirements. Our plans include 24/7 SLA support, dedicated account managers, and custom API integrations.";
        action = 'CONTACT_SALES';
      } else if (lower.includes('chain') || lower.includes('multi') || lower.includes('sync') || lower.includes('outlet')) {
        responseText = "Quantix Enterprise features real-time cloud synchronization across 10 to 1,000+ locations. Centralize menu updates, price rules, role-based access (RBAC), and consolidated financial analytics from one dashboard.";
      } else if (lower.includes('offline') || lower.includes('internet') || lower.includes('down')) {
        responseText = "Yes! Quantix Enterprise includes zero-downtime offline mode. Transactions and register operations continue seamlessly without internet, automatically syncing back to the cloud once reconnected.";
      } else if (lower.includes('hardware') || lower.includes('terminal') || lower.includes('device')) {
        responseText = "Quantix Enterprise is 100% cloud & hardware-agnostic. It runs smoothly on Windows PCs, iPads, Android tablets, touch terminals, and receipt printers.";
      } else {
        responseText = `Thank you for asking about "${userQuery}". Quantix Enterprise is engineered to streamline high-volume multi-store chains with enterprise-grade cloud POS, inventory matrices, and 24/7 dedicated support. Would you like to schedule a quick demo?`;
        action = 'BOOK_DEMO';
      }

      addMessage('ai', responseText, !!action, action);
      setIsTyping(false);
    }, 900);
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

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      
      {/* Floating Trigger Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpenToggle}
            aria-label="Open AI Enterprise Assistant"
            className="relative flex items-center gap-3 rounded-full bg-gradient-to-r from-red-600 via-rose-600 to-red-700 px-5 py-3.5 text-white shadow-2xl shadow-red-600/40 border border-white/20 cursor-pointer group"
          >
            {/* Pulsing indicator badge */}
            {hasUnread && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 border-2 border-white" />
              </span>
            )}

            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-xs">
              <Bot className="h-5 w-5 text-white group-hover:rotate-12 transition-transform" />
            </div>

            <div className="text-left hidden sm:block">
              <p className="text-xs font-syne font-black tracking-wide leading-none">Quantix AI</p>
              <p className="text-[10px] text-white/80 font-medium leading-tight mt-0.5">Ask Enterprise POS Assistant</p>
            </div>

            <Sparkles className="h-4 w-4 text-amber-300 animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main AI Chat Drawer Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="w-[92vw] sm:w-[410px] h-[540px] max-h-[82vh] rounded-3xl bg-white dark:bg-slate-950 border border-slate-200/90 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col backdrop-blur-xl"
          >
            {/* Header Bar */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 dark:from-slate-950 dark:to-slate-900 p-4 text-white flex items-center justify-between border-b border-slate-800 shadow-md">
              <div className="flex items-center gap-3">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-red-600 text-white shadow-md">
                  <Bot className="h-6 w-6" />
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 border-2 border-slate-900" />
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-syne text-sm font-extrabold tracking-wide">Quantix Enterprise AI</h3>
                    <span className="bg-red-500/20 text-red-400 text-[9px] font-bold px-1.5 py-0.5 rounded border border-red-500/30 uppercase">LIVE</span>
                  </div>
                  <p className="text-[11px] text-slate-300 font-medium">24/7 Smart Lead & Chain Advisor</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setMessages([{
                    id: Date.now().toString(),
                    sender: 'ai',
                    text: '👋 Chat reset! How can I assist with your Enterprise POS setup today?',
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  }])}
                  title="Reset conversation"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>

                <button
                  onClick={handleOpenToggle}
                  title="Close AI Assistant"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Chat Body Window */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50 dark:bg-slate-950/60">
              
              {/* Message List */}
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-end gap-2 max-w-[85%]">
                    {msg.sender === 'ai' && (
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-red-600 text-white shadow-2xs mb-1">
                        <Bot className="h-4 w-4" />
                      </div>
                    )}

                    <div
                      className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-2xs ${
                        msg.sender === 'user'
                          ? 'bg-red-600 text-white rounded-br-xs font-medium'
                          : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-bl-xs border border-slate-200/80 dark:border-slate-800'
                      }`}
                    >
                      {msg.text}

                      {/* Actionable Button Inside Message */}
                      {msg.isActionable && (
                        <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-800">
                          <button
                            onClick={() => handleActionClick(msg.actionType)}
                            className="w-full flex items-center justify-center gap-2 rounded-xl bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
                          >
                            <Calendar className="h-3.5 w-3.5" />
                            <span>
                              {msg.actionType === 'BOOK_DEMO' ? 'Book 1-on-1 Enterprise Demo' : 'Contact Enterprise Sales'}
                            </span>
                            <ArrowRight className="h-3.5 w-3.5" />
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
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-600 text-white">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="flex items-center gap-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-2 rounded-xl shadow-2xs">
                    <span className="h-2 w-2 rounded-full bg-red-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="h-2 w-2 rounded-full bg-red-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="h-2 w-2 rounded-full bg-red-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Quick Suggestion Chips */}
            <div className="px-3 py-2 bg-white dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800 overflow-x-auto no-scrollbar">
              <div className="flex gap-2 min-w-max">
                {QUICK_SUGGESTIONS.map((sug, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestionClick(sug.query)}
                    className="text-[11px] font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-full transition-colors border border-slate-200/80 dark:border-slate-800 cursor-pointer shadow-2xs"
                  >
                    {sug.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Form Footer */}
            <form
              onSubmit={handleSend}
              className="p-3 bg-white dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800 flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about enterprise sync, pricing, demo..."
                className="flex-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/50"
              />

              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIAssistantModal;
