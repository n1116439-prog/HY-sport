
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const MyCourseDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // 模擬課程詳情
  const courseInfo = {
    id: id,
    title: id === 'c1' ? '兒童籃球基礎班 (U10)' : '成人羽球班',
    coach: id === 'c1' ? '王教練' : '李教練',
    studentName: id === 'c1' ? '小寶' : '王小明',
    progress: id === 'c1' ? 60 : 20,
    current: id === 'c1' ? 3 : 2,
    total: id === 'c1' ? 5 : 10,
    lessons: [
      { id: 1, date: '2026-01-20', time: '19:00-20:00', status: 'attended', label: '第 1 堂' },
      { id: 2, date: '2026-01-27', time: '19:00-20:00', status: 'attended', label: '第 2 堂' },
      { id: 3, date: '2026-02-03', time: '19:00-20:00', status: 'on_leave', label: '第 3 堂' },
      { id: 4, date: '2026-02-10', time: '19:00-20:00', status: 'upcoming', label: '第 4 堂' },
      { id: 5, date: '2026-02-17', time: '19:00-20:00', status: 'upcoming', label: '第 5 堂' },
    ]
  };

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'attended': return 'bg-green-50 text-green-600 border-green-100';
      case 'on_leave': return 'bg-red-50 text-red-600 border-red-100';
      default: return 'bg-blue-50 text-blue-600 border-blue-100';
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'attended': return '已出席';
      case 'on_leave': return '已請假';
      default: return '待上課';
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] font-['Noto_Sans_TC'] overflow-y-auto pb-20">
      {/* Header */}
      <header className="bg-white px-4 py-4 flex items-center justify-between sticky top-0 z-50">
        <button onClick={() => navigate(-1)} className="p-2 text-gray-400 active:opacity-60 transition-all">
          <i className="fas fa-chevron-left text-lg"></i>
        </button>
        <h1 className="text-lg font-black text-gray-900">課程詳情</h1>
        <div className="w-10"></div>
      </header>

      <main className="p-5 space-y-6">
        {/* 1. 藍色漸層課程首卡 - 恢復精簡橫向排版 */}
        <section className="bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] rounded-[2.5rem] p-6 text-white shadow-xl slide-up">
           <div className="flex items-center gap-4 mb-6">
              {/* 團隊標誌容器 - 縮小至原本尺寸 */}
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20 shadow-inner overflow-hidden shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1599305090598-fe179d501227?w=200&h=200&fit=crop" 
                  alt="Team Logo" 
                  className="w-full h-full object-cover p-1.5 brightness-110 contrast-125" 
                />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-[19px] font-black leading-tight mb-2 truncate">{courseInfo.title}</h2>
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-[9px] font-bold opacity-60 uppercase tracking-widest mb-0.5">負責教練</p>
                    <p className="text-[14px] font-black">{courseInfo.coach}</p>
                  </div>
                  <div className="w-px h-6 bg-white/20" />
                  <div>
                    <p className="text-[9px] font-bold opacity-60 uppercase tracking-widest text-blue-100 mb-0.5">報名學員</p>
                    <p className="text-[14px] font-black text-blue-50">{courseInfo.studentName}</p>
                  </div>
                </div>
              </div>
           </div>

           <div className="space-y-2">
              <div className="flex justify-between items-end text-[11px] font-black uppercase tracking-widest px-1">
                <span className="opacity-70">課程總進度</span>
                <span className="text-[13px]">{courseInfo.current}/{courseInfo.total} 堂</span>
              </div>
              <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                <div className="bg-white h-full transition-all duration-1000" style={{ width: `${courseInfo.progress}%` }}></div>
              </div>
           </div>
        </section>

        {/* 2. 請假資訊按鈕 - 維持無 Emoji 設計 */}
        <section className="slide-up" style={{ animationDelay: '0.1s' }}>
           <button 
             onClick={() => navigate(`/leave/${courseInfo.id}`)}
             className="w-full py-4.5 bg-white border border-orange-100 text-[#F97316] rounded-[2rem] font-black text-[15px] shadow-[0_4px_12px_rgba(249,115,22,0.03)] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5"
           >
             <i className="far fa-calendar-check text-lg"></i>
             課程請假資訊
           </button>
        </section>

        {/* 3. 整期課表列表 */}
        <section className="space-y-4 slide-up" style={{ animationDelay: '0.2s' }}>
           <div className="flex items-center gap-2 px-1">
              <div className="w-1 h-3.5 bg-blue-600 rounded-full"></div>
              <h3 className="text-[15px] font-black text-gray-900 tracking-tight">整期課程詳細資訊</h3>
           </div>

           <div className="space-y-3 pb-12">
              {courseInfo.lessons.map((lesson) => (
                <div key={lesson.id} className="bg-white rounded-[2rem] p-4.5 border border-gray-50 shadow-sm flex items-center justify-between group active:bg-gray-50 transition-colors">
                   <div className="flex items-center gap-4">
                      <div className={`w-11 h-11 rounded-[1.2rem] flex items-center justify-center text-[10px] font-black border ${getStatusStyle(lesson.status)}`}>
                        {lesson.label}
                      </div>
                      <div>
                        <p className="text-[14px] font-black text-gray-900 leading-none mb-1">{lesson.date}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{lesson.time}</p>
                      </div>
                   </div>
                   
                   <div className="flex items-center gap-2">
                      {lesson.status === 'upcoming' && (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/leave/${courseInfo.id}`);
                          }}
                          className="px-3.5 py-1.5 bg-orange-50 border border-orange-100 text-[#F97316] rounded-xl text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all"
                        >
                          請假
                        </button>
                      )}
                      <div className={`px-3.5 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${getStatusStyle(lesson.status)}`}>
                        {getStatusText(lesson.status)}
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </section>
      </main>
    </div>
  );
};

export default MyCourseDetailPage;
