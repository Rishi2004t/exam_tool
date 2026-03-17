import React, { useState } from 'react';
import { Layout } from './Home';
import { useTheme } from '../components/AnimatedBackground';

const ThemeSettings = () => {
  const { 
    theme, updateTheme, 
    mode, updateMode, 
    background, updateBackground 
  } = useTheme();

  const themes = [
    { id: 'blue', name: 'Blue', class: 'blue' },
    { id: 'purple', name: 'Purple', class: 'purple' },
    { id: 'teal', name: 'Teal', class: 'teal' },
    { id: 'dark', name: 'Slate', class: 'dark' },
  ];

  const backgrounds = [
    { id: 'blue-gradient', name: 'Blue Gradient', icon: '🌌' },
    { id: 'purple-gradient', name: 'Purple Gradient', icon: '⚛️' },
    { id: 'minimal-dark', name: 'Minimal Dark', icon: '🌑' },
  ];

  return (
    <>
      <div className="settings-section">
        <h3><span>🌓</span> App Mode</h3>
        <p style={{marginBottom: '20px', color: 'var(--text-secondary)'}}>Switch between light and dark modes</p>
        <div style={{display: 'flex', gap: '12px'}}>
          <button 
            className={`btn ${mode === 'light' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => updateMode('light')}
            style={{flex: 1, padding: '16px'}}
          >
            ☀️ Light Mode
          </button>
          <button 
            className={`btn ${mode === 'dark' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => updateMode('dark')}
            style={{flex: 1, padding: '16px'}}
          >
            🌙 Dark Mode
          </button>
        </div>
      </div>

      <div className="settings-section">
        <h3><span>🖼️</span> Dashboard Background</h3>
        <p style={{marginBottom: '20px', color: 'var(--text-secondary)'}}>Choose your preferred animated background style</p>
        <div className="background-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px'}}>
          {backgrounds.map((bg) => (
            <div 
              key={bg.id}
              className={`theme-card ${background === bg.id ? 'active' : ''}`}
              onClick={() => updateBackground(bg.id)}
              style={{
                padding: '24px',
                textAlign: 'center',
                cursor: 'pointer',
                borderRadius: '16px',
                background: 'var(--card-bg)',
                border: background === bg.id ? '2px solid var(--theme-primary)' : '1px solid var(--card-border)',
                transition: 'all 0.2s'
              }}
            >
              <div style={{fontSize: '2rem', marginBottom: '8px'}}>{bg.icon}</div>
              <div style={{fontWeight: 700, fontSize: '0.9rem'}}>{bg.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="settings-section">
        <h3><span>🎨</span> Accent Color</h3>
        <p style={{marginBottom: '20px', color: 'var(--text-secondary)'}}>Select the primary brand color for buttons and highlights</p>
        <div className="theme-grid">
          {themes.map((t) => (
            <div 
              key={t.id}
              className={`theme-card ${t.class} ${theme === t.id ? 'active' : ''}`}
              onClick={() => updateTheme(t.id)}
            >
              {t.name}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const Settings = () => {
  const { resetSettings } = useTheme();
  const [profile, setProfile] = useState({
    name: localStorage.getItem('studentName') || 'Guest Candidate',
    email: 'student@edqualis.edu'
  });

  const [examPrefs, setExamPrefs] = useState({
    timerEnabled: true,
    defaultTime: '20',
    navMode: 'free'
  });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    localStorage.setItem('studentName', profile.name);
    alert('Profile saved successfully!');
  };

  const handleResetData = () => {
    if (window.confirm('Are you sure you want to reset all data? This will clear your test history and theme preferences.')) {
      sessionStorage.removeItem('edqualis-completed-units');
      localStorage.removeItem('edqualis-test-history');
      resetSettings();
      window.location.reload(); 
    }
  };

  return (
    <Layout>
      <div className="settings-container animate-in">
        <h1 className="page-title">Settings</h1>
        
        <ThemeSettings />

        <div className="settings-section">
          <h3><span>👤</span> Student Profile</h3>
          <form onSubmit={handleSaveProfile}>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center', marginBottom: '32px' }}>
              <div className="user-avatar" style={{width: '80px', height: '80px', fontSize: '2rem', background: 'var(--theme-primary)', color: 'white'}}>
                {profile.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </div>
              <button type="button" className="btn btn-secondary">Change Avatar</button>
            </div>
            
            <div style={{marginBottom: '20px'}}>
              <label style={{display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--text-primary)'}}>Full Name</label>
              <input 
                type="text" 
                className="btn-secondary"
                style={{width: '100%', padding: '12px', borderRadius: '8px', color: 'var(--text-primary)', background: 'var(--input-bg)', border: '1px solid var(--card-border)'}}
                value={profile.name} 
                onChange={(e) => setProfile({...profile, name: e.target.value})} 
              />
            </div>
            
            <div style={{marginBottom: '24px'}}>
              <label style={{display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--text-primary)'}}>Email Address</label>
              <input 
                type="email" 
                className="btn-secondary"
                style={{width: '100%', padding: '12px', borderRadius: '8px', color: 'var(--text-primary)', background: 'var(--input-bg)', border: '1px solid var(--card-border)'}}
                value={profile.email} 
                disabled
              />
            </div>
            
            <button type="submit" className="btn btn-primary">Save Profile</button>
          </form>
        </div>

        <div className="settings-section">
          <h3><span>⏱️</span> Exam Preferences</h3>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
            <div>
              <h4 style={{marginBottom: '4px', color: 'var(--text-primary)'}}>Timer Toggle</h4>
              <p style={{fontSize: '0.9rem', color: 'var(--text-secondary)'}}>Enable or disable the countdown timer.</p>
            </div>
            <input 
              type="checkbox" 
              style={{width: '24px', height: '24px'}}
              checked={examPrefs.timerEnabled} 
              onChange={() => setExamPrefs({...examPrefs, timerEnabled: !examPrefs.timerEnabled})}
            />
          </div>
        </div>

        <div className="settings-section" style={{ border: '1px solid #ef4444', background: 'rgba(239, 68, 68, 0.05)' }}>
          <h3 style={{ color: '#ef4444' }}>⚠️ Danger Zone</h3>
          <p style={{ marginBottom: '20px', color: 'var(--text-secondary)' }}>This will permanently delete your test history and reset preferences.</p>
            <button className="btn" style={{background: '#ef4444', color: 'white'}} onClick={handleResetData}>
              Reset All Settings & Data
            </button>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
