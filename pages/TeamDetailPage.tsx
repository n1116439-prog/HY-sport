
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface TeamDetailPageProps {
  showToast: (msg: string) => void;
}

const TeamDetailPage: React.FC<TeamDetailPageProps> = ({ showToast }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // 模擬數據
  const teamData = {
    name: '籃球職人教學團隊',
    category: '籃球專業',
    rating: '4.9',
    slogan: '專業籃球教學，培養未來之星',
    coverImg: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    stats: [
      { label: '學員數', value: '1,250+', color: 'bg-orange-50 text-orange-600' },
      { label: '課程數', value: '15', color: 'bg-blue-50 text-blue-600' },
      { label: '年經驗', value: '8', color: 'bg-green-50 text-green-600' },
      { label: '教練數', value: '8', color: 'bg-indigo-50 text-indigo-600' },
    ],
    mission: '籃球職人教學團隊成立於2016年，由一群熱愛籃球的專業教練組成。我們致力於推廣籃球運動，培養學員的運動技能與團隊精神。團隊擁有豐富的教學經驗，從基礎入門到進階技巧，都有完善的規劃。',
    coaches: [
      { name: 'Jordan', initial: 'J', color: 'bg-orange-500', exp: '8年專業教學經驗' },
      { name: 'Mike', initial: 'M', color: 'bg-red-500', exp: '前職業球員，10年教學經驗' },
      { name: 'Kobe', initial: 'K', color: 'bg-blue-500', exp: '青少年籃球專家，6年經驗' },
    ]
  };

  return (
    <div className="flex flex-col h-full bg-white font-['Noto_Sans_TC'] overflow-hidden">
      {/* Scrollable Area */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        
        {/* Top Media Section */}
        <div className="relative h-[380px] bg-gray-900 overflow-hidden shrink-0">
          <img 
            src={teamData.coverImg} 
            alt={teamData.name} 
            className="w-full h-full object-cover opacity-85" 
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/25"></div>
          
          {/* Back Button */}
          <button 
            onClick={() => navigate(-1)}
            className="absolute top-6 left-6 w-10 h-10 bg-black/20 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white active:scale-90 transition-all hover:bg-black/30 z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Team Identity - Bottom Overlay */}
          <div className="absolute bottom-10 left-6 right-6">
            <div className="flex items-center space-x-2.5 mb-3">
              <span className="px-2.5 py-1 bg-blue-600 text-white text-[10px] font-black rounded-lg uppercase tracking-wider shadow-sm">
                {teamData.category}
              </span>
              <div className="flex items-center space-x-1 px-2.5 py-1 bg-white/20 backdrop-blur-md rounded-lg text-white border border-white/10">
                <svg className="w-3 h-3 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-[11px] font-black">{teamData.rating}</span>
              </div>
            </div>
            <h1 className="text-[28px] font-black text-gray-900 leading-tight drop-shadow-sm">{teamData.name}</h1>
            <p className="text-[14px] text-gray-500 font-bold mt-1.5 opacity-80">{teamData.slogan}</p>
          </div>
        </div>

        {/* Content Section */}
        <div className="px-6 pb-32 space-y-10">
          
          {/* Core Stats */}
          <div className="grid grid-cols-4 gap-3 pt-8">
            {teamData.stats.map((stat, idx) => (
              <div key={idx} className={`${stat.color} rounded-[28px] py-4.5 flex flex-col items-center shadow-sm active:scale-95 transition-transform`}>
                <span className="text-[17px] font-black">{stat.value}</span>
                <span className="text-[9px] font-black opacity-50 mt-1 uppercase tracking-widest">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Detailed Briefing */}
          <section className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-[8px] h-6 bg-blue-600 rounded-full"></div>
              <h3 className="text-[19px] font-black text-gray-900">團隊使命</h3>
            </div>
            <p className="text-[14px] text-gray-400 font-bold leading-relaxed opacity-85">
              {teamData.mission}
            </p>
          </section>

          {/* Coaches Showcase */}
          <section className="space-y-6 pb-10">
            <div className="flex items-center justify-between">
              <h3 className="text-[19px] font-black text-gray-900">師資團隊</h3>
              <span className="text-blue-600 text-[12px] font-black cursor-pointer" onClick={() => showToast('查看更多師資')}>查看全部</span>
            </div>
            <div className="flex space-x-3.5 overflow-x-auto scrollbar-hide pb-2">
              {teamData.coaches.map((coach, idx) => (
                <div key={idx} className="flex-shrink-0 w-32 bg-gray-50 rounded-[30px] p-4 flex flex-col items-center text-center group active:bg-blue-50 transition-colors">
                  <div className={`w-14 h-14 rounded-full ${coach.color} border-[3px] border-white shadow-sm flex items-center justify-center text-white font-black text-xl mb-3 group-hover:scale-110 transition-transform`}>
                    {coach.initial}
                  </div>
                  <h5 className="text-[13px] font-black text-gray-900">教練 {coach.name}</h5>
                  <p className="text-[10px] text-gray-400 font-bold mt-1 opacity-70 line-clamp-2">{coach.exp}</p>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>

      {/* Floating Action Bar - Fixed at Bottom */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-md px-6 z-[110]">
        <div className="bg-white/85 backdrop-blur-xl border border-gray-100 p-3.5 rounded-[35px] shadow-[0_15px_45px_rgba(0,0,0,0.12)] flex gap-3">
          <button 
            onClick={() => navigate(`/team/${id}/locations`)}
            className="flex-1 py-4 bg-gray-100 text-gray-900 rounded-[28px] font-black text-[14px] active:scale-95 transition-all hover:bg-gray-200"
          >
            課程查詢
          </button>
          <button 
            onClick={() => navigate('/payment')}
            className="flex-[1.4] py-4 bg-gradient-to-r from-[#3b82f6] to-[#1d4ed8] text-white rounded-[28px] font-black text-[14px] shadow-lg shadow-blue-200 active:scale-95 transition-all hover:shadow-xl"
          >
            立即報約
          </button>
        </div>
      </div>

    </div>
  );
};

export default TeamDetailPage;
