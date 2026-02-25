
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const LOCATIONS = [
  { id: 'l1', name: '台北信義館' },
  { id: 'l2', name: '台北內湖館' },
  { id: 'l3', name: '新竹竹北館' }
];

const CLASSES = [
  {
    id: 'c1',
    locationId: 'l1',
    name: '兒童籃球基礎班 (U10)',
    coachName: '王教練',
    time: '週一、週三 19:00-20:00',
    currentEnroll: 12,
    maxCapacity: 15,
    status: '進行中',
    level: '初級',
    ageGroup: '8-12歲',
    price: 2400,
    startDate: '2026-02-05',
    description: '專業籃球教學，從零開始教起，培養未來之星。著重於基礎技能與運動精神的培養。'
  },
  {
    id: 'c2',
    locationId: 'l1',
    name: '青少年籃球進階班 (U14)',
    coachName: '李教練',
    time: '週二、週四 20:00-21:30',
    currentEnroll: 14,
    maxCapacity: 15,
    status: '進行中',
    level: '中級',
    ageGroup: '12-14歲',
    price: 3200,
    startDate: '2026-02-10',
    description: '針對已有基礎的學員進行進階戰術與個人技術強化。'
  }
];

const CourseBookingDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { classId } = useParams<{ classId: string }>();
  const courseClass = CLASSES.find(c => c.id === classId);

  if (!courseClass) {
    return <div className="p-10 text-center font-black">找不到課程資訊</div>;
  }

  const location = LOCATIONS.find(l => l.id === courseClass.locationId);

  return (
    <div className="flex flex-col h-full bg-white pb-32 font-['Noto_Sans_TC']">
      <div className="relative h-64 bg-gray-100 shrink-0">
        <img 
          src="https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
          className="w-full h-full object-cover" 
          alt="Course"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/15"></div>
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 w-10 h-10 bg-white/30 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white active:scale-90 transition-all shadow-sm"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      <div className="px-6 -mt-8 relative z-10 space-y-7 flex-1 overflow-y-auto scrollbar-hide pb-10">
        <div className="bg-white rounded-[35px] p-7 shadow-[0_15px_40px_rgba(0,0,0,0.05)] border border-gray-50">
          <div className="flex items-center space-x-3 mb-3.5">
            <span className="bg-blue-600 text-white px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wide">
              {courseClass.level}級
            </span>
            <span className="text-gray-300 text-[10px] font-black tracking-widest uppercase">
              {courseClass.ageGroup}
            </span>
          </div>
          <h2 className="text-[22px] font-black text-gray-900 leading-tight mb-2.5">{courseClass.name}</h2>
          <p className="text-gray-400 font-bold text-[13px] leading-relaxed opacity-85">{courseClass.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-[28px] p-5 space-y-1">
            <p className="text-gray-300 text-[10px] font-black uppercase tracking-widest">上課地點</p>
            <p className="text-gray-900 font-black text-[15px] leading-tight truncate">{location?.name}</p>
          </div>
          <div className="bg-gray-50 rounded-[28px] p-5 space-y-1">
            <p className="text-gray-300 text-[10px] font-black uppercase tracking-widest">主授教練</p>
            <p className="text-gray-900 font-black text-[15px] leading-tight">{courseClass.coachName}</p>
          </div>
        </div>

        <section className="space-y-3.5">
          <div className="flex items-center space-x-3">
            <div className="w-[8px] h-5.5 bg-blue-600 rounded-full"></div>
            <h3 className="text-[18px] font-black text-gray-900">開課資訊</h3>
          </div>
          <div className="bg-gray-50 rounded-[30px] p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3.5">
              <span className="text-gray-300 font-black text-[12px] uppercase">每週時段</span>
              <span className="text-gray-900 font-black text-[13px]">{courseClass.time}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300 font-black text-[12px] uppercase">開課日期</span>
              <span className="text-gray-900 font-black text-[13px]">{courseClass.startDate}</span>
            </div>
          </div>
        </section>

        <section className="space-y-3.5 pb-10">
          <div className="flex items-center space-x-3">
            <div className="w-[8px] h-5.5 bg-orange-500 rounded-full"></div>
            <h3 className="text-[18px] font-black text-gray-900">報名狀態</h3>
          </div>
          <div className="px-1">
            <div className="flex justify-between text-[10px] font-black text-gray-300 mb-2 uppercase tracking-wide">
              <span>容納率: {Math.round((courseClass.currentEnroll/courseClass.maxCapacity)*100)}%</span>
              <span>剩餘 {courseClass.maxCapacity - courseClass.currentEnroll} 位</span>
            </div>
            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 rounded-full transition-all duration-1000"
                style={{ width: `${(courseClass.currentEnroll/courseClass.maxCapacity)*100}%` }}
              />
            </div>
          </div>
        </section>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] p-5 bg-white border-t border-gray-50 flex gap-4 z-[110] shadow-[0_-10px_30px_rgba(0,0,0,0.05)] rounded-t-[35px]">
        <div className="flex flex-col justify-center px-3">
          <span className="text-[9px] text-gray-300 font-black uppercase tracking-widest">課程總額</span>
          <span className="text-gray-900 font-black text-[20px] leading-none">NT$ {courseClass.price}</span>
        </div>
        <button 
          onClick={() => navigate('/payment')}
          className="flex-1 py-4.5 bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] text-white rounded-[25px] font-black text-[16px] shadow-lg shadow-blue-200 active:scale-95 transition-all"
        >
          立即報名
        </button>
      </div>
    </div>
  );
};

export default CourseBookingDetailPage;
