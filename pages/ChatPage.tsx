
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_ACTIVITIES } from '../constants';
import { askCaptainSmart } from '../services/geminiService';
import { Message } from '../types';

const ChatPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const activity = MOCK_ACTIVITIES.find(a => a.id === id);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'captain', text: '你好！我是隊長 Kevin，有什麼問題都可以問我喔！', time: '14:00' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const context = `${activity?.title} at ${activity?.venue} on ${activity?.date} ${activity?.time}. Level: ${activity?.level}. Price: ${activity?.price}. Highlights: ${activity?.highlights.join(', ')}.`;
    const aiResponse = await askCaptainSmart(input, context);

    setIsTyping(false);
    const captainMsg: Message = {
      id: (Date.now() + 1).toString(),
      sender: 'captain',
      text: aiResponse,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, captainMsg]);
  };

  if (!activity) return null;

  return (
    <div className="flex flex-col h-full bg-white">
      <header className="bg-white px-4 py-4 flex items-center gap-4 border-b border-gray-100 shadow-sm sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-full active:scale-90">
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex items-center gap-3 flex-1">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-xl border-2 border-orange-200">
            {activity.captain.avatar}
          </div>
          <div>
            <h1 className="font-black text-gray-900 text-lg">{activity.captain.name} 隊長</h1>
            <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              在線
            </p>
          </div>
        </div>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6 bg-gray-50/50">
        <div className="text-center py-4">
          <span className="text-[10px] font-bold text-gray-400 bg-white px-4 py-1.5 rounded-full shadow-sm uppercase tracking-widest">
            今天
          </span>
        </div>
        
        {messages.map((m) => (
          <div key={m.id} className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : ''} animate-fade-in`}>
            {m.sender === 'captain' && (
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-sm flex-shrink-0 shadow-sm border border-orange-200">
                {activity.captain.avatar}
              </div>
            )}
            <div className={`max-w-[75%] space-y-1`}>
              <div className={`px-5 py-3.5 shadow-sm rounded-3xl ${
                m.sender === 'user' 
                  ? 'bg-orange-500 text-white rounded-tr-sm' 
                  : 'bg-white text-gray-800 rounded-tl-sm border border-gray-100'
              }`}>
                <p className="text-sm font-medium leading-relaxed">{m.text}</p>
              </div>
              <span className={`text-[10px] font-bold text-gray-400 block px-2 ${m.sender === 'user' ? 'text-right' : ''}`}>
                {m.time}
              </span>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex gap-3 animate-pulse">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-sm shrink-0" />
            <div className="bg-white border border-gray-100 px-5 py-3 rounded-3xl rounded-tl-sm shadow-sm">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 bg-gray-200 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-200 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <div className="w-2 h-2 bg-gray-200 rounded-full animate-bounce [animation-delay:-0.3s]" />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white border-t border-gray-100 p-4 safe-area-bottom">
        <form onSubmit={handleSend} className="flex gap-3 items-center">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="輸入訊息..." 
            className="flex-1 px-6 py-4 bg-gray-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all outline-none" 
          />
          <button 
            type="submit" 
            disabled={!input.trim() || isTyping}
            className="w-14 h-14 bg-orange-500 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-orange-100 disabled:opacity-50 disabled:shadow-none active:scale-90 transition-all"
          >
            <svg className="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
