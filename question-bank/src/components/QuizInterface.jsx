import React, { useState, useEffect, useCallback } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Question from './Question';
import ReviewMode from './ReviewMode';
import './QuizInterface.css';

const QuizInterface = ({ config, onEndQuiz }) => {
  const { questions, mode, numQuestions } = config;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [submittedAnswers, setSubmittedAnswers] = useState({});
  const [timeSpent, setTimeSpent] = useState(0);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [timePerQuestion, setTimePerQuestion] = useState({});
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Timer for timed mode
  const totalTime = mode === 'timed' ? numQuestions * 2 * 60 : null; // 2 minutes per question in seconds

  const handleSubmitQuiz = useCallback(() => {
    // Auto-submit any unsubmitted answers
    const finalAnswers = { ...submittedAnswers };
    Object.keys(userAnswers).forEach(index => {
      if (!finalAnswers[index]) {
        finalAnswers[index] = userAnswers[index];
      }
    });
    setSubmittedAnswers(finalAnswers);
    setQuizCompleted(true);

    if (mode === 'timed') {
      setIsReviewMode(true);
    }
  }, [submittedAnswers, userAnswers, mode]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSpent(prev => {
        if (mode === 'timed' && totalTime && prev >= totalTime) {
          handleSubmitQuiz();
          return prev;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [mode, totalTime, handleSubmitQuiz]);

  const handleAnswerSelect = (answer) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: answer
    }));
  };

  const handleSubmitAnswer = () => {
    if (!userAnswers[currentQuestionIndex]) {
      alert('Please select an answer before submitting');
      return;
    }

    const timeForQuestion = Math.floor((Date.now() - questionStartTime) / 1000);
    setTimePerQuestion(prev => ({
      ...prev,
      [currentQuestionIndex]: timeForQuestion
    }));

    setSubmittedAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: userAnswers[currentQuestionIndex]
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setQuestionStartTime(Date.now());
    } else if (mode === 'timed' && !quizCompleted) {
      handleSubmitQuiz();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setQuestionStartTime(Date.now());
    }
  };

  const handleJumpToQuestion = (index) => {
    setCurrentQuestionIndex(index);
    setQuestionStartTime(Date.now());
  };

  const isTutorMode = mode === 'tutor';
  const isAnswerSubmitted = submittedAnswers[currentQuestionIndex] !== undefined;
  const showExplanation = isTutorMode && isAnswerSubmitted;

  if (isReviewMode) {
    return (
      <ReviewMode
        questions={questions}
        userAnswers={submittedAnswers}
        timePerQuestion={timePerQuestion}
        totalTime={timeSpent}
        onEndQuiz={onEndQuiz}
      />
    );
  }

  return (
    <div className="quiz-interface">
      <Header
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={questions.length}
        questionId={questions[currentQuestionIndex].id}
        timeSpent={timeSpent}
        totalTime={totalTime}
        onEndQuiz={quizCompleted ? () => setIsReviewMode(true) : handleSubmitQuiz}
        quizCompleted={quizCompleted}
      />

      <div className="quiz-main">
        <Sidebar
          totalQuestions={questions.length}
          currentQuestion={currentQuestionIndex}
          submittedAnswers={submittedAnswers}
          onJumpToQuestion={handleJumpToQuestion}
        />

        <Question
          question={questions[currentQuestionIndex]}
          selectedAnswer={userAnswers[currentQuestionIndex]}
          submittedAnswer={submittedAnswers[currentQuestionIndex]}
          onAnswerSelect={handleAnswerSelect}
          onSubmit={handleSubmitAnswer}
          onNext={handleNextQuestion}
          onPrevious={handlePreviousQuestion}
          showExplanation={showExplanation}
          isFirst={currentQuestionIndex === 0}
          isLast={currentQuestionIndex === questions.length - 1}
          mode={mode}
          questionTimeSpent={timePerQuestion[currentQuestionIndex]}
        />
      </div>
    </div>
  );
};

export default QuizInterface;
