
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface LeaveRequestPageProps {
  showToast: (msg: string) => void;
}

const LeaveRequestPage: React.FC<LeaveRequestPageProps> = ({ showToast }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [reason, setReason] = useState<string | null>(null);
  const [details, setDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 模擬活動資訊，根據 ID 顯示不同內容
  const activityTitle = id === 'c1' ? '兒童籃球基礎班 (U10)' : '成人羽球班';
  const activityDate = '2026-02-10 (週二)';
  const activityTime = '19:00 - 20:00';

  const reasons = [
    { label: '病假', icon: 'fa-face-frown-open', color: 'text-yellow-500', bgColor: 'bg-yellow-50' },
    { label: '事假', icon: 'fa-car-side', color: 'text-red-500', bgColor: 'bg-red-50' },
    { label: '加班', icon: 'fa-briefcase', color: 'text-amber-800', bgColor: 'bg-amber-50' },
    { label: '其他', icon: 'fa-question', color: 'text-red-600', bgColor: 'bg-red-50' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason) {
      showToast('請選擇請假原因');
      return;
    }
    
    setIsSubmitting(true);
    // 模擬網路延遲
    setTimeout(() => {
      setIsSubmitting(false);
      showToast('請假申請已提交，待教練團隊審核');
      navigate('/my');
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] font-['Noto_Sans_TC'] overflow-y-auto pb-12">
      {/* 1. Header - 復刻白色簡潔風格 */}
      <header className="bg-white px-4 py-5 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-[#94a3b8] font-bold text-[15px] active:opacity-60 transition-all">
          <i className="fas fa-chevron-left text-sm mr-1"></i>
          返回
        </button>
        <h1 className="text-[18px] font-black text-[#1e293b] flex-1 text-center pr-12">請假申請</h1>
      </header>

      <main className="p-6 space-y-8">
        {/* 2. 課程資訊卡片 - 深色漸層背景 */}
        <section className="bg-gradient-to-br from-[#111827] to-[#1f2937] rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden animate-slide-up">
           <div className="relative z-10">
              <p className="text-[11px] font-bold text-white/40 uppercase tracking-[0.2em] mb-3">申請請假課程</p>
              <h2 className="text-[24px] font-black mb-8 leading-tight tracking-tight">{activityTitle}</h2>
              <div className="space-y-4">
                 <div className="flex items-center gap-4 text-[15px] font-bold text-white/80">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/5">
                       <i className="far fa-calendar-check text-base"></i>
                    </div>
                    {activityDate}
                 </div>
                 <div className="flex items-center gap-4 text-[15px] font-bold text-white/80">
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/5">
                       <i className="far fa-clock text-base"></i>
                    </div>
                    {activityTime}
                 </div>
              </div>
           </div>
           {/* 背景裝飾圓圈 */}
           <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
        </section>

        {/* 3. 請假原因選擇 - 移除 Emoji 使用向量圖示 */}
        <section className="space-y-5">
           <div className="flex items-center gap-2 px-1">
              <div className="w-1.5 h-4 bg-[#f97316] rounded-full" />
              <h3 className="text-[17px] font-black text-[#1e293b]">請假原因</h3>
           </div>
           <div className="grid grid-cols-2 gap-4">
              {reasons.map((r) => (
                <button
                  key={r.label}
                  type="button"
                  onClick={() => setReason(r.label)}
                  className={`p-7 rounded-[2.2rem] border-2 transition-all flex flex-col items-center gap-4 active:scale-95 ${
                    reason === r.label 
                      ? 'border-[#f97316] bg-white shadow-xl shadow-orange-100' 
                      : 'border-transparent bg-white shadow-sm hover:border-gray-100'
                  }`}
                >
                  <div className={`w-16 h-16 ${r.bgColor} rounded-[1.4rem] flex items-center justify-center shadow-inner`}>
                    <i className={`fas ${r.icon} text-[28px] ${r.color}`}></i>
                  </div>
                  <span className={`text-[16px] font-black ${reason === r.label ? 'text-[#f97316]' : 'text-[#475569]'}`}>{r.label}</span>
                </button>
              ))}
           </div>
        </section>

        {/* 4. 詳細說明 */}
        <section className="space-y-4">
           <h3 className="text-[17px] font-black text-[#1e293b] px-1">詳細說明 (選填)</h3>
           <textarea 
             value={details}
             onChange={(e) => setDetails(e.target.value)}
             rows={4}
             placeholder="若有特殊情況請說明..."
             className="w-full p-6 bg-white border border-gray-100 rounded-[2.2rem] text-[15px] font-medium focus:ring-2 focus:ring-[#f97316]/20 focus:bg-white transition-all outline-none resize-none shadow-sm"
           />
        </section>

        {/* 5. 規則提醒 - 黃色小卡 */}
        <section className="bg-[#fffbeb] rounded-[2.2rem] p-8 border border-[#fef3c7] shadow-sm">
           <div className="flex gap-6">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0 border border-yellow-100">
                 <i className="fas fa-lightbulb text-2xl text-yellow-500"></i>
              </div>
              <div className="space-y-3">
                 <p className="text-[16px] font-black text-[#854d0e]">請假規則提醒</p>
                 <ul className="text-[14px] font-bold text-[#a16207]/80 space-y-2.5">
                    <li className="flex items-start gap-2.5">
                       <span className="mt-2 w-1.5 h-1.5 bg-orange-300 rounded-full shrink-0"></span>
                       <span>請於活動開始前 2 小時提交申請。</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                       <span className="mt-2 w-1.5 h-1.5 bg-orange-300 rounded-full shrink-0"></span>
                       <span>病假需於三日內補傳證明。</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                       <span className="mt-2 w-1.5 h-1.5 bg-orange-300 rounded-full shrink-0"></span>
                       <span>每學期最多提供 3 次補課機會。</span>
                    </li>
                 </ul>
              </div>
           </div>
        </section>

        {/* 6. 提交按鈕 */}
        <div className="pt-4 space-y-4">
           <button 
             onClick={handleSubmit}
             disabled={isSubmitting}
             className="w-full py-5 bg-gradient-to-r from-[#fb923c] to-[#f97316] text-white rounded-[1.8rem] font-black text-[18px] shadow-xl shadow-orange-200 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
           >
             {isSubmitting ? (
               <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
             ) : (
               '提交請假申請'
             )}
           </button>
           <p className="text-center text-[13px] font-bold text-gray-300 uppercase tracking-widest">
             提交後將由教練團隊進行審核
           </p>
        </div>
      </main>
    </div>
  );
};

export default LeaveRequestPage;
