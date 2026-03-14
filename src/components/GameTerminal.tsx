import React, { useState, useEffect, useRef } from 'react';
import Markdown from 'react-markdown';
import { Terminal, Send, Shield, Sword, Sparkles } from 'lucide-react';

interface GameTerminalProps {
  content: string;
  onSend: (message: string) => void;
  isLoading: boolean;
}

export const GameTerminal: React.FC<GameTerminalProps> = ({ content, onSend, isLoading }) => {
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [content]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSend(input);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a] border border-emerald-900/30 rounded-xl overflow-hidden shadow-2xl">
      <div className="flex items-center justify-between px-4 py-2 bg-emerald-950/20 border-bottom border-emerald-900/30">
        <div className="flex items-center gap-2 text-emerald-400 font-mono text-sm">
          <Terminal size={16} />
          <span>QUEST_LOG.EXE</span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 p-6 overflow-y-auto font-mono text-sm text-emerald-50/90 space-y-4 scrollbar-thin scrollbar-thumb-emerald-900/50"
      >
        <div className="prose prose-invert prose-emerald max-w-none">
          <Markdown>{content}</Markdown>
        </div>
        {isLoading && (
          <div className="flex items-center gap-2 text-emerald-500 animate-pulse">
            <Sparkles size={16} />
            <span>The Game Master is thinking...</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 bg-black/40 border-t border-emerald-900/20">
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            placeholder="Type your command or solution..."
            className="w-full bg-black/60 border border-emerald-900/30 rounded-lg py-3 pl-4 pr-12 text-emerald-400 placeholder-emerald-900 focus:outline-none focus:border-emerald-500 transition-colors font-mono"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-2 p-2 text-emerald-500 hover:text-emerald-400 disabled:text-emerald-900 transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};
