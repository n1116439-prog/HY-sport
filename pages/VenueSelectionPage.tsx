
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SportType } from '../types';
import { SPORT_LABELS } from '../constants';

interface VenueSelectionPageProps {
  currentDistrict: string;
  onSelect: (venue: string) => void;
}

const VenueSelectionPage: React.FC<VenueSelectionPageProps> = ({ currentDistrict, onSelect }) => {
  const navigate = useNavigate();
  const [bookmarked, setBookmarked] = useState<string[]>(['大安運動中心']);
  const [selectedSport, setSelectedSport] = useState<SportType>('all');
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLDivElement;
      setIsScrolled(target.scrollTop > 50);
    };
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (container) container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleBookmark = (e: React.MouseEvent, venueName: string) => {
    e.stopPropagation();
    setBookmarked(prev => 
      prev.includes(venueName) 
        ? prev.filter(name => name !== venueName) 
        : [...prev, venueName]
    );
  };

  const venues = [
    { name: '大安運動中心', icon: '🏀', area: '台北市大安區', desc: '設施完善，交通便利', type: 'basketball' },
    { name: '信義運動中心', icon: '🏸', area: '台北市信義區', desc: '熱門羽球場館', type: 'badminton' },
    { name: '松山運動中心', icon: '🏐', area: '台北市松山區', desc: '專業排球場地', type: 'volleyball' },
    { name: '中山運動中心', icon: '⚽', area: '台北市中山區', desc: '多功能運動場域', type: 'soccer' },
  ];

  const filteredVenues = selectedSport === 'all' 
    ? venues 
    : venues.filter(v => v.type === selectedSport);

  const sports: SportType[] = ['all', 'basketball', 'badminton', 'volleyball', 'tennis'];

  return (
    <div ref={scrollContainerRef} className="flex flex-col h-full bg-[#f8fafc] font-['Noto_Sans_TC'] overflow-y-auto scrollbar-hide">
      {/* 復刻原本 PickupActivitiesPage 的複合型 Header */}
      <header className={`bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] text-white shadow-lg sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'p-3 rounded-b-[20px]' : 'p-4 rounded-b-[30px]'
      }`}>
        
        {/* Top Section */}
        <div className={`flex justify-between items-center transition-all duration-300 overflow-hidden ${
          isScrolled ? 'max-h-0 opacity-0 mb-0' : 'max-h-20 opacity-100 mb-4'
        }`}>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate(-1)}
              className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center active:scale-90 transition-all"
            >
              <i className="fas fa-chevron-left text-sm"></i>
            </button>
            <div className="flex flex-col cursor-pointer" onClick={() => navigate('/select-district')}>
              <div className="flex items-center gap-1.5">
                <h1 className="text-[18px] font-bold leading-tight">FitApp 場地</h1>
                <i className="fas fa-chevron-down text-[10px] opacity-70"></i>
              </div>
              <p className="text-[13px] opacity-80">{currentDistrict}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="relative w-9 h-9 bg-white/20 rounded-full flex items-center justify-center active:scale-95 transition-all">
              <i className="fas fa-bell text-[18px]"></i>
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#f97316] rounded-full flex items-center justify-center text-[10px] font-bold border border-[#1d4ed8]">5</span>
            </button>
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-[14px] font-bold cursor-pointer" onClick={() => navigate('/profile')}>
              李
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative w-full mb-3">
          <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-white/60 text-sm"></i>
          <input 
            type="text" 
            placeholder="搜尋場館名稱、地址..." 
            className="w-full pl-10 pr-4 py-2.5 bg-white/15 rounded-xl text-white placeholder-white/60 text-[14px] outline-none focus:bg-white/25 transition-all border-none shadow-inner"
          />
        </div>

        {/* Sport Categories */}
        <div className={`flex gap-2 overflow-x-auto scrollbar-hide transition-all duration-300 ${
          isScrolled ? 'pb-1' : 'pb-2'
        }`}>
          {sports.map((sport) => {
            const isActive = selectedSport === sport;
            return (
              <button
                key={sport}
                onClick={() => setSelectedSport(sport)}
                className={`flex-shrink-0 px-5 py-1.5 rounded-full text-[12px] font-black transition-all whitespace-nowrap border ${
                  isActive 
                    ? 'bg-white text-[#1d4ed8] border-white shadow-md' 
                    : 'bg-white/10 text-white border-white/20'
                }`}
              >
                {SPORT_LABELS[sport]}
              </button>
            );
          })}
        </div>
      </header>

      <div className="flex-1 p-5 scrollbar-hide pb-32">
        <section className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-[21px] font-black text-gray-900 tracking-tight">熱門場館推薦</h3>
            <button className="text-[13px] font-bold text-[#3b82f6] hover:opacity-70 transition-opacity">查看全部</button>
          </div>
          
          <div className="space-y-4">
            {filteredVenues.map((venue) => {
              const isBookmarked = bookmarked.includes(venue.name);
              return (
                <div 
                  key={venue.name}
                  onClick={() => onSelect(venue.name)}
                  className="bg-white p-5 rounded-[2.5rem] shadow-[0_12px_30px_rgba(0,0,0,0.03)] border border-gray-50/50 flex items-center gap-5 cursor-pointer transition-all active:scale-[0.98] group"
                >
                  <div className="w-16 h-16 bg-[#f0f7ff] text-[32px] rounded-2xl flex items-center justify-center shadow-inner shrink-0 group-hover:scale-105 transition-transform duration-300">
                    {venue.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-[18px] font-black text-gray-900 leading-tight">{venue.name}</h4>
                    <p className="text-[12px] text-gray-400 font-bold mt-1 tracking-tight">{venue.area}</p>
                    <p className="text-[14px] text-[#3b82f6] font-black mt-2 opacity-90 truncate">{venue.desc}</p>
                  </div>
                  <button 
                    onClick={(e) => toggleBookmark(e, venue.name)}
                    className={`shrink-0 w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                      isBookmarked ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-gray-200 hover:text-gray-300'
                    }`}
                  >
                    <i className={`${isBookmarked ? 'fas' : 'far'} fa-bookmark text-xl`}></i>
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default VenueSelectionPage;
