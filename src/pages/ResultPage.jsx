import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Layout } from './Home';

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  if (!location.state || !location.state.answers || !location.state.testQuestions) {
    return (
      <Layout>
        <div className="settings-section" style={{textAlign: 'center', maxWidth: '400px', margin: '40px auto'}}>
          <h2 style={{color: 'white', marginBottom: '16px'}}>No Test Data Found</h2>
          <p style={{color: '#94a3b8', margin: '20px 0'}}>Please complete a test to view your result.</p>
          <button className="btn btn-primary" style={{minHeight: '44px', padding: '12px 32px'}} onClick={() => navigate('/')}>Back to Dashboard</button>
        </div>
      </Layout>
    );
  }

  const { answers, testQuestions, studentName, subjectTitle, unitTitle, unitId, timeTaken } = location.state;
  const total = testQuestions.length;
  let correct = 0;
  let incorrect = 0;
  let unanswered = 0;

  testQuestions.forEach((q, i) => {
    if (answers[i] === undefined || answers[i] === null) unanswered++;
    else if (answers[i] === q.answer) correct++;
    else incorrect++;
  });

  const accuracy = Math.round((correct / total) * 100);

  // Format timeTaken (in seconds) to mm:ss
  const formatTime = (secs) => {
    if (!secs) return 'N/A';
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s}s`;
  };

  // Dynamic feedback
  let feedbackIcon = '🎯';
  let feedbackTitle = 'Good Attempt!';
  let feedbackMsg = 'You have a decent understanding. Revise some topics and try again to score higher.';
  let feedbackColor = '#f59e0b';

  if (accuracy >= 80) {
    feedbackIcon = '🏆';
    feedbackTitle = 'Excellent Work!';
    feedbackMsg = 'You have a strong understanding of this unit. Keep up the great performance!';
    feedbackColor = '#22c55e';
  } else if (accuracy < 50) {
    feedbackIcon = '📖';
    feedbackTitle = 'Needs More Practice';
    feedbackMsg = 'Review the notes and study materials for this unit, then retake the test to improve your score.';
    feedbackColor = '#ef4444';
  }

  // Mark unit as completed and save history
  React.useEffect(() => {
    // 1. Update completed units (sessionStorage)
    const completedUnits = JSON.parse(sessionStorage.getItem('edqualis-completed-units') || '[]');
    if (unitId && !completedUnits.includes(unitId)) {
      sessionStorage.setItem('edqualis-completed-units', JSON.stringify([...completedUnits, unitId]));
    }

    // 2. Save test result to history (localStorage for persistence)
    try {
      const testHistory = JSON.parse(localStorage.getItem('edqualis-test-history') || '[]');
      
      const newResult = {
        unitId,
        subjectTitle,
        unitTitle,
        score: correct,
        total: total,
        accuracy,
        timestamp: new Date().toISOString()
      };

      // Add to history and keep last 20 results for graph (adjust as needed)
      const updatedHistory = [...testHistory, newResult];
      localStorage.setItem('edqualis-test-history', JSON.stringify(updatedHistory));
    } catch (e) {
      console.error("Failed to save test history", e);
    }
  }, [unitId, correct, total, accuracy, subjectTitle, unitTitle]);

  return (
    <Layout>
      <div className="animate-in" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 0 48px 0' }}>

        {/* --- Header --- */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '12px' }}>🎊</div>
          <h1 style={{ color: 'white', fontSize: 'clamp(22px, 5vw, 2.5rem)', fontWeight: 800, marginBottom: '8px' }}>Test Completed!</h1>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>{unitTitle} &mdash; {subjectTitle}</p>
        </div>

        {/* --- Score Summary Card --- */}
        <div className="result-hero-card" style={{ marginBottom: '28px' }}>
          <div style={{ textAlign: 'center' }}>
            <div className="score-circle">
              <svg viewBox="0 0 120 120" className="score-svg">
                <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
                <circle
                  cx="60" cy="60" r="52"
                  fill="none"
                  stroke="var(--theme-primary)"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 52}`}
                  strokeDashoffset={`${2 * Math.PI * 52 * (1 - accuracy / 100)}`}
                  transform="rotate(-90 60 60)"
                  style={{ transition: 'stroke-dashoffset 1s ease' }}
                />
              </svg>
              <div className="score-text">
                <div style={{ fontSize: 'clamp(1.8rem, 6vw, 2.8rem)', fontWeight: 900, color: 'white', lineHeight: 1 }}>{accuracy}%</div>
                <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '4px' }}>Accuracy</div>
              </div>
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>Score</div>
              <div style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, color: 'white' }}>
                {correct} <span style={{ fontSize: '1.2rem', opacity: 0.5 }}>/ {total}</span>
              </div>
            </div>

            <div style={{ height: '10px', background: 'rgba(255,255,255,0.08)', borderRadius: '8px', overflow: 'hidden', marginBottom: '24px' }}>
              <div style={{ height: '100%', width: `${accuracy}%`, background: 'var(--theme-primary)', borderRadius: '8px', transition: 'width 1s ease' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.9rem', color: '#94a3b8' }}>
              {studentName && <div><span style={{ color: 'white', fontWeight: 600 }}>👤</span> {studentName}</div>}
              <div><span style={{ color: 'white', fontWeight: 600 }}>📋</span> {total} Questions</div>
              {timeTaken && <div><span style={{ color: 'white', fontWeight: 600 }}>⏱</span> {formatTime(timeTaken)}</div>}
            </div>
          </div>
        </div>

        {/* --- Performance Stats --- */}
        <div className="result-stats-grid" style={{ marginBottom: '28px' }}>
          <div className="result-stat-card" style={{ borderColor: 'rgba(34, 197, 94, 0.3)' }}>
            <div className="result-stat-icon" style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' }}>✔</div>
            <div className="result-stat-num" style={{ color: '#22c55e' }}>{correct}</div>
            <div className="result-stat-label">Correct</div>
          </div>
          <div className="result-stat-card" style={{ borderColor: 'rgba(239, 68, 68, 0.3)' }}>
            <div className="result-stat-icon" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>✖</div>
            <div className="result-stat-num" style={{ color: '#ef4444' }}>{incorrect}</div>
            <div className="result-stat-label">Incorrect</div>
          </div>
          <div className="result-stat-card" style={{ borderColor: 'rgba(148, 163, 184, 0.2)' }}>
            <div className="result-stat-icon" style={{ background: 'rgba(148, 163, 184, 0.1)', color: '#94a3b8' }}>○</div>
            <div className="result-stat-num" style={{ color: '#94a3b8' }}>{unanswered}</div>
            <div className="result-stat-label">Unanswered</div>
          </div>
        </div>

        {/* --- Feedback --- */}
        <div className="result-feedback-card" style={{ borderColor: feedbackColor, marginBottom: '28px' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>{feedbackIcon}</div>
          <h3 style={{ color: 'white', fontSize: '1.5rem', fontWeight: 700, marginBottom: '10px' }}>{feedbackTitle}</h3>
          <p style={{ color: '#94a3b8', lineHeight: 1.7, fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>{feedbackMsg}</p>
        </div>

        {/* --- Action Buttons --- */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '48px', flexWrap: 'wrap' }}>
          {unitId === 'exam-mode' ? (
            <button
              className="btn btn-secondary"
              style={{ flex: 1, minWidth: '160px', minHeight: '48px', fontSize: '1rem', borderRadius: '12px', cursor: 'pointer' }}
              onClick={() => navigate('/exam')}
            >
              🛡️ Return to Exam Portal
            </button>
          ) : (
            <button
              className="btn-continue"
              style={{ flex: 1, minWidth: '160px' }}
              onClick={() => navigate(`/pretest/${unitId}`)}
            >
              🔁 Retry Test
            </button>
          )}
          <button
            className="btn btn-secondary"
            style={{ flex: 1, minWidth: '160px', minHeight: '48px', fontSize: '1rem', borderRadius: '12px', cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            🏠 Back to Dashboard
          </button>
        </div>

        {/* --- Answer Review --- */}
        <div>
          <h2 style={{ color: 'white', fontSize: '1.8rem', fontWeight: 700, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ background: 'rgba(56, 189, 248, 0.1)', padding: '8px', borderRadius: '10px' }}>🔍</span>
            Review Your Answers
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {testQuestions.map((q, i) => {
              const isCorrect = answers[i] === q.answer;
              const isUnanswered = answers[i] === undefined || answers[i] === null;
              const borderColor = isUnanswered ? 'rgba(148,163,184,0.2)' : isCorrect ? 'rgba(34, 197, 94, 0.4)' : 'rgba(239, 68, 68, 0.4)';
              const bgColor = isUnanswered ? 'rgba(255,255,255,0.03)' : isCorrect ? 'rgba(34, 197, 94, 0.05)' : 'rgba(239, 68, 68, 0.05)';

              return (
                <div key={i} className="review-card" style={{ borderColor, background: bgColor }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
                      <span style={{
                        background: isUnanswered ? '#94a3b8' : isCorrect ? '#22c55e' : '#ef4444',
                        color: 'white',
                        borderRadius: '50%',
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        flexShrink: 0
                      }}>{i + 1}</span>
                      <p style={{ color: 'white', fontWeight: 600, fontSize: '1rem', lineHeight: 1.5 }}>{q.text}</p>
                    </div>
                    <span style={{ fontSize: '1.3rem', flexShrink: 0 }}>
                      {isUnanswered ? '○' : isCorrect ? '✅' : '❌'}
                    </span>
                  </div>

                  <div style={{ paddingLeft: '42px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {q.options.map((opt, oi) => {
                      const isSelected = answers[i] === oi;
                      const isAnswer = q.answer === oi;
                      let optBg = 'transparent';
                      let optColor = '#94a3b8';
                      let optBorder = 'rgba(255,255,255,0.05)';

                      if (isAnswer) {
                        optBg = 'rgba(34, 197, 94, 0.1)';
                        optColor = '#22c55e';
                        optBorder = 'rgba(34, 197, 94, 0.4)';
                      } else if (isSelected && !isAnswer) {
                        optBg = 'rgba(239, 68, 68, 0.1)';
                        optColor = '#ef4444';
                        optBorder = 'rgba(239, 68, 68, 0.4)';
                      }

                      return (
                        <div key={oi} style={{
                          padding: '10px 14px',
                          borderRadius: '10px',
                          border: `1px solid ${optBorder}`,
                          background: optBg,
                          color: optColor,
                          fontSize: '0.95rem',
                          fontWeight: isAnswer || isSelected ? 600 : 400,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px'
                        }}>
                          <span style={{ opacity: 0.5, flexShrink: 0 }}>{String.fromCharCode(65 + oi)}.</span>
                          {opt}
                          {isAnswer && <span style={{ marginLeft: 'auto', flexShrink: 0 }}>✔</span>}
                          {isSelected && !isAnswer && <span style={{ marginLeft: 'auto', flexShrink: 0 }}>✖</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResultPage;
