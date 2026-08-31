// src/components/organisms/AIAssistantModal/AIAssistantModal.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu,
  Sparkles,
  Send,
  X,
  RotateCcw,
  CalendarCheck,
  Flame,
  Clock,
  Layers,
  Boxes,
  ArrowRight,
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

const ENTERPRISE_QUICK_STARTERS = [
  { label: '3 Months Free Trial', query: 'Tell me about the 3 Months Free Trial program and rollout', icon: Flame },
  { label: 'Multi-Store Cloud Hub', query: 'How does multi-store supply chain and par-level replenishment work?', icon: Layers },
  { label: 'ERP & SAP Integrations', query: 'Which ERP, accounting, and custom APIs does Quantix integrate with?', icon: Boxes },
];

export const AIAssistantModal: React.FC<AIAssistantProps> = ({
  variant = 'floating',
  title = "Quantix Enterprise AI",
  subtitle = "24/7 Enterprise POS Advisor",
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
      text: '👋 **Welcome to Quantix Enterprise!** I am your 24/7 AI Operations & POS Solutions Advisor. Ask me anything about our **Multi-Store Cloud Hub**, **Supply Chain**, **SAP/NetSuite ERP Integrations**, or our **3 Months Free Trial**.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  useEffect(() => {
    if (isOpen || variant === 'embedded') {
      const timer = setTimeout(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 60);
      return () => clearTimeout(timer);
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
            data.actionData
          );
          setIsTyping(false);
          return;
        }
      }
    } catch (e) {
      console.warn('AI Chat Endpoint offline, using local intelligence engine fallback.');
    }

    // Local Fallback Intelligence
    setTimeout(() => {
      const lower = userQuery.toLowerCase();
      let reply = "";
      let isActionable = false;
      let actionType: 'BOOK_DEMO' | 'CONTACT_SALES' | undefined = undefined;
      let actionData = undefined;

      if (lower.includes('trial') || lower.includes('3 month') || lower.includes('free') || lower.includes('zero')) {
        reply = "🎉 **3 Months 100% Free Trial Program:**\n\n- Zero setup fees & zero locked contracts\n- Complete cloud instance pre-loaded with your menu/SKU database in **under 1 hour**\n- Unlimited offline terminal sync, multi-store warehousing, and full ERP bridge\n- 24/7 dedicated enterprise engineer on standby.\n\nWould you like our engineering team to spin up your test instance today?";
        isActionable = true;
        actionType = 'BOOK_DEMO';
        actionData = {
          title: "Claim 3 Months Free Trial",
          subtitle: "Live staging environment ready within 1 hour",
          badge: "ZERO RISK PILOT"
        };
      } else if (lower.includes('sap') || lower.includes('erp') || lower.includes('api') || lower.includes('integrate') || lower.includes('netsuite')) {
        reply = "🔗 **Enterprise Integration Capabilities:**\n\nQuantix provides bidirectional REST APIs and automated webhooks for:\n- **ERP Systems:** SAP S/4HANA, Oracle NetSuite, Microsoft Dynamics 365\n- **Accounting:** QuickBooks Online, Xero, Tally Prime\n- **Payment Processors:** Bring-Your-Own-Processor (BYOP) support for Stripe, Adyen, Worldpay, Razorpay, Ingenico, and Pax terminals.\n\nWould you like our Solutions Architect to review your ERP integration schema?";
        isActionable = true;
        actionType = 'BOOK_DEMO';
        actionData = {
          title: "Book Architecture Review",
          subtitle: "1-on-1 session with our Enterprise Solutions Architect",
          badge: "TECHNICAL AUDIT"
        };
      } else if (lower.includes('price') || lower.includes('cost') || lower.includes('plan') || lower.includes('quote')) {
        reply = "💰 **Quantix Enterprise Pricing Architecture:**\n\n- **Single Master Licence:** Run unlimited POS registers, KDS screens, and inventory tablets.\n- **Zero Transaction Markup:** Unlike Square (2.6% + 10¢) or Toast, Quantix charges $0 variable swipe fees.\n- **Custom Franchise SLA:** Tiered volume discounts for 15+ locations.\n\nShall I connect you with our Commercial Accounts team for a customized multi-store quote?";
        isActionable = true;
        actionType = 'CONTACT_SALES';
        actionData = {
          title: "Request Custom Franchise Quote",
          subtitle: "Volume pricing & localized SLA terms",
          badge: "VOLUME DISCOUNT"
        };
      } else {
        reply = "Quantix Enterprise delivers an **Offline-First Cloud POS & Multi-Store Supply Chain Hub** designed for high-concurrency stadium venues, national retail chains, and dining franchise groups.\n\nEverything operates on perpetual local IndexedDB caches with instantaneous cloud sync when online.\n\nHow many store locations or terminals are in your network?";
      }

      addMessage('ai', reply, isActionable, actionType, actionData);
      setIsTyping(false);
    }, 550);
  };

  const addMessage = (
    sender: 'ai' | 'user',
    text: string,
    isActionable = false,
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

  const handleSend = (e?: React.FormEvent, customQuery?: string) => {
    if (e) e.preventDefault();
    const query = (customQuery || input).trim();
    if (!query || isTyping) return;

    addMessage('user', query);
    setInput('');
    generateAIResponse(query);
  };

  const handleActionClick = (actionType?: 'BOOK_DEMO' | 'CONTACT_SALES') => {
    openModal(actionType === 'BOOK_DEMO' ? 'demo' : 'contact');
    if (variant === 'floating') setIsOpen(false);
  };

  // Helper to format bold markdown
  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      let formatted = line
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/`([^`]+)`/g, '<code class="bg-slate-200 dark:bg-slate-800 text-[#FF4D00] px-1 py-0.5 rounded text-[11px] font-mono">$1</code>');

      if (line.startsWith('- ') || line.startsWith('* ')) {
        return (
          <div key={idx} className="flex items-start gap-1.5 my-0.5 pl-0.5 text-[11.5px] sm:text-xs leading-snug font-sans">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF4D00] mt-1 shrink-0 shadow-xs shadow-[#FF4D00]/50" />
            <span dangerouslySetInnerHTML={{ __html: formatted.replace(/^[-*]\s+/, '') }} />
          </div>
        );
      }
      return (
        <p key={idx} className={idx > 0 ? "mt-1 leading-snug text-[11.5px] sm:text-xs font-sans" : "leading-snug text-[11.5px] sm:text-xs font-sans"} dangerouslySetInnerHTML={{ __html: formatted }} />
      );
    });
  };

  const renderChatUI = () => (
    <div className={`w-full h-full flex flex-col font-sans bg-white dark:bg-slate-900/95 backdrop-blur-xl text-slate-800 dark:text-slate-100 rounded-xl border border-slate-200/90 dark:border-slate-800/90 shadow-[0_20px_50px_rgba(0,0,0,0.25)] overflow-hidden relative ${className}`}>
      
      {/* GLOWING TOP ACCENT STRIP */}
      <div className="h-0.5 w-full bg-gradient-to-r from-[#FF4D00] via-[#FF7332] to-[#FF4D00] shrink-0" />

      {/* LUXURY HEADER */}
      <div className="bg-slate-900 px-3.5 py-2.5 text-white flex items-center justify-between relative shrink-0 select-none border-b border-slate-800/80 shadow-xs">
        <div className="flex items-center gap-2 min-w-0">
          <div className="relative flex h-7.5 w-7.5 items-center justify-center rounded-lg bg-gradient-to-br from-[#FF4D00] to-[#E03E00] text-white shadow-md shadow-[#FF4D00]/30 border border-white/20 shrink-0">
            <Cpu className="h-4 w-4" />
            <span className="absolute -bottom-0.5 -right-0.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 border border-slate-900" />
            </span>
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="font-syne text-xs sm:text-[13px] font-black tracking-wide text-white truncate">{title}</h3>
              <span className="inline-flex items-center gap-1 bg-[#FF4D00]/20 text-[#FF7332] text-[7.5px] sm:text-[8px] font-syne font-extrabold px-1.5 py-0.5 rounded-md border border-[#FF4D00]/30 uppercase tracking-wider shrink-0 shadow-inner">
                <Sparkles className="h-2 w-2" />
                ONLINE
              </span>
            </div>
            <p className="text-[9.5px] font-sans text-slate-400 font-medium truncate">{subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-0.5 shrink-0">
          <button
            onClick={() => setMessages([{
              id: Date.now().toString(),
              sender: 'ai',
              text: '👋 Chat reset! Ask me any question about Quantix Enterprise Multi-Store POS, Supply Chain, ERP Integrations, or the 3 Months Free Trial.',
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            }])}
            title="Reset conversation"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-all cursor-pointer active:scale-95 border border-transparent hover:border-slate-700"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>

          {variant === 'floating' && (
            <button
              onClick={handleOpenToggle}
              title="Close Assistant"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-all cursor-pointer active:scale-95 border border-transparent hover:border-slate-700"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* MESSAGES FEED AREA */}
      <div 
        className="flex-1 p-3 sm:p-3.5 pt-2.5 sm:pt-3 pb-3 sm:pb-4 overflow-y-auto space-y-2.5 bg-slate-50/70 dark:bg-slate-950/60"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className="flex items-end gap-1.5 max-w-[94%] sm:max-w-[88%]">
              {msg.sender === 'ai' && (
                <div className="h-5 w-5 rounded-md bg-slate-900 border border-slate-800 text-[#FF4D00] flex items-center justify-center shrink-0 mb-0.5">
                  <Cpu className="h-3 w-3" />
                </div>
              )}

              <div
                className={`py-2 px-3 sm:py-2.5 sm:px-3.5 rounded-xl shadow-xs transition-shadow font-sans ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-[#FF4D00] to-[#FF6B2B] text-white rounded-tr-xs font-medium shadow-sm shadow-[#FF4D00]/20'
                    : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-tl-xs border border-slate-200/90 dark:border-slate-800/90'
                }`}
              >
                <div>{renderFormattedText(msg.text)}</div>

                {/* ACTIONABLE LEAD CARD */}
                {msg.isActionable && (
                  <div className="mt-2 pt-1.5 border-t border-slate-100 dark:border-slate-800">
                    <div className="rounded-lg bg-gradient-to-br from-orange-50/90 via-white to-orange-50/40 dark:from-orange-950/40 dark:via-slate-900 dark:to-orange-950/20 border border-orange-200/90 dark:border-orange-900/50 p-2 sm:p-2.5 flex flex-col gap-1 shadow-xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-[8.5px] sm:text-[9px] font-syne font-black text-[#FF4D00] uppercase tracking-wider">
                          <Flame className="h-2.5 w-2.5 fill-[#FF4D00]/20" />
                          <span>{msg.actionData?.badge || 'Special Offer'}</span>
                        </div>
                        <span className="text-[8.5px] sm:text-[9px] font-sans text-slate-500 dark:text-slate-400 flex items-center gap-1 font-medium">
                          <Clock className="h-2.5 w-2.5 text-[#FF4D00]" /> 1 hr setup
                        </span>
                      </div>

                      <div>
                        <p className="text-[11px] sm:text-[11.5px] font-syne font-extrabold text-slate-900 dark:text-white leading-tight">{msg.actionData?.title || 'Claim 3 Months Free Trial'}</p>
                        <p className="text-[9.5px] sm:text-[10px] font-sans text-slate-600 dark:text-slate-300 mt-0.5">{msg.actionData?.subtitle || 'Custom setup built within 1 hour'}</p>
                      </div>

                      <button
                        onClick={() => handleActionClick(msg.actionType)}
                        className="w-full flex items-center justify-center gap-1.5 rounded-md bg-gradient-to-r from-[#FF4D00] to-[#E03E00] hover:from-[#E03E00] hover:to-[#C23500] text-white py-1.5 px-2.5 text-[10.5px] font-syne font-bold shadow-xs shadow-[#FF4D00]/25 active:scale-95 transition-all cursor-pointer group mt-0.5"
                      >
                        <CalendarCheck className="h-3.5 w-3.5" />
                        <span>{msg.actionType === 'BOOK_DEMO' ? 'Schedule Strategy Demo' : 'Claim 3 Months Free Trial'}</span>
                        <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                )}

                <span className={`block text-[8px] sm:text-[8.5px] mt-1 text-right font-sans tracking-tight ${
                  msg.sender === 'user' ? 'text-white/90 font-medium' : 'text-slate-400 dark:text-slate-500 font-normal'
                }`}>
                  {msg.timestamp}
                </span>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-2.5 py-1.5 rounded-lg shadow-xs w-fit font-sans">
            <div className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF4D00] animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF4D00] animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF4D00] animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span className="text-[9.5px] text-slate-400 font-medium">AI is typing...</span>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* QUICK SUGGESTION STARTERS */}
      {messages.length <= 1 && (
        <div className="px-3 py-1.5 bg-slate-100/60 dark:bg-slate-900/60 border-t border-slate-200/50 dark:border-slate-800/50 flex flex-wrap gap-1 shrink-0">
          {ENTERPRISE_QUICK_STARTERS.map((s, i) => {
            const IconComponent = s.icon;
            return (
              <button
                key={i}
                onClick={() => handleSend(undefined, s.query)}
                className="inline-flex items-center gap-1 text-[9.5px] font-sans font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 hover:border-[#FF4D00] hover:text-[#FF4D00] dark:hover:text-[#FF7332] px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-700 transition-all cursor-pointer shadow-xs active:scale-95"
              >
                <IconComponent className="h-2.5 w-2.5 text-[#FF4D00] shrink-0" />
                <span>{s.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* INPUT FORM FOOTER WITH SEND (PAPER PLANE) ICON */}
      <form
        onSubmit={handleSend}
        className="p-2 sm:p-2.5 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5 shrink-0 z-10 font-sans"
      >
        <div className="relative flex-1 flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about Quantix Enterprise..."
            className="w-full bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 rounded-lg pl-3 pr-2 py-1.5 text-xs font-sans text-slate-900 dark:text-white placeholder:text-slate-400 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:border-[#FF4D00] focus:ring-1 focus:ring-[#FF4D00]/20 transition-all shadow-inner"
          />
        </div>

        <button
          type="submit"
          disabled={!input.trim() || isTyping}
          aria-label="Send message"
          className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#FF4D00] to-[#E03E00] hover:from-[#E03E00] hover:to-[#B83200] disabled:opacity-40 text-white flex items-center justify-center transition-all shadow-xs shadow-[#FF4D00]/25 active:scale-95 disabled:active:scale-100 cursor-pointer disabled:cursor-not-allowed shrink-0"
        >
          <Send className="h-3.5 w-3.5" />
        </button>
      </form>
    </div>
  );

  if (variant === 'embedded') {
    return (
      <div className={`w-full h-[480px] max-w-xl mx-auto my-4 sm:my-6 ${className}`}>
        {renderChatUI()}
      </div>
    );
  }

  // FLOATING RESPONSIVE MODAL
  return (
    <>
      {/* RIGHT-CENTER SLEEK TRIGGER */}
      <AnimatePresence>
        {!isOpen && (
          <div className="fixed right-0 top-1/2 -translate-y-1/2 z-[60] font-sans pointer-events-auto select-none">
            <motion.button
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 50, opacity: 0 }}
              whileHover={{ x: -4, scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenToggle}
              aria-label="Open Quantix Enterprise AI Advisor"
              className="relative flex items-center gap-2 rounded-l-lg bg-slate-900/95 hover:bg-slate-900 text-white pl-3 pr-2.5 py-2.5 shadow-2xl shadow-slate-950/40 border-y border-l border-slate-700/90 hover:border-[#FF4D00] backdrop-blur-xl cursor-pointer group transition-all"
            >
              {hasUnread && (
                <span className="absolute -top-1 -left-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF4D00] opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FF4D00] border-2 border-slate-900" />
                </span>
              )}

              <div className="relative flex h-7.5 w-7.5 items-center justify-center rounded-md bg-gradient-to-br from-[#FF4D00] to-[#E03E00] text-white shadow-md shadow-[#FF4D00]/40 shrink-0">
                <Cpu className="h-4 w-4 group-hover:rotate-12 transition-transform" />
              </div>

              <div className="text-left hidden sm:block pr-0.5">
                <div className="flex items-center gap-1">
                  <p className="text-[11px] font-syne font-black tracking-wide leading-none text-white">Quantix AI</p>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <p className="text-[8.5px] font-sans text-slate-300 font-medium leading-tight mt-0.5">Ask Anything</p>
              </div>

              <Sparkles className="h-3 w-3 text-[#FF7332] animate-pulse shrink-0" />
            </motion.button>
          </div>
        )}
      </AnimatePresence>

      {/* COMPACT & GORGEOUS FLOATING MODAL */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed right-3 sm:right-6 bottom-3 sm:bottom-6 z-[70] font-sans pointer-events-auto">
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="w-[90vw] max-w-[340px] sm:w-[390px] sm:max-w-none h-[470px] max-h-[75vh] sm:h-[530px]"
            >
              {renderChatUI()}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistantModal;
