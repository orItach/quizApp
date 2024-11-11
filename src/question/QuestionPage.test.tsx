import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QuestionPage } from './index';
import { Question } from '../types';



const mockQuestion: Question = {
  questionText: "1+4?",
  options: ["5", "2", "3", "4"],
  correctAnswer: "5",
};

const setup = (selectedAnswer?: string) => {
  const handleAnswerSelect = jest.fn();
  const handleNext = jest.fn();
  const handlePrevious = jest.fn();

  render(
    <QuestionPage
      question={mockQuestion}
      questionIndex={0}
      totalQuestions={5}
      selectedAnswer={selectedAnswer}
      onAnswerSelect={handleAnswerSelect}
      onNext={handleNext}
      onPrevious={handlePrevious}
    />
  );

  return { handleAnswerSelect, handleNext, handlePrevious };
};

test('displays the question text and options', () => {
  setup();
  expect(screen.getByText(mockQuestion.questionText)).toBeInTheDocument();
  mockQuestion.options.forEach(option => {
    expect(screen.getByText(option)).toBeInTheDocument();
  });
});

test('disables the "Next" button until an answer is selected', () => {
  setup();
  const nextButton = screen.getByText("Next");
  expect(nextButton).toBeDisabled();
  fireEvent.click(screen.getByText(mockQuestion.correctAnswer));
  expect(nextButton).toHaveProperty('disabled', "")
});

test('calls onAnswerSelect when an option is selected', () => {
  const { handleAnswerSelect } = setup();
  fireEvent.click(screen.getByText(mockQuestion.correctAnswer));
  expect(handleAnswerSelect).toHaveBeenCalledWith(mockQuestion.correctAnswer);
});

test('calls onNext when the "Next" button is clicked after selecting an answer', () => {
  const { handleNext } = setup(mockQuestion.correctAnswer);
  const nextButton = screen.getByText("Next");
  fireEvent.click(nextButton);
  expect(handleNext).toHaveBeenCalled();
});
