import React, { useEffect, useState } from "react";
import "./Quiz.css";
import { nanoid } from "nanoid";

const Quiz = (props) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  // ==== UNESCAPING HTML DATA FROM API ==== //

  const htmlDecode = (input) => {
    const doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
  };

  useEffect(() => {
    setQuestions(() => {
      return props.data.map((q) => {
        const incorrectAnswers = q.incorrect_answers;
        const correctAnswer = q.correct_answer;
        const arr = [...incorrectAnswers];
        arr.splice(
          Math.floor(Math.random() * (incorrectAnswers.length + 1)),
          0,
          correctAnswer
        );
        return {
          question: q.question,
          answers: arr,
          id: nanoid(),
        };
      });
    });
  }, []);

  console.log(questions);
  // ==== CREATING LIST OF QUESTIONS WITH ANSWERS (INCLUDING CORRECT ONE) ==== //

  // const questions = props.data.map((q, idx) => {
  //   let arr = [];
  //   const incorrectAnswers = q.incorrect_answers;
  //   const correctAnswer = q.correct_answer;
  //   arr.push(...incorrectAnswers);
  //   arr.splice(
  //     Math.floor(Math.random() * (incorrectAnswers.length + 1)),
  //     0,
  //     correctAnswer
  //   );

  //   return (
  //     <div key={idx} className="quiz-question">
  //       {htmlDecode(q.question)}
  //       <div className="quiz-answers">
  //         {arr.map((a, idx) => {
  //           return (
  //             <div className="quiz-answer" key={idx}>
  //               <input
  //                 className="quiz-answer-choice"
  //                 type="radio"
  //                 name="answer"
  //                 value={htmlDecode(a)}
  //               />
  //               <label htmlFor="answer">{htmlDecode(a)}</label>
  //             </div>
  //           );
  //         })}
  //       </div>
  //     </div>
  //   );
  // });
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
