import Header from "./components/Header";
import Quiz from "./components/Quiz";
import Summary from "./components/Summary";
import QuizContextProvider from "./stores/quiz-context";

function App() {
  return (
    <QuizContextProvider>
      <Header />
      <main>
        {/* <Summary /> */}
        <Quiz />
      </main>
    </QuizContextProvider>
  );
}

export default App;
