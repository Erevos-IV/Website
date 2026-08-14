import React, { useState, useEffect } from 'react';
import { 
  Database, Mail, Linkedin, Clock, Award, GraduationCap, 
  ChevronLeft, ChevronRight, X, Copy, Check, Sparkles, Zap, 
  TrendingUp, ArrowRight, Shield, Cpu, ExternalLink, Terminal, Activity
} from 'lucide-react';

// Generates Spider-Man themed SVG fallback badges for certifications
const createSpideyCertBadge = (title, issuer, color, code) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="380" viewBox="0 0 600 380">
    <rect width="600" height="380" rx="16" fill="#08090D" stroke="${color}" stroke-width="2"/>
    
    <!-- Spiderweb Background Pattern -->
    <path d="M300 190 L0 0 M300 190 L600 0 M300 190 L600 380 M300 190 L0 380 M300 190 L300 0 M300 190 L600 190 M300 190 L300 380 M300 190 L0 190" stroke="rgba(255,30,39,0.15)" stroke-width="1.5"/>
    <circle cx="300" cy="190" r="50" fill="none" stroke="rgba(255,30,39,0.2)" stroke-width="1"/>
    <circle cx="300" cy="190" r="100" fill="none" stroke="rgba(255,30,39,0.2)" stroke-width="1"/>
    <circle cx="300" cy="190" r="150" fill="none" stroke="rgba(255,30,39,0.2)" stroke-width="1"/>

    <!-- Spider Emblem Badge Header -->
    <circle cx="300" cy="110" r="42" fill="#12151E" stroke="${color}" stroke-width="2"/>
    
    <!-- Custom Spider Silhouette -->
    <path d="M300 95 C303 95 306 98 306 102 C306 106 303 110 300 114 C297 110 294 106 294 102 C294 98 297 95 300 95 Z M300 112 C305 112 309 118 309 124 C309 130 305 135 300 135 C295 135 291 130 291 124 C291 118 295 112 300 112 Z" fill="${color}"/>
    <path d="M294 102 Q280 95 270 100 M294 106 Q276 106 266 114 M294 110 Q276 118 268 128 M300 120 Q282 132 272 144" stroke="${color}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M306 102 Q320 95 330 100 M306 106 Q324 106 334 114 M306 110 Q324 118 332 128 M300 120 Q318 132 328 144" stroke="${color}" stroke-width="2.5" fill="none" stroke-linecap="round"/>

    <text x="300" y="195" font-family="system-ui, sans-serif" font-size="22" font-weight="900" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">${title}</text>
    <text x="300" y="225" font-family="system-ui, sans-serif" font-size="14" font-weight="600" fill="#A0AABC" text-anchor="middle">${issuer}</text>
    <text x="300" y="255" font-family="monospace" font-size="13" font-weight="bold" fill="${color}" text-anchor="middle" letter-spacing="2">VERIFIED CERTIFICATE • ${code}</text>
    
    <rect x="200" y="285" width="200" height="36" rx="18" fill="${color}" fill-opacity="0.2" stroke="${color}" stroke-width="1.5"/>
    <text x="300" y="308" font-family="monospace" font-size="12" font-weight="900" fill="#FFFFFF" text-anchor="middle" letter-spacing="1.5">SPIDEY VERIFIED</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const certificationsList = [
  { 
    id: 1, 
    src: "/cert-azure-dba.png", 
    fallback: createSpideyCertBadge("Azure Database Administrator", "Microsoft Certified Associate", "#FF1E27", "DP-300"),
    alt: "Microsoft Certified: Azure Database Administrator Associate" 
  },
  { 
    id: 2, 
    src: "/cert-azure-data.png", 
    fallback: createSpideyCertBadge("Azure Data Fundamentals", "Microsoft Certified", "#0088FF", "DP-900"),
    alt: "Microsoft Certified: Azure Data Fundamentals" 
  },
  { 
    id: 3, 
    src: "/cert-oracle-associate.png", 
    fallback: createSpideyCertBadge("Oracle Certified Associate", "Oracle Database Administrator", "#FFD700", "1Z0-082"),
    alt: "Oracle Certified Associate" 
  },
  { 
    id: 4, 
    src: "/cert-oracle-ADB.png", 
    fallback: createSpideyCertBadge("Oracle Autonomous Database", "Oracle Cloud Specialist", "#00F0FF", "1Z0-931"),
    alt: "Oracle Certified Autonomous DB" 
  }
];

const expertiseList = [
  {
    title: "Spider Database Core",
    icon: Database,
    color: '#FF1E27',
    bgColor: "rgba(255, 30, 39, 0.12)",
    skills: ["SQL Server 2016-2025", "Oracle 12c-26ai", "PostgreSQL", "MySQL", "High Availability HADR"]
  },
  {
    title: "Query & Sense Tuning",
    icon: TrendingUp,
    color: '#00F0FF',
    bgColor: "rgba(0, 240, 255, 0.12)",
    skills: ["Query Optimization", "Index Web Tuning", "Wait Stats Analysis", "Deadlock Resolution", "Partitioning & Sharding"]
  },
  {
    title: "Cloud Web & Automation",
    icon: Shield,
    color: '#0088FF',
    bgColor: "rgba(0, 136, 255, 0.12)",
    skills: ["Azure Database Services", "Google Cloud SQL", "Ansible Automation", "Terraform Infra", "PowerShell Scripting"]
  }
];

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [currentCert, setCurrentCert] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = ['home', 'expertise', 'experience', 'education', 'connect'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nextCert = (e) => {
    e && e.stopPropagation();
    setCurrentCert((prev) => (prev + 1) % certificationsList.length);
  };

  const prevCert = (e) => {
    e && e.stopPropagation();
    setCurrentCert((prev) => (prev - 1 + certificationsList.length) % certificationsList.length);
  };

  useEffect(() => {
    if (isModalOpen) return;
    const timer = setInterval(() => {
      setCurrentCert((prev) => (prev + 1) % certificationsList.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentCert, isModalOpen]);

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

  const handleImageError = (certId) => {
    setImageErrors(prev => ({ ...prev, [certId]: true }));
  };

  return (
    <div className="app-container">
      {}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600;700;800;900&display=swap');

        /* Spider-Man Palette Design Tokens */
        :root {
          --bg-dark: #08090D;          /* Deep Spider Black */
          --bg-card: #12151E;          /* Dark Web Blue-Black Surface */
          --bg-card-hover: #1A1F2C;    /* Spider Web Card Hover */
          --text-main: #FFFFFF;        /* Crisp White */
          --text-muted: #A0AABC;       /* Web Silk Gray */
          --spidey-red: #FF1E27;       /* Iconic Crimson Red */
          --spidey-red-hover: #E00009; /* Darker Crimson */
          --spidey-blue: #0088FF;      /* Electric Spidey Blue */
          --spidey-cyan: #00F0FF;      /* Spider-Sense Glow Cyan */
          --spidey-gold: #FFD700;      /* Suit Accent Gold */
          --border: rgba(255, 30, 39, 0.22); /* Spider Red Tint Border */
          --border-blue: rgba(0, 136, 255, 0.25);
          --focus: #00F0FF;            /* Spider Sense Focus Ring */
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          background-color: var(--bg-dark);
          color: var(--text-main);
          line-height: 1.5;
          width: 100%;
          overflow-x: hidden;
        }

        html { scroll-behavior: smooth; }

        /* Web Overlay Background Effect */
        .app-container {
          width: 100%;
          min-height: 100vh;
          background-color: var(--bg-dark);
          background-image: 
            radial-gradient(circle at 15% 20%, rgba(255, 30, 39, 0.08) 0%, transparent 40%),
            radial-gradient(circle at 85% 60%, rgba(0, 136, 255, 0.08) 0%, transparent 40%),
            radial-gradient(circle at 50% 90%, rgba(0, 240, 255, 0.05) 0%, transparent 50%),
            linear-gradient(rgba(255, 30, 39, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 30, 39, 0.03) 1px, transparent 1px);
          background-size: 100% 100%, 100% 100%, 100% 100%, 40px 40px, 40px 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* Navigation Bar */
        nav {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          padding: 1.25rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: rgba(8, 9, 13, 0.92);
          backdrop-filter: blur(12px);
          z-index: 1000;
          border-bottom: 2px solid var(--border);
          transition: all 0.3s ease;
        }

        nav.scrolled {
          padding: 0.9rem 2rem;
          background-color: rgba(6, 7, 10, 0.98);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.9), 0 0 20px rgba(255, 30, 39, 0.15);
          border-bottom-color: var(--spidey-red);
        }

        .nav-content {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .nav-logo { 
          font-size: 1.5rem; 
          font-weight: 900; 
          display: flex; 
          align-items: center; 
          gap: 0.6rem; 
          color: var(--spidey-red);
          font-family: 'Bebas Neue', 'Space Mono', sans-serif;
          letter-spacing: 2px;
          cursor: pointer;
          text-shadow: 0 0 10px rgba(255, 30, 39, 0.5);
        }

        .nav-logo span {
          color: #FFFFFF;
        }

        .nav-links { display: flex; gap: 2rem; }

        .nav-btn { 
          background: none; 
          border: none; 
          color: var(--text-muted); 
          cursor: pointer; 
          font-size: 0.85rem; 
          font-weight: 800; 
          letter-spacing: 1.5px;
          text-transform: uppercase;
          transition: all 0.25s ease; 
          position: relative;
          padding: 0.4rem 0;
          font-family: 'Space Mono', monospace;
        }

        .nav-btn:hover, .nav-btn.active { 
          color: var(--spidey-cyan); 
          text-shadow: 0 0 8px rgba(0, 240, 255, 0.6);
        }

        .nav-btn.active::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--spidey-red), var(--spidey-cyan));
          box-shadow: 0 0 10px var(--spidey-cyan);
          border-radius: 2px;
        }

        /* Layout Sections */
        section {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 6rem 1.5rem;
          display: flex;
          flex-direction: column;
          position: relative;
          z-index: 10;
        }

        /* Hero Section */
        .hero {
          min-height: 100vh;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding-top: 8rem;
        }

        .hero-content {
          max-width: 900px;
          width: 100%;
        }

        .badge-spidey {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.6rem 1.4rem;
          background-color: var(--bg-card);
          border: 1.5px solid var(--spidey-red);
          border-radius: 999px;
          color: #FFFFFF;
          font-size: 0.85rem;
          font-weight: 800;
          margin-bottom: 1.75rem;
          font-family: 'Space Mono', monospace;
          box-shadow: 0 0 15px rgba(255, 30, 39, 0.3);
          letter-spacing: 1px;
        }

        .hero h1 { 
          font-size: clamp(2.8rem, 8vw, 4.8rem); 
          font-weight: 900; 
          margin-bottom: 0.8rem; 
          line-height: 1.05; 
          letter-spacing: 2px;
          font-family: 'Bebas Neue', sans-serif;
          color: #FFFFFF;
          text-shadow: 3px 3px 0px var(--spidey-red), 0 0 20px rgba(255, 30, 39, 0.4);
        }

        .hero h2 { 
          font-size: clamp(1.1rem, 2.8vw, 1.8rem); 
          color: var(--spidey-cyan); 
          margin-bottom: 1.5rem; 
          font-weight: 800;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          text-shadow: 0 0 12px rgba(0, 240, 255, 0.4);
        }

        .hero p { 
          max-width: 740px; 
          font-size: 1.15rem; 
          color: var(--text-muted); 
          margin-bottom: 2.5rem; 
          line-height: 1.65; 
          margin-left: auto; 
          margin-right: auto; 
        }

        .btn-group { display: flex; gap: 1.25rem; flex-wrap: wrap; justify-content: center; }

        .btn {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.9rem 2.2rem;
          border-radius: 0.6rem;
          font-weight: 800;
          text-decoration: none;
          transition: all 0.25s ease;
          cursor: pointer;
          border: none;
          font-size: 0.95rem;
          text-transform: uppercase;
          letter-spacing: 1.2px;
          font-family: 'Space Mono', monospace;
        }

        .btn-primary {
          background: linear-gradient(135deg, var(--spidey-red), var(--spidey-red-hover));
          color: #FFFFFF;
          box-shadow: 0 6px 20px rgba(255, 30, 39, 0.4), 0 0 10px rgba(255, 30, 39, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .btn-primary:hover { 
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 10px 30px rgba(255, 30, 39, 0.6), 0 0 20px rgba(255, 30, 39, 0.4);
        }

        .btn-secondary {
          background-color: var(--bg-card);
          border: 1.5px solid var(--spidey-blue);
          color: var(--spidey-blue);
          box-shadow: 0 4px 15px rgba(0, 136, 255, 0.2);
        }
        .btn-secondary:hover { 
          background-color: rgba(0, 136, 255, 0.15); 
          color: #FFFFFF;
          border-color: var(--spidey-cyan);
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(0, 240, 255, 0.3);
        }

        /* Stats Bar - Full Width Spider Web Accent */
        .stats-bar {
          width: 100%;
          display: flex;
          justify-content: center;
          background: linear-gradient(90deg, rgba(8, 9, 13, 0.98), rgba(18, 21, 30, 0.95), rgba(8, 9, 13, 0.98));
          border-top: 2px solid var(--spidey-red);
          border-bottom: 2px solid var(--spidey-blue);
          padding: 3.5rem 0;
          position: relative;
          z-index: 10;
          box-shadow: inset 0 0 30px rgba(0,0,0,0.8);
        }

        .stats-container {
          width: 100%;
          max-width: 1200px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 2.5rem;
          text-align: center;
          padding: 0 1.5rem;
        }

        .stat-number { 
          font-size: 2.8rem; 
          font-weight: 900; 
          margin-bottom: 0.25rem; 
          color: #FFFFFF; 
          font-family: 'Bebas Neue', monospace;
          letter-spacing: 2px;
          text-shadow: 0 0 15px var(--spidey-red);
        }
        .stat-label { 
          font-size: 0.8rem; 
          color: var(--spidey-cyan); 
          text-transform: uppercase; 
          letter-spacing: 2px; 
          font-weight: 800;
          font-family: 'Space Mono', monospace;
        }

        .section-title { 
          font-size: clamp(2.2rem, 5vw, 3.2rem); 
          font-weight: 900; 
          font-family: 'Bebas Neue', sans-serif;
          letter-spacing: 3px;
          text-align: center; 
          margin-bottom: 3.5rem; 
          align-self: center; 
          color: #FFFFFF; 
          text-shadow: 2px 2px 0px var(--spidey-blue), 0 0 15px rgba(0, 136, 255, 0.4);
        }

        /* Grid Layouts */
        .grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; width: 100%; }

        /* Cards */
        .card {
          background-color: var(--bg-card);
          border: 1.5px solid var(--border);
          border-radius: 1rem;
          padding: 2.25rem;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
        }
        .card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, var(--spidey-red), var(--spidey-blue));
          opacity: 0.6;
          transition: opacity 0.3s;
        }
        .card:hover { 
          transform: translateY(-6px); 
          border-color: var(--spidey-cyan); 
          background-color: var(--bg-card-hover);
          box-shadow: 0 12px 30px rgba(0, 240, 255, 0.15), 0 0 15px rgba(255, 30, 39, 0.1);
        }
        .card:hover::before { opacity: 1; }

        .card-icon {
          width: 3.5rem; 
          height: 3.5rem;
          border-radius: 0.75rem;
          display: flex; 
          align-items: center; 
          justify-content: center;
          margin-bottom: 1.5rem; 
          box-shadow: 0 0 15px rgba(0,0,0,0.5);
        }
        .card h3 { 
          font-size: 1.35rem; 
          margin-bottom: 1rem; 
          color: #FFFFFF; 
          font-weight: 800; 
          font-family: 'Space Mono', monospace;
        }
        .card ul { list-style: none; color: var(--text-muted); }
        .card li { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.85rem; font-size: 0.95rem; }
        
        .dot-spidey { 
          width: 8px; 
          height: 8px; 
          border-radius: 50%; 
          flex-shrink: 0; 
          box-shadow: 0 0 8px currentColor;
        }

        /* Timeline Web String */
        .timeline-item { 
          border-left: 3px stroke; 
          border-left: 2px solid var(--spidey-red); 
          padding-left: 2rem; 
          position: relative; 
          margin-bottom: 3.5rem; 
        }
        .timeline-item:last-child { margin-bottom: 0; }

        .timeline-dot { 
          width: 1.25rem; 
          height: 1.25rem; 
          background: var(--spidey-red); 
          border-radius: 50%; 
          position: absolute; 
          left: -11px; 
          top: 2px; 
          border: 3px solid var(--bg-dark); 
          box-shadow: 0 0 12px var(--spidey-red);
        }

        .timeline-header { display: flex; justify-content: space-between; flex-wrap: wrap; margin-bottom: 0.5rem; gap: 0.5rem; }
        .timeline-header h3 { font-size: 1.45rem; color: #FFFFFF; font-weight: 800; font-family: 'Space Mono', monospace; }
        .timeline-date { color: var(--spidey-cyan); display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; font-weight: 700; font-family: 'Space Mono', monospace; }
        .timeline-company { font-size: 1.15rem; color: var(--spidey-gold); margin-bottom: 1.25rem; font-weight: 700; }
        
        .timeline-list { list-style: none; }
        .timeline-list li { margin-bottom: 0.75rem; display: flex; gap: 0.75rem; color: var(--text-muted); font-size: 0.95rem; line-height: 1.5; }

        /* Tech Chips */
        .tech-row { display: flex; flex-wrap: wrap; justify-content: center; gap: 0.85rem; margin-bottom: 1.25rem; }
        .tech-chip { 
          padding: 0.75rem 1.6rem; 
          background-color: var(--bg-card); 
          border: 1.5px solid var(--border-blue); 
          border-radius: 2rem; 
          color: var(--text-muted); 
          font-size: 0.9rem; 
          font-weight: 700;
          font-family: 'Space Mono', monospace;
          transition: all 0.25s ease; 
        }
        .tech-chip:hover { 
          border-color: var(--spidey-red); 
          color: #FFFFFF; 
          background-color: rgba(255, 30, 39, 0.15);
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 6px 18px rgba(255, 30, 39, 0.3);
        }

        /* Footer & Spider Card */
        footer { 
          width: 100%; 
          padding: 5rem 1.5rem 3rem; 
          background-color: #050608; 
          border-top: 2px solid var(--spidey-red);
          color: var(--text-muted); 
          font-size: 0.9rem; 
        }

        .footer-card {
          max-width: 900px;
          margin: 0 auto 4rem;
          background-color: var(--bg-card);
          border: 2px solid var(--border);
          border-radius: 1.5rem;
          padding: 3.5rem 2rem;
          text-align: center;
          position: relative;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 30, 39, 0.15);
        }

        .footer-card h2 {
          font-size: 2.5rem;
          font-weight: 900;
          font-family: 'Bebas Neue', sans-serif;
          letter-spacing: 2px;
          margin-bottom: 1rem;
          color: #FFFFFF;
          text-shadow: 0 0 10px rgba(255, 30, 39, 0.5);
        }

        .footer-card p {
          color: var(--text-muted);
          max-width: 620px;
          margin: 0 auto 2.5rem;
          font-size: 1.1rem;
          line-height: 1.6;
        }

        .footer-buttons {
          display: flex;
          gap: 1.2rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .footer-divider {
          text-align: center;
          border-top: 1px solid rgba(255,255,255,0.08);
          padding-top: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .footer-credit {
          color: #FFFFFF;
          font-weight: 800;
          font-size: 1.05rem;
          margin-bottom: 0.25rem;
          font-family: 'Space Mono', monospace;
        }

        .footer-subtitle {
          color: var(--spidey-cyan);
          font-size: 0.85rem;
          font-family: 'Space Mono', monospace;
        }

        /* Modal Overlay */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(4, 5, 8, 0.92);
          backdrop-filter: blur(12px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .modal-content {
          position: relative;
          max-width: 800px;
          width: 100%;
          background: var(--bg-card);
          border: 2px solid var(--spidey-red);
          border-radius: 1.25rem;
          padding: 1.75rem;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.95), 0 0 30px rgba(255, 30, 39, 0.3);
        }

        .modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(255, 30, 39, 0.2);
          border: 1px solid var(--spidey-red);
          color: #FFFFFF;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .modal-close:hover { 
          background: var(--spidey-red); 
          transform: rotate(90deg);
        }

        .modal-image {
          width: 100%;
          height: auto;
          border-radius: 0.75rem;
          display: block;
        }

        :focus {
          outline: 3px solid var(--focus);
          outline-offset: 2px;
        }

        @media (max-width: 768px) {
          .hero h1 { font-size: 2.8rem; }
          .nav-links { display: none; }
          .timeline-header { flex-direction: column; gap: 0.5rem; }
          .footer-card { padding: 2.5rem 1.5rem; }
        }
      `}</style>

      {}
      <nav className={isScrolled ? 'scrolled' : ''}>
        <div className="nav-content">
          <div className="nav-logo" onClick={() => scrollToSection('home')}>
            <Activity size={26} color="var(--spidey-red)" />
            <span>SPIDEY<span>DBA</span></span>
          </div>
          <div className="nav-links">
            <button onClick={() => scrollToSection('home')} className={`nav-btn ${activeSection === 'home' ? 'active' : ''}`}>HOME</button>
            <button onClick={() => scrollToSection('expertise')} className={`nav-btn ${activeSection === 'expertise' ? 'active' : ''}`}>EXPERTISE</button>
            <button onClick={() => scrollToSection('experience')} className={`nav-btn ${activeSection === 'experience' ? 'active' : ''}`}>EXPERIENCE</button>
            <button onClick={() => scrollToSection('education')} className={`nav-btn ${activeSection === 'education' ? 'active' : ''}`}>EDUCATION</button>
            <button onClick={() => scrollToSection('connect')} className={`nav-btn ${activeSection === 'connect' ? 'active' : ''}`}>CONNECT</button>
          </div>
        </div>
      </nav>

      {}
      <section id="home" className="hero">
        <div className="hero-content">
          <div className="badge-spidey">
            <Sparkles size={16} color="var(--spidey-cyan)" />
            <span>SPIDER-SENSE ACTIVE • CERTIFIED DBA & DATA ARCHITECT</span>
          </div>

          <h1>VASSILEIOS GOUSETIS</h1>
          <h2>Your Friendly Neighborhood Database Architect</h2>
          <p>
            Weaving enterprise-grade database networks with 4+ years architecting high-performance, resilient database infrastructure across SQL Server, Oracle, and Cloud platforms. Specialized in query tuning, automation, and migrations.
          </p>

          <div className="btn-group">
            <button onClick={() => scrollToSection('experience')} className="btn btn-primary">
              <ArrowRight size={18} /> Explore Web of Work
            </button>
            <button onClick={() => scrollToSection('connect')} className="btn btn-secondary">
              <Mail size={18} /> Web-Sling an Email
            </button>
          </div>

          {}
          <div style={{ marginTop: '4rem', width: '100%', maxWidth: '620px', margin: '4rem auto 0' }}>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
              <button 
                onClick={prevCert} 
                aria-label="Previous certification"
                style={{ 
                  background: 'var(--bg-card)', 
                  border: '1.5px solid var(--spidey-blue)', 
                  color: 'var(--spidey-cyan)', 
                  cursor: 'pointer', 
                  borderRadius: '10px',
                  width: '44px',
                  height: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s',
                  boxShadow: '0 0 10px rgba(0, 136, 255, 0.3)'
                }}>
                <ChevronLeft size={22} />
              </button>

              <div 
                style={{ flex: 1, cursor: 'pointer', overflow: 'hidden', borderRadius: '16px', border: '2px solid var(--spidey-red)', background: 'var(--bg-card)', boxShadow: '0 0 25px rgba(255, 30, 39, 0.25)' }} 
                onClick={() => setIsModalOpen(true)}>
                <img 
                  src={imageErrors[certificationsList[currentCert].id] ? certificationsList[currentCert].fallback : certificationsList[currentCert].src} 
                  onError={() => handleImageError(certificationsList[currentCert].id)}
                  alt={certificationsList[currentCert].alt} 
                  style={{ width: '100%', height: 'auto', maxHeight: '280px', objectFit: 'contain', display: 'block' }} 
                />
              </div>

              <button 
                onClick={nextCert} 
                aria-label="Next certification"
                style={{ 
                  background: 'var(--bg-card)', 
                  border: '1.5px solid var(--spidey-blue)', 
                  color: 'var(--spidey-cyan)', 
                  cursor: 'pointer', 
                  borderRadius: '10px',
                  width: '44px',
                  height: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s',
                  boxShadow: '0 0 10px rgba(0, 136, 255, 0.3)'
                }}>
                <ChevronRight size={22} />
              </button>
            </div>

            <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'center', marginTop: '1.5rem' }}>
              {certificationsList.map((_, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setCurrentCert(idx)} 
                  style={{ 
                    width: idx === currentCert ? '28px' : '10px', 
                    height: '10px', 
                    borderRadius: '5px', 
                    background: idx === currentCert ? 'var(--spidey-red)' : 'rgba(255,255,255,0.2)',
                    cursor: 'pointer',
                    boxShadow: idx === currentCert ? '0 0 8px var(--spidey-red)' : 'none',
                    transition: 'all 0.3s ease'
                  }}>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {}
      <div className="stats-bar">
        <div className="stats-container">
          <div>
            <div className="stat-number">650+</div>
            <div className="stat-label">Databases Weaved</div>
          </div>
          <div>
            <div className="stat-number">40TB+</div>
            <div className="stat-label">Data Protected</div>
          </div>
          <div>
            <div className="stat-number">4+</div>
            <div className="stat-label">Years in Action</div>
          </div>
          <div>
            <div className="stat-number">99.9%</div>
            <div className="stat-label">Uptime Sense</div>
          </div>
        </div>
      </div>

      {}
      <section id="expertise">
        <h2 className="section-title">Technical Powers & Expertise</h2>
        <div className="grid-3">
          {expertiseList.map((exp, idx) => {
            const Icon = exp.icon;
            return (
              <div key={idx} className="card">
                <div className="card-icon" style={{ background: exp.bgColor, color: exp.color, border: `1px solid ${exp.color}` }}>
                  <Icon size={28} />
                </div>
                <h3>{exp.title}</h3>
                <ul>
                  {exp.skills.map((skill, i) => (
                    <li key={i}>
                      <span className="dot-spidey" style={{ background: exp.color, color: exp.color }}></span>
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
        <h2 className="section-title">Heroic Timeline & Operations</h2>
        <div>
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-header">
              <h3>Database Administrator</h3>
              <span className="timeline-date"><Clock size={15} /> Aug 2025 - Present</span>
            </div>
            <div className="timeline-company">Athens Exchange Group (ATHEX)</div>
            <ul className="timeline-list">
              <li><span style={{ color: 'var(--spidey-cyan)' }}>🕷️</span> Managing Google Cloud SQL & enterprise infrastructure technologies</li>
              <li><span style={{ color: 'var(--spidey-cyan)' }}>🕷️</span> Oracle, SQL Server, and PostgreSQL installation, patching, and automated backup strategies</li>
              <li><span style={{ color: 'var(--spidey-cyan)' }}>🕷️</span> Complex database migrations and disaster recovery execution across hybrid cloud environments</li>
              <li><span style={{ color: 'var(--spidey-cyan)' }}>🕷️</span> Proactive performance monitoring, wait statistics analysis, and query optimization</li>
            </ul>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot" style={{ background: 'var(--spidey-blue)', boxShadow: '0 0 12px var(--spidey-blue)' }}></div>
            <div className="timeline-header">
              <h3>Researcher & Informatics Specialist</h3>
              <span className="timeline-date"><Clock size={15} /> Sep 2024 - June 2025</span>
            </div>
            <div className="timeline-company">Hellenic Military Units Administration</div>
            <ul className="timeline-list">
              <li><span style={{ color: 'var(--spidey-red)' }}>🕷️</span> Technical support and maintenance for mission-critical military informatics systems</li>
              <li><span style={{ color: 'var(--spidey-red)' }}>🕷️</span> Secure application development utilizing SQL and Python pipelines</li>
              <li><span style={{ color: 'var(--spidey-red)' }}>🕷️</span> Large-scale confidential file system management and data integrity enforcement</li>
            </ul>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot" style={{ background: 'var(--spidey-cyan)', boxShadow: '0 0 12px var(--spidey-cyan)' }}></div>
            <div className="timeline-header">
              <h3>Data Engineer</h3>
              <span className="timeline-date"><Clock size={15} /> Nov 2023 - May 2024</span>
            </div>
            <div className="timeline-company">Ernst & Young (EY)</div>
            <ul className="timeline-list">
              <li><span style={{ color: 'var(--spidey-gold)' }}>🕷️</span> Robust ETL pipeline development using Python, SQL, and SSIS</li>
              <li><span style={{ color: 'var(--spidey-gold)' }}>🕷️</span> Credit risk data analysis, transformation, and automated reporting integration</li>
              <li><span style={{ color: 'var(--spidey-gold)' }}>🕷️</span> Common Data Model (CDM) configuration and optimization</li>
            </ul>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-header">
              <h3>Database Administrator</h3>
              <span className="timeline-date"><Clock size={15} /> July 2022 - Nov 2023</span>
            </div>
            <div className="timeline-company">Netcompany - Instasoft</div>
            <ul className="timeline-list">
              <li><span style={{ color: 'var(--spidey-cyan)' }}>🕷️</span> Comprehensive database administration, maintenance, and high availability setup</li>
              <li><span style={{ color: 'var(--spidey-cyan)' }}>🕷️</span> Deep-dive query optimization, index tuning, and deadlock resolution</li>
              <li><span style={{ color: 'var(--spidey-cyan)' }}>🕷️</span> Table partitioning, archiving strategies, and high-volume backup/restore procedures</li>
            </ul>
          </div>
        </div>
      </section>

      {}
      <section id="education">
        <div style={{ background: 'var(--bg-card)', borderRadius: '1.5rem', border: '2px solid var(--border)', padding: '3.5rem 2rem', boxShadow: '0 15px 35px rgba(0,0,0,0.8)' }}>
          <div className="grid-3">
            <div>
              <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#fff', fontSize: '1.3rem', fontWeight: '800', fontFamily: 'Space Mono' }}>
                <GraduationCap color="var(--spidey-cyan)" size={24} /> Education
              </h3>
              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.35rem', color: '#fff', fontWeight: '800' }}>Master of Data Analytics</h4>
                <div style={{ color: 'var(--spidey-cyan)', fontSize: '0.85rem', marginBottom: '0.25rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px', fontFamily: 'Space Mono' }}>2023 - 2025</div>
                <div style={{ color: 'var(--text-muted)' }}>University of Bolton</div>
                <div style={{ color: 'var(--spidey-gold)', fontWeight: '800', marginTop: '0.35rem', fontSize: '0.9rem' }}>Grade: First-Class Honours (1:1)</div>
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.35rem', color: '#fff', fontWeight: '800' }}>Bachelor of Data Analytics</h4>
                <div style={{ color: 'var(--spidey-cyan)', fontSize: '0.85rem', marginBottom: '0.25rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px', fontFamily: 'Space Mono' }}>2020 - 2023</div>
                <div style={{ color: 'var(--text-muted)' }}>University of Bolton</div>
                <div style={{ color: 'var(--spidey-gold)', fontWeight: '800', marginTop: '0.35rem', fontSize: '0.9rem' }}>Grade: First-Class Honours (1:1)</div>
              </div>
            </div>

            <div>
              <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#fff', fontSize: '1.3rem', fontWeight: '800', fontFamily: 'Space Mono' }}>
                <Award color="var(--spidey-red)" size={24} /> Spidey Badges
              </h3>
              <div style={{ display: 'flex', gap: '0.85rem', marginBottom: '1.25rem' }}>
                <Award color="var(--spidey-red)" size={22} style={{ flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: '800', color: '#fff' }}>Azure Database Administrator</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Microsoft Certified Associate</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.85rem', marginBottom: '1.25rem' }}>
                <Award color="var(--spidey-blue)" size={22} style={{ flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: '800', color: '#fff' }}>Azure Data Fundamentals</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Microsoft Certified</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.85rem' }}>
                <Award color="var(--spidey-gold)" size={22} style={{ flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: '800', color: '#fff' }}>Oracle Associate DBA & Autonomous DB</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Oracle Certified Professional</div>
                </div>
              </div>
            </div>

            <div>
              <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#fff', fontSize: '1.3rem', fontWeight: '800', fontFamily: 'Space Mono' }}>
                <Zap color="var(--spidey-gold)" size={24} /> Honors & Awards
              </h3>
              <div style={{ display: 'flex', gap: '0.85rem', marginBottom: '1.25rem' }}>
                <Zap color="var(--spidey-gold)" size={22} style={{ flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: '800', color: '#fff' }}>Distinguished IT Student Award</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>2025 & 2023 - British Computer Society (BCS)</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.85rem' }}>
                <Zap color="var(--spidey-cyan)" size={22} style={{ flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: '800', color: '#fff' }}>Ministry of Digital Governance</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Special Recognition Award Recipient</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {}
      <section style={{ textAlign: 'center' }}>
        <h3 style={{ color: 'var(--spidey-cyan)', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '2.5rem', fontSize: '0.9rem', fontWeight: '800', fontFamily: 'Space Mono' }}>
          Database Tech Arsenal & Web Ecosystem
        </h3>
        <div className="tech-row">
          {['SQL Server 2016-2025', 'Oracle 12c-26ai', 'PostgreSQL', 'MySQL', 'MariaDB'].map(t => (
            <span key={t} className="tech-chip">{t}</span>
          ))}
        </div>
        <div className="tech-row">
          {['Azure SQL Database', 'Google Cloud SQL', 'Ansible', 'Terraform', 'PowerShell'].map(t => (
            <span key={t} className="tech-chip">{t}</span>
          ))}
        </div>
        <div className="tech-row">
          {['Grafana', 'SolarWinds', 'OEM 13c', 'Python', 'SSIS', 'High Availability / DR'].map(t => (
            <span key={t} className="tech-chip">{t}</span>
          ))}
        </div>
      </section>

      {}
      <footer id="connect">
        <div className="footer-card">
          <h2>Let's Web Together</h2>
          <p>Interested in enterprise database administration, high-availability architecture, or cloud migrations? Let's connect and discuss how I can help optimize your data infrastructure.</p>
          
          <div className="footer-buttons">
            <a href="mailto:vasilhsgxr5000@gmail.com" className="btn btn-primary">
              <Mail size={18} />
              Send Email
            </a>
            <button onClick={handleCopyEmail} className="btn btn-secondary">
              {copied ? (
                <>
                  <Check size={18} style={{ color: 'var(--spidey-cyan)' }} />
                  Copied Email!
                </>
              ) : (
                <>
                  <Copy size={18} />
                  Copy Email
                </>
              )}
            </button>
            <a 
              href="https://www.linkedin.com/in/vasileiosgoysetis-7378101b9" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-secondary"
            >
              <Linkedin size={18} />
              LinkedIn Profile
            </a>
          </div>
        </div>

        <div className="footer-divider">
          <p className="footer-credit">© {new Date().getFullYear()} Vassileios Gousetis</p>
          <p className="footer-subtitle">Your Friendly Neighborhood Database Architect</p>
        </div>
      </footer>

      {/* Modal View for Certificates */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button onClick={() => setIsModalOpen(false)} className="modal-close" aria-label="Close modal">
              <X size={22} />
            </button>
            <img 
              src={imageErrors[certificationsList[currentCert].id] ? certificationsList[currentCert].fallback : certificationsList[currentCert].src} 
              onError={() => handleImageError(certificationsList[currentCert].id)}
              alt={certificationsList[currentCert].alt} 
              className="modal-image" 
            />
            <div style={{ marginTop: '1.25rem', textAlign: 'center' }}>
              <p style={{ color: '#ffffff', fontWeight: '800', fontSize: '1.15rem', fontFamily: 'Space Mono' }}>{certificationsList[currentCert].alt}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
