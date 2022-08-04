import React, { useEffect, useState } from "react";
import "./Quiz.css";
import { nanoid } from "nanoid";

const Quiz = (props) => {
  const [questions, setQuestions] = useState([]);
  // ==== UNESCAPING HTML DATA FROM API ==== //

  const htmlDecode = (input) => {
    const doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
  };

  const checkAnswer = (e) => {
    const output = questions.map((q) => q.question.id);
    console.log(output);
    console.log(e.target.id);
  };
  console.log(questions);
  useEffect(() => {
    setQuestions(() => {
      return props.data.map((q) => {
        const incorrectAnswers = q.incorrect_answers;
        const correctAnswer = q.correct_answer;
        const arr = [...incorrectAnswers];
        const newArr = arr.map((a) => a);
        newArr.splice(
          Math.floor(Math.random() * (incorrectAnswers.length + 1)),
          0,
          correctAnswer
        );
        return {
          question: {
            title: htmlDecode(q.question),
            correctAnswer: correctAnswer,
            incorrectAnswers: {
              answers: [...newArr].map((a) => {
                return {
                  answer: a,
                  id: nanoid(),
                };
              }),
            },
            id: nanoid(),
          },
          // answers: arr,
        };
      });
    });
  }, []);

  // ==== CREATING LIST OF QUESTIONS WITH ANSWERS (INCLUDING CORRECT ONE) ==== //
  return (
    <>
      <div className="quiz-container">
        <form className="quiz-wrapper">
          {questions.map((q) => {
            return (
              <div key={q.question.id} className="quiz-question">
                <h3 className="questions-title">{q.question.title}</h3>
                <div className="quiz-answers">
                  {q.question.incorrectAnswers.answers.map((a, idx) => {
                    return (
                      <div key={a.id} className="quiz-answer">
                        <input
                          type="radio"
                          id={a.id}
                          name={q.question.id}
                          value={a.answer}
                          onClick={checkAnswer}
                        />
                        <label htmlFor={a.id}>{htmlDecode(a.answer)}</label>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </form>
        <div className="quiz-result">
          <button>Check result</button>
        </div>
      </div>
    </>
  );
};

export default Quiz;
