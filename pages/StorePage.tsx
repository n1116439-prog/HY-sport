
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface StorePageProps {
  showToast: (msg: string) => void;
}

const StorePage: React.FC<StorePageProps> = ({ showToast }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('熱門推薦');
  const [favorites, setFavorites] = useState<string[]>([]);

  const categories = [
    { label: '運動服飾', icon: 'fa-shirt', color: 'bg-[#fee2e2]', iconColor: 'text-[#ef4444]' },
    { label: '球類裝備', icon: 'fa-basketball-ball', color: 'bg-[#dbeafe]', iconColor: 'text-[#3b82f6]' },
    { label: '健身器材', icon: 'fa-person-running', color: 'bg-[#dcfce7]', iconColor: 'text-[#22c55e]' },
    { label: '運動鞋', icon: 'fa-shoe-prints', color: 'bg-[#fef9c3]', iconColor: 'text-[#eab308]' },
    { label: '全部分類', icon: 'fa-box-archive', color: 'bg-[#f3e8ff]', iconColor: 'text-[#a855f7]' },
  ];

  const products = [
    { id: 'p1', title: '專業籃球訓練鞋 高筒氣墊減震', price: 1680, originalPrice: 2100, discount: '8折', image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', rating: 4.8, reviews: 245, sold: '1.2k', badge: '8折' },
    { id: 'p2', title: '男士運動速乾T恤 透氣排汗', price: 580, originalPrice: 680, discount: null, image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=400&q=80', rating: 4.7, reviews: 189, sold: '876', badge: '新品' },
    { id: 'p3', title: '可調節啞鈴套裝 家用健身器材', price: 2450, originalPrice: 3500, discount: '7折', image: 'https://images.unsplash.com/photo-1517960413843-0aee8e2d471c?auto=format&fit=crop&w=400&q=80', rating: 4.9, reviews: 320, sold: '1.5k', badge: '7折' },
    { id: 'p4', title: '專業羽毛球拍 碳纖維輕量', price: 1280, originalPrice: 1580, discount: null, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80', rating: 4.6, reviews: 156, sold: '932', badge: '熱銷' },
    { id: 'p5', title: '瑜伽墊 加厚防滑 環保材質', price: 850, originalPrice: 1000, discount: '85折', image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80', rating: 4.8, reviews: 210, sold: '1.1k', badge: '85折' },
    { id: 'p6', title: '專業網球拍 碳素纖維', price: 1980, originalPrice: 2200, discount: null, image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', rating: 4.7, reviews: 98, sold: '456', badge: '新品' },
  ];

  const tabs = ['熱門推薦', '新品上市', '特價商品', '熱銷排行', '會員專區'];

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
    showToast(favorites.includes(id) ? '已取消收藏' : '已收藏商品');
  };

  return (
    <div className="flex flex-col min-h-full bg-[#f8fafc] pb-24 font-['Noto_Sans_TC']">
      {/* 1. 頂部導航 */}
      <header className="bg-white border-b border-gray-100 fixed top-0 left-0 right-0 z-50 max-w-md mx-auto">
        <div className="px-5 py-4 flex justify-between items-center">
          <h1 className="text-[22px] font-black text-[#2563eb]">運動家</h1>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-gray-50 text-gray-600 active:scale-90 transition-all" onClick={() => navigate('/notifications')}>
              <i className="far fa-bell text-xl"></i>
            </button>
            <button className="p-2 rounded-full hover:bg-gray-50 text-gray-600 relative active:scale-90 transition-all">
              <i className="fas fa-shopping-cart text-xl"></i>
              <span className="absolute top-0.5 right-0.5 w-4.5 h-4.5 bg-[#ef4444] rounded-full text-[10px] text-white flex items-center justify-center font-black border-2 border-white">3</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. 商城搜索欄 */}
      <div className="bg-white border-b border-gray-100 pt-[68px]">
        <div className="px-5 py-3">
          <div className="flex items-center bg-[#f1f5f9] rounded-full px-5 py-2.5 shadow-inner">
            <i className="fas fa-search text-gray-400 mr-3 text-sm"></i>
            <input type="text" placeholder="搜尋商品" className="bg-transparent border-none outline-none flex-1 text-sm font-bold text-gray-700 placeholder-gray-400" />
          </div>
        </div>
      </div>

      <main className="px-5 py-5 space-y-8">
        {/* 3. 輪播橫幅 */}
        <section>
          <div className="bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] rounded-[2.5rem] overflow-hidden h-44 relative shadow-xl shadow-blue-100/50">
            <div className="absolute inset-0 flex items-center p-8">
              <div className="text-white z-10">
                <h2 className="text-[22px] font-black mb-1 tracking-tight">年終特惠 全場8折</h2>
                <p className="text-[13px] mb-5 font-bold opacity-80 uppercase tracking-widest">精選運動裝備限時優惠</p>
                <button className="bg-white text-[#2563eb] px-7 py-2.5 rounded-2xl text-[13px] font-black shadow-lg btn-press">
                  立即選購
                </button>
              </div>
            </div>
            {/* 背景裝飾圓圈 (復刻截圖風格) */}
            <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute right-10 top-5 w-24 h-24 bg-white/5 rounded-full blur-lg"></div>
          </div>
        </section>

        {/* 4. 分類導航 (移除 Emoji) */}
        <section>
          <div className="grid grid-cols-5 gap-2">
            {categories.map((cat, idx) => (
              <button key={idx} className="flex flex-col items-center gap-2.5 active:scale-95 transition-all group" onClick={() => showToast(`切換至：${cat.label}`)}>
                <div className={`w-14 h-14 rounded-full ${cat.color} flex items-center justify-center shadow-sm group-hover:-translate-y-1 transition-transform`}>
                  <i className={`fas ${cat.icon} text-xl ${cat.iconColor}`}></i>
                </div>
                <span className="text-[11px] text-[#334155] font-black tracking-tighter">{cat.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* 5. 促銷活動卡片 */}
        <section className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-[#ec4899] to-[#be123c] rounded-[2rem] p-5 text-white shadow-lg relative overflow-hidden btn-press" onClick={() => showToast('查看新品')}>
            <h3 className="text-[15px] font-black mb-0.5">新品上市</h3>
            <p className="text-[11px] mb-4 font-bold opacity-80 uppercase tracking-tight">2024 冬季新款</p>
            <button className="bg-white/20 backdrop-blur-md text-white text-[10px] font-black px-3 py-1.5 rounded-xl border border-white/30 uppercase tracking-widest">
              查看更多
            </button>
            <div className="absolute -bottom-4 -right-4 opacity-20">
              <i className="fas fa-gamepad text-6xl rotate-12"></i>
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#f97316] to-[#c2410c] rounded-[2rem] p-5 text-white shadow-lg relative overflow-hidden btn-press" onClick={() => showToast('查看折扣')}>
            <h3 className="text-[15px] font-black mb-0.5">限時折扣</h3>
            <p className="text-[11px] mb-4 font-bold opacity-80 uppercase tracking-tight">每週三閃購日</p>
            <button className="bg-white/20 backdrop-blur-md text-white text-[10px] font-black px-3 py-1.5 rounded-xl border border-white/30 uppercase tracking-widest">
              搶購優惠
            </button>
            <div className="absolute -bottom-4 -right-2 opacity-20">
              <i className="fas fa-dollar-sign text-7xl"></i>
            </div>
          </div>
        </section>

        {/* 6. 商品分類標籤 */}
        <section className="overflow-x-auto scrollbar-hide -mx-5 px-5">
          <div className="flex gap-3">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap px-6 py-2.5 rounded-full text-[13px] font-black border transition-all ${
                  activeTab === tab 
                  ? 'bg-[#eff6ff] text-[#2563eb] border-[#bfdbfe] shadow-sm' 
                  : 'bg-white text-gray-400 border-gray-100'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </section>

        {/* 7. 商品列表 (移除 Star Emoji) */}
        <section className="grid grid-cols-2 gap-5 pb-10">
          {products.map((p) => (
            <div key={p.id} className="bg-white rounded-[2.2rem] overflow-hidden shadow-sm border border-gray-50 slide-up btn-press" onClick={() => showToast(`查看商品：${p.title}`)}>
              <div className="relative h-44 overflow-hidden">
                <img src={p.image} className="h-full w-full object-cover transition-transform duration-700 hover:scale-110" alt={p.title} />
                <button 
                  onClick={(e) => toggleFavorite(p.id, e)}
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md active:scale-90 transition-all z-10"
                >
                  <i className={`far fa-heart text-sm ${favorites.includes(p.id) ? 'text-[#ef4444] fas' : 'text-gray-400'}`}></i>
                </button>
                {p.badge && (
                  <div className={`absolute top-3 left-3 text-white text-[10px] font-black px-2.5 py-1 rounded-lg shadow-sm ${p.badge.includes('折') ? 'bg-[#ef4444]' : 'bg-[#3b82f6]'}`}>
                    {p.badge}
                  </div>
                )}
              </div>
              <div className="p-4 space-y-3">
                <h3 className="font-black text-[#1e293b] text-[13px] line-clamp-2 leading-tight h-8">{p.title}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-[#ef4444] font-black text-base">NT$ {p.price.toLocaleString()}</span>
                  <span className="text-gray-300 text-[11px] font-bold line-through">NT$ {p.originalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-50">
                  <div className="flex items-center gap-1.5">
                    <i className="fas fa-star text-[#eab308] text-[11px]"></i>
                    <span className="text-[11px] font-black text-[#64748b]">{p.rating}</span>
                  </div>
                  <span className="text-[10px] text-gray-300 font-black uppercase tracking-widest">Sold {p.sold}</span>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* 8. 加載更多 */}
        <section className="text-center pt-2 pb-12">
          <button className="bg-white text-[#2563eb] border border-blue-50 rounded-full px-10 py-4 text-[13px] font-black shadow-sm active:scale-95 transition-all" onClick={() => showToast('加載中...')}>
            查看更多商品
          </button>
        </section>
      </main>
    </div>
  );
};

export default StorePage;
