
import React from 'react';
import { Activity } from '../types';
import { SPORT_ICONS } from '../constants';
import { useNavigate } from 'react-router-dom';

interface ActivityCardProps {
  activity: Activity;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/activity/${activity.id}`)}
      className="bg-white rounded-[2rem] p-5 shadow-sm border border-gray-100 relative active:scale-[0.98] transition-all group mb-4"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 ${
          activity.type === 'basketball' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
        }`}>
          {SPORT_ICONS[activity.type]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-gray-900 truncate">{activity.title}</h3>
            <span className="text-[10px] font-black text-blue-500 bg-blue-50 px-2 py-0.5 rounded-lg uppercase">將到來</span>
          </div>
          <p className="text-xs text-gray-400 font-bold mt-0.5">{activity.venue}</p>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
          <i className="far fa-clock w-4 opacity-40"></i>
          {activity.date} {activity.time}
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
          <i className="fas fa-map-marker-alt w-4 opacity-40 text-red-400"></i>
          <span className="truncate">{activity.location}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-50">
        <div>
          <p className="text-lg font-black text-gray-900">NT$ {activity.price}</p>
          <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">一人費用</p>
        </div>
        <button className="px-6 py-2.5 bg-[#2563eb] text-white rounded-xl font-black text-xs shadow-md shadow-blue-100 btn-press">
          查看詳情
        </button>
      </div>
    </div>
  );
};

export default ActivityCard;
