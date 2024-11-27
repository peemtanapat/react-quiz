import { useState } from "react";
import QUESTIONS from "../questions";
import ProgressBar from "./ProgressBar";

const _ANSWER = {
  q1: "A library to build user interfaces with help of declarative code.",
  q2: "Enabling the use of state and other React features in functional components.",
  q3: "A JavaScript extension that adds HTML-like syntax to JavaScript.",
  q4: "By defining a JavaScript function that returns a renderable value.",
  q5: "An object in a component that holds values and may cause the component to render on change.",
  q6: "By using the map() method to iterate over an array of data and returning JSX.",
  q7: "Using a the #if template syntax.",
};

export const TIMEOUT_MS = 1000;

export default function Quiz() {
  const [quizState, setQuizState] = useState({
    question: QUESTIONS[0],
    questionAmount: QUESTIONS.length,
    questionIdx: 0,
    userAnswer: null,
    result: null, // correct, wrong
    userScore: 0,
  });

  async function handleSelectAnswer(questionId, ans) {
    setQuizState((prevState) => {
      return { ...prevState, userAnswer: ans, result: "selected" };
    });

    setTimeout(() => {
      setQuizState((prevState) => {
        const result = checkAnswer(questionId, ans) ? "correct" : "wrong";
        return {
          ...prevState,
          result,
          userScore: prevState.userScore + (result === "correct" ? 1 : 0),
        };
      });

      setTimeout(() => {
        setQuizState((prevState) => {
          const prevIdx = prevState.questionIdx;

          return {
            ...prevState,
            questionIdx: prevIdx + 1,
            question: QUESTIONS[prevIdx + 1],
            result: null,
            userAnswer: null,
          };
        });
      }, TIMEOUT_MS);
    }, TIMEOUT_MS);
  }

  // effect after select answer orange ---1000ms--> red/green
  // effect after result red/green ---1000ms--> to next question
  function checkAnswer(questionId, ans) {
    return _ANSWER[questionId] === ans;
  }

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

  console.log({ result: quizState.result });

  return (
    <div id="quiz">
      <div id="question-overview">
        <div id="question" key={quizState.questionIdx}>
          <h2>{quizState.question.text}</h2>
          <ul id="answers">
            {quizState.question.answers.map((ans, idx) => {
              return (
                <li key={idx} className="answer">
                  <button
                    className={getAnswerClassName(ans)}
                    onClick={() =>
                      handleSelectAnswer(quizState.question.id, ans)
                    }
                  >
                    {ans}
                  </button>
                </li>
              );
            })}
          </ul>
          {quizState.result === "selected" && <ProgressBar />}
          {(quizState.result === "correct" || quizState.result === "wrong") && (
            <ProgressBar />
          )}
        </div>
      </div>
    </div>
  );
}
