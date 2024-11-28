import { useContext } from "react";
import quizComplete from "../assets/quiz-complete.png";
import { QuizContext } from "../stores/quiz-context";

export default function Summary() {
  const quizState = useContext(QuizContext);

  function getSkipPercentage() {
    return ((100 / quizState.questionAmount) * quizState.skipCount).toFixed(0);
  }

  function getCorrectPercentage() {
    return ((100 / quizState.questionAmount) * quizState.userScore).toFixed(0);
  }

  function getIncorrectPercentage() {
    return (
      (100 / quizState.questionAmount) *
      (quizState.questionAmount - quizState.userScore)
    ).toFixed(0);
  }

  console.log({ history: quizState.history });

  return (
    <div id="summary">
      <img src={quizComplete} alt="Trophy" />
      <h2>QUIZ COMPLETED</h2>
      <div id="summary-stats">
        <div>
          <p className="number">{getSkipPercentage()}%</p>
          <p className="text">SKIPPED</p>
        </div>
        <div>
          <p className="number">{getCorrectPercentage()}%</p>
          <p className="text">ANSWERED CORRECTLY</p>
        </div>
        <div>
          <p className="number">{getIncorrectPercentage()}%</p>
          <p className="text">ANSWERED INCORRECTLY</p>
        </div>
      </div>
      <ol>
        {quizState.history.map((item, index) => {
          console.log({ item });
          return (
            <li key={index}>
              <h3>{index + 1}</h3>
              <div className="question">{item.question.text}</div>
              <div className={"user-answer " + item.result}>
                {item.result === "skip" && <p>(skipped)</p>}
                {item.result !== "skip" && item.userAnswer}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
