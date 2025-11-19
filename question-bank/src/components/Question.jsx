import React from 'react';
import './Question.css';

const Question = ({
  question,
  selectedAnswer,
  submittedAnswer,
  onAnswerSelect,
  onSubmit,
  onNext,
  onPrevious,
  showExplanation,
  isFirst,
  isLast,
  mode,
  questionTimeSpent
}) => {
  const { question: questionText, choices, correctAnswer, explanation, detailedExplanation, statistics } = question;

  const getAnswerClass = (choice) => {
    if (!submittedAnswer) {
      return selectedAnswer === choice ? 'selected' : '';
    }

    if (showExplanation) {
      if (choice === correctAnswer) {
        return 'correct';
      }
      if (choice === submittedAnswer && choice !== correctAnswer) {
        return 'incorrect';
      }
    }
    return submittedAnswer === choice ? 'selected' : '';
  };

  const formatTime = (seconds) => {
    if (!seconds) return '00:00:00';
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const getCorrectPercentage = () => {
    if (statistics && statistics[correctAnswer]) {
      return statistics[correctAnswer].toFixed(2);
    }
    return '0.00';
  };

  return (
    <div className="question-container">
      <div className="question-text">
        {questionText}
      </div>

      <div className="answer-choices">
        {Object.entries(choices).map(([choice, text]) => (
          <div
            key={choice}
            className={`answer-choice ${getAnswerClass(choice)}`}
            onClick={() => !submittedAnswer && onAnswerSelect(choice)}
          >
            <div className="choice-content">
              <input
                type="radio"
                checked={selectedAnswer === choice || submittedAnswer === choice}
                onChange={() => !submittedAnswer && onAnswerSelect(choice)}
                disabled={!!submittedAnswer}
              />
              <span className="choice-label">({choice})</span>
              <span className="choice-text">{text}</span>
            </div>
            {showExplanation && statistics && statistics[choice] && (
              <span className="choice-percentage">{statistics[choice].toFixed(2)}%</span>
            )}
          </div>
        ))}
      </div>

      {!submittedAnswer && (
        <button className="submit-btn" onClick={onSubmit}>
          Submit
        </button>
      )}

      {showExplanation && (
        <div className="explanation-section">
          <div className="stats-bar">
            <div className={`stat-item ${submittedAnswer === correctAnswer ? 'correct-answer' : 'incorrect-answer'}`}>
              <span className="stat-icon">{submittedAnswer === correctAnswer ? '✓' : '✗'}</span>
              <span>{submittedAnswer === correctAnswer ? 'Correct Answer' : 'Incorrect Answer'}</span>
            </div>
            <div className="stat-item">
              <span className="stat-icon">📊</span>
              <span>{getCorrectPercentage()}% Answered Correctly</span>
            </div>
            <div className="stat-item">
              <span className="stat-icon">⏱</span>
              <span>{formatTime(questionTimeSpent)} Time Spent</span>
            </div>
            <div className="stat-item">
              <span className="stat-icon">📅</span>
              <span>{question.lastUpdated} Last Updated</span>
            </div>
          </div>

          <div className="explanation-content">
            <h3>Explanation</h3>

            {question.tags && question.tags.length > 0 && (
              <div className="tags">
                {question.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}{index < question.tags.length - 1 ? ' > ' : ''}
                  </span>
                ))}
              </div>
            )}

            <div className="explanation-text">
              <p><strong>Answer {correctAnswer} (correct answer):</strong> {detailedExplanation.correct || detailedExplanation[correctAnswer]}</p>

              {Object.entries(choices).map(([choice]) => {
                if (choice !== correctAnswer && detailedExplanation[choice]) {
                  return (
                    <p key={choice}>
                      <strong>Answer {choice} (incorrect answer):</strong> {detailedExplanation[choice]}
                    </p>
                  );
                }
                return null;
              })}
            </div>

            {explanation && (
              <div className="general-explanation">
                <p>{explanation}</p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="navigation-buttons">
        <button
          className="nav-button"
          onClick={onPrevious}
          disabled={isFirst}
        >
          Previous
        </button>
        <button
          className="nav-button"
          onClick={onNext}
          disabled={!submittedAnswer && mode === 'tutor'}
        >
          {isLast ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default Question;
