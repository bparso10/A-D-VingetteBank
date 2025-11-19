import React, { useState, useEffect } from 'react';
import questionsData from '../data/questions.json';
import './QuizSetup.css';

const QuizSetup = ({ onStartQuiz }) => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [subtopics, setSubtopics] = useState([]);
  const [selectedSubtopics, setSelectedSubtopics] = useState([]);
  const [numQuestions, setNumQuestions] = useState(10);
  const [mode, setMode] = useState('tutor');

  useEffect(() => {
    // Extract unique subjects from questions
    const uniqueSubjects = [...new Set(questionsData.map(q => q.subject))];
    setSubjects(uniqueSubjects);
  }, []);

  useEffect(() => {
    // Extract subtopics for selected subject
    if (selectedSubject) {
      const subjectQuestions = questionsData.filter(q => q.subject === selectedSubject);
      const uniqueSubtopics = [...new Set(subjectQuestions.map(q => q.subtopic))];
      setSubtopics(uniqueSubtopics);
      setSelectedSubtopics([]); // Reset selected subtopics
    }
  }, [selectedSubject]);

  const handleSubtopicToggle = (subtopic) => {
    setSelectedSubtopics(prev =>
      prev.includes(subtopic)
        ? prev.filter(s => s !== subtopic)
        : [...prev, subtopic]
    );
  };

  const handleSelectAllSubtopics = () => {
    setSelectedSubtopics(subtopics);
  };

  const handleDeselectAllSubtopics = () => {
    setSelectedSubtopics([]);
  };

  const handleStartQuiz = () => {
    if (!selectedSubject) {
      alert('Please select a subject');
      return;
    }

    // Filter questions based on selections
    let filteredQuestions = questionsData.filter(q => q.subject === selectedSubject);

    if (selectedSubtopics.length > 0) {
      filteredQuestions = filteredQuestions.filter(q => selectedSubtopics.includes(q.subtopic));
    }

    if (filteredQuestions.length === 0) {
      alert('No questions available for selected criteria');
      return;
    }

    // Randomize and select the number of questions
    const shuffled = filteredQuestions.sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffled.slice(0, Math.min(numQuestions, filteredQuestions.length));

    onStartQuiz({
      questions: selectedQuestions,
      mode,
      numQuestions: selectedQuestions.length
    });
  };

  return (
    <div className="quiz-setup">
      <div className="setup-container">
        <h1>USMLE Question Bank</h1>

        <div className="setup-section">
          <label>Subject:</label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="setup-select"
          >
            <option value="">Select a subject</option>
            {subjects.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
        </div>

        {selectedSubject && subtopics.length > 0 && (
          <div className="setup-section">
            <label>Subtopics (optional - leave unselected for all):</label>
            <div className="subtopic-buttons">
              <button onClick={handleSelectAllSubtopics} className="subtopic-btn">
                Select All
              </button>
              <button onClick={handleDeselectAllSubtopics} className="subtopic-btn">
                Deselect All
              </button>
            </div>
            <div className="subtopics-list">
              {subtopics.map(subtopic => (
                <label key={subtopic} className="subtopic-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedSubtopics.includes(subtopic)}
                    onChange={() => handleSubtopicToggle(subtopic)}
                  />
                  {subtopic}
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="setup-section">
          <label>Number of Questions:</label>
          <input
            type="number"
            min="1"
            max="100"
            value={numQuestions}
            onChange={(e) => setNumQuestions(parseInt(e.target.value))}
            className="setup-input"
          />
        </div>

        <div className="setup-section">
          <label>Mode:</label>
          <div className="mode-options">
            <label className="mode-option">
              <input
                type="radio"
                value="tutor"
                checked={mode === 'tutor'}
                onChange={(e) => setMode(e.target.value)}
              />
              <span>Tutor Mode (Untimed, Immediate Feedback)</span>
            </label>
            <label className="mode-option">
              <input
                type="radio"
                value="timed"
                checked={mode === 'timed'}
                onChange={(e) => setMode(e.target.value)}
              />
              <span>Timed/Test Mode (2 min per question, Review at end)</span>
            </label>
          </div>
        </div>

        <button onClick={handleStartQuiz} className="start-quiz-btn">
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizSetup;
