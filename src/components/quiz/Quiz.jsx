import React, { useState, useEffect } from "react";
import "./Quiz.css";

const Quiz = (props) => {
  // ==== UNESCAPING HTML DATA FROM API ==== //

  const htmlDecode = (input) => {
    const doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
  };

  // ==== CREATING LIST OF QUESTIONS WITH ANSWERS ==== //

  // const options = incorrectAnswers.map((a) => a.splice(0, 0, correctAnswers));
  const questions = props.data.map((q, idx) => {
    let arr = [];
    const incorrectAnswers = q.incorrect_answers;
    const correctAnswer = q.correct_answer;
    arr.push(...incorrectAnswers);
    arr.splice(
      Math.floor(Math.random() * (incorrectAnswers.length + 1)),
      0,
      correctAnswer
    );
    return (
      <div key={idx} className="quiz-question">
        {htmlDecode(q.question)}
        <div className="quiz-answers">
          {arr.map((a, idx) => {
            return (
              <div className="quiz-answer" key={idx}>
                {htmlDecode(a)}
              </div>
            );
          })}
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
