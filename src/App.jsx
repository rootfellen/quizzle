import "./App.css";
import { useEffect, useState } from "react";
import introImage from "./assets/intro/intro.svg";
import Asteroid from "./components/asteroid/Asteroid";
import options from "./data/quotesOptions";
function App() {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    fetch("https://motivational-quotes1.p.rapidapi.com/motivation", options)
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  }, []);
  return (
    <>
      <Asteroid />
      <div className="container">
        <div className="wrapper">
          <div className="app-info">
            <div className="app-intro-image">
              <img src={introImage} alt="Quizzle" />
            </div>
            <h1 className="app-title">Quizzle</h1>
            <p className="app-quote">Random quote about knowledge here...</p>
            <a href="/" className="app-quizz">
              Start
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
