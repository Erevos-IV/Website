import React, { useState, useEffect } from 'react';
import { Database, Server, Shield, Activity, Mail, Linkedin, ChevronDown, Clock, Award, GraduationCap, Cloud, ChevronLeft, ChevronRight, X, Copy, Check, Sparkles, Code2, Zap, Lock, TrendingUp } from 'lucide-react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [currentCert, setCurrentCert] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

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
      color: "#3b82f6",
      bgColor: "rgba(59, 130, 246, 0.1)",
      skills: ["SQL Server 2016-2025", "Oracle RAC 19c", "PostgreSQL", "MySQL", "HADR Configuration"]
    },
    {
      title: "Performance Optimization",
      icon: TrendingUp,
      color: "#10b981",
      bgColor: "rgba(16, 185, 129, 0.1)",
      skills: ["Query Tuning", "Index Optimization", "Wait Stats Analysis", "Deadlock Resolution"]
    },
    {
      title: "Cloud & Automation",
      icon: Cloud,
      color: "#a855f7",
      bgColor: "rgba(168, 85, 247, 0.1)",
      skills: ["Azure Database Services", "GCP Cloud SQL", "Ansible", "Terraform", "PowerShell"]
    }
  ];

  const nextCert = (e) => {
    e && e.stopPropagation();
    setCurrentCert((prev) => (prev + 1) % certifications.length);
  };

  const prevCert = (e) => {
    e && e.stopPropagation();
    setCurrentCert((prev) => (prev - 1 + certifications.length) % certifications.length);
  };

  useEffect(() => {
    if (isModalOpen || isContactModalOpen) return;
    const timer = setInterval(() => {
      setCurrentCert((prev) => (prev + 1) % certifications.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentCert, isModalOpen, isContactModalOpen]);

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
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', system-ui, sans-serif; }
        
        /* Smooth scrolling */
        html { scroll-behavior: smooth; }
        
        /* Navbar */
        nav {
          position: fixed;
          top: 0;
          width: 100%;
          backdrop-filter: blur(12px);
          background-color: rgba(15, 23, 42, 0.85);
          border-bottom: 1px solid rgba(59, 130, 246, 0.2);
          z-index: 1000;
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .nav-logo {
          font-size: 1.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .nav-links {
          display: flex;
          gap: 2rem;
        }
        
        .nav-btn {
          background: none;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          font-size: 0.95rem;
          font-weight: 500;
          transition: all 0.3s ease;
          position: relative;
        }
        
        .nav-btn:hover, .nav-btn.active {
          color: #3b82f6;
        }
        
        .nav-btn.active::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, #3b82f6, transparent);
        }
        
        /* Hero Section */
        .hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 8rem 1.5rem 4rem;
          position: relative;
          background: radial-gradient(ellipse at 50% 0%, rgba(59, 130, 246, 0.15), transparent 50%);
        }
        
        .hero h1 {
          font-size: clamp(2.5rem, 8vw, 4.5rem);
          font-weight: 900;
          margin-bottom: 1rem;
          line-height: 1.1;
          background: linear-gradient(135deg, #f1f5f9, #60a5fa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .hero h2 {
          font-size: clamp(1.5rem, 5vw, 2.5rem);
          color: #94a3b8;
          margin-bottom: 1.5rem;
          font-weight: 600;
        }
        
        .badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background-color: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.3);
          border-radius: 999px;
          color: #60a5fa;
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          backdrop-filter: blur(8px);
        }
        
        .btn-group {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 4rem;
        }
        
        .btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.875rem 2rem;
          border-radius: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          border: none;
          text-decoration: none;
          transition: all 0.3s ease;
          font-size: 1rem;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          color: white;
          box-shadow: 0 10px 30px rgba(59, 130, 246, 0.3);
        }
        
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 40px rgba(59, 130, 246, 0.4);
        }
        
        .btn-secondary {
          background-color: rgba(30, 41, 59, 0.8);
          border: 1.5px solid rgba(59, 130, 246, 0.3);
          color: #f1f5f9;
        }
        
        .btn-secondary:hover {
          background-color: rgba(59, 130, 246, 0.1);
          border-color: #3b82f6;
        }
        
        /* Stats Bar */
        .stats-bar {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 2rem;
          padding: 3rem 2rem;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(168, 85, 247, 0.05));
          border: 1px solid rgba(59, 130, 246, 0.1);
          border-radius: 1.5rem;
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
        }
        
        .stat-number {
          font-size: 2.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #60a5fa, #3b82f6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 0.5rem;
        }
        
        .stat-label {
          font-size: 0.875rem;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 600;
        }
        
        /* Sections */
        section {
          padding: 6rem 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .section-title {
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 800;
          text-align: center;
          margin-bottom: 4rem;
          background: linear-gradient(135deg, #f1f5f9, #60a5fa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .grid-3 {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
        }
        
        /* Cards */
        .card {
          background: linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.5));
          border: 1px solid rgba(59, 130, 246, 0.2);
          border-radius: 1.25rem;
          padding: 2.5rem;
          transition: all 0.3s ease;
          backdrop-filter: blur(8px);
        }
        
        .card:hover {
          transform: translateY(-8px);
          border-color: rgba(59, 130, 246, 0.6);
          box-shadow: 0 20px 50px rgba(59, 130, 246, 0.2);
        }
        
        .card-icon {
          width: 4rem;
          height: 4rem;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          font-size: 1.75rem;
        }
        
        .card h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          font-weight: 700;
        }
        
        .card ul {
          list-style: none;
        }
        
        .card li {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
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
          border-left: 2px solid rgba(59, 130, 246, 0.3);
          padding-left: 2.5rem;
          position: relative;
          margin-bottom: 3rem;
        }
        
        .timeline-dot {
          width: 1.25rem;
          height: 1.25rem;
          background: linear-gradient(135deg, #3b82f6, #60a5fa);
          border-radius: 50%;
          position: absolute;
          left: -0.8rem;
          top: 0;
          border: 3px solid #0f172a;
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.5);
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
          color: #60a5fa;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          font-weight: 600;
        }
        
        .timeline-company {
          font-size: 1.125rem;
          color: #94a3b8;
          margin-bottom: 1rem;
          font-weight: 600;
        }
        
        .timeline-list li {
          margin-bottom: 0.75rem;
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
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(59, 130, 246, 0.05));
          border: 1px solid rgba(59, 130, 246, 0.3);
          border-radius: 2rem;
          color: #cbd5e1;
          font-size: 0.9rem;
          font-weight: 600;
          transition: all 0.3s ease;
          cursor: default;
        }
        
        .tech-chip:hover {
          border-color: #3b82f6;
          color: #60a5fa;
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
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
          backdrop-filter: blur(8px);
        }
        
        .modal-content {
          position: relative;
          max-width: 90%;
          max-height: 90vh;
          border-radius: 1.25rem;
          overflow: hidden;
        }
        
        .modal-image {
          max-width: 100%;
          max-height: 90vh;
          border-radius: 1.25rem;
          box-shadow: 0 0 50px rgba(59, 130, 246, 0.5);
        }
        
        .modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(0, 0, 0, 0.7);
          border: none;
          color: white;
          cursor: pointer;
          padding: 0.75rem;
          border-radius: 0.75rem;
          transition: all 0.3s ease;
        }
        
        .modal-close:hover {
          background: #3b82f6;
        }
        
        /* Footer */
        footer {
          background: linear-gradient(180deg, transparent, rgba(15, 23, 42, 0.8));
          text-align: center;
          padding: 3rem 2rem;
          color: #94a3b8;
          font-size: 0.9rem;
          border-top: 1px solid rgba(59, 130, 246, 0.1);
        }
        
        footer a {
          color: #60a5fa;
          text-decoration: none;
          transition: color 0.3s;
        }
        
        footer a:hover {
          color: #3b82f6;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
          nav { padding: 1rem; }
          .nav-links { display: none; }
          .hero { padding: 6rem 1rem 3rem; }
          section { padding: 4rem 1rem; }
          .stats-bar { grid-template-columns: repeat(2, 1fr); gap: 1rem; }
        }
      `}</style>

      {/* Navigation */}
      <nav>
        <div className="nav-logo">
          <Database size={28} />
          <span>Vassileios<span style={{background: 'linear-gradient(135deg, #3b82f6, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>.DBA</span></span>
        </div>
        <div className="nav-links">
          <button onClick={() => scrollToSection('home')} className={`nav-btn ${activeSection === 'home' ? 'active' : ''}`}>Home</button>
          <button onClick={() => scrollToSection('expertise')} className={`nav-btn ${activeSection === 'expertise' ? 'active' : ''}`}>Expertise</button>
          <button onClick={() => scrollToSection('experience')} className={`nav-btn ${activeSection === 'experience' ? 'active' : ''}`}>Experience</button>
          <button onClick={() => scrollToSection('education')} className={`nav-btn ${activeSection === 'education' ? 'active' : ''}`}>Education</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="badge">
          <Shield size={16} />
          <span>Certified Azure Database Administrator</span>
        </div>

        <h1>Vassileios Gousetis</h1>
        <h2>Database Architecture & Performance Expert</h2>
        <p style={{maxWidth: '650px', fontSize: '1.125rem', color: '#cbd5e1', marginBottom: '2.5rem', lineHeight: '1.6'}}>
          Specializing in SQL Server, Oracle, and Cloud Database solutions. Trusted to architect, optimize, and maintain enterprise-grade database infrastructure across multi-platform environments.
        </p>

        <div className="btn-group">
          <button onClick={() => scrollToSection('experience')} className="btn btn-primary">
            <Sparkles size={18} /> View My Work
          </button>
          <button onClick={() => setIsContactModalOpen(true)} className="btn btn-secondary">
            <Mail size={18} /> Get In Touch
          </button>
        </div>

        {/* Certification Carousel */}
        <div style={{marginTop: '3rem', width: '100%', maxWidth: '600px'}}>
          <div style={{position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem'}}>
            <button onClick={prevCert} style={{background: 'none', border: 'none', color: '#60a5fa', cursor: 'pointer', fontSize: '1.5rem', padding: '0.5rem'}}><ChevronLeft size={28} /></button>
            <div style={{flex: 1, cursor: 'pointer'}} onClick={() => setIsModalOpen(true)}>
              <img src={certifications[currentCert].src} alt={certifications[currentCert].alt} style={{maxWidth: '100%', height: 'auto', maxHeight: '250px', borderRadius: '0.75rem', filter: 'drop-shadow(0 10px 30px rgba(59, 130, 246, 0.3))'}} />
            </div>
            <button onClick={nextCert} style={{background: 'none', border: 'none', color: '#60a5fa', cursor: 'pointer', fontSize: '1.5rem', padding: '0.5rem'}}><ChevronRight size={28} /></button>
          </div>
          <div style={{display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '1.5rem'}}>
            {certifications.map((_, idx) => (
              <div key={idx} onClick={() => setCurrentCert(idx)} style={{width: '10px', height: '10px', borderRadius: '50%', background: idx === currentCert ? '#3b82f6' : 'rgba(94, 165, 184, 0.3)', cursor: 'pointer', transition: 'all 0.3s'}} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <div style={{padding: '0 2rem', marginBottom: '4rem'}}>
        <div className="stats-bar">
          <div><div className="stat-number">650+</div><div className="stat-label">Databases Managed</div></div>
          <div><div className="stat-number">40TB+</div><div className="stat-label">Data Administered</div></div>
          <div><div className="stat-number">8+</div><div className="stat-label">Years Experience</div></div>
          <div><div className="stat-number">4</div><div className="stat-label">Cloud Platforms</div></div>
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
                <h3 style={{color: '#f1f5f9'}}>{exp.title}</h3>
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
        <h2 className="section-title">Professional Experience</h2>
        <div>
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-header">
              <h3>Database Administrator</h3>
              <span className="timeline-date"><Clock size={16} /> Aug 2025 - Present</span>
            </div>
            <div className="timeline-company">Athens Exchange Group (ATHEX)</div>
            <ul className="timeline-list">
              <li><span style={{color: '#3b82f6'}}>▹</span> Managing Google Cloud Database & Infrastructure</li>
              <li><span style={{color: '#3b82f6'}}>▹</span> Oracle, SQL Server, and PostgreSQL administration</li>
              <li><span style={{color: '#3b82f6'}}>▹</span> Complex database migrations and upgrades</li>
              <li><span style={{color: '#3b82f6'}}>▹</span> Performance monitoring with OEM, Grafana, Solarwinds</li>
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
              <li><span style={{color: '#a855f7'}}>▹</span> ETL pipelines using Python, SQL, SSIS</li>
              <li><span style={{color: '#a855f7'}}>▹</span> Credit risk data analysis & modeling</li>
              <li><span style={{color: '#a855f7'}}>▹</span> CDM configuration & automation</li>
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
              <li><span style={{color: '#10b981'}}>▹</span> Database administration & maintenance</li>
              <li><span style={{color: '#10b981'}}>▹</span> Query optimization & index tuning</li>
              <li><span style={{color: '#10b981'}}>▹</span> Table partitioning & archiving strategies</li>
              <li><span style={{color: '#10b981'}}>▹</span> Backup & disaster recovery procedures</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" style={{background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(168, 85, 247, 0.1))', borderRadius: '1.5rem', border: '1px solid rgba(59, 130, 246, 0.2)'}}>
        <div className="grid-3">
          <div>
            <h3 style={{marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f1f5f9'}}><GraduationCap color="#3b82f6" size={24} /> Education</h3>
            <div style={{marginBottom: '2rem'}}>
              <h4 style={{fontSize: '1.125rem', marginBottom: '0.5rem', color: '#f1f5f9'}}>Master of Data Analytics</h4>
              <div style={{color: '#60a5fa', fontSize: '0.9rem', marginBottom: '0.25rem'}}>2023 - 2025</div>
              <div style={{color: '#94a3b8'}}>University of Bolton</div>
              <div style={{color: '#10b981', fontWeight: 'bold', marginTop: '0.5rem'}}>Grade: 1:1</div>
            </div>
            <div>
              <h4 style={{fontSize: '1.125rem', marginBottom: '0.5rem', color: '#f1f5f9'}}>Bachelor of Data Analytics</h4>
              <div style={{color: '#60a5fa', fontSize: '0.9rem', marginBottom: '0.25rem'}}>2020 - 2023</div>
              <div style={{color: '#94a3b8'}}>University of Bolton</div>
              <div style={{color: '#10b981', fontWeight: 'bold', marginTop: '0.5rem'}}>Grade: 1:1</div>
            </div>
          </div>

          <div>
            <h3 style={{marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f1f5f9'}}><Award color="#f59e0b" size={24} /> Certifications</h3>
            <div style={{display: 'flex', gap: '0.75rem', marginBottom: '1.5rem'}}>
              <Award color="#f59e0b" size={20} />
              <div>
                <div style={{fontWeight: 'bold', color: '#f1f5f9'}}>Microsoft Certified: Azure Database Administrator</div>
                <div style={{fontSize: '0.85rem', color: '#94a3b8'}}>2024</div>
              </div>
            </div>
            <div style={{display: 'flex', gap: '0.75rem', marginBottom: '1.5rem'}}>
              <Award color="#f59e0b" size={20} />
              <div>
                <div style={{fontWeight: 'bold', color: '#f1f5f9'}}>Oracle Certified Associate</div>
                <div style={{fontSize: '0.85rem', color: '#94a3b8'}}>2024</div>
              </div>
            </div>
          </div>

          <div>
            <h3 style={{marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f1f5f9'}}><Zap color="#fbbf24" size={24} /> Recognition</h3>
            <div style={{display: 'flex', gap: '0.75rem', marginBottom: '1.5rem'}}>
              <Zap color="#fbbf24" size={20} />
              <div>
                <div style={{fontWeight: 'bold', color: '#f1f5f9'}}>Distinguished IT Student</div>
                <div style={{fontSize: '0.85rem', color: '#94a3b8'}}>2025, BCS</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section style={{textAlign: 'center'}}>
        <h3 style={{color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '3rem', fontSize: '0.9rem', fontWeight: '700'}}>Tech Stack</h3>
        <div className="tech-row">
          {['SQL Server 2016-2025', 'Oracle RAC 19c', 'PostgreSQL', 'MySQL', 'Azure SQL'].map(t => <span key={t} className="tech-chip">{t}</span>)}
        </div>
        <div className="tech-row">
          {['Azure Database', 'Google Cloud SQL', 'Ansible', 'Terraform', 'PowerShell'].map(t => <span key={t} className="tech-chip">{t}</span>)}
        </div>
        <div className="tech-row">
          {['Grafana', 'Solarwinds', 'OEM 13c', 'Python', 'SSIS'].map(t => <span key={t} className="tech-chip">{t}</span>)}
        </div>
      </section>

      {/* Contact Modal */}
      {isContactModalOpen && (
        <div className="modal-overlay" onClick={() => setIsContactModalOpen(false)}>
          <div style={{background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.95))', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '1.25rem', padding: '2.5rem', width: '100%', maxWidth: '400px', textAlign: 'center', backdropFilter: 'blur(8px)'}} onClick={e => e.stopPropagation()}>
            <button onClick={() => setIsContactModalOpen(false)} style={{position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '1.5rem'}}><X size={24} /></button>
            <h3 style={{fontSize: '1.5rem', marginBottom: '0.5rem', color: '#f1f5f9'}}>Get In Touch</h3>
            <p style={{color: '#94a3b8', marginBottom: '2rem'}}>Let's discuss your database challenges</p>
            <div style={{background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(59, 130, 246, 0.3)', padding: '1rem', borderRadius: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '2rem', fontFamily: 'monospace', color: '#f1f5f9'}}>
              <span>vasilhsgxr5000@gmail.com</span>
              <button onClick={handleCopyEmail} style={{background: 'none', border: 'none', color: '#60a5fa', cursor: 'pointer'}}>{copied ? <Check size={20} /> : <Copy size={20} />}</button>
            </div>
            <a href="mailto:vasilhsgxr5000@gmail.com" className="btn btn-primary" style={{width: '100%', justifyContent: 'center'}}>Open Email Client</a>
          </div>
        </div>
      )}

      {/* Certification Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button onClick={() => setIsModalOpen(false)} className="modal-close"><X size={28} /></button>
            <img src={certifications[currentCert].src} alt={certifications[currentCert].alt} className="modal-image" />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer>
        <div style={{marginBottom: '1.5rem'}}>
          <a href="mailto:vasilhsgxr5000@gmail.com" style={{fontSize: '1.1rem', fontWeight: 'bold'}}>vasilhsgxr5000@gmail.com</a>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '2rem'}}>
          <a href="https://www.linkedin.com/in/vasileiosgoysetis-7378101b9" target="_blank" rel="noopener noreferrer" className="btn btn-secondary"><Linkedin size={18} /> LinkedIn</a>
        </div>
        <p>© {new Date().getFullYear()} Vassileios Gousetis. Built with React & modern web technologies.</p>
      </footer>
    </div>
  );
};

export default Portfolio;
