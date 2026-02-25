
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type NotificationType = 'all' | 'venue' | 'course' | 'shop';

interface NotificationItem {
  id: string;
  title: string;
  type: 'venue' | 'course' | 'shop';
  typeLabel: string;
  content: string;
  time: string;
  icon: string;
  colorClass: string;
  bgColorClass: string;
  borderClass: string;
}

const NOTIFICATIONS: NotificationItem[] = [
  { 
    id: '1', 
    title: '新場地預訂', 
    type: 'venue', 
    typeLabel: '場租',
    content: 'A教室 - 明天 14:00-16:00', 
    time: '5 分鐘前',
    icon: 'fa-house',
    colorClass: 'bg-blue-500',
    bgColorClass: 'bg-blue-100 text-blue-600',
    borderClass: 'border-l-4 border-blue-500'
  },
  { 
    id: '2', 
    title: '課程即將開始', 
    type: 'course', 
    typeLabel: '課程',
    content: '瑜珈課程 - 30分鐘後開始', 
    time: '15 分鐘前',
    icon: 'fa-graduation-cap',
    colorClass: 'bg-purple-500',
    bgColorClass: 'bg-purple-100 text-purple-600',
    borderClass: 'border-l-4 border-purple-500'
  },
  { 
    id: '3', 
    title: '新訂單成立', 
    type: 'shop', 
    typeLabel: '商城',
    content: '瑜珈墊 x2 - 訂單 #1234', 
    time: '20 分鐘前',
    icon: 'fa-shopping-cart',
    colorClass: 'bg-green-500',
    bgColorClass: 'bg-green-100 text-green-600',
    borderClass: 'border-l-4 border-green-500'
  },
  { 
    id: '4', 
    title: '租金收款確認', 
    type: 'venue', 
    typeLabel: '場租',
    content: '李小華 - B教室租金 $1,200', 
    time: '30 分鐘前',
    icon: 'fa-money-bill-wave',
    colorClass: 'bg-blue-500',
    bgColorClass: 'bg-blue-100 text-blue-600',
    borderClass: ''
  },
  { 
    id: '5', 
    title: '課程取消申請', 
    type: 'course', 
    typeLabel: '課程',
    content: '張同學申請取消明日課程', 
    time: '1 小時前',
    icon: 'fa-circle-info',
    colorClass: 'bg-orange-500',
    bgColorClass: 'bg-purple-100 text-purple-600',
    borderClass: ''
  },
  { 
    id: '6', 
    title: '訂單已出貨', 
    type: 'shop', 
    typeLabel: '商城',
    content: '訂單 #1230 已寄出', 
    time: '2 小時前',
    icon: 'fa-truck',
    colorClass: 'bg-green-500',
    bgColorClass: 'bg-green-100 text-green-600',
    borderClass: ''
  }
];

const NotificationsPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<NotificationType>('all');

  const filteredNotifications = activeTab === 'all' 
    ? NOTIFICATIONS 
    : NOTIFICATIONS.filter(n => n.type === activeTab);

  const tabs = [
    { id: 'all', label: '全部' },
    { id: 'venue', label: '場租' },
    { id: 'course', label: '課程' },
    { id: 'shop', label: '商城' },
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50 font-['Noto_Sans_TC'] overflow-hidden">
      {/* 標題欄 */}
      <header className="bg-white px-6 py-4 border-b border-gray-100 shrink-0">
        <div className="flex items-center mb-2">
          <button 
            onClick={() => navigate(-1)} 
            className="mr-3 p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors active:scale-90"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">通知中心</h1>
        </div>
        <p className="text-sm text-gray-500 ml-10 font-medium">4 種分類檢視</p>
      </header>

      {/* 分類選擇器 */}
      <nav className="bg-gray-50 px-6 py-3 shrink-0">
        <div className="flex space-x-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as NotificationType)}
              className={`px-5 py-2 rounded-xl text-sm font-black transition-all ${
                activeTab === tab.id 
                  ? 'bg-blue-500 text-white shadow-md shadow-blue-100' 
                  : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* 通知列表 */}
      <div className="flex-1 overflow-y-auto px-4 py-4 scrollbar-hide">
        <div className="space-y-3 pb-24">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((n) => (
              <div 
                key={n.id} 
                className={`bg-white rounded-2xl shadow-sm p-4 flex items-start space-x-3 active:scale-[0.98] transition-all border border-gray-50 ${n.borderClass}`}
              >
                <div className={`w-10 h-10 ${n.colorClass} rounded-full flex items-center justify-center flex-shrink-0 shadow-sm`}>
                  <i className={`fas ${n.icon} text-white text-sm`}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-black text-gray-900 text-[14px]">{n.title}</h3>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter ${n.bgColorClass}`}>
                      {n.typeLabel}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mt-1 font-medium">{n.content}</p>
                  <p className="text-gray-400 text-[11px] mt-2 font-bold uppercase tracking-wider">{n.time}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-gray-300">
              <i className="fas fa-bell-slash text-5xl mb-4 opacity-20"></i>
              <p className="font-black text-sm uppercase tracking-widest">目前沒有相關通知</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
