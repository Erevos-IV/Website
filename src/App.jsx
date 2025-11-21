import React, { useState, useEffect } from 'react';
import { Database, Server, Shield, Activity, Terminal, Layers, Mail, Linkedin, Github, ChevronDown, Clock, Award, GraduationCap, Cloud } from 'lucide-react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  const styles = `
    /* Base Reset & Variables */
    :root {
      --bg-dark: #0f172a;
      --bg-card: #1e293b;
      --bg-card-hover: #334155;
      --text-main: #f1f5f9;
      --text-muted: #94a3b8;
      --accent: #3b82f6; /* Blue */
      --accent-hover: #2563eb;
      --border: #334155;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      background-color: #0f172a; /* Fallback for var */
      background-color: var(--bg-dark);
      color: var(--text-main);
      line-height: 1.5;
    }

    /* Layout */
    .app-container {
      min-height: 100vh;
      background-color: var(--bg-dark);
      color: var(--text-main);
    }

    /* Navigation */
    nav {
      position: fixed;
      top: 0;
      width: 100%;
      padding: 1.5rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: rgba(15, 23, 42, 0.95);
      backdrop-filter: blur(8px);
      z-index: 1000;
      border-bottom: 1px solid var(--border);
    }

    .nav-logo {
      font-size: 1.25rem;
      font-weight: 700;
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
      color: var(--text-muted);
      cursor: pointer;
      font-size: 0.95rem;
      font-weight: 500;
      transition: color 0.2s;
    }

    .nav-btn:hover, .nav-btn.active { color: var(--accent); }

    /* Hero Section */
    .hero {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 8rem 1rem 4rem;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      background-color: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 999px;
      color: var(--accent);
      font-size: 0.875rem;
      margin-bottom: 1.5rem;
    }

    .hero h1 {
      font-size: 3.5rem;
      font-weight: 800;
      margin-bottom: 1rem;
      line-height: 1.1;
    }

    .hero h2 {
      font-size: 2rem;
      color: var(--text-muted);
      margin-bottom: 2rem;
    }

    .hero p {
      max-width: 650px;
      font-size: 1.125rem;
      color: var(--text-muted);
      margin-bottom: 2.5rem;
      line-height: 1.6;
    }

    .btn-group { display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 2rem;
      border-radius: 0.5rem;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.2s;
      cursor: pointer;
      border: none;
    }

    .btn-primary {
      background-color: var(--accent);
      color: white;
    }
    .btn-primary:hover { background-color: var(--accent-hover); }

    .btn-secondary {
      background-color: var(--bg-card);
      border: 1px solid var(--border);
      color: var(--text-main);
    }
    .btn-secondary:hover { background-color: var(--bg-card-hover); }

    /* Stats Bar */
    .stats-bar {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 2rem;
      padding: 3rem 2rem;
      background-color: rgba(30, 41, 59, 0.5);
      border-top: 1px solid var(--border);
      border-bottom: 1px solid var(--border);
      text-align: center;
      max-width: 1200px;
      margin: 0 auto;
    }

    .stat-number { font-size: 2rem; font-weight: 700; margin-bottom: 0.25rem; }
    .stat-label { font-size: 0.875rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; }

    /* Sections */
    section { padding: 6rem 1.5rem; max-width: 1200px; margin: 0 auto; }

    .section-title {
      font-size: 2.5rem;
      font-weight: 700;
      text-align: center;
      margin-bottom: 4rem;
    }

    /* Grid Layouts */
    .grid-3 {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    /* Cards */
    .card {
      background-color: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 1rem;
      padding: 2rem;
      transition: transform 0.2s, border-color 0.2s;
    }

    .card:hover {
      transform: translateY(-5px);
      border-color: var(--accent);
    }

    .card-icon {
      width: 3rem;
      height: 3rem;
      background-color: rgba(59, 130, 246, 0.1);
      border-radius: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1.5rem;
      color: var(--accent);
    }

    .card h3 { font-size: 1.25rem; margin-bottom: 1rem; }
    .card ul { list-style: none; color: var(--text-muted); }
    .card li { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; font-size: 0.95rem; }
    .dot { width: 6px; height: 6px; background-color: var(--accent); border-radius: 50%; }

    /* Experience Timeline */
    .timeline-item {
      border-left: 2px solid var(--border);
      padding-left: 2rem;
      position: relative;
      margin-bottom: 3rem;
    }

    .timeline-dot {
      width: 1rem;
      height: 1rem;
      background-color: var(--accent);
      border-radius: 50%;
      position: absolute;
      left: -9px;
      top: 0;
      border: 4px solid var(--bg-dark);
    }

    .timeline-header { display: flex; justify-content: space-between; flex-wrap: wrap; margin-bottom: 0.5rem; }
    .timeline-header h3 { font-size: 1.5rem; }
    .timeline-date { color: var(--accent); display: flex; align-items: center; gap: 0.5rem; font-size: 0.9rem; font-weight: 500; }
    .timeline-company { font-size: 1.125rem; color: var(--text-muted); margin-bottom: 1rem; }
    .timeline-list li { margin-bottom: 0.5rem; display: flex; gap: 0.5rem; }

    /* Tech Chips */
    .tech-row { display: flex; flex-wrap: wrap; justify-content: center; gap: 1rem; margin-bottom: 1.5rem; }
    .tech-chip {
      padding: 0.75rem 1.5rem;
      background-color: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 2rem;
      color: var(--text-muted);
      font-size: 0.9rem;
      transition: all 0.2s;
    }
    .tech-chip:hover { border-color: var(--accent); color: var(--accent); }

    /* Footer */
    footer {
      text-align: center;
      padding: 3rem;
      background-color: #020617;
      color: var(--text-muted);
      font-size: 0.9rem;
    }

    @media (max-width: 768px) {
      .hero h1 { font-size: 2.5rem; }
      .nav-links { display: none; } /* Hide nav links on mobile */
      .timeline-header { flex-direction: column; gap: 0.5rem; }
    }
  `;

  return (
    <div className="app-container">
      <style>{styles}</style>
      
      {/* Navigation */}
      <nav>
        <div className="nav-logo">
          <Database size={24} color="#3b82f6" />
          <span>Vassileios<span style={{color: '#3b82f6'}}>.DBA</span></span>
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
          <span>Azure Certified Database Administrator</span>
        </div>
        
        <h1>Vassileios Gousetis</h1>
        <h2>SQL Server DBA & <span style={{color: '#3b82f6'}}>Infrastructure Expert</span></h2>
        
        <p>
          Dedicated to the core pillars of Database Administration: Security, Integrity, and Performance. I manage complex, multi-platform environments through rigorous patching, upgrades, and high-availability configurations.
        </p>
        
        <div className="btn-group">
          <button onClick={() => scrollToSection('experience')} className="btn btn-primary">
            View Experience <ChevronDown size={16} />
          </button>
          <a href="mailto:vasilhsgxr5000@gmail.com" className="btn btn-secondary">
            <Mail size={16} /> Contact Me
          </a>
        </div>
      </section>

      {/* Statistics */}
      <div className="stats-bar">
        <div className="stat-item">
          <div className="stat-number">SQL</div>
          <div className="stat-label">Server 2016-2025</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">Cloud</div>
          <div className="stat-label">Azure & GCP</div>
        </div>
        <div className="stat-item">
          <div className="stat-number" style={{color: '#3b82f6'}}>650+</div>
          <div className="stat-label">DBs Administered</div>
        </div>
        <div className="stat-item">
          <div className="stat-number" style={{color: '#3b82f6'}}>40TB+</div>
          <div className="stat-label">Data Managed</div>
        </div>
      </div>

      {/* Core Expertise */}
      <section id="expertise">
        <h2 className="section-title">Technical Expertise</h2>
        
        <div className="grid-3">
          <div className="card">
            <div className="card-icon"><Database /></div>
            <h3>Database Administration</h3>
            <ul>
              <li><span className="dot"></span>SQL Server 2016, 2019, 2022</li>
              <li><span className="dot"></span>Oracle RAC 11g, 12c, 19c</li>
              <li><span className="dot"></span>PostgreSQL & MySQL Clusters</li>
              <li><span className="dot"></span>Install, Patching & Upgrades</li>
            </ul>
          </div>

          <div className="card">
            <div className="card-icon" style={{color: '#10b981', backgroundColor: 'rgba(16, 185, 129, 0.1)'}}><Activity /></div>
            <h3>Performance & Monitoring</h3>
            <ul>
              <li><span className="dot" style={{backgroundColor: '#10b981'}}></span>Advanced Query Tuning</li>
              <li><span className="dot" style={{backgroundColor: '#10b981'}}></span>Solarwinds & Grafana</li>
              <li><span className="dot" style={{backgroundColor: '#10b981'}}></span>Oracle Enterprise Manager 13c</li>
              <li><span className="dot" style={{backgroundColor: '#10b981'}}></span>Wait Stats Analysis</li>
            </ul>
          </div>

          <div className="card">
            <div className="card-icon" style={{color: '#a855f7', backgroundColor: 'rgba(168, 85, 247, 0.1)'}}><Cloud /></div>
            <h3>Cloud & Automation</h3>
            <ul>
              <li><span className="dot" style={{backgroundColor: '#a855f7'}}></span>Azure Database Services</li>
              <li><span className="dot" style={{backgroundColor: '#a855f7'}}></span>Database Migration to Cloud</li>
              <li><span className="dot" style={{backgroundColor: '#a855f7'}}></span>Ansible & Powershell</li>
              <li><span className="dot" style={{backgroundColor: '#a855f7'}}></span>Google Cloud Platform</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Work Experience */}
      <section id="experience">
        <h2 className="section-title">Professional Experience</h2>

        <div className="timeline">
          
          {/* Job 1 */}
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-header">
              <h3>Database Administrator</h3>
              <span className="timeline-date"><Clock size={16} /> Aug 2025 - Present</span>
            </div>
            <div className="timeline-company">Athens Exchange Group (ATHEX)</div>
            <ul className="timeline-list">
              <li><span style={{color:'#3b82f6'}}>▹</span> Managing Google Cloud Database & Infrastructure technologies.</li>
              <li><span style={{color:'#3b82f6'}}>▹</span> Executing installations, upgrades, and patching for Oracle, SQL Server, and PostgreSQL.</li>
              <li><span style={{color:'#3b82f6'}}>▹</span> Performing complex migrations (Oracle versions & SQL Server upgrades).</li>
              <li><span style={{color:'#3b82f6'}}>▹</span> Monitoring performance via OEM 13c, Grafana, and Solarwinds.</li>
              <li><span style={{color:'#3b82f6'}}>▹</span> Automating daily tasks using Ansible and Terraform.</li>
            </ul>
          </div>

          {/* Job 2 */}
          <div className="timeline-item">
            <div className="timeline-dot" style={{backgroundColor: '#475569'}}></div>
            <div className="timeline-header">
              <h3>Researcher & Informatics Specialist</h3>
              <span className="timeline-date" style={{color: '#94a3b8'}}><Clock size={16} /> Sep 2024 - June 2025</span>
            </div>
            <div className="timeline-company">Hellenic Military Units Administration</div>
            <ul className="timeline-list">
               <li><span>▹</span> Provided full technical support for specialized applications on the Army network.</li>
               <li><span>▹</span> Programmed secure applications using SQL and Python.</li>
               <li><span>▹</span> Optimized the Army ecosystem and managed large-scale file systems.</li>
            </ul>
          </div>

          {/* Job 3 */}
          <div className="timeline-item">
            <div className="timeline-dot" style={{backgroundColor: '#475569'}}></div>
            <div className="timeline-header">
              <h3>Data Engineer</h3>
              <span className="timeline-date" style={{color: '#94a3b8'}}><Clock size={16} /> Nov 2023 - May 2024</span>
            </div>
            <div className="timeline-company">Ernst & Young</div>
            <ul className="timeline-list">
               <li><span>▹</span> Executed data transformation using Python, SQL, and SSIS for Credit Risk analysis.</li>
               <li><span>▹</span> Managed configuration in CDM (Certent Disclosure Management).</li>
               <li><span>▹</span> Utilized Risk Confidence (Moody's) tools for loan prediction rates.</li>
            </ul>
          </div>

           {/* Job 4 */}
           <div className="timeline-item">
            <div className="timeline-dot" style={{backgroundColor: '#475569'}}></div>
            <div className="timeline-header">
              <h3>Database Administrator</h3>
              <span className="timeline-date" style={{color: '#94a3b8'}}><Clock size={16} /> July 2022 - Nov 2023</span>
            </div>
            <div className="timeline-company">Netcompany - Instasoft</div>
            <ul className="timeline-list">
               <li><span>▹</span> Administered and maintained databases ensuring security and reliability.</li>
               <li><span>▹</span> Monitored performance, including deep query analysis and index tuning.</li>
               <li><span>▹</span> Designed table partitioning and archiving processes.</li>
               <li><span>▹</span> Implemented backup and recovery procedures.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Education */}
      <section id="education" style={{backgroundColor: '#1e293b', borderRadius: '1rem', padding: '3rem'}}>
        <div className="grid-3">
          <div>
            <h3 style={{marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}><GraduationCap color="#3b82f6"/> Education</h3>
            <div style={{marginBottom: '2rem'}}>
              <h4>Master of Data Analytics</h4>
              <div style={{color: '#3b82f6', fontSize: '0.9rem'}}>2023 - 2025</div>
              <div style={{color: '#94a3b8'}}>University of Bolton</div>
              <div style={{color: '#10b981', fontWeight: 'bold'}}>Grade: 1:1</div>
            </div>
            <div>
              <h4>Bachelor of Data Analytics</h4>
              <div style={{color: '#3b82f6', fontSize: '0.9rem'}}>2020 - 2023</div>
              <div style={{color: '#94a3b8'}}>University of Bolton</div>
              <div style={{color: '#10b981', fontWeight: 'bold'}}>Grade: 1:1</div>
            </div>
          </div>

          <div>
            <h3 style={{marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}><Award color="#f59e0b"/> Honors & Awards</h3>
            <div style={{display: 'flex', gap: '1rem', marginBottom: '1.5rem'}}>
               <Award color="#f59e0b" />
               <div>
                 <div style={{fontWeight: 'bold'}}>Distinguished IT Student (2025)</div>
                 <div style={{fontSize: '0.85rem', color: '#94a3b8'}}>BCS, Ministry of Digital Governance</div>
               </div>
            </div>
            <div style={{display: 'flex', gap: '1rem', marginBottom: '1.5rem'}}>
               <Award color="#f59e0b" />
               <div>
                 <div style={{fontWeight: 'bold'}}>Distinguished IT Student (2023)</div>
                 <div style={{fontSize: '0.85rem', color: '#94a3b8'}}>BCS, Ministry of Digital Governance</div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section style={{textAlign: 'center'}}>
        <h3 style={{color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '2rem'}}>Technologies</h3>
        <div className="tech-row">
          {['SQL Server 2016-2025', 'Oracle RAC 19c', 'PostgreSQL', 'MySQL', 'MariaDB'].map(t => <span key={t} className="tech-chip">{t}</span>)}
        </div>
        <div className="tech-row">
           {['Azure Database Services', 'Google Cloud', 'Ansible', 'Terraform', 'PowerShell'].map(t => <span key={t} className="tech-chip">{t}</span>)}
        </div>
        <div className="tech-row">
           {['Grafana', 'Solarwinds', 'OEM 13c', 'Python', 'SSIS'].map(t => <span key={t} className="tech-chip">{t}</span>)}
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div style={{marginBottom: '1rem'}}>
          <a href="mailto:vasilhsgxr5000@gmail.com" style={{color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.2rem'}}>vasilhsgxr5000@gmail.com</a>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem'}}>
          <a href="https://www.linkedin.com/in/vasileiosgoysetis-7378101b9" className="btn btn-secondary" target="_blank">LinkedIn</a>
        </div>
        <p>© {new Date().getFullYear()} Vassileios Gousetis. Built with React.</p>
      </footer>

    </div>
  );
};

export default Portfolio;