
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SettingsPageProps {
  showToast: (msg: string) => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ showToast }) => {
  const navigate = useNavigate();
  const [isClearing, setIsClearing] = useState(false);

  const handleToggle = (name: string) => {
    showToast(`${name} 設定已更新`);
  };

  const handleClearCache = () => {
    setIsClearing(true);
    setTimeout(() => {
      setIsClearing(false);
      showToast('已成功清除 124MB 快取資料');
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 font-['Noto_Sans_TC'] overflow-y-auto pb-10">
      <header className="bg-white px-4 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-2 text-gray-400 font-black text-sm flex items-center gap-1 active:opacity-60 transition-all">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
          </svg>
          返回
        </button>
        <h1 className="text-lg font-black text-gray-900">設定</h1>
        <div className="w-16"></div>
      </header>

      <main className="p-4 space-y-6">
        {/* 通知設置 */}
        <section className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
          <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-6 pt-6 pb-2">通知設置</h3>
          <div className="divide-y divide-gray-50">
            {[
              { label: '推送通知', sub: '開啟推送通知', id: 'push', default: false },
              { label: '課程提醒', sub: '課程開始前通知', id: 'remind', default: true },
              { label: '活動通知', sub: '新課程上架通知', id: 'activity', default: true }
            ].map((item) => (
              <div key={item.id} className="px-6 py-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-black text-gray-800">{item.label}</p>
                  <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-tight">{item.sub}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    defaultChecked={item.default} 
                    className="sr-only peer" 
                    onChange={() => handleToggle(item.label)} 
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-emerald-500 after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:rounded-full after:h-[18px] after:w-[18px] after:transition-all peer-checked:after:translate-x-5 shadow-inner"></div>
                </label>
              </div>
            ))}
          </div>
        </section>

        {/* 系統與隱私 */}
        <section className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
          <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-6 pt-6 pb-2">系統與隱私</h3>
          <div className="divide-y divide-gray-50">
            <button className="w-full px-6 py-5 flex items-center justify-between group active:bg-gray-50 transition-all text-left">
               <div>
                  <p className="text-sm font-black text-gray-800">語言設定</p>
                  <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-tight">繁體中文 (台灣)</p>
               </div>
               <i className="fas fa-chevron-right text-gray-300 group-active:translate-x-1 transition-transform"></i>
            </button>
            <button className="w-full px-6 py-5 flex items-center justify-between group active:bg-gray-50 transition-all text-left">
               <div>
                  <p className="text-sm font-black text-gray-800">顯示模式</p>
                  <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-tight">跟隨系統設定</p>
               </div>
               <i className="fas fa-chevron-right text-gray-300 group-active:translate-x-1 transition-transform"></i>
            </button>
          </div>
        </section>

        {/* 清除快取 */}
        <section className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
          <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest px-6 pt-6 pb-2">應用程序管理</h3>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
               <div>
                  <p className="text-sm font-black text-gray-800">儲存空間</p>
                  <p className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-tight">當前佔用 124MB 快取</p>
               </div>
               <button 
                 onClick={handleClearCache}
                 disabled={isClearing}
                 className="px-5 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-black active:scale-95 transition-all disabled:opacity-50"
               >
                 {isClearing ? '清理中...' : '清除快取'}
               </button>
            </div>
            <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
               <div className={`bg-blue-500 h-full transition-all duration-1000 ${isClearing ? 'w-0' : 'w-[20%]'}`}></div>
            </div>
          </div>
        </section>

        <p className="text-center text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em] py-4">FitApp Version 1.2.4</p>
      </main>
    </div>
  );
};

export default SettingsPage;
