import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '../components/AnimatedBackground';
import { subjectsData } from '../data/questions';

export const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', icon: '🏠', path: '/' },
    { name: 'Syllabus', icon: '📋', path: '/syllabus' },
    { name: 'Subjects', icon: '📚', path: '/subjects' },
    { name: 'Official Exam', icon: '🛡️', path: '/exam' },
    { name: 'SQL Master Exam', icon: '🗄️', path: '/sql-exam' },
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
  const navigate = useNavigate();
  const { searchTerm, setSearchTerm } = useTheme();
  const [showResults, setShowResults] = useState(false);
  const [isInfoModalOpen, setInfoModalOpen] = useState(false);

  const filteredSubjects = subjectsData.filter(s => 
    s.title.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 5);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setShowResults(true);
  };

  const selectResult = (id) => {
    navigate(`/subject/${id}`);
    setSearchTerm('');
    setShowResults(false);
  };

  return (
    <div className="top-header">
      <button type="button" className="hamburger" onClick={onToggleSidebar} aria-label="Open sidebar">☰</button>
      <div className="search-bar-container" style={{ position: 'relative', flex: 1, maxWidth: '500px' }}>
        <div className="search-bar">
          <span>🔍</span>
          <input 
            type="text" 
            placeholder="Search subjects..." 
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={() => setShowResults(true)}
            onBlur={() => setTimeout(() => setShowResults(false), 200)}
          />
        </div>
        {showResults && searchTerm && (
          <div className="search-results-dropdown">
            {filteredSubjects.length > 0 ? (
              filteredSubjects.map(s => (
                <div key={s.id} className="search-result-item" onMouseDown={() => selectResult(s.id)}>
                  <span className="result-icon">📚</span>
                  <span className="result-title">{s.title}</span>
                </div>
              ))
            ) : (
              <div className="no-results-item">No subjects found</div>
            )}
          </div>
        )}
      </div>
      <div className="header-actions">
        <div 
          className="info-icon-btn" 
          onClick={() => setInfoModalOpen(true)}
          title="About This Platform"
          style={{ fontSize: '1.4rem', cursor: 'pointer', opacity: 0.8 }}
        >
          ℹ️
        </div>
        <div className="notification-icon" style={{fontSize: '1.5rem', cursor: 'pointer'}}>🔔</div>
        <div className="user-profile">
          <div className="user-avatar">JD</div>
          <span className="desktop-only" style={{fontWeight: 600, marginLeft: '8px'}}>John Doe</span>
        </div>
      </div>

      {isInfoModalOpen && (
        <div className="info-modal-overlay" onClick={() => setInfoModalOpen(false)}>
          <div className="info-modal-content" onClick={e => e.stopPropagation()}>
            <div className="info-modal-header">
              <h3>About This Platform</h3>
              <button className="info-modal-close" onClick={() => setInfoModalOpen(false)}>✖ Close</button>
            </div>
            <div className="info-modal-body">
              <p>This website is designed for students to practice MCQ questions, revise important concepts, and prepare for exams efficiently.</p>
              <p>You can attempt unit-wise tests, download study materials, and track your learning progress.</p>
              <p>Make it a habit to practice daily and strengthen your understanding step by step.</p>
            </div>
          </div>
        </div>
      )}
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
  
  // Real History Logic
  const [testHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('edqualis-test-history') || '[]');
    } catch (e) {
      return [];
    }
  });

  // Hover state for tooltips
  const [hoveredPoint, setHoveredPoint] = useState(null);
  
  // QOTD State
  const [qotdAnswerRevealed, setQotdAnswerRevealed] = useState(false);
  const qotd = {
    question: "Which of the following describes 'integrity' in professional ethics?",
    options: ["Being honest and having strong moral principles", "Maximizing profit at all costs", "Following orders blindly", "Avoiding all conflicts"],
    correctAnswer: 0
  };
  
  // Calculate Global Stats
  const totalSubjects = subjectsData.filter(s => !s.locked).length;
  const totalUnits = subjectsData.reduce((acc, sub) => acc + sub.units.length, 0);
  
  const { searchTerm, setSearchTerm } = useTheme();
  
  // Actually counting questions from the imported modules for accurate total
  const totalQuestionsInSystem = subjectsData.reduce((acc, sub) => {
    return acc + sub.units.reduce((uAcc, unit) => uAcc + unit.questions.length, 0);
  }, 0);

  // Aggregate Stats from history
  const realTestsCompleted = testHistory.length;
  const realQuestionsAnswered = testHistory.reduce((acc, curr) => acc + curr.total, 0);
  const realAvgAccuracy = realTestsCompleted > 0 
    ? Math.round(testHistory.reduce((acc, curr) => acc + curr.accuracy, 0) / realTestsCompleted) 
    : 0;

  // Chart Logic
  // We want to show cumulative questions answered over time
  const getGraphData = () => {
    if (testHistory.length === 0) return [];
    
    let cumulative = 0;
    return testHistory.slice(-7).map((test, index) => {
      cumulative += test.total;
      return {
        cumulative,
        accuracy: test.accuracy,
        unitTitle: test.unitTitle,
        timestamp: new Date(test.timestamp).toLocaleDateString()
      };
    });
  };

  const graphData = getGraphData();
  const maxQuestions = graphData.length > 0 ? Math.max(...graphData.map(d => d.cumulative), 50) : 50;
  const overallProgressPercent = totalUnits > 0 ? Math.round((completedUnits.length / totalUnits) * 100) : 0;

  // Find Continue Learning (First subject with progress < 100 and > 0)
  const lastActiveSubject = subjectsData.find(s => {
    if (s.locked || s.units.length === 0) return false;
    const sUnits = s.units.map(u => u.id);
    const completed = sUnits.filter(id => completedUnits.includes(id)).length;
    return completed > 0 && completed < sUnits.length;
  });

  // Filter subjects based on searchTerm
  const displaySubjects = subjectsData.filter(s => 
    s.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

          <div className="motivation-banner">
            <h3>"Consistency beats intensity. Practice a little every day."</h3>
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
                <button className="feature-btn" onClick={() => navigate('/materials')}>
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
              <h2 className="section-title"><span>📈</span> My Progress</h2>
            </div>
            
            <div className="analytics-container">
              {/* Dynamic Line Chart Section */}
              <div className="analytics-card chart-card">
                <div className="chart-header">
                  <h3>Learning Growth</h3>
                  <span>Questions Attempted</span>
                </div>
                
                <div className="simple-line-chart">
                  <div className="chart-y-axis">
                    <span>{maxQuestions}</span>
                    <span>{Math.round(maxQuestions / 2)}</span>
                    <span>0</span>
                  </div>
                  <div className="chart-graph-area">
                    {graphData.length > 1 ? (
                      <svg viewBox="0 0 400 200" className="chart-svg" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.4)" />
                            <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
                          </linearGradient>
                        </defs>
                        {/* Area Path */}
                        <path 
                          d={`M 0,200 ${graphData.map((d, i) => 
                            `L ${(i / (graphData.length - 1)) * 400},${200 - (d.cumulative / maxQuestions) * 180}`
                          ).join(' ')} L 400,200 Z`} 
                          fill="url(#chartGradient)" 
                        />
                        {/* Line Path */}
                        <polyline 
                          points={graphData.map((d, i) => 
                            `${(i / (graphData.length - 1)) * 400},${200 - (d.cumulative / maxQuestions) * 180}`
                          ).join(' ')} 
                          fill="none" 
                          stroke="#3b82f6" 
                          strokeWidth="4" 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                        />
                        
                        {/* Tooltip Data Points */}
                        {graphData.map((d, i) => (
                          <g 
                            key={i}
                            onMouseEnter={() => setHoveredPoint({ ...d, x: (i / (graphData.length - 1)) * 400, y: 200 - (d.cumulative / maxQuestions) * 180 })}
                            onMouseLeave={() => setHoveredPoint(null)}
                            style={{ cursor: 'pointer' }}
                          >
                            <circle 
                              cx={(i / (graphData.length - 1)) * 400} 
                              cy={200 - (d.cumulative / maxQuestions) * 180} 
                              r="6" 
                              fill="#1e293b" 
                              stroke="#3b82f6" 
                              strokeWidth="3" 
                            />
                          </g>
                        ))}
                      </svg>
                    ) : (
                      <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '0.9rem' }}>
                        Complete {graphData.length === 0 ? 'a test' : 'more tests'} to see growth data
                      </div>
                    )}
                    
                    {/* Tooltip Popup */}
                    {hoveredPoint && (
                      <div style={{
                        position: 'absolute',
                        left: `${(hoveredPoint.x / 400) * 100}%`,
                        top: `${(hoveredPoint.y / 200) * 100}%`,
                        transform: 'translate(-50%, -120%)',
                        background: '#1e293b',
                        border: '1px solid rgba(255,255,255,0.1)',
                        padding: '10px 14px',
                        borderRadius: '12px',
                        zIndex: 100,
                        pointerEvents: 'none',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                        minWidth: '150px'
                      }}>
                        <div style={{ color: 'white', fontWeight: 700, fontSize: '0.9rem', marginBottom: '4px' }}>{hoveredPoint.unitTitle}</div>
                        <div style={{ color: '#94a3b8', fontSize: '0.8rem', display: 'flex', justifyContent: 'space-between' }}>
                          <span>Total Answered:</span>
                          <span style={{ color: 'white' }}>{hoveredPoint.cumulative}</span>
                        </div>
                        <div style={{ color: '#94a3b8', fontSize: '0.8rem', display: 'flex', justifyContent: 'space-between' }}>
                          <span>Accuracy:</span>
                          <span style={{ color: '#22c55e' }}>{hoveredPoint.accuracy}%</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="chart-x-axis">
                    {graphData.length > 0 ? (
                      graphData.map((d, i) => <span key={i}>T{i + 1}</span>)
                    ) : (
                      <><span>-</span><span>-</span><span>-</span><span>-</span></>
                    )}
                  </div>
                </div>
              </div>

              {/* Real Circular Progress Section */}
              <div className="analytics-card progress-circle-card">
                <h3>Overall Progress</h3>
                <div className="analytics-circle-wrapper">
                  <svg viewBox="0 0 160 160" className="analytics-circle-svg">
                    <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="12" />
                    <circle 
                      cx="80" cy="80" r="70" 
                      fill="none" 
                      stroke="url(#progressGradient)" 
                      strokeWidth="12" 
                      strokeLinecap="round" 
                      strokeDasharray="439.8" 
                      strokeDashoffset={439.8 * (1 - overallProgressPercent / 100)} 
                      style={{ transform: 'rotate(-90deg)', transformOrigin: 'center', transition: 'stroke-dashoffset 1.5s ease' }}
                    />
                    <defs>
                      <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="circle-inner-text">
                    <span className="percent">{overallProgressPercent}%</span>
                    <span className="label">Completed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Real Stats Summary */}
            <div className="analytics-stats-grid" style={{ marginTop: '24px' }}>
              <div className="analytics-stat-card">
                <div className="stat-icon-wrapper blue">📋</div>
                <div className="stat-details">
                  <span className="stat-label">Tests Attempted</span>
                  <span className="stat-value">{realTestsCompleted}</span>
                </div>
              </div>
              <div className="analytics-stat-card">
                <div className="stat-icon-wrapper purple">📝</div>
                <div className="stat-details">
                  <span className="stat-label">Questions Answered</span>
                  <span className="stat-value">{realQuestionsAnswered}</span>
                </div>
              </div>
              <div className="analytics-stat-card">
                <div className="stat-icon-wrapper green">🎯</div>
                <div className="stat-details">
                  <span className="stat-label">Avg. Accuracy</span>
                  <span className="stat-value">{realAvgAccuracy}%</span>
                </div>
              </div>
            </div>
          </div>


          <div className="daily-widgets-grid">
            {/* Daily Practice */}
            <div className="dashboard-section" style={{marginBottom: 0}}>
              <div className="section-header">
                <h2 className="section-title"><span>🎯</span> Daily Practice</h2>
              </div>
              <div className="widget-card daily-practice-card">
                <div className="widget-icon">⭐</div>
                <div className="widget-info">
                  <h4>Today's Goal: Practice 10 Questions</h4>
                  <div className="progress-text">Progress: 4 / 10 Questions</div>
                  <div className="progress-track" style={{ height: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden', marginTop: '8px' }}>
                    <div className="progress-thumb" style={{ width: '40%', height: '100%', background: 'linear-gradient(90deg, #3b82f6, #60a5fa)', transition: 'width 1s ease' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Question of the Day */}
            <div className="dashboard-section" style={{marginBottom: 0}}>
              <div className="section-header">
                <h2 className="section-title"><span>💡</span> Question of the Day</h2>
              </div>
              <div className="widget-card qotd-card">
                <p className="qotd-text">{qotd.question}</p>
                
                {qotdAnswerRevealed && (
                  <div className="qotd-options">
                    {qotd.options.map((opt, idx) => (
                      <div key={idx} className={`qotd-opt ${idx === qotd.correctAnswer ? 'correct' : 'incorrect'}`}>
                        {opt}
                      </div>
                    ))}
                  </div>
                )}
                
                {!qotdAnswerRevealed && (
                  <button className="feature-btn reveal-btn" onClick={() => setQotdAnswerRevealed(true)}>
                    Reveal Answer
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="dashboard-section">
            <div className="section-header">
              <h2 className="section-title"><span>🚀</span> Available Subjects</h2>
            </div>
            {displaySubjects.length > 0 ? (
              <div className="dashboard-grid">
                {displaySubjects.map((subject, index) => (
                  <SubjectCard key={subject.id} subject={subject} index={index} />
                ))}
              </div>
            ) : (
              <div className="no-search-results">
                <div className="no-results-icon">🔍</div>
                <h3>No subjects found</h3>
                <p>Try searching with a different subject name.</p>
                <button className="btn-clear-search" onClick={() => setSearchTerm('')}>Clear Search</button>
              </div>
            )}
          </div>
        </div>

        {/* OPTIONAL RIGHT PANEL */}
        <div className="right-panel-column">
          
          <div className="right-panel-section">
            <h3 className="right-panel-title">Quick Actions</h3>
            <div className="action-buttons-vertical">
              <button className="panel-action-btn start-test-btn" onClick={() => navigate('/subjects')}>
                <span className="btn-icon">▶️</span>
                <span>Start New Test</span>
              </button>
              <button className="panel-action-btn view-results-btn" onClick={() => navigate('/result')}>
                <span className="btn-icon">📊</span>
                <span>View Results</span>
              </button>
            </div>
          </div>

          <div className="right-panel-section" style={{ marginTop: '32px' }}>
            <h3 className="right-panel-title">Notifications</h3>
            <div className="notifications-list">
              <div className="notification-card">
                <div className="notif-icon" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>📅</div>
                <div className="notif-content">
                  <h4>Upcoming Exam</h4>
                  <p>Operating Systems unit test is scheduled for tomorrow.</p>
                </div>
              </div>
              <div className="notification-card">
                <div className="notif-icon" style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' }}>🏆</div>
                <div className="notif-content">
                  <h4>High Score Achieved</h4>
                  <p>You scored 90% in Industrial Ethics Unit 1.</p>
                </div>
              </div>
              <div className="notification-card">
                <div className="notif-icon" style={{ background: 'rgba(168, 85, 247, 0.1)', color: '#a855f7' }}>📚</div>
                <div className="notif-content">
                  <h4>New Notes Available</h4>
                  <p>Combinatorial Studies notes have been updated.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="right-panel-section" style={{ marginTop: '32px' }}>
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
                  <h2>{totalQuestionsInSystem}</h2>
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
