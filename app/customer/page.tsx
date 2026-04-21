"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type FoodItem = {
  id: number;
  name: string;
  nameEn: string;
  price: number;
  emoji: string;
  desc: string;
  color: string;
};

type CartItem = FoodItem & { qty: number };

const foods: FoodItem[] = [
  { id: 1, name: "ข้าวผัด", nameEn: "Fried Rice", price: 50, emoji: "🍳", desc: "ข้าวผัดหอมๆ กับไข่ไก่และผัก", color: "#FF6B35" },
  { id: 2, name: "ผัดกะเพรา", nameEn: "Basil Stir Fry", price: 60, emoji: "🌿", desc: "ผัดกะเพราสูตรต้นตำรับ เผ็ดจัดจ้าน", color: "#2D6A4F" },
  { id: 3, name: "ชาเย็น", nameEn: "Thai Iced Tea", price: 30, emoji: "🧋", desc: "ชาไทยแท้ หวานมัน เย็นชื่นใจ", color: "#E07A5F" },
  { id: 4, name: "ต้มยำกุ้ง", nameEn: "Tom Yum Goong", price: 120, emoji: "🍜", desc: "ต้มยำเข้มข้น กุ้งสดตัวใหญ่", color: "#C1121F" },
  { id: 5, name: "ส้มตำ", nameEn: "Papaya Salad", price: 45, emoji: "🥗", desc: "ส้มตำสด เปรี้ยว เผ็ด หวาน กลมกล่อม", color: "#6A994E" },
];

export default function CustomerPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [added, setAdded] = useState<Record<number, boolean>>({});
  const [orderPlaced, setOrderPlaced] = useState(false);

  const addToCart = (food: FoodItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === food.id);
      if (existing) return prev.map((i) => i.id === food.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...food, qty: 1 }];
    });
    setAdded((prev) => ({ ...prev, [food.id]: true }));
    setTimeout(() => setAdded((prev) => ({ ...prev, [food.id]: false })), 600);
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (!existing) return prev;
      if (existing.qty === 1) return prev.filter((i) => i.id !== id);
      return prev.map((i) => i.id === id ? { ...i, qty: i.qty - 1 } : i);
    });
  };

  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  const placeOrder = () => {
    setOrderPlaced(true);
    setTimeout(() => { setCart([]); setShowCart(false); setOrderPlaced(false); }, 2500);
  };

  const logout = () => {
    document.cookie = "role=; path=/; max-age=0";
    router.push("/");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;600;700&family=Playfair+Display:wght@700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Noto Sans Thai', sans-serif; background: #0D0D0D; min-height: 100vh; }
        .app { min-height: 100vh; background: #0D0D0D; position: relative; overflow: hidden; }
        .bg-blob { position: fixed; border-radius: 50%; filter: blur(80px); opacity: 0.12; pointer-events: none; z-index: 0; }
        .blob1 { width: 400px; height: 400px; background: #FF6B35; top: -100px; right: -100px; }
        .blob2 { width: 300px; height: 300px; background: #2D6A4F; bottom: 100px; left: -80px; }
        .header { position: sticky; top: 0; z-index: 10; background: rgba(13,13,13,0.85); backdrop-filter: blur(16px); border-bottom: 1px solid rgba(255,255,255,0.07); padding: 16px 20px; display: flex; justify-content: space-between; align-items: center; }
        .header-title { font-family: 'Playfair Display', serif; font-size: 22px; color: #fff; letter-spacing: 0.5px; }
        .header-title span { color: #FF6B35; }
        .header-right { display: flex; align-items: center; gap: 10px; }
        .cart-btn { position: relative; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12); color: #fff; border-radius: 50px; padding: 8px 18px; font-size: 14px; cursor: pointer; font-family: 'Noto Sans Thai', sans-serif; display: flex; align-items: center; gap: 6px; transition: all 0.2s; }
        .cart-btn:hover { background: rgba(255,255,255,0.14); }
        .logout-btn { background: transparent; border: 1px solid rgba(255,255,255,0.15); color: rgba(255,255,255,0.5); border-radius: 50px; padding: 8px 14px; font-size: 12px; cursor: pointer; font-family: 'Noto Sans Thai', sans-serif; transition: all 0.2s; }
        .logout-btn:hover { border-color: rgba(255,255,255,0.3); color: #fff; }
        .badge { position: absolute; top: -6px; right: -6px; background: #FF6B35; color: #fff; border-radius: 50%; width: 20px; height: 20px; font-size: 11px; font-weight: 700; display: flex; align-items: center; justify-content: center; animation: pop 0.3s ease; }
        @keyframes pop { 0% { transform: scale(0.5); } 70% { transform: scale(1.3); } 100% { transform: scale(1); } }
        .section-label { font-size: 11px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase; color: #FF6B35; padding: 28px 20px 12px; }
        .menu-list { padding: 0 16px; display: flex; flex-direction: column; gap: 12px; position: relative; z-index: 1; }
        .food-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; padding: 18px; display: flex; align-items: center; gap: 16px; transition: all 0.25s ease; position: relative; overflow: hidden; }
        .food-card::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, var(--card-color) 0%, transparent 60%); opacity: 0.05; transition: opacity 0.25s; }
        .food-card:hover::before { opacity: 0.1; }
        .food-card:hover { border-color: rgba(255,255,255,0.14); transform: translateY(-1px); }
        .food-icon { width: 56px; height: 56px; border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 28px; flex-shrink: 0; background: rgba(255,255,255,0.07); }
        .food-info { flex: 1; min-width: 0; }
        .food-name { font-size: 16px; font-weight: 700; color: #fff; margin-bottom: 2px; }
        .food-name-en { font-size: 11px; color: rgba(255,255,255,0.35); letter-spacing: 1px; text-transform: uppercase; margin-bottom: 4px; }
        .food-desc { font-size: 12px; color: rgba(255,255,255,0.45); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .food-right { display: flex; flex-direction: column; align-items: flex-end; gap: 10px; flex-shrink: 0; }
        .food-price { font-size: 18px; font-weight: 700; color: #fff; }
        .food-price span { font-size: 12px; color: rgba(255,255,255,0.4); font-weight: 400; }
        .add-btn { width: 36px; height: 36px; border-radius: 50%; border: none; background: #FF6B35; color: #fff; font-size: 20px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; line-height: 1; }
        .add-btn:hover { background: #ff824d; transform: scale(1.1); }
        .add-btn.added { background: #2D6A4F; transform: scale(0.9); }
        .overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 20; backdrop-filter: blur(4px); animation: fadeIn 0.2s ease; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .cart-drawer { position: fixed; bottom: 0; left: 0; right: 0; max-height: 80vh; background: #161616; border-radius: 24px 24px 0 0; z-index: 30; border-top: 1px solid rgba(255,255,255,0.1); display: flex; flex-direction: column; animation: slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        .drawer-handle { width: 40px; height: 4px; background: rgba(255,255,255,0.15); border-radius: 2px; margin: 12px auto 0; }
        .drawer-header { padding: 16px 20px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.07); }
        .drawer-title { font-size: 18px; font-weight: 700; color: #fff; }
        .close-btn { background: rgba(255,255,255,0.08); border: none; color: rgba(255,255,255,0.6); width: 32px; height: 32px; border-radius: 50%; cursor: pointer; font-size: 16px; display: flex; align-items: center; justify-content: center; }
        .cart-items { flex: 1; overflow-y: auto; padding: 12px 20px; }
        .cart-items::-webkit-scrollbar { display: none; }
        .cart-item { display: flex; align-items: center; gap: 14px; padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .cart-item-emoji { font-size: 24px; }
        .cart-item-name { flex: 1; font-size: 15px; color: #fff; font-weight: 600; }
        .cart-item-price { font-size: 14px; color: rgba(255,255,255,0.5); }
        .qty-ctrl { display: flex; align-items: center; gap: 10px; background: rgba(255,255,255,0.06); border-radius: 50px; padding: 4px 8px; }
        .qty-btn { width: 26px; height: 26px; border: none; border-radius: 50%; background: rgba(255,255,255,0.1); color: #fff; font-size: 16px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.15s; }
        .qty-btn:hover { background: #FF6B35; }
        .qty-num { font-size: 14px; font-weight: 700; color: #fff; min-width: 16px; text-align: center; }
        .empty-cart { text-align: center; padding: 40px 0; color: rgba(255,255,255,0.3); font-size: 14px; }
        .drawer-footer { padding: 16px 20px; border-top: 1px solid rgba(255,255,255,0.07); }
        .total-row { display: flex; justify-content: space-between; margin-bottom: 16px; }
        .total-label { color: rgba(255,255,255,0.5); font-size: 14px; }
        .total-amount { font-size: 24px; font-weight: 700; color: #fff; }
        .total-amount span { font-size: 14px; color: rgba(255,255,255,0.4); font-weight: 400; }
        .order-btn { width: 100%; padding: 16px; background: #FF6B35; border: none; border-radius: 16px; color: #fff; font-size: 16px; font-weight: 700; font-family: 'Noto Sans Thai', sans-serif; cursor: pointer; transition: all 0.2s; letter-spacing: 0.5px; }
        .order-btn:hover { background: #ff824d; transform: scale(1.01); }
        .order-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
        .success-overlay { position: fixed; inset: 0; z-index: 50; display: flex; flex-direction: column; align-items: center; justify-content: center; background: rgba(0,0,0,0.85); backdrop-filter: blur(10px); animation: fadeIn 0.3s ease; }
        .success-icon { font-size: 72px; animation: bounceIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); margin-bottom: 16px; }
        @keyframes bounceIn { from { transform: scale(0); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .success-text { font-size: 22px; font-weight: 700; color: #fff; margin-bottom: 8px; }
        .success-sub { font-size: 14px; color: rgba(255,255,255,0.4); }
      `}</style>

      <div className="app">
        <div className="bg-blob blob1" />
        <div className="bg-blob blob2" />
        <div className="header">
          <div className="header-title">🍴 Thai<span>Eats</span></div>
          <div className="header-right">
            <button className="cart-btn" onClick={() => setShowCart(true)}>
              🛒 ตะกร้า
              {totalItems > 0 && <span className="badge">{totalItems}</span>}
            </button>
            <button className="logout-btn" onClick={logout}>ออกจากระบบ</button>
          </div>
        </div>

        <div className="section-label">เมนูวันนี้</div>
        <div className="menu-list">
          {foods.map((food) => (
            <div key={food.id} className="food-card" style={{ "--card-color": food.color } as React.CSSProperties}>
              <div className="food-icon">{food.emoji}</div>
              <div className="food-info">
                <div className="food-name-en">{food.nameEn}</div>
                <div className="food-name">{food.name}</div>
                <div className="food-desc">{food.desc}</div>
              </div>
              <div className="food-right">
                <div className="food-price">{food.price} <span>฿</span></div>
                <button className={`add-btn ${added[food.id] ? "added" : ""}`} onClick={() => addToCart(food)}>
                  {added[food.id] ? "✓" : "+"}
                </button>
              </div>
            </div>
          ))}
        </div>
        <div style={{ height: 40 }} />

        {showCart && (
          <>
            <div className="overlay" onClick={() => setShowCart(false)} />
            <div className="cart-drawer">
              <div className="drawer-handle" />
              <div className="drawer-header">
                <div className="drawer-title">🛒 ตะกร้าของคุณ</div>
                <button className="close-btn" onClick={() => setShowCart(false)}>✕</button>
              </div>
              <div className="cart-items">
                {cart.length === 0 ? (
                  <div className="empty-cart"><div style={{ fontSize: 40, marginBottom: 8 }}>🍽️</div>ยังไม่มีรายการอาหาร</div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="cart-item">
                      <div className="cart-item-emoji">{item.emoji}</div>
                      <div>
                        <div className="cart-item-name">{item.name}</div>
                        <div className="cart-item-price">{item.price * item.qty} ฿</div>
                      </div>
                      <div className="qty-ctrl">
                        <button className="qty-btn" onClick={() => removeFromCart(item.id)}>−</button>
                        <div className="qty-num">{item.qty}</div>
                        <button className="qty-btn" onClick={() => addToCart(item)}>+</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="drawer-footer">
                <div className="total-row">
                  <div className="total-label">ยอดรวมทั้งหมด</div>
                  <div className="total-amount">{totalPrice} <span>฿</span></div>
                </div>
                <button className="order-btn" onClick={placeOrder} disabled={cart.length === 0}>ยืนยันออเดอร์ →</button>
              </div>
            </div>
          </>
        )}

        {orderPlaced && (
          <div className="success-overlay">
            <div className="success-icon">✅</div>
            <div className="success-text">สั่งอาหารสำเร็จ!</div>
            <div className="success-sub">กำลังเตรียมอาหารให้คุณ...</div>
          </div>
        )}
      </div>
    </>
  );
}
