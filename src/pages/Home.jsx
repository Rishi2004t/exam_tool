import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { subjectsData } from '../data/questions';

export const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', icon: '🏠', path: '/' },
    { name: 'Subjects', icon: '📚', path: '/subjects' },
    { name: 'My Results', icon: '📈', path: '/result' },
    { name: 'Settings', icon: '⚙️', path: '/settings' },
  ];

  const handleNav = (path) => {
    navigate(path);
    if (window.innerWidth <= 1024 && onClose) onClose();
  };

  return (
    <div className={`sidebar ${isOpen ? 'mobile-open' : 'closed'}`}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', padding: '0 10px'}}>
        <div className="sidebar-logo" style={{marginBottom: 0}}>Ed<span>Qualis</span></div>
        <button type="button" className="sidebar-close-btn" onClick={onClose} aria-label="Close sidebar">✕</button>
      </div>
      <ul className="sidebar-menu">
        {menuItems.map((item) => (
          <li 
            key={item.name} 
            className={`sidebar-item ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => handleNav(item.path)}
          >
            <i>{item.icon}</i>
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const TopHeader = ({ onToggleSidebar }) => {
  return (
    <div className="top-header">
      <button type="button" className="hamburger" onClick={onToggleSidebar} aria-label="Open sidebar">☰</button>
      <div className="search-bar">
        <span>🔍</span>
        <input type="text" placeholder="Search..." />
      </div>
      <div className="header-actions">
        <div className="notification-icon" style={{fontSize: '1.5rem', cursor: 'pointer'}}>🔔</div>
        <div className="user-profile">
          <div className="user-avatar">JD</div>
          <span className="desktop-only" style={{fontWeight: 600, marginLeft: '8px'}}>John Doe</span>
        </div>
      </div>
    </div>
  );
};

export const Layout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth > 1024);

  // Sync sidebar state on resize to handle orientation changes
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) setSidebarOpen(true);
      else setSidebarOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = window.innerWidth <= 1024;

  return (
    <div className="app-container">
      <div 
        className={`mobile-overlay ${isSidebarOpen && isMobile ? 'active' : ''}`} 
        onClick={() => setSidebarOpen(false)}
      ></div>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="content-wrapper">
        <TopHeader onToggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
        <div className="main-scroll-area">
          {children}
        </div>
      </div>
    </div>
  );
};

const SubjectCard = ({ subject, index }) => {
  const navigate = useNavigate();
  const completedUnits = JSON.parse(sessionStorage.getItem('edqualis-completed-units') || '[]');
  
  const subjectUnits = subject.units.map(u => u.id);
  const completedInSubject = subjectUnits.filter(id => completedUnits.includes(id)).length;
  const progress = subjectUnits.length > 0 ? Math.round((completedInSubject / subjectUnits.length) * 100) : 0;

  const handleCardClick = () => {
    if (!subject.locked) {
      navigate(`/subject/${subject.id}`);
    }
  };

  return (
    <div 
      className={`subject-card ${subject.locked ? 'locked' : ''} animate-in`} 
      style={{animationDelay: `${index * 0.1}s`}}
      onClick={handleCardClick}
    >
      <div className="card-icon-wrapper">
        {subject.locked ? '🔒' : (progress === 100 ? '✅' : (progress > 0 ? '⏳' : '📚'))}
      </div>
      <h3 style={{ marginBottom: '12px' }}>{subject.title}</h3>
      
      {!subject.locked ? (
        <div className="card-progress">
          <div className="progress-info" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600 }}>
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="progress-track" style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden', marginBottom: '24px' }}>
            <div className="progress-thumb" style={{ width: `${progress}%`, height: '100%', background: 'var(--theme-primary)', transition: 'width 0.5s ease' }}></div>
          </div>
          <button className="btn-continue" style={{ cursor: 'pointer', marginTop: 'auto' }}>
            {progress > 0 ? 'Continue Learning' : 'Start Subject'}
          </button>
        </div>
      ) : (
        <div className="locked-overlay" style={{ marginTop: 'auto', textAlign: 'center' }}>
          <span>🔒 LOCKED</span>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Complete previous modules to unlock</p>
        </div>
      )}
    </div>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const completedUnits = JSON.parse(sessionStorage.getItem('edqualis-completed-units') || '[]');
  
  // Calculate Stats
  const totalSubjects = subjectsData.filter(s => !s.locked).length;
  const totalUnits = subjectsData.reduce((acc, sub) => acc + sub.units.length, 0);
  
  // Actually counting questions from the imported modules for accurate total
  const totalQuestions = subjectsData.reduce((acc, sub) => {
    return acc + sub.units.reduce((uAcc, unit) => uAcc + unit.questions.length, 0);
  }, 0);

  // Find Continue Learning (First subject with progress < 100 and > 0)
  const lastActiveSubject = subjectsData.find(s => {
    if (s.locked || s.units.length === 0) return false;
    const sUnits = s.units.map(u => u.id);
    const completed = sUnits.filter(id => completedUnits.includes(id)).length;
    return completed > 0 && completed < sUnits.length;
  });

  return (
    <Layout>
      <div className="home-dashboard-layout animate-in">
        
        {/* MAIN CONTENT AREA */}
        <div className="main-content-column">
          <div className="dashboard-hero-header">
            <h1 className="main-title">EdQualis Dashboard</h1>
            <p className="sub-title">Your Academic Success Partner</p>
          </div>

          <div className="welcome-banner">
            <h1>Welcome back, Student!</h1>
            <p>Continue your learning journey by completing units and practicing MCQs. Your progress is looking great!</p>
          </div>

          <div className="dashboard-section">
            <div className="section-header">
              <h2 className="section-title"><span>⚡</span> Quick Actions</h2>
            </div>
            <div className="feature-cards-grid">
              <div className="feature-card pdf-feature">
                <div className="feature-card-content">
                  <div className="feature-icon">📄</div>
                  <div className="feature-text">
                    <h3>PDF Materials</h3>
                    <p>Access study notes and downloadable PDFs and PPTs for each subject.</p>
                  </div>
                </div>
                <button className="feature-btn" onClick={() => navigate('/subjects')}>
                  View Materials
                </button>
              </div>

              <div className="feature-card mcq-feature">
                <div className="feature-card-content">
                  <div className="feature-icon">📝</div>
                  <div className="feature-text">
                    <h3>MCQ Practice</h3>
                    <p>Practice unit-wise MCQ tests for each subject to improve your scores.</p>
                  </div>
                </div>
                <button className="feature-btn" onClick={() => navigate('/subjects')}>
                  Start Practice
                </button>
              </div>
            </div>
          </div>

          <div className="dashboard-section">
            <div className="section-header">
              <h2 className="section-title"><span>🚀</span> Available Subjects</h2>
            </div>
            <div className="dashboard-grid">
              {subjectsData.map((subject, index) => (
                <SubjectCard key={subject.id} subject={subject} index={index} />
              ))}
            </div>
          </div>
        </div>

        {/* OPTIONAL RIGHT PANEL */}
        <div className="right-panel-column">
          
          <div className="right-panel-section">
            <h3 className="right-panel-title">Quick Stats</h3>
            <div className="stats-vertical-grid">
              <div className="stat-card stat-card-small">
                <div className="stat-icon">📚</div>
                <div className="stat-info">
                  <h2>{totalSubjects}</h2>
                  <span>Subjects</span>
                </div>
              </div>
              <div className="stat-card stat-card-small">
                <div className="stat-icon">🎯</div>
                <div className="stat-info">
                  <h2>{completedUnits.length} / {totalUnits}</h2>
                  <span>Units Done</span>
                </div>
              </div>
              <div className="stat-card stat-card-small">
                <div className="stat-icon">📝</div>
                <div className="stat-info">
                  <h2>{totalQuestions}</h2>
                  <span>Questions</span>
                </div>
              </div>
            </div>
          </div>

          {lastActiveSubject && (
            <div className="right-panel-section" style={{ marginTop: '32px' }}>
              <h3 className="right-panel-title">Continue Learning</h3>
              <SubjectCard subject={lastActiveSubject} index={0} />
            </div>
          )}

          <div className="right-panel-section" style={{ marginTop: '32px' }}>
            <h3 className="right-panel-title">Study Resources</h3>
            <div className="shortcut-vertical">
              <div className="shortcut-card" onClick={() => navigate('/subject/industrial-ethics')}>
                <i>📄</i>
                <span>Download Notes</span>
              </div>
              <div className="shortcut-card" onClick={() => navigate('/subject/combinatorial-studies')}>
                <i>📊</i>
                <span>Download PPT</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </Layout>
  );
};

export default Home;
