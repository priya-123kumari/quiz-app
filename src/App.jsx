import { useState } from "react";
import Quiz from "./components/Quiz";
import { quizData } from "./data/quizData";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [questionCount, setQuestionCount] = useState(5);

  const startQuiz = () => {
    setQuizStarted(true);
  };

  const restartQuiz = () => {
    setQuizStarted(false);
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
            React Quiz App
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
        
        {!quizStarted ? (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
              Quiz Settings
            </h2>
            <div className="mb-6">
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Number of Questions (5-10):
              </label>
              <input
                type="range"
                min="5"
                max="10"
                value={questionCount}
                onChange={(e) => setQuestionCount(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="text-center mt-2 text-gray-800 dark:text-gray-200">
                {questionCount} questions
              </div>
            </div>
            <button
              onClick={startQuiz}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300"
            >
              Start Quiz
            </button>
          </div>
        ) : (
          <Quiz 
            allQuestions={quizData} 
            questionCount={questionCount} 
            onRestart={restartQuiz} 
          />
        )}
      </div>
    </div>
  );
}

export default App;