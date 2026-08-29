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
  Flame,
  Clock,
  MessageSquare,
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

export const AIAssistantModal: React.FC<AIAssistantProps> = ({
  variant = 'floating',
  title = "Quantix Enterprise AI",
  subtitle = "24/7 Intelligent Enterprise POS Assistant",
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
      text: '👋 Hello! I am your 24/7 Quantix AI Assistant. You can ask me anything about our enterprise cloud POS, multi-store sync, custom integrations, pricing, or architecture. How can I help you today?',
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

    // Comprehensive Intelligent Enterprise Knowledge Base Engine
    setTimeout(() => {
      const q = userQuery.toLowerCase().trim();
      let responseText = "";
      let action: 'BOOK_DEMO' | 'CONTACT_SALES' | undefined = undefined;
      let actionData = undefined;

      if (q.includes('demo') || q.includes('schedule') || q.includes('book') || q.includes('meeting') || q.includes('call')) {
        responseText = "I would be delighted to schedule a live 1-on-1 Enterprise POS demonstration for your team! Our Solution Architects will walk through multi-location sync, menu matrices, and custom workflows. Click below to pick your time:";
        action = 'BOOK_DEMO';
        actionData = {
          title: 'Schedule 1-on-1 Enterprise Demo',
          subtitle: 'Live interactive walkthrough with Solution Architect',
          badge: 'Executive SLA',
        };
      } else if (q.includes('price') || q.includes('pricing') || q.includes('cost') || q.includes('plan') || q.includes('fee')) {
        responseText = "Quantix Enterprise provides custom tiered volume pricing tailored to your exact store count, register terminals, and transaction volume. Every plan includes 24/7 dedicated engineering support, custom API pipelines, and white-glove onboarding.";
        action = 'CONTACT_SALES';
        actionData = {
          title: 'Request Custom Enterprise Quote',
          subtitle: 'Get an itemized rollout proposal in 24 hours',
          badge: 'Volume Tier',
        };
      } else if (q.includes('chain') || q.includes('multi') || q.includes('outlet') || q.includes('store') || q.includes('location') || q.includes('sync')) {
        responseText = "Quantix Enterprise is architected specifically for multi-location venue networks (from 10 to 1,000+ outlets). You can centralize menu updates, dynamic pricing rules, staff RBAC permissions, and aggregated P&L reporting in real-time from a single headquarters portal.";
      } else if (q.includes('offline') || q.includes('internet') || q.includes('down') || q.includes('network') || q.includes('wifi')) {
        responseText = "Yes! Quantix Enterprise features an autonomous zero-downtime offline engine. If internet connectivity drops, local registers continue billing, taking orders, and issuing receipts seamlessly, automatically syncing transaction batches to the cloud once restored.";
      } else if (q.includes('hardware') || q.includes('terminal') || q.includes('device') || q.includes('ipad') || q.includes('windows') || q.includes('printer')) {
        responseText = "Quantix POS is 100% cloud-native and hardware-agnostic. It runs seamlessly on Windows PCs, iPads, Android tablets, all-in-one touch terminals, barcode scanners, and thermal receipt networks without requiring proprietary hardware lock-in.";
      } else if (q.includes('kds') || q.includes('kitchen') || q.includes('order')) {
        responseText = "Quantix includes an intelligent Kitchen Display System (KDS) with color-coded station routing, prep-time tracking, course pacing, and automatic kitchen printer redirection.";
      } else if (q.includes('integration') || q.includes('api') || q.includes('quickbooks') || q.includes('stripe') || q.includes('xero')) {
        responseText = "Quantix Enterprise features pre-built integrations with major payment processors (Stripe, Square), accounting platforms (QuickBooks, Xero), ERP systems, delivery platforms, and custom REST/GraphQL webhook APIs.";
      } else if (q.includes('support') || q.includes('help') || q.includes('contact') || q.includes('sla')) {
        responseText = "We provide 24/7 dedicated enterprise technical support with priority SLAs, a personal Customer Success Manager, and full staff onboarding assistance for all locations.";
      } else if (q.includes('hi') || q.includes('hello') || q.includes('hey')) {
        responseText = "Hello! How can I help you today? Feel free to ask any question regarding Quantix Enterprise features, multi-store architecture, custom pricing, or rollout timelines.";
      } else {
        responseText = `Regarding "${userQuery}": Quantix Enterprise is designed as an all-in-one cloud platform for high-volume multi-store venues. We provide centralized cloud management, real-time inventory matrices, offline resilience, and dedicated 24/7 support. Would you like to see a live demonstration?`;
        action = 'BOOK_DEMO';
        actionData = {
          title: 'Schedule 1-on-1 Enterprise Demo',
          subtitle: 'Customized walkthrough for your business setup',
          badge: 'Recommended',
        };
      }

      addMessage('ai', responseText, !!action, action, actionData);
      setIsTyping(false);
    }, 700);
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

  const handleActionClick = (actionType?: 'BOOK_DEMO' | 'CONTACT_SALES') => {
    if (actionType === 'BOOK_DEMO') {
      openModal('1-on-1 Enterprise AI Demo Booking', 'AI_ASSISTANT_DEMO');
    } else {
      openModal('Enterprise Custom Pricing Inquiry', 'AI_ASSISTANT_PRICING');
    }
  };

  // CLEAN, TRUE AI CONVERSATIONAL CHAT UI
  const renderChatUI = () => (
    <div className={`w-full h-full flex flex-col bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden relative ${className}`}>
      
      {/* TOP HEADER */}
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
                AI ACTIVE
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
              text: '👋 Chat reset! Ask me any question about Quantix Enterprise POS, architecture, pricing, or features.',
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

      {/* MESSAGES FEED AREA */}
      <div 
        className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/70 dark:bg-slate-950/60"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Messages Stream */}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className="flex items-end gap-2 max-w-[92%] sm:max-w-[88%]">
              <div
                className={`p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
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

      {/* INPUT FORM FOOTER (Clean & Prominent AI Prompt Bar) */}
      <form
        onSubmit={handleSend}
        className="p-3.5 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 shrink-0 z-10"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask any question about Quantix Enterprise POS..."
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
        <p className="text-[9px] text-slate-400 dark:text-slate-500 font-mono">⚡ Quantix Neural POS Intelligence • Ask Anything</p>
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
