import { createContext, useReducer } from "react";
import QUESTIONS from "../questions";

const _ANSWER = {
  q1: "A library to build user interfaces with help of declarative code.",
  q2: "Enabling the use of state and other React features in functional components.",
  q3: "A JavaScript extension that adds HTML-like syntax to JavaScript.",
  q4: "By defining a JavaScript function that returns a renderable value.",
  q5: "An object in a component that holds values and may cause the component to render on change.",
  q6: "By using the map() method to iterate over an array of data and returning JSX.",
  q7: "Using a the #if template syntax.",
};

const DEFAULT_STATE = {
  userSelectAnswer: () => {},
  checkAnswer: () => {},
  toNextQuestion: () => {},
  question: QUESTIONS[0],
  questionAmount: QUESTIONS.length,
  questionIdx: 0,
  userAnswer: null,
  result: null, // correct, wrong
  userScore: 0,
  history: [],
};
export const QuizContext = createContext(DEFAULT_STATE);

function quizReducer(prevState, action) {
  if (action.type === "USER_SELECT_ANSWER") {
    const { ans } = action.payload;
    return { ...prevState, userAnswer: ans };
  }

  function checkAnswer(questionId, ans) {
    return _ANSWER[questionId] === ans;
  }

  if (action.type === "CHECK_ANSWER") {
    const { questionId, ans } = action.payload;
    const result = checkAnswer(questionId, ans) ? "correct" : "wrong";
    const prevHistory = prevState.history;
    const newHistory = {
      question: prevState.question,
      userAnswer: prevState.userAnswer,
      result,
    };

    return {
      ...prevState,
      result,
      userScore: prevState.userScore + (result === "correct" ? 1 : 0),
      history: [...prevHistory, newHistory],
    };
  }

  if (action.type === "TO_NEXT_QUESTION") {
    const prevIdx = prevState.questionIdx;

    return {
      ...prevState,
      questionIdx: prevIdx + 1,
      question: QUESTIONS[prevIdx + 1],
      result: null,
      userAnswer: null,
    };
  }
}

export default function QuizContextProvider({ children }) {
  const [quizState, quizDispatch] = useReducer(quizReducer, DEFAULT_STATE);

  function handleUserSelectAnswer(ans) {
    quizDispatch({
      type: "USER_SELECT_ANSWER",
      payload: {
        ans,
      },
    });
  }

  function handleCheckAnswer(questionId, ans) {
    quizDispatch({
      type: "CHECK_ANSWER",
      payload: {
        questionId,
        ans,
      },
    });
  }

  function handleToNextQuestion() {
    quizDispatch({
      type: "TO_NEXT_QUESTION",
      payload: {},
    });
  }

  const ctxValue = {
    ...quizState,
    userSelectAnswer: handleUserSelectAnswer,
    checkAnswer: handleCheckAnswer,
    toNextQuestion: handleToNextQuestion,
  };

  return (
    <QuizContext.Provider value={ctxValue}>{children}</QuizContext.Provider>
  );
}
