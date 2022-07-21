import "./App.css";
import { useEffect, useState } from "react";
import Asteroid from "./components/asteroid/Asteroid";
import options from "./data/quotesOptions";
import Quiz from "./components/quiz/Quiz";
import Intro from "./components/Intro/Intro";

function App() {
  const [quote, setQuote] = useState("");
  const [quiz, setQuiz] = useState("");

  useEffect(() => {
    fetch(
      "https://famous-quotes4.p.rapidapi.com/random?category=all&count=2",
      options
    )
      .then((response) => response.json())
      .then((data) => setQuote(data[0]))
      .catch((err) => console.error(err));
  }, []);

  function loadQuiz() {
    fetch("https://opentdb.com/api.php?amount=6")
      .then((res) => res.json())
      .then((data) => setQuiz(data))
      .catch((err) => console.log(err));
  }
  console.log(quiz);
  return (
    <>
      <Asteroid />
      <div className="container">
        {quiz ? (
          <Quiz data={quiz} />
        ) : (
          <Intro loadQuiz={loadQuiz} quote={quote} />
        )}
      </div>
    </>
  );
}

export default App;
