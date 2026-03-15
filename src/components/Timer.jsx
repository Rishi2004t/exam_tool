import React, { useState, useEffect } from 'react';

const Timer = ({ initialMinutes = 15, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (onTimeUp) {
        onTimeUp();
      }
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, onTimeUp]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isLowTime = timeLeft < 60; // Less than 1 minute remaining

  return (
    <div style={{ ...styles.timerContainer, backgroundColor: isLowTime ? '#fef2f2' : '#f8fafc', borderColor: isLowTime ? '#fca5a5' : '#e2e8f0', color: isLowTime ? '#ef4444' : '#1e293b' }}>
      <span style={styles.icon}>⏱️</span>
      <span style={styles.timeText}>{formatTime(timeLeft)}</span>
    </div>
  );
};

const styles = {
  timerContainer: {
    padding: '8px 16px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: '1.1rem',
    border: '1px solid',
  },
  icon: {
    marginRight: '8px',
    fontSize: '1.2rem',
  },
  timeText: {
    letterSpacing: '1px',
    fontFamily: 'monospace',
  }
};

export default Timer;
