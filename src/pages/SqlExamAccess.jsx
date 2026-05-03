import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from './Home';
import { validTokens } from '../data/tokens';

const SqlExamAccess = () => {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleStartTest = () => {
    const inputToken = token.trim().toUpperCase();
    
    // 1. Find the token in the "database"
    const tokenData = validTokens.find(t => t.code === inputToken);
    
    if (!tokenData) {
      setError('Invalid Token');
      return;
    }

    // 2. Check if already used (One-time use logic)
    const usedTokens = JSON.parse(localStorage.getItem('usedTokens') || '[]');
    if (usedTokens.includes(inputToken)) {
      setError('This token has already been used');
      return;
    }

    // 3. Check for expiry - Use expiryHours if defined, else default to 1 hour
    if (!tokenData.isPermanent) {
      const createdAt = new Date(tokenData.createdAt).getTime();
      const now = new Date().getTime();
      const expiryWindow = (tokenData.expiryHours || 1) * 60 * 60 * 1000;

      if (now - createdAt > expiryWindow) {
        setError('This token has expired');
        return;
      }
    }

    // 4. If all checks pass
    setError('');
    sessionStorage.setItem('sqlExamToken', inputToken);
    navigate('/sql-exam-test');
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
          border: '1px solid rgba(255,255,255,0.1)',
          background: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(20px)'
        }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '24px' }}>🗄️</div>
          <h2 style={{ 
            color: 'white', 
            fontSize: '2rem', 
            fontWeight: 800, 
            marginBottom: '12px' 
          }}>SQL Master Examination</h2>
          <p style={{ 
            color: '#94a3b8', 
            marginBottom: '32px',
            fontSize: '1rem',
            lineHeight: 1.6
          }}>Enter your examination token to unlock the SQL assessment. <br/><strong>(50 Questions • 30 Minutes)</strong></p>
          
          <div style={{ marginBottom: '24px' }}>
            <div style={{ position: 'relative' }}>
              <input 
                type="text" 
                placeholder="Enter Exam Token" 
                value={token}
                onChange={(e) => setToken(e.target.value)}
                style={{
                  width: '100%',
                  padding: '18px 24px',
                  borderRadius: '16px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '2px solid rgba(255,255,255,0.1)',
                  color: 'white',
                  fontSize: '1.2rem',
                  textAlign: 'center',
                  letterSpacing: '3px',
                  fontWeight: 700,
                  outline: 'none',
                  transition: 'all 0.3s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--theme-primary)';
                  e.target.style.background = 'rgba(255,255,255,0.08)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.target.style.background = 'rgba(255,255,255,0.05)';
                }}
                onKeyPress={(e) => e.key === 'Enter' && handleStartTest()}
              />
            </div>
            {error && (
              <div style={{ 
                background: 'rgba(239, 68, 68, 0.1)',
                color: '#ef4444', 
                marginTop: '16px', 
                padding: '10px',
                borderRadius: '10px',
                fontSize: '0.9rem',
                fontWeight: 700,
                border: '1px solid rgba(239, 68, 68, 0.2)'
              }}>
                ⚠️ {error}
              </div>
            )}
          </div>

          <button 
            className="btn btn-primary" 
            onClick={handleStartTest}
            style={{
              width: '100%',
              padding: '18px',
              fontSize: '1.2rem',
              borderRadius: '16px',
              fontWeight: 800,
              boxShadow: '0 8px 20px rgba(59, 130, 246, 0.4)',
              cursor: 'pointer'
            }}
          >
            Start SQL Exam
          </button>
          
          <div style={{ marginTop: '24px', fontSize: '0.85rem', color: '#64748b' }}>
            Ensure you have a stable internet connection before starting.
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SqlExamAccess;
