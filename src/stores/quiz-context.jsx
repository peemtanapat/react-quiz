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

function checkAnswer(questionId, ans) {
  return _ANSWER[questionId] === ans;
}

const DEFAULT_STATE = {
  userSelectAnswer: () => {},
  userSkipAnswer: () => {},
  checkAnswer: () => {},
  toNextQuestion: () => {},
  question: QUESTIONS[0],
  questionAmount: QUESTIONS.length,
  questionIdx: 0,
  userAnswer: null,
  userAction: null, // null or answered
  result: null, // skip, correct, wrong
  userScore: 0,
  skipCount: 0,
  history: [],
  isCompleted: false,
};
export const QuizContext = createContext(DEFAULT_STATE);

function quizReducer(prevState, action) {
  if (action.type === "USER_SELECT_ANSWER") {
    const { ans } = action.payload;

    return { ...prevState, userAction: "answered", userAnswer: ans };
  }

  if (action.type === "CHECK_ANSWER") {
    const prevHistory = prevState.history;

    if (!prevState.userAnswer) {
      const result = "skip";
      const newHistory = {
        question: prevState.question,
        userAnswer: prevState.userAnswer,
        result,
      };

      return {
        ...prevState,
        result: "skip",
        skipCount: prevState.skipCount + 1,
        history: [...prevHistory, newHistory],
      };
    }

    const result = checkAnswer(prevState.question.id, prevState.userAnswer)
      ? "correct"
      : "wrong";
    const newHistory = {
      question: prevState.question,
      userAnswer: prevState.userAnswer,
      result,
    };

    return {
      ...prevState,
      result,
      userScore: prevState.userScore + (result === "correct" ? 1 : 0),
      userAction: "wait",
      history: [...prevHistory, newHistory],
    };
  }

  if (action.type === "TO_NEXT_QUESTION") {
    const prevIdx = prevState.questionIdx;
    const newIdx = prevIdx + 1;
    const quizCompleted = newIdx == prevState.questionAmount;

    if (quizCompleted) {
      return { ...prevState, isCompleted: true };
    }

    const newQuestion = QUESTIONS[newIdx];

    return {
      ...prevState,
      questionIdx: prevIdx + 1,
      question: newQuestion,
      result: null,
      userAction: null,
      userAnswer: null,
    };
  }
}

export default function QuizContextProvider({ children }) {
  const [quizState, quizDispatch] = useReducer(quizReducer, DEFAULT_STATE);

  function handleUserSelectAnswer(questionId, ans) {
    quizDispatch({
      type: "USER_SELECT_ANSWER",
      payload: {
        questionId,
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
