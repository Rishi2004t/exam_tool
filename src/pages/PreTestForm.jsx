import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PreTestForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [studentName, setStudentName] = useState('');
  const [prepLevel, setPrepLevel] = useState('');
  const [isHonest, setIsHonest] = useState(false);

  // Protect route
  if (!location.state || !location.state.subjectId) {
    return (
      <div className="app-container" style={{ justifyContent: 'center', alignItems: 'center' }}>
        <div className="glass-panel" style={{ padding: '40px', maxWidth: '400px', textAlign: 'center' }}>
          <h2>Missing Test Information</h2>
          <p>Please select a subject and unit first.</p>
          <button className="btn mt-4" onClick={() => navigate('/')}>Go to Dashboard</button>
        </div>
      </div>
    );
  }

  const { subjectId, subjectTitle, unitId, unitTitle } = location.state;

  const handleStartTest = (e) => {
    e.preventDefault();
    if (!studentName.trim() || !prepLevel || !isHonest) {
      alert("Please fill in all fields and confirm honesty before starting.");
      return;
    }

    navigate('/test', {
      state: {
        studentName,
        subjectId,
        subjectTitle,
        unitId,
        unitTitle,
        prepLevel
      }
    });
  };

  return (
    <div style={styles.pageWrapper} className="animate-in">
      <button 
        className="btn-secondary" 
        onClick={() => navigate(`/subject/${subjectId}`)}
        style={styles.backButton}
      >
        ← Back to Units
      </button>

      <div className="glass-panel" style={styles.formContainer}>
        <div style={styles.cardHeader}>
          <div style={styles.iconWrapper}>📝</div>
          <h2 style={styles.title}>Session Registration</h2>
          <p style={styles.subtitle}>Please provide your details before starting.</p>
        </div>

        <form onSubmit={handleStartTest} style={styles.form}>
          <div style={styles.infoSection}>
            <div style={styles.infoGroup}>
              <span style={styles.infoLabel}>Subject</span>
              <span style={styles.infoValue}>{subjectTitle}</span>
            </div>
            <div style={styles.divider}></div>
            <div style={styles.infoGroup}>
              <span style={styles.infoLabel}>Unit</span>
              <span style={styles.infoValue}>{unitTitle}</span>
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Student Name</label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Enter your full name"
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>How much have you studied?</label>
            <select 
              value={prepLevel} 
              onChange={(e) => setPrepLevel(e.target.value)}
              style={styles.select}
              required
            >
              <option value="" disabled>Select your preparation level</option>
              <option value="Fully Prepared">Fully Prepared</option>
              <option value="Partially Prepared">Partially Prepared</option>
              <option value="Just Started">Just Started</option>
            </select>
          </div>

          <div style={styles.checkboxGroup}>
            <label style={styles.checkboxLabel}>
              <input 
                type="checkbox" 
                checked={isHonest}
                onChange={(e) => setIsHonest(e.target.checked)}
                style={styles.checkbox}
                required
              />
              <span style={styles.checkboxText}>I confirm I will attempt the test honestly.</span>
            </label>
          </div>

          <button 
            type="submit" 
            className="btn" 
            style={{...styles.submitBtn, opacity: (!studentName || !prepLevel || !isHonest) ? 0.7 : 1}}
            disabled={!studentName || !prepLevel || !isHonest}
          >
            Start Test <span style={styles.btnIcon}>🚀</span>
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  pageWrapper: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
    position: 'relative',
    width: '100%'
  },
  backButton: {
    position: 'absolute',
    top: '40px',
    left: '40px',
    borderRadius: '12px',
  },
  formContainer: {
    padding: '48px',
    width: '100%',
    maxWidth: '560px',
  },
  cardHeader: {
    textAlign: 'center',
    marginBottom: '32px',
  },
  iconWrapper: {
    width: '72px',
    height: '72px',
    background: 'linear-gradient(135deg, var(--primary) 0%, #8b5cf6 100%)',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2rem',
    margin: '0 auto 24px',
    color: 'white',
    boxShadow: '0 8px 16px var(--primary-glow)'
  },
  title: {
    fontSize: '2rem',
  },
  subtitle: {
    fontSize: '1.05rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  infoSection: {
    display: 'flex',
    background: 'rgba(59, 130, 246, 0.05)',
    borderRadius: '16px',
    padding: '24px',
    border: '1px solid rgba(59, 130, 246, 0.1)',
  },
  infoGroup: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  divider: {
    width: '1px',
    backgroundColor: 'var(--surface-border)',
    margin: '0 24px',
  },
  infoLabel: {
    fontSize: '0.85rem',
    color: 'var(--text-secondary)',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontWeight: '700',
  },
  infoValue: {
    fontSize: '1.1rem',
    color: 'var(--text-primary)',
    fontWeight: '700',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  label: {
    fontSize: '1rem',
    fontWeight: '600',
    color: 'var(--text-primary)',
  },
  input: {
    padding: '16px 20px',
    borderRadius: '12px',
    border: '2px solid rgba(0,0,0,0.1)',
    fontSize: '1.05rem',
    transition: 'all 0.3s ease',
    background: 'var(--surface-bg)',
    color: 'var(--text-primary)',
    outline: 'none',
  },
  select: {
    padding: '16px 20px',
    borderRadius: '12px',
    border: '2px solid rgba(0,0,0,0.1)',
    fontSize: '1.05rem',
    cursor: 'pointer',
    background: 'var(--surface-bg)',
    color: 'var(--text-primary)',
    outline: 'none',
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 20px center',
    backgroundSize: '16px',
  },
  checkboxGroup: {
    marginTop: '12px',
    padding: '20px',
    background: 'var(--success-bg)',
    border: '1px solid rgba(16, 185, 129, 0.2)',
    borderRadius: '16px',
    transition: 'transform 0.2s',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    margin: 0,
  },
  checkbox: {
    width: '24px',
    height: '24px',
    marginRight: '16px',
    cursor: 'pointer',
    accentColor: 'var(--success)',
  },
  checkboxText: {
    fontSize: '1rem',
    color: 'var(--success)',
    fontWeight: '600',
  },
  submitBtn: {
    padding: '20px',
    fontSize: '1.2rem',
    borderRadius: '16px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '16px',
  },
  btnIcon: {
    marginLeft: '12px',
    fontSize: '1.3rem',
  }
};

export default PreTestForm;
