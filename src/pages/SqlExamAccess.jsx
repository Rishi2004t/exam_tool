import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Layout = ({ children }) => (
  <div style={{
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px 20px',
    fontFamily: '"Inter", "Segoe UI", Roboto, sans-serif',
    color: '#f8fafc'
  }}>
    {children}
  </div>
);

const SqlExamAccess = () => {
  const [passkey, setPasskey] = useState('');
  const [error, setError] = useState('');
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockMessage, setBlockMessage] = useState('');
  const navigate = useNavigate();

  const CORRECT_PASSKEY = 'EDQ-SQL-2024-X9P2';
  const EXPIRY_HOURS = 8;

  useEffect(() => {
    // Check if already attempted
    const attempted = localStorage.getItem('examAttempted');
    if (attempted === 'true') {
      setIsBlocked(true);
      setBlockMessage('You have already attempted this exam.');
      return;
    }

    // Check expiry
    const startTimeStr = localStorage.getItem('examStartTime');
    if (startTimeStr) {
      const startTime = new Date(startTimeStr);
      const now = new Date();
      const diffHours = (now - startTime) / (1000 * 60 * 60);

      if (diffHours >= EXPIRY_HOURS) {
        setIsBlocked(true);
        setBlockMessage('This exam is now closed (8-hour window expired).');
      }
    }
  }, []);

  const handleStart = () => {
    if (passkey.trim() === CORRECT_PASSKEY) {
      // Set start time if not already set
      if (!localStorage.getItem('examStartTime')) {
        localStorage.setItem('examStartTime', new Date().toISOString());
      }
      navigate('/sql-exam-test');
    } else {
      setError('Invalid Passkey. Please check and try again.');
    }
  };

  if (isBlocked) {
    return (
      <Layout>
        <div style={{
          maxWidth: '500px',
          width: '100%',
          padding: '40px',
          background: 'rgba(30, 41, 59, 0.7)',
          backdropFilter: 'blur(16px)',
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🚫</div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '16px' }}>Access Denied</h1>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '32px' }}>
            {blockMessage}
          </p>
          <button 
            onClick={() => navigate('/')}
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: '12px',
              border: 'none',
              background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
              color: 'white',
              fontSize: '1rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            Return Home
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div style={{
        maxWidth: '500px',
        width: '100%',
        padding: '40px',
        background: 'rgba(30, 41, 59, 0.7)',
        backdropFilter: 'blur(16px)',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ 
            display: 'inline-block',
            padding: '12px 20px',
            background: 'rgba(59, 130, 246, 0.1)',
            borderRadius: '100px',
            color: '#60a5fa',
            fontSize: '0.875rem',
            fontWeight: 700,
            letterSpacing: '0.05em',
            marginBottom: '16px'
          }}>
            FINAL CERTIFICATION
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '8px' }}>
            SQL Mastery Exam
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>
            Day 10: Advanced SQL Mastery Test
          </p>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '8px', fontWeight: 600 }}>
            Enter Exam Passkey
          </label>
          <input 
            type="text" 
            placeholder="XXXX-XXXX-XXXX-XXXX"
            value={passkey}
            onChange={(e) => {
              setPasskey(e.target.value);
              setError('');
            }}
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: '12px',
              border: '2px solid rgba(255, 255, 255, 0.1)',
              background: 'rgba(15, 23, 42, 0.5)',
              color: 'white',
              fontSize: '1.1rem',
              outline: 'none',
              transition: 'border-color 0.2s',
              fontFamily: 'monospace'
            }}
            onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
            onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
          />
          {error && (
            <p style={{ color: '#f87171', fontSize: '0.875rem', marginTop: '8px', fontWeight: 500 }}>
              {error}
            </p>
          )}
        </div>

        <div style={{ 
          background: 'rgba(15, 23, 42, 0.3)',
          borderRadius: '16px',
          padding: '20px',
          marginBottom: '32px',
          border: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
          <h3 style={{ fontSize: '0.9rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.05em' }}>
            Exam Rules
          </h3>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', color: '#cbd5e1', fontSize: '0.95rem' }}>
            <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '10px' }}>⏱️</span> 8-hour window from first access
            </li>
            <li style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '10px' }}>📝</span> 50 Hard/Expert SQL MCQs
            </li>
            <li style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '10px' }}>⚠️</span> Single attempt only
            </li>
          </ul>
        </div>

        <button 
          onClick={handleStart}
          style={{
            width: '100%',
            padding: '20px',
            borderRadius: '16px',
            border: 'none',
            background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
            color: 'white',
            fontSize: '1.25rem',
            fontWeight: 800,
            cursor: 'pointer',
            boxShadow: '0 10px 20px -5px rgba(37, 99, 235, 0.4)',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 15px 30px -5px rgba(37, 99, 235, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 10px 20px -5px rgba(37, 99, 235, 0.4)';
          }}
        >
          Start Examination
        </button>
      </div>
    </Layout>
  );
};

export default SqlExamAccess;
