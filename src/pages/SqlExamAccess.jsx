import React from 'react';
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
  const navigate = useNavigate();

  return (
    <Layout>
      <div style={{
        maxWidth: '500px',
        width: '100%',
        padding: '40px',
        background: 'rgba(30, 41, 59, 0.7)',
        backdropFilter: 'blur(16px)',
        borderRadius: '24px',
        border: '1px solid rgba(239, 68, 68, 0.2)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '5rem', marginBottom: '32px' }}>🔒</div>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 900, 
          color: 'white', 
          marginBottom: '16px' 
        }}>Test Closed</h1>
        
        <div style={{ 
          background: 'rgba(239, 68, 68, 0.1)', 
          color: '#f87171', 
          padding: '16px 24px', 
          borderRadius: '16px',
          fontSize: '1.2rem',
          fontWeight: 700,
          marginBottom: '32px',
          border: '1px solid rgba(239, 68, 68, 0.2)'
        }}>
          This examination is now closed.
        </div>
        
        <p style={{ 
          color: '#94a3b8', 
          marginBottom: '48px',
          fontSize: '1.1rem',
          lineHeight: 1.6
        }}>
          The 8-hour window for the SQL Mastery Exam has concluded. <br/>
          No further attempts are permitted. 
        </p>

        <button 
          onClick={() => navigate('/')}
          style={{
            width: '100%',
            padding: '20px',
            borderRadius: '16px',
            border: 'none',
            background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
            color: 'white',
            fontSize: '1.2rem',
            fontWeight: 800,
            cursor: 'pointer',
            boxShadow: '0 10px 20px -5px rgba(37, 99, 235, 0.4)',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
        >
          Back to Dashboard
        </button>
      </div>
    </Layout>
  );
};

export default SqlExamAccess;
