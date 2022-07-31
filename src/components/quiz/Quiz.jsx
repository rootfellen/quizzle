import React, { useState, useEffect } from "react";
import "./Quiz.css";

const Quiz = (props) => {
  // ==== DECODING HTML DATA FROM API ==== //

  const htmlDecode = (input) => {
    const doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
  };

  // ==== CREATING LIST OF QUESTIONS WITH ANSWERS ==== //
  const correctAnswers = props.data.map((q) => q.correct_answer);
  const incorrectAnswers = props.data.map((q) => q.incorrect_answers);
  console.log(correctAnswers);
  console.log(incorrectAnswers);
  const options = incorrectAnswers.map((a) => a.splice(0, 0, "hello"));
  console.log(options);
  const questions = props.data.map((q, idx) => {
    return (
      <div key={idx} className="quiz-question">
        {htmlDecode(q.question)}
        <div className="quiz-answers">
          <div className="quiz-answer"></div>
        </div>
      </div>
    );
  });
  return (
    <>
      <div className="quiz-container">
        <div className="quiz-wrapper">{questions}</div>
        <div className="quiz-result">
          <button>Check result</button>
        </div>
      </div>
    </>
  );
};

export default Quiz;
