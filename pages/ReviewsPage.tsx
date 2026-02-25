
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_ACTIVITIES, SPORT_ICONS } from '../constants';

interface ReviewsPageProps {
  showToast: (msg: string) => void;
}

const ReviewsPage: React.FC<ReviewsPageProps> = ({ showToast }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const activity = MOCK_ACTIVITIES.find(a => a.id === id) || MOCK_ACTIVITIES[0];
  const [rating, setRating] = useState(5);

  const handleSubmit = () => {
    showToast('感謝您的評價！');
    setTimeout(() => navigate('/my'), 1000);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <header className="bg-white px-4 py-4 flex items-center justify-between border-b border-gray-100 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-full">
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-black text-gray-900">發表評價</h1>
        </div>
        <button onClick={handleSubmit} className="text-orange-500 font-black text-sm px-4">提交</button>
      </header>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-[2.5rem] p-6 mb-8 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-3xl backdrop-blur-md">
              {SPORT_ICONS[activity.type]}
            </div>
            <div>
              <h3 className="font-black text-lg">{activity.title}</h3>
              <p className="text-gray-400 font-medium text-xs mt-1">{activity.date} ・ {activity.venue}</p>
            </div>
          </div>
        </div>

        <div className="space-y-10">
          <div className="text-center">
            <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6">整體運動體驗</h4>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button 
                  key={star} 
                  onClick={() => setRating(star)}
                  className="w-14 h-14 text-4xl active:scale-90 transition-all filter drop-shadow-sm"
                >
                  {star <= rating ? '⭐' : '☆'}
                </button>
              ))}
            </div>
            <p className="mt-4 text-orange-500 font-black text-lg">
              {rating === 5 ? '太完美了！' : rating === 4 ? '很棒的體驗' : rating === 3 ? '還可以' : '需要改進'}
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest px-2">詳細評論</h4>
            <textarea 
              rows={5} 
              placeholder="分享一下這次打球的心得吧... (場地環境、隊長組織、隊友程度等)"
              className="w-full p-6 bg-gray-50 border-none rounded-[2rem] text-sm font-medium focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all outline-none shadow-inner resize-none"
            />
          </div>

          <div className="space-y-4 pb-10">
             <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest px-2">選擇標籤</h4>
             <div className="flex flex-wrap gap-2">
                {['組織良好', '氣氛融洽', '高手雲集', '場地乾淨', '準時開始', '新手友善'].map(t => (
                  <button key={t} className="px-5 py-2.5 bg-white border border-gray-100 text-gray-600 font-bold text-xs rounded-full hover:bg-orange-50 hover:text-orange-500 hover:border-orange-200 transition-all">
                    {t}
                  </button>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsPage;
