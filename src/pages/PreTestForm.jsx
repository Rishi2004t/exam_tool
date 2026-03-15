import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { subjectsData } from '../data/questions';
import { Layout } from './Home';

const PreTestForm = () => {
  const { unitId } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    studentName: localStorage.getItem('studentName') || '',
    prepLevel: 'Just Started',
    confirmed: false
  });

  // Find the subject and unit details based on unitId
  const findUnitDetails = () => {
    for (const subject of subjectsData) {
      const unit = subject.units.find(u => u.id === unitId);
      if (unit) {
        return { subject, unit };
      }
    }
    return null;
  };

  const details = findUnitDetails();

  if (!details) {
    return (
      <Layout>
        <div className="settings-section" style={{textAlign: 'center', maxWidth: '400px', margin: '40px auto'}}>
          <h2>Unit not found</h2>
          <button className="btn btn-primary" onClick={() => navigate('/')}>Return to Dashboard</button>
        </div>
      </Layout>
    );
  }

  const { subject, unit } = details;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.studentName.trim()) {
      alert('Please enter your name.');
      return;
    }
    if (!formData.confirmed) {
      alert('Please confirm the honesty statement.');
      return;
    }

    // Save to localStorage
    localStorage.setItem('studentName', formData.studentName);
    localStorage.setItem('prepLevel', formData.prepLevel);
    localStorage.setItem('selectedUnit', unit.id);

    // Navigate to test
    navigate(`/test/${unit.id}`);
  };

  return (
    <Layout>
      <div className="settings-container animate-in">
        <div style={{ marginBottom: '40px' }}>
          <button className="btn btn-secondary" onClick={() => navigate(-1)} style={{marginBottom: '20px'}}>← Back</button>
          <h1 className="page-title">Candidate Registration</h1>
          <p style={{color: '#94a3b8'}}>Please verify your details before starting the assessment.</p>
        </div>

        <div className="settings-section">
          <form onSubmit={handleSubmit}>
            {/* Auto-filled Info */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
              <div>
                <label style={{display: 'block', marginBottom: '8px', fontWeight: 600, color: '#94a3b8', fontSize: '0.85rem'}}>SUBJECT</label>
                <div className="btn-secondary" style={{padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)'}}>
                  {subject.title}
                </div>
              </div>
              <div>
                <label style={{display: 'block', marginBottom: '8px', fontWeight: 600, color: '#94a3b8', fontSize: '0.85rem'}}>UNIT</label>
                <div className="btn-secondary" style={{padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)'}}>
                  {unit.title}
                </div>
              </div>
            </div>

            {/* Student Name */}
            <div style={{marginBottom: '30px'}}>
              <label style={{display: 'block', marginBottom: '12px', fontWeight: 600}}>Full Name</label>
              <input 
                type="text" 
                className="btn-secondary"
                placeholder="Enter your registered name"
                style={{width: '100%', padding: '14px', borderRadius: '10px', color: 'white', fontSize: '1.1rem'}}
                value={formData.studentName}
                onChange={(e) => setFormData({...formData, studentName: e.target.value})}
                required
              />
            </div>

            {/* Prep Level */}
            <div style={{marginBottom: '30px'}}>
              <label style={{display: 'block', marginBottom: '15px', fontWeight: 600}}>Current Preparation Level</label>
              <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                {['Fully Prepared', 'Partially Prepared', 'Just Started'].map(level => (
                  <label key={level} style={{
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '12px', 
                    padding: '12px 20px', 
                    borderRadius: '10px', 
                    background: formData.prepLevel === level ? 'var(--theme-primary-soft)' : 'rgba(255,255,255,0.03)',
                    border: formData.prepLevel === level ? '1px solid var(--theme-primary)' : '1px solid rgba(255,255,255,0.05)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}>
                    <input 
                      type="radio" 
                      name="prepLevel" 
                      value={level}
                      checked={formData.prepLevel === level}
                      onChange={(e) => setFormData({...formData, prepLevel: e.target.value})}
                      style={{accentColor: 'var(--theme-primary)', width: '18px', height: '18px'}}
                    />
                    <span style={{fontWeight: 500, color: formData.prepLevel === level ? 'white' : '#94a3b8'}}>{level}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Honesty Checkbox */}
            <div style={{marginBottom: '40px'}}>
              <label style={{
                display: 'flex', 
                alignItems: 'center', 
                gap: '15px', 
                cursor: 'pointer',
                padding: '20px',
                borderRadius: '12px',
                background: 'rgba(239, 68, 68, 0.05)',
                border: '1px solid rgba(239, 68, 68, 0.1)'
              }}>
                <input 
                  type="checkbox" 
                  checked={formData.confirmed}
                  onChange={(e) => setFormData({...formData, confirmed: e.target.checked})}
                  style={{width: '24px', height: '24px', accentColor: '#ef4444'}}
                />
                <span style={{fontSize: '0.95rem', lineHeight: 1.5}}>
                  I confirm that I will attempt this test honestly and without external assistance.
                </span>
              </label>
            </div>

            <button type="submit" className="btn btn-primary" style={{width: '100%', padding: '18px', fontSize: '1.2rem', fontWeight: 700}}>
              Begin Assessment
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default PreTestForm;
