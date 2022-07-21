import React from "react";
import "./Intro.css";
import introImage from "../../assets/intro/intro.svg";

const Intro = (props) => {
  return (
    <>
      <div className="wrapper">
        <div className="app-info">
          <div className="app-intro-image">
            <img src={introImage} alt="Quizzle" />
          </div>
          <h1 className="app-title">Quizzle</h1>
          <p className="app-quote">
            "{props.quote.text}"
            <span className="quote-author">{props.quote.author}</span>
          </p>
          <button onClick={props.loadQuiz} className="app-quizz">
            Start
          </button>
        </div>
      </div>
    </>
  );
};

export default Intro;
