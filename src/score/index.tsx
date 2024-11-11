interface ScoreProps {
  score: number;
}

export const ScoresPage = ({ score }:ScoreProps) => (
    <div>
        <h1>Your Score: {score}%</h1>
    </div>
);