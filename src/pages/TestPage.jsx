import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { subjectsData } from '../data/questions';

const TestPage = () => {
  const { unitId } = useParams();
  const navigate = useNavigate();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(1200); // 20 mins

  // Find subject and unit
  let currentUnit = null;
  let subjectTitle = '';
  
  subjectsData.forEach(sub => {
    const unit = sub.units.find(u => u.id === unitId);
    if (unit) {
      currentUnit = unit;
      subjectTitle = sub.title;
    }
  });

  const testQuestions = currentUnit?.questions || [];
  const unitTitle = currentUnit?.title || '';

  useEffect(() => {
    if (timeLeft <= 0) {
      handleFinish();
      return;
    }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleAnswerSelect = (optionIndex) => {
    setAnswers({ ...answers, [currentQuestionIndex]: optionIndex });
  };

  const handleFinish = () => {
    navigate('/result', { 
      state: { 
        answers, 
        testQuestions, 
        studentName: localStorage.getItem('studentName') || 'Guest Candidate',
        subjectTitle,
        unitTitle,
        unitId
      } 
    });
  };

  if (!currentUnit) return <div style={{color: 'white', padding: '100px', textAlign: 'center'}}>Assessmet loading...</div>;

  const currentQuestion = testQuestions[currentQuestionIndex];

  return (
    <div className="test-container animate-in">
      {/* Test Header */}
      <div className="test-header">
        <div style={{color: 'white'}}>
          <div style={{fontSize: '0.85rem', fontWeight: 700, opacity: 0.6, textTransform: 'uppercase'}}>{subjectTitle}</div>
          <div style={{fontSize: '1.25rem', fontWeight: 800}}>{unitTitle}</div>
        </div>
        <div className="test-header-timer">
          <div style={{ background: 'rgba(59, 130, 246, 0.2)', padding: '10px 24px', borderRadius: '12px', border: '1px solid var(--theme-primary)', color: 'var(--theme-primary)', fontWeight: 800, fontSize: '1.2rem', marginRight: '20px' }}>
            ⏱️ {formatTime(timeLeft)}
          </div>
          <button className="btn btn-primary" onClick={handleFinish} style={{padding: '12px 24px', fontSize: '1rem'}}>Submit Final</button>
        </div>
      </div>

      <div className="test-content-layout">
        {/* Question Area */}
        <div className="test-question-section">
          <div className="settings-section test-question-card" style={{ padding: '60px', borderRadius: '32px', marginBottom: 0 }}>
             <div style={{marginBottom: '32px', display: 'flex', flexDirection: 'column', gap: '12px'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                   <span style={{background: 'var(--theme-primary)', color: 'white', padding: '6px 16px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 800}}>QUESTION {currentQuestionIndex + 1} OF {testQuestions.length}</span>
                   <span style={{color: '#94a3b8', fontSize: '0.9rem', fontWeight: 600}}>{Math.round(((currentQuestionIndex + 1) / testQuestions.length) * 100)}% Complete</span>
                </div>
                <div style={{height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden'}}>
                   <div style={{height: '100%', background: 'var(--theme-primary)', width: `${((currentQuestionIndex + 1) / testQuestions.length) * 100}%`, transition: 'width 0.3s ease'}}></div>
                </div>
             </div>
             <h2 className="question-text" style={{fontSize: '2rem', lineHeight: 1.4, marginBottom: '48px', fontWeight: 700}}>{currentQuestion.text}</h2>
             
             <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                {currentQuestion.options.map((opt, i) => (
                  <button 
                    key={i}
                    className="option-button"
                    onClick={() => handleAnswerSelect(i)}
                    style={{
                      textAlign: 'left',
                      padding: '24px 32px',
                      borderRadius: '16px',
                      background: answers[currentQuestionIndex] === i ? 'var(--theme-primary)' : 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: 'white',
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <span style={{marginRight: '20px', opacity: 0.5}}>{String.fromCharCode(65 + i)}.</span> {opt}
                  </button>
                ))}
             </div>
          </div>

          <div className="nav-buttons-footer" style={{display: 'flex', gap: '20px', justifyContent: 'center'}}>
            <button 
              className="btn btn-secondary" 
              disabled={currentQuestionIndex === 0}
              onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
              style={{padding: '16px 40px', minWidth: '180px'}}
            >
              Previous
            </button>
            <button 
              className="btn btn-primary"
              disabled={currentQuestionIndex === testQuestions.length - 1}
              onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
              style={{padding: '16px 40px', minWidth: '180px'}}
            >
              Next Question
            </button>
          </div>
        </div>

        {/* Sidebar Mini Navigation */}
        <div className="test-sidebar-palette">
          <div className="settings-section" style={{padding: '24px'}}>
            <h4 style={{marginBottom: '20px', opacity: 0.6}}>QUESTION PALETTE</h4>
            <div className="question-palette-grid">
              {testQuestions.map((_, i) => (
                <div 
                  key={i}
                  onClick={() => setCurrentQuestionIndex(i)}
                  style={{
                    height: '40px',
                    borderRadius: '8px',
                    background: answers[i] !== undefined ? 'var(--theme-primary)' : (currentQuestionIndex === i ? 'white' : 'rgba(255,255,255,0.1)'),
                    color: currentQuestionIndex === i && answers[i] === undefined ? 'black' : 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    border: currentQuestionIndex === i ? '2px solid var(--theme-primary)' : 'none'
                  }}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
