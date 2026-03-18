import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { subjectsData } from '../data/questions';
import { Layout } from './Home';

const TheoryUnitDetail = () => {
  const { unitId } = useParams();
  const navigate = useNavigate();
  
  // Find the subject and unit
  const subject = subjectsData.find(s => s.units.some(u => u.id === unitId));
  const unit = subject?.units.find(u => u.id === unitId);
  const [showAllAnswers, setShowAllAnswers] = useState(false);
  const [revealedAnswers, setRevealedAnswers] = useState({});

  if (!unit) {
    return (
      <Layout>
        <div className="settings-section" style={{textAlign: 'center', maxWidth: '400px', margin: '40px auto'}}>
          <h2>Unit not found</h2>
          <button className="btn btn-primary" style={{marginTop: '20px'}} onClick={() => navigate('/')}>Go Back Home</button>
        </div>
      </Layout>
    );
  }

  const toggleAnswer = (id) => {
    setRevealedAnswers(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleAll = () => {
    const newState = !showAllAnswers;
    setShowAllAnswers(newState);
    const updatedRevealed = {};
    unit.questions.forEach(q => {
      updatedRevealed[q.id] = newState;
    });
    setRevealedAnswers(updatedRevealed);
  };

  return (
    <Layout>
      <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <button className="btn btn-secondary" onClick={() => navigate(`/subject/${subject.id}`)} style={{padding: '10px 20px'}}>← Back</button>
          <h1 className="page-title" style={{margin: 0, fontSize: '1.8rem'}}>{unit.title}</h1>
        </div>
        <button 
          className="btn btn-primary" 
          onClick={toggleAll}
          style={{ background: showAllAnswers ? 'rgba(255,255,255,0.1)' : 'var(--theme-primary)', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          {showAllAnswers ? 'Hide All Answers' : 'Show All Answers'}
        </button>
      </div>

      <div className="theory-qa-container">
        {unit.questions.map((q, index) => (
          <div key={q.id} className="theory-qa-card animate-in" style={{ animationDelay: `${index * 0.05}s` }}>
            <div className="qa-header" onClick={() => toggleAnswer(q.id)} style={{ cursor: 'pointer' }}>
              <div className="qa-question">
                <span className="q-label">Q{index + 1}:</span>
                <strong>{q.question}</strong>
              </div>
              <span className="toggle-icon">{revealedAnswers[q.id] ? '−' : '+'}</span>
            </div>
            
            {(revealedAnswers[q.id] || showAllAnswers) && (
              <div className="qa-answer animate-in" style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <span className="a-label" style={{ color: 'var(--theme-primary)', fontWeight: 700, marginRight: '8px' }}>Answer:</span>
                <p style={{ display: 'inline', color: '#cbd5e1' }}>{q.answer}</p>
              </div>
            )}
            
            {!revealedAnswers[q.id] && !showAllAnswers && (
              <div className="reveal-hint" onClick={() => toggleAnswer(q.id)} style={{ marginTop: '12px', fontSize: '0.85rem', color: '#475569', cursor: 'pointer', fontStyle: 'italic' }}>
                Click to reveal answer
              </div>
            )}
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default TheoryUnitDetail;
