import { useContext } from "react";
import { QuizContext } from "../stores/quiz-context";

export default function AnswerList({ onSelectAnswer }) {
  const quizState = useContext(QuizContext);

  const shuffleAnswers = quizState.question.answers;

  function getAnswerClassName(_ans) {
    const { result, userAnswer } = quizState;
    // not selected any choice
    if (!userAnswer) {
      return "";
    }
    // selected a choice
    const isSelectedAns = userAnswer === _ans;

    if (isSelectedAns && result === "correct") {
      return "correct disable";
    }
    if (isSelectedAns && result === "wrong") {
      return "wrong disable";
    }
    if (isSelectedAns) {
      return "selected disable";
    }

    return "disable";
  }

  return (
    <ul id="answers">
      {shuffleAnswers.map((ans) => {
        return (
          <li key={ans} className="answer">
            <button
              className={getAnswerClassName(ans)}
              onClick={() => onSelectAnswer(quizState.question.id, ans)}
              // disabled={!!quizState.userAnswer}
            >
              {ans}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
