import React, { useState, useRef, useEffect } from 'react';
import { SendIcon, SparklesIcon, CpuIcon } from './Icons';
import { streamChatResponse } from '../services/geminiService';
import { Message, LoadingState } from '../types';
import { GenerateContentResponse } from '@google/genai';

const INITIAL_MESSAGE: Message = {
  id: 'init',
  role: 'model',
  content: "Aetheria System Online. awaiting_input...",
  timestamp: Date.now()
};

export const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loadingState]);

  const handleSend = async () => {
    if (!input.trim() || loadingState !== LoadingState.IDLE) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoadingState(LoadingState.LOADING);

    try {
      const streamResult = await streamChatResponse(messages, input);
      setLoadingState(LoadingState.STREAMING);
      
      let fullResponseText = '';
      const responseMsgId = (Date.now() + 1).toString();
      
      setMessages(prev => [
        ...prev, 
        { id: responseMsgId, role: 'model', content: '', timestamp: Date.now() }
      ]);

      for await (const chunk of streamResult) {
        const c = chunk as GenerateContentResponse;
        const text = c.text;
        if (text) {
          fullResponseText += text;
          setMessages(prev => prev.map(m => 
            m.id === responseMsgId ? { ...m, content: fullResponseText } : m
          ));
        }
      }
      
      setLoadingState(LoadingState.IDLE);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        content: "Error: Connection Severed. Please retry.",
        timestamp: Date.now()
      }]);
      setLoadingState(LoadingState.ERROR);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="w-full h-[600px] flex flex-col relative group">
      {/* HUD Frame */}
      <div className="absolute inset-0 border border-slate-700/50 bg-slate-950/80 backdrop-blur-sm z-0 clip-path-polygon"></div>
      
      {/* Animated Scanline Overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10 opacity-10">
        <div className="w-full h-[2px] bg-brand-500 shadow-[0_0_10px_rgba(45,212,191,0.5)] animate-scanline"></div>
      </div>

      {/* Corners */}
      <div className="absolute -top-[1px] -left-[1px] w-4 h-4 border-t-2 border-l-2 border-brand-500 z-20"></div>
      <div className="absolute -top-[1px] -right-[1px] w-4 h-4 border-t-2 border-r-2 border-brand-500 z-20"></div>
      <div className="absolute -bottom-[1px] -left-[1px] w-4 h-4 border-b-2 border-l-2 border-brand-500 z-20"></div>
      <div className="absolute -bottom-[1px] -right-[1px] w-4 h-4 border-b-2 border-r-2 border-brand-500 z-20"></div>

      {/* Header */}
      <div className="relative z-20 bg-slate-900/90 p-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-brand-500/10 border border-brand-500/30 flex items-center justify-center">
             <CpuIcon className="text-brand-400 w-3 h-3" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-brand-400 tracking-widest uppercase">/ TERMINAL_01</div>
            <div className="text-xs font-bold text-white tracking-wide">AETHERIA.SYS</div>
          </div>
        </div>
        <div className="flex flex-col items-end">
             <div className="flex gap-1 mb-1">
                <div className={`w-1.5 h-1.5 rounded-sm ${loadingState === LoadingState.IDLE ? 'bg-emerald-500' : 'bg-slate-700'}`}></div>
                <div className={`w-1.5 h-1.5 rounded-sm ${loadingState === LoadingState.LOADING ? 'bg-amber-500 animate-pulse' : 'bg-slate-700'}`}></div>
                <div className={`w-1.5 h-1.5 rounded-sm ${loadingState === LoadingState.STREAMING ? 'bg-brand-500 animate-pulse' : 'bg-slate-700'}`}></div>
             </div>
             <span className="text-[9px] font-mono text-slate-500">LATENCY: 12ms</span>
        </div>
      </div>

      {/* Messages */}
      <div className="relative z-20 flex-1 overflow-y-auto p-5 space-y-6 font-mono text-sm scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className="text-[10px] text-slate-600 mb-1 uppercase tracking-widest">
              {msg.role === 'user' ? '>> USR_INPUT' : '>> SYS_RESPONSE'}
            </div>
            
            <div className={`
              max-w-[90%] p-3 border-l-2 
              ${msg.role === 'user' 
                ? 'bg-slate-800/30 border-slate-500 text-slate-300' 
                : 'bg-brand-900/10 border-brand-500 text-brand-100 shadow-[0_0_15px_-5px_rgba(45,212,191,0.1)]'}
            `}>
              <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
        
        {loadingState === LoadingState.LOADING && (
          <div className="flex flex-col items-start">
             <div className="text-[10px] text-brand-500 mb-1 uppercase tracking-widest animate-pulse">>> PROCESSING</div>
             <div className="flex gap-1">
                <div className="w-2 h-4 bg-brand-500/50 animate-pulse"></div>
                <div className="w-2 h-4 bg-brand-500/50 animate-pulse delay-75"></div>
                <div className="w-2 h-4 bg-brand-500/50 animate-pulse delay-150"></div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="relative z-20 p-3 bg-slate-900/90 border-t border-slate-800">
        <div className="relative flex items-center">
          <span className="absolute left-3 text-brand-500 font-mono text-sm">{'>'}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter command or query..."
            disabled={loadingState !== LoadingState.IDLE && loadingState !== LoadingState.STREAMING}
            className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-sm py-3 pl-8 pr-12 focus:outline-none focus:border-brand-500/50 focus:bg-slate-900 transition-all font-mono placeholder:text-slate-700"
          />
          <button
            onClick={handleSend}
            disabled={loadingState !== LoadingState.IDLE && loadingState !== LoadingState.STREAMING || !input.trim()}
            className="absolute right-2 p-1.5 text-slate-500 hover:text-brand-400 hover:bg-brand-900/20 rounded transition-all"
          >
            <SendIcon className="w-4 h-4" />
          </button>
        </div>
        <div className="flex justify-between mt-2 px-1 text-[9px] font-mono text-slate-600 uppercase">
           <span>Model: Gemini-2.5-Flash</span>
           <span>Encryption: AES-256</span>
        </div>
      </div>
    </div>
  );
};