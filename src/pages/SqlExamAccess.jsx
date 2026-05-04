import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from './Home';

const SqlExamAccess = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="animate-in" style={{
        maxWidth: '600px',
        margin: '80px auto',
        padding: '0 20px'
      }}>
        <div className="settings-section" style={{
          textAlign: 'center',
          padding: '60px 40px',
          borderRadius: '32px',
          boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
          border: '1px solid rgba(239, 68, 68, 0.2)',
          background: 'rgba(15, 23, 42, 0.9)',
          backdropFilter: 'blur(20px)'
        }}>
          <div style={{ fontSize: '5rem', marginBottom: '32px' }}>🔒</div>
          <h2 style={{ 
            color: 'white', 
            fontSize: '2.5rem', 
            fontWeight: 800, 
            marginBottom: '16px' 
          }}>Test Closed</h2>
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
            This test is now closed.
          </div>
          <p style={{ 
            color: '#94a3b8', 
            marginBottom: '48px',
            fontSize: '1.1rem',
            lineHeight: 1.6
          }}>
            This exam is no longer available. <br/>
            Please contact the administrator for more details regarding future schedules.
          </p>

          <button 
            className="btn btn-primary" 
            onClick={() => navigate('/')}
            style={{
              width: '100%',
              padding: '20px',
              fontSize: '1.2rem',
              borderRadius: '18px',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
              boxShadow: '0 10px 20px rgba(59, 130, 246, 0.3)',
              cursor: 'pointer',
              border: 'none',
              transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default SqlExamAccess;
