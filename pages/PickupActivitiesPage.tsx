
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SportType } from '../types';
import { MOCK_ACTIVITIES, SPORT_LABELS } from '../constants';
import ActivityCard from '../components/ActivityCard';

interface PickupActivitiesPageProps {
  selectedSport: SportType;
  onSelectSport: (sport: SportType) => void;
  selectedVenue: string;
}

const PickupActivitiesPage: React.FC<PickupActivitiesPageProps> = ({ selectedSport, onSelectSport, selectedVenue }) => {
  const navigate = useNavigate();

  const filteredActivities = selectedSport === 'all' 
    ? MOCK_ACTIVITIES 
    : MOCK_ACTIVITIES.filter(a => a.type === selectedSport);

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-[#f8fafc] font-['Noto_Sans_TC'] scrollbar-hide">
      {/* 復刻原本 VenueSelectionPage 的精簡 Header */}
      <header className="bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] text-white shadow-lg p-5 rounded-b-[3rem] shrink-0 z-50">
        <div className="flex justify-between items-center mb-1">
          <div className="flex items-center gap-4">
            {/* 返回按鈕 */}
            <button 
              onClick={() => navigate(-1)}
              className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md active:scale-90 transition-all border border-white/10"
            >
              <i className="fas fa-chevron-left text-sm"></i>
            </button>

            {/* 地區資訊 */}
            <div className="flex flex-col cursor-pointer" onClick={() => navigate('/select-district')}>
              <p className="text-[10px] text-white/70 font-bold uppercase tracking-widest leading-none mb-1">臨打活動</p>
              <div className="flex items-center gap-1.5">
                <h1 className="text-[19px] font-black text-white leading-tight">{selectedVenue}</h1>
                <i className="fas fa-chevron-down text-[10px] opacity-70"></i>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 主要內容區塊 */}
      <main className="flex-1 p-5 space-y-4 pb-32">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest">推薦活動 ({filteredActivities.length})</h2>
          <span className="text-[10px] font-black text-blue-500 flex items-center gap-1 bg-blue-50 px-2.5 py-1 rounded-lg">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
            即時更新
          </span>
        </div>
        
        <div className="grid grid-cols-1 gap-1">
          {filteredActivities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>

        {filteredActivities.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-300">
            <i className="fas fa-search text-5xl mb-4 opacity-20"></i>
            <p className="font-black text-sm uppercase tracking-widest">找不到相關活動</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default PickupActivitiesPage;
