import { useContext, useRef } from "react";
import { QuizContext } from "../stores/quiz-context";
import QUESTIONS from "../questions";

export default function AnswerList({ onSelectAnswer }) {
  const quizState = useContext(QuizContext);

  const shuffleAnswers = useRef();

  if (!shuffleAnswers.current) {
    shuffleAnswers.current = [...QUESTIONS[quizState.questionIdx].answers];
    shuffleAnswers.current.sort(() => Math.random() - 0.5);
  }

  function getAnswerClassName(_ans) {
    const { result, userAction, userAnswer } = quizState;
    // not selected any choice
    if (!userAction) {
      return "";
    }

    const isMatchedAnswer = userAnswer === _ans;

    if (isMatchedAnswer && result === "correct") {
      return "correct disable";
    }
    if (isMatchedAnswer && result === "wrong") {
      return "wrong disable";
    }
    if (isMatchedAnswer) {
      return "selected disable";
    }

    return "disable";
  }

  return (
    <ul id="answers">
      {shuffleAnswers.current.map((ans) => {
        return (
          <li key={ans} className="answer">
            <button
              className={getAnswerClassName(ans)}
              onClick={() => onSelectAnswer(quizState.question.id, ans)}
              disabled={!!quizState.userAction}
            >
              {ans}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
