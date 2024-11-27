import { useContext } from "react";
import { QuizContext } from "../stores/quiz-context";

export default function AnswerList({ onSelectAnswer }) {
  const quizState = useContext(QuizContext);

  function getAnswerClassName(_ans) {
    const { result, userAnswer } = quizState;
    // not selected any choice
    if (!userAnswer) {
      return "";
    }
    // selected a choice
    const isSelectedAns = userAnswer === _ans;

    if (isSelectedAns && result === "correct") {
      return "correct";
    }

    if (isSelectedAns && result === "wrong") {
      return "wrong";
    }

    if (isSelectedAns) {
      return "selected";
    }

    return "";
  }

  return (
    <ul id="answers">
      {quizState.question.answers.map((ans, idx) => {
        return (
          <li key={idx} className="answer">
            <button
              className={getAnswerClassName(ans)}
              onClick={() => onSelectAnswer(quizState.question.id, ans)}
            >
              {ans}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
