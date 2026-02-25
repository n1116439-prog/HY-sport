
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { RentalVenue } from '../types';
import { MOCK_RENTAL_VENUES, SPORT_ICONS } from '../constants';
import { X, ChevronLeft, ChevronRight, MapPin, Info } from 'lucide-react';

interface VenueRentalPageProps {
  currentDistrict: string;
}

const VenueRentalPage: React.FC<VenueRentalPageProps> = ({ currentDistrict }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVenue, setSelectedVenue] = useState<RentalVenue | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const getVenueGradient = (type: string) => {
    switch (type) {
      case 'badminton': return 'from-[#f97316] to-[#ea580c]';
      case 'basketball': return 'from-[#3b82f6] to-[#1d4ed8]';
      case 'volleyball': return 'from-[#8b5cf6] to-[#7c3aed]';
      default: return 'from-[#f59e0b] to-[#d97706]';
    }
  };

  const filteredVenues = MOCK_RENTAL_VENUES.filter(v =>
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    v.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const hotVenues = filteredVenues.filter(v => v.popular);
  const allVenues = filteredVenues;

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollTop = scrollContainerRef.current.scrollTop;
      setIsScrolled(scrollTop > 40);
    }
  };

  const VenueCard: React.FC<{ venue: RentalVenue }> = ({ venue }) => (
    <div className="bg-white rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.06)] border border-gray-100 transition-all active:scale-[0.97] duration-200">
      <div className={`h-32 relative overflow-hidden bg-gradient-to-br ${getVenueGradient(venue.type)} flex items-center justify-center`}>
        <span className="text-white font-black text-lg text-center px-6 drop-shadow-md z-10 leading-tight">
          {venue.name}
        </span>
        <div className="absolute bottom-2 right-2 flex gap-1 opacity-80">
          <span className="text-2xl drop-shadow-lg">{SPORT_ICONS[venue.type]}</span>
        </div>
        {venue.popular && (
          <div className="absolute top-3 left-3">
            <div className="bg-gradient-to-br from-amber-400 to-orange-600 text-white px-3 py-1 rounded-full text-[10px] font-black flex items-center shadow-md">
              <i className="fas fa-star mr-1 text-[8px]"></i> 熱門
            </div>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="font-black text-gray-800 text-base mb-1 truncate">{venue.name}</h3>
            <div className="flex items-center text-gray-400 text-[11px] font-bold">
              <i className="fas fa-map-marker-alt mr-1.5 opacity-60"></i>
              {venue.location.split(' ').pop()}
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-black text-blue-600 tracking-tighter">NT$ {venue.pricePerHour}</div>
            <div className="text-[9px] text-gray-400 font-bold uppercase tracking-widest leading-none">/ 小時起</div>
          </div>
        </div>

        <p className="text-gray-500 text-[11px] font-medium mb-4 line-clamp-2 leading-relaxed">
          {venue.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black">
            {SPORT_ICONS[venue.type]} {venue.type === 'badminton' ? '羽球' : venue.type === 'basketball' ? '籃球' : '綜合'}
          </span>
          {venue.facilities.slice(0, 2).map(f => (
            <span key={f} className="bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full text-[10px] font-black">{f}</span>
          ))}
        </div>

        <div className="flex items-center justify-between mb-5 text-[10px] text-gray-400 font-bold border-t border-gray-50 pt-3">
          <div className="flex items-center gap-1">
            <i className="far fa-clock opacity-50"></i> {venue.openHours}
          </div>
          <div className="flex items-center gap-1">
            <i className="fas fa-layer-group opacity-50"></i> {venue.courts} 個場地
          </div>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={() => setSelectedVenue(venue)}
            className="flex-1 bg-white border-2 border-blue-500 text-blue-600 font-black py-2.5 rounded-xl transition-all active:scale-95 text-center text-xs"
          >
            查看詳情
          </button>
          <button 
            onClick={() => navigate('/reserve-venue')}
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-black py-2.5 rounded-xl transition-all active:scale-95 text-center text-xs shadow-md shadow-blue-100"
          >
            立即預約
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-hidden font-['Noto_Sans_TC']">
      <header 
        className={`bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] text-white z-50 shadow-lg sticky top-0 transition-all duration-300 ${
          isScrolled ? 'p-3 rounded-b-[20px]' : 'p-4 rounded-b-[30px]'
        }`}
      >
        <div className={`flex justify-between items-center transition-all duration-300 overflow-hidden ${
          isScrolled ? 'max-h-0 opacity-0 mb-0' : 'max-h-20 opacity-100 mb-4'
        }`}>
          <div className="flex items-center gap-2 cursor-pointer active:opacity-70 transition-all" onClick={() => navigate('/select-district')}>
            <svg className="w-5 h-5 opacity-80" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
            </svg>
            <div className="flex flex-col">
              <h1 className="text-[18px] font-bold leading-tight">FitApp</h1>
              <p className="text-[13px] opacity-80">{currentDistrict}</p>
            </div>
            <svg className="w-4 h-4 opacity-80 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              className="relative w-9 h-9 bg-white/20 rounded-full flex items-center justify-center active:scale-95 transition-all backdrop-blur-md" 
              onClick={() => navigate('/notifications')}
            >
              <i className="fas fa-bell text-[18px]"></i>
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#f97316] rounded-full flex items-center justify-center text-[10px] font-bold border border-[#1d4ed8]">5</span>
            </button>
            <div 
              className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-[14px] font-bold cursor-pointer active:scale-95 transition-all backdrop-blur-md border border-white/10" 
              onClick={() => navigate('/profile')}
            >
              李
            </div>
          </div>
        </div>

        <div className="relative w-full">
          <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-white/60 text-sm"></i>
          <input 
            type="text" 
            placeholder="搜尋場館名稱、地址..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/15 rounded-xl text-white placeholder-white/60 text-[14px] outline-none focus:bg-white/25 transition-all border-none shadow-inner"
          />
        </div>
      </header>

      <div 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-5 pb-32 scrollbar-hide space-y-8"
      >
        {hotVenues.length > 0 && (
          <section>
            <h2 className="text-[15px] font-black text-gray-900 mb-4 flex items-center gap-2 tracking-tight">
              <span className="text-xl">🔥</span> 熱門館舍
            </h2>
            <div className="grid grid-cols-1 gap-5">
              {hotVenues.map(v => <VenueCard key={v.id} venue={v} />)}
            </div>
          </section>
        )}

        <section>
          <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="text-[14px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <i className="fas fa-building text-sm opacity-30"></i>
              所有場館
            </h2>
            <span className="bg-gray-100 text-gray-400 px-3 py-1 rounded-lg text-[10px] font-black">
              {allVenues.length} 個館舍
            </span>
          </div>
          <div className="grid grid-cols-1 gap-5">
            {allVenues.map(v => <VenueCard key={v.id} venue={v} />)}
          </div>
        </section>
      </div>

      {selectedVenue && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedVenue(null)} />
          <div className="relative bg-white w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl animate-slide-up flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex items-center justify-between z-20">
              <h3 className="text-xl font-black text-gray-900 tracking-tight">{selectedVenue.name}</h3>
              <button onClick={() => setSelectedVenue(null)} className="w-9 h-9 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 active:scale-90">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
              {/* Image / Carousel Placeholder */}
              <div className="relative group">
                <div className={`h-56 rounded-3xl flex items-center justify-center shadow-inner relative bg-gradient-to-br ${getVenueGradient(selectedVenue.type)}`}>
                  <span className="text-7xl drop-shadow-2xl">{SPORT_ICONS[selectedVenue.type]}</span>
                </div>
                {/* Carousel Controls Mock */}
                <div className="absolute inset-y-0 left-2 flex items-center">
                  <button className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center text-gray-800 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronLeft size={18} />
                  </button>
                </div>
                <div className="absolute inset-y-0 right-2 flex items-center">
                  <button className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center text-gray-800 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight size={18} />
                  </button>
                </div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-white shadow-sm"></div>
                  <div className="w-2 h-2 rounded-full bg-white/50 shadow-sm"></div>
                </div>
              </div>

              {/* Title & Location */}
              <div>
                <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-1">{selectedVenue.name}</h2>
                <div className="flex items-center gap-2 text-gray-400 text-sm font-bold">
                  <MapPin size={14} className="text-blue-500" />
                  {selectedVenue.location}
                </div>
                <p className="text-gray-400 text-xs font-bold mt-1">None</p>
              </div>

              {/* Venue Types */}
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-black border border-blue-100">
                  <span>🏸</span> 羽球場
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-600 rounded-full text-sm font-black border border-orange-100">
                  <span>🏀</span> 籃球場
                </div>
              </div>

              {/* Info Section */}
              <div className="bg-slate-50 rounded-[2rem] p-6 space-y-4 border border-slate-100">
                <h4 className="text-base font-black text-gray-900 flex items-center gap-2">
                  <Info size={18} className="text-blue-500" />
                  場地資訊
                </h4>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 font-bold text-sm">租借費用</span>
                    <span className="text-blue-600 font-black text-base">NT$ {selectedVenue.pricePerHour}/小時起</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 font-bold text-sm">場地數量</span>
                    <span className="text-gray-900 font-black text-base">{selectedVenue.courts} 個場地</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 font-bold text-sm">營業時間</span>
                    <span className="text-gray-900 font-black text-base">{selectedVenue.openHours}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                 <p className="text-gray-500 text-sm font-medium leading-relaxed">
                   {selectedVenue.description}
                 </p>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-6 bg-white border-t border-gray-100 space-y-3">
              <button 
                onClick={() => navigate('/reserve-venue')}
                className="w-full bg-[#22c55e] hover:bg-[#16a34a] text-white font-black py-4 rounded-2xl text-lg shadow-xl shadow-green-100 transition-all active:scale-95"
              >
                立即預約 - NT$ {selectedVenue.pricePerHour}/小時起
              </button>
              <button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl text-lg shadow-xl shadow-blue-100 transition-all active:scale-95"
              >
                長租申請
              </button>
              <button 
                onClick={() => setSelectedVenue(null)}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-500 font-black py-4 rounded-2xl text-lg transition-all active:scale-95"
              >
                關閉
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VenueRentalPage;
