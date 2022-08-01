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

  // useEffect(() => {
  //   fetch("https://inspiring-quotes.p.rapidapi.com/random", options)
  //     .then((response) => response.json())
  //     .then((data) => setQuote(data))
  //     .catch((err) => console.error(err));
  // }, []);

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=6&type=multiple")
      .then((res) => res.json())
      .then((data) => setQuiz(data.results))
      .catch((err) => console.error(err));
  }, [start]);

  function handleStart() {
    setStart(!start);
  }

  return (
    <>
      <Asteroid />
      <div className="container">
        {start ? <Quiz data={quiz} /> : <Intro handleStart={handleStart} />}
      </div>
    </>
  );
}

export default App;
