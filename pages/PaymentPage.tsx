
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface PaymentPageProps {
  showToast: (msg: string) => void;
}

const PaymentPage: React.FC<PaymentPageProps> = ({ showToast }) => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<'CASH' | 'BANK_TRANSFER' | 'LINE_PAY' | 'CREDIT_CARD'>('CASH');
  const [timeLeft, setTimeLeft] = useState(29 * 60 + 45); // 29:45
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 倒數計時邏輯
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleConfirmPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // 模擬處理中
    setTimeout(() => {
      setIsSubmitting(false);
      if (paymentMethod === 'CASH') {
        showToast('✅ 已選擇現金付款，請於現場完成繳費');
      } else {
        showToast('✅ 已選擇銀行轉帳，請上傳轉帳截圖');
      }
      navigate('/my');
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] overflow-y-auto pb-10">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50 shrink-0">
        <div className="px-4 py-4 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <h1 className="text-lg font-bold text-gray-800">付款確認</h1>
          <div className="w-8"></div>
        </div>
      </header>

      <div className="px-4 pt-4 space-y-4">
        {/* Countdown Timer */}
        <div className="flex justify-center">
          <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 animate-pulse shadow-md">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{formatTime(timeLeft)}</span>
            <span className="text-xs opacity-90">後訂單將自動取消</span>
          </div>
        </div>

        {/* Order Info Card */}
        <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 slide-up">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              </div>
              <div>
                <h2 className="font-black text-lg">台北市羽球運動中心</h2>
                <p className="text-blue-100 text-[10px] font-bold uppercase tracking-wider">訂單編號: 20260121-VENUE-A1B2C3</p>
              </div>
            </div>
          </div>

          <div className="p-5 space-y-6">
            <div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black bg-amber-100 text-amber-700 uppercase tracking-widest">
                待付款
              </span>
            </div>

            {/* Booking Details */}
            <div className="space-y-3">
              <h3 className="text-sm font-black text-gray-900 flex items-center gap-2">
                <div className="w-1 h-3 bg-blue-500 rounded-full" />
                預約明細
              </h3>
              <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-hide">
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className="bg-gray-50 p-3 rounded-2xl flex items-center gap-3 border border-gray-100">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-black shrink-0">
                      {num}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-black text-gray-900 leading-none">羽球{num <= 2 ? '1' : '2'}號場</p>
                      <p className="text-[10px] text-gray-400 font-bold mt-1.5 uppercase tracking-tighter">
                        2026/01/{num <= 2 ? '25' : '26'} ・ {num % 2 === 1 ? '18:00' : '19:00'} - {num % 2 === 1 ? '19:00' : '20:00'}
                      </p>
                    </div>
                    <p className="text-sm font-black text-blue-600">NT$ 350</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center px-1">
                <span className="text-xs font-bold text-gray-400">場地費用</span>
                <span className="text-xs font-black text-gray-900">NT$ 1,400</span>
              </div>
              <div className="bg-blue-50/50 p-4 rounded-2xl flex justify-between items-center border border-blue-100">
                <span className="text-sm font-black text-gray-900">應付金額</span>
                <span className="text-2xl font-black text-blue-600 tracking-tighter">NT$ 1,400</span>
              </div>
            </div>

            {/* Venue Address */}
            <div className="bg-gray-50 p-4 rounded-2xl flex gap-3">
              <svg className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <div className="text-[11px] font-bold text-gray-500 leading-relaxed">
                <p className="font-black text-gray-800 text-xs mb-0.5">場館資訊</p>
                <p>台北市信義區信義路五段7號</p>
                <p>電話: 02-2345-6789</p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100 slide-up">
          <h3 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
            <div className="w-1 h-3 bg-blue-500 rounded-full" />
            選擇付款方式
          </h3>
          <div className="space-y-3">
            {[
              { id: 'CASH', label: '現金付款', desc: '請於現場完成繳費', icon: '💰', color: 'bg-emerald-50 text-emerald-600', active: true },
              { id: 'BANK_TRANSFER', label: '銀行轉帳', desc: '臨櫃或網路銀行轉帳', icon: '🏦', color: 'bg-blue-50 text-blue-600', active: true },
              { id: 'LINE_PAY', label: 'LINE Pay', desc: '尚未啟用', icon: '🟢', color: 'bg-gray-50 text-gray-400', active: false },
              { id: 'CREDIT_CARD', label: '信用卡', desc: '尚未啟用', icon: '💳', color: 'bg-gray-50 text-gray-400', active: false },
            ].map((method) => (
              <button
                key={method.id}
                disabled={!method.active}
                onClick={() => setPaymentMethod(method.id as any)}
                className={`w-full p-4 rounded-2xl border-2 text-left flex items-center gap-4 transition-all ${
                  paymentMethod === method.id 
                    ? 'border-blue-600 bg-blue-50/20' 
                    : 'border-gray-50 bg-white'
                } ${!method.active ? 'opacity-50 grayscale' : 'active:scale-[0.98]'}`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-inner ${method.color}`}>
                  {method.icon}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-black text-gray-900 leading-none">{method.label}</p>
                  <p className="text-[10px] text-gray-400 font-bold mt-1.5 uppercase tracking-wider">{method.desc}</p>
                </div>
                {paymentMethod === method.id && (
                  <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Bank Info if Transfer selected */}
          {paymentMethod === 'BANK_TRANSFER' && (
            <div className="mt-4 p-4 bg-blue-50 rounded-2xl border border-blue-100 slide-up">
               <p className="text-[11px] font-black text-blue-900 mb-2">轉帳資訊</p>
               <div className="text-[10px] font-bold text-blue-700 space-y-1">
                  <p><span className="opacity-60 mr-1">銀行：</span>台灣銀行 (004)</p>
                  <p><span className="opacity-60 mr-1">帳號：</span>012345678901234</p>
                  <p><span className="opacity-60 mr-1">戶名：</span>台北羽球運動中心</p>
               </div>
            </div>
          )}
        </div>

        {/* Notes */}
        <div className="bg-amber-50 rounded-[1.8rem] p-5 border border-amber-100 flex gap-3">
          <svg className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <div className="text-[10px] font-bold text-amber-700 leading-relaxed">
            <p className="font-black text-xs mb-1.5">付款須知</p>
            <ul className="list-disc list-inside space-y-1">
              <li>訂單將保留 30 分鐘，逾時將自動取消</li>
              <li>取消政策：請於使用前 24 小時提出可全額退費</li>
            </ul>
          </div>
        </div>

        {/* Submit Button */}
        <button 
          onClick={handleConfirmPayment}
          disabled={isSubmitting}
          className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-blue-100 active:scale-95 transition-all flex items-center justify-center gap-3"
        >
          {isSubmitting ? (
             <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              確認付款 NT$ 1,400
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
