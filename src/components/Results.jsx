const Results = ({ score, totalQuestions, onRestart }) => {
  const percentage = Math.round((score / totalQuestions) * 100);

  const getResultMessage = () => {
    if (percentage >= 80) return "Excellent! 🎉";
    if (percentage >= 60) return "Good job! 👍";
    if (percentage >= 40) return "Not bad! 😊";
    return "Keep practicing! 💪";
  };

  return (
    <div className="text-center p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
        Quiz Completed!
      </h2>
      <div className="mb-6">
        <div className="text-5xl font-bold mb-2 text-blue-600">{percentage}%</div>
        <div className="text-lg text-gray-600">
          {score} out of {totalQuestions} correct
        </div>
      </div>
      <div className="text-xl font-semibold mb-6 text-gray-700">
        {getResultMessage()}
      </div>
      <button
        onClick={onRestart}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300"
      >
        Restart Quiz
      </button>
    </div>
  );
};

export default Results;