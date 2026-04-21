"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Role = "customer" | "admin";

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("customer");
  const [form, setForm] = useState<LoginForm>({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.email || !form.password) {
      setError("กรุณากรอกข้อมูลให้ครบ");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      document.cookie = `role=${role}; path=/`;
      router.push(role === "admin" ? "/admin" : "/customer");
    }, 1400);
  };

  const isAdmin = role === "admin";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;500;600;700&family=Cormorant+Garamond:wght@600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .lp-root { min-height: 100vh; display: flex; font-family: 'Noto Sans Thai', sans-serif; background: #F7F4EF; position: relative; overflow: hidden; }
        .lp-left { width: 44%; background: #0D0D0D; position: relative; display: flex; flex-direction: column; justify-content: space-between; padding: 48px 44px; overflow: hidden; transition: background 0.5s ease; }
        .lp-left.admin-bg { background: #0A1628; }
        .lp-left-blob { position: absolute; border-radius: 50%; filter: blur(70px); pointer-events: none; }
        .lb1 { width: 320px; height: 320px; top: -80px; right: -60px; opacity: .18; transition: background 0.5s; }
        .lb2 { width: 200px; height: 200px; bottom: 60px; left: -40px; opacity: .14; transition: background 0.5s; }
        .lp-brand { font-family: 'Cormorant Garamond', serif; font-size: 26px; color: #fff; letter-spacing: 1px; z-index: 1; }
        .lp-brand span { color: #FF6B35; }
        .lp-tagline { z-index: 1; }
        .lp-tagline h2 { font-family: 'Cormorant Garamond', serif; font-size: 42px; font-weight: 700; color: #fff; line-height: 1.2; margin-bottom: 16px; }
        .lp-tagline p { font-size: 14px; color: rgba(255,255,255,0.45); line-height: 1.7; }
        .lp-tagline .accent { color: #FF6B35; }
        .lp-deco { position: absolute; bottom: 0; left: 0; right: 0; height: 180px; z-index: 0; opacity: .06; }
        .lp-right { flex: 1; display: flex; align-items: center; justify-content: center; padding: 48px 32px; background: #F7F4EF; }
        .lp-card { width: 100%; max-width: 400px; animation: fadeUp 0.45s ease both; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        .lp-greeting { margin-bottom: 32px; }
        .lp-greeting h1 { font-family: 'Cormorant Garamond', serif; font-size: 34px; font-weight: 700; color: #111; margin-bottom: 6px; }
        .lp-greeting p { font-size: 13px; color: #888; }
        .role-tabs { display: flex; background: #ECEAE4; border-radius: 12px; padding: 4px; margin-bottom: 28px; gap: 4px; }
        .role-tab { flex: 1; padding: 10px; border: none; border-radius: 9px; font-size: 13px; font-weight: 600; font-family: 'Noto Sans Thai', sans-serif; cursor: pointer; transition: all 0.22s ease; background: transparent; color: #999; display: flex; align-items: center; justify-content: center; gap: 6px; }
        .role-tab.active-customer { background: #fff; color: #FF6B35; box-shadow: 0 2px 10px rgba(0,0,0,0.08); }
        .role-tab.active-admin { background: #0A1628; color: #60A5FA; box-shadow: 0 2px 10px rgba(10,22,40,0.18); }
        .lp-form { display: flex; flex-direction: column; gap: 16px; }
        .field-group { display: flex; flex-direction: column; gap: 6px; }
        .field-label { font-size: 12px; font-weight: 600; color: #555; letter-spacing: 0.5px; text-transform: uppercase; }
        .field-wrap { position: relative; }
        .field-input { width: 100%; padding: 13px 16px; border: 1.5px solid #E0DDD6; border-radius: 12px; font-size: 14px; font-family: 'Noto Sans Thai', sans-serif; background: #fff; color: #111; outline: none; transition: border-color 0.2s, box-shadow 0.2s; }
        .field-input::placeholder { color: #BBB; }
        .field-input:focus { border-color: #FF6B35; box-shadow: 0 0 0 3px rgba(255,107,53,0.1); }
        .field-input.admin-focus:focus { border-color: #3B82F6; box-shadow: 0 0 0 3px rgba(59,130,246,0.12); }
        .eye-btn { position: absolute; right: 14px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: #aaa; font-size: 16px; padding: 2px; line-height: 1; }
        .eye-btn:hover { color: #555; }
        .lp-error { background: #FEF2F2; border: 1px solid #FCA5A5; color: #B91C1C; border-radius: 10px; padding: 10px 14px; font-size: 13px; animation: shake 0.35s ease; }
        @keyframes shake { 0%,100% { transform: translateX(0); } 25% { transform: translateX(-6px); } 75% { transform: translateX(6px); } }
        .submit-btn { width: 100%; padding: 14px; border: none; border-radius: 12px; font-size: 15px; font-weight: 700; font-family: 'Noto Sans Thai', sans-serif; cursor: pointer; transition: all 0.22s; margin-top: 4px; display: flex; align-items: center; justify-content: center; gap: 8px; letter-spacing: 0.3px; }
        .submit-btn.customer-btn { background: #FF6B35; color: #fff; }
        .submit-btn.customer-btn:hover { background: #ff7d4d; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(255,107,53,0.3); }
        .submit-btn.admin-btn { background: #0A1628; color: #fff; }
        .submit-btn.admin-btn:hover { background: #142240; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(10,22,40,0.3); }
        .submit-btn:active { transform: translateY(0) scale(0.99); }
        .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; box-shadow: none; }
        .spinner { width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: spin 0.7s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .lp-footer { margin-top: 24px; text-align: center; font-size: 12px; color: #aaa; }
        .lp-footer a { color: #FF6B35; text-decoration: none; font-weight: 600; }
        .lp-footer a:hover { text-decoration: underline; }
        .admin-badge { display: inline-flex; align-items: center; gap: 5px; background: #EFF6FF; color: #1D4ED8; border: 1px solid #BFDBFE; border-radius: 20px; padding: 4px 10px; font-size: 11px; font-weight: 600; margin-bottom: 10px; }
        @media (max-width: 640px) { .lp-left { display: none; } .lp-right { padding: 32px 20px; } }
      `}</style>

      <div className="lp-root">
        <div className={`lp-left ${isAdmin ? "admin-bg" : ""}`}>
          <div className="lp-left-blob lb1" style={{ background: isAdmin ? "#3B82F6" : "#FF6B35" }} />
          <div className="lp-left-blob lb2" style={{ background: isAdmin ? "#60A5FA" : "#2D6A4F" }} />
          <div className="lp-brand">🍴 Thai<span>Eats</span></div>
          <div className="lp-tagline">
            {isAdmin ? (
              <><h2>จัดการ<br />ร้านของคุณ</h2><p>ระบบหลังบ้านสำหรับ<br /><span className="accent">ผู้ดูแลระบบ</span></p></>
            ) : (
              <><h2>อาหาร<br />ส่งตรงถึงคุณ</h2><p>สั่งง่าย จ่ายสะดวก<br />รับ<span className="accent">อาหารอร่อย</span>ถึงมือ</p></>
            )}
          </div>
          <svg className="lp-deco" viewBox="0 0 400 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="200" cy="200" r="160" stroke="white" strokeWidth="1"/>
            <circle cx="200" cy="200" r="120" stroke="white" strokeWidth="1"/>
            <circle cx="200" cy="200" r="80" stroke="white" strokeWidth="1"/>
          </svg>
        </div>

        <div className="lp-right">
          <div className="lp-card" key={role}>
            <div className="lp-greeting">
              {isAdmin && <div className="admin-badge">🔐 Admin Portal</div>}
              <h1>{isAdmin ? "ยินดีต้อนรับ" : "สวัสดี!"}</h1>
              <p>{isAdmin ? "เข้าสู่ระบบเพื่อจัดการร้านค้า" : "เข้าสู่ระบบเพื่อสั่งอาหาร"}</p>
            </div>

            <div className="role-tabs">
              <button
                className={`role-tab ${role === "customer" ? "active-customer" : ""}`}
                onClick={() => { setRole("customer"); setError(""); setForm({ email: "", password: "" }); }}
              >🧑 ลูกค้า</button>
              <button
                className={`role-tab ${role === "admin" ? "active-admin" : ""}`}
                onClick={() => { setRole("admin"); setError(""); setForm({ email: "", password: "" }); }}
              >🔐 แอดมิน</button>
            </div>

            <form className="lp-form" onSubmit={handleSubmit}>
              <div className="field-group">
                <label className="field-label">อีเมล</label>
                <div className="field-wrap">
                  <input
                    className={`field-input ${isAdmin ? "admin-focus" : ""}`}
                    type="email"
                    placeholder={isAdmin ? "admin@thaieats.com" : "you@email.com"}
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    autoComplete="email"
                  />
                </div>
              </div>
              <div className="field-group">
                <label className="field-label">รหัสผ่าน</label>
                <div className="field-wrap">
                  <input
                    className={`field-input ${isAdmin ? "admin-focus" : ""}`}
                    type={showPass ? "text" : "password"}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                    autoComplete="current-password"
                    style={{ paddingRight: 44 }}
                  />
                  <button type="button" className="eye-btn" onClick={() => setShowPass((v) => !v)} tabIndex={-1}>
                    {showPass ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>
              {error && <div className="lp-error">⚠️ {error}</div>}
              <button type="submit" className={`submit-btn ${isAdmin ? "admin-btn" : "customer-btn"}`} disabled={loading}>
                {loading ? <><div className="spinner" /> กำลังเข้าสู่ระบบ...</> : isAdmin ? "เข้าสู่ระบบแอดมิน →" : "เข้าสู่ระบบ →"}
              </button>
            </form>

            <div className="lp-footer">
              {role === "customer"
                ? <><span>ยังไม่มีบัญชี? </span><a href="#">สมัครสมาชิกฟรี</a></>
                : <><span>ลืมรหัสผ่าน? </span><a href="#">ติดต่อผู้ดูแลระบบ</a></>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
