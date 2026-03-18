import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { subjectsData } from '../data/questions';
import { Layout } from './Home';

const TheoryUnitSelection = () => {
  const { subjectId } = useParams();
  const navigate = useNavigate();

  const subject = subjectsData.find(s => s.id === (subjectId || 'mkt-203'));

  if (!subject) {
    return (
      <Layout>
        <div className="settings-section" style={{textAlign: 'center', maxWidth: '400px', margin: '40px auto'}}>
          <h2>Subject not found</h2>
          <button className="btn btn-primary" style={{marginTop: '20px'}} onClick={() => navigate('/')}>Go Back Home</button>
        </div>
      </Layout>
    );
  }

  const handleUnitSelect = (unitId) => {
    navigate(`/unit/${unitId}`);
  };

  return (
    <Layout>
      <div style={{ marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '24px' }}>
        <button className="btn btn-secondary" onClick={() => navigate('/')} style={{padding: '12px 24px'}}>← Back</button>
        <h1 className="page-title" style={{margin: 0}}>{subject.title} Units</h1>
      </div>
      
      <div style={{ marginBottom: '32px' }}>
        <h2 className="section-title" style={{ color: 'white', marginBottom: '24px', fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ padding: '8px', background: 'rgba(56, 189, 248, 0.1)', borderRadius: '12px', fontSize: '1.3rem' }}>📖</span>
          Theory Revision Units
        </h2>
        
        <div className="dashboard-grid">
          {subject.units.map((unit, index) => (
            <div key={unit.id} className="subject-card animate-in" style={{animationDelay: `${index * 0.1}s`, minHeight: '250px'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px'}}>
                <div className="card-icon-wrapper" style={{marginBottom: 0}}>📚</div>
              </div>
              
              <h3 style={{marginBottom: '16px', fontSize: '1.4rem', height: '3.2rem', overflow: 'hidden'}}>{unit.title}</h3>
              
              <div style={{display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px', color: '#94a3b8'}}>
                <div style={{display: 'flex', alignItems: 'center', fontWeight: 600}}>
                  <span style={{marginRight: '12px'}}>📝</span>
                  <span>{unit.questions.length} Questions & Answers</span>
                </div>
              </div>

              <div style={{marginTop: 'auto'}}>
                <button className="btn-continue" onClick={() => handleUnitSelect(unit.id)}>Start Learning</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default TheoryUnitSelection;
