import React, { useState, useEffect } from 'react';
import { Database, Mail, Linkedin, Clock, Award, GraduationCap, ChevronLeft, ChevronRight, X, Copy, Check, Sparkles, Zap, TrendingUp, ArrowRight } from 'lucide-react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [currentCert, setCurrentCert] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const certifications = [
    { id: 1, src: "/cert-azure-dba.png", alt: "Microsoft Certified: Azure Database Administrator Associate" },
    { id: 2, src: "/cert-azure-data.png", alt: "Microsoft Certified: Azure Data Fundamentals" },
    { id: 3, src: "/cert-oracle-associate.png", alt: "Oracle Certified Associate" },
    { id: 4, src: "/cert-oracle-ADB.png", alt: "Oracle Certified Autonomous DB" }
  ];

  const expertise = [
    {
      title: "Database Administration",
      icon: Database,
      color: "#00d9ff",
      bgColor: "rgba(0, 217, 255, 0.1)",
      skills: ["SQL Server 2016-2025", "Oracle 12c-26ai", "PostgreSQL", "MySQL", "HADR Configuration"]
    },
    {
      title: "Performance Optimization",
      icon: TrendingUp,
      color: "#00ff88",
      bgColor: "rgba(0, 255, 136, 0.1)",
      skills: ["Query Tuning", "Index Optimization", "Wait Stats Analysis", "Deadlock Resolution", "Partitioning & Sharding"]
    },
    {
      title: "Cloud & Automation",
      icon: Database,
      color: "#a855f7",
      bgColor: "rgba(168, 85, 247, 0.1)",
      skills: ["Azure Database Services", "Google Cloud SQL", "Ansible", "Terraform"]
    }
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nextCert = (e) => {
    e && e.stopPropagation();
    setCurrentCert((prev) => (prev + 1) % certifications.length);
  };

  const prevCert = (e) => {
    e && e.stopPropagation();
    setCurrentCert((prev) => (prev - 1 + certifications.length) % certifications.length);
  };

  useEffect(() => {
    if (isModalOpen) return;
    const timer = setInterval(() => {
      setCurrentCert((prev) => (prev + 1) % certifications.length);
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

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Inter:wght@300;400;500;600;700;800&display=swap');
        
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', sans-serif; }
        html { scroll-behavior: smooth; }
        
        /* Background Grid */
        .bg-grid {
          position: fixed;
          inset: 0;
          background: 
            linear-gradient(0deg, rgba(0, 217, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 217, 255, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
          pointer-events: none;
          z-index: 1;
        }

        /* Animated gradient blob */
        .gradient-blob {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background: radial-gradient(ellipse at 20% 50%, rgba(0, 217, 255, 0.15) 0%, transparent 50%),
                      radial-gradient(ellipse at 80% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%);
        }

        /* Navbar */
        nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          width: 100%;
          z-index: 1000;
          padding: 1.5rem 0;
          backdrop-filter: blur(20px);
          background: linear-gradient(180deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5));
          border-bottom: 1px solid rgba(0, 217, 255, 0.2);
          transition: all 0.3s ease;
        }

        nav.scrolled {
          padding: 1rem 0;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 0.8));
          border-bottom: 1px solid rgba(0, 217, 255, 0.3);
          box-shadow: 0 10px 40px rgba(0, 217, 255, 0.1);
        }
        
        .nav-content {
          max-width: 100%;
          width: 100%;
          margin: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 3rem;
        }
        
        .nav-logo {
          font-size: 1.3rem;
          font-weight: 900;
          letter-spacing: 1.5px;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: linear-gradient(135deg, #00d9ff, #00ff88);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-family: 'Space Mono', monospace;
          white-space: nowrap;
          flex-shrink: 0;
          min-width: fit-content;
        }
        
        .nav-links {
          display: flex;
          gap: 3rem;
          margin-left: auto;
          justify-content: flex-end;
        }
        
        .nav-btn {
          background: none;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          font-size: 0.75rem;
          font-weight: 700;
          transition: all 0.3s ease;
          position: relative;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          white-space: nowrap;
        }
        
        .nav-btn:hover, .nav-btn.active {
          color: #00d9ff;
          text-shadow: 0 0 15px rgba(0, 217, 255, 0.8);
        }
        
        .nav-btn.active::after {
          content: '';
          position: absolute;
          bottom: -12px;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, #00d9ff, #00ff88);
          box-shadow: 0 0 15px rgba(0, 217, 255, 0.8);
        }
        
        /* Hero Section */
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 8rem 2rem 4rem;
          z-index: 10;
        }
        
        .hero-content {
          max-width: 900px;
          animation: fadeInUp 1s ease-out;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1.5rem;
          background: rgba(0, 217, 255, 0.1);
          border: 1px solid rgba(0, 217, 255, 0.3);
          border-radius: 50px;
          color: #00d9ff;
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 2rem;
          backdrop-filter: blur(10px);
          box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
        }
        
        .hero h1 {
          font-size: clamp(3rem, 10vw, 5rem);
          font-weight: 900;
          margin-bottom: 1rem;
          line-height: 1.1;
          background: linear-gradient(135deg, #ffffff, #00d9ff, #00ff88);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: -2px;
        }
        
        .hero h2 {
          font-size: clamp(1.25rem, 4vw, 1.75rem);
          color: #94a3b8;
          margin-bottom: 1.5rem;
          font-weight: 400;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .hero p {
          max-width: 700px;
          font-size: 1.1rem;
          color: #cbd5e1;
          margin-bottom: 2.5rem;
          line-height: 1.8;
        }
        
        .btn-group {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 4rem;
        }
        
        .btn {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 2.5rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          border: none;
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-size: 0.9rem;
        }

        .btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, transparent, rgba(255, 255, 255, 0.1));
          opacity: 0;
          transition: opacity 0.3s;
        }

        .btn:hover::before {
          opacity: 1;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #00d9ff, #00ff88);
          color: #000;
          box-shadow: 0 0 30px rgba(0, 217, 255, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.2);
        }
        
        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 40px rgba(0, 217, 255, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.2);
        }
        
        .btn-secondary {
          background: linear-gradient(135deg, rgba(0, 217, 255, 0.15), rgba(0, 217, 255, 0.05));
          border: 1.5px solid rgba(0, 217, 255, 0.3);
          color: #00d9ff;
          box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
        }
        
        .btn-secondary:hover {
          background: linear-gradient(135deg, rgba(0, 217, 255, 0.25), rgba(0, 217, 255, 0.1));
          border-color: #00d9ff;
          box-shadow: 0 0 20px rgba(0, 217, 255, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.1);
          transform: translateY(-3px);
        }
        
        /* Stats Bar */
        .stats-bar {
          position: relative;
          z-index: 10;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          padding: 3rem 2rem;
          background: linear-gradient(135deg, rgba(0, 217, 255, 0.08), rgba(168, 85, 247, 0.08));
          border: 1px solid rgba(0, 217, 255, 0.2);
          border-radius: 20px;
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
          backdrop-filter: blur(10px);
          box-shadow: 0 8px 32px rgba(0, 217, 255, 0.1);
        }
        
        .stat-number {
          font-size: 2.75rem;
          font-weight: 900;
          background: linear-gradient(135deg, #00d9ff, #00ff88);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 0.5rem;
          font-family: 'Space Mono', monospace;
        }
        
        .stat-label {
          font-size: 0.85rem;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          font-weight: 600;
        }
        
        /* Sections */
        section {
          position: relative;
          z-index: 10;
          padding: 6rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .section-title {
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 900;
          text-align: center;
          margin-bottom: 4rem;
          background: linear-gradient(135deg, #ffffff, #00d9ff, #00ff88);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: -1px;
        }
        
        .grid-3 {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: 2.5rem;
        }
        
        /* Cards */
        .card {
          position: relative;
          background: linear-gradient(135deg, rgba(0, 217, 255, 0.05), rgba(168, 85, 247, 0.05));
          border: 1px solid rgba(0, 217, 255, 0.2);
          border-radius: 16px;
          padding: 2.5rem;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          overflow: hidden;
        }

        .card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0, 217, 255, 0.1), transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        
        .card:hover {
          transform: translateY(-8px);
          border-color: rgba(0, 217, 255, 0.4);
          box-shadow: 0 20px 60px rgba(0, 217, 255, 0.2);
        }

        .card:hover::before {
          opacity: 1;
        }
        
        .card-icon {
          width: 4.5rem;
          height: 4.5rem;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          font-size: 1.75rem;
          position: relative;
          z-index: 1;
        }
        
        .card h3 {
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
          font-weight: 700;
          position: relative;
          z-index: 1;
          color: #fff;
        }
        
        .card ul {
          list-style: none;
          position: relative;
          z-index: 1;
        }
        
        .card li {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.875rem;
          font-size: 0.95rem;
          color: #cbd5e1;
        }
        
        .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        
        /* Timeline */
        .timeline-item {
          position: relative;
          border-left: 2px solid rgba(0, 217, 255, 0.2);
          padding-left: 3rem;
          margin-bottom: 3.5rem;
        }
        
        .timeline-dot {
          width: 14px;
          height: 14px;
          background: linear-gradient(135deg, #00d9ff, #00ff88);
          border-radius: 50%;
          position: absolute;
          left: -8px;
          top: 0;
          border: 3px solid #000;
          box-shadow: 0 0 20px rgba(0, 217, 255, 0.6);
        }
        
        .timeline-header {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          margin-bottom: 0.75rem;
          gap: 1rem;
        }
        
        .timeline-header h3 {
          font-size: 1.5rem;
          font-weight: 700;
        }
        
        .timeline-date {
          color: #00d9ff;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .timeline-company {
          font-size: 1.125rem;
          color: #94a3b8;
          margin-bottom: 1.5rem;
          font-weight: 600;
        }
        
        .timeline-list li {
          margin-bottom: 0.875rem;
          display: flex;
          gap: 0.75rem;
          color: #cbd5e1;
        }
        
        /* Tech Chips */
        .tech-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        
        .tech-chip {
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, rgba(0, 217, 255, 0.15), rgba(0, 217, 255, 0.05));
          border: 1px solid rgba(0, 217, 255, 0.3);
          border-radius: 20px;
          color: #cbd5e1;
          font-size: 0.9rem;
          font-weight: 600;
          transition: all 0.3s ease;
          cursor: default;
          text-transform: uppercase;
          letter-spacing: 0.3px;
          font-size: 0.8rem;
        }
        
        .tech-chip:hover {
          border-color: #00d9ff;
          color: #00d9ff;
          box-shadow: 0 0 20px rgba(0, 217, 255, 0.4);
          background: linear-gradient(135deg, rgba(0, 217, 255, 0.25), rgba(0, 217, 255, 0.1));
        }
        
        /* Modals */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.95);
          z-index: 2000;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 2rem;
          backdrop-filter: blur(10px);
          animation: fadeIn 0.2s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .modal-content {
          position: relative;
          max-width: 90%;
          max-height: 90vh;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(0, 217, 255, 0.3);
          box-shadow: 0 0 60px rgba(0, 217, 255, 0.3);
        }
        
        .modal-image {
          max-width: 100%;
          max-height: 90vh;
          border-radius: 16px;
        }
        
        .modal-close {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          background: rgba(0, 0, 0, 0.8);
          border: 1px solid rgba(0, 217, 255, 0.3);
          color: white;
          cursor: pointer;
          padding: 0.75rem;
          border-radius: 8px;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .modal-close:hover {
          background: #00d9ff;
          color: #000;
          box-shadow: 0 0 20px rgba(0, 217, 255, 0.6);
        }
        
        /* Footer */
        footer {
          position: relative;
          z-index: 10;
          background: linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.9));
          padding: 4rem 2rem 3rem;
          color: #94a3b8;
          border-top: 1px solid rgba(0, 217, 255, 0.1);
        }
        
        footer a {
          color: #00d9ff;
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
        }

        footer a::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: #00d9ff;
          transition: width 0.3s ease;
        }

        footer a:hover::after {
          width: 100%;
        }
        
        footer a:hover {
          text-shadow: 0 0 10px rgba(0, 217, 255, 0.5);
        }
        
        .footer-card {
          background: linear-gradient(135deg, rgba(0, 217, 255, 0.1), rgba(168, 85, 247, 0.08));
          border: 1px solid rgba(0, 217, 255, 0.2);
          border-radius: 16px;
          padding: 3rem 2rem;
          max-width: 800px;
          margin: 0 auto 3rem;
          backdrop-filter: blur(10px);
          text-align: center;
          box-shadow: 0 8px 32px rgba(0, 217, 255, 0.1);
        }
        
        .footer-card h2 {
          font-size: 2rem;
          font-weight: 900;
          color: #fff;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #00d9ff, #00ff88);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: -1px;
        }
        
        .footer-card p {
          color: #cbd5e1;
          font-size: 1.05rem;
          margin-bottom: 2rem;
          line-height: 1.8;
        }
        
        .footer-buttons {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }
        
        .footer-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 1rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          border: none;
          text-decoration: none;
          transition: all 0.3s ease;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          position: relative;
          overflow: hidden;
        }

        .footer-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, transparent, rgba(255, 255, 255, 0.1));
          opacity: 0;
          transition: opacity 0.3s;
        }

        .footer-btn:hover::before {
          opacity: 1;
        }
        
        .footer-btn-primary {
          background: linear-gradient(135deg, #00d9ff, #00ff88);
          color: #000;
          box-shadow: 0 0 30px rgba(0, 217, 255, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.2);
        }
        
        .footer-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 40px rgba(0, 217, 255, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.2);
        }
        
        .footer-btn-secondary {
          background: linear-gradient(135deg, rgba(0, 217, 255, 0.15), rgba(0, 217, 255, 0.05));
          border: 1.5px solid rgba(0, 217, 255, 0.3);
          color: #00d9ff;
          box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
        }
        
        .footer-btn-secondary:hover {
          background: linear-gradient(135deg, rgba(0, 217, 255, 0.25), rgba(0, 217, 255, 0.1));
          border-color: #00d9ff;
          box-shadow: 0 0 20px rgba(0, 217, 255, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }
        
        .footer-divider {
          border-top: 1px solid rgba(0, 217, 255, 0.1);
          padding-top: 2rem;
          margin-top: 2rem;
        }
        
        .footer-credit {
          color: #94a3b8;
          margin-bottom: 0.25rem;
          font-weight: 500;
        }
        
        .footer-subtitle {
          color: #64748b;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
          nav { padding: 1rem 0; }
          .nav-content { padding: 0 1.5rem; }
          .nav-logo { font-size: 1rem; gap: 0.5rem; }
          .nav-links { display: none; }
          .hero { padding: 6rem 1rem 3rem; }
          section { padding: 4rem 1rem; }
          .stats-bar { grid-template-columns: repeat(2, 1fr); gap: 1rem; }
          .footer-card { padding: 2rem 1.5rem; }
          .footer-buttons { grid-template-columns: 1fr; }
          .hero h1 { font-size: 2.5rem; }
        }
      `}</style>

      {/* Background Elements */}
      <div className="gradient-blob"></div>
      <div className="bg-grid"></div>

      {/* Navigation */}
      <nav className={isScrolled ? 'scrolled' : ''}>
        <div className="nav-content">
          <div className="nav-logo">
            <Database size={28} />
            <span>DBAMIND</span>
          </div>
          <div className="nav-links">
            <button onClick={() => scrollToSection('home')} className={`nav-btn ${activeSection === 'home' ? 'active' : ''}`}>HOME</button>
            <button onClick={() => scrollToSection('expertise')} className={`nav-btn ${activeSection === 'expertise' ? 'active' : ''}`}>EXPERTISE</button>
            <button onClick={() => scrollToSection('experience')} className={`nav-btn ${activeSection === 'experience' ? 'active' : ''}`}>EXPERIENCE</button>
            <button onClick={() => scrollToSection('education')} className={`nav-btn ${activeSection === 'education' ? 'active' : ''}`}>EDUCATION</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={18} />
            <span>Microsoft Certified Azure DBA</span>
          </div>

          <h1>VASSILEIOS GOUSETIS</h1>
          <h2>Database Architecture Specialist</h2>
          <p>
            Enterprise-grade database solutions. 4+ years architecting high-performance, secure database infrastructure across SQL Server, Oracle, and cloud platforms. Specialized in optimization, automation, and mission-critical system management.
          </p>

          <div className="btn-group">
            <button onClick={() => scrollToSection('experience')} className="btn btn-primary">
              <ArrowRight size={18} /> View Work
            </button>
            <button onClick={() => scrollToSection('connect')} className="btn btn-secondary">
              <Mail size={18} /> Connect
            </button>
          </div>

          {/* Certification Carousel */}
          <div style={{marginTop: '4rem', width: '100%', maxWidth: '600px', margin: '4rem auto 0'}}>
            <div style={{position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem'}}>
              <button onClick={prevCert} style={{background: 'rgba(0, 217, 255, 0.1)', border: '1px solid rgba(0, 217, 255, 0.3)', color: '#00d9ff', cursor: 'pointer', fontSize: '1.5rem', padding: '0.75rem', borderRadius: '8px', transition: 'all 0.3s', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><ChevronLeft size={28} /></button>
              <div style={{flex: 1, cursor: 'pointer'}} onClick={() => setIsModalOpen(true)}>
                <img src={certifications[currentCert].src} alt={certifications[currentCert].alt} style={{maxWidth: '100%', height: 'auto', maxHeight: '280px', borderRadius: '12px', border: '1px solid rgba(0, 217, 255, 0.3)', filter: 'drop-shadow(0 15px 35px rgba(0, 217, 255, 0.2))'}} />
              </div>
              <button onClick={nextCert} style={{background: 'rgba(0, 217, 255, 0.1)', border: '1px solid rgba(0, 217, 255, 0.3)', color: '#00d9ff', cursor: 'pointer', fontSize: '1.5rem', padding: '0.75rem', borderRadius: '8px', transition: 'all 0.3s', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><ChevronRight size={28} /></button>
            </div>
            <div style={{display: 'flex', gap: '0.75rem', justifyContent: 'center', marginTop: '2rem'}}>
              {certifications.map((_, idx) => (
                <div key={idx} onClick={() => setCurrentCert(idx)} style={{width: '12px', height: '12px', borderRadius: '50%', background: idx === currentCert ? '#00d9ff' : 'rgba(0, 217, 255, 0.2)', cursor: 'pointer', transition: 'all 0.3s', boxShadow: idx === currentCert ? '0 0 15px rgba(0, 217, 255, 0.6)' : 'none'}} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <div style={{padding: '0 2rem', marginBottom: '6rem', position: 'relative', zIndex: 10}}>
        <div className="stats-bar">
          <div><div className="stat-number">650+</div><div className="stat-label">Databases Managed</div></div>
          <div><div className="stat-number">40TB+</div><div className="stat-label">Data Administered</div></div>
          <div><div className="stat-number">4+</div><div className="stat-label">Years Experience</div></div>
          <div><div className="stat-number">99.9%</div><div className="stat-label">Uptime Maintained</div></div>
        </div>
      </div>

      {/* Expertise Section */}
      <section id="expertise">
        <h2 className="section-title">Technical Expertise</h2>
        <div className="grid-3">
          {expertise.map((exp, idx) => {
            const Icon = exp.icon;
            return (
              <div key={idx} className="card">
                <div className="card-icon" style={{background: exp.bgColor, color: exp.color}}>
                  <Icon size={32} />
                </div>
                <h3>{exp.title}</h3>
                <ul>
                  {exp.skills.map((skill, i) => (
                    <li key={i}>
                      <span className="dot" style={{background: exp.color}}></span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience">
        <h2 className="section-title">Professional Timeline</h2>
        <div>
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-header">
              <h3>Database Administrator</h3>
              <span className="timeline-date"><Clock size={16} /> Aug 2025 - Present</span>
            </div>
            <div className="timeline-company">Athens Exchange Group (ATHEX)</div>
            <ul className="timeline-list">
              <li><span style={{color: '#00d9ff'}}>▹</span> Managing Google Cloud SQL & infrastructure technologies</li>
              <li><span style={{color: '#00d9ff'}}>▹</span> Oracle, SQL Server, and PostgreSQL installation and patching</li>
              <li><span style={{color: '#00d9ff'}}>▹</span> Complex database migrations across cloud platforms</li>
              <li><span style={{color: '#00d9ff'}}>▹</span> Performance monitoring and optimization</li>
            </ul>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-header">
              <h3>Researcher & Informatics Specialist</h3>
              <span className="timeline-date"><Clock size={16} /> Sep 2024 - June 2025</span>
            </div>
            <div className="timeline-company">Hellenic Military Units Administration</div>
            <ul className="timeline-list">
              <li><span style={{color: '#a855f7'}}>▹</span> Technical support for specialized military applications</li>
              <li><span style={{color: '#a855f7'}}>▹</span> Secure application development with SQL & Python</li>
              <li><span style={{color: '#a855f7'}}>▹</span> Large-scale file system management</li>
            </ul>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-header">
              <h3>Data Engineer</h3>
              <span className="timeline-date"><Clock size={16} /> Nov 2023 - May 2024</span>
            </div>
            <div className="timeline-company">Ernst & Young</div>
            <ul className="timeline-list">
              <li><span style={{color: '#00ff88'}}>▹</span> ETL pipeline development using Python, SQL, SSIS</li>
              <li><span style={{color: '#00ff88'}}>▹</span> Credit risk data analysis and transformation</li>
              <li><span style={{color: '#00ff88'}}>▹</span> CDM configuration and optimization</li>
            </ul>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-header">
              <h3>Database Administrator</h3>
              <span className="timeline-date"><Clock size={16} /> July 2022 - Nov 2023</span>
            </div>
            <div className="timeline-company">Netcompany - Instasoft</div>
            <ul className="timeline-list">
              <li><span style={{color: '#f59e0b'}}>▹</span> Database administration and maintenance</li>
              <li><span style={{color: '#f59e0b'}}>▹</span> Query optimization and index tuning</li>
              <li><span style={{color: '#f59e0b'}}>▹</span> Table partitioning and archiving strategies</li>
              <li><span style={{color: '#f59e0b'}}>▹</span> Backup and disaster recovery procedures</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" style={{background: 'linear-gradient(135deg, rgba(0, 217, 255, 0.08), rgba(168, 85, 247, 0.08))', borderRadius: '20px', border: '1px solid rgba(0, 217, 255, 0.2)', backdropFilter: 'blur(10px)'}}>
        <div className="grid-3">
          <div>
            <h3 style={{marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#fff', fontSize: '1.25rem', fontWeight: '700'}}><GraduationCap color="#00d9ff" size={24} /> Education</h3>
            <div style={{marginBottom: '2rem'}}>
              <h4 style={{fontSize: '1.125rem', marginBottom: '0.5rem', color: '#fff'}}>Master of Data Analytics</h4>
              <div style={{color: '#00d9ff', fontSize: '0.9rem', marginBottom: '0.25rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px'}}>2023 - 2025</div>
              <div style={{color: '#94a3b8'}}>University of Bolton</div>
              <div style={{color: '#00ff88', fontWeight: 'bold', marginTop: '0.5rem'}}>Grade: 1:1</div>
            </div>
            <div>
              <h4 style={{fontSize: '1.125rem', marginBottom: '0.5rem', color: '#fff'}}>Bachelor of Data Analytics</h4>
              <div style={{color: '#00d9ff', fontSize: '0.9rem', marginBottom: '0.25rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px'}}>2020 - 2023</div>
              <div style={{color: '#94a3b8'}}>University of Bolton</div>
              <div style={{color: '#00ff88', fontWeight: 'bold', marginTop: '0.5rem'}}>Grade: 1:1</div>
            </div>
          </div>

          <div>
            <h3 style={{marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#fff', fontSize: '1.25rem', fontWeight: '700'}}><Award color="#00d9ff" size={24} /> Certifications</h3>
            <div style={{display: 'flex', gap: '0.75rem', marginBottom: '1.5rem'}}>
              <Award color="#00d9ff" size={20} />
              <div>
                <div style={{fontWeight: 'bold', color: '#fff'}}>Azure Database Administrator</div>
                <div style={{fontSize: '0.85rem', color: '#94a3b8'}}>Microsoft Certified</div>
              </div>
            </div>
            <div style={{display: 'flex', gap: '0.75rem', marginBottom: '1.5rem'}}>
              <Award color="#00d9ff" size={20} />
              <div>
                <div style={{fontWeight: 'bold', color: '#fff'}}>Azure Data Fundamentals</div>
                <div style={{fontSize: '0.85rem', color: '#94a3b8'}}>Microsoft Certified</div>
              </div>
            </div>
            <div style={{display: 'flex', gap: '0.75rem', marginBottom: '1.5rem'}}>
              <Award color="#a855f7" size={20} />
              <div>
                <div style={{fontWeight: 'bold', color: '#fff'}}>Oracle Associate DBA</div>
                <div style={{fontSize: '0.85rem', color: '#94a3b8'}}>Oracle Certified</div>
              </div>
            </div>
            <div style={{display: 'flex', gap: '0.75rem'}}>
              <Award color="#a855f7" size={20} />
              <div>
                <div style={{fontWeight: 'bold', color: '#fff'}}>Oracle Autonomous Professional</div>
                <div style={{fontSize: '0.85rem', color: '#94a3b8'}}>Oracle Certified</div>
              </div>
            </div>
          </div>

          <div>
            <h3 style={{marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#fff', fontSize: '1.25rem', fontWeight: '700'}}><Zap color="#00ff88" size={24} /> Recognition</h3>
            <div style={{display: 'flex', gap: '0.75rem', marginBottom: '1.5rem'}}>
              <Zap color="#00ff88" size={20} />
              <div>
                <div style={{fontWeight: 'bold', color: '#fff'}}>Distinguished IT Student</div>
                <div style={{fontSize: '0.85rem', color: '#94a3b8'}}>2025 & 2023 - BCS</div>
              </div>
            </div>
            <div style={{display: 'flex', gap: '0.75rem'}}>
              <Zap color="#00d9ff" size={20} />
              <div>
                <div style={{fontWeight: 'bold', color: '#fff'}}>Ministry of Digital Governance</div>
                <div style={{fontSize: '0.85rem', color: '#94a3b8'}}>Award recipient</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section style={{textAlign: 'center'}}>
        <h3 style={{color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '3rem', fontSize: '0.9rem', fontWeight: '700'}}>Core Technology Stack</h3>
        <div className="tech-row">
          {['SQL Server 2016-2025', 'Oracle 12c-26ai', 'PostgreSQL', 'MySQL', 'MariaDB'].map(t => <span key={t} className="tech-chip">{t}</span>)}
        </div>
        <div className="tech-row">
          {['Azure SQL Database', 'Google Cloud SQL', 'Ansible', 'Terraform', 'PowerShell'].map(t => <span key={t} className="tech-chip">{t}</span>)}
        </div>
        <div className="tech-row">
          {['Grafana', 'Solarwinds', 'OEM 13c', 'Python', 'SSIS'].map(t => <span key={t} className="tech-chip">{t}</span>)}
        </div>
      </section>

      {/* Enhanced Card-Style Footer */}
      <footer id="connect">
        <div className="footer-card">
          <h2>Let's Collaborate</h2>
          <p>Interested in enterprise database solutions? Let's connect and discuss your infrastructure challenges.</p>
          
          <div className="footer-buttons">
            <a href="mailto:vasilhsgxr5000@gmail.com" className="footer-btn footer-btn-primary">
              <Mail size={18} />
              Send Email
            </a>
            <button onClick={handleCopyEmail} className="footer-btn footer-btn-secondary">
              {copied ? (
                <>
                  <Check size={18} style={{color: '#00ff88'}} />
                  Copied!
                </>
              ) : (
                <>
                  <Copy size={18} />
                  Copy Email
                </>
              )}
            </button>
            <a href="https://www.linkedin.com/in/vasileiosgoysetis-7378101b9" target="_blank" rel="noopener noreferrer" className="footer-btn footer-btn-secondary">
              <Linkedin size={18} />
              LinkedIn
            </a>
          </div>
        </div>

        <div className="footer-divider">
          <p className="footer-credit">© {new Date().getFullYear()} Vassileios Gousetis</p>
          <p className="footer-subtitle">Database Solutions Architect</p>
        </div>
      </footer>

      {/* Certification Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button onClick={() => setIsModalOpen(false)} className="modal-close"><X size={28} /></button>
            <img src={certifications[currentCert].src} alt={certifications[currentCert].alt} className="modal-image" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
