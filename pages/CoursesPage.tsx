
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface CoursesPageProps {
  currentDistrict: string;
  showToast: (msg: string) => void;
}

const CoursesPage: React.FC<CoursesPageProps> = ({ currentDistrict, showToast }) => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('全部');
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = scrollContainerRef.current?.scrollTop || 0;
      setIsScrolled(scrollTop > 50);
    };
    const container = scrollContainerRef.current;
    container?.addEventListener('scroll', handleScroll);
    return () => container?.removeEventListener('scroll', handleScroll);
  }, []);

  const teams = [
    {
      id: 'basketball',
      name: '籃球職人教學團隊',
      slogan: '專業籃球教學團隊，擁有豐富的青少年及成人籃球訓練經驗',
      category: '籃球專業',
      rating: 4.9,
      certification: '認證團隊',
      ratingBadge: '5★',
      coverImg: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      coachesCount: 8,
      stats: '1,250+ 學員 · 15 個課程 · 3.2k 點擊',
      coachList: [
        { initial: 'J', bg: 'bg-orange-500', name: 'Jordan' },
        { initial: 'M', bg: 'bg-red-500', name: 'Mike' },
        { initial: 'K', bg: 'bg-blue-500', name: 'Kobe' }
      ]
    },
    {
      id: 'badminton',
      name: '羽球精英學院',
      slogan: '國際級羽球教練團隊，培養出多位全國冠軍選手',
      category: '羽球專業',
      rating: 4.8,
      certification: '金牌團隊',
      ratingBadge: '4.8★',
      coverImg: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      coachesCount: 6,
      stats: '890+ 學員 · 12 個課程 · 2.1k 點擊',
      coachList: [
        { initial: 'L', bg: 'bg-green-500', name: 'Linda' },
        { initial: 'C', bg: 'bg-purple-500', name: 'Chen' }
      ]
    }
  ];

  const filters = ['全部', '籃球', '羽球', '網球'];

  return (
    <div ref={scrollContainerRef} className="flex flex-col h-full bg-[#f3f4f6] font-['Noto_Sans_TC'] overflow-y-auto scrollbar-hide pb-24">
      <header className={`fixed top-0 left-0 right-0 z-[100] max-w-md mx-auto bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] px-5 transition-all duration-300 ${
        isScrolled ? 'rounded-b-[25px] py-4 shadow-lg' : 'rounded-b-[35px] py-6'
      }`}>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/select-district')}>
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white shadow-inner">
               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                 <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
               </svg>
            </div>
            <div className="flex flex-col">
              <p className="text-blue-100 text-[10px] font-bold opacity-80 leading-none mb-1">區域選取</p>
              <div className="flex items-center gap-1">
                <h1 className="text-[17px] font-black text-white">{currentDistrict}</h1>
                <svg className="w-4 h-4 text-white opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="relative w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-md active:scale-90 transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center text-[10px] font-black border border-white">5</span>
            </button>
            <div onClick={() => navigate('/profile')} className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white font-black text-sm border border-white/20 cursor-pointer">
              李
            </div>
          </div>
        </div>

        <div className="relative">
          <svg className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            type="text" 
            placeholder="搜尋教學團隊或教練..." 
            className="w-full pl-11 pr-4 py-3 bg-white/15 rounded-2xl text-white placeholder-white/50 outline-none focus:bg-white/25 transition-all text-sm font-medium shadow-inner"
          />
        </div>
      </header>

      <div className={`${isScrolled ? 'h-32' : 'h-48'} transition-all duration-300`} />

      <div className={`px-5 py-4 sticky z-50 bg-[#f3f4f6]/95 backdrop-blur-sm transition-all duration-300 ${isScrolled ? 'top-[75px]' : 'top-[145px]'}`}>
        <div className="flex overflow-x-auto space-x-3 pb-1 scrollbar-hide">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`flex-shrink-0 px-7 py-2 rounded-full text-[13px] font-black transition-all border ${
                activeFilter === f
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                  : 'bg-white text-gray-400 border-gray-100'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 space-y-6 flex-1 mt-2">
        {teams
          .filter(t => activeFilter === '全部' || t.name.includes(activeFilter) || t.category.includes(activeFilter))
          .map((team) => (
          <div 
            key={team.id}
            onClick={() => navigate(`/team/${team.id}`)}
            className="bg-white rounded-[35px] overflow-hidden cursor-pointer active:scale-[0.98] transition-all shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-transparent hover:border-blue-100 group"
          >
            <div className="relative h-44 overflow-hidden">
              <img src={team.coverImg} alt={team.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute top-4 left-4 flex space-x-2">
                <span className="bg-[#22C55E] text-white px-3 py-1 rounded-xl text-[10px] font-black shadow-lg uppercase tracking-wider">
                  {team.certification}
                </span>
                <span className="bg-[#F97316] text-white px-3 py-1 rounded-xl text-[10px] font-black shadow-lg">
                  {team.ratingBadge}
                </span>
              </div>
              <div className="absolute bottom-4 right-4 bg-black/40 backdrop-blur-md text-white px-3 py-1 rounded-xl text-[10px] font-black">
                {team.coachesCount}位教練
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="bg-orange-50 text-orange-600 text-[11px] font-black px-3 py-1 rounded-lg uppercase tracking-wider">
                  {team.category}
                </span>
                <div className="flex items-center text-[13px] text-gray-700 font-black">
                  <svg className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>{team.rating}</span>
                </div>
              </div>
              
              <h3 className="font-black text-gray-900 text-[20px] mb-2 group-hover:text-blue-600 transition-colors leading-tight">{team.name}</h3>
              <p className="text-[13px] text-gray-400 font-bold mb-6 line-clamp-2 leading-relaxed">{team.slogan}</p>
              
              <div className="pt-5 border-t border-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {team.coachList.map((coach, i) => (
                      <div key={i} className={`w-8 h-8 rounded-full ${coach.bg} border-2 border-white flex items-center justify-center text-white text-[10px] font-black shadow-sm`}>
                        {coach.initial}
                      </div>
                    ))}
                  </div>
                  <span className="text-[13px] text-gray-700 font-black">
                    {team.coachList.map(c => c.name).join(' · ')}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-1.5 text-gray-400 text-[11px] font-bold">
                  <span>{team.stats}</span>
                </div>
                <div className="flex items-center text-blue-600 font-black text-[13px]">
                  查看詳細
                  <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
