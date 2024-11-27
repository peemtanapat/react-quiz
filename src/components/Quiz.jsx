import { useContext } from "react";
import ProgressBar from "./ProgressBar";
import Summary from "./Summary";
import { QuizContext } from "../stores/quiz-context";
import AnswerList from "./AnswerList";

export const CHECK_ANS_TIME_MS = 750;
export const CHANGE_QUESTION_TIME_MS = 1500;

export default function Quiz() {
  // effect after select answer orange ---750ms--> 'red' or 'green'
  // effect after result red/green ---1500ms--> to next question
  const quizState = useContext(QuizContext);

  function handleSelectAnswer(questionId, ans) {
    quizState.userSelectAnswer(ans);

    setTimeout(() => {
      quizState.checkAnswer(questionId, ans);

      setTimeout(() => {
        quizState.toNextQuestion();
      }, CHANGE_QUESTION_TIME_MS);
    }, CHECK_ANS_TIME_MS);
  }

  const answerIsSelected = quizState.userAnswer && !quizState.result;
  const answerIsChecked = !!quizState.result;

  return (
    <div id="quiz">
      {quizState.questionIdx < quizState.questionAmount && (
        <div id="question-overview">
          <div id="question" key={quizState.questionIdx}>
            <h2>{quizState.question.text}</h2>

            <AnswerList onSelectAnswer={handleSelectAnswer} />

            {answerIsSelected && <ProgressBar timeout={CHECK_ANS_TIME_MS} />}
            {answerIsChecked && (
              <ProgressBar timeout={CHANGE_QUESTION_TIME_MS} />
            )}
          </div>
        </div>
      )}
      {quizState.questionIdx === quizState.questionAmount && <Summary />}
    </div>
  );
}
