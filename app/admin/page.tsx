"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Order = {
  id: string;
  customer: string;
  items: string;
  total: number;
  status: "รอรับออเดอร์" | "กำลังทำ" | "เสร็จแล้ว";
  time: string;
};

const mockOrders: Order[] = [
  { id: "#0012", customer: "สมชาย ใจดี", items: "ข้าวผัด, ชาเย็น", total: 80, status: "รอรับออเดอร์", time: "10:32" },
  { id: "#0011", customer: "มาลี รักสวย", items: "ผัดกะเพรา x2, ต้มยำกุ้ง", total: 240, status: "กำลังทำ", time: "10:28" },
  { id: "#0010", customer: "วิชัย แข็งแรง", items: "ส้มตำ, ชาเย็น x2", total: 105, status: "เสร็จแล้ว", time: "10:15" },
  { id: "#0009", customer: "นิดา สดใส", items: "ต้มยำกุ้ง, ข้าวผัด", total: 170, status: "เสร็จแล้ว", time: "10:02" },
];

const statusColor: Record<Order["status"], string> = {
  "รอรับออเดอร์": "#F59E0B",
  "กำลังทำ": "#3B82F6",
  "เสร็จแล้ว": "#10B981",
};
const statusBg: Record<Order["status"], string> = {
  "รอรับออเดอร์": "rgba(245,158,11,0.12)",
  "กำลังทำ": "rgba(59,130,246,0.12)",
  "เสร็จแล้ว": "rgba(16,185,129,0.12)",
};

export default function AdminPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const nextStatus = (id: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== id) return o;
        const next: Record<Order["status"], Order["status"]> = {
          "รอรับออเดอร์": "กำลังทำ",
          "กำลังทำ": "เสร็จแล้ว",
          "เสร็จแล้ว": "เสร็จแล้ว",
        };
        return { ...o, status: next[o.status] };
      })
    );
  };

  const logout = () => {
    document.cookie = "role=; path=/; max-age=0";
    router.push("/");
  };

  const totalRevenue = orders.filter((o) => o.status === "เสร็จแล้ว").reduce((s, o) => s + o.total, 0);
  const pending = orders.filter((o) => o.status === "รอรับออเดอร์").length;
  const cooking = orders.filter((o) => o.status === "กำลังทำ").length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;500;600;700&family=Cormorant+Garamond:wght@700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Noto Sans Thai', sans-serif; background: #0A1628; min-height: 100vh; }
        .ad-root { min-height: 100vh; background: #0A1628; color: #fff; }
        .ad-header { background: rgba(10,22,40,0.9); backdrop-filter: blur(16px); border-bottom: 1px solid rgba(255,255,255,0.07); padding: 16px 24px; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; z-index: 10; }
        .ad-brand { font-family: 'Cormorant Garamond', serif; font-size: 22px; color: #fff; }
        .ad-brand span { color: #60A5FA; }
        .ad-badge { display: inline-flex; align-items: center; gap: 5px; background: rgba(59,130,246,0.15); color: #60A5FA; border: 1px solid rgba(59,130,246,0.25); border-radius: 20px; padding: 4px 10px; font-size: 11px; font-weight: 600; margin-left: 10px; }
        .ad-right { display: flex; align-items: center; gap: 10px; }
        .logout-btn { background: transparent; border: 1px solid rgba(255,255,255,0.15); color: rgba(255,255,255,0.5); border-radius: 50px; padding: 8px 14px; font-size: 12px; cursor: pointer; font-family: 'Noto Sans Thai', sans-serif; transition: all 0.2s; }
        .logout-btn:hover { border-color: rgba(255,255,255,0.3); color: #fff; }
        .ad-body { padding: 28px 24px; max-width: 900px; margin: 0 auto; }
        .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 28px; }
        .stat-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 20px; }
        .stat-label { font-size: 11px; color: rgba(255,255,255,0.4); letter-spacing: 1px; text-transform: uppercase; margin-bottom: 8px; }
        .stat-value { font-size: 28px; font-weight: 700; color: #fff; }
        .stat-value.blue { color: #60A5FA; }
        .stat-value.amber { color: #F59E0B; }
        .stat-value.green { color: #10B981; }
        .section-title { font-size: 13px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: #60A5FA; margin-bottom: 14px; }
        .orders-list { display: flex; flex-direction: column; gap: 10px; }
        .order-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 18px; display: flex; align-items: center; gap: 16px; transition: all 0.2s; }
        .order-card:hover { border-color: rgba(255,255,255,0.14); background: rgba(255,255,255,0.06); }
        .order-id { font-size: 13px; font-weight: 700; color: rgba(255,255,255,0.4); min-width: 48px; }
        .order-info { flex: 1; min-width: 0; }
        .order-customer { font-size: 15px; font-weight: 700; color: #fff; margin-bottom: 3px; }
        .order-items { font-size: 12px; color: rgba(255,255,255,0.4); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .order-right { display: flex; flex-direction: column; align-items: flex-end; gap: 8px; flex-shrink: 0; }
        .order-total { font-size: 16px; font-weight: 700; color: #fff; }
        .order-time { font-size: 11px; color: rgba(255,255,255,0.35); }
        .status-badge { display: inline-flex; align-items: center; gap: 4px; border-radius: 20px; padding: 4px 10px; font-size: 12px; font-weight: 600; white-space: nowrap; }
        .next-btn { border: none; border-radius: 8px; padding: 7px 12px; font-size: 12px; font-weight: 600; font-family: 'Noto Sans Thai', sans-serif; cursor: pointer; background: rgba(59,130,246,0.15); color: #60A5FA; transition: all 0.18s; white-space: nowrap; }
        .next-btn:hover { background: rgba(59,130,246,0.28); }
        .next-btn:disabled { opacity: 0.3; cursor: not-allowed; }
        @media (max-width: 600px) { .stats-grid { grid-template-columns: 1fr; } .order-card { flex-wrap: wrap; } }
      `}</style>

      <div className="ad-root">
        <div className="ad-header">
          <div>
            <span className="ad-brand">🍴 Thai<span>Eats</span></span>
            <span className="ad-badge">🔐 Admin</span>
          </div>
          <div className="ad-right">
            <button className="logout-btn" onClick={logout}>ออกจากระบบ</button>
          </div>
        </div>

        <div className="ad-body">
          {/* Stats */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-label">รอรับออเดอร์</div>
              <div className="stat-value amber">{pending}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">กำลังทำอาหาร</div>
              <div className="stat-value blue">{cooking}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">รายได้วันนี้</div>
              <div className="stat-value green">{totalRevenue} ฿</div>
            </div>
          </div>

          {/* Orders */}
          <div className="section-title">ออเดอร์ทั้งหมด</div>
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-id">{order.id}</div>
                <div className="order-info">
                  <div className="order-customer">{order.customer}</div>
                  <div className="order-items">{order.items}</div>
                </div>
                <div
                  className="status-badge"
                  style={{ background: statusBg[order.status], color: statusColor[order.status] }}
                >
                  {order.status}
                </div>
                <div className="order-right">
                  <div className="order-total">{order.total} ฿</div>
                  <div className="order-time">{order.time}</div>
                </div>
                <button
                  className="next-btn"
                  onClick={() => nextStatus(order.id)}
                  disabled={order.status === "เสร็จแล้ว"}
                >
                  {order.status === "รอรับออเดอร์" ? "รับออเดอร์" : order.status === "กำลังทำ" ? "เสร็จแล้ว ✓" : "✓ Done"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
