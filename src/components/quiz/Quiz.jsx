import React from "react";
import "./Quiz.css";

const Quiz = (props) => {
  const htmlDecode = (input) => {
    const doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
  };

  const questions = props.data.results.map((q, idx) => {
    return (
      <div key={idx} className="quiz-question">
        <h3 className="question-title">{htmlDecode(q.question)}</h3>
        <div className="quiz-answers">
          {q.incorrect_answers.map((a, idx) => (
            <div>
              <input key={idx} type="radio" name={a} value={a} />
              <label htmlFor={a}>{a}</label>
            </div>
          ))}
        </div>
        <hr className="separator" />
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
