
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface DistrictSelectionPageProps {
  currentDistrict: string;
  onSelect: (district: string) => void;
}

const TAIWAN_REGIONS = [
  {
    region: '北部地區',
    cities: [
      { name: '台北市', districts: ['大安區', '信義區', '中山區', '內湖區', '南港區', '士林區', '北投區', '文山區'] },
      { name: '新北市', districts: ['板橋區', '中和區', '永和區', '新莊區', '土城區', '樹林區', '三重區', '蘆洲區'] },
      { name: '桃園市', districts: ['桃園區', '中壢區', '平鎮區', '八德區', '楊梅區'] },
    ]
  },
  {
    region: '中部地區',
    cities: [
      { name: '台中市', districts: ['西屯區', '北屯區', '南屯區', '太平區', '大里區', '豐原區'] },
      { name: '彰化縣', districts: ['彰化市', '員林市', '和美鎮'] },
    ]
  },
  {
    region: '南部地區',
    cities: [
      { name: '台南市', districts: ['永康區', '安南區', '東區', '北區', '南區', '中西區'] },
      { name: '高雄市', districts: ['三民區', '左營區', '鳳山區', '前鎮區', '楠梓區', '苓雅區'] },
      { name: '屏東縣', districts: ['屏東市', '潮州鎮', '東港鎮'] },
    ]
  }
];

const DistrictSelectionPage: React.FC<DistrictSelectionPageProps> = ({ currentDistrict, onSelect }) => {
  const navigate = useNavigate();

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          onSelect('台北市 信義區');
        },
        () => {
          alert('無法獲取您的位置');
        }
      );
    }
  };

  return (
    <div className="flex flex-col h-full bg-white font-['Noto_Sans_TC'] overflow-hidden">
      {/* Header - Font size reduced to 18px */}
      <header className="px-6 pt-6 pb-3 flex items-center justify-between bg-white relative">
        <h1 className="text-[18px] font-black text-gray-900">選擇區域</h1>
        <button 
          onClick={() => navigate(-1)} 
          className="w-8 h-8 flex items-center justify-center text-gray-400 active:scale-90 transition-all"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </header>

      <div className="flex-1 overflow-y-auto px-6 pb-12 scrollbar-hide">
        {/* Current Location Button - Font size reduced to 14px, Padding reduced */}
        <div className="mt-1 mb-8">
          <button 
            onClick={handleUseCurrentLocation}
            className="w-full py-3 bg-[#3b82f6] text-white rounded-xl font-black text-[14px] flex items-center justify-center gap-2 shadow-md shadow-blue-100 active:scale-[0.98] transition-all"
          >
            <i className="fas fa-location-dot text-xs"></i>
            使用當前位置
          </button>
        </div>

        {/* Region Sections */}
        <div className="space-y-8">
          {TAIWAN_REGIONS.map((regionGroup) => (
            <div key={regionGroup.region} className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-1 h-3 bg-blue-500 rounded-full"></div>
                <h2 className="text-[15px] font-black text-gray-900 tracking-tight">{regionGroup.region}</h2>
              </div>
              
              <div className="space-y-4">
                {regionGroup.cities.map((city) => (
                  <div key={city.name} className="border border-gray-50 rounded-[2rem] overflow-hidden shadow-sm bg-gray-50/30">
                    <div className="px-5 py-2.5 bg-white/50 border-b border-gray-100 flex justify-between items-center">
                      <h3 className="text-[13px] font-black text-gray-600">{city.name}</h3>
                      <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">{city.districts.length} 區域</span>
                    </div>
                    <div className="p-3">
                      <div className="grid grid-cols-3 gap-1.5">
                        {city.districts.map((district) => {
                          const fullLabel = `${city.name} ${district}`;
                          const isSelected = currentDistrict === fullLabel;
                          
                          return (
                            <button
                              key={district}
                              onClick={() => onSelect(fullLabel)}
                              className={`py-2 rounded-xl text-[12px] font-bold transition-all text-center border ${
                                isSelected 
                                  ? 'bg-[#eff6ff] text-[#3b82f6] border-[#dbeafe] shadow-sm' 
                                  : 'bg-white text-gray-500 border-transparent hover:bg-gray-50'
                              }`}
                            >
                              {district}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DistrictSelectionPage;
