
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const VenueBookingDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // 模擬場館預約數據
  const bookingInfo = {
    id: 'V-20260205-001',
    venueName: '大安運動中心',
    courtName: '籃球場 A',
    sportIcon: '🏀',
    date: '2026-02-05',
    time: '14:00 - 16:00',
    address: '台北市大安區辛亥路三段 55 號',
    price: 800,
    paymentMethod: '信用卡 (尾號 1234)',
    status: '已確認',
    orderDate: '2026-01-28 15:30',
    qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=FITAPP-V123456789'
  };

  return (
    <div className="flex flex-col min-h-full bg-[#f3f4f6] font-['Noto_Sans_TC'] overflow-y-auto pb-20">
      {/* Header */}
      <header className="bg-white px-4 py-6 flex items-center justify-between sticky top-0 z-50 border-b border-gray-100 shadow-sm">
        <button onClick={() => navigate(-1)} className="p-2 text-gray-400 active:opacity-60 transition-all">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-lg font-black text-gray-900">預約憑證</h1>
        <div className="w-10"></div>
      </header>

      <main className="p-6">
        {/* Ticket Layout */}
        <div className="bg-white rounded-[40px] shadow-[0_20px_60px_rgba(0,0,0,0.06)] overflow-hidden border border-gray-50 flex flex-col slide-up relative">
          
          {/* Header Area */}
          <div className="bg-gradient-to-br from-[#1e293b] to-[#334155] p-8 text-white relative">
            <div className="flex justify-between items-start mb-6">
               <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-[32px] backdrop-blur-md">
                    {bookingInfo.sportIcon}
                  </div>
                  <div>
                    <h2 className="text-[22px] font-black leading-tight">{bookingInfo.venueName}</h2>
                    <p className="text-blue-200 text-xs font-bold opacity-80 mt-1 uppercase tracking-widest">{bookingInfo.courtName}</p>
                  </div>
               </div>
               <span className="bg-emerald-500 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg shadow-emerald-900/20">{bookingInfo.status}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/10">
               <div>
                  <p className="text-[10px] text-white/40 font-black uppercase tracking-[0.2em] mb-1">預約日期</p>
                  <p className="text-[15px] font-black">{bookingInfo.date}</p>
               </div>
               <div className="text-right">
                  <p className="text-[10px] text-white/40 font-black uppercase tracking-[0.2em] mb-1">使用時段</p>
                  <p className="text-[15px] font-black">{bookingInfo.time}</p>
               </div>
            </div>
          </div>

          {/* Ticket Perforation Effect */}
          <div className="relative h-6 bg-white flex items-center px-2">
             <div className="absolute left-[-15px] w-[30px] h-[30px] bg-[#f3f4f6] rounded-full"></div>
             <div className="absolute right-[-15px] w-[30px] h-[30px] bg-[#f3f4f6] rounded-full"></div>
             <div className="w-full border-t-2 border-dashed border-gray-100 mx-2"></div>
          </div>

          {/* Body Area - QR Code */}
          <div className="p-10 flex flex-col items-center text-center">
             <div className="bg-gray-50 p-6 rounded-[35px] border-4 border-gray-50 mb-8 shadow-inner">
                <img src={bookingInfo.qrCode} alt="QR Code" className="w-44 h-44 mix-blend-multiply" />
             </div>
             <p className="text-[12px] font-black text-gray-300 uppercase tracking-[0.3em] mb-2">核銷編號</p>
             <h3 className="text-[20px] font-mono font-black text-gray-900 bg-gray-50 px-6 py-2 rounded-xl border border-gray-100">
               {bookingInfo.id.split('-').pop()}
             </h3>
             <p className="text-[11px] text-gray-400 font-medium mt-6 leading-relaxed px-4">
                進場時請出示此 QR Code 給工作人員掃描進行報到核銷。
             </p>
          </div>

          {/* Footer Area - Details List */}
          <div className="bg-gray-50/50 p-8 border-t border-gray-100 space-y-5">
             <h4 className="text-[13px] font-black text-gray-900 flex items-center gap-2 mb-2">
                <div className="w-1.5 h-4 bg-blue-600 rounded-full"></div> 預約詳細明細
             </h4>
             
             <div className="space-y-4">
                <div className="flex justify-between items-start text-xs font-bold">
                   <span className="text-gray-400">場館地址</span>
                   <span className="text-gray-900 text-right flex-1 ml-10 leading-relaxed">{bookingInfo.address}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold">
                   <span className="text-gray-400">訂單編號</span>
                   <span className="text-gray-900">{bookingInfo.id}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold">
                   <span className="text-gray-400">預約時間</span>
                   <span className="text-gray-900">{bookingInfo.orderDate}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold">
                   <span className="text-gray-400">付款方式</span>
                   <span className="text-gray-900">{bookingInfo.paymentMethod}</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                   <span className="text-sm font-black text-gray-900">總計金額</span>
                   <span className="text-xl font-black text-blue-600">NT$ {bookingInfo.price}</span>
                </div>
             </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 space-y-4">
           <button 
             onClick={() => window.print()}
             className="w-full py-5 bg-white border-2 border-gray-100 text-gray-900 rounded-[25px] font-black text-[15px] shadow-sm active:scale-95 transition-all flex items-center justify-center gap-3"
           >
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
             儲存憑證到相簿
           </button>
           <button 
             onClick={() => navigate('/pickup-venues')}
             className="w-full py-5 bg-blue-600 text-white rounded-[25px] font-black text-[15px] shadow-xl shadow-blue-100 active:scale-95 transition-all"
           >
             聯絡場館客服
           </button>
        </div>

        <p className="text-center text-[11px] font-bold text-gray-400 mt-10 uppercase tracking-widest pb-10">
          POWERED BY FITAPP RESERVATION SYSTEM
        </p>
      </main>
    </div>
  );
};

export default VenueBookingDetailPage;
