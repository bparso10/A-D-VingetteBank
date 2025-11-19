import React from 'react';
import './Header.css';

const Header = ({
  currentQuestion,
  totalQuestions,
  questionId
}) => {
  return (
    <div className="header">
      <div className="header-left">
        <span className="item-count">Item {currentQuestion} of {totalQuestions}</span>
        <span className="question-id">Question ID: {questionId}</span>
        <button className="mark-btn">
          <span className="flag-icon">🚩</span> Mark
        </button>
      </div>

      <div className="header-center">
        <button className="nav-btn" disabled>Previous</button>
        <button className="nav-btn">Next</button>
      </div>

      <div className="header-right">
        <button className="icon-btn">Instructions</button>
        <button className="icon-btn">Lab Values</button>
        <button className="icon-btn">Calculator</button>
        <div className="font-controls">
          <button className="font-btn">A</button>
          <button className="font-btn">A</button>
          <button className="font-btn">A</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
