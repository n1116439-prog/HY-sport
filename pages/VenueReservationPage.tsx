
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SportType } from '../types';

interface VenueReservationPageProps {
  showToast: (msg: string) => void;
}

interface TimeSlot {
  start: string;
  end: string;
  isFull?: boolean; 
}

interface CartItem {
  id: string;
  sport: string;
  venueName: string;
  date: string;
  time: string;
  price: number;
}

const VenueReservationPage: React.FC<VenueReservationPageProps> = ({ showToast }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSport, setSelectedSport] = useState<string | null>('badminton');
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [viewDate, setViewDate] = useState(new Date());

  const sports = [
    { id: 'badminton', label: '羽球', emoji: '🏸', count: 6 },
    { id: 'basketball', label: '籃球', emoji: '🏀', count: 2 },
    { id: 'volleyball', label: '排球', emoji: '🏐', count: 2 },
    { id: 'tabletennis', label: '桌球', emoji: '🏓', count: 4 },
  ];

  const timeSlots: TimeSlot[] = [
    { start: '06:00', end: '07:00' }, 
    { start: '07:00', end: '08:00' },
    { start: '08:00', end: '09:00', isFull: true }, 
    { start: '09:00', end: '10:00', isFull: true }, 
    { start: '10:00', end: '11:00' }, 
    { start: '11:00', end: '12:00' },
    { start: '13:00', end: '14:00' }, 
    { start: '14:00', end: '15:00' },
    { start: '15:00', end: '16:00' }, 
    { start: '16:00', end: '17:00' },
    { start: '17:00', end: '18:00' }, 
    { start: '18:00', end: '19:00' },
    { start: '19:00', end: '20:00' }, 
    { start: '20:00', end: '21:00' },
    { start: '21:00', end: '22:00' },
  ];

  const renderCalendarDays = () => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const prevLastDate = new Date(year, month, 0).getDate();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const days = [];
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push(<div key={`prev-${i}`} className="h-10 flex items-center justify-center text-gray-300 text-xs font-bold">{prevLastDate - i}</div>);
    }
    for (let d = 1; d <= lastDate; d++) {
      const dateObj = new Date(year, month, d);
      const isPast = dateObj < today;
      const isSelected = selectedDate?.toDateString() === dateObj.toDateString();
      const isToday = today.toDateString() === dateObj.toDateString();

      days.push(
        <button
          key={`current-${d}`}
          disabled={isPast}
          onClick={() => {
            setSelectedDate(dateObj);
            setSelectedTimeSlots([]);
            if (currentStep < 2) setCurrentStep(2);
          }}
          className={`h-10 rounded-xl text-xs font-black transition-all ${
            isPast ? 'text-gray-200 cursor-not-allowed' : 
            isSelected ? 'bg-blue-600 text-white shadow-lg shadow-blue-100 scale-110' : 
            isToday ? 'border-2 border-blue-100 text-blue-600' : 'text-gray-700 hover:bg-blue-50'
          }`}
        >
          {d}
        </button>
      );
    }
    return days;
  };

  const toggleTimeSlot = (slotStr: string) => {
    setSelectedTimeSlots(prev => 
      prev.includes(slotStr) ? prev.filter(s => s !== slotStr) : [...prev, slotStr]
    );
    if (currentStep < 3) setCurrentStep(3);
  };

  const handleConfirmReservation = () => {
    if (!selectedSport || !selectedDate || selectedTimeSlots.length === 0) return;
    
    const newItems = selectedTimeSlots.map(slot => ({
      id: Math.random().toString(36).substr(2, 9),
      sport: selectedSport,
      venueName: `${sports.find(s => s.id === selectedSport)?.label}A (A區)`,
      date: selectedDate.toLocaleDateString('zh-TW'),
      time: slot,
      price: 300,
    }));

    setCart([...cart, ...newItems]);
    showToast(`成功預約 ${newItems.length} 個時段`);
    setSelectedTimeSlots([]);
    setCurrentStep(1);
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
    showToast('已移除預約');
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="flex flex-col min-h-full bg-[#f8fafc] pb-32 font-['Noto_Sans_TC']">
      {/* 頁首 */}
      <header className="bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] p-4 rounded-b-[30px] shadow-lg text-white sticky top-0 z-50 shrink-0">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={() => navigate(-1)} className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md active:scale-90 transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <div>
             <h1 className="text-[18px] font-bold leading-tight">場地預約</h1>
             <p className="text-white/80 text-[13px]">台北市大安運動中心</p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-3 px-2">
          {[1, 2, 3].map(step => (
            <React.Fragment key={step}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-black transition-all ${
                currentStep >= step ? 'bg-white text-blue-600 shadow-md' : 'bg-white/20 text-blue-100'
              }`}>
                {step}
              </div>
              {step < 3 && <div className={`h-1 flex-1 rounded-full transition-all ${currentStep > step ? 'bg-white' : 'bg-white/20'}`} />}
            </React.Fragment>
          ))}
        </div>
      </header>

      <main className="px-6 py-6 space-y-8">
        {/* 步驟 1: 選擇運動 */}
        <section className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-gray-100 slide-up">
           <div className="flex items-center justify-between mb-6 px-1">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-4 bg-blue-600 rounded-full" />
                <h3 className="text-[16px] font-black text-gray-900">選擇運動類型</h3>
              </div>
              <span className="text-xs font-bold text-gray-400">
                {selectedSport ? sports.find(s => s.id === selectedSport)?.label : '請選擇'}
              </span>
           </div>
           
           <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-1 px-1">
             {sports.map(sport => {
               const isSelected = selectedSport === sport.id;
               return (
                 <button
                   key={sport.id}
                   onClick={() => { setSelectedSport(sport.id); }}
                   className={`shrink-0 w-[100px] flex flex-col items-center gap-2 py-4 px-2 rounded-[1.8rem] border-2 transition-all btn-press ${
                     isSelected 
                       ? 'border-blue-600 bg-blue-50/50 shadow-blue-100' 
                       : 'border-gray-50 bg-white'
                   }`}
                 >
                   <span className="text-2xl mb-1">{sport.emoji}</span>
                   <div className="text-center">
                      <p className={`text-[12px] font-black leading-tight ${isSelected ? 'text-gray-900' : 'text-gray-600'}`}>{sport.label}</p>
                      <p className="text-[9px] text-gray-400 font-bold mt-0.5">{sport.count} 場地</p>
                   </div>
                 </button>
               );
             })}
           </div>
        </section>

        {/* 步驟 2: 選擇日期與時段 */}
        <section className={`bg-white rounded-[2.5rem] p-6 shadow-sm border border-gray-100 slide-up ${!selectedSport ? 'opacity-40 pointer-events-none' : ''}`}>
           <h3 className="text-[16px] font-black text-gray-900 flex items-center gap-2 mb-6">
              <div className="w-1 h-4 bg-blue-600 rounded-full" />
              選擇日期與時段
           </h3>
           
           <div className="bg-gray-50 rounded-3xl p-4 mb-6">
              <div className="flex items-center justify-between mb-4 px-2">
                <button onClick={() => setViewDate(new Date(viewDate.setMonth(viewDate.getMonth() - 1)))} className="p-2 text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" /></svg>
                </button>
                <span className="text-sm font-black text-gray-800">{viewDate.getFullYear()}年 {viewDate.getMonth() + 1}月</span>
                <button onClick={() => setViewDate(new Date(viewDate.setMonth(viewDate.getMonth() + 1)))} className="p-2 text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center mb-1">
                 {['日', '一', '二', '三', '四', '五', '六'].map(w => <div key={w} className="text-[10px] font-black text-gray-400">{w}</div>)}
              </div>
              <div className="grid grid-cols-7 gap-1">
                 {renderCalendarDays()}
              </div>
           </div>

           <div className={`space-y-4 ${!selectedDate ? 'opacity-30' : ''}`}>
              <div className="flex items-center justify-between px-1">
                 <p className="text-xs font-black text-gray-800">可預約時段</p>
                 <span className="text-[10px] font-bold text-blue-600">{selectedDate?.toLocaleDateString('zh-TW')}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                 {timeSlots.map(slot => {
                   const slotStr = `${slot.start}-${slot.end}`;
                   const isSelected = selectedTimeSlots.includes(slotStr);
                   const isFull = slot.isFull;

                   return (
                     <button
                       key={slotStr}
                       disabled={!selectedDate || isFull}
                       onClick={() => toggleTimeSlot(slotStr)}
                       className={`py-3.5 rounded-2xl text-[12px] font-black transition-all relative ${
                         isFull 
                           ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-100' 
                           : isSelected 
                           ? 'bg-blue-600 text-white shadow-lg scale-[1.02]' 
                           : 'bg-white text-gray-700 border border-gray-100 shadow-sm hover:bg-blue-50'
                       }`}
                     >
                       {slot.start}
                       {isFull && <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white animate-pulse" />}
                     </button>
                   );
                 })}
              </div>

              {selectedTimeSlots.length === 1 && (
                <button 
                  onClick={handleConfirmReservation}
                  className="w-full mt-6 py-4 bg-emerald-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-emerald-100 btn-press animate-slide-up"
                >
                  加入選中的時段 (NT$ 300)
                </button>
              )}
           </div>
        </section>

        {/* 智慧場地配置 */}
        {selectedTimeSlots.length >= 2 && (
          <section className="bg-white rounded-[2rem] overflow-hidden shadow-lg border border-gray-50 animate-slide-up p-5 space-y-5">
            {/* 卡片標頭 */}
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                </div>
                <h3 className="text-[16px] font-black text-gray-900 tracking-tight">智能場地配置</h3>
              </div>
              <span className="text-[11px] font-black text-[#10b981] bg-emerald-50 px-2.5 py-1 rounded-lg uppercase tracking-tight">
                已配置 {selectedTimeSlots.length} 個時段
              </span>
            </div>

            <div className="space-y-3 px-1">
              {/* 摘要卡片 (單一場地) */}
              <div className="bg-[#f8fafc] p-4 rounded-3xl border border-gray-50 flex items-center gap-4 transition-all">
                <div className="w-10 h-10 bg-[#10b981] text-white rounded-full flex items-center justify-center shadow-md shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                </div>
                <div className="flex-1">
                  <h4 className="text-[15px] font-black text-gray-900 leading-none">單一場地</h4>
                  <p className="text-[11px] text-gray-400 font-bold mt-1.5">{selectedTimeSlots.length} 個時段 • 1 個場地</p>
                </div>
                <div className="text-right">
                  <span className="text-[20px] font-black text-gray-900 tracking-tighter">${selectedTimeSlots.length * 300}</span>
                </div>
              </div>

              {/* 明細卡片 (具體場地) */}
              <div className="bg-[#f8fafc] p-4 rounded-3xl border border-gray-50 flex flex-col gap-4 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-100 shrink-0">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[15px] font-black text-gray-900 leading-none">羽A</h4>
                    <p className="text-[10px] text-gray-300 font-bold mt-1 uppercase tracking-widest">A區</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[20px] font-black text-gray-900 tracking-tighter">${selectedTimeSlots.length * 300}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-200/50">
                  {selectedTimeSlots.map(slot => (
                    <div key={slot} className="px-3 py-1.5 bg-[#eff6ff] text-blue-600 rounded-xl text-[11px] font-black border border-blue-100/50">
                      {slot}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 確認預約按鈕 */}
            <button 
              onClick={handleConfirmReservation}
              className="w-full py-4.5 bg-[#059669] text-white rounded-3xl font-black text-[16px] shadow-lg shadow-emerald-100 flex items-center justify-center gap-2 btn-press"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              確認預約
            </button>
          </section>
        )}

        {/* 我的預約購物車 */}
        <section className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-gray-100 slide-up">
           <div className="flex items-center justify-between mb-6">
              <h3 className="text-[16px] font-black text-gray-900 flex items-center gap-2">
                <div className="w-1 h-4 bg-gray-900 rounded-full" />
                我的預約購物車
              </h3>
              <span className="bg-blue-100 text-blue-600 px-2.5 py-1 rounded-full text-[10px] font-black">{cart.length}</span>
           </div>

           {cart.length > 0 ? (
             <div className="space-y-3 mb-8">
               {cart.map(item => (
                 <div key={item.id} className="group relative bg-[#f8fafc] p-4 rounded-3xl flex items-center gap-4 transition-all hover:bg-blue-50/30 border border-gray-50/50">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm shrink-0 border border-gray-100">
                      {item.sport === 'badminton' ? '🏸' : '🏀'}
                    </div>
                    <div className="flex-1 min-w-0">
                       <p className="text-[15px] font-black text-gray-900 truncate">{item.venueName}</p>
                       <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">{item.date} ・ {item.time}</p>
                    </div>
                    <div className="text-right mr-2 shrink-0">
                      <p className="text-[14px] font-black text-emerald-500">NT$ {item.price}</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="w-9 h-9 bg-red-50 text-red-500 rounded-xl flex items-center justify-center active:scale-90 transition-all shrink-0 border border-red-100/50"
                    >
                      <i className="fas fa-trash-alt text-[12px]"></i>
                    </button>
                 </div>
               ))}
               
               <div className="pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                     <span className="text-[16px] font-black text-gray-900">結帳總計</span>
                     <span className="text-2xl font-black text-blue-600 tracking-tighter">NT$ {totalAmount}</span>
                  </div>
                  {/* 結帳按鈕同步為綠色與相同尺寸 */}
                  <button 
                    onClick={() => navigate('/payment')}
                    className="w-full py-4.5 bg-[#059669] text-white rounded-3xl font-black text-[16px] shadow-lg shadow-emerald-100 flex items-center justify-center gap-2 btn-press"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    立即結帳並保留場地
                  </button>
               </div>
             </div>
           ) : (
             <div className="py-12 text-center text-gray-300">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-shopping-cart text-2xl opacity-20"></i>
                </div>
                <p className="text-[13px] font-black uppercase tracking-widest">購物車目前為空</p>
             </div>
           )}
        </section>
      </main>
    </div>
  );
};

export default VenueReservationPage;
