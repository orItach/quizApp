import { Question } from '../types/index';

interface QuestionPageProps {
  question: Question;
  questionIndex: number;
  totalQuestions: number;
  selectedAnswer: string | undefined;
  onAnswerSelect: (answer: string) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const QuestionPage= ({
  question,
  questionIndex,
  totalQuestions,
  selectedAnswer,
  onAnswerSelect,
  onNext,
  onPrevious,
}:QuestionPageProps) => (
    <div>
        <h2>{question.questionText}</h2>
        <div>
            {question.options.map((option) => (
                <button
                    key={option}
                    onClick={() => onAnswerSelect(option)}
                    disabled={selectedAnswer !== undefined}>
                    {option}
                </button>
            ))}
        </div>
        <div>
            {questionIndex > 0 && <button onClick={onPrevious}>Previous</button>}
            {selectedAnswer === undefined ?
                <button
                    onClick={onNext} disabled={true}> 
                    
                    {questionIndex === totalQuestions - 1 ? "Submit" : "Next"}
                </button> :
                <button
                    onClick={onNext}>
                
                    {questionIndex === totalQuestions - 1 ? "Submit" : "Next"}
                </button>
            }
        </div>
    </div>
);