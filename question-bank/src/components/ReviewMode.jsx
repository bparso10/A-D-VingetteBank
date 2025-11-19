import React, { useState } from 'react';
import Question from './Question';
import './ReviewMode.css';

const ReviewMode = ({ questions, userAnswers, timePerQuestion, totalTime, onEndQuiz }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return {
      correct,
      total: questions.length,
      percentage: ((correct / questions.length) * 100).toFixed(1)
    };
  };

  const score = calculateScore();

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="review-mode">
      <div className="review-header">
        <div className="score-summary">
          <h2>Quiz Complete!</h2>
          <p className="score">Score: {score.correct} / {score.total} ({score.percentage}%)</p>
          <p className="time">Total Time: {formatTime(totalTime)}</p>
        </div>
        <button className="end-review-btn" onClick={onEndQuiz}>
          End Review & Return to Setup
        </button>
      </div>

      <div className="review-navigation">
        <h3>Review Question {currentQuestionIndex + 1} of {questions.length}</h3>
        <div className="question-grid">
          {questions.map((_, index) => {
            const isCorrect = userAnswers[index] === questions[index].correctAnswer;
            return (
              <div
                key={index}
                className={`grid-item ${index === currentQuestionIndex ? 'active' : ''} ${isCorrect ? 'correct' : 'incorrect'}`}
                onClick={() => setCurrentQuestionIndex(index)}
              >
                {index + 1}
              </div>
            );
          })}
        </div>
      </div>

      <div className="review-question">
        <Question
          question={questions[currentQuestionIndex]}
          selectedAnswer={userAnswers[currentQuestionIndex]}
          submittedAnswer={userAnswers[currentQuestionIndex]}
          onAnswerSelect={() => {}}
          onSubmit={() => {}}
          onNext={handleNext}
          onPrevious={handlePrevious}
          showExplanation={true}
          isFirst={currentQuestionIndex === 0}
          isLast={currentQuestionIndex === questions.length - 1}
          mode="review"
          questionTimeSpent={timePerQuestion[currentQuestionIndex]}
        />
      </div>
    </div>
  );
};

export default ReviewMode;
