
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Camera, ChevronLeft } from 'lucide-react';

interface EditProfilePageProps {
  showToast: (msg: string) => void;
}

const EditProfilePage: React.FC<EditProfilePageProps> = ({ showToast }) => {
  const navigate = useNavigate();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('個人資料已儲存');
    setTimeout(() => navigate('/profile'), 1000);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 font-['Noto_Sans_TC'] overflow-y-auto pb-10">
      {/* Header */}
      <header className="bg-white px-4 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-2 text-gray-400 font-black text-sm flex items-center gap-1 active:opacity-60 transition-all">
          <ChevronLeft size={20} strokeWidth={3} />
          返回
        </button>
        <h1 className="text-lg font-black text-gray-900">編輯個人資料</h1>
        <div className="w-16"></div>
      </header>

      {/* Avatar Section */}
      <div className="bg-white p-10 flex flex-col items-center border-b border-gray-50 mb-4">
        <div className="relative group">
          <div className="w-28 h-28 rounded-full border-4 border-white shadow-xl overflow-hidden bg-slate-100 flex items-center justify-center text-slate-400">
            <User size={64} />
          </div>
          <button className="absolute bottom-0 right-0 w-10 h-10 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center border-4 border-white active:scale-90 transition-all">
             <Camera size={16} />
          </button>
        </div>
        <button className="mt-4 text-xs font-black text-blue-600 uppercase tracking-widest hover:opacity-70 transition-opacity">更換頭像</button>
      </div>

      <form onSubmit={handleSave} className="p-4 space-y-6">
        {/* Basic Info Section */}
        <section className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-6">基本資料</h3>
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-800 uppercase tracking-widest px-1">姓名 *</label>
              <input type="text" defaultValue="王小明" required className="w-full px-5 py-4 bg-slate-50 rounded-2xl font-bold transition-all outline-none focus:bg-white focus:ring-2 focus:ring-blue-100" />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-800 uppercase tracking-widest px-1">郵件 *</label>
              <input type="email" defaultValue="wang@example.com" required className="w-full px-5 py-4 bg-slate-50 rounded-2xl font-bold transition-all outline-none focus:bg-white focus:ring-2 focus:ring-blue-100" />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-800 uppercase tracking-widest px-1">電話 *</label>
              <input type="tel" defaultValue="0912-345-678" required className="w-full px-5 py-4 bg-slate-50 rounded-2xl font-bold transition-all outline-none focus:bg-white focus:ring-2 focus:ring-blue-100" />
            </div>
          </div>
        </section>

        {/* Personal Info Section */}
        <section className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-6">個人信息</h3>
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-800 uppercase tracking-widest px-1">出生日期</label>
              <div className="grid grid-cols-3 gap-2">
                <select className="px-4 py-4 bg-slate-50 rounded-2xl font-bold outline-none appearance-none"><option>1990</option></select>
                <select className="px-4 py-4 bg-slate-50 rounded-2xl font-bold outline-none appearance-none"><option>01月</option></select>
                <select className="px-4 py-4 bg-slate-50 rounded-2xl font-bold outline-none appearance-none"><option>15</option></select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-800 uppercase tracking-widest px-1">性別</label>
              <div className="flex gap-4">
                {['男', '女', '保密'].map((g) => (
                  <label key={g} className="flex-1 flex items-center justify-center gap-2 py-4 bg-slate-50 rounded-2xl cursor-pointer active:bg-blue-50 transition-all font-bold text-sm">
                    <input type="radio" name="gender" defaultChecked={g === '男'} className="w-4 h-4 text-blue-600 focus:ring-blue-500" />
                    <span>{g}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-800 uppercase tracking-widest px-1">地址</label>
              <input type="text" placeholder="台北市信義區..." className="w-full px-5 py-4 bg-slate-50 rounded-2xl font-bold transition-all outline-none focus:bg-white focus:ring-2 focus:ring-blue-100" />
            </div>
          </div>
        </section>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <button type="button" onClick={() => navigate(-1)} className="flex-1 py-5 bg-white border border-gray-100 rounded-2xl font-black text-gray-500 active:bg-gray-50 transition-all">取消</button>
          <button type="submit" className="flex-1 py-5 bg-blue-600 text-white rounded-2xl font-black shadow-xl shadow-blue-100 active:scale-95 transition-all">儲存</button>
        </div>
      </form>
    </div>
  );
};

export default EditProfilePage;
