import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SqlExamPage = () => {
  const navigate = useNavigate();
  
  // IMMEDIATELY BLOCK ACCESS AS TEST IS CLOSED
  useEffect(() => {
    navigate('/sql-exam');
  }, [navigate]);
  
  return null;
};

export default SqlExamPage;
