import React from "react";
import "./Quiz.css";

const Quiz = (props) => {
  return (
    <>
      <div className="quiz-container">
        <div className="quiz-wrapper">
          <div className="quiz-question">
            <h3 className="question-title">Question title</h3>
            <ul className="quiz-answers">
              <li>Answer 1</li>
              <li>Answer 2</li>
              <li>Answer 3</li>
              <li>Answer 4</li>
            </ul>
          </div>
          <hr className="separator" />
        </div>
        <div className="quiz-result">
          <button>Check result</button>
        </div>
      </div>
    </>
  );
};

export default Quiz;
