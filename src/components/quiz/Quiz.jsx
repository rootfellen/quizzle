import React, { useEffect, useState } from "react";
import "./Quiz.css";
import { nanoid } from "nanoid";

const Quiz = (props) => {
  const [questions, setQuestions] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [results, setResults] = useState(null);
  const [game, setGame] = useState(false);

  // ==== UNESCAPING HTML DATA FROM API ==== //

  const htmlDecode = (input) => {
    const doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
  };

  // ==== CHECKING IF THE CHOOSE ANSWERS CORRECT, ADDING TO CORRECT ANSWERS STATE FOR GIVING RESULTS LATER ==== //

  const correctAnswerHandler = (e) => {
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].id == e.target.name) {
        if (
          e.target.value === questions[i].correctAnswer &&
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
    const allChecked = questions.filter((q) => q.check);
    if (allChecked.length == questions.length) {
      if (correctAnswers.length == 0) {
        setResults("0");
      } else {
        setResults(correctAnswers.length);
      }
    }
    if (allChecked.length == questions.length && results) {
      setGame(!game);
      setResults(null);
    } else if (allChecked.length != questions.length) {
      alert("Make sure to choose answer for all questions!");
    }
  };

  // ==== SETTING EACH QUESTION CHECK FOR RESULT DISPLAY ==== //

  const checkHandler = (e) => {
    const targetId = e.target.name;
    const targetQ = questions.map((q) => q.id).filter((t) => t === targetId);
    if (targetId == targetQ) {
      setQuestions((prevState) => {
        return [...prevState].map((a) => {
          if (a.id == targetQ) {
            return {
              ...a,
              check: true,
            };
          } else {
            return {
              ...a,
            };
          }
        });
      });
    }
  };

  // ==== GETTING DATA FROM API AND SETTING STATE OBJECT ==== //

  useEffect(() => {
    setQuestions(() => {
      return props.data.map((q) => {
        const correct = q.correct_answer;
        const incorrect = q.incorrect_answers;
        const arr = [...incorrect];
        const newArr = arr.map((a) => a);
        newArr.splice(
          Math.floor(Math.random() * (incorrect.length + 1)),
          0,
          correct
        );

        return {
          title: htmlDecode(q.question),
          id: nanoid(),
          check: false,
          correctAnswer: q.correct_answer,
          incorrectAnswers: [
            ...newArr.map((a) => {
              return {
                answer: a,
                id: nanoid(),
              };
            }),
          ],
        };
      });
    });
  }, [game]);

  // ==== CREATING LIST OF QUESTIONS WITH ANSWERS (INCLUDING CORRECT ONE) ==== //
  return (
    <>
      <div className="quiz-container">
        <div className="quiz-wrapper">
          {questions.map((q) => {
            return (
              <div
                key={q.id}
                id={q.id}
                check={q.check.toString()}
                className="quiz-question"
              >
                <h3 className="questions-title">{q.title}</h3>
                <div className="quiz-answers">
                  {q.incorrectAnswers.map((a) => {
                    return (
                      <div key={a.id} className="quiz-answer">
                        <input
                          type="radio"
                          id={a.id}
                          name={q.id}
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
          {(results || results == 0) && (
            <div className="quiz-result-output">
              <span>Your result:</span>
              {results} / {questions.length}
            </div>
          )}

          <button onClick={resultsHandler}>
            {results ? "New Game" : "Check Result"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Quiz;
