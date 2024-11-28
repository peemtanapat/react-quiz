import { useCallback, useContext, useRef } from "react";
import QuestionTimerBar from "./QuestionTimerBar";
import Summary from "./Summary";
import { QuizContext } from "../stores/quiz-context";
import AnswerList from "./AnswerList";

export const WAITING_TIME = 2500;
export const CHECK_ANS_TIME_MS = 750;
export const CHANGE_QUESTION_TIME_MS = 1500;

export default function Quiz() {
  // effect after select answer orange ---750ms--> 'red' or 'green'
  // effect after result red/green ---1500ms--> to next question
  const quizState = useContext(QuizContext);
  const timerRef = useRef();

  const handleUserSelectAnswer = useCallback((questionId, ans) => {
    quizState.userSelectAnswer(questionId, ans);
    quizState.checkAnswer(quizState.question.id, quizState.userAnswer);
    quizState.toNextQuestion();
  }, []);

  const handleUserSkipAnswer = useCallback(() => {
    quizState.userSelectAnswer(quizState.question.id, null);
    quizState.checkAnswer(quizState.question.id, quizState.userAnswer);
    quizState.toNextQuestion();
  }, [handleUserSelectAnswer]);

  const answerIsWaiting = !quizState.userAction;
  const answerIsSelectedOrSkipped = quizState.userAction && !quizState.result;
  const answerIsChecked = !!quizState.result;

  if (quizState.isCompleted) {
    return <Summary />;
  }

  return (
    <div id="quiz">
      <QuestionTimerBar
        key={quizState.question.id}
        onTimeout={handleUserSkipAnswer}
        timeout={WAITING_TIME}
        ref={timerRef}
      />

      <div id="question-overview">
        <div id="question" key={quizState.questionIdx}>
          <h2>{quizState.question.text}</h2>

          <AnswerList onSelectAnswer={handleUserSelectAnswer} />
        </div>
      </div>
    </div>
  );
}
