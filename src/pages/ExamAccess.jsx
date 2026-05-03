import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from './Home';

const ExamAccess = () => {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleStartTest = () => {
    const VALID_TOKEN = 'EXAM123';
    
    // Check if test already attempted
    const attemptedTokens = JSON.parse(localStorage.getItem('attemptedTokens') || '[]');
    
    if (attemptedTokens.includes(token)) {
      setError('This test has already been attempted.');
      return;
    }

    if (token === VALID_TOKEN) {
      setError('');
      // Save token to session to ensure user doesn't just bypass the access page
      sessionStorage.setItem('examToken', token);
      navigate('/exam-test');
    } else {
      setError('Invalid Token');
    }
  };

  return (
    <Layout>
      <div className="animate-in" style={{
        maxWidth: '500px',
        margin: '60px auto',
        padding: '0 20px'
      }}>
        <div className="settings-section" style={{
          textAlign: 'center',
          padding: '48px 32px',
          borderRadius: '24px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '24px' }}>🛡️</div>
          <h2 style={{ 
            color: 'white', 
            fontSize: '1.8rem', 
            fontWeight: 800, 
            marginBottom: '12px' 
          }}>Enter Test Token</h2>
          <p style={{ 
            color: '#94a3b8', 
            marginBottom: '32px',
            fontSize: '1rem'
          }}>Please enter the access token provided to you to unlock the examination.</p>
          
          <div style={{ marginBottom: '24px' }}>
            <input 
              type="text" 
              placeholder="Ex: EXAM123" 
              value={token}
              onChange={(e) => setToken(e.target.value)}
              style={{
                width: '100%',
                padding: '16px 24px',
                borderRadius: '12px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'white',
                fontSize: '1.1rem',
                textAlign: 'center',
                letterSpacing: '2px',
                fontWeight: 600,
                outline: 'none',
                transition: 'border-color 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--theme-primary)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              onKeyPress={(e) => e.key === 'Enter' && handleStartTest()}
            />
            {error && (
              <p style={{ 
                color: '#ef4444', 
                marginTop: '12px', 
                fontSize: '0.9rem',
                fontWeight: 600 
              }}>⚠️ {error}</p>
            )}
          </div>

          <button 
            className="btn btn-primary" 
            onClick={handleStartTest}
            style={{
              width: '100%',
              padding: '16px',
              fontSize: '1.1rem',
              borderRadius: '12px',
              boxShadow: '0 8px 16px rgba(59, 130, 246, 0.3)'
            }}
          >
            Start Test
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default ExamAccess;
