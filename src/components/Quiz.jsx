import { useCallback, useContext } from "react";
import QuestionTimerBar from "./QuestionTimerBar";
import Summary from "./Summary";
import { QuizContext } from "../stores/quiz-context";
import AnswerList from "./AnswerList";

// effect after selecting answer 'orange' ---1000ms--> 'red' or 'green'
// effect after result 'red'/'green' ---2000ms--> to next question
export const WAITING_TIME = 10000;
export const CHECK_ANS_TIME_MS = 1000;
export const LOAD_NEXT_QUESTION_TIME_MS = 2000;

export default function Quiz() {
  const quizState = useContext(QuizContext);

  let waitingTime = WAITING_TIME;
  if (quizState.userAction) {
    waitingTime = CHECK_ANS_TIME_MS;
  }

  if (quizState.result) {
    waitingTime = LOAD_NEXT_QUESTION_TIME_MS;
  }

  const handleUserSelectAnswer = useCallback(
    (questionId, ans) => {
      quizState.userSelectAnswer(questionId, ans);

      setTimeout(() => {
        quizState.checkAnswer(quizState.question.id, quizState.userAnswer);

        setTimeout(() => {
          quizState.toNextQuestion();
        }, LOAD_NEXT_QUESTION_TIME_MS);
      }, CHECK_ANS_TIME_MS);
    },
    [quizState.questionIdx]
  );

  const handleUserSkipAnswer = useCallback(() => {
    quizState.userSelectAnswer(quizState.question.id, null);
    quizState.checkAnswer(quizState.question.id, quizState.userAnswer);
    quizState.toNextQuestion();
  }, [handleUserSelectAnswer]);

  if (quizState.isCompleted) {
    return <Summary />;
  }

  return (
    <div id="quiz">
      <div id="question-overview">
        <div id="question" key={quizState.questionIdx}>
          <QuestionTimerBar
            key={waitingTime}
            onTimeout={!quizState.userAction ? handleUserSkipAnswer : null}
            timeout={waitingTime}
            mode={quizState.userAction}
          />
          <h2>{quizState.question.text}</h2>

          <AnswerList
            key={quizState.question.id}
            onSelectAnswer={handleUserSelectAnswer}
          />
        </div>
      </div>
    </div>
  );
}
