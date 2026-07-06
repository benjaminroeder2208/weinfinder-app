import ProgressBar from "./ProgressBar.jsx";
import { uiText } from "../uiText.js";

export default function QuizQuestion({ question, index, total, onAnswer }) {
  return (
    <div className="screen">
      <ProgressBar
        current={index + 1}
        total={total}
        prefix={uiText.questionPrefix}
        suffix={uiText.questionSuffix}
      />
      <h2>{question.question}</h2>
      <div>
        {question.options.map((opt) => (
          <button
            key={opt.value}
            className="option-button"
            onClick={() => onAnswer(question.field, opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
