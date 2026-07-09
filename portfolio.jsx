import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Mail, Phone, Linkedin, MapPin, ExternalLink, Code2, Database,
  Server, Wrench, GraduationCap, Award, Globe, ArrowUpRight, Menu, X, ArrowUp, Sparkles
} from "lucide-react";

const base = {
  bg: "#0A0B14",
  raised: "#12131F",
  card: "#161826",
  line: "#272B3D",
  text: "#F1F2F6",
  dim: "#A3A8BD",
  faint: "#5D6178",
};

/* vivid accent palette — one hue per "channel" of the page */
const hues = {
  teal: "#2DD4BF",
  violet: "#A78BFA",
  rose: "#FB7185",
  amber: "#FBBF24",
  sky: "#38BDF8",
  lime: "#A3E635",
};
const accentCycle = [hues.teal, hues.violet, hues.rose, hues.amber, hues.sky];

const nav = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

const roles = [
  "Full-Stack Software Engineer",
  "React.js & PHP Specialist",
  "API Integration Engineer",
  "Backend Systems Architect",
];

const impactMetrics = [
  { value: "5+", label: "years experience", color: hues.teal },
  { value: "70%", label: "manual work eliminated via ERP automation", color: hues.violet },
  { value: "45%", label: "latency cut with async queues", color: hues.rose },
  { value: "<100ms", label: "search across complex datasets", color: hues.amber },
  { value: "99.9%", label: "platform uptime maintained", color: hues.sky },
];

const experience = [
  {
    role: "Full Stack Web Developer",
    company: "MyAtOnce",
    period: "10/2023 – Present",
    location: "Remote",
    current: true,
    color: hues.teal,
    bullets: [
      "Developed full-stack web applications using React.js and PHP/Slim, optimizing data throughput and cross-service communication efficiency by 23%.",
      "Architected the migration of legacy PHP systems to the Slim framework, reducing technical debt and code complexity by 40%.",
      "Engineered NetSuite ERP automation pipelines, eliminating manual data entry workflows by 70%.",
      "Implemented asynchronous RabbitMQ message queues, cutting background service latency by 45%.",
      "Integrated Elasticsearch clusters to enable sub-100ms query retrieval across massive, complex datasets.",
      "Leveraged ClickHouse for real-time analytics, reducing report generation from over 5 minutes to under 3 seconds.",
      "Integrated Amazon Vendor APIs for automated product catalog and inventory synchronization.",
      "Designed Shopify integrations for end-to-end sync of products, customers, and sales orders.",
    ],
  },
  {
    role: "Backend Developer",
    company: "Code Brew Labs",
    period: "04/2023 – 09/2023",
    location: "On-site",
    color: hues.violet,
    bullets: [
      "Developed and optimized backend applications using PHP/Laravel, boosting database query efficiency by 15% via structured caching.",
      "Implemented Laravel Queues backed by Redis, reducing server overhead by 35% and accelerating API response by 40%.",
      "Built live, coordinate-based dynamic map visualizations for real-time geospatial data tracking.",
      "Executed multi-source data integration strategies into a consolidated analytics dashboard.",
    ],
  },
  {
    role: "Full Stack Web Developer",
    company: "Alpha Code",
    period: "03/2022 – 03/2023",
    location: "On-site",
    color: hues.rose,
    bullets: [
      "Built dynamic React.js + PHP + MySQL single-page applications, reducing initial page-load times by 30%.",
      "Coordinated sprint tasks and bug tracking in Jira, maintaining a 95% sprint completion accuracy rate.",
      "Enforced clean Git workflows, branching strategies, and rigorous version control standards.",
    ],
  },
  {
    role: "Software Developer",
    company: "Flarex Infotech",
    period: "01/2021 – 02/2022",
    location: "On-site",
    color: hues.sky,
    bullets: [
      "Developed and optimized web applications using PHP, JavaScript, and MySQL, achieving 99.9% system uptime.",
      "Refactored relational database queries and indexed legacy tables, cutting page-load latency by 20%.",
      "Collaborated on frontend implementations using HTML5, CSS3, and modern JavaScript workflows.",
      "Identified and eliminated critical backend bugs, cutting development turnaround by 15%.",
    ],
  },
];

const skillGroups = [
  { title: "Frontend", icon: Code2, color: hues.sky, items: ["HTML5", "CSS3", "Tailwind CSS", "JavaScript", "React JS", "Redux JS"] },
  { title: "Backend", icon: Server, color: hues.violet, items: ["PHP", "Node JS", "Laravel", "CodeIgniter", "Slim", "C++", "Python"] },
  { title: "Databases & Analytics", icon: Database, color: hues.amber, items: ["MySQL", "Oracle DB", "MongoDB", "ClickHouse", "Elasticsearch"] },
  { title: "DevOps & Architecture", icon: Wrench, color: hues.rose, items: ["Git/GitHub", "Postman", "RabbitMQ", "Agile/Scrum", "NetSuite", "Amazon Vendor API", "Shopify Integration", "Jira", "Redis"] },
];

const certifications = [
  { name: "Junior Software Developer", issuer: "National Skill Development Corporation (NSDC)", color: hues.teal },
  { name: "Software Defined Networking", issuer: "IIT Ropar", color: hues.violet },
];

const languages = [
  { name: "English", level: 5 },
  { name: "Urdu", level: 5 },
  { name: "Hindi", level: 5 },
  { name: "Kashmiri", level: 5 },
];

function hexToRgba(hex, alpha) {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

/* ---------- scroll reveal hook ---------- */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(node);
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, style = {} }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity .7s ease ${delay}s, transform .7s cubic-bezier(.16,1,.3,1) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Section({ id, eyebrow, title, accent, children }) {
  return (
    <section id={id} style={{ padding: "88px 24px", borderTop: `1px solid ${base.line}`, position: "relative" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <Reveal>
          <div style={{ fontFamily: "monospace", fontSize: 12, letterSpacing: 2, color: accent, marginBottom: 10, textTransform: "uppercase" }}>
            {eyebrow}
          </div>
          <h2 style={{ fontSize: "clamp(22px,3vw,30px)", fontWeight: 700, marginBottom: 32, color: base.text }}>
            {title}
          </h2>
        </Reveal>
        {children}
      </div>
    </section>
  );
}

function Dot({ filled }) {
  return (
    <span style={{ width: 8, height: 8, borderRadius: "50%", display: "inline-block", marginRight: 4, background: filled ? hues.teal : base.line, boxShadow: filled ? `0 0 6px ${hues.teal}` : "none" }} />
  );
}

/* ---------- typewriter ---------- */
function useTypewriter(words, speed = 55, pause = 1400) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    let timeout;
    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setWordIndex((i) => i + 1);
    } else {
      timeout = setTimeout(() => {
        setText((t) => (deleting ? current.slice(0, t.length - 1) : current.slice(0, t.length + 1)));
      }, deleting ? speed / 2 : speed);
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words, speed, pause]);

  return text;
}

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [wordIdx, setWordIdx] = useState(0);
  const typed = useTypewriter(roles);

  useEffect(() => {
    const t = setInterval(() => setWordIdx((i) => (i + 1) % roles.length), 3200);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowTop(window.scrollY > 600);
      let current = "about";
      for (const n of nav) {
        const el = document.getElementById(n.id);
        if (el && el.getBoundingClientRect().top < 140) current = n.id;
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = useCallback((id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  const heroAccent = accentCycle[wordIdx % accentCycle.length];

  return (
    <div style={{ background: base.bg, color: base.text, fontFamily: "Inter, 'Segoe UI', sans-serif", minHeight: "100vh", position: "relative", overflowX: "hidden" }}>
      <style>{`
        @keyframes floatBlob {
          0%, 100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(30px,-40px) scale(1.1); }
          66% { transform: translate(-24px,20px) scale(0.92); }
        }
        @keyframes floatBlob2 {
          0%, 100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(-40px,30px) scale(1.15); }
        }
        @keyframes caretBlink { 50% { opacity: 0; } }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(45,212,191,0.5); }
          50% { box-shadow: 0 0 0 9px rgba(45,212,191,0); }
        }
        @keyframes gridDrift {
          from { background-position: 0 0; }
          to { background-position: 40px 40px; }
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes hueRotate {
          0% { filter: hue-rotate(0deg); }
          100% { filter: hue-rotate(360deg); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .metric-card { transition: transform .25s ease, border-color .25s ease, box-shadow .25s ease; }
        .metric-card:hover { transform: translateY(-6px) scale(1.02); }
        .skill-pill { transition: transform .15s ease, border-color .15s ease, color .15s ease, background .15s ease; }
        .info-card { transition: transform .25s ease, border-color .25s ease, box-shadow .25s ease; }
        .info-card:hover { transform: translateY(-4px); }
        .nav-link { position: relative; }
        .nav-link::after {
          content: ''; position: absolute; left: 0; bottom: -6px; height: 2px; width: 0; border-radius: 2px;
          transition: width .25s ease;
        }
        .nav-link.active::after, .nav-link:hover::after { width: 100%; }
        .cta-btn { transition: transform .2s ease, box-shadow .2s ease; background-size: 200% 200%; }
        .cta-btn:hover { transform: translateY(-3px); }
        .ghost-btn { transition: transform .2s ease, border-color .2s ease, background .2s ease; }
        .ghost-btn:hover { transform: translateY(-3px); }
        .timeline-dot { transition: box-shadow .3s ease, transform .3s ease; }
        .job-card:hover .timeline-dot { transform: scale(1.25); }
        .gradient-text {
          background: linear-gradient(90deg, ${hues.teal}, ${hues.violet}, ${hues.rose}, ${hues.amber}, ${hues.sky}, ${hues.teal});
          background-size: 300% auto;
          -webkit-background-clip: text; background-clip: text; color: transparent;
          animation: shimmer 8s linear infinite;
        }
        ::selection { background: ${hues.violet}; color: #0A0B14; }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
      `}</style>

      {/* colorful ambient mesh background */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "-14%", left: "-10%", width: 520, height: 520, borderRadius: "50%", background: `radial-gradient(circle, ${hexToRgba(hues.teal,0.28)}, transparent 70%)`, filter: "blur(20px)", animation: "floatBlob 16s ease-in-out infinite" }} />
        <div style={{ position: "absolute", top: "10%", right: "-12%", width: 480, height: 480, borderRadius: "50%", background: `radial-gradient(circle, ${hexToRgba(hues.violet,0.24)}, transparent 70%)`, filter: "blur(20px)", animation: "floatBlob2 20s ease-in-out infinite" }} />
        <div style={{ position: "absolute", top: "55%", left: "8%", width: 440, height: 440, borderRadius: "50%", background: `radial-gradient(circle, ${hexToRgba(hues.rose,0.2)}, transparent 70%)`, filter: "blur(20px)", animation: "floatBlob 24s ease-in-out infinite reverse" }} />
        <div style={{ position: "absolute", bottom: "-10%", right: "10%", width: 460, height: 460, borderRadius: "50%", background: `radial-gradient(circle, ${hexToRgba(hues.amber,0.18)}, transparent 70%)`, filter: "blur(20px)", animation: "floatBlob2 18s ease-in-out infinite reverse" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${base.line} 1px, transparent 1px), linear-gradient(90deg, ${base.line} 1px, transparent 1px)`, backgroundSize: "40px 40px", opacity: 0.2, animation: "gridDrift 14s linear infinite" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* Top bar */}
        <div style={{ position: "sticky", top: 0, zIndex: 20, background: scrolled ? "rgba(10,11,20,0.82)" : "transparent", backdropFilter: "blur(12px)", borderBottom: scrolled ? `1px solid ${base.line}` : "1px solid transparent", transition: "all .25s ease" }}>
          <div style={{ maxWidth: 1080, margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ fontFamily: "monospace", fontSize: 14, color: base.dim, display: "flex", alignItems: "center", gap: 6 }}>
              <Sparkles size={14} color={hues.amber} />
              wajid<span style={{ color: base.text, fontWeight: 600 }}>.dev</span>
            </div>
            <nav style={{ display: "flex", gap: 28 }} className="hidden md:flex">
              {nav.map((n, i) => (
                <button key={n.id} onClick={() => scrollTo(n.id)}
                  className={`nav-link ${activeSection === n.id ? "active" : ""} hidden md:inline`}
                  style={{ background: "none", border: "none", cursor: "pointer", color: activeSection === n.id ? accentCycle[i % accentCycle.length] : base.dim, fontSize: 13, fontFamily: "monospace" }}
                >
                  <style>{`.nav-link::after { background: ${accentCycle[i % accentCycle.length]}; }`}</style>
                  {n.label}
                </button>
              ))}
            </nav>
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden" style={{ background: "none", border: "none", color: base.text, cursor: "pointer" }}>
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <a href="mailto:qaziwajid500@gmail.com" className="cta-btn hidden md:inline-flex" style={{ fontFamily: "monospace", fontSize: 13, padding: "9px 16px", borderRadius: 8, background: `linear-gradient(90deg, ${hues.teal}, ${hues.sky})`, color: "#0A0B14", fontWeight: 700, textDecoration: "none", alignItems: "center", gap: 6 }}>
              Get in touch
            </a>
          </div>
          {menuOpen && (
            <div style={{ padding: "8px 24px 20px", display: "flex", flexDirection: "column", gap: 14, borderBottom: `1px solid ${base.line}`, animation: "fadeIn .2s ease" }}>
              {nav.map((n, i) => (
                <button key={n.id} onClick={() => scrollTo(n.id)} style={{ background: "none", border: "none", textAlign: "left", color: activeSection === n.id ? accentCycle[i % accentCycle.length] : base.dim, fontFamily: "monospace", fontSize: 14 }}>
                  {n.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Hero */}
        <header style={{ maxWidth: 1080, margin: "0 auto", padding: "72px 24px 0" }}>
          <Reveal>
            <div style={{ fontFamily: "monospace", fontSize: 13, color: base.faint, marginBottom: 20 }}>
              <span style={{ color: hues.teal }}>$</span> whoami
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="gradient-text" style={{ fontSize: "clamp(34px,6vw,58px)", fontWeight: 800, lineHeight: 1.06, letterSpacing: "-0.02em", margin: 0 }}>
              Wajid Ul Haque
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <div style={{ fontFamily: "monospace", fontSize: 16, color: heroAccent, marginTop: 16, fontWeight: 700, minHeight: 24, transition: "color .4s ease" }}>
              {typed}<span style={{ display: "inline-block", width: 8, height: 16, background: heroAccent, marginLeft: 3, transform: "translateY(2px)", animation: "caretBlink 1s step-end infinite", transition: "background .4s ease" }} />
            </div>
          </Reveal>
          <Reveal delay={0.22}>
            <p style={{ marginTop: 20, maxWidth: 620, color: base.dim, fontSize: 16.5 }}>
              5+ years engineering scalable, high-performance web applications with React.js, PHP, Slim, Laravel, RabbitMQ, Elasticsearch, and MySQL —
              across API integrations, ERP automation, real-time search, and large-scale backend systems.
            </p>
          </Reveal>

          <Reveal delay={0.28}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 18, marginTop: 24, fontSize: 13.5, color: base.faint, fontFamily: "monospace" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}><MapPin size={14} color={hues.rose} /> Srinagar, J&K, India</span>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Phone size={14} color={hues.sky} /> +91 9070889880</span>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Mail size={14} color={hues.amber} /> qaziwajid500@gmail.com</span>
            </div>
          </Reveal>

          <Reveal delay={0.34}>
            <div style={{ display: "flex", gap: 12, marginTop: 30, flexWrap: "wrap" }}>
              <a href="mailto:qaziwajid500@gmail.com" className="cta-btn" style={{ fontFamily: "monospace", fontSize: 13, padding: "12px 22px", borderRadius: 8, background: `linear-gradient(90deg, ${hues.teal}, ${hues.violet})`, color: "#0A0B14", fontWeight: 700, textDecoration: "none", boxShadow: `0 8px 28px ${hexToRgba(hues.teal,0.28)}` }}>
                Email me
              </a>
              <a href="https://www.linkedin.com/in/qaziwajid" target="_blank" rel="noopener noreferrer" className="ghost-btn" style={{ fontFamily: "monospace", fontSize: 13, padding: "12px 20px", borderRadius: 8, background: base.card, color: base.text, border: `1px solid ${base.line}`, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}
                onMouseEnter={(e)=>{e.currentTarget.style.borderColor = hues.sky;}}
                onMouseLeave={(e)=>{e.currentTarget.style.borderColor = base.line;}}
              >
                LinkedIn <ArrowUpRight size={14} color={hues.sky} />
              </a>
            </div>
          </Reveal>

          {/* Signature: real impact metrics, each in its own color */}
          <Reveal delay={0.42} style={{ marginTop: 56 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 14 }}>
              {impactMetrics.map((m, i) => (
                <div key={i} className="metric-card" style={{
                  background: base.raised, padding: "22px 18px", borderRadius: 14,
                  border: `1px solid ${base.line}`, borderTop: `3px solid ${m.color}`,
                }}>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 28, fontWeight: 800, color: m.color }}>{m.value}</div>
                  <div style={{ fontSize: 12.5, color: base.dim, marginTop: 6, lineHeight: 1.4 }}>{m.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </header>

        {/* About */}
        <Section id="about" eyebrow="01 — Summary" title="About" accent={hues.teal}>
          <Reveal delay={0.05}>
            <p style={{ color: base.dim, fontSize: 16, maxWidth: 680 }}>
              Full-Stack Developer with 5+ years of experience engineering scalable, high-performance web applications
              using React.js, PHP, Slim, Laravel, RabbitMQ, Elasticsearch, and MySQL. Proven track record in API integrations,
              ERP automation, real-time search optimization, big data analytics engines, and large-scale backend systems.
            </p>
          </Reveal>
        </Section>

        {/* Experience */}
        <Section id="experience" eyebrow="02 — Career" title="Experience" accent={hues.violet}>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {experience.map((job, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="job-card" style={{ display: "flex", gap: 20, paddingBottom: 40 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, width: 14 }}>
                    <span className="timeline-dot" style={{
                      width: 12, height: 12, borderRadius: "50%",
                      background: job.current ? job.color : base.line,
                      border: `2px solid ${job.color}`,
                      marginTop: 6, boxSizing: "border-box",
                      animation: job.current ? "pulseGlow 2s ease-in-out infinite" : "none",
                      boxShadow: `0 0 10px ${hexToRgba(job.color, 0.5)}`,
                    }} />
                    {i !== experience.length - 1 && <span style={{ flex: 1, width: 1, background: base.line, marginTop: 4 }} />}
                  </div>
                  <div style={{ flex: 1, borderLeft: `2px solid ${hexToRgba(job.color,0.15)}`, paddingLeft: 20, marginLeft: -21 }}>
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: 10 }}>
                      <h3 style={{ fontSize: 18, fontWeight: 600, color: base.text, margin: 0 }}>{job.role}</h3>
                      {job.current && (
                        <span style={{ fontFamily: "monospace", fontSize: 11, color: job.color, background: hexToRgba(job.color,0.14), border: `1px solid ${hexToRgba(job.color,0.4)}`, padding: "2px 8px", borderRadius: 100 }}>
                          current
                        </span>
                      )}
                    </div>
                    <div style={{ fontFamily: "monospace", fontSize: 13, color: job.color, marginTop: 4, fontWeight: 700 }}>{job.company}</div>
                    <div style={{ fontFamily: "monospace", fontSize: 12, color: base.faint, marginTop: 4 }}>{job.period} · {job.location}</div>
                    <ul style={{ marginTop: 14, paddingLeft: 18, color: base.dim, fontSize: 14.5, lineHeight: 1.7 }}>
                      {job.bullets.map((b, j) => (
                        <li key={j} style={{ marginBottom: 6 }}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* Skills */}
        <Section id="skills" eyebrow="03 — Toolbox" title="Skills" accent={hues.sky}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
            {skillGroups.map((group, i) => {
              const Icon = group.icon;
              return (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="info-card" style={{ background: base.card, border: `1px solid ${base.line}`, borderRadius: 12, padding: 20, height: "100%", boxShadow: `0 0 0 rgba(0,0,0,0)` }}
                    onMouseEnter={(e)=>{e.currentTarget.style.borderColor = group.color; e.currentTarget.style.boxShadow = `0 10px 30px ${hexToRgba(group.color,0.15)}`;}}
                    onMouseLeave={(e)=>{e.currentTarget.style.borderColor = base.line; e.currentTarget.style.boxShadow = "none";}}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, color: group.color }}>
                      <Icon size={16} />
                      <span style={{ fontFamily: "monospace", fontSize: 12.5, letterSpacing: 0.5, textTransform: "uppercase" }}>{group.title}</span>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {group.items.map((s, j) => (
                        <span key={j} className="skill-pill" style={{ fontSize: 13, color: base.dim, background: base.raised, border: `1px solid ${base.line}`, padding: "5px 10px", borderRadius: 100, cursor: "default" }}
                          onMouseEnter={(e)=>{e.currentTarget.style.borderColor = group.color; e.currentTarget.style.color = base.text; e.currentTarget.style.background = hexToRgba(group.color,0.1);}}
                          onMouseLeave={(e)=>{e.currentTarget.style.borderColor = base.line; e.currentTarget.style.color = base.dim; e.currentTarget.style.background = base.raised;}}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Section>

        {/* Education & Certifications */}
        <Section id="education" eyebrow="04 — Background" title="Education & Certifications" accent={hues.amber}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, marginBottom: 32 }}>
            <Reveal>
              <div className="info-card" style={{ background: base.card, border: `1px solid ${base.line}`, borderTop: `3px solid ${hues.amber}`, borderRadius: 12, padding: 22, height: "100%" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, color: hues.amber, marginBottom: 10 }}>
                  <GraduationCap size={17} />
                  <span style={{ fontFamily: "monospace", fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>Education</span>
                </div>
                <div style={{ fontWeight: 600, fontSize: 15 }}>Integrated Masters in Information Technology</div>
                <div style={{ color: base.dim, fontSize: 13.5, marginTop: 4 }}>(BSc. IT and MSc. IT)</div>
                <div style={{ fontFamily: "monospace", fontSize: 12.5, color: hues.rose, marginTop: 8 }}>S.P. College · Srinagar, India</div>
                <div style={{ fontFamily: "monospace", fontSize: 12, color: base.faint, marginTop: 4 }}>01/2017 – 11/2023</div>
                <div style={{ marginTop: 12, display: "inline-block", fontFamily: "monospace", fontSize: 13, color: hues.amber, background: hexToRgba(hues.amber,0.12), border: `1px solid ${hexToRgba(hues.amber,0.35)}`, padding: "4px 10px", borderRadius: 8 }}>
                  GPA 8.7 / 10.0
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="info-card" style={{ background: base.card, border: `1px solid ${base.line}`, borderTop: `3px solid ${hues.violet}`, borderRadius: 12, padding: 22, height: "100%" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, color: hues.violet, marginBottom: 14 }}>
                  <Award size={17} />
                  <span style={{ fontFamily: "monospace", fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>Certifications</span>
                </div>
                {certifications.map((c, i) => (
                  <div key={i} style={{ marginBottom: i !== certifications.length - 1 ? 14 : 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 14.5 }}>{c.name}</div>
                    <div style={{ fontFamily: "monospace", fontSize: 12.5, color: c.color, marginTop: 2 }}>{c.issuer}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.14}>
            <div className="info-card" style={{ background: base.card, border: `1px solid ${base.line}`, borderTop: `3px solid ${hues.sky}`, borderRadius: 12, padding: 22 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, color: hues.sky, marginBottom: 14 }}>
                <Globe size={17} />
                <span style={{ fontFamily: "monospace", fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>Languages</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 14 }}>
                {languages.map((l, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 14 }}>{l.name}</span>
                    <span>
                      {Array.from({ length: 5 }).map((_, d) => (
                        <Dot key={d} filled={d < l.level} />
                      ))}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </Section>

        {/* Contact */}
        <Section id="contact" eyebrow="05 — Contact" title="Let's work together" accent={hues.rose}>
          <Reveal>
            <div className="info-card" style={{ background: `linear-gradient(135deg, ${hexToRgba(hues.teal,0.08)}, ${hexToRgba(hues.violet,0.08)})`, border: `1px solid ${base.line}`, borderRadius: 14, padding: 30 }}>
              <p style={{ color: base.dim, fontSize: 15.5, maxWidth: 560, marginBottom: 24 }}>
                Open to full-stack and AI-native product roles where I can own features end to end.
                Reach out directly — I usually reply within a day.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                <a href="mailto:qaziwajid500@gmail.com" className="cta-btn" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "monospace", fontSize: 13, padding: "12px 20px", borderRadius: 8, background: `linear-gradient(90deg, ${hues.teal}, ${hues.sky})`, color: "#0A0B14", fontWeight: 700, textDecoration: "none" }}>
                  <Mail size={15} /> qaziwajid500@gmail.com
                </a>
                <a href="tel:+919070889880" className="ghost-btn" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "monospace", fontSize: 13, padding: "12px 20px", borderRadius: 8, background: base.card, border: `1px solid ${base.line}`, color: base.text, textDecoration: "none" }}
                  onMouseEnter={(e)=>{e.currentTarget.style.borderColor = hues.rose;}}
                  onMouseLeave={(e)=>{e.currentTarget.style.borderColor = base.line;}}
                >
                  <Phone size={15} color={hues.rose} /> +91 9070889880
                </a>
                <a href="https://www.linkedin.com/in/qaziwajid" target="_blank" rel="noopener noreferrer" className="ghost-btn" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "monospace", fontSize: 13, padding: "12px 20px", borderRadius: 8, background: base.card, border: `1px solid ${base.line}`, color: base.text, textDecoration: "none" }}
                  onMouseEnter={(e)=>{e.currentTarget.style.borderColor = hues.violet;}}
                  onMouseLeave={(e)=>{e.currentTarget.style.borderColor = base.line;}}
                >
                  <Linkedin size={15} color={hues.violet} /> linkedin.com/in/qaziwajid <ExternalLink size={13} />
                </a>
              </div>
            </div>
          </Reveal>
        </Section>

        <footer style={{ textAlign: "center", padding: "40px 24px 60px", color: base.faint, fontFamily: "monospace", fontSize: 12 }}>
          Built by Wajid Ul Haque — Full-Stack Software Engineer
        </footer>

        {/* back to top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="cta-btn"
          style={{
            position: "fixed", bottom: 24, right: 24, zIndex: 30,
            width: 46, height: 46, borderRadius: "50%", border: "none",
            background: `linear-gradient(135deg, ${hues.teal}, ${hues.violet})`, color: "#0A0B14", cursor: "pointer",
            display: showTop ? "flex" : "none", alignItems: "center", justifyContent: "center",
            boxShadow: "0 10px 24px rgba(0,0,0,0.4)",
          }}
          aria-label="Back to top"
        >
          <ArrowUp size={18} />
        </button>
      </div>
    </div>
  );
}
