import React, { useState, useEffect, useRef } from 'react';
import { 
  Database, Mail, Linkedin, Clock, Award, GraduationCap, 
  ChevronLeft, ChevronRight, X, Copy, Check, Sparkles, Zap, 
  TrendingUp, ArrowRight, Shield, ExternalLink, Activity,
  Compass, Anchor, Crown, Cpu, Layers, Globe
} from 'lucide-react';

// Generates Spider-Man & Spider-Verse themed SVG badges for certifications
const createSpiderCertBadge = (title, issuer, color, code) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="380" viewBox="0 0 600 380">
    <rect width="600" height="380" rx="16" fill="#090B12" stroke="${color}" stroke-width="2.5"/>
    
    <!-- Spider Web Background Pattern -->
    <path d="M 0 0 L 600 380 M 600 0 L 0 380 M 300 0 L 300 380 M 0 190 L 600 190" stroke="rgba(255,255,255,0.06)" stroke-width="1.5"/>
    <polygon points="300,110 370,190 300,270 230,190" fill="none" stroke="rgba(255,30,39,0.2)" stroke-width="2"/>
    <polygon points="300,70 410,190 300,310 190,190" fill="none" stroke="rgba(0,136,255,0.18)" stroke-width="2"/>
    
    <!-- Corner Web Accents -->
    <path d="M 0 60 Q 60 60 60 0 M 0 110 Q 110 110 110 0 M 600 60 Q 540 60 540 0 M 600 110 Q 490 110 490 0" fill="none" stroke="${color}" opacity="0.6" stroke-width="2"/>

    <!-- Spider Emblem Center Icon -->
    <circle cx="300" cy="100" r="38" fill="#121624" stroke="${color}" stroke-width="2"/>
    <path d="M 300 80 Q 295 95 300 115 Q 305 95 300 80 Z" fill="${color}"/>
    <path d="M 300 90 L 275 75 M 300 95 L 270 95 M 300 100 L 272 115 M 300 105 L 280 128" stroke="${color}" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M 300 90 L 325 75 M 300 95 L 330 95 M 300 100 L 328 115 M 300 105 L 320 128" stroke="${color}" stroke-width="2.5" stroke-linecap="round"/>

    <!-- Title & Inscriptions -->
    <text x="300" y="185" font-family="'Bebas Neue', Impact, sans-serif" font-size="26" font-weight="900" fill="#FFFFFF" text-anchor="middle" letter-spacing="2">${title}</text>
    <text x="300" y="215" font-family="system-ui, sans-serif" font-size="14" font-weight="600" fill="#A0AAB8" text-anchor="middle">${issuer}</text>
    <text x="300" y="248" font-family="monospace" font-size="13" font-weight="bold" fill="${color}" text-anchor="middle" letter-spacing="2">SPIDER-SENSE VERIFIED • ${code}</text>
    
    <!-- Tech Badge Footer -->
    <rect x="180" y="280" width="240" height="34" rx="17" fill="${color}" fill-opacity="0.15" stroke="${color}" stroke-width="1.5"/>
    <text x="300" y="302" font-family="monospace" font-size="12" font-weight="900" fill="#FFFFFF" text-anchor="middle" letter-spacing="2">CLASSIFIED CLEARANCE</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const certificationsList = [
  { 
    id: 1, 
    src: "/cert-azure-dba.png", 
    fallback: createSpiderCertBadge("Azure Database Administrator", "Microsoft Certified Associate", "#FF1E27", "DP-300"),
    alt: "Microsoft Certified: Azure Database Administrator Associate" 
  },
  { 
    id: 2, 
    src: "/cert-azure-data.png", 
    fallback: createSpiderCertBadge("Azure Data Fundamentals", "Microsoft Certified", "#0088FF", "DP-900"),
    alt: "Microsoft Certified: Azure Data Fundamentals" 
  },
  { 
    id: 3, 
    src: "/cert-oracle-associate.png", 
    fallback: createSpiderCertBadge("Oracle Certified Associate", "Oracle Database Administrator", "#FFE600", "1Z0-082"),
    alt: "Oracle Certified Associate" 
  },
  { 
    id: 4, 
    src: "/cert-oracle-ADB.png", 
    fallback: createSpiderCertBadge("Oracle Autonomous Database", "Oracle Cloud Specialist", "#00F0FF", "1Z0-931"),
    alt: "Oracle Certified Autonomous DB" 
  }
];

const expertiseList = [
  {
    title: "Database Core Architecture",
    icon: Database,
    color: '#FF1E27',
    bgColor: "rgba(255, 30, 39, 0.12)",
    skills: ["SQL Server 2016-2025", "Oracle 12c-26ai", "PostgreSQL", "MySQL", "High Availability HADR"]
  },
  {
    title: "Performance & Query Tuning",
    icon: TrendingUp,
    color: '#0088FF',
    bgColor: "rgba(0, 136, 255, 0.12)",
    skills: ["Query Optimization", "Index Web Tuning", "Wait Stats Analysis", "Deadlock Resolution", "Partitioning & Sharding"]
  },
  {
    title: "Cloud & Web Automation",
    icon: Cpu,
    color: '#00F0FF',
    bgColor: "rgba(0, 240, 255, 0.12)",
    skills: ["Azure Database Services", "Google Cloud SQL", "Ansible Automation", "Terraform Infra", "PowerShell Scripting"]
  }
];

const WebCanvasBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes for web strands
    const particleCount = Math.floor(Math.min(width, height) / 18);
    const particles = [];
    const mouse = { x: null, y: null, radius: 180 };

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2 + 1,
        color: Math.random() > 0.4 ? 'rgba(255, 30, 39, 0.7)' : 'rgba(0, 136, 255, 0.7)'
      });
    }

    // Interactive Web Bursts on Click
    const webBursts = [];

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleClick = (e) => {
      webBursts.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        maxRadius: Math.random() * 120 + 100,
        alpha: 1
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleClick);

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Update and draw Web Bursts
      for (let i = webBursts.length - 1; i >= 0; i--) {
        const b = webBursts[i];
        b.radius += 3.5;
        b.alpha -= 0.02;

        if (b.alpha <= 0) {
          webBursts.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 30, 39, ${b.alpha})`;
        ctx.lineWidth = 1.5;
        
        // Concentric Spider Web Polygon Ring
        const spokes = 8;
        for (let s = 0; s < spokes; s++) {
          const angle = (s * Math.PI * 2) / spokes;
          const px = b.x + Math.cos(angle) * b.radius;
          const py = b.y + Math.sin(angle) * b.radius;

          // Radial spoke line from center
          ctx.moveTo(b.x, b.y);
          ctx.lineTo(px, py);

          // Web ring interconnect
          const nextAngle = ((s + 1) * Math.PI * 2) / spokes;
          const npx = b.x + Math.cos(nextAngle) * b.radius;
          const npy = b.y + Math.sin(nextAngle) * b.radius;
          ctx.moveTo(px, py);
          ctx.lineTo(npx, npy);
        }
        ctx.stroke();
        ctx.restore();
      }

      // Update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Connect particles with web lines if nearby
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const alpha = (1 - dist / 130) * 0.25;
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Web anchor line to mouse cursor
        if (mouse.x !== null && mouse.y !== null) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            const alpha = (1 - dist / mouse.radius) * 0.5;
            ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none'
      }} 
    />
  );
};

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
    }, 5500);
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
      {/* Interactive Web Canvas Background */}
      <WebCanvasBackground />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600;700;800;900&display=swap');

        /* Spider-Man Palette Tokens */
        :root {
          --bg-dark: #07080C;          /* Deep Suit Black */
          --bg-card: #0E121E;          /* Dark Web Card Surface */
          --bg-card-hover: #161C2E;    /* Spider Navy Elevated */
          --text-main: #FFFFFF;        /* Pure Web White */
          --text-muted: #94A3B8;       /* Slate Web Tint */
          --spidey-red: #FF1E27;       /* Iconic Crimson Red */
          --spidey-red-glow: rgba(255, 30, 39, 0.45);
          --spidey-blue: #0088FF;      /* Web-Slinger Blue */
          --spidey-cyan: #00F0FF;      /* Spider-Sense Electric Cyan */
          --spidey-yellow: #FFE600;    /* Caution Yellow Accent */
          --border-red: rgba(255, 30, 39, 0.35);
          --border-blue: rgba(0, 136, 255, 0.3);
          --focus: #00F0FF;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          background-color: var(--bg-dark);
          color: var(--text-main);
          line-height: 1.6;
          width: 100%;
          overflow-x: hidden;
        }

        html { scroll-behavior: smooth; }

        /* Outer Container */
        .app-container {
          width: 100%;
          min-height: 100vh;
          background-color: var(--bg-dark);
          background-image: 
            radial-gradient(circle at 15% 20%, rgba(255, 30, 39, 0.12) 0%, transparent 40%),
            radial-gradient(circle at 85% 70%, rgba(0, 136, 255, 0.12) 0%, transparent 45%),
            linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
          background-size: 100% 100%, 100% 100%, 40px 40px, 40px 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }

        /* Animated SVG Web Corners */
        .corner-web {
          position: fixed;
          width: 220px;
          height: 220px;
          pointer-events: none;
          z-index: 2;
          opacity: 0.25;
          animation: webGlowPulse 4s infinite alternate ease-in-out;
        }
        .corner-web-left { top: 0; left: 0; }
        .corner-web-right { top: 0; right: 0; transform: scaleX(-1); }

        @keyframes webGlowPulse {
          0% { opacity: 0.2; filter: drop-shadow(0 0 2px rgba(255, 30, 39, 0.3)); }
          100% { opacity: 0.45; filter: drop-shadow(0 0 12px rgba(0, 240, 255, 0.6)); }
        }

        /* Navbar */
        nav {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          padding: 1.25rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: rgba(7, 8, 12, 0.92);
          backdrop-filter: blur(14px);
          z-index: 1000;
          border-bottom: 2px solid var(--border-red);
          transition: all 0.3s ease;
        }

        nav.scrolled {
          padding: 0.9rem 2rem;
          background-color: rgba(4, 5, 8, 0.98);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.9), 0 0 20px var(--spidey-red-glow);
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
          font-size: 1.6rem; 
          font-weight: 900; 
          display: flex; 
          align-items: center; 
          gap: 0.65rem; 
          color: var(--spidey-red);
          font-family: 'Bebas Neue', Impact, sans-serif;
          letter-spacing: 2px;
          cursor: pointer;
          text-shadow: 0 0 12px var(--spidey-red-glow);
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
          letter-spacing: 2px;
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
          height: 2px;
          background: linear-gradient(90deg, var(--spidey-red), var(--spidey-blue));
          box-shadow: 0 0 10px var(--spidey-cyan);
          border-radius: 2px;
        }

        /* Sections */
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
          padding: 0.6rem 1.5rem;
          background-color: var(--bg-card);
          border: 1.5px solid var(--spidey-red);
          border-radius: 999px;
          color: var(--spidey-yellow);
          font-size: 0.825rem;
          font-weight: 800;
          margin-bottom: 1.85rem;
          font-family: 'Space Mono', monospace;
          box-shadow: 0 0 20px var(--spidey-red-glow);
          letter-spacing: 1.5px;
          animation: spiderSenseAlert 2s infinite ease-in-out;
        }

        @keyframes spiderSenseAlert {
          0%, 100% { border-color: var(--spidey-red); box-shadow: 0 0 15px var(--spidey-red-glow); }
          50% { border-color: var(--spidey-cyan); box-shadow: 0 0 25px rgba(0, 240, 255, 0.6); }
        }

        .hero h1 { 
          font-size: clamp(3rem, 9vw, 5.5rem); 
          font-weight: 900; 
          margin-bottom: 0.5rem; 
          line-height: 0.95; 
          letter-spacing: 3px;
          font-family: 'Bebas Neue', Impact, sans-serif;
          color: #FFFFFF;
          text-shadow: 0 0 30px var(--spidey-red-glow);
          background: linear-gradient(180deg, #FFFFFF 40%, #E2E8F0 70%, var(--spidey-red) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero h2 { 
          font-size: clamp(1.1rem, 2.8vw, 1.8rem); 
          color: var(--spidey-cyan); 
          margin-bottom: 1.5rem; 
          font-weight: 800;
          letter-spacing: 3px;
          text-transform: uppercase;
          font-family: 'Bebas Neue', Impact, sans-serif;
          text-shadow: 0 0 12px rgba(0, 240, 255, 0.5);
        }

        .hero p { 
          max-width: 760px; 
          font-size: 1.15rem; 
          color: var(--text-muted); 
          margin-bottom: 2.75rem; 
          line-height: 1.7; 
          margin-left: auto; 
          margin-right: auto; 
        }

        .btn-group { display: flex; gap: 1.25rem; flex-wrap: wrap; justify-content: center; }

        .btn {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.95rem 2.25rem;
          border-radius: 0.5rem;
          font-weight: 900;
          text-decoration: none;
          transition: all 0.28s ease;
          cursor: pointer;
          border: none;
          font-size: 0.95rem;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          font-family: 'Bebas Neue', Impact, sans-serif;
        }

        .btn-primary {
          background: linear-gradient(135deg, #FF333B, var(--spidey-red));
          color: #FFFFFF;
          box-shadow: 0 6px 20px var(--spidey-red-glow);
          border: 1px solid rgba(255, 255, 255, 0.4);
        }
        .btn-primary:hover { 
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 10px 30px rgba(255, 30, 39, 0.8), 0 0 20px rgba(0, 240, 255, 0.5);
          background: linear-gradient(135deg, var(--spidey-red), #D00008);
        }

        .btn-secondary {
          background-color: var(--bg-card);
          border: 1.5px solid var(--spidey-blue);
          color: var(--spidey-cyan);
          box-shadow: 0 4px 15px rgba(0, 136, 255, 0.2);
        }
        .btn-secondary:hover { 
          background-color: rgba(0, 136, 255, 0.18); 
          color: #FFFFFF;
          border-color: var(--spidey-cyan);
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(0, 240, 255, 0.4);
        }

        /* Stats Bar */
        .stats-bar {
          width: 100%;
          display: flex;
          justify-content: center;
          background: linear-gradient(90deg, rgba(7, 8, 12, 0.98), rgba(14, 18, 30, 0.95), rgba(7, 8, 12, 0.98));
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
          font-size: 3rem; 
          font-weight: 900; 
          margin-bottom: 0.25rem; 
          color: var(--spidey-red); 
          font-family: 'Bebas Neue', Impact, sans-serif;
          letter-spacing: 2px;
          text-shadow: 0 0 15px var(--spidey-red-glow);
        }
        .stat-label { 
          font-size: 0.825rem; 
          color: var(--spidey-cyan); 
          text-transform: uppercase; 
          letter-spacing: 2px; 
          font-weight: 700;
          font-family: 'Space Mono', monospace;
        }

        .section-title { 
          font-size: clamp(2.5rem, 6vw, 3.8rem); 
          font-weight: 900; 
          font-family: 'Bebas Neue', Impact, sans-serif;
          letter-spacing: 3px;
          text-align: center; 
          margin-bottom: 3.5rem; 
          align-self: center; 
          color: #FFFFFF; 
          text-shadow: 0 0 20px var(--spidey-red-glow);
        }

        /* Grid Layouts */
        .grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; width: 100%; }

        /* Cards */
        .card {
          background-color: var(--bg-card);
          border: 1.5px solid var(--border-red);
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
          background: linear-gradient(90deg, var(--spidey-red), var(--spidey-blue), var(--spidey-cyan));
          opacity: 0.7;
          transition: opacity 0.3s;
        }
        .card:hover { 
          transform: translateY(-6px); 
          border-color: var(--spidey-cyan); 
          background-color: var(--bg-card-hover);
          box-shadow: 0 12px 30px var(--spidey-red-glow), 0 0 20px rgba(0, 240, 255, 0.2);
        }

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
          font-size: 1.5rem; 
          margin-bottom: 1rem; 
          color: #FFFFFF; 
          font-weight: 900; 
          font-family: 'Bebas Neue', Impact, sans-serif;
          letter-spacing: 1px;
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

        /* Timeline Web Path */
        .timeline-item { 
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
          box-shadow: 0 0 12px var(--spidey-red-glow);
        }

        .timeline-header { display: flex; justify-content: space-between; flex-wrap: wrap; margin-bottom: 0.5rem; gap: 0.5rem; }
        .timeline-header h3 { font-size: 1.6rem; color: #FFFFFF; font-weight: 900; font-family: 'Bebas Neue', Impact, sans-serif; letter-spacing: 1px; }
        .timeline-date { color: var(--spidey-cyan); display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; font-weight: 700; font-family: 'Space Mono', monospace; }
        .timeline-company { font-size: 1.15rem; color: var(--spidey-yellow); margin-bottom: 1.25rem; font-weight: 700; font-family: 'Space Mono', monospace; }
        
        .timeline-list { list-style: none; }
        .timeline-list li { margin-bottom: 0.75rem; display: flex; gap: 0.75rem; color: var(--text-muted); font-size: 0.95rem; line-height: 1.55; }

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
          border-color: var(--spidey-cyan); 
          color: #FFFFFF; 
          background-color: rgba(0, 240, 255, 0.15);
          transform: translateY(-3px) scale(1.05);
          box-shadow: 0 6px 18px rgba(0, 240, 255, 0.4);
        }

        /* Footer */
        footer { 
          width: 100%; 
          padding: 5rem 1.5rem 3rem; 
          background-color: #040508; 
          border-top: 2px solid var(--spidey-red);
          color: var(--text-muted); 
          font-size: 0.9rem; 
        }

        .footer-card {
          max-width: 900px;
          margin: 0 auto 4rem;
          background-color: var(--bg-card);
          border: 2px solid var(--border-red);
          border-radius: 1.5rem;
          padding: 3.5rem 2rem;
          text-align: center;
          position: relative;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.8), 0 0 25px var(--spidey-red-glow);
        }

        .footer-card h2 {
          font-size: 3rem;
          font-weight: 900;
          font-family: 'Bebas Neue', Impact, sans-serif;
          letter-spacing: 2px;
          margin-bottom: 1rem;
          color: #FFFFFF;
          text-shadow: 0 0 15px var(--spidey-red-glow);
        }

        .footer-card p {
          color: var(--text-muted);
          max-width: 620px;
          margin: 0 auto 2.5rem;
          font-size: 1.1rem;
          line-height: 1.65;
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
          background: rgba(4, 5, 8, 0.94);
          backdrop-filter: blur(14px);
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
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.95), 0 0 30px var(--spidey-red-glow);
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
          color: #07080C;
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
          .hero h1 { font-size: 3.2rem; }
          .nav-links { display: none; }
          .timeline-header { flex-direction: column; gap: 0.5rem; }
          .footer-card { padding: 2.5rem 1.5rem; }
        }
      `}</style>

      {/* SVG Decorative Corner Spider Webs */}
      <svg className="corner-web corner-web-left" viewBox="0 0 100 100">
        <path d="M0,0 L100,0 M0,0 L0,100 M0,0 L100,100 M0,0 L50,100 M0,0 L100,50" stroke="#FF1E27" strokeWidth="1.5" fill="none"/>
        <path d="M20,0 Q20,20 0,20 M40,0 Q40,40 0,40 M60,0 Q60,60 0,60 M80,0 Q80,80 0,80" stroke="#00F0FF" strokeWidth="1.5" fill="none"/>
      </svg>

      <svg className="corner-web corner-web-right" viewBox="0 0 100 100">
        <path d="M0,0 L100,0 M0,0 L0,100 M0,0 L100,100 M0,0 L50,100 M0,0 L100,50" stroke="#FF1E27" strokeWidth="1.5" fill="none"/>
        <path d="M20,0 Q20,20 0,20 M40,0 Q40,40 0,40 M60,0 Q60,60 0,60 M80,0 Q80,80 0,80" stroke="#00F0FF" strokeWidth="1.5" fill="none"/>
      </svg>

      <nav className={isScrolled ? 'scrolled' : ''}>
        <div className="nav-content">
          <div className="nav-logo" onClick={() => scrollToSection('home')}>
            <Database size={28} color="var(--spidey-red)" />
            <span>SPIDEY<span>DBA</span></span>
          </div>
          <div className="nav-links">
            <button onClick={() => scrollToSection('home')} className={`nav-btn ${activeSection === 'home' ? 'active' : ''}`}>HOME</button>
            <button onClick={() => scrollToSection('expertise')} className={`nav-btn ${activeSection === 'expertise' ? 'active' : ''}`}>EXPERTISE</button>
            <button onClick={() => scrollToSection('experience')} className={`nav-btn ${activeSection === 'experience' ? 'active' : ''}`}>WEB OF WORK</button>
            <button onClick={() => scrollToSection('education')} className={`nav-btn ${activeSection === 'education' ? 'active' : ''}`}>ACADEMIES</button>
            <button onClick={() => scrollToSection('connect')} className={`nav-btn ${activeSection === 'connect' ? 'active' : ''}`}>CONNECT</button>
          </div>
        </div>
      </nav>

      <section id="home" className="hero">
        <div className="hero-content">
          <div className="badge-spidey">
            <Zap size={16} color="var(--spidey-yellow)" />
            <span>SPIDER-SENSE ACTIVE • DATABASE ARCHITECTURE SPECIALIST</span>
          </div>

          <h1>VASSILEIOS GOUSETIS</h1>
          <h2>Your Friendly Neighborhood Database Architect</h2>
          <p>
            Weaving indestructible database nets across high-stakes digital environments. 4+ years slinging enterprise database solutions across SQL Server, Oracle, and Cloud domains. Specialized in Query tuning, Automation, and Monitoring - Alerting.
          </p>

          <div className="btn-group">
            <button onClick={() => scrollToSection('experience')} className="btn btn-primary">
              <Zap size={18} /> Swing into Experience
            </button>
            <button onClick={() => scrollToSection('connect')} className="btn btn-secondary">
              <Mail size={18} /> Send Web Signal
            </button>
          </div>

          {/* Certification Scroll Carousel */}
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
                  boxShadow: '0 0 10px rgba(0, 136, 255, 0.4)'
                }}>
                <ChevronLeft size={22} />
              </button>

              <div 
                style={{ flex: 1, cursor: 'pointer', overflow: 'hidden', borderRadius: '16px', border: '2px solid var(--spidey-red)', background: 'var(--bg-card)', boxShadow: '0 0 25px var(--spidey-red-glow)' }} 
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
                  boxShadow: '0 0 10px rgba(0, 136, 255, 0.4)'
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

      <div className="stats-bar">
        <div className="stats-container">
          <div>
            <div className="stat-number">650+</div>
            <div className="stat-label">Web Nets Maintained</div>
          </div>
          <div>
            <div className="stat-number">40TB+</div>
            <div className="stat-label">Data Vaults Protected</div>
          </div>
          <div>
            <div className="stat-number">4+</div>
            <div className="stat-label">Years Heroic Service</div>
          </div>
          <div>
            <div className="stat-number">99.9%</div>
            <div className="stat-label">System Uptime Sense</div>
          </div>
        </div>
      </div>

      <section id="expertise">
        <h2 className="section-title">Spider Toolkit & Superpowers</h2>
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

      <section id="experience">
        <h2 className="section-title">Web of Experience & Operations</h2>
        <div>
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-header">
              <h3>Database Administrator</h3>
              <span className="timeline-date"><Clock size={15} /> Aug 2025 - Present</span>
            </div>
            <div className="timeline-company">Athens Exchange Group (ATHEX)</div>
            <ul className="timeline-list">
              <li><span style={{ color: 'var(--spidey-red)' }}>🕷️</span> Managing Google Cloud SQL & enterprise infrastructure technologies</li>
              <li><span style={{ color: 'var(--spidey-red)' }}>🕷️</span> Oracle, SQL Server, and PostgreSQL installation, patching, and automated backup strategies</li>
              <li><span style={{ color: 'var(--spidey-red)' }}>🕷️</span> Complex database migrations and disaster recovery execution across hybrid cloud environments</li>
              <li><span style={{ color: 'var(--spidey-red)' }}>🕷️</span> Proactive performance monitoring, wait statistics analysis, and query optimization</li>
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
              <li><span style={{ color: 'var(--spidey-cyan)' }}>🕷️</span> Technical support and maintenance for mission-critical military informatics systems</li>
              <li><span style={{ color: 'var(--spidey-cyan)' }}>🕷️</span> Secure application development utilizing SQL and Python pipelines</li>
              <li><span style={{ color: 'var(--spidey-cyan)' }}>🕷️</span> Large-scale confidential file system management and data integrity enforcement</li>
            </ul>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot" style={{ background: 'var(--spidey-yellow)', boxShadow: '0 0 12px var(--spidey-yellow)' }}></div>
            <div className="timeline-header">
              <h3>Data Engineer</h3>
              <span className="timeline-date"><Clock size={15} /> Nov 2023 - May 2024</span>
            </div>
            <div className="timeline-company">Ernst & Young (EY)</div>
            <ul className="timeline-list">
              <li><span style={{ color: 'var(--spidey-yellow)' }}>🕷️</span> Robust ETL pipeline development using Python, SQL, and SSIS</li>
              <li><span style={{ color: 'var(--spidey-yellow)' }}>🕷️</span> Credit risk data analysis, transformation, and automated reporting integration</li>
              <li><span style={{ color: 'var(--spidey-yellow)' }}>🕷️</span> Common Data Model (CDM) configuration and optimization</li>
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
              <li><span style={{ color: 'var(--spidey-red)' }}>🕷️</span> Comprehensive database administration, maintenance, and high availability setup</li>
              <li><span style={{ color: 'var(--spidey-red)' }}>🕷️</span> Deep-dive query optimization, index tuning, and deadlock resolution</li>
              <li><span style={{ color: 'var(--spidey-red)' }}>🕷️</span> Table partitioning, archiving strategies, and high-volume backup/restore procedures</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="education">
        <div style={{ background: 'var(--bg-card)', borderRadius: '1.5rem', border: '2px solid var(--border-red)', padding: '3.5rem 2rem', boxShadow: '0 15px 35px rgba(0,0,0,0.8)' }}>
          <div className="grid-3">
            <div>
              <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#fff', fontSize: '1.5rem', fontWeight: '900', fontFamily: 'Bebas Neue' }}>
                <GraduationCap color="var(--spidey-cyan)" size={24} /> Academies
              </h3>
              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.35rem', color: '#fff', fontWeight: '800' }}>Master of Data Analytics</h4>
                <div style={{ color: 'var(--spidey-cyan)', fontSize: '0.85rem', marginBottom: '0.25rem', fontWeight: '800', textTransform: 'uppercase', fontFamily: 'Space Mono' }}>2023 - 2025</div>
                <div style={{ color: 'var(--text-muted)' }}>University of Bolton</div>
                <div style={{ color: 'var(--spidey-red)', fontWeight: '800', marginTop: '0.35rem', fontSize: '0.9rem' }}>Grade: First-Class Honours (1:1)</div>
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.35rem', color: '#fff', fontWeight: '800' }}>Bachelor of Data Analytics</h4>
                <div style={{ color: 'var(--spidey-cyan)', fontSize: '0.85rem', marginBottom: '0.25rem', fontWeight: '800', textTransform: 'uppercase', fontFamily: 'Space Mono' }}>2020 - 2023</div>
                <div style={{ color: 'var(--text-muted)' }}>University of Bolton</div>
                <div style={{ color: 'var(--spidey-red)', fontWeight: '800', marginTop: '0.35rem', fontSize: '0.9rem' }}>Grade: First-Class Honours (1:1)</div>
              </div>
            </div>

            <div>
              <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#fff', fontSize: '1.5rem', fontWeight: '900', fontFamily: 'Bebas Neue' }}>
                <Award color="var(--spidey-yellow)" size={24} /> Certifications
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
                <Award color="var(--spidey-yellow)" size={22} style={{ flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: '800', color: '#fff' }}>Oracle Associate DBA & Autonomous DB</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Oracle Certified Professional</div>
                </div>
              </div>
            </div>

            <div>
              <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#fff', fontSize: '1.5rem', fontWeight: '900', fontFamily: 'Bebas Neue' }}>
                <Zap color="var(--spidey-red)" size={24} /> Honors & Awards
              </h3>
              <div style={{ display: 'flex', gap: '0.85rem', marginBottom: '1.25rem' }}>
                <Zap color="var(--spidey-red)" size={22} style={{ flexShrink: 0 }} />
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

      <section style={{ textAlign: 'center' }}>
        <h3 style={{ color: 'var(--spidey-cyan)', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '2.5rem', fontSize: '0.9rem', fontWeight: '800', fontFamily: 'Space Mono' }}>
          Spider Technology Stack & Arsenal
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

      <footer id="connect">
        <div className="footer-card">
          <h2>"WITH GREAT DATA COMES GREAT RESPONSIBILITY"</h2>
          <p>Seeking expertise in enterprise database administration, high-availability architecture, or cloud migrations? Let's connect and build an indestructible data web.</p>
          
          <div className="footer-buttons">
            <a href="mailto:vasilhsgxr5000@gmail.com" className="btn btn-primary">
              <Mail size={18} />
              Send Email Signal
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
              <p style={{ color: '#ffffff', fontWeight: '800', fontSize: '1.2rem', fontFamily: 'Bebas Neue', letterSpacing: '1px' }}>{certificationsList[currentCert].alt}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
