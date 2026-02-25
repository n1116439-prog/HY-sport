
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FitModal } from '../components/FitUI';

interface FamilyManagementPageProps {
  showToast: (msg: string) => void;
}

const FamilyManagementPage: React.FC<FamilyManagementPageProps> = ({ showToast }) => {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const members = [
    { id: '1', name: '王小明', role: '家長', status: '在線', hours: '45', color: 'bg-blue-500', char: '王', badge: '管理員', badgeColor: 'bg-yellow-100 text-yellow-600' },
    { id: '2', name: '李小美', role: '家長', status: '離線', hours: '38', color: 'bg-pink-500', char: '李', badge: '成員', badgeColor: 'bg-blue-100 text-blue-600' },
    { id: '3', name: '小寶', role: '孩子', status: '運動中', hours: '25', color: 'bg-green-500', char: '小', badge: '孩子', badgeColor: 'bg-green-100 text-green-600' }
  ];

  const closeModal = () => setActiveModal(null);

  return (
    <div className="flex flex-col h-full bg-white font-['Noto_Sans_TC']">
      {/* 頂部導航 */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-3 max-w-md mx-auto">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-600 hover:text-gray-800 active:scale-90 transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          <h1 className="text-lg font-black text-gray-900">家庭管理</h1>
          <button onClick={() => setActiveModal('settings')} className="p-2 -mr-2 text-gray-600 hover:text-gray-800">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
            </svg>
          </button>
        </div>
      </header>

      {/* 主要內容 */}
      <main className="flex-1 overflow-y-auto px-4 py-4 pb-24 scrollbar-hide">
        {/* 家庭資訊卡片 */}
        <section className="mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-3xl p-6 text-white shadow-xl">
            <div className="flex justify-between items-center mb-5">
              <div>
                <h2 className="text-2xl font-black tracking-tight">運動家庭</h2>
                <p className="text-blue-100 text-xs font-bold mt-1">創建於 2024年1月</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-black">3</div>
                <div className="text-blue-100 text-[10px] font-black uppercase tracking-widest">家庭成員</div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
              <div className="flex justify-between text-xs font-bold mb-2">
                <span>本週家庭運動時數</span>
                <span>32/40 小時</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div className="bg-white h-2 rounded-full transition-all duration-1000" style={{ width: '80%' }}></div>
              </div>
            </div>
          </div>
        </section>

        {/* 本週統計 */}
        <section className="mb-8">
          <h3 className="font-black text-gray-900 text-sm mb-4 px-1 flex items-center gap-2">
            <div className="w-1 h-3 bg-blue-600 rounded-full" />
            本週統計
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { val: '156', label: '總運動時數', color: 'text-blue-600' },
              { val: '12', label: '完成挑戰', color: 'text-green-600' },
              { val: '2,580', label: '家庭積分', color: 'text-blue-600' }
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-50 active:scale-95 transition-all">
                <div className={`text-xl font-black mb-1 ${stat.color}`}>{stat.val}</div>
                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 家庭成員 */}
        <section className="mb-8 pb-10">
          <div className="flex justify-between items-center mb-4 px-1">
            <h3 className="font-black text-gray-900 text-sm flex items-center gap-2">
              <div className="w-1 h-3 bg-blue-600 rounded-full" />
              家庭成員
            </h3>
            <button onClick={() => setActiveModal('invite')} className="text-blue-600 text-xs font-black">+ 邀請成員</button>
          </div>
          <div className="space-y-3">
            {members.map((member) => (
              <div key={member.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50 active:scale-[0.98] transition-all group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className={`w-12 h-12 ${member.color} rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-inner`}>
                        {member.char}
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${member.status === '在線' ? 'bg-green-500' : member.status === '運動中' ? 'bg-yellow-500' : 'bg-gray-400'}`}></div>
                    </div>
                    <div>
                      <div className="font-black text-gray-900 text-sm">{member.name}</div>
                      <div className="text-[10px] text-gray-400 font-bold mt-0.5">{member.role} • {member.status}</div>
                      <div className="text-[10px] text-blue-600 font-black mt-1">本週 {member.hours}小時</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest ${member.badgeColor}`}>
                      {member.badge}
                    </span>
                    <button onClick={() => setActiveModal('member-menu')} className="text-gray-300 hover:text-gray-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 已根據要求移除「家庭挑戰」與「共享目標」區塊 */}
      </main>

      {/* 浮動按鈕 */}
      <button 
        className="fixed bottom-10 right-6 w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white shadow-xl shadow-blue-100 active:scale-90 transition-all z-50" 
        onClick={() => setActiveModal('quick-actions')}
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
      </button>

      {/* 模態框系統 */}
      <FitModal isOpen={activeModal === 'settings'} onClose={closeModal} title="家庭設定">
        <div className="space-y-2">
          {['家庭資訊', '隱私設定', '通知設定'].map((opt) => (
            <button key={opt} className="w-full text-left p-5 hover:bg-gray-50 rounded-3xl transition-all group">
              <div className="font-black text-gray-900 text-sm group-hover:text-blue-600">{opt}</div>
              <div className="text-[10px] text-gray-400 font-bold mt-1 uppercase">管理您的家庭偏好與資訊</div>
            </button>
          ))}
          <button className="w-full text-left p-5 hover:bg-red-50 rounded-3xl transition-all">
            <div className="font-black text-red-600 text-sm">解散家庭</div>
            <div className="text-[10px] text-red-400 font-bold mt-1 uppercase">永久刪除此家庭及其所有數據</div>
          </button>
        </div>
      </FitModal>

      <FitModal isOpen={activeModal === 'invite'} onClose={closeModal} title="邀請家庭成員">
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <button className="p-5 border-2 border-blue-600 bg-blue-50 rounded-3xl text-center shadow-lg shadow-blue-50">
              <div className="text-2xl mb-2 flex justify-center">
                 <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
              </div>
              <div className="text-xs font-black text-blue-600">手機號碼</div>
            </button>
            <button className="p-5 border-2 border-gray-50 bg-white rounded-3xl text-center active:bg-blue-50 active:border-blue-200 transition-all">
              <div className="text-2xl mb-2 flex justify-center text-gray-400">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              </div>
              <div className="text-xs font-black text-gray-400">電子郵件</div>
            </button>
          </div>
          <div className="space-y-4">
            <input type="tel" placeholder="請輸入手機號碼" className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none" />
            <select className="w-full p-4 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none appearance-none">
              <option>家長</option>
              <option>孩子</option>
            </select>
          </div>
          <button onClick={() => { showToast('邀請已發送'); closeModal(); }} className="w-full bg-blue-600 text-white py-5 rounded-3xl font-black text-lg shadow-xl shadow-blue-100 btn-press">
            發送邀請
          </button>
        </div>
      </FitModal>

      <FitModal isOpen={activeModal === 'quick-actions'} onClose={closeModal} title="快速操作">
        <div className="grid grid-cols-2 gap-4">
          {[
            { id: 'invite', label: '邀請成員', icon: (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/></svg>
            ), color: 'bg-blue-50 text-blue-600' },
            { id: 'add-goal', label: '新增目標', icon: (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            ), color: 'bg-green-50 text-green-600' },
            { id: 'challenge', label: '創建挑戰', icon: (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            ), color: 'bg-orange-50 text-orange-600' },
            { id: 'report', label: '查看報告', icon: (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
            ), color: 'bg-purple-50 text-purple-600' }
          ].map((action) => (
            <button 
              key={action.id} 
              className={`p-6 rounded-[2rem] text-center active:scale-95 transition-all shadow-sm ${action.color} flex flex-col items-center gap-3`}
              onClick={() => setActiveModal(action.id)}
            >
              <div>{action.icon}</div>
              <div className="text-xs font-black">{action.label}</div>
            </button>
          ))}
        </div>
      </FitModal>
    </div>
  );
};

export default FamilyManagementPage;
