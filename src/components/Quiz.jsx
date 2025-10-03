import { useState, useEffect } from "react";
import Question from "./Question";
import ProgressBar from "./ProgressBar";
import Results from "./Results";
import { shuffleArray } from "../utils/shuffleArray";

const Quiz = ({ allQuestions }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  // Shuffle questions and options when component mounts
  useEffect(() => {
    const shuffledQuestions = shuffleArray([...allQuestions]).map(question => ({
      ...question,
      options: shuffleArray([...question.options])
    }));
    setQuestions(shuffledQuestions);
  }, [allQuestions]);

  if (questions.length === 0) return <div>Loading quiz...</div>;

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleAnswerSelect = (answer) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setUserAnswers(newAnswers);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      calculateScore();
      setShowResults(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const calculateScore = () => {
    let newScore = 0;
    questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        newScore++;
      }
    });
    setScore(newScore);
  };

  const restartQuiz = () => {
    // Reshuffle questions on restart
    const shuffledQuestions = shuffleArray([...allQuestions]).map(question => ({
      ...question,
      options: shuffleArray([...question.options])
    }));
    setQuestions(shuffledQuestions);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setShowResults(false);
    setScore(0);
  };

  if (showResults) {
    return <Results score={score} totalQuestions={questions.length} onRestart={restartQuiz} />;
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-2xl">
      <ProgressBar current={currentQuestionIndex + 1} total={questions.length} />
      
      <Question
        question={currentQuestion.question}
        options={currentQuestion.options}
        selectedAnswer={userAnswers[currentQuestionIndex]}
        onAnswerSelect={handleAnswerSelect}
        showResult={false}
        correctAnswer={currentQuestion.correctAnswer}
      />

      <div className="flex justify-between mt-8">
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className={`px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
            currentQuestionIndex === 0
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={!userAnswers[currentQuestionIndex]}
          className={`px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
            !userAnswers[currentQuestionIndex]
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {isLastQuestion ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default Quiz;