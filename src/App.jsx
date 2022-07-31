import "./App.css";
import { useEffect, useState } from "react";
import Asteroid from "./components/asteroid/Asteroid";
import options from "./data/quotesOptions";
import Quiz from "./components/quiz/Quiz";
import Intro from "./components/Intro/Intro";

function App() {
  const [quote, setQuote] = useState("");
  const [quiz, setQuiz] = useState([]);
  const [start, setStart] = useState(false);

  useEffect(() => {
    fetch(
      "https://famous-quotes4.p.rapidapi.com/random?category=all&count=1",
      options
    )
      .then((response) => response.json())
      .then((data) => setQuote(data[0]))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=6&type=multiple")
      .then((res) => res.json())
      .then((data) => setQuiz(data.results))
      .catch((err) => console.error(err));
  }, []);

  function handleStart() {
    setStart(!start);
  }

  return (
    <>
      <Asteroid />
      <div className="container">
        {start ? (
          <Quiz data={quiz} />
        ) : (
          <Intro handleStart={handleStart} quote={quote} />
        )}
      </div>
    </>
  );
}

export default App;
