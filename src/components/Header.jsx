import quizLogo from "../assets/quiz-logo.png";

export default function Header() {
  return (
    <header>
      <img src={quizLogo} alt="App Logo" />
      <h1>REACTQUIZ</h1>
    </header>
  );
}
