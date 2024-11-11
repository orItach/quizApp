import { useState } from 'react';
import { quizQuestions } from './types/quizData.ts';
import { QuestionPage } from './question';
import { ScoresPage } from './score';

const App = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showScores, setShowScores] = useState(false);

  const handleAnswerSelect = (answer: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizQuestions.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowScores(true);
    }
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const calculateScore = () => {
    const correctAnswersCount = quizQuestions.questions.reduce((score, question, index) => {
      return selectedAnswers[index] === question.correctAnswer ? score + 1 : score;
    }, 0);
    return (correctAnswersCount / quizQuestions.questions.length) * 100;
  };

  return (
    <div>
      {showScores ? (
        <ScoresPage score={calculateScore()} />
      ) : (
        <QuestionPage
          question={quizQuestions.questions[currentQuestionIndex]}
          questionIndex={currentQuestionIndex}
          totalQuestions={quizQuestions.questions.length}
          selectedAnswer={selectedAnswers[currentQuestionIndex]}
          onAnswerSelect={handleAnswerSelect}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      )}
    </div>
  );
};

export default App