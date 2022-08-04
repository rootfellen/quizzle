import React, { useEffect, useState } from "react";
import "./Quiz.css";
import { nanoid } from "nanoid";

const Quiz = (props) => {
  const [questions, setQuestions] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [results, setResults] = useState("");
  const [output, setOutput] = useState([]);
  // ==== UNESCAPING HTML DATA FROM API ==== //

  const htmlDecode = (input) => {
    const doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
  };

  // ==== CHECKING IF THE CHOOSE ANSWERS CORRECT, ADDING TO CORRECT ANSWERS STATE FOR GIVING RESULTS LATER ==== //

  const correctAnswerHandler = (e) => {
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].question.id == e.target.name) {
        setOutput((prevState) => {
          return [...prevState, e.target.value];
        });

        if (
          e.target.value === questions[i].question.correctAnswer &&
          !correctAnswers.includes(e.target.value)
        )
          setCorrectAnswers((prevState) => {
            return [...prevState, e.target.value];
          });
      }
    }
  };

  // ==== GIVING RESULTS BASED ON CORRECT ANSWERS STATE ARR LENGTH ==== //

  const resultsHandler = () => {
    if (output.length < 6) {
      alert("Make sure to answer all questions");
    } else {
      setResults(correctAnswers.length);
      setOutput([]);
    }
  };

  const checkHandler = (e) => {
    const targetId = e.target.name;
    const targetQ = questions
      .map((q) => q.question.id)
      .filter((t) => t === targetId);
    if (targetId == targetQ) {
      alert("YEs");
    }
    console.log(targetId);
    console.log(targetQ);
  };

  // ==== GETTING DATA FROM API AND SETTING STATE OBJECT ==== //

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
            check: false,
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
        };
      });
    });
  }, []);

  // ==== CREATING LIST OF QUESTIONS WITH ANSWERS (INCLUDING CORRECT ONE) ==== //
  return (
    <>
      <div className="quiz-container">
        <div className="quiz-wrapper">
          {questions.map((q) => {
            return (
              <div
                key={q.question.id}
                id={q.question.id}
                check={q.question.check.toString()}
                className="quiz-question"
              >
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
                          onClick={correctAnswerHandler}
                          onChange={(name) => checkHandler(name)}
                        />
                        <label htmlFor={a.id}>{htmlDecode(a.answer)}</label>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <div className="quiz-result">
          {results && (
            <div className="quiz-result-output">
              <span>Your result:</span> {results} / {questions.length}
            </div>
          )}
          <button onClick={resultsHandler}>Check result</button>
        </div>
      </div>
    </>
  );
};

export default Quiz;
