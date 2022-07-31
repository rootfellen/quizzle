import React, { useState, useEffect } from "react";
import "./Quiz.css";

const Quiz = (props) => {
  console.log(props.data);

  // ==== DECODING HTML DATA FROM API ==== //

  const htmlDecode = (input) => {
    const doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
  };

  // ==== CREATING LIST OF QUESTIONS WITH ANSWERS ==== //

  return (
    <>
      <div className="quiz-container">
        <div className="quiz-wrapper"></div>
        <div className="quiz-result">
          <button>Check result</button>
        </div>
      </div>
    </>
  );
};

export default Quiz;
