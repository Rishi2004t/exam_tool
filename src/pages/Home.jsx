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
    if (onClose) onClose();
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

  return (
    <div className="app-container">
      <div className={`mobile-overlay ${isSidebarOpen && window.innerWidth <= 1024 ? 'active' : ''}`} onClick={() => setSidebarOpen(false)}></div>
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

  return (
    <div className={`subject-card ${subject.locked ? 'locked' : ''} animate-in`} style={{animationDelay: `${index * 0.1}s`}}>
      <div className="card-icon-wrapper">
        {subject.locked ? '🔒' : (progress === 100 ? '✅' : (progress > 0 ? '⏳' : '📚'))}
      </div>
      <h3>{subject.title}</h3>
      
      {!subject.locked ? (
        <div className="card-progress">
          <div className="progress-info">
            <span>Progress Tracking</span>
            <span>{progress}%</span>
          </div>
          <div className="progress-track">
            <div className="progress-thumb" style={{width: `${progress}%`}}></div>
          </div>
          <button className="btn-continue" onClick={() => navigate(`/unit/${subject.id}`)}>
            {progress > 0 ? 'Continue Learning' : 'Start Subject'}
          </button>
        </div>
      ) : (
        <div className="locked-overlay">
          <span>🔒 LOCKED</span>
          <p style={{fontSize: '0.85rem'}}>Complete previous modules to unlock</p>
        </div>
      )}
    </div>
  );
};

const Home = () => {
  return (
    <Layout>
      <h1 className="page-title">My Learning Path</h1>
      <div className="dashboard-grid">
        {subjectsData.map((subject, index) => (
          <SubjectCard key={subject.id} subject={subject} index={index} />
        ))}
      </div>
    </Layout>
  );
};

export default Home;
