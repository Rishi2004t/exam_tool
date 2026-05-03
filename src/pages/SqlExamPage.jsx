import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { sqlQuestions } from '../data/sqlQuestions';

const SqlExamPage = () => {
  const navigate = useNavigate();
  
  // Security check: Check if token exists in session
  const sqlExamToken = sessionStorage.getItem('sqlExamToken');
  
  useEffect(() => {
    if (!sqlExamToken) {
      navigate('/sql-exam');
    }
    
    // Check if already attempted
    const usedTokens = JSON.parse(localStorage.getItem('usedTokens') || '[]');
    if (usedTokens.includes(sqlExamToken)) {
      navigate('/sql-exam');
    }
  }, [sqlExamToken, navigate]);

  const examQuestions = sqlQuestions;
  const examTitle = "SQL Master Examination";
  const subjectTitle = "Database Management";

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0 && !isSubmitted) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => {
      if (!isSubmitted) {
        setTimeLeft(prev => prev - 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isSubmitted]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleAnswerSelect = (optionIndex) => {
    if (isSubmitted) return;
    setAnswers({ ...answers, [currentQuestionIndex]: optionIndex });
  };

  const handleSubmit = () => {
    if (isSubmitted) return;
    setIsSubmitted(true);

    // Save token as used (One-time use logic)
    const usedTokens = JSON.parse(localStorage.getItem('usedTokens') || '[]');
    if (!usedTokens.includes(sqlExamToken)) {
      usedTokens.push(sqlExamToken);
      localStorage.setItem('usedTokens', JSON.stringify(usedTokens));
    }

    // Navigate to result
    navigate('/result', { 
      state: { 
        answers, 
        testQuestions: examQuestions, 
        studentName: localStorage.getItem('studentName') || 'SQL Candidate',
        subjectTitle: subjectTitle,
        unitTitle: examTitle,
        unitId: 'sql-exam-mode',
        timeTaken: 1800 - timeLeft
      } 
    });
  };

  if (!sqlExamToken || !examQuestions.length) return null;

  const currentQuestion = examQuestions[currentQuestionIndex];

  return (
    <div className="test-container animate-in">
      {/* Exam Header */}
      <div className="test-header" style={{
        background: 'rgba(15, 23, 42, 0.9)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        padding: '20px 40px',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{color: 'white'}}>
          <div style={{fontSize: '0.85rem', fontWeight: 700, opacity: 0.6, textTransform: 'uppercase', letterSpacing: '1px'}}>{subjectTitle}</div>
          <div style={{fontSize: '1.6rem', fontWeight: 800, color: 'var(--theme-primary)', textShadow: '0 0 20px rgba(59, 130, 246, 0.3)'}}>{examTitle}</div>
        </div>
        <div className="test-header-timer" style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ 
            background: timeLeft < 300 ? 'rgba(239, 68, 68, 0.2)' : 'rgba(59, 130, 246, 0.1)', 
            padding: '12px 28px', 
            borderRadius: '14px', 
            border: `2px solid ${timeLeft < 300 ? '#ef4444' : 'var(--theme-primary)'}`, 
            color: timeLeft < 300 ? '#ef4444' : 'var(--theme-primary)', 
            fontWeight: 900, 
            fontSize: '1.5rem', 
            marginRight: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            minWidth: '140px',
            justifyContent: 'center',
            boxShadow: timeLeft < 300 ? '0 0 15px rgba(239, 68, 68, 0.2)' : 'none'
          }}>
            <span>{timeLeft < 300 ? '⚠️' : '⏱️'}</span>
            {formatTime(timeLeft)}
          </div>
          <button 
            className="btn btn-primary" 
            onClick={handleSubmit} 
            style={{
              padding: '14px 36px', 
              fontSize: '1.1rem',
              borderRadius: '14px',
              background: '#ef4444',
              fontWeight: 800,
              boxShadow: '0 6px 15px rgba(239, 68, 68, 0.4)',
              cursor: 'pointer',
              border: 'none',
              transition: 'all 0.3s'
            }}
            onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
          >
            Submit Exam
          </button>
        </div>
      </div>

      <div className="test-content-layout" style={{ marginTop: '40px', gap: '32px' }}>
        {/* Question Area */}
        <div className="test-question-section" style={{ flex: 1 }}>
          <div className="settings-section test-question-card" style={{ 
            padding: '48px', 
            borderRadius: '32px', 
            marginBottom: 0,
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 15px 35px rgba(0,0,0,0.2)'
          }}>
             <div style={{marginBottom: '40px', display: 'flex', flexDirection: 'column', gap: '16px'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                   <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <span style={{background: 'var(--theme-primary)', color: 'white', padding: '8px 20px', borderRadius: '12px', fontSize: '0.9rem', fontWeight: 800, letterSpacing: '0.5px'}}>
                        QUESTION {currentQuestionIndex + 1} / {examQuestions.length}
                      </span>
                      <span style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: 700 }}>
                        {currentQuestionIndex < 25 ? 'Theory Concept' : 'SQL Query/Code'}
                      </span>
                   </div>
                   <span style={{color: 'var(--theme-primary)', fontSize: '1rem', fontWeight: 800}}>{Math.round(((currentQuestionIndex + 1) / examQuestions.length) * 100)}%</span>
                </div>
                <div style={{height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden'}}>
                   <div style={{height: '100%', background: 'linear-gradient(90deg, var(--theme-primary), #60a5fa)', width: `${((currentQuestionIndex + 1) / examQuestions.length) * 100}%`, transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)'}}></div>
                </div>
             </div>
             
             <div style={{ 
               background: currentQuestionIndex >= 25 ? 'rgba(0,0,0,0.2)' : 'transparent',
               padding: currentQuestionIndex >= 25 ? '32px' : '0',
               borderRadius: '20px',
               border: currentQuestionIndex >= 25 ? '1px solid rgba(255,255,255,0.05)' : 'none',
               marginBottom: '48px'
             }}>
               <h2 className="question-text" style={{
                 fontSize: '1.8rem', 
                 lineHeight: 1.5, 
                 fontWeight: 700,
                 color: 'white',
                 fontFamily: currentQuestionIndex >= 25 ? 'Fira Code, monospace' : 'inherit'
               }}>{currentQuestion.text}</h2>
             </div>
             
             <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
                {currentQuestion.options.map((opt, i) => (
                  <button 
                    key={i}
                    className="option-button"
                    onClick={() => handleAnswerSelect(i)}
                    style={{
                      textAlign: 'left',
                      padding: '24px 32px',
                      borderRadius: '20px',
                      background: answers[currentQuestionIndex] === i ? 'var(--theme-primary)' : 'rgba(255,255,255,0.03)',
                      border: answers[currentQuestionIndex] === i ? '2px solid var(--theme-primary)' : '2px solid rgba(255,255,255,0.08)',
                      color: 'white',
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                      display: 'flex',
                      alignItems: 'center',
                      minHeight: '80px'
                    }}
                  >
                    <span style={{
                      marginRight: '20px', 
                      background: answers[currentQuestionIndex] === i ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.08)',
                      width: '40px',
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '12px',
                      fontSize: '1.1rem',
                      fontWeight: 800,
                      flexShrink: 0
                    }}>{String.fromCharCode(65 + i)}</span> 
                    {opt}
                  </button>
                ))}
             </div>
          </div>

          <div className="nav-buttons-footer" style={{display: 'flex', gap: '24px', justifyContent: 'center', marginTop: '40px'}}>
            <button 
              className="btn btn-secondary" 
              disabled={currentQuestionIndex === 0}
              onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
              style={{
                padding: '18px 48px', 
                minWidth: '200px',
                borderRadius: '18px',
                fontSize: '1.1rem',
                fontWeight: 700,
                opacity: currentQuestionIndex === 0 ? 0.3 : 1,
                cursor: currentQuestionIndex === 0 ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px'
              }}
            >
              <span>←</span> Previous
            </button>
            <button 
              className="btn btn-primary"
              disabled={currentQuestionIndex === examQuestions.length - 1}
              onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
              style={{
                padding: '18px 48px', 
                minWidth: '200px',
                borderRadius: '18px',
                fontSize: '1.1rem',
                fontWeight: 700,
                opacity: currentQuestionIndex === examQuestions.length - 1 ? 0.3 : 1,
                cursor: currentQuestionIndex === examQuestions.length - 1 ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px'
              }}
            >
              Next Question <span>→</span>
            </button>
          </div>
        </div>

        {/* Sidebar Palette */}
        <div className="test-sidebar-palette" style={{ width: '380px' }}>
          <div className="settings-section" style={{
            padding: '32px',
            borderRadius: '28px',
            background: 'rgba(15, 23, 42, 0.7)',
            backdropFilter: 'blur(15px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            position: 'sticky',
            top: '120px'
          }}>
            <h4 style={{marginBottom: '24px', opacity: 0.6, letterSpacing: '1.5px', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase'}}>Question Navigator</h4>
            <div className="question-palette-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '10px'
            }}>
              {examQuestions.map((_, i) => (
                <div 
                  key={i}
                  onClick={() => setCurrentQuestionIndex(i)}
                  style={{
                    height: '42px',
                    borderRadius: '10px',
                    background: answers[i] !== undefined ? 'var(--theme-primary)' : (currentQuestionIndex === i ? 'white' : 'rgba(255,255,255,0.05)'),
                    color: currentQuestionIndex === i && answers[i] === undefined ? 'black' : 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.9rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    border: currentQuestionIndex === i ? '2px solid var(--theme-primary)' : '1px solid rgba(255,255,255,0.05)',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: answers[i] !== undefined ? '0 4px 10px rgba(59, 130, 246, 0.3)' : 'none'
                  }}
                >
                  {i + 1}
                </div>
              ))}
            </div>
            
            <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px', fontSize: '0.9rem' }}>
                  <span style={{ color: '#94a3b8', fontWeight: 600 }}>Total Answered:</span>
                  <span style={{ color: 'white', fontWeight: 800 }}>{Object.keys(answers).length} / {examQuestions.length}</span>
               </div>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '0.9rem' }}>
                  <span style={{ color: '#94a3b8', fontWeight: 600 }}>Remaining Time:</span>
                  <span style={{ color: timeLeft < 300 ? '#ef4444' : 'white', fontWeight: 800 }}>{formatTime(timeLeft)}</span>
               </div>
               
               <div style={{ padding: '16px', borderRadius: '16px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                  <p style={{ fontSize: '0.8rem', color: '#93c5fd', lineHeight: 1.5, textAlign: 'center', fontWeight: 600 }}>
                    💡 Tip: Red questions indicate they are SQL queries. Pay attention to syntax!
                  </p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SqlExamPage;
