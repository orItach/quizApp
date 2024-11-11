// App.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './app';

test('navigates through questions and displays final score on submit', () => {
  render(<App />);

  const questions = [
    "1+4?",
    "6*2?",
    "6-4?",
    "3+5?",
    "8?"
  ];

  expect(screen.getByText(questions[0])).toBeInTheDocument();
  fireEvent.click(screen.getByText("5"));
  fireEvent.click(screen.getByText("Next"));

  expect(screen.getByText(questions[1])).toBeInTheDocument();
  fireEvent.click(screen.getByText("12"));
  fireEvent.click(screen.getByText("Next"));

  expect(screen.getByText(questions[2])).toBeInTheDocument();
  fireEvent.click(screen.getByText("2"));
  fireEvent.click(screen.getByText("Next"));

  expect(screen.getByText(questions[3])).toBeInTheDocument();
  fireEvent.click(screen.getByText("8"));
  fireEvent.click(screen.getByText("Next"));

  expect(screen.getByText(questions[4])).toBeInTheDocument();
  fireEvent.click(screen.getByText("7"));
  fireEvent.click(screen.getByText("Submit"));
  // Verify final score is displayed
  expect(screen.getByText("Your Score: 80%")).toBeInTheDocument();
});
