import React from 'react';

const QuestionCard = ({ questionNumber, totalQuestions, question, options, selectedOption, onSelect }) => {
  if (!question || !options) {
    return <div className="error-card">Question data is missing.</div>;
  }

  const optionLabels = ['A', 'B', 'C', 'D'];

  return (
    <div style={styles.card}>
      <div style={styles.questionHeader}>
        <span style={styles.questionBadge}>Question {questionNumber} of {totalQuestions}</span>
      </div>
      
      <h3 style={styles.questionText}>{question}</h3>
      
      <div style={styles.optionsContainer}>
        {options.map((option, index) => {
          const isSelected = selectedOption === index;
          return (
            <label
              key={index}
              style={{
                ...styles.optionLabel,
                backgroundColor: isSelected ? '#eff6ff' : '#ffffff',
                borderColor: isSelected ? '#3b82f6' : '#e2e8f0',
                boxShadow: isSelected ? '0 0 0 1px #3b82f6' : 'none',
              }}
              onMouseOver={(e) => {
                if (!isSelected) e.currentTarget.style.backgroundColor = '#f8fafc';
              }}
              onMouseOut={(e) => {
                if (!isSelected) e.currentTarget.style.backgroundColor = '#ffffff';
              }}
            >
              <div style={styles.radioWrapper}>
                <input
                  type="radio"
                  name={`mcq-option-${questionNumber}`}
                  value={index}
                  checked={isSelected}
                  onChange={() => onSelect(index)}
                  style={styles.hiddenRadio}
                />
                <div style={{
                  ...styles.customRadio,
                  borderColor: isSelected ? '#3b82f6' : '#cbd5e1',
                }}>
                  {isSelected && <div style={styles.radioDot} />}
                </div>
              </div>
              <span style={{...styles.optionLetter, color: isSelected ? '#2563eb' : '#64748b'}}>{optionLabels[index]}.</span>
              <span style={{...styles.optionText, fontWeight: isSelected ? '500' : 'normal'}}>{option}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

const styles = {
  card: {
    padding: '10px 0',
  },
  questionHeader: {
    marginBottom: '20px',
  },
  questionBadge: {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  questionText: {
    fontSize: '1.6rem',
    color: '#0f172a',
    marginBottom: '32px',
    lineHeight: '1.5',
    fontWeight: '500',
  },
  optionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  optionLabel: {
    display: 'flex',
    alignItems: 'center',
    padding: '20px 24px',
    borderRadius: '12px',
    border: '1px solid',
    cursor: 'pointer',
    transition: 'all 0.2s',
    userSelect: 'none',
  },
  radioWrapper: {
    position: 'relative',
    marginRight: '20px',
    display: 'flex',
    alignItems: 'center',
  },
  hiddenRadio: {
    opacity: 0,
    position: 'absolute',
    cursor: 'pointer',
  },
  customRadio: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    border: '2px solid',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    transition: 'all 0.2s',
  },
  radioDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: '#3b82f6',
  },
  optionLetter: {
    fontWeight: 'bold',
    marginRight: '12px',
    fontSize: '1.15rem',
  },
  optionText: {
    fontSize: '1.15rem',
    color: '#334155',
  }
};

export default QuestionCard;
