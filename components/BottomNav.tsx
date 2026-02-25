
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface BottomNavProps {
  activePath: string;
}

const BottomNav: React.FC<BottomNavProps> = ({ activePath }) => {
  const navigate = useNavigate();

  const items = [
    { label: '首頁', path: '/', icon: (active: boolean) => (
      <svg className="w-7 h-7" fill={active ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )},
    { label: '場租', path: '/venues', icon: (active: boolean) => (
      <svg className="w-7 h-7" fill={active ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )},
    { label: '課程', path: '/courses', icon: (active: boolean) => (
      <svg className="w-7 h-7" fill={active ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    )},
    { label: '商城', path: '/store', icon: (active: boolean) => (
      <svg className="w-7 h-7" fill={active ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    )},
    { label: '我的', path: '/profile', icon: (active: boolean) => (
      <svg className="w-7 h-7" fill={active ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )},
  ];

  return (
    <nav className="bg-white border-t border-gray-100 px-2 pt-2 pb-1 safe-area-bottom fixed bottom-0 left-0 right-0 max-w-md mx-auto z-[100] h-20 shadow-[0_-5px_20px_rgba(0,0,0,0.02)]">
      <div className="flex justify-around items-center h-full">
        {items.map((item) => {
          const isActive = activePath === item.path;
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center py-2 px-3 transition-colors ${isActive ? 'text-blue-500' : 'text-gray-300'}`}
            >
              <div className="mb-1">{item.icon(isActive)}</div>
              <span className="text-[11px] font-bold">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
