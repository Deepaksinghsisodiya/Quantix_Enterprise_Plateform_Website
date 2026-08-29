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
  Zap,
  DollarSign,
  ShieldCheck,
  Flame,
  Clock,
} from 'lucide-react';
import { useContactModal } from '@/context/ContactModalContext';

export interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  isActionable?: boolean;
  actionType?: 'BOOK_DEMO' | 'CONTACT_SALES';
  actionData?: {
    title: string;
    subtitle: string;
    badge: string;
  };
}

export interface AIAssistantProps {
  variant?: 'floating' | 'embedded';
  title?: string;
  subtitle?: string;
  className?: string;
}

const QUICK_SUGGESTIONS = [
  {
    icon: <Zap className="h-3.5 w-3.5 text-[#FF4D00]" />,
    label: 'Multi-Store Sync',
    query: 'How does Quantix handle multi-location chain sync?',
  },
  {
    icon: <DollarSign className="h-3.5 w-3.5 text-emerald-600" />,
    label: 'Custom Pricing',
    query: 'What is the Enterprise pricing structure?',
  },
  {
    icon: <Calendar className="h-3.5 w-3.5 text-blue-600" />,
    label: 'Book a Live Demo',
    query: 'I want to schedule a 1-on-1 enterprise demo',
  },
  {
    icon: <ShieldCheck className="h-3.5 w-3.5 text-amber-600" />,
    label: 'Offline Engine',
    query: 'Does Quantix POS work offline without internet?',
  },
];

export const AIAssistantModal: React.FC<AIAssistantProps> = ({
  variant = 'floating',
  title = "Quantix Enterprise AI",
  subtitle = "Neural POS & Chain Operations Advisor",
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
      text: '👋 Greetings! I am Quantix Enterprise AI, your specialized multi-store operations & architecture advisor. How can I assist with your franchise or venue rollout today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  // Auto scroll to bottom smoothly
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
          addMessage(
            'ai',
            data.reply,
            data.isActionable,
            data.actionType,
            data.actionType === 'BOOK_DEMO'
              ? { title: '1-on-1 Enterprise Architecture Demo', subtitle: 'Live POS & KDS demo with Solution Architect', badge: 'High Priority SLA' }
              : { title: 'Enterprise Custom Pricing & Proposal', subtitle: 'Tailored tier quotes based on terminal count', badge: 'Volume Discount' }
          );
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
      let actionData = undefined;

      if (lower.includes('demo') || lower.includes('schedule') || lower.includes('book') || lower.includes('meeting')) {
        responseText = "I would be thrilled to arrange a dedicated 1-on-1 Enterprise demonstration for your executive team. Our POS Solution Architects will walk through multi-store routing, inventory matrices, and custom API pipelines.";
        action = 'BOOK_DEMO';
        actionData = {
          title: 'Schedule 1-on-1 Enterprise Demo',
          subtitle: 'Choose preferred date with Senior Architect',
          badge: 'Executive SLA',
        };
      } else if (lower.includes('pricing') || lower.includes('cost') || lower.includes('plan') || lower.includes('price')) {
        responseText = "Quantix Enterprise offers tailored volume-tier pricing configured specifically for your multi-location footprint. Every tier includes dedicated account management, custom webhook pipelines, and 24/7 priority SLA support.";
        action = 'CONTACT_SALES';
        actionData = {
          title: 'Request Custom Enterprise Quote',
          subtitle: 'Get an itemized rollout proposal in 24 hours',
          badge: 'Volume Tier',
        };
      } else if (lower.includes('chain') || lower.includes('multi') || lower.includes('sync') || lower.includes('outlet')) {
        responseText = "Quantix Enterprise utilizes high-frequency cloud sync across 10 to 1,000+ venues. Push global menu revisions, tiered price matrices, and role-based staff permissions (RBAC) instantly from a central executive portal.";
      } else if (lower.includes('offline') || lower.includes('internet') || lower.includes('down')) {
        responseText = "Quantix Enterprise features an autonomous offline transactional engine. In the event of network disruption, local registers execute checkout and receipt issuance without interruption, auto-syncing upon reconnection.";
      } else if (lower.includes('hardware') || lower.includes('terminal') || lower.includes('device')) {
        responseText = "Quantix POS is 100% hardware-agnostic and cloud-native. It deploys effortlessly across Windows touch terminals, iPads, Android registers, customer-facing displays, and thermal receipt networks.";
      } else {
        responseText = `Thank you for asking! Quantix Enterprise is purpose-built for high-volume venues requiring uninterrupted register uptime, real-time multi-store telemetry, and 24/7 dedicated engineering support. Would you like a live walkthrough?`;
        action = 'BOOK_DEMO';
        actionData = {
          title: 'Schedule 1-on-1 Enterprise Demo',
          subtitle: 'Live interactive POS & KDS walkthrough',
          badge: 'Recommended',
        };
      }

      addMessage('ai', responseText, !!action, action, actionData);
      setIsTyping(false);
    }, 750);
  };

  const addMessage = (
    sender: 'ai' | 'user',
    text: string,
    isActionable?: boolean,
    actionType?: 'BOOK_DEMO' | 'CONTACT_SALES',
    actionData?: { title: string; subtitle: string; badge: string }
  ) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      sender,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isActionable,
      actionType,
      actionData,
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

  // REUSABLE PIXEL-PERFECT THEME CHAT UI
  const renderChatUI = () => (
    <div className={`w-full h-full flex flex-col bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden relative ${className}`}>
      
      {/* TOP HEADER (Sleek Dark Slate Header with Brand Color Accent) */}
      <div className="bg-slate-900 px-4 py-3.5 text-white flex items-center justify-between relative shrink-0 select-none border-b border-slate-800">
        
        {/* Drag Handle */}
        {variant === 'floating' && (
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 flex items-center justify-center cursor-grab active:cursor-grabbing group py-0.5 px-6">
            <div className="w-10 h-1 bg-slate-700 rounded-full group-hover:bg-[#FF4D00] transition-colors" />
          </div>
        )}

        <div className="flex items-center gap-3 pt-1">
          {/* Brand Theme Bot Icon */}
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-[#FF4D00] text-white shadow-md shadow-[#FF4D00]/30 border border-white/20">
            <Bot className="h-5 w-5" />
            <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border border-slate-900" />
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-syne text-sm font-extrabold tracking-wide text-white">{title}</h3>
              <span className="inline-flex items-center gap-1 bg-[#FF4D00]/20 text-[#FF7332] text-[9px] font-bold px-2 py-0.5 rounded-full border border-[#FF4D00]/30 uppercase tracking-wider">
                <Sparkles className="h-2.5 w-2.5" />
                AI LIVE
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">{subtitle}</p>
          </div>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-1 pt-1">
          <button
            onClick={() => setMessages([{
              id: Date.now().toString(),
              sender: 'ai',
              text: '👋 Chat reset! How can I assist your Enterprise POS operations today?',
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            }])}
            title="Reset conversation"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer active:scale-95"
          >
            <RefreshCw className="h-4 w-4" />
          </button>

          {variant === 'floating' && (
            <button
              onClick={handleOpenToggle}
              title="Close Assistant"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer active:scale-95"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* MESSAGES FEED AREA (No Scrollbar Track Glitch) */}
      <div 
        className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/70 dark:bg-slate-950/60"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Welcome Status Card */}
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-3 flex items-center justify-between text-xs shadow-xs">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-[#FF4D00]/10 text-[#FF4D00] shrink-0">
              <Zap className="h-3.5 w-3.5" />
            </div>
            <div>
              <p className="font-syne font-bold text-slate-900 dark:text-white text-[11px]">24/7 Real-Time Enterprise Guidance</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">Ask about multi-store sync, pricing, offline mode</p>
            </div>
          </div>
          <span className="hidden sm:inline-flex text-[9px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-full">
            Active
          </span>
        </div>

        {/* Messages Stream */}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className="flex items-end gap-2 max-w-[90%]">
              <div
                className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#FF4D00] text-white rounded-tr-xs font-medium shadow-md shadow-[#FF4D00]/20'
                    : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-tl-xs border border-slate-200/90 dark:border-slate-800 shadow-xs'
                }`}
              >
                <p className="leading-relaxed">{msg.text}</p>

                {/* ACTIONABLE CONVERSION CARD */}
                {msg.isActionable && (
                  <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800">
                    <div className="rounded-xl bg-orange-50/70 dark:bg-orange-950/30 border border-orange-200/80 dark:border-orange-900/40 p-3 flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#FF4D00] uppercase tracking-wider">
                          <Flame className="h-3 w-3" />
                          <span>{msg.actionData?.badge || 'Priority'}</span>
                        </div>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                          <Clock className="h-3 w-3" /> Instant
                        </span>
                      </div>

                      <div>
                        <p className="text-xs font-syne font-bold text-slate-900 dark:text-white">{msg.actionData?.title || 'Schedule Enterprise Demo'}</p>
                        <p className="text-[11px] text-slate-600 dark:text-slate-300">{msg.actionData?.subtitle || '1-on-1 walkthrough with POS Architect'}</p>
                      </div>

                      <button
                        onClick={() => handleActionClick(msg.actionType)}
                        className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#FF4D00] hover:bg-[#E03E00] text-white py-2 px-3 text-xs font-bold shadow-md shadow-[#FF4D00]/25 active:scale-95 transition-all cursor-pointer group mt-1"
                      >
                        <Calendar className="h-3.5 w-3.5" />
                        <span>Schedule Strategy Demo</span>
                        <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                )}

                <span className="block text-[9px] mt-1.5 text-slate-400 dark:text-slate-500 text-right font-mono">
                  {msg.timestamp}
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3.5 py-2 rounded-2xl shadow-xs w-fit">
            <span className="h-2 w-2 rounded-full bg-[#FF4D00] animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="h-2 w-2 rounded-full bg-[#FF4D00] animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="h-2 w-2 rounded-full bg-[#FF4D00] animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* QUICK SUGGESTION CHIPS (Clean Horizontal Scroll - Zero Orange Scrollbar Line) */}
      <div 
        className="px-3.5 py-2.5 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 overflow-x-auto flex gap-2 shrink-0 z-10"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {QUICK_SUGGESTIONS.map((sug, idx) => (
          <button
            key={idx}
            onClick={() => handleSuggestionClick(sug.query)}
            className="flex items-center gap-1.5 text-xs font-semibold bg-slate-100 hover:bg-orange-50 hover:border-[#FF4D00]/40 hover:text-[#FF4D00] dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 px-3 py-1.5 rounded-full transition-all border border-slate-200/80 dark:border-slate-700 cursor-pointer shadow-2xs hover:scale-102 active:scale-95 shrink-0"
          >
            <span>{sug.icon}</span>
            <span>{sug.label}</span>
          </button>
        ))}
      </div>

      {/* INPUT FORM FOOTER */}
      <form
        onSubmit={handleSend}
        className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 shrink-0 z-10"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about multi-store sync, pricing, demo..."
          className="flex-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:border-[#FF4D00] focus:ring-2 focus:ring-[#FF4D00]/20 transition-all shadow-inner"
        />

        <button
          type="submit"
          disabled={!input.trim() || isTyping}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#FF4D00] hover:bg-[#E03E00] disabled:opacity-40 text-white shadow-md shadow-[#FF4D00]/25 transition-all active:scale-95 cursor-pointer"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>

      {/* Micro Footer Tag */}
      <div className="bg-slate-50 dark:bg-slate-950 py-1 px-4 text-center border-t border-slate-100 dark:border-slate-800">
        <p className="text-[9px] text-slate-400 dark:text-slate-500 font-mono">⚡ Quantix Neural POS Intelligence • 24/7 Always Online</p>
      </div>

    </div>
  );

  // IF EMBEDDED INLINE VARIANT
  if (variant === 'embedded') {
    return (
      <div className={`w-full h-[560px] max-w-2xl mx-auto my-6 ${className}`}>
        {renderChatUI()}
      </div>
    );
  }

  // IF FLOATING & DRAGGABLE MODAL VARIANT (BOTTOM-LEFT)
  return (
    <div className={`fixed bottom-6 left-4 sm:left-6 z-50 font-sans pointer-events-auto ${className}`}>
      
      {/* THEME BRAND FLOATING TRIGGER BUTTON (BOTTOM-LEFT) */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpenToggle}
            aria-label="Open Quantix Enterprise AI Advisor"
            className="relative flex items-center gap-3 rounded-full bg-slate-900 text-white px-5 py-3.5 shadow-2xl shadow-slate-950/20 border border-slate-700/80 hover:border-[#FF4D00] backdrop-blur-xl cursor-pointer group transition-all"
          >
            {/* Pulsing Active Indicator */}
            {hasUnread && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF4D00] opacity-75" />
                <span className="relative inline-flex rounded-full h-4 w-4 bg-[#FF4D00] border-2 border-slate-900" />
              </span>
            )}

            {/* Brand Theme Bot Icon */}
            <div className="relative flex h-9 w-9 items-center justify-center rounded-2xl bg-[#FF4D00] text-white shadow-md shadow-[#FF4D00]/40">
              <Bot className="h-5 w-5 group-hover:rotate-12 transition-transform" />
            </div>

            <div className="text-left hidden sm:block">
              <div className="flex items-center gap-1.5">
                <p className="text-xs font-syne font-black tracking-wide leading-none text-white">Quantix AI</p>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-[10px] text-slate-300 font-medium leading-tight mt-0.5">Enterprise POS Advisor</p>
            </div>

            <Sparkles className="h-4 w-4 text-[#FF7332] animate-pulse ml-0.5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* FLOATING DRAGGABLE CHAT WINDOW */}
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
            className="w-[94vw] sm:w-[420px] h-[560px] max-h-[86vh] cursor-grab active:cursor-grabbing"
          >
            {renderChatUI()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIAssistantModal;
