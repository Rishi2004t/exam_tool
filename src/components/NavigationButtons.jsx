import React from 'react';

const NavigationButtons = ({ onNext, onPrevious, onSubmit }) => {
  return (
    <div className="navigation-buttons" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
      <button onClick={onPrevious}>Previous</button>
      <button onClick={onNext}>Next</button>
      <button onClick={onSubmit} style={{ backgroundColor: 'green', color: 'white' }}>Submit</button>
    </div>
  );
};

export default NavigationButtons;
