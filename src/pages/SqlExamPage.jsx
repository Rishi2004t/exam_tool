import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SqlExamPage = () => {
  const navigate = useNavigate();
  
  // IMMEDIATELY BLOCK ACCESS AS TEST IS CLOSED
  useEffect(() => {
    navigate('/sql-exam');
  }, [navigate]);
  
  return null; // Don't render anything as the test is closed
};

/*
  // --- PREVIOUS LOGIC PRESERVED BELOW FOR REFERENCE ---
  // (Original code commented out to prevent syntax errors while maintaining a backup)
  
  import { useState } from 'react';
  import { sqlQuestions } from '../data/sqlQuestions';
  
  const SqlExamPageContent = () => {
    const examQuestions = sqlQuestions;
    const examTitle = "SQL Master Examination";
    const subjectTitle = "Database Management";

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
    const [isSubmitted, setIsSubmitted] = useState(false);

    // ... rest of the logic ...
  }
*/

export default SqlExamPage;
