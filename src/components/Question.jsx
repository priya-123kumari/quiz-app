import { useEffect, useState } from "react";

const Question = ({
  question,
  options,
  selectedAnswer,
  onAnswerSelect,
  showResult,
  correctAnswer,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    setSelectedOption(selectedAnswer);
  }, [selectedAnswer]);

  const handleOptionSelect = (option) => {
    if (!showResult) {
      setSelectedOption(option);
      onAnswerSelect(option);
    }
  };

  const getOptionClasses = (option) => {
    let classes = "p-4 rounded-lg mb-3 cursor-pointer transition-all duration-200 ";
    
    if (showResult) {
      if (option === correctAnswer) {
        classes += "bg-green-100 border-2 border-green-500";
      } else if (option === selectedOption && option !== correctAnswer) {
        classes += "bg-red-100 border-2 border-red-500";
      } else {
        classes += "bg-gray-100";
      }
    } else {
      classes += option === selectedOption 
        ? "bg-blue-100 border-2 border-blue-500" 
        : "bg-gray-100 hover:bg-gray-200";
    }

    return classes;
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl md:text-2xl font-bold mb-6 text-gray-800">
        {question}
      </h2>
      <div className="space-y-3">
        {options.map((option, index) => (
          <div
            key={index}
            className={getOptionClasses(option)}
            onClick={() => handleOptionSelect(option)}
          >
            <div className="flex items-center">
              <span className="mr-3 font-semibold">
                {String.fromCharCode(65 + index)}.
              </span>
              <span>{option}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Question;