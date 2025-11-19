import React, { useState } from 'react';
import QuizSetup from './components/QuizSetup';
import QuizInterface from './components/QuizInterface';
import './App.css';

function App() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizConfig, setQuizConfig] = useState(null);

  const startQuiz = (config) => {
    setQuizConfig(config);
    setQuizStarted(true);
  };

  const endQuiz = () => {
    setQuizStarted(false);
    setQuizConfig(null);
  };

  return (
    <div className="App">
      {!quizStarted ? (
        <QuizSetup onStartQuiz={startQuiz} />
      ) : (
        <QuizInterface config={quizConfig} onEndQuiz={endQuiz} />
      )}
    </div>
  );
}

export default App;
