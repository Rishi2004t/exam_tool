import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { sqlQuestions } from '../data/sqlQuestions';

const SqlExamPage = () => {
  const navigate = useNavigate();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showReview, setShowReview] = useState(false);

  // Check if already attempted or expired on mount
  useEffect(() => {
    const attempted = localStorage.getItem('examAttempted');
    const startTimeStr = localStorage.getItem('examStartTime');
    
    if (attempted === 'true') {
      navigate('/sql-exam');
      return;
    }

    if (startTimeStr) {
      const startTime = new Date(startTimeStr);
      const now = new Date();
      const diffHours = (now - startTime) / (1000 * 60 * 60);
      if (diffHours >= 8) {
        navigate('/sql-exam');
        return;
      }
    } else {
      // If no start time, they shouldn't be here
      navigate('/sql-exam');
    }
  }, [navigate]);

  const handleOptionSelect = (optionIdx) => {
    setUserAnswers({ ...userAnswers, [currentIdx]: optionIdx });
  };

  const handleSubmit = () => {
    if (window.confirm('Are you sure you want to submit your exam?')) {
      setIsSubmitted(true);
      localStorage.setItem('examAttempted', 'true');
    }
  };

  const calculateScore = () => {
    let score = 0;
    sqlQuestions.forEach((q, idx) => {
      if (userAnswers[idx] === q.answer) {
        score++;
      }
    });
    return score;
  };

  if (isSubmitted) {
    const score = calculateScore();
    const percentage = (score / sqlQuestions.length) * 100;

    return (
      <div style={{
        minHeight: '100vh',
        background: '#0f172a',
        color: 'white',
        padding: '40px 20px',
        fontFamily: '"Inter", sans-serif'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {!showReview ? (
            <div style={{
              background: 'rgba(30, 41, 59, 0.7)',
              backdropFilter: 'blur(20px)',
              padding: '60px 40px',
              borderRadius: '32px',
              textAlign: 'center',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              animation: 'slideUp 0.5s ease-out'
            }}>
              <div style={{ fontSize: '5rem', marginBottom: '24px' }}>
                {percentage >= 70 ? '🏆' : percentage >= 40 ? '📊' : '📚'}
              </div>
              <h1 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '8px' }}>Exam Completed</h1>
              <p style={{ color: '#94a3b8', fontSize: '1.2rem', marginBottom: '48px' }}>
                Your performance report is ready.
              </p>

              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                gap: '40px', 
                marginBottom: '48px' 
              }}>
                <div>
                  <div style={{ fontSize: '3.5rem', fontWeight: 900, color: '#3b82f6' }}>{score}</div>
                  <div style={{ color: '#64748b', fontWeight: 600 }}>SCORE</div>
                </div>
                <div style={{ width: '2px', background: 'rgba(255, 255, 255, 0.1)' }}></div>
                <div>
                  <div style={{ fontSize: '3.5rem', fontWeight: 900, color: '#10b981' }}>{percentage}%</div>
                  <div style={{ color: '#64748b', fontWeight: 600 }}>ACCURACY</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <button 
                  onClick={() => setShowReview(true)}
                  style={{
                    flex: 1,
                    padding: '20px',
                    borderRadius: '16px',
                    border: 'none',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Review Answers
                </button>
                <button 
                  onClick={() => navigate('/')}
                  style={{
                    flex: 1,
                    padding: '20px',
                    borderRadius: '16px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                    color: 'white',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Back to Dashboard
                </button>
              </div>
            </div>
          ) : (
            <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '32px'
              }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>Answer Review</h2>
                <button 
                  onClick={() => setShowReview(false)}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '10px',
                    background: 'rgba(255,255,255,0.1)',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer'
                  }}
                >
                  Back to Result
                </button>
              </div>

              {sqlQuestions.map((q, idx) => {
                const isCorrect = userAnswers[idx] === q.answer;
                return (
                  <div key={idx} style={{
                    background: 'rgba(30, 41, 59, 0.5)',
                    borderRadius: '20px',
                    padding: '24px',
                    marginBottom: '20px',
                    border: `1px solid ${isCorrect ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`
                  }}>
                    <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                      <span style={{ 
                        background: isCorrect ? '#059669' : '#dc2626',
                        color: 'white',
                        padding: '4px 12px',
                        borderRadius: '8px',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        height: 'fit-content'
                      }}>
                        {isCorrect ? 'CORRECT' : 'INCORRECT'}
                      </span>
                      <h4 style={{ margin: 0, fontSize: '1.1rem', lineHeight: 1.5 }}>
                        {idx + 1}. {q.text}
                      </h4>
                    </div>

                    <div style={{ paddingLeft: '40px' }}>
                      <p style={{ color: '#94a3b8', marginBottom: '8px' }}>
                        Your Answer: <span style={{ color: isCorrect ? '#10b981' : '#f87171', fontWeight: 600 }}>
                          {userAnswers[idx] !== undefined ? q.options[userAnswers[idx]] : 'Skipped'}
                        </span>
                      </p>
                      {!isCorrect && (
                        <p style={{ color: '#94a3b8', marginBottom: '16px' }}>
                          Correct Answer: <span style={{ color: '#10b981', fontWeight: 600 }}>{q.options[q.answer]}</span>
                        </p>
                      )}
                      
                      <div style={{ 
                        background: 'rgba(15, 23, 42, 0.4)', 
                        padding: '16px', 
                        borderRadius: '12px',
                        fontSize: '0.95rem',
                        lineHeight: 1.6,
                        color: '#cbd5e1'
                      }}>
                        <strong>Explanation:</strong> {q.explanation}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  const currentQuestion = sqlQuestions[currentIdx];

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0f172a',
      color: 'white',
      padding: '40px 20px',
      fontFamily: '"Inter", sans-serif'
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '40px',
          background: 'rgba(30, 41, 59, 0.5)',
          padding: '20px 30px',
          borderRadius: '20px',
          border: '1px solid rgba(255,255,255,0.05)'
        }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800 }}>SQL Mastery Exam</h2>
            <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>Day 10 Final Test</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#3b82f6' }}>
              Question {currentIdx + 1} of {sqlQuestions.length}
            </div>
            <div style={{ width: '150px', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', marginTop: '8px' }}>
              <div style={{ 
                width: `${((currentIdx + 1) / sqlQuestions.length) * 100}%`, 
                height: '100%', 
                background: '#3b82f6', 
                borderRadius: '10px',
                transition: 'width 0.3s ease'
              }}></div>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div style={{
          background: 'rgba(30, 41, 59, 0.7)',
          backdropFilter: 'blur(20px)',
          padding: '40px',
          borderRadius: '32px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          minHeight: '400px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 600, lineHeight: 1.5, marginBottom: '40px' }}>
            {currentQuestion.text}
          </h3>

          <div style={{ display: 'grid', gap: '16px', flex: 1 }}>
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleOptionSelect(idx)}
                style={{
                  textAlign: 'left',
                  padding: '20px 24px',
                  borderRadius: '16px',
                  border: userAnswers[currentIdx] === idx 
                    ? '2px solid #3b82f6' 
                    : '2px solid rgba(255, 255, 255, 0.05)',
                  background: userAnswers[currentIdx] === idx 
                    ? 'rgba(59, 130, 246, 0.1)' 
                    : 'rgba(15, 23, 42, 0.4)',
                  color: userAnswers[currentIdx] === idx ? '#60a5fa' : '#cbd5e1',
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <span style={{ 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '8px', 
                  background: userAnswers[currentIdx] === idx ? '#3b82f6' : 'rgba(255,255,255,0.05)',
                  color: userAnswers[currentIdx] === idx ? 'white' : '#64748b',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: '16px',
                  fontWeight: 700,
                  fontSize: '0.9rem'
                }}>
                  {String.fromCharCode(65 + idx)}
                </span>
                {option}
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div style={{ 
            marginTop: '48px', 
            display: 'flex', 
            justifyContent: 'space-between',
            gap: '20px'
          }}>
            <button
              disabled={currentIdx === 0}
              onClick={() => setCurrentIdx(currentIdx - 1)}
              style={{
                padding: '16px 32px',
                borderRadius: '14px',
                border: 'none',
                background: 'rgba(255, 255, 255, 0.05)',
                color: currentIdx === 0 ? '#475569' : 'white',
                fontWeight: 700,
                cursor: currentIdx === 0 ? 'not-allowed' : 'pointer',
                transition: 'background 0.2s'
              }}
            >
              Previous
            </button>
            
            {currentIdx === sqlQuestions.length - 1 ? (
              <button
                onClick={handleSubmit}
                style={{
                  padding: '16px 40px',
                  borderRadius: '14px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  color: 'white',
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  boxShadow: '0 10px 20px -5px rgba(16, 185, 129, 0.3)'
                }}
              >
                Submit Exam
              </button>
            ) : (
              <button
                onClick={() => setCurrentIdx(currentIdx + 1)}
                style={{
                  padding: '16px 40px',
                  borderRadius: '14px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                  color: 'white',
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  boxShadow: '0 10px 20px -5px rgba(37, 99, 235, 0.3)'
                }}
              >
                Next Question
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SqlExamPage;
