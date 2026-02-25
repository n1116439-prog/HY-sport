
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type TabType = 'courses' | 'venues' | 'completed';

const MyActivitiesPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('courses');

  // 模擬數據
  const courseData = [
    { 
      id: 'c1', 
      title: '兒童籃球基礎班 (U10)', 
      coach: '王教練', 
      studentName: '小寶', 
      time: '週一、週三 19:00-20:00', 
      progress: 60, 
      current: 3, 
      total: 5, 
      nextMonth: 'JUL',
      nextDay: '17',
      nextDate: '2026-02-10' 
    },
    { 
      id: 'c2', 
      title: '成人羽球班', 
      coach: '李教練', 
      studentName: '王小明', 
      time: '週二、週四 19:30-20:30', 
      progress: 20, 
      current: 2, 
      total: 10, 
      nextMonth: 'JUL',
      nextDay: '19',
      nextDate: '2026-02-12' 
    }
  ];

  const venueData = [
    {
      id: 'v1',
      title: '大安運動中心 - 籃球場 A',
      time: '2026-02-05 14:00-16:00',
      location: '台北市大安區辛亥路三段 55 號',
      status: '已確認'
    }
  ];

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] font-['Noto_Sans_TC']">
      {/* Header */}
      <header className="bg-white px-5 py-4 flex items-center gap-3 sticky top-0 z-50">
        <button onClick={() => navigate(-1)} className="p-1 text-gray-400 active:scale-90 transition-transform">
          <i className="fas fa-chevron-left text-lg"></i>
        </button>
        <h1 className="text-[18px] font-black text-gray-900">我的預約記錄</h1>
      </header>

      {/* Tabs */}
      <div className="bg-white px-5 border-b border-gray-100 sticky top-[61px] z-10">
        <div className="flex gap-6">
          {[
            { id: 'courses', label: '課程', badge: '2' },
            { id: 'venues', label: '場館預約', badge: null },
            { id: 'completed', label: '已完成', badge: null }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`py-3 text-[14px] font-black transition-all relative ${
                activeTab === tab.id ? 'text-[#F97316]' : 'text-gray-400'
              }`}
            >
              {tab.label}
              {tab.badge && (
                <span className="ml-1.5 px-1.5 py-0.5 bg-[#F97316] text-white text-[9px] rounded-full font-black">
                  {tab.badge}
                </span>
              )}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#F97316] rounded-t-full shadow-sm"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* List Content */}
      <main className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide pb-24">
        {activeTab === 'courses' && courseData.map((item) => (
          <div key={item.id} className="bg-white rounded-[28px] p-5 shadow-[0_10px_25px_rgba(0,0,0,0.03)] border border-gray-50 slide-up group">
            {/* 標題與標籤 */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[17px] font-black text-gray-900 leading-tight">{item.title}</h3>
              <span className="bg-[#EFF6FF] text-[#3B82F6] text-[10px] font-black px-2.5 py-1 rounded-full uppercase">進行中</span>
            </div>
            
            {/* 教練與學員資訊 - 網格佈局縮小空間 */}
            <div className="grid grid-cols-2 gap-y-3 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center text-orange-500">
                  <i className="fas fa-user-tie text-[14px]"></i>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] text-gray-400 font-bold uppercase tracking-tight">負責教練</span>
                  <span className="text-gray-900 font-black text-[13px]">{item.coach}</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-500">
                  <i className="fas fa-user text-[14px]"></i>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] text-blue-400 font-bold uppercase tracking-tight">報名學員</span>
                  <span className="text-blue-600 font-black text-[13px]">{item.studentName}</span>
                </div>
              </div>
              <div className="col-span-2 flex items-center gap-2.5 mt-1">
                <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                  <i className="far fa-clock text-[14px]"></i>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] text-gray-400 font-bold uppercase tracking-tight">上課時間</span>
                  <span className="text-gray-900 font-black text-[13px]">{item.time}</span>
                </div>
              </div>
            </div>

            {/* 進度條區塊 - 縮小高度 */}
            <div className="bg-[#F8FAFC] rounded-2xl p-4 mb-4 border border-gray-50/50">
              <div className="flex justify-between items-center mb-2.5">
                <p className="text-[11px] font-black text-gray-400">課程進度：{item.current}/{item.total} 堂</p>
                <p className="text-[13px] font-black text-blue-600">{item.progress}%</p>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="bg-blue-600 h-full rounded-full transition-all duration-1000" 
                  style={{ width: `${item.progress}%` }}
                ></div>
              </div>
            </div>

            {/* 功能按鈕 - 緊湊設計 */}
            <div className="flex gap-3">
              <button 
                onClick={() => navigate(`/my/course/${item.id}`)} 
                className="flex-1 py-3 bg-[#F1F5F9] text-[#475569] rounded-xl font-black text-[13px] active:scale-95 transition-all"
              >
                課程詳情
              </button>
              <button className="flex-1 py-3 bg-[#2563EB] text-white rounded-xl font-black text-[13px] shadow-md shadow-blue-100 active:scale-95 transition-all">
                發表評價
              </button>
            </div>
          </div>
        ))}

        {activeTab === 'venues' && venueData.map((item) => (
          <div key={item.id} className="bg-white rounded-[28px] p-5 shadow-sm border border-gray-50 slide-up group">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[16px] font-black text-gray-900 leading-tight">{item.title}</h3>
              <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-2.5 py-1 rounded-full">{item.status}</span>
            </div>
            <div className="space-y-2 mb-5 text-[12px] font-bold text-gray-500">
              <div className="flex items-center gap-2">
                <i className="far fa-clock w-4 text-slate-300"></i>
                {item.time}
              </div>
              <div className="flex items-center gap-2">
                <i className="fas fa-map-marker-alt w-4 text-slate-300"></i>
                {item.location}
              </div>
            </div>
            <button 
              onClick={() => navigate(`/my/venue/${item.id}`)}
              className="w-full py-3 bg-gray-900 text-white rounded-xl font-black text-[13px] active:scale-95 transition-all"
            >
              查看憑證
            </button>
          </div>
        ))}

        {activeTab === 'completed' && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-300">
            <i className="fas fa-folder-open text-5xl mb-4 opacity-20"></i>
            <p className="font-black text-[13px] uppercase tracking-widest">目前沒有已完成的紀錄</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default MyActivitiesPage;
