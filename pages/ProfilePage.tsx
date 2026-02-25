
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  User, 
  Home, 
  Calendar, 
  CreditCard, 
  Smile, 
  Settings,
  ChevronRight,
  LogOut
} from 'lucide-react';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();

  const menuItems = [
    { 
      label: '編輯個人資料', 
      icon: <User size={22} />, 
      color: 'text-orange-500',
      bgColor: 'bg-orange-50', 
      onClick: () => navigate('/profile/edit') 
    },
    { 
      label: '家庭管理', 
      icon: <Home size={22} />, 
      color: 'text-pink-500',
      bgColor: 'bg-pink-50', 
      onClick: () => navigate('/family') 
    },
    { 
      label: '我的預約記錄', 
      icon: <Calendar size={22} />, 
      color: 'text-blue-500',
      bgColor: 'bg-blue-50', 
      onClick: () => navigate('/my') 
    },
    { 
      label: '交易紀錄', 
      icon: <CreditCard size={22} />, 
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-50', 
      onClick: () => navigate('/wallet') 
    },
    { 
      label: '設定', 
      icon: <Settings size={22} />, 
      color: 'text-slate-500',
      bgColor: 'bg-slate-100', 
      onClick: () => navigate('/settings') 
    },
  ];

  return (
    <div className="flex flex-col min-h-full bg-white pb-24 font-['Noto_Sans_TC']">
      {/* 頂部深藍背景區域 */}
      <div className="bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] px-8 pt-12 pb-32 text-white relative">
        <h1 className="text-[32px] font-black mb-10 tracking-tight">我的</h1>

        <div className="flex items-center gap-6">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative shrink-0"
          >
            <div className="w-20 h-20 rounded-full bg-[#87BFFF] border-[3px] border-white/20 overflow-hidden flex items-center justify-center shadow-lg">
              <User size={48} className="text-white translate-y-1" />
            </div>
            <button 
              onClick={() => navigate('/profile/edit')}
              className="absolute -bottom-1 -right-1 w-7 h-7 bg-white rounded-full shadow-md flex items-center justify-center border border-gray-100 active:scale-90 transition-all"
            >
              <Settings size={14} className="text-blue-600" />
            </button>
          </motion.div>
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-white"
          >
            <h2 className="text-[24px] font-black leading-tight tracking-tight">運動愛好者</h2>
            <p className="text-[14px] font-bold opacity-80 mt-1 uppercase tracking-wider">已參加 12 場活動</p>
          </motion.div>
        </div>
      </div>

      {/* 白色內容區塊 */}
      <main className="flex-1 -mt-20 px-5 relative z-10 bg-white rounded-t-[3.5rem] pt-10 shadow-[0_-15px_40px_rgba(0,0,0,0.06)]">
        <div className="space-y-1 mb-8">
          {menuItems.map((item, i) => (
            <motion.button 
              key={i} 
              onClick={item.onClick}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-5 flex items-center justify-between group transition-all border-b border-gray-50 last:border-none"
            >
              <div className="flex items-center gap-5">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-black/5 ${item.bgColor} ${item.color} group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <span className="text-[17px] font-black text-[#1e293b]">{item.label}</span>
              </div>
              <ChevronRight size={18} className="text-slate-300 group-active:translate-x-1 transition-transform" />
            </motion.button>
          ))}
        </div>

        {/* 登出按鈕區域 */}
        <div className="pt-6 px-2 pb-12">
           <button className="text-[16px] font-black text-blue-500 active:opacity-60 transition-all flex items-center gap-3">
              <LogOut size={20} />
              登出帳號
           </button>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
