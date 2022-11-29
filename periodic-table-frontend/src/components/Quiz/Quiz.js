import React, { useState } from "react";
import { q } from "./questions";
import { FcOk } from "react-icons/fc";
import { MdCancel } from "react-icons/md";
import { AppUserDbUpdate } from "../Firebase";
import "./Quiz.css";
import { Button, Card, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
let questions = q.sort(() => Math.random() - 0.5);
questions.map((question, idx) => {
  question.answerOptions = question.answerOptions.sort(
    () => Math.random() - 0.5
  );
  return question;
});
questions = questions.slice(0, 10);
const Quiz = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const handleRestart = () => {
    setCurrentQuestion(0);
    setShowScore(false);
    setScore(0);
    setResult([]);
    setShowResult(false);
    setIsAnswered(false);
    setIsDisabled(false);
  };
  const handleAnswerOptionClick = (isCorrect, answerText) => {
    setIsDisabled(true);
    setIsAnswered(true);
    console.log(isCorrect);
    if (isCorrect) {
      setScore(score + 1);

      setResult([
        ...result,
        [
          questions[currentQuestion].questionText,

          `You answered ${answerText}`,
          `Correct!`,
        ],
      ]);
    }
    if (!isCorrect) {
      setResult([
        ...result,
        [
          questions[currentQuestion].questionText,
          `You answered ${answerText}`,
          `Incorrect! The correct answer is: ${q[currentQuestion].correctAnswer}`,
        ],
      ]);
    }
    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
      } else {
        setShowScore(true);

        AppUserDbUpdate(score);
        setShowResult(true);
      }
      setIsAnswered(false);
      setIsDisabled(false);
    }, 700);
  };
  return (
    <div className="app">
      {showScore ? (
        <div className="score-section">
          <h3>
            You scored {score} out of {questions.length}
          </h3>
          <Button onClick={() => handleRestart()}>Restart Quiz</Button>
          <Button onClick={() => navigate("/")}>Home</Button>
          <Box className="results">
            {result.map((item, index) => (
              <Card
                key={index}
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "1rem",
                  margin: "1rem",
                  borderRadius: "1rem",
                  boxShadow: "none",
                  color: item[2] === "Correct!" ? "#005249" : "#8B0000",
                  backgroundColor:
                    item[2] === "Correct!" ? "#C8FACD" : "#FFE7D9",
                }}
              >
                <Grid container spacing={2}>
                  <Grid
                    item
                    xs={12}
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    <p>
                      Question {index + 1}: {item[0]}
                    </p>
                  </Grid>
                  <Grid item xs={12}>
                    {item[2] === "Correct!" ? (
                      <FcOk size={20} />
                    ) : (
                      <MdCancel size={20} />
                    )}
                    <p>{item[1]}</p>
                  </Grid>
                  <Grid item xs={12}>
                    <p>{item[2]}</p>
                  </Grid>
                </Grid>
              </Card>
            ))}
          </Box>
        </div>
      ) : (
        <Grid className="container">
          <div className="quiz-container">
            <div className="question-count">
              <span>Question {currentQuestion + 1}</span>/{questions.length}
            </div>
            <Card
              className="question-section"
              sx={{
                backgroundColor: "#f8e1d8",
                boxShadow: "None",
                borderRadius: "1rem",
              }}
            >
              <div className="question-text">
                {questions[currentQuestion].questionText}
              </div>
              <br></br>
              <div className="answer-section">
                {questions[currentQuestion].answerOptions.map(
                  (answerOption, idx) => (
                    <button
                      key={idx}
                      className={
                        isAnswered
                          ? answerOption.isCorrect
                            ? "answer-button-correct"
                            : "answer-button-incorrect"
                          : "answer-button"
                      }
                      onClick={() =>
                        handleAnswerOptionClick(
                          answerOption.isCorrect,
                          answerOption.answerText
                        )
                      }
                      disabled={isDisabled}
                    >
                      {answerOption.answerText}
                    </button>
                  )
                )}
              </div>
            </Card>
          </div>
        </Grid>
      )}
    </div>
  );
};

export default Quiz;
