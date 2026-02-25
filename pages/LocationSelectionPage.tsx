
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const LOCATIONS = [
  { id: 'l1', name: '台北信義館', address: '台北市信義區信義路五段5號', availableClasses: 8, phone: '02-2345-6789' },
  { id: 'l2', name: '台北內湖館', address: '台北市內湖區內湖路一段100號', availableClasses: 6, phone: '02-2658-9999' },
  { id: 'l3', name: '新竹竹北館', address: '新竹縣竹北市光明六路1號', availableClasses: 4, phone: '03-555-1234' }
];

const LocationSelectionPage: React.FC = () => {
  const navigate = useNavigate();
  const { id: teamId } = useParams<{ id: string }>();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLocations = LOCATIONS.filter(l => 
    l.name.includes(searchTerm) || l.address.includes(searchTerm)
  );

  return (
    <div className="flex flex-col h-full bg-gray-50 pb-10 font-['Noto_Sans_TC']">
      {/* Header */}
      <header className="bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] px-5 py-6 text-white rounded-b-[35px] sticky top-0 z-[100] shadow-md">
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate(-1)} className="p-1 active:scale-90 transition-transform">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-[20px] font-black tracking-tight">選擇上課地點</h1>
        </div>
      </header>

      <div className="px-5 py-7">
        {/* Search Bar */}
        <div className="relative mb-7">
          <input
            type="text"
            placeholder="搜尋地點或地址..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 bg-white border-0 rounded-[18px] focus:outline-none focus:ring-2 focus:ring-blue-500/10 text-[14px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all placeholder-gray-300"
          />
          <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Location Cards */}
        <div className="space-y-6">
          {filteredLocations.map(location => (
            <div 
              key={location.id}
              onClick={() => navigate(`/team/${teamId}/location/${location.id}/classes`)}
              className="bg-white rounded-[35px] shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-transparent hover:border-blue-100 cursor-pointer active:scale-[0.98] transition-all group overflow-hidden"
            >
              <div className="p-7">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-black text-gray-900 text-[18px] group-hover:text-blue-600 transition-colors leading-tight">{location.name}</h3>
                  <span className="bg-[#EFF6FF] text-blue-600 px-2.5 py-1 rounded-lg text-[11px] font-black">
                    {location.availableClasses} 個課堂
                  </span>
                </div>
                <p className="text-gray-300 text-[13px] font-bold mb-5 flex items-start opacity-90">
                  <svg className="w-4 h-4 mr-1.5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <span className="flex-1 leading-relaxed">{location.address}</span>
                </p>
                
                <div className="flex items-center justify-between pt-5 border-t border-gray-50 mt-1">
                  <div className="flex items-center text-gray-300 text-[13px] font-bold">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {location.phone}
                  </div>
                  <svg className="w-5 h-5 text-gray-200 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationSelectionPage;
