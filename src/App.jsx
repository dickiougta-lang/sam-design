import { useState, useEffect, useRef } from "react";

/* ── Scroll fade-in ── */
function FadeIn({ children, delay = 0, direction = "up", style = {} }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const dirs = { up: "translateY(32px)", left: "translateX(32px)", right: "translateX(-32px)", none: "none" };
  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "none" : dirs[direction], transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`, ...style }}>
      {children}
    </div>
  );
}

/* ── Mockup browser frame ── */
function BrowserMockup({ title, gradient, children, style = {} }) {
  return (
    <div style={{ borderRadius: 8, overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.12)", background: "#fff", ...style }}>
      <div style={{ height: 32, background: "#F0F0F0", display: "flex", alignItems: "center", padding: "0 12px", gap: 6 }}>
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F57" }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FFBD2E" }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28CA41" }} />
        <div style={{ flex: 1, marginLeft: 8, height: 18, borderRadius: 4, background: "#E4E4E4", display: "flex", alignItems: "center", paddingLeft: 8 }}>
          <span style={{ fontFamily: "system-ui,sans-serif", fontSize: 9, color: "#999", letterSpacing: 0.5 }}>{title}</span>
        </div>
      </div>
      <div style={{ height: 180, background: gradient, position: "relative", overflow: "hidden" }}>
        {children}
      </div>
    </div>
  );
}

/* ── Data ── */
const SERVICES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <rect x="3" y="3" width="18" height="18" rx="3" /><path d="M3 9h18" /><circle cx="7" cy="6" r="0.5" fill="currentColor" /><circle cx="10" cy="6" r="0.5" fill="currentColor" />
      </svg>
    ),
    title: "一頁式銷售頁",
    desc: "餐廳、工作室、課程推廣，一頁讓客人看懂你的亮點，直接行動。",
    time: "3-5 天交件",
    price: "NT$ 3,500 起",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" /><path d="M16 3l2 2-6 6" />
      </svg>
    ),
    title: "個人品牌網站",
    desc: "自媒體、攝影師、講師——讓你的專業被看見，不再只活在社群平台上。",
    time: "5-7 天交件",
    price: "NT$ 8,000 起",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <rect x="2" y="5" width="20" height="14" rx="2" /><path d="M12 12h.01" /><path d="M8 12h.01" /><path d="M16 12h.01" />
      </svg>
    ),
    title: "活動 / 課程報名頁",
    desc: "倒數計時、課程介紹、報名表單一次搞定，讓轉換率直接提升。",
    time: "2-4 天交件",
    price: "NT$ 3,000 起",
  },
];

const STEPS = [
  { num: "01", title: "聊聊需求", desc: "透過 LINE 簡單聊你的店、你的客人、你希望網站幫你做到什麼。不用準備任何資料。" },
  { num: "02", title: "設計初稿", desc: "2 天內給你第一版設計，你看過覺得方向對了再繼續，不滿意可以調整。" },
  { num: "03", title: "修改定稿", desc: "包含兩次免費修改。文字、顏色、排版都可以調，直到你滿意為止。" },
  { num: "04", title: "上線交付", desc: "幫你把網站上線，附上簡單的操作說明。之後需要小調整，隨時找我。" },
];

const PORTFOLIO = [
  {
    title: "巷弄咖啡",
    type: "一頁式銷售頁",
    gradient: "linear-gradient(135deg, #1a2e1f 0%, #2d4a35 50%, #1f3528 100%)",
    accent: "#C4A670",
    url: "https://alley-coffee.vercel.app",
  },
  {
    title: "即將上架",
    type: "美容工作室",
    gradient: "linear-gradient(135deg, #3a2a3d 0%, #5a3d5e 50%, #3a2a3d 100%)",
    accent: "#D4A0B9",
    url: "coming-soon",
    soon: true,
  },
  {
    title: "即將上架",
    type: "健身教練",
    gradient: "linear-gradient(135deg, #1a2428 0%, #2a3a40 50%, #1a2830 100%)",
    accent: "#7ABFCF",
    url: "coming-soon",
    soon: true,
  },
];

export default function FreelancePage() {
  const [ready, setReady] = useState(false);
  const [hoveredService, setHoveredService] = useState(-1);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setTimeout(() => setReady(true), 100);
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const sans = "system-ui, -apple-system, sans-serif";
  const navy = "#0C1220";
  const slate = "#1A2332";
  const blue = "#4A7CFF";
  const lightBlue = "#6B9AFF";
  const textMain = "#E8ECF4";
  const textSub = "rgba(232,236,244,0.55)";
  const navSolid = scrollY > 60;

  return (
    <div style={{ fontFamily: sans, color: "#1A1A2E", background: "#FAFBFD", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        *{margin:0;padding:0;box-sizing:border-box}
        html{scroll-behavior:smooth}
        ::selection{background:${blue};color:#fff}
        @media(max-width:768px){
          .desk-nav{display:none!important}
          .mob-btn{display:flex!important}
          .two-col{grid-template-columns:1fr!important}
          .three-col{grid-template-columns:1fr!important}
          .port-grid{grid-template-columns:1fr!important}
        }
      `}</style>

      {/* ═══ NAV ═══ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: 60,
        padding: "0 clamp(16px,4vw,48px)", display: "flex", justifyContent: "space-between", alignItems: "center",
        background: navSolid ? "rgba(12,18,32,0.92)" : "transparent",
        backdropFilter: navSolid ? "blur(16px)" : "none", transition: "all 0.4s",
      }}>
        <span style={{ fontSize: 15, fontWeight: 700, color: "#fff", letterSpacing: 1 }}>
          <span style={{ color: blue }}>●</span> Sam Design
        </span>
        <div className="desk-nav" style={{ display: "flex", gap: 28, fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase" }}>
          {[["服務", "services"], ["作品", "portfolio"], ["流程", "process"], ["聯絡", "contact"]].map(([t, id]) => (
            <a key={id} href={`#${id}`} style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", transition: "color .2s" }}
              onMouseEnter={e => e.target.style.color = "#fff"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.7)"}>{t}</a>
          ))}
        </div>
        <button className="mob-btn" onClick={() => setMobileMenu(true)}
          style={{ display: "none", flexDirection: "column", gap: 5, background: "none", border: "none", cursor: "pointer", padding: 4 }}>
          {[0, 1, 2].map(i => <span key={i} style={{ width: 20, height: 1.5, background: "#fff", borderRadius: 1 }} />)}
        </button>
      </nav>

      {mobileMenu && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(12,18,32,0.97)", zIndex: 200, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 36 }}>
          <button onClick={() => setMobileMenu(false)} style={{ position: "absolute", top: 20, right: 24, color: "#fff", fontSize: 28, background: "none", border: "none", cursor: "pointer" }}>✕</button>
          {[["服務", "services"], ["作品", "portfolio"], ["流程", "process"], ["聯絡", "contact"]].map(([t, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setMobileMenu(false)}
              style={{ color: "#fff", textDecoration: "none", fontSize: 20, letterSpacing: 4 }}>{t}</a>
          ))}
        </div>
      )}

      {/* ═══ HERO ═══ */}
      <section style={{
        minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "100px clamp(24px,6vw,80px) 80px", position: "relative", overflow: "hidden",
        background: `linear-gradient(160deg, ${navy} 0%, ${slate} 40%, #0E1628 100%)`,
      }}>
        {/* grid pattern */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.04,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
        {/* glow orbs */}
        <div style={{ position: "absolute", top: "10%", right: "15%", width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, rgba(74,124,255,0.08) 0%, transparent 60%)` }} />
        <div style={{ position: "absolute", bottom: "20%", left: "5%", width: 300, height: 300, borderRadius: "50%", background: `radial-gradient(circle, rgba(74,124,255,0.05) 0%, transparent 60%)` }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 700 }}>
          <div style={{
            display: "inline-block", padding: "6px 16px", borderRadius: 20,
            background: "rgba(74,124,255,0.12)", border: "1px solid rgba(74,124,255,0.2)",
            fontSize: 12, color: lightBlue, letterSpacing: 1, marginBottom: 28,
            opacity: ready ? 1 : 0, transform: ready ? "none" : "translateY(16px)", transition: "all .7s ease .2s",
          }}>
            接案中 — 歡迎諮詢
          </div>

          <h1 style={{
            fontSize: "clamp(32px,6vw,56px)", fontWeight: 800, color: "#fff", lineHeight: 1.25, marginBottom: 20, letterSpacing: -0.5,
            opacity: ready ? 1 : 0, transform: ready ? "none" : "translateY(24px)", transition: "all .8s ease .4s",
          }}>
            讓你的店被更多人<br />
            <span style={{ color: blue }}>找到、記住、走進來</span>
          </h1>

          <p style={{
            fontSize: 16, color: textSub, lineHeight: 1.9, maxWidth: 480, marginBottom: 40,
            opacity: ready ? 1 : 0, transform: ready ? "none" : "translateY(20px)", transition: "all .7s ease .6s",
          }}>
            我幫小店家和個人品牌做有質感的網站。不用懂技術，你只需要告訴我你的故事——剩下的交給我。
          </p>

          <div style={{
            display: "flex", gap: 16, flexWrap: "wrap",
            opacity: ready ? 1 : 0, transition: "all .7s ease .8s",
          }}>
            <a href="#contact" style={{
              padding: "14px 36px", background: blue, border: "none", borderRadius: 6,
              color: "#fff", fontSize: 14, fontWeight: 600, letterSpacing: 1, textDecoration: "none",
              transition: "all .3s", boxShadow: `0 4px 20px rgba(74,124,255,0.3)`,
            }}
              onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 28px rgba(74,124,255,0.4)"; }}
              onMouseLeave={e => { e.target.style.transform = "none"; e.target.style.boxShadow = "0 4px 20px rgba(74,124,255,0.3)"; }}
            >免費諮詢</a>
            <a href="#portfolio" style={{
              padding: "14px 36px", background: "transparent", border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 6, color: "rgba(255,255,255,0.8)", fontSize: 14, letterSpacing: 1, textDecoration: "none",
              transition: "all .3s",
            }}
              onMouseEnter={e => { e.target.style.borderColor = "rgba(255,255,255,0.5)"; e.target.style.color = "#fff"; }}
              onMouseLeave={e => { e.target.style.borderColor = "rgba(255,255,255,0.2)"; e.target.style.color = "rgba(255,255,255,0.8)"; }}
            >看作品 ↓</a>
          </div>
        </div>

        {/* floating stats */}
        <div style={{
          position: "absolute", bottom: 48, right: "clamp(24px,6vw,80px)",
          display: "flex", gap: 40, opacity: ready ? 0.6 : 0, transition: "opacity 1s ease 1.2s",
        }}>
          {[["3-5 天", "平均交件"], ["2 次", "免費修改"], ["100%", "滿意保證"]].map(([num, label], i) => (
            <div key={i} style={{ textAlign: "right" }}>
              <p style={{ fontSize: 22, fontWeight: 700, color: "#fff" }}>{num}</p>
              <p style={{ fontSize: 11, color: textSub, letterSpacing: 1, marginTop: 2 }}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section id="services" style={{ padding: "clamp(64px,10vw,100px) clamp(24px,5vw,80px)", maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <p style={{ fontSize: 12, letterSpacing: 4, textTransform: "uppercase", color: blue, fontWeight: 600, marginBottom: 12 }}>Services</p>
          <h2 style={{ fontSize: "clamp(26px,4vw,36px)", fontWeight: 800, marginBottom: 12 }}>我能幫你做什麼</h2>
          <div style={{ width: 40, height: 3, background: blue, borderRadius: 2, marginBottom: 48 }} />
        </FadeIn>
        <div className="three-col" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {SERVICES.map((s, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div
                style={{
                  padding: 28, borderRadius: 8, border: "1px solid #E8ECF0",
                  background: hoveredService === i ? slate : "#fff",
                  transition: "all .35s ease",
                  transform: hoveredService === i ? "translateY(-4px)" : "none",
                  boxShadow: hoveredService === i ? "0 12px 36px rgba(12,18,32,0.12)" : "none",
                  cursor: "default", height: "100%",
                }}
                onMouseEnter={() => setHoveredService(i)}
                onMouseLeave={() => setHoveredService(-1)}
              >
                <div style={{ color: hoveredService === i ? blue : slate, transition: "color .35s", marginBottom: 16 }}>{s.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10, color: hoveredService === i ? "#fff" : "#1A1A2E", transition: "color .35s" }}>{s.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.8, color: hoveredService === i ? "rgba(255,255,255,0.65)" : "#6B7280", transition: "color .35s", marginBottom: 20 }}>{s.desc}</p>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: hoveredService === i ? "rgba(255,255,255,0.45)" : "#9CA3AF", transition: "color .35s", borderTop: `1px solid ${hoveredService === i ? "rgba(255,255,255,0.1)" : "#F0F0F0"}`, paddingTop: 14 }}>
                  <span>{s.time}</span>
                  <span style={{ fontWeight: 700, color: hoveredService === i ? blue : blue }}>{s.price}</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ═══ PORTFOLIO ═══ */}
      <section id="portfolio" style={{ background: "#F3F5F9", padding: "clamp(64px,10vw,100px) clamp(24px,5vw,80px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <p style={{ fontSize: 12, letterSpacing: 4, textTransform: "uppercase", color: blue, fontWeight: 600, marginBottom: 12 }}>Portfolio</p>
            <h2 style={{ fontSize: "clamp(26px,4vw,36px)", fontWeight: 800, marginBottom: 12 }}>作品展示</h2>
            <div style={{ width: 40, height: 3, background: blue, borderRadius: 2, marginBottom: 48 }} />
          </FadeIn>
          <div className="port-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {PORTFOLIO.map((p, i) => (
              <FadeIn key={i} delay={i * 0.12}>
                <a href={p.soon ? undefined : p.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "inherit", cursor: p.soon ? "default" : "pointer" }}>
                <BrowserMockup title={p.url} gradient={p.gradient}>
                  <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    {p.soon ? (
                      <div style={{ textAlign: "center" }}>
                        <div style={{ width: 36, height: 36, borderRadius: "50%", border: `1.5px dashed ${p.accent}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", opacity: 0.5 }}>
                          <span style={{ color: p.accent, fontSize: 18 }}>+</span>
                        </div>
                        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", letterSpacing: 2 }}>{p.type}</p>
                      </div>
                    ) : (
                      <>
                        <p style={{ fontSize: 28, fontWeight: 700, color: "rgba(255,255,255,0.9)", letterSpacing: 6, fontFamily: `"Noto Serif TC", serif` }}>{p.title}</p>
                        <div style={{ width: 24, height: 1, background: p.accent, margin: "12px 0", opacity: 0.6 }} />
                        <p style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", letterSpacing: 3 }}>ALLEY COFFEE</p>
                      </>
                    )}
                  </div>
                </BrowserMockup>
                </a>
                <div style={{ padding: "14px 4px 0" }}>
                  <p style={{ fontSize: 15, fontWeight: 700, color: "#1A1A2E" }}>{p.soon ? "更多作品製作中" : p.title}</p>
                  <p style={{ fontSize: 12, color: "#9CA3AF", marginTop: 4 }}>{p.type}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROCESS ═══ */}
      <section id="process" style={{ padding: "clamp(64px,10vw,100px) clamp(24px,5vw,80px)", maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <p style={{ fontSize: 12, letterSpacing: 4, textTransform: "uppercase", color: blue, fontWeight: 600, marginBottom: 12 }}>Process</p>
          <h2 style={{ fontSize: "clamp(26px,4vw,36px)", fontWeight: 800, marginBottom: 12 }}>怎麼開始</h2>
          <p style={{ fontSize: 15, color: "#6B7280", marginBottom: 8 }}>不用寫企劃書、不用懂程式，四個步驟就搞定。</p>
          <div style={{ width: 40, height: 3, background: blue, borderRadius: 2, marginBottom: 48 }} />
        </FadeIn>
        <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px 48px" }}>
          {STEPS.map((s, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{ padding: "24px 0", borderBottom: "1px solid #F0F0F0" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 10 }}>
                  <span style={{ fontSize: 28, fontWeight: 800, color: blue, opacity: 0.25 }}>{s.num}</span>
                  <h3 style={{ fontSize: 17, fontWeight: 700 }}>{s.title}</h3>
                </div>
                <p style={{ fontSize: 14, lineHeight: 1.8, color: "#6B7280", paddingLeft: 42 }}>{s.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ═══ CTA / CONTACT ═══ */}
      <section id="contact" style={{
        background: `linear-gradient(160deg, ${navy} 0%, ${slate} 50%, #0E1628 100%)`,
        padding: "clamp(80px,12vw,120px) clamp(24px,5vw,80px)", textAlign: "center", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div style={{ position: "absolute", top: "-10%", left: "50%", transform: "translateX(-50%)", width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, rgba(74,124,255,0.06) 0%, transparent 55%)` }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          <FadeIn>
            <h2 style={{ fontSize: "clamp(26px,5vw,40px)", fontWeight: 800, color: "#fff", marginBottom: 16 }}>
              有想法了嗎？聊聊吧
            </h2>
            <p style={{ fontSize: 15, color: textSub, marginBottom: 12, lineHeight: 1.8 }}>
              不確定需要什麼也沒關係，先聊聊你的店和你的想法。
            </p>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", marginBottom: 40 }}>
              諮詢完全免費，沒有壓力。
            </p>

            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <button style={{
                padding: "16px 48px", background: "#06C755", border: "none", borderRadius: 6,
                color: "#fff", fontSize: 15, fontWeight: 700, letterSpacing: 2, cursor: "pointer",
                transition: "all .3s", boxShadow: "0 4px 20px rgba(6,199,85,0.25)",
                display: "flex", alignItems: "center", gap: 8,
              }}
                onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 28px rgba(6,199,85,0.35)"; }}
                onMouseLeave={e => { e.target.style.transform = "none"; e.target.style.boxShadow = "0 4px 20px rgba(6,199,85,0.25)"; }}
              >LINE 諮詢</button>

              <button style={{
                padding: "16px 48px", background: "transparent", border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: 6, color: "rgba(255,255,255,0.75)", fontSize: 15, letterSpacing: 1,
                cursor: "pointer", transition: "all .3s",
              }}
                onMouseEnter={e => { e.target.style.borderColor = "rgba(255,255,255,0.4)"; e.target.style.color = "#fff"; }}
                onMouseLeave={e => { e.target.style.borderColor = "rgba(255,255,255,0.2)"; e.target.style.color = "rgba(255,255,255,0.75)"; }}
              >Instagram DM</button>
            </div>

            <div style={{ marginTop: 48, display: "flex", justifyContent: "center", gap: 40 }}>
              {[["回覆速度", "24 小時內"], ["修改次數", "2 次免費"], ["不滿意", "全額退款"]].map(([label, val], i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <p style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>{val}</p>
                  <p style={{ fontSize: 11, color: textSub, marginTop: 4, letterSpacing: 1 }}>{label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ background: navy, padding: "32px 24px", textAlign: "center", fontSize: 12, color: "rgba(255,255,255,0.2)", letterSpacing: 1 }}>
        <p><span style={{ color: blue }}>●</span> Sam Design — 小店家的網站夥伴</p>
        <p style={{ marginTop: 6 }}>© 2025 All rights reserved.</p>
      </footer>
    </div>
  );
}
