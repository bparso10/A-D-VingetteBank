import React from 'react';
import './Sidebar.css';

const Sidebar = ({ totalQuestions, currentQuestion, submittedAnswers, onJumpToQuestion }) => {
  return (
    <div className="sidebar">
      {Array.from({ length: totalQuestions }, (_, i) => (
        <div
          key={i}
          className={`sidebar-item ${i === currentQuestion ? 'active' : ''} ${submittedAnswers[i] ? 'answered' : ''}`}
          onClick={() => onJumpToQuestion(i)}
        >
          {i + 1}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
