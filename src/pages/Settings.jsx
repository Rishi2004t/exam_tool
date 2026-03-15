import React, { useState } from 'react';
import { Sidebar, TopHeader } from './Home';
import { useTheme } from '../components/AnimatedBackground';

const ThemeSettings = () => {
  const { theme, updateTheme } = useTheme();

  const themes = [
    { id: 'blue', name: 'Blue', class: 'blue' },
    { id: 'purple', name: 'Purple', class: 'purple' },
    { id: 'teal', name: 'Teal', class: 'teal' },
    { id: 'dark', name: 'Dark', class: 'dark' },
  ];

  return (
    <div className="settings-section">
      <h3><span>🎨</span> Color Theme</h3>
      <p style={{marginBottom: '20px', color: '#94a3b8'}}>Select your preferred primary brand color</p>
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
  );
};

const Settings = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com'
  });

  const [examPrefs, setExamPrefs] = useState({
    timerEnabled: true,
    defaultTime: '20',
    navMode: 'free'
  });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    alert('Profile saved successfully!');
  };

  const handleResetData = () => {
    if (window.confirm('Are you sure you want to reset all test data? This will clear your learning progress.')) {
      sessionStorage.removeItem('edqualis-completed-units');
      window.location.reload(); // Refresh to update UI
    }
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="content-wrapper">
        <TopHeader />
        <div className="main-scroll-area">
          <div className="settings-container animate-in">
            <h1 className="page-title">Settings</h1>
            
            <ThemeSettings />

            <div className="settings-section">
              <h3><span>👤</span> Student Profile</h3>
              <form onSubmit={handleSaveProfile}>
                <div style={{ display: 'flex', gap: '24px', alignItems: 'center', marginBottom: '32px' }}>
                  <div className="user-avatar" style={{width: '80px', height: '80px', fontSize: '2rem'}}>JD</div>
                  <button type="button" className="btn btn-secondary">Change Avatar</button>
                </div>
                
                <div style={{marginBottom: '20px'}}>
                  <label style={{display: 'block', marginBottom: '8px', fontWeight: 600}}>Full Name</label>
                  <input 
                    type="text" 
                    className="btn-secondary"
                    style={{width: '100%', padding: '12px', borderRadius: '8px', color: 'white'}}
                    value={profile.name} 
                    onChange={(e) => setProfile({...profile, name: e.target.value})} 
                  />
                </div>
                
                <div style={{marginBottom: '24px'}}>
                  <label style={{display: 'block', marginBottom: '8px', fontWeight: 600}}>Email Address</label>
                  <input 
                    type="email" 
                    className="btn-secondary"
                    style={{width: '100%', padding: '12px', borderRadius: '8px', color: 'white'}}
                    value={profile.email} 
                    onChange={(e) => setProfile({...profile, email: e.target.value})} 
                  />
                </div>
                
                <button type="submit" className="btn btn-primary">Save Profile</button>
              </form>
            </div>

            <div className="settings-section">
              <h3><span>⏱️</span> Exam Preferences</h3>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
                <div>
                  <h4 style={{marginBottom: '4px'}}>Timer Toggle</h4>
                  <p style={{fontSize: '0.9rem', color: '#94a3b8'}}>Enable or disable the countdown timer.</p>
                </div>
                <input 
                  type="checkbox" 
                  style={{width: '24px', height: '24px'}}
                  checked={examPrefs.timerEnabled} 
                  onChange={() => setExamPrefs({...examPrefs, timerEnabled: !examPrefs.timerEnabled})}
                />
              </div>
            </div>

            <div className="settings-section" style={{ border: '1px solid #ef4444' }}>
              <h3 style={{ color: '#ef4444' }}>⚠️ Danger Zone</h3>
              <p style={{ marginBottom: '20px', color: '#94a3b8' }}>This will permanently delete your test history.</p>
                <button className="btn" style={{background: '#ef4444', color: 'white'}} onClick={handleResetData}>
                  Reset All Test Data
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
