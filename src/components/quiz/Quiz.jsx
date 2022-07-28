import React from "react";
import "./Quiz.css";

const Quiz = (props) => {
  console.log(props);

  function unEscape(htmlStr) {
    htmlStr = htmlStr.replace(/&lt;/g, "<");
    htmlStr = htmlStr.replace(/&gt;/g, ">");
    htmlStr = htmlStr.replace(/&quot;/g, '"');
    htmlStr = htmlStr.replace(/&#39;/g, "'");
    htmlStr = htmlStr.replace(/&amp;/g, "&");
    return htmlStr;
  }

  const questions = props.data.results.map((q, idx) => (
    <div key={idx} className="quiz-question">
      <h3 className="question-title">{q.question}</h3>
      <ul className="quiz-answers"></ul>
      <hr className="separator" />
    </div>
  ));
  return (
    <>
      <div className="quiz-container">
        <div className="quiz-wrapper">
          {/* <div className="quiz-question">
            <h3 className="question-title">Question title</h3>
            <ul className="quiz-answers">
              <li>Answer 1</li>
              <li>Answer 2</li>
              <li>Answer 3</li>
              <li>Answer 4</li>
            </ul>
          </div> */}
          {questions}
        </div>
        <div className="quiz-result">
          <button>Check result</button>
        </div>
      </div>
    </>
  );
};

export default Quiz;
