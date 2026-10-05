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
  Tag,
  HelpCircle,
  PhoneCall,
} from 'lucide-react';
import { useContactModal } from '@/context/ContactModalContext';
import { ChatDemoLeadForm, ChatDemoLeadResult } from './ChatDemoLeadForm';

export interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  isActionable?: boolean;
  actionType?: 'BOOK_DEMO' | 'CONTACT_SALES' | 'VIEW_PRICING' | 'VIEW_SOLUTIONS';
  suggestedButtons?: Array<{ label: string; action: string }>;
  leadCaptured?: boolean;
  showInlineForm?: boolean;
}

export interface AIAssistantProps {
  variant?: 'floating' | 'embedded';
  title?: string;
  subtitle?: string;
  className?: string;
}

const ENTERPRISE_QUICK_STARTERS = [
  { label: '🏷️ Pricing Plans', query: 'What are the pricing plans and subscription rates?', icon: Tag },
  { label: '🚀 Key Features', query: 'What are the main features of Quantix POS?', icon: Layers },
  { label: '🔌 Integrations', query: 'Which third party integrations are supported?', icon: Boxes },
  { label: '📅 Book 1-on-1 Demo', query: 'I want to schedule a live 1-on-1 demo', icon: CalendarCheck },
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

  // Inline Lead Form State inside Chat
  const [showInlineForm, setShowInlineForm] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: '👋 **Welcome to Quantix Enterprise POS!** I am your 24/7 Sales & Technical Advisor.\n\nAsk me anything about our **Pricing Plans**, **Multi-Store Management**, **API Integrations**, or **Schedule a 1-on-1 Demo** directly in this chat!',
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
  }, [messages, isOpen, isTyping, showInlineForm, variant]);

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
        body: JSON.stringify({ message: userQuery, platform: 'Enterprise' }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.reply) {
          addMessage(
            'ai',
            data.reply,
            data.isActionable,
            data.actionType,
            data.suggestedButtons,
            data.leadCaptured
          );
          if (data.actionType === 'BOOK_DEMO' && !data.leadCaptured) {
            setShowInlineForm(true);
          }
          setIsTyping(false);
          return;
        }
      }
    } catch {
      // Fallback
    }

    setTimeout(() => {
      addMessage(
        'ai',
        `Quantix Enterprise POS is a complete cloud billing and multi-store management platform with 24/7 dedicated support.`,
        true,
        'BOOK_DEMO',
        [
          { label: 'Book Personalised Demo', action: 'BOOK_DEMO' },
          { label: 'View Pricing Plans', action: '/pricing' },
        ]
      );
      setIsTyping(false);
    }, 400);
  };

  const addMessage = (
    sender: 'ai' | 'user',
    text: string,
    isActionable = false,
    actionType?: 'BOOK_DEMO' | 'CONTACT_SALES' | 'VIEW_PRICING' | 'VIEW_SOLUTIONS',
    suggestedButtons?: Array<{ label: string; action: string }>,
    leadCaptured?: boolean
  ) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      sender,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isActionable,
      actionType,
      suggestedButtons,
      leadCaptured,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleSend = (e?: React.FormEvent, customQuery?: string) => {
    if (e) e.preventDefault();
    const query = (customQuery || input).trim();
    if (!query || isTyping) return;

    addMessage('user', query);
    setInput('');

    // If query asks for demo, show inline form
    const lower = query.toLowerCase();
    if (lower.includes('demo') || lower.includes('book') || lower.includes('schedule') || lower.includes('trial')) {
      setShowInlineForm(true);
    }

    generateAIResponse(query);
  };

  const handleButtonClick = (action: string) => {
    if (action === 'BOOK_DEMO' || action === 'CONTACT_SALES') {
      setShowInlineForm(true);
    } else if (action === 'VIEW_PRICING' || action === '/pricing') {
      handleSend(undefined, 'What are the pricing plans and rates?');
    } else if (action === 'VIEW_SOLUTIONS' || action === '/solutions') {
      handleSend(undefined, 'What industry solutions are available?');
    } else if (action === '/integrations') {
      handleSend(undefined, 'Which integrations are supported?');
    } else if (action.startsWith('tel:') || action.startsWith('mailto:')) {
      window.open(action, '_self');
    } else if (action === 'CONTACT_SUPPORT') {
      handleSend(undefined, 'What is the customer support phone number and email?');
    } else {
      handleSend(undefined, action);
    }
  };

  // Lead is submitted inside ChatDemoLeadForm; here we only close it and confirm in chat.
  const handleLeadSuccess = (lead: ChatDemoLeadResult) => {
    setShowInlineForm(false);
    addMessage(
      'ai',
      `✅ **Demo Request Confirmed for ${lead.fullName}!**\n\nThank you! Our ${lead.businessType || 'POS'} Solutions Architect will call you at **${lead.phone}** shortly for your **${lead.merchantType}** demo session.`
    );
  };
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
      
      {/* TOP GLOWING ACCENT STRIP */}
      <div className="h-0.5 w-full bg-linear-to-r from-[#FF4D00] via-[#FF7332] to-[#FF4D00] shrink-0" />

      {/* HEADER */}
      <div className="bg-slate-900 px-3.5 py-2.5 text-white flex items-center justify-between relative shrink-0 select-none border-b border-slate-800/80 shadow-xs">
        <div className="flex items-center gap-2 min-w-0">
          <div className="relative flex h-7.5 w-7.5 items-center justify-center rounded-lg bg-linear-to-br from-[#FF4D00] to-[#E03E00] text-white shadow-md shadow-[#FF4D00]/30 border border-white/20 shrink-0">
            <Cpu className="h-4 w-4" />
            <span className="absolute -bottom-0.5 -right-0.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 border border-slate-900" />
            </span>
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="font-syne text-xs sm:text-[13px] font-black tracking-wide text-white truncate">{title}</h3>
              <span className="inline-flex items-center gap-1 bg-[#FF4D00]/20 text-[#FF7332] text-[7.5px] sm:text-[8px] font-syne font-extrabold px-1.5 py-0.5 rounded-md border border-[#FF4D00]/30 uppercase tracking-wider shrink-0">
                <Sparkles className="h-2 w-2" />
                ONLINE
              </span>
            </div>
            <p className="text-[9.5px] font-sans text-slate-400 font-medium truncate">{subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-0.5 shrink-0">
          <button
            onClick={() => {
              setMessages([{
                id: Date.now().toString(),
                sender: 'ai',
                text: '👋 Chat reset! Ask me any question about Quantix Enterprise POS or schedule a live 1-on-1 demo.',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              }]);
              setShowInlineForm(false);
            }}
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

      {/* MESSAGES FEED AREA — flex-1 + min-h-0 so it shrinks when form appears */}
      <div 
        className="flex-1 min-h-0 p-3 pt-2.5 pb-3 overflow-y-auto space-y-2.5 bg-slate-50/70 dark:bg-slate-950/60"
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
                    ? 'bg-linear-to-r from-[#FF4D00] to-[#FF6B2B] text-white rounded-tr-xs font-medium shadow-sm shadow-[#FF4D00]/20'
                    : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-tl-xs border border-slate-200/90 dark:border-slate-800/90'
                }`}
              >
                <div>{renderFormattedText(msg.text)}</div>

                {/* SUGGESTED ACTION BUTTONS */}
                {msg.suggestedButtons && msg.suggestedButtons.length > 0 && (
                  <div className="mt-2 pt-1.5 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap gap-1.5">
                    {msg.suggestedButtons.map((btn, bIdx) => (
                      <button
                        key={bIdx}
                        onClick={() => handleButtonClick(btn.action)}
                        className="inline-flex items-center gap-1.5 rounded-md bg-orange-50 dark:bg-orange-950/40 hover:bg-[#FF4D00] text-[#FF4D00] hover:text-white dark:text-[#FF7332] dark:hover:text-white border border-orange-200 dark:border-orange-900/50 hover:border-[#FF4D00] py-1 px-2.5 text-[10.5px] font-syne font-bold transition-all cursor-pointer active:scale-95 shadow-2xs"
                      >
                        <CalendarCheck className="h-3 w-3" />
                        <span>{btn.label}</span>
                      </button>
                    ))}
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

        {/* INLINE LEAD CAPTURE FORM INSIDE CHAT WINDOW (Name, Email, +1 Phone) */}
        {showInlineForm && (
          <ChatDemoLeadForm
            businessType="Enterprise"
            preferredMerchantType="Enterprise"
            companyFallback="Enterprise Website Inquiry"
            onClose={() => setShowInlineForm(false)}
            onSuccess={handleLeadSuccess}
          />
        )}

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

      {/* INPUT FORM FOOTER */}
      <form
        onSubmit={handleSend}
        className="p-2 sm:p-2.5 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5 shrink-0 z-10 font-sans"
      >
        <div className="relative flex-1 flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything or request a live demo..."
            className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-3 pr-2 py-1.5 text-xs font-sans text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:border-[#FF4D00] focus:ring-1 focus:ring-[#FF4D00]/20 transition-all shadow-inner"
          />
        </div>

        <button
          type="submit"
          disabled={!input.trim() || isTyping}
          aria-label="Send message"
          className="h-8 w-8 rounded-lg bg-linear-to-br from-[#FF4D00] to-[#E03E00] hover:from-[#E03E00] hover:to-[#B83200] disabled:opacity-40 text-white flex items-center justify-center transition-all shadow-xs shadow-[#FF4D00]/25 active:scale-95 disabled:pointer-events-none cursor-pointer shrink-0"
        >
          <Send className="h-3.5 w-3.5" />
        </button>
      </form>
    </div>
  );

  if (variant === 'embedded') {
    return (
      <div className={`w-full h-120 max-w-xl mx-auto my-4 sm:my-6 ${className}`}>
        {renderChatUI()}
      </div>
    );
  }

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <div className="fixed right-0 top-1/2 -translate-y-1/2 z-60 font-sans pointer-events-auto select-none">
            <motion.button
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 50, opacity: 0 }}
              whileHover={{ x: -4, scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenToggle}
              aria-label="Open Quantix Enterprise AI Advisor"
              className="relative flex items-center gap-1.5 sm:gap-2 rounded-l-md sm:rounded-l-lg bg-slate-900/95 hover:bg-slate-900 text-white p-1.5 sm:pl-3 sm:pr-2.5 sm:py-2.5 shadow-2xl shadow-slate-950/40 border-y border-l border-slate-700/90 hover:border-[#FF4D00] backdrop-blur-xl cursor-pointer group transition-all"
            >
              {hasUnread && (
                <span className="absolute -top-1 -left-1 flex h-2.5 w-2.5 sm:h-3 sm:w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF4D00] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-[#FF4D00] border-2 border-slate-900" />
                </span>
              )}

              <div className="relative flex h-6 w-6 sm:h-7.5 sm:w-7.5 items-center justify-center rounded-md bg-linear-to-br from-[#FF4D00] to-[#E03E00] text-white shadow-md shadow-[#FF4D00]/40 shrink-0">
                <Cpu className="h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover:rotate-12 transition-transform" />
              </div>

              <div className="text-left hidden sm:block pr-0.5">
                <div className="flex items-center gap-1">
                  <p className="text-[11px] font-syne font-black tracking-wide leading-none text-white">Quantix AI</p>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <p className="text-[8.5px] font-sans text-slate-300 font-medium leading-tight mt-0.5">Ask Anything</p>
              </div>

              <Sparkles className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-[#FF7332] animate-pulse shrink-0 hidden sm:block" />
            </motion.button>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-x-2 bottom-2 xs:inset-x-3 xs:bottom-3 sm:inset-x-auto sm:right-5 sm:bottom-5 z-70 font-sans pointer-events-auto flex justify-center sm:block">
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={{ duration: 0.16, ease: "easeOut" }}
              className="w-full max-w-90 sm:w-96.25 sm:max-w-none" style={{ height: 'min(540px, calc(100dvh - 16px))' }}
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
