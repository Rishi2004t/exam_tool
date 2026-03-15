import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { subjectsData } from '../data/questions';
import { Layout } from './Home';

const UnitSelection = () => {
  const { subjectId } = useParams();
  const navigate = useNavigate();

  const subject = subjectsData.find(s => s.id === subjectId);

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

  const handleUnitSelect = (unit) => {
    navigate(`/pretest/${unit.id}`);
  };

  return (
    <Layout>
      <div style={{ marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '24px' }}>
        <button className="btn btn-secondary" onClick={() => navigate('/')} style={{padding: '12px 24px'}}>← Back</button>
        <h1 className="page-title" style={{margin: 0}}>{subject.title} Units</h1>
      </div>
      
      <div className="dashboard-grid">
        {subject.units.map((unit, index) => (
          <div key={unit.id} className="subject-card animate-in" style={{animationDelay: `${index * 0.1}s`, minHeight: '300px'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px'}}>
              <div className="card-icon-wrapper" style={{marginBottom: 0}}>📝</div>
            </div>
            
            <h3 style={{marginBottom: '16px', fontSize: '1.4rem', height: '3.2rem', overflow: 'hidden'}}>{unit.title}</h3>
            
            <div style={{display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px', color: '#94a3b8'}}>
              <div style={{display: 'flex', alignItems: 'center', fontWeight: 600}}>
                <span style={{marginRight: '12px'}}>📋</span>
                <span>{unit.questions.length} Questions</span>
              </div>
              <div style={{display: 'flex', alignItems: 'center', fontWeight: 600}}>
                <span style={{marginRight: '12px'}}>⏱️</span>
                <span>{unit.estimatedTime} Minutes</span>
              </div>
            </div>

            <div style={{marginTop: 'auto'}}>
              <button className="btn-continue" onClick={() => handleUnitSelect(unit)}>Start Assessment</button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default UnitSelection;
