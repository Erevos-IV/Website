import React, { useState, useEffect, useRef } from 'react';
import { 
  Database, Mail, Linkedin, Clock, Award, 
  GraduationCap, X, Copy, Check, Sparkles, 
  Zap, TrendingUp, ArrowRight, Shield, Cpu, ChevronLeft, ChevronRight
} from 'lucide-react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [currentCert, setCurrentCert] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const canvasRef = useRef(null);

  const certifications = [
    {
      id: 1,
      title: "Azure Database Administrator Associate",
      issuer: "Microsoft Certified Associate",
      code: "DP-300",
      type: "Azure Cloud",
      color: "#00E5FF"
    },
    {
      id: 2,
      title: "Azure Data Fundamentals",
      issuer: "Microsoft Certified",
      code: "DP-900",
      type: "Azure Data",
      color: "#0088FF"
    },
    {
      id: 3,
      title: "Oracle Certified Associate",
      issuer: "Oracle Certified Professional",
      code: "OCA 12c/19c",
      type: "Oracle Database",
      color: "#FF1E27"
    },
    {
      id: 4,
      title: "Oracle Autonomous DB Specialist",
      issuer: "Oracle Certified Specialist",
      code: "ADB Specialist",
      type: "Autonomous DB",
      color: "#FF8C00"
    }
  ];

  const expertise = [
    {
      title: "Database Administration",
      icon: Database,
      color: '#00F0FF',
      bgColor: "rgba(0, 240, 255, 0.08)",
      skills: ["SQL Server 2016-2025", "Oracle 12c-26ai", "PostgreSQL", "MySQL", "HADR Configuration"]
    },
    {
      title: "Performance Optimization",
      icon: TrendingUp,
      color: '#FF1E27',
      bgColor: "rgba(255, 30, 39, 0.08)",
      skills: ["Query Tuning", "Index Optimization", "Wait Stats Analysis", "Deadlock Resolution", "Partitioning & Sharding"]
    },
    {
      title: "Cloud & Automation",
      icon: Cpu,
      color: '#0088FF',
      bgColor: "rgba(0, 136, 255, 0.08)",
      skills: ["Azure Database Services", "Google Cloud SQL", "Ansible", "Terraform", "PowerShell Scripting"]
    }
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isModalOpen) return;
    const timer = setInterval(() => {
      setCurrentCert((prev) => (prev + 1) % certifications.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isModalOpen, certifications.length]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const numParticles = Math.min(Math.floor(window.innerWidth / 18), 70);
    const particles = [];
    const mouse = { x: null, y: null, radius: 180 };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const ripples = [];
    const handleClick = (e) => {
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        maxRadius: 180,
        alpha: 1
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleClick);

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 1.8 + 1,
        color: Math.random() > 0.4 ? 'rgba(255, 30, 39, 0.6)' : 'rgba(0, 240, 255, 0.6)'
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render expanding web ripple effects on user click
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += 4;
        r.alpha -= 0.02;

        if (r.alpha <= 0) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 30, 39, ${r.alpha})`;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([6, 6]);
        ctx.stroke();

        for (let a = 0; a < 8; a++) {
          const angle = (a * Math.PI) / 4;
          ctx.beginPath();
          ctx.moveTo(r.x, r.y);
          ctx.lineTo(r.x + Math.cos(angle) * r.radius, r.y + Math.sin(angle) * r.radius);
          ctx.strokeStyle = `rgba(0, 240, 255, ${r.alpha * 0.6})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        ctx.restore();
      }

      // Update particle matrix and web connecting lines
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 240, 255, ${0.25 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }

        if (mouse.x !== null && mouse.y !== null) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(255, 30, 39, ${0.5 * (1 - dist / mouse.radius)})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const nextCert = (e) => {
    e && e.stopPropagation();
    setCurrentCert((prev) => (prev + 1) % certifications.length);
  };

  const prevCert = (e) => {
    e && e.stopPropagation();
    setCurrentCert((prev) => (prev - 1 + certifications.length) % certifications.length);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("vasilhsgxr5000@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative selection:bg-red-600 selection:text-white">
      {}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Teko:wght@600;700&family=Space+Mono:wght@400;700&family=Inter:wght@300;400;600;700;900&display=swap');

        :root {
          --bg-dark: #07080C;
          --bg-card: rgba(14, 17, 24, 0.85);
          --accent-red: #FF1E27;
          --accent-blue: #0088FF;
          --accent-cyan: #00F0FF;
          --text-main: #FFFFFF;
          --text-muted: #94A3B8;
          --border-web: rgba(255, 30, 39, 0.25);
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', sans-serif; background-color: var(--bg-dark); color: var(--text-main); overflow-x: hidden; }

        .font-hero { font-family: 'Teko', sans-serif; letter-spacing: 2px; }
        .font-code { font-family: 'Space Mono', monospace; }

        .corner-web-tl {
          position: fixed; top: 0; left: 0; width: 220px; height: 220px;
          pointer-events: none; z-index: 2; opacity: 0.35;
        }
        .corner-web-tr {
          position: fixed; top: 0; right: 0; width: 220px; height: 220px;
          pointer-events: none; z-index: 2; opacity: 0.35; transform: scaleX(-1);
        }

        nav {
          position: fixed; top: 0; left: 0; right: 0; width: 100%;
          z-index: 1000; padding: 1.25rem 0;
          backdrop-filter: blur(14px);
          background: rgba(7, 8, 12, 0.85);
          border-bottom: 1px solid rgba(255, 30, 39, 0.2);
          transition: all 0.3s ease;
        }
        nav.scrolled {
          padding: 0.85rem 0;
          box-shadow: 0 8px 30px rgba(255, 30, 39, 0.15);
          border-bottom-color: var(--accent-red);
        }

        .nav-content { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; padding: 0 2rem; }
        .nav-logo { font-size: 1.6rem; font-weight: 700; display: flex; align-items: center; gap: 0.75rem; color: var(--accent-red); text-transform: uppercase; }
        .nav-links { display: flex; gap: 2rem; }
        .nav-btn { background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: 0.85rem; font-weight: 700; letter-spacing: 1.5px; transition: all 0.2s; position: relative; }
        .nav-btn:hover, .nav-btn.active { color: var(--accent-cyan); text-shadow: 0 0 10px rgba(0, 240, 255, 0.5); }
        .nav-btn.active::after {
          content: ''; position: absolute; bottom: -8px; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, var(--accent-red), var(--accent-cyan));
        }

        section { position: relative; z-index: 10; padding: 5rem 1.5rem; max-width: 1200px; margin: 0 auto; }
        .section-title { font-size: 3rem; font-weight: 700; text-align: center; margin-bottom: 3.5rem; text-transform: uppercase; font-family: 'Teko', sans-serif; letter-spacing: 3px; color: #fff; text-shadow: 0 0 15px rgba(255, 30, 39, 0.4); }

        .card {
          background: var(--bg-card);
          border: 1px solid var(--border-web);
          border-radius: 12px;
          padding: 2rem;
          transition: all 0.25s ease;
          position: relative;
          overflow: hidden;
        }
        .card::before {
          content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 3px;
          background: linear-gradient(90deg, var(--accent-red), var(--accent-blue));
          opacity: 0.6;
        }
        .card:hover {
          transform: translateY(-6px);
          border-color: var(--accent-cyan);
          box-shadow: 0 10px 30px rgba(0, 240, 255, 0.15);
        }

        .timeline-item { border-left: 2px solid var(--accent-red); padding-left: 2rem; position: relative; margin-bottom: 2.5rem; }
        .timeline-dot {
          width: 14px; height: 14px; background: var(--accent-cyan);
          border-radius: 50%; position: absolute; left: -8px; top: 0;
          box-shadow: 0 0 12px var(--accent-cyan);
        }

        .tech-chip {
          padding: 0.6rem 1.25rem; background: rgba(14, 17, 24, 0.9);
          border: 1px solid rgba(0, 240, 255, 0.2); border-radius: 999px;
          color: var(--text-muted); font-size: 0.85rem; font-weight: 600;
          transition: all 0.2s ease;
        }
        .tech-chip:hover { border-color: var(--accent-red); color: #fff; box-shadow: 0 0 12px rgba(255, 30, 39, 0.4); transform: translateY(-2px); }

        .btn { display: inline-flex; align-items: center; gap: 0.6rem; padding: 0.85rem 2rem; border-radius: 6px; font-weight: 700; cursor: pointer; border: none; transition: all 0.2s ease; text-transform: uppercase; letter-spacing: 1px; }
        .btn-primary { background: linear-gradient(135deg, var(--accent-red), #B30006); color: #fff; box-shadow: 0 6px 20px rgba(255, 30, 39, 0.4); }
        .btn-primary:hover { transform: translateY(-3px); box-shadow: 0 10px 28px rgba(255, 30, 39, 0.6); }
        .btn-secondary { background: rgba(14, 17, 24, 0.9); border: 1px solid var(--accent-cyan); color: #fff; box-shadow: 0 4px 15px rgba(0, 240, 255, 0.2); }
        .btn-secondary:hover { background: rgba(0, 240, 255, 0.15); transform: translateY(-3px); box-shadow: 0 8px 25px rgba(0, 240, 255, 0.3); }

        .cert-card {
          background: linear-gradient(135deg, rgba(14, 17, 24, 0.95), rgba(22, 27, 38, 0.95));
          border: 1px solid var(--accent-cyan);
          border-radius: 16px; padding: 2rem;
          text-align: center; position: relative;
          box-shadow: 0 10px 35px rgba(0, 0, 0, 0.8);
        }

        .modal-overlay { position: fixed; inset: 0; background: rgba(0, 0, 0, 0.85); backdrop-filter: blur(8px); z-index: 2000; display: flex; align-items: center; justify-content: center; padding: 2rem; }
        .modal-content { background: #0E1118; border: 2px solid var(--accent-red); border-radius: 16px; padding: 2.5rem; max-width: 500px; width: 100%; position: relative; box-shadow: 0 0 40px rgba(255, 30, 39, 0.4); }

        @media (max-width: 768px) {
          .nav-links { display: none; }
          .corner-web-tl, .corner-web-tr { width: 130px; height: 130px; }
        }
      `}</style>

      {/* Background Interactive Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      {/* Spider Web Corner SVGs */}
      <svg className="corner-web-tl" viewBox="0 0 100 100" fill="none" stroke="#FF1E27" strokeWidth="0.75">
        <path d="M0,0 L100,100 M0,0 L100,50 M0,0 L50,100 M0,0 L100,25 M0,0 L25,100" />
        <path d="M20,0 C20,10 10,20 0,20 M40,0 C40,20 20,40 0,40 M60,0 C60,30 30,60 0,60 M80,0 C80,40 40,80 0,80 M100,0 C100,50 50,100 0,100" />
      </svg>
      <svg className="corner-web-tr" viewBox="0 0 100 100" fill="none" stroke="#00F0FF" strokeWidth="0.75">
        <path d="M0,0 L100,100 M0,0 L100,50 M0,0 L50,100 M0,0 L25,100" />
        <path d="M20,0 C20,10 10,20 0,20 M40,0 C40,20 20,40 0,40 M60,0 C60,30 30,60 0,60 M80,0 C80,40 40,80 0,80 M100,0 C100,50 50,100 0,100" />
      </svg>

      {}
      <nav className={isScrolled ? 'scrolled' : ''}>
        <div className="nav-content">
          <div className="nav-logo font-hero">
            <Shield size={26} className="text-red-500 animate-pulse" />
            <span>VASSILEIOS GOUSETIS</span>
          </div>
          <div className="nav-links">
            <button onClick={() => scrollToSection('home')} className={`nav-btn ${activeSection === 'home' ? 'active' : ''}`}>HOME</button>
            <button onClick={() => scrollToSection('expertise')} className={`nav-btn ${activeSection === 'expertise' ? 'active' : ''}`}>EXPERTISE</button>
            <button onClick={() => scrollToSection('experience')} className={`nav-btn ${activeSection === 'experience' ? 'active' : ''}`}>EXPERIENCE</button>
            <button onClick={() => scrollToSection('education')} className={`nav-btn ${activeSection === 'education' ? 'active' : ''}`}>EDUCATION</button>
          </div>
        </div>
      </nav>

      {}
      <section id="home" className="min-h-screen flex flex-col justify-center items-center text-center pt-32 pb-16">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-950/40 border border-red-600/40 text-red-400 text-xs font-code font-bold uppercase tracking-widest">
            <Sparkles size={14} className="text-cyan-400" />
            <span>Spider-Sense Active • Database Architecture</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-hero font-bold tracking-wider text-white">
            VASSILEIOS GOUSETIS
          </h1>

          <h2 className="text-xl md:text-2xl font-hero tracking-widest text-cyan-400 uppercase">
            Your Friendly Neighborhood Database Architect
          </h2>

          <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto font-sans">
            Enterprise-grade database solutions. 4+ years slinging enterprise database solutions across SQL Server, Oracle, and Cloud domains. Specialized in Automation, Administration, and Performance.
          </p>

          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <button onClick={() => scrollToSection('experience')} className="btn btn-primary">
              <ArrowRight size={18} /> View Web of Work
            </button>
            <button onClick={() => scrollToSection('connect')} className="btn btn-secondary">
              <Mail size={18} /> Signal Flare
            </button>
          </div>

          {/* Interactive Certification Carousel Badge */}
          <div className="mt-12 w-full max-w-md mx-auto">
            <div className="cert-card">
              <div className="flex items-center justify-between gap-4 mb-4">
                <button onClick={prevCert} className="text-cyan-400 hover:text-red-500 font-bold text-2xl px-3 py-1">‹</button>
                <div onClick={() => setIsModalOpen(true)} className="cursor-pointer space-y-2">
                  <div className="w-16 h-16 mx-auto rounded-full bg-red-600/20 border-2 border-red-500 flex items-center justify-center text-cyan-400">
                    <Award size={32} />
                  </div>
                  <h3 className="font-bold text-lg text-white">{certifications[currentCert].title}</h3>
                  <p className="text-xs font-code text-cyan-400">{certifications[currentCert].issuer} • {certifications[currentCert].code}</p>
                </div>
                <button onClick={nextCert} className="text-cyan-400 hover:text-red-500 font-bold text-2xl px-3 py-1">›</button>
              </div>
              <div className="flex justify-center gap-2">
                {certifications.map((_, idx) => (
                  <button key={idx} onClick={() => setCurrentCert(idx)} className={`w-2.5 h-2.5 rounded-full transition-all ${idx === currentCert ? 'bg-cyan-400 w-6' : 'bg-slate-700'}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {}
      <div className="relative z-10 py-12 bg-slate-950/80 border-y border-red-900/30">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-hero font-bold text-cyan-400">650+</div>
            <div className="text-xs font-code text-slate-400 uppercase mt-1">Databases Guarded</div>
          </div>
          <div>
            <div className="text-4xl font-hero font-bold text-red-500">40TB+</div>
            <div className="text-xs font-code text-slate-400 uppercase mt-1">Data Web Weaved</div>
          </div>
          <div>
            <div className="text-4xl font-hero font-bold text-cyan-400">4+</div>
            <div className="text-xs font-code text-slate-400 uppercase mt-1">Years Patrol</div>
          </div>
          <div>
            <div className="text-4xl font-hero font-bold text-red-500">99.9%</div>
            <div className="text-xs font-code text-slate-400 uppercase mt-1">Uptime Shield</div>
          </div>
        </div>
      </div>

      {}
      <section id="expertise">
        <h2 className="section-title">Spider Toolkit & Expertise</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {expertise.map((exp, idx) => {
            const Icon = exp.icon;
            return (
              <div key={idx} className="card">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-6" style={{ background: exp.bgColor, color: exp.color }}>
                  <Icon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">{exp.title}</h3>
                <ul className="space-y-2.5 text-slate-300 text-sm">
                  {exp.skills.map((skill, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: exp.color }} />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {}
      <section id="experience">
        <h2 className="section-title">Web of Experience</h2>
        <div className="space-y-8">
          <div className="timeline-item">
            <div className="timeline-dot" />
            <div className="flex flex-wrap justify-between items-center mb-1">
              <h3 className="text-xl font-bold text-white">Database Administrator</h3>
              <span className="text-xs font-code text-cyan-400 flex items-center gap-1"><Clock size={14} /> Aug 2025 - Present</span>
            </div>
            <div className="text-sm font-semibold text-red-400 mb-3">Athens Exchange Group (ATHEX)</div>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>• Managing Google Cloud SQL & enterprise high-performance database infrastructure.</li>
              <li>• Oracle, SQL Server, and PostgreSQL automated installation and patch management.</li>
              <li>• Executing complex database migrations across cloud platforms with minimal downtime.</li>
              <li>• Performance monitoring and proactive query optimization.</li>
            </ul>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot" />
            <div className="flex flex-wrap justify-between items-center mb-1">
              <h3 className="text-xl font-bold text-white">Researcher & Informatics Specialist</h3>
              <span className="text-xs font-code text-cyan-400 flex items-center gap-1"><Clock size={14} /> Sep 2024 - June 2025</span>
            </div>
            <div className="text-sm font-semibold text-red-400 mb-3">Hellenic Military Units Administration</div>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>• Specialized technical support and defense for encrypted high-security applications.</li>
              <li>• Secure application development & automation scripting with Python and SQL.</li>
              <li>• Large-scale enterprise file system management and data governance.</li>
            </ul>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot" />
            <div className="flex flex-wrap justify-between items-center mb-1">
              <h3 className="text-xl font-bold text-white">Data Engineer</h3>
              <span className="text-xs font-code text-cyan-400 flex items-center gap-1"><Clock size={14} /> Nov 2023 - May 2024</span>
            </div>
            <div className="text-sm font-semibold text-red-400 mb-3">Ernst & Young</div>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>• Built automated ETL pipelines utilizing Python, SQL, and SSIS.</li>
              <li>• Credit risk data transformation, analytics, and validation.</li>
              <li>• CDM model configuration and query pipeline optimization.</li>
            </ul>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot" />
            <div className="flex flex-wrap justify-between items-center mb-1">
              <h3 className="text-xl font-bold text-white">Database Administrator</h3>
              <span className="text-xs font-code text-cyan-400 flex items-center gap-1"><Clock size={14} /> July 2022 - Nov 2023</span>
            </div>
            <div className="text-sm font-semibold text-red-400 mb-3">Netcompany - Instasoft</div>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>• Enterprise database administration, health monitoring, and maintenance.</li>
              <li>• Query optimization, index tuning, and wait stats analysis.</li>
              <li>• Table partitioning, data compression, and archiving strategies.</li>
              <li>• High Availability (HADR), backup automation, and disaster recovery procedures.</li>
            </ul>
          </div>
        </div>
      </section>

      {}
      <section id="education" className="bg-slate-950/80 rounded-2xl border border-red-900/30 p-8 md:p-10 my-12 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Column 1: Education */}
          <div>
            <h3 className="text-xl font-bold text-cyan-400 mb-6 flex items-center gap-2 font-hero tracking-wider">
              <GraduationCap size={22} className="text-cyan-400" /> Education
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-white text-base">Master of Data Analytics</h4>
                <div className="text-xs font-code text-cyan-400 font-bold my-1">2023 - 2025</div>
                <div className="text-xs text-slate-400">University of Bolton</div>
                <div className="text-xs text-yellow-400 font-bold mt-1">Grade: First-Class Honours (1:1)</div>
              </div>
              <div>
                <h4 className="font-bold text-white text-base">Bachelor of Data Analytics</h4>
                <div className="text-xs font-code text-cyan-400 font-bold my-1">2020 - 2023</div>
                <div className="text-xs text-slate-400">University of Bolton</div>
                <div className="text-xs text-yellow-400 font-bold mt-1">Grade: First-Class Honours (1:1)</div>
              </div>
            </div>
          </div>

          {/* Column 2: Spidey Badges / Certifications */}
          <div>
            <h3 className="text-xl font-bold text-red-500 mb-6 flex items-center gap-2 font-hero tracking-wider">
              <Award size={22} className="text-red-500" /> Spidey Badges
            </h3>
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <Award size={20} className="text-red-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white text-sm">Azure Database Administrator</div>
                  <div className="text-xs text-slate-400">Microsoft Certified Associate (DP-300)</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Award size={20} className="text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white text-sm">Azure Data Fundamentals</div>
                  <div className="text-xs text-slate-400">Microsoft Certified (DP-900)</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Award size={20} className="text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white text-sm">Oracle Associate DBA</div>
                  <div className="text-xs text-slate-400">Oracle Certified Associate (OCA 12c/19c)</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Award size={20} className="text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white text-sm">Oracle Autonomous DB Specialist</div>
                  <div className="text-xs text-slate-400">Oracle Certified Specialist</div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Honors & Awards */}
          <div>
            <h3 className="text-xl font-bold text-yellow-400 mb-6 flex items-center gap-2 font-hero tracking-wider">
              <Zap size={22} className="text-yellow-400" /> Honors & Awards
            </h3>
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <Zap size={20} className="text-yellow-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white text-sm">Distinguished IT Student Award</div>
                  <div className="text-xs text-slate-400 mt-1">2025 & 2023 - British Computer Society (BCS)</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Zap size={20} className="text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white text-sm">Ministry of Digital Governance</div>
                  <div className="text-xs text-slate-400 mt-1">Special Recognition Award Recipient</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {}
      <section className="text-center">
        <h3 className="text-xs font-code text-cyan-400 uppercase tracking-widest mb-8">Arachnid Tech Arsenal</h3>
        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {['SQL Server 2016-2025', 'Oracle 12c-26ai', 'PostgreSQL', 'MySQL', 'MariaDB', 'Azure SQL Database', 'Google Cloud SQL', 'Ansible', 'Terraform', 'PowerShell', 'Python', 'SSIS', 'Grafana', 'SolarWinds', 'OEM 13c'].map(tech => (
            <span key={tech} className="tech-chip">{tech}</span>
          ))}
        </div>
      </section>

      {}
      <footer id="connect" className="relative z-10 mt-20 py-16 bg-slate-950 border-t border-red-900/40 text-center">
        <div className="max-w-2xl mx-auto px-6 space-y-6">
          <h2 className="text-3xl font-hero font-bold text-white tracking-wider">SHOOT A WEB SIGNAL</h2>
          <p className="text-slate-400 text-sm">Ready to reinforce your database infrastructure? Connect for enterprise database architecture, automation, and performance tuning.</p>

          <div className="flex flex-wrap gap-4 justify-center">
            <a href="mailto:vasilhsgxr5000@gmail.com" className="btn btn-primary">
              <Mail size={18} /> Send Signal
            </a>
            <button onClick={handleCopyEmail} className="btn btn-secondary">
              {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
              {copied ? "Com-Link Copied!" : "Copy Email"}
            </button>
            <a href="https://www.linkedin.com/in/vasileiosgoysetis-7378101b9" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              <Linkedin size={18} /> LinkedIn
            </a>
          </div>

          <p className="text-xs font-code text-slate-500 pt-8">© {new Date().getFullYear()} Vassileios Gousetis • With Great Data Comes Great Responsibility</p>
        </div>
      </footer>

      {}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <X size={24} />
            </button>
            <div className="text-center space-y-4">
              <Award size={48} className="mx-auto text-cyan-400 animate-pulse" />
              <h3 className="text-xl font-bold text-white">{certifications[currentCert].title}</h3>
              <p className="text-sm font-code text-red-400">{certifications[currentCert].issuer} • {certifications[currentCert].code}</p>
              <div className="p-3 bg-slate-900 rounded-lg text-xs text-slate-300 border border-slate-800">
                Verified Enterprise Certification for Advanced Database Architecture & Cloud Operations.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
