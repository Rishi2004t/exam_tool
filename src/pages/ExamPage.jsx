import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { subjectsData } from '../data/questions';

const ExamPage = () => {
  const navigate = useNavigate();
  
  // Security check: Check if token exists in session
  const examToken = sessionStorage.getItem('examToken');
  
  useEffect(() => {
    if (!examToken) {
      navigate('/exam');
    }
    
    // Check if already attempted
    const attemptedTokens = JSON.parse(localStorage.getItem('attemptedTokens') || '[]');
    if (attemptedTokens.includes(examToken)) {
      navigate('/exam');
    }
  }, [examToken, navigate]);

  // Use a subset of questions for the exam (e.g., first 10 from Industrial Ethics Unit 1)
  const examQuestions = subjectsData[0].units[0].questions.slice(0, 10);
  const examTitle = "Official Examination";
  const subjectTitle = subjectsData[0].title;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
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

    // Save token as used
    const attemptedTokens = JSON.parse(localStorage.getItem('attemptedTokens') || '[]');
    if (!attemptedTokens.includes(examToken)) {
      attemptedTokens.push(examToken);
      localStorage.setItem('attemptedTokens', JSON.stringify(attemptedTokens));
    }

    // Navigate to result
    navigate('/result', { 
      state: { 
        answers, 
        testQuestions: examQuestions, 
        studentName: localStorage.getItem('studentName') || 'Examinee',
        subjectTitle: subjectTitle,
        unitTitle: examTitle,
        unitId: 'exam-mode',
        timeTaken: 600 - timeLeft
      } 
    });
  };

  if (!examToken || !examQuestions.length) return null;

  const currentQuestion = examQuestions[currentQuestionIndex];

  return (
    <div className="test-container animate-in">
      {/* Exam Header */}
      <div className="test-header" style={{
        background: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        padding: '20px 40px'
      }}>
        <div style={{color: 'white'}}>
          <div style={{fontSize: '0.85rem', fontWeight: 700, opacity: 0.6, textTransform: 'uppercase'}}>{subjectTitle}</div>
          <div style={{fontSize: '1.5rem', fontWeight: 800, color: 'var(--theme-primary)'}}>{examTitle}</div>
        </div>
        <div className="test-header-timer" style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ 
            background: timeLeft < 60 ? 'rgba(239, 68, 68, 0.2)' : 'rgba(59, 130, 246, 0.2)', 
            padding: '12px 24px', 
            borderRadius: '12px', 
            border: `1px solid ${timeLeft < 60 ? '#ef4444' : 'var(--theme-primary)'}`, 
            color: timeLeft < 60 ? '#ef4444' : 'var(--theme-primary)', 
            fontWeight: 800, 
            fontSize: '1.4rem', 
            marginRight: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <span style={{ fontSize: '1.2rem' }}>{timeLeft < 60 ? '⚠️' : '⏱️'}</span>
            {formatTime(timeLeft)}
          </div>
          <button 
            className="btn btn-primary" 
            onClick={handleSubmit} 
            style={{
              padding: '12px 32px', 
              fontSize: '1.1rem',
              borderRadius: '12px',
              background: '#ef4444',
              boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)'
            }}
          >
            Finish Exam
          </button>
        </div>
      </div>

      <div className="test-content-layout" style={{ marginTop: '40px' }}>
        {/* Question Area */}
        <div className="test-question-section">
          <div className="settings-section test-question-card" style={{ 
            padding: '60px', 
            borderRadius: '32px', 
            marginBottom: 0,
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.05)'
          }}>
             <div style={{marginBottom: '32px', display: 'flex', flexDirection: 'column', gap: '12px'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                   <span style={{background: 'var(--theme-primary)', color: 'white', padding: '6px 16px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 800}}>QUESTION {currentQuestionIndex + 1} OF {examQuestions.length}</span>
                   <span style={{color: '#94a3b8', fontSize: '0.9rem', fontWeight: 600}}>{Math.round(((currentQuestionIndex + 1) / examQuestions.length) * 100)}% Complete</span>
                </div>
                <div style={{height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden'}}>
                   <div style={{height: '100%', background: 'var(--theme-primary)', width: `${((currentQuestionIndex + 1) / examQuestions.length) * 100}%`, transition: 'width 0.3s ease'}}></div>
                </div>
             </div>
             
             <h2 className="question-text" style={{
               fontSize: '2.2rem', 
               lineHeight: 1.4, 
               marginBottom: '48px', 
               fontWeight: 700,
               color: 'white'
             }}>{currentQuestion.text}</h2>
             
             <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                {currentQuestion.options.map((opt, i) => (
                  <button 
                    key={i}
                    className="option-button"
                    onClick={() => handleAnswerSelect(i)}
                    style={{
                      textAlign: 'left',
                      padding: '24px 32px',
                      borderRadius: '20px',
                      background: answers[currentQuestionIndex] === i ? 'var(--theme-primary)' : 'rgba(255,255,255,0.05)',
                      border: answers[currentQuestionIndex] === i ? '1px solid var(--theme-primary)' : '1px solid rgba(255,255,255,0.1)',
                      color: 'white',
                      fontSize: '1.2rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <span style={{
                      marginRight: '20px', 
                      opacity: 0.5,
                      background: answers[currentQuestionIndex] === i ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)',
                      width: '36px',
                      height: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      fontSize: '1rem'
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
                borderRadius: '16px',
                fontSize: '1.1rem',
                opacity: currentQuestionIndex === 0 ? 0.3 : 1
              }}
            >
              ← Previous
            </button>
            <button 
              className="btn btn-primary"
              disabled={currentQuestionIndex === examQuestions.length - 1}
              onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
              style={{
                padding: '18px 48px', 
                minWidth: '200px',
                borderRadius: '16px',
                fontSize: '1.1rem',
                opacity: currentQuestionIndex === examQuestions.length - 1 ? 0.3 : 1
              }}
            >
              Next Question →
            </button>
          </div>
        </div>

        {/* Sidebar Palette */}
        <div className="test-sidebar-palette">
          <div className="settings-section" style={{
            padding: '32px',
            borderRadius: '24px',
            background: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.05)'
          }}>
            <h4 style={{marginBottom: '24px', opacity: 0.6, letterSpacing: '1px', fontSize: '0.9rem', fontWeight: 700}}>EXAM PROGRESS</h4>
            <div className="question-palette-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: '12px'
            }}>
              {examQuestions.map((_, i) => (
                <div 
                  key={i}
                  onClick={() => setCurrentQuestionIndex(i)}
                  style={{
                    height: '48px',
                    borderRadius: '12px',
                    background: answers[i] !== undefined ? 'var(--theme-primary)' : (currentQuestionIndex === i ? 'white' : 'rgba(255,255,255,0.05)'),
                    color: currentQuestionIndex === i && answers[i] === undefined ? 'black' : 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    border: currentQuestionIndex === i ? '2px solid var(--theme-primary)' : '1px solid rgba(255,255,255,0.05)',
                    transition: 'all 0.2s'
                  }}
                >
                  {i + 1}
                </div>
              ))}
            </div>
            
            <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '0.85rem' }}>
                  <span style={{ color: '#94a3b8' }}>Answered:</span>
                  <span style={{ color: 'white', fontWeight: 700 }}>{Object.keys(answers).length} / {examQuestions.length}</span>
               </div>
               <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: '#94a3b8' }}>Time Left:</span>
                  <span style={{ color: timeLeft < 60 ? '#ef4444' : 'white', fontWeight: 700 }}>{formatTime(timeLeft)}</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamPage;
