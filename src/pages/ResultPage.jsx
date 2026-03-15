import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Layout } from './Home';

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Handle direct navigation missing state gracefully
  if (!location.state || !location.state.answers || !location.state.testQuestions) {
    return (
      <Layout>
        <div className="settings-section" style={{textAlign: 'center', maxWidth: '400px', margin: '40px auto'}}>
          <h2>Assessment Data Required</h2>
          <p style={{color: '#94a3b8', margin: '20px 0'}}>Please complete a test to view this performance report.</p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>Return to Dashboard</button>
        </div>
      </Layout>
    );
  }

  const { answers, testQuestions, studentName, subjectTitle, unitTitle, unitId } = location.state;
  const total = testQuestions.length;
  let correct = 0;
  testQuestions.forEach((q, i) => { if (answers[i] === q.answer) correct++; });
  const accuracy = Math.round((correct / total) * 100);

  // Persistence: Mark this unit as completed
  React.useEffect(() => {
    const completedUnits = JSON.parse(sessionStorage.getItem('edqualis-completed-units') || '[]');
    if (unitId && !completedUnits.includes(unitId)) {
      sessionStorage.setItem('edqualis-completed-units', JSON.stringify([...completedUnits, unitId]));
    }
  }, [unitId]);

  // Dynamic feedback generator
  let feedback = "Nice effort! Focus on clarifying core definitions, particularly around professional codes of conduct.";
  if (accuracy >= 90) feedback = "Outstanding Performance! You've demonstrated a mastery level understanding of this module.";
  if (accuracy < 50) feedback = "Review Required. It is recommended to re-examine the module materials before proceeding.";

  return (
    <Layout>
      <div className="settings-container animate-in">
        <div style={{textAlign: 'center', marginBottom: '48px'}}>
           <div style={{fontSize: '5rem', marginBottom: '20px'}}>🎊</div>
           <h1 className="page-title" style={{margin: 0}}>Assessment Certified</h1>
           <p style={{fontSize: '1.2rem', color: '#94a3b8', marginTop: '12px'}}>Your performance analysis is ready for review.</p>
        </div>

        <div className="settings-section" style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '40px'}}>
          <div style={{textAlign: 'center'}}>
            <div style={{fontSize: '0.8rem', fontWeight: 800, color: 'var(--theme-primary)', textTransform: 'uppercase', marginBottom: '8px'}}>CANDIDATE</div>
            <div style={{fontSize: '1.3rem', fontWeight: 700, color: 'white'}}>{studentName}</div>
          </div>
          <div style={{height: '40px', width: '1px', background: 'rgba(255,255,255,0.1)'}}></div>
          <div style={{textAlign: 'center'}}>
            <div style={{fontSize: '0.8rem', fontWeight: 800, color: 'var(--theme-primary)', textTransform: 'uppercase', marginBottom: '8px'}}>UNIT</div>
            <div style={{fontSize: '1.3rem', fontWeight: 700, color: 'white'}}>{unitTitle}</div>
          </div>
          <div style={{height: '40px', width: '1px', background: 'rgba(255,255,255,0.1)'}}></div>
          <div style={{textAlign: 'center'}}>
            <div style={{fontSize: '0.8rem', fontWeight: 800, color: 'var(--theme-primary)', textTransform: 'uppercase', marginBottom: '8px'}}>ACCURACY</div>
            <div style={{fontSize: '1.3rem', fontWeight: 700, color: 'white'}}>{accuracy}%</div>
          </div>
        </div>

        <div style={{display: 'flex', gap: '32px', marginBottom: '40px'}}>
          <div className="settings-section" style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px'}}>
             <div style={{fontSize: '1.1rem', fontWeight: 600, color: '#94a3b8', marginBottom: '16px'}}>SCORE SUMMARY</div>
             <div style={{fontSize: '4.5rem', fontWeight: 900, color: 'white'}}>{correct}<span style={{fontSize: '2rem', opacity: 0.4}}>/{total}</span></div>
             <div style={{marginTop: '24px', width: '100%', height: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', overflow: 'hidden'}}>
                <div style={{height: '100%', width: `${accuracy}%`, background: 'var(--theme-primary)', borderRadius: '6px'}}></div>
             </div>
          </div>

          <div className="settings-section" style={{flex: 1.5, background: 'var(--theme-primary-soft)', border: '1px solid var(--theme-primary)'}}>
             <h3 style={{marginBottom: '20px', fontSize: '1.4rem'}}>💡 PERFORMANCE INSIGHTS</h3>
             <p style={{fontSize: '1.2rem', lineHeight: 1.6, color: 'white'}}>{feedback}</p>
             <div style={{marginTop: '32px', display: 'flex', gap: '16px'}}>
                <button className="btn btn-primary" onClick={() => navigate('/')}>Review Mistakes</button>
                <button className="btn btn-secondary" onClick={() => navigate('/')}>Share Score</button>
             </div>
          </div>
        </div>

        <div style={{textAlign: 'center'}}>
          <button className="btn btn-primary" style={{padding: '16px 60px', fontSize: '1.1rem'}} onClick={() => navigate('/')}>Return to Learning Path</button>
        </div>
      </div>
    </Layout>
  );
};

export default ResultPage;
