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
      color: 'var(--accent-2)',
      bgColor: "rgba(11, 132, 255, 0.06)",
      skills: ["SQL Server 2016-2025", "Oracle 12c-26ai", "PostgreSQL", "MySQL", "HADR Configuration"]
    },
    {
      title: "Performance Optimization",
      icon: TrendingUp,
      color: 'var(--accent)',
      bgColor: "rgba(228, 27, 35, 0.04)",
      skills: ["Query Tuning", "Index Optimization", "Wait Stats Analysis", "Deadlock Resolution", "Partitioning & Sharding"]
    },
    {
      title: "Cloud & Automation",
      icon: Database,
      color: 'var(--accent-2)',
      bgColor: "rgba(11, 132, 255, 0.04)",
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

        /* Background Grid (toned down) */
        .bg-grid {
          position: fixed;
          inset: 0;
          background: 
            linear-gradient(0deg, rgba(11, 132, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(11, 132, 255, 0.02) 1px, transparent 1px);
          background-size: 50px 50px;
          pointer-events: none;
          z-index: 1;
        }

        /* Subtle gradient blobs replaced to use theme tints */
        .gradient-blob {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background: radial-gradient(ellipse at 20% 50%, rgba(11,132,255,0.06) 0%, transparent 30%),
                      radial-gradient(ellipse at 80% 80%, rgba(228,27,35,0.04) 0%, transparent 30%);
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
          backdrop-filter: blur(12px);
          background: linear-gradient(180deg, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.6));
          border-bottom: 1px solid rgba(255,255,255,0.04);
          transition: all 0.25s ease;
        }

        nav.scrolled {
          padding: 1rem 0;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 0.8));
          border-bottom: 1px solid rgba(255,255,255,0.06);
          box-shadow: 0 6px 20px rgba(0,0,0,0.45);
        }

        .nav-content { max-width: 100%; width: 100%; margin: 0; display: flex; justify-content: space-between; align-items: center; padding: 0 2rem; }

        .nav-logo {
          font-size: 1.3rem;
          font-weight: 900;
          letter-spacing: 1.5px;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: var(--accent-2);
          font-family: 'Space Mono', monospace;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .nav-links { display: flex; gap: 2.5rem; margin-left: auto; justify-content: flex-end; }

        .nav-btn { background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: 0.75rem; font-weight: 700; transition: color 0.2s ease; position: relative; text-transform: uppercase; letter-spacing: 1.5px; }

        .nav-btn:hover, .nav-btn.active { color: var(--accent-2); }
        .nav-btn.active::after { content: ''; position: absolute; bottom: -10px; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, var(--accent-2), var(--accent)); opacity: 0.95; }

        /* Hero Section */
        .hero { position: relative; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 8rem 2rem 4rem; z-index: 10; }
        .hero-content { max-width: 900px; animation: fadeInUp 0.9s ease-out; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }

        .hero-badge { display: inline-flex; align-items: center; gap: 0.75rem; padding: 0.6rem 1.25rem; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.03); border-radius: 999px; color: var(--accent); font-size: 0.875rem; font-weight: 600; margin-bottom: 1.5rem; }

        .hero h1 { font-size: clamp(2.5rem, 8vw, 4.25rem); font-weight: 900; margin-bottom: 1rem; line-height: 1.05; color: var(--text-main); }
        .hero h2 { font-size: clamp(1rem, 3vw, 1.5rem); color: var(--text-muted); margin-bottom: 1.25rem; font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase; }
        .hero p { max-width: 720px; font-size: 1.05rem; color: var(--text-muted); margin-bottom: 1.75rem; line-height: 1.6; }

        .btn-group { display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; }
        .btn { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.9rem 2rem; border-radius: 8px; font-weight: 700; cursor: pointer; border: none; transition: transform 0.18s ease, box-shadow 0.18s ease; }

        /* Use theme variables and remove neon glows */
        .btn-primary { background: linear-gradient(135deg, var(--accent), var(--accent-hover)); color: var(--text-main); box-shadow: 0 6px 18px rgba(0,0,0,0.55); }
        .btn-primary:hover { transform: translateY(-3px); box-shadow: 0 10px 30px rgba(0,0,0,0.6); }

        .btn-secondary { background: var(--bg-card); border: 1px solid var(--border); color: var(--text-main); }
        .btn-secondary:hover { background: var(--bg-card-hover); transform: translateY(-3px); }

        /* Stats Bar */
        .stats-bar { position: relative; z-index: 10; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; padding: 3rem 2rem; background: rgba(255,255,255,0.01); border: 1px solid rgba(255,255,255,0.03); border-radius: 16px; max-width: 1200px; margin: 0 auto; text-align: center; }
        .stat-number { font-size: 2.5rem; font-weight: 900; color: var(--text-main); margin-bottom: 0.25rem; font-family: 'Space Mono', monospace; }
        .stat-label { font-size: 0.85rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1.25px; font-weight: 600; }

        /* Sections */
        section { position: relative; z-index: 10; padding: 6rem 2rem; max-width: 1200px; margin: 0 auto; }
        .section-title { font-size: clamp(2rem, 6vw, 3rem); font-weight: 900; text-align: center; margin-bottom: 3rem; color: var(--text-main); }

        .grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2rem; }

        /* Cards */
        .card { position: relative; background: var(--bg-card); border: 1px solid var(--border); border-radius: 12px; padding: 2rem; transition: transform 0.22s ease, border-color 0.22s ease; }
        .card:hover { transform: translateY(-6px); border-color: var(--accent); }

        .card-icon { width: 3.5rem; height: 3.5rem; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem; }
        .card h3 { font-size: 1.25rem; margin-bottom: 0.75rem; color: var(--text-main); }
        .card ul { list-style: none; color: var(--text-muted); }
        .card li { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; }
        .dot { width: 6px; height: 6px; background: var(--accent); border-radius: 50%; }

        /* Timeline and chips */
        .timeline-item { border-left: 2px solid var(--border); padding-left: 2rem; margin-bottom: 3rem; }
        .timeline-dot { width: 1rem; height: 1rem; background: var(--accent); border-radius: 50%; position: absolute; left: -9px; top: 0; border: 4px solid var(--bg-dark); }

        .tech-row { display: flex; flex-wrap: wrap; justify-content: center; gap: 1rem; margin-bottom: 1.5rem; }
        .tech-chip { padding: 0.6rem 1.25rem; background: var(--bg-card); border: 1px solid var(--border); border-radius: 999px; color: var(--text-muted); font-size: 0.85rem; }
        .tech-chip:hover { border-color: var(--accent); color: var(--accent); }

        /* Footer */
        footer { width: 100%; text-align: center; padding: 3rem; background-color: #06070a; color: var(--text-muted); font-size: 0.9rem; }

        /* Reduced motion & mobile perf */
        @media (prefers-reduced-motion: reduce) {
          .gradient-blob, .bg-grid, .card, .btn, .card-icon { animation: none !important; transition: none !important; }
        }
        @media (max-width: 768px) {
          .bg-grid, .gradient-blob { display: none; }
          .nav-content { padding: 0 1rem; }
        }

        @media (max-width: 768px) {
          .hero h1 { font-size: 2rem; }
          .nav-links { display: none; }
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
            Enterprise-grade database solutions. 4+ years architecting high-performance, secure database infrastructure across SQL Server, Oracle, and cloud platforms. Specialized in optimization[...]
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
              <button onClick={prevCert} style={{background: 'rgba(11,132,255,0.06)', border: '1px solid rgba(11,132,255,0.12)', color: 'var(--accent-2)', cursor: 'pointer', fontSize: '1.5rem', padding: '0.6rem 0.9rem'}}>
                ‹
              </button>
              <div style={{flex: 1, cursor: 'pointer'}} onClick={() => setIsModalOpen(true)}>
                <img src={certifications[currentCert].src} alt={certifications[currentCert].alt} style={{maxWidth: '100%', height: 'auto', maxHeight: '280px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.04)'}} />
              </div>
              <button onClick={nextCert} style={{background: 'rgba(11,132,255,0.06)', border: '1px solid rgba(11,132,255,0.12)', color: 'var(--accent-2)', cursor: 'pointer', fontSize: '1.5rem', padding: '0.6rem 0.9rem'}}>
                ›
              </button>
            </div>
            <div style={{display: 'flex', gap: '0.75rem', justifyContent: 'center', marginTop: '2rem'}}>
              {certifications.map((_, idx) => (
                <div key={idx} onClick={() => setCurrentCert(idx)} style={{width: '12px', height: '12px', borderRadius: '50%', background: idx === currentCert ? 'var(--accent-2)' : 'rgba(255,255,255,0.04)'}}></div>
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
              <li><span style={{color: 'var(--accent-2)'}}>▹</span> Managing Google Cloud SQL & infrastructure technologies</li>
              <li><span style={{color: 'var(--accent-2)'}}>▹</span> Oracle, SQL Server, and PostgreSQL installation and patching</li>
              <li><span style={{color: 'var(--accent-2)'}}>▹</span> Complex database migrations across cloud platforms</li>
              <li><span style={{color: 'var(--accent-2)'}}>▹</span> Performance monitoring and optimization</li>
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
              <li><span style={{color: 'var(--accent)'}}>▹</span> Technical support for specialized military applications</li>
              <li><span style={{color: 'var(--accent)'}}>▹</span> Secure application development with SQL & Python</li>
              <li><span style={{color: 'var(--accent)'}}>▹</span> Large-scale file system management</li>
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
              <li><span style={{color: 'var(--accent)'}}>▹</span> ETL pipeline development using Python, SQL, SSIS</li>
              <li><span style={{color: 'var(--accent)'}}>▹</span> Credit risk data analysis and transformation</li>
              <li><span style={{color: 'var(--accent)'}}>▹</span> CDM configuration and optimization</li>
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
              <li><span style={{color: 'var(--accent-hover)'}}>▹</span> Database administration and maintenance</li>
              <li><span style={{color: 'var(--accent-hover)'}}>▹</span> Query optimization and index tuning</li>
              <li><span style={{color: 'var(--accent-hover)'}}>▹</span> Table partitioning and archiving strategies</li>
              <li><span style={{color: 'var(--accent-hover)'}}>▹</span> Backup and disaster recovery procedures</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" style={{background: 'rgba(255,255,255,0.01)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.03)'}}>
        <div className="grid-3">
          <div>
            <h3 style={{marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#fff', fontSize: '1.25rem', fontWeight: '700'}}><GraduationCap color="var(--accent-2)" size={20} /> Education</h3>
            <div style={{marginBottom: '2rem'}}>
              <h4 style={{fontSize: '1.125rem', marginBottom: '0.5rem', color: '#fff'}}>Master of Data Analytics</h4>
              <div style={{color: 'var(--accent-2)', fontSize: '0.9rem', marginBottom: '0.25rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px'}}>2023 - 2025</div>
              <div style={{color: 'var(--text-muted)'}}>University of Bolton</div>
              <div style={{color: 'var(--accent)', fontWeight: 'bold', marginTop: '0.5rem'}}>Grade: 1:1</div>
            </div>
            <div>
              <h4 style={{fontSize: '1.125rem', marginBottom: '0.5rem', color: '#fff'}}>Bachelor of Data Analytics</h4>
              <div style={{color: 'var(--accent-2)', fontSize: '0.9rem', marginBottom: '0.25rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px'}}>2020 - 2023</div>
              <div style={{color: 'var(--text-muted)'}}>University of Bolton</div>
              <div style={{color: 'var(--accent)', fontWeight: 'bold', marginTop: '0.5rem'}}>Grade: 1:1</div>
            </div>
          </div>

          <div>
            <h3 style={{marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#fff', fontSize: '1.25rem', fontWeight: '700'}}><Award color="var(--accent-2)" size={24} /> Certifications</h3>
            <div style={{display: 'flex', gap: '0.75rem', marginBottom: '1.5rem'}}>
              <Award color="var(--accent-2)" size={20} />
              <div>
                <div style={{fontWeight: 'bold', color: '#fff'}}>Azure Database Administrator</div>
                <div style={{fontSize: '0.85rem', color: 'var(--text-muted)'}}>Microsoft Certified</div>
              </div>
            </div>
            <div style={{display: 'flex', gap: '0.75rem', marginBottom: '1.5rem'}}>
              <Award color="var(--accent-2)" size={20} />
              <div>
                <div style={{fontWeight: 'bold', color: '#fff'}}>Azure Data Fundamentals</div>
                <div style={{fontSize: '0.85rem', color: 'var(--text-muted)'}}>Microsoft Certified</div>
              </div>
            </div>
            <div style={{display: 'flex', gap: '0.75rem'}}>
              <Award color="var(--accent)" size={20} />
              <div>
                <div style={{fontWeight: 'bold', color: '#fff'}}>Oracle Associate DBA</div>
                <div style={{fontSize: '0.85rem', color: 'var(--text-muted)'}}>Oracle Certified</div>
              </div>
            </div>
          </div>

          <div>
            <h3 style={{marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#fff', fontSize: '1.25rem', fontWeight: '700'}}><Zap color="var(--accent)" size={24} />Awards</h3>
            <div style={{display: 'flex', gap: '0.75rem', marginBottom: '1.5rem'}}>
              <Zap color="var(--accent)" size={20} />
              <div>
                <div style={{fontWeight: 'bold', color: '#fff'}}>Distinguished IT Student</div>
                <div style={{fontSize: '0.85rem', color: 'var(--text-muted)'}}>2025 & 2023 - BCS</div>
              </div>
            </div>
            <div style={{display: 'flex', gap: '0.75rem'}}>
              <Zap color="var(--accent-2)" size={20} />
              <div>
                <div style={{fontWeight: 'bold', color: '#fff'}}>Ministry of Digital Governance</div>
                <div style={{fontSize: '0.85rem', color: 'var(--text-muted)'}}>Award recipient</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section style={{textAlign: 'center'}}>
        <h3 style={{color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '3rem', fontSize: '0.9rem', fontWeight: '700'}}>Core Technology Stack</h3>
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
                  <Check size={18} style={{color: 'var(--accent)'}} />
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
