import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { subjectsData } from '../data/questions';

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', icon: '🏠', path: '/' },
    { name: 'Subjects', icon: '📚', path: '/subjects' },
    { name: 'My Results', icon: '📈', path: '/result' },
    { name: 'Settings', icon: '⚙️', path: '/settings' },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-logo">Ed<span>Qualis</span></div>
      <ul className="sidebar-menu">
        {menuItems.map((item) => (
          <li 
            key={item.name} 
            className={`sidebar-item ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <i>{item.icon}</i>
            <span>{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const TopHeader = () => {
  return (
    <div className="top-header">
      <div className="search-bar">
        <span>🔍</span>
        <input type="text" placeholder="Search subjects, units..." />
      </div>
      <div className="header-actions">
        <div className="notification-icon" style={{fontSize: '1.5rem', cursor: 'pointer'}}>🔔</div>
        <div className="user-profile">
          <div className="user-avatar">JD</div>
          <div style={{fontWeight: 600}}>John Doe</div>
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
    <div className="app-container">
      <Sidebar />
      <div className="content-wrapper">
        <TopHeader />
        <div className="main-scroll-area">
          <h1 className="page-title">My Learning Path</h1>
          <div className="dashboard-grid">
            {subjectsData.map((subject, index) => (
              <SubjectCard key={subject.id} subject={subject} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
