import Header from "./components/Header";
import Quiz from "./components/Quiz";
import QuizContextProvider from "./stores/quiz-context";

function App() {
  return (
    <QuizContextProvider>
      <Header />
      <main>
        <Quiz />
      </main>
    </QuizContextProvider>
  );
}

export default App;
