
import React, { useState } from 'react';

// 1. 個人資料卡片組件 (維持專業感)
export const FitProfileCard: React.FC<{
  name: string;
  memberId: string;
  theme?: 'blue' | 'dark' | 'light';
  onEditAvatar?: () => void;
  onSettings?: () => void;
}> = ({ name, memberId, theme = 'blue', onEditAvatar, onSettings }) => {
  const themes = {
    blue: 'bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-700 text-white',
    dark: 'bg-slate-900 text-white border border-slate-700',
    light: 'bg-white text-slate-900 border border-slate-100 shadow-sm'
  };

  return (
    <div className={`${themes[theme]} p-8 rounded-[3rem] relative overflow-hidden shadow-xl transition-all duration-500`}>
      <div className="relative z-10 flex items-center gap-6">
        <div className="relative group">
          <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/30 flex items-center justify-center text-4xl overflow-hidden shadow-inner">
            👤
          </div>
          <button 
            onClick={onEditAvatar}
            className="absolute -bottom-1 -right-1 w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center text-blue-600 active:scale-90 transition-transform"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </button>
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-black tracking-tight mb-1">{name}</h2>
          <p className="text-[10px] font-bold opacity-70 tracking-widest uppercase">Member ID: {memberId}</p>
          <div className="flex gap-2 mt-4">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-[10px] font-black border border-white/10">PREMIUM</span>
            <span className="px-3 py-1 bg-emerald-500 text-white rounded-full text-[10px] font-black">PRO PLAYER</span>
          </div>
        </div>
        <button 
          onClick={onSettings}
          className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all active:scale-90"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
        </button>
      </div>
    </div>
  );
};

// 2. 快速功能網格 - 復刻圖片中的圓形圖標樣式
export const FitQuickGrid: React.FC<{
  items: Array<{ label: string; icon: React.ReactNode; bgColor: string; iconColor: string; neonColor: string; onClick: () => void }>;
}> = ({ items }) => (
  <div className="flex justify-around items-center px-2 py-4">
    {items.map((item, i) => (
      <button 
        key={i} 
        onClick={item.onClick}
        className="flex flex-col items-center gap-3 active:scale-90 transition-all group"
        style={{ "--neon-color": item.neonColor } as React.CSSProperties}
      >
        <div className={`w-[64px] h-[64px] rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-all group-hover:-translate-y-1 group-hover:shadow-lg ${item.bgColor}`}>
          <div className={`text-[28px] ${item.iconColor} transition-transform group-hover:scale-110`}>
            {item.icon}
          </div>
        </div>
        <span className="text-[13px] font-black text-[#1f2937] tracking-tight text-center leading-none">
          {item.label}
        </span>
      </button>
    ))}
  </div>
);

// 3. 菜單卡片組件
export const FitMenuCard: React.FC<{
  label: string;
  desc?: string;
  icon: React.ReactNode;
  status?: 'normal' | 'pressed' | 'disabled';
  onClick?: () => void;
  danger?: boolean;
}> = ({ label, desc, icon, status = 'normal', onClick, danger = false }) => (
  <button
    disabled={status === 'disabled'}
    onClick={onClick}
    className={`w-full p-5 rounded-3xl flex items-center gap-5 transition-all mb-3 text-left ${
      status === 'disabled' ? 'opacity-40 grayscale pointer-events-none' : 
      danger ? 'hover:bg-red-50 active:bg-red-100' : 'bg-white hover:bg-slate-50 active:bg-slate-100'
    } border border-slate-50 shadow-sm active:scale-[0.98] group`}
  >
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0 transition-transform group-hover:scale-110 ${danger ? 'bg-red-50 text-red-500' : 'bg-slate-50 text-slate-600'}`}>
      {icon}
    </div>
    <div className="flex-1">
      <h3 className={`text-sm font-black ${danger ? 'text-red-600' : 'text-slate-900'}`}>{label}</h3>
      {desc && <p className="text-[10px] text-slate-400 font-bold mt-0.5 tracking-tight">{desc}</p>}
    </div>
    <svg className={`w-5 h-5 ${danger ? 'text-red-300' : 'text-slate-300'} group-hover:translate-x-1 transition-transform`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
    </svg>
  </button>
);

// 4. 模態框(Modal)系統 - Bottom Sheet
export const FitModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-end justify-center">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity" onClick={onClose} />
      <div className="relative bg-white w-full max-w-md rounded-t-[3.5rem] shadow-2xl flex flex-col max-h-[90vh] animate-slide-up border-t border-white/50">
        <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mt-4 mb-2" />
        <div className="px-8 py-6 flex items-center justify-between border-b border-slate-50">
          <h2 className="text-xl font-black text-slate-900">{title}</h2>
          <button onClick={onClose} className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="p-8 overflow-y-auto scrollbar-hide">
          {children}
        </div>
      </div>
    </div>
  );
};

export const FitToast: React.FC<{
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  onClose?: () => void;
}> = ({ message, type = 'success', onClose }) => {
  const styles = {
    success: 'bg-emerald-500 border-emerald-400',
    error: 'bg-red-500 border-red-400',
    warning: 'bg-amber-500 border-amber-400',
    info: 'bg-blue-500 border-blue-400'
  };
  const icons = { success: '✓', error: '✕', warning: '!', info: 'i' };
  return (
    <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[300] animate-bounce-in">
      <div className={`${styles[type]} text-white px-6 py-4 rounded-3xl shadow-2xl flex items-center gap-4 border border-white/20 min-w-[300px]`}>
        <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center font-black text-lg backdrop-blur-sm">{icons[type]}</div>
        <p className="text-sm font-black flex-1">{message}</p>
        <button onClick={onClose} className="opacity-50 hover:opacity-100">✕</button>
      </div>
    </div>
  );
};

export const FitReservationCard: React.FC<{
  title: string;
  subtitle: string;
  time: string;
  location: string;
  price: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  onAction?: () => void;
}> = ({ title, subtitle, time, location, price, status, onAction }) => {
  const statusStyles = {
    upcoming: 'bg-blue-50 text-blue-600 border-blue-100',
    ongoing: 'bg-amber-50 text-amber-600 border-amber-100 animate-pulse',
    completed: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    cancelled: 'bg-slate-50 text-slate-400 border-slate-100'
  };
  const statusLabels = { upcoming: '即將到來', ongoing: '進行中', completed: '已完成', cancelled: '已取消' };
  return (
    <div className="bg-white rounded-[1.8rem] p-4 shadow-sm border border-slate-100 mb-3 group transition-all hover:shadow-md">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl shadow-inner ${statusStyles[status]}`}>
            {title.includes('籃球') ? '🏀' : '🏸'}
          </div>
          <div>
            <h3 className="font-black text-slate-900 text-base leading-tight">{title}</h3>
            <p className="text-[10px] text-slate-400 font-bold">{subtitle}</p>
          </div>
        </div>
        <span className={`px-2 py-0.5 text-[9px] font-black rounded-full uppercase tracking-widest border ${statusStyles[status]}`}>
          {statusLabels[status]}
        </span>
      </div>
      <div className="bg-slate-50 rounded-xl p-3 flex flex-col gap-1 mb-4 text-[11px] font-bold text-slate-600">
        <div className="flex items-center gap-2"><span className="opacity-50 text-[12px]">🕒</span> {time}</div>
        <div className="flex items-center gap-2"><span className="opacity-50 text-[12px]">📍</span> {location}</div>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-base font-black text-slate-900">NT$ {price}</p>
        <button onClick={onAction} className={`px-5 py-2 rounded-xl font-black text-[11px] btn-press transition-all ${status === 'upcoming' ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-slate-100 text-slate-400'}`}>
          {status === 'upcoming' ? '查看詳情' : status === 'completed' ? '評價活動' : '再次預約'}
        </button>
      </div>
    </div>
  );
};

export const FitInput: React.FC<{ label: string; placeholder: string; type?: string }> = ({ label, placeholder, type = 'text' }) => (
  <div className="space-y-2 mb-5">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">{label}</label>
    <input type={type} placeholder={placeholder} className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-2xl font-bold text-slate-800 outline-none focus:border-blue-500 focus:bg-white transition-all shadow-inner" />
  </div>
);

export const FitFAQ: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="mb-4 border border-slate-100 rounded-3xl bg-white overflow-hidden shadow-sm">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full p-5 flex items-center justify-between text-left active:bg-slate-50 transition-colors">
        <span className="text-sm font-black text-slate-800">{question}</span>
        <svg className={`w-5 h-5 text-blue-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" /></svg>
      </button>
      {isOpen && <div className="p-6 pt-0 text-xs font-bold text-slate-500 leading-relaxed border-t border-slate-50 bg-slate-50/30">{answer}</div>}
    </div>
  );
};

export const FitFamilyMember: React.FC<{
  name: string;
  relation: string;
  avatar: string;
  stats?: { label: string, value: string }[];
  onAction?: () => void;
}> = ({ name, relation, avatar, stats, onAction }) => (
  <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-100 mb-4 group hover:border-blue-200 transition-all">
    <div className="flex items-center gap-5 mb-6">
      <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl shadow-inner border-2 border-white">{avatar}</div>
      <div className="flex-1">
        <h3 className="text-lg font-black text-slate-900">{name}</h3>
        <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black rounded-full uppercase tracking-widest">{relation}</span>
      </div>
      <button onClick={onAction} className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 hover:text-blue-500 transition-all"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></button>
    </div>
    {stats && (
      <div className="grid grid-cols-4 gap-2 bg-slate-50 p-4 rounded-3xl">
        {stats.map((s, i) => (
          <div key={i} className="text-center">
            <p className="text-sm font-black text-slate-800 leading-none mb-1">{s.value}</p>
            <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">{s.label}</p>
          </div>
        ))}
      </div>
    )}
  </div>
);
