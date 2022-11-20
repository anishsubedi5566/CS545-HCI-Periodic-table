import React, { useState } from "react";
import Quiz from "./Quiz/Quiz";
import { Box, Button, Grid, Modal } from "@mui/material";
import "./Quiz/Quiz.css";
import { RiMedalFill } from "react-icons/ri";
import { HiAcademicCap } from "react-icons/hi";
import Progress from "./Quiz/Progress";
import { Navigate } from "react-router-dom";
const QuizMode = ({ user }) => {
  const [quizMode, setQuizMode] = useState("");
  const handleClose = () => {
    setQuizMode("");
  };

  if (user === null) {
    return <Navigate to="/login" replace />;
  }
  let inst = [
    "This quiz is designed to test your knowledge of the periodic table of elements.",
    "The quiz will consist of 10 questions, each with 4 possible answers.",
    "You will be asked to select the correct answer from the 4 options.",

    "You will be given 1 point for each correct answer.",
  ];
  return (
    <div>
      {quizMode === "" && (
        <div>
          <h2>Quiz on Periodic Table of Elements</h2>
          <br></br>
          <Grid
            container
            spacing={2}
            className="quiz-mode"
            sx={{ justifyContent: "space-evenly" }}
          >
            <Grid item xs={12} md={5} className="quiz-options">
              <div>
                <h3>Information</h3>
                {inst.map((i) => (
                  <p className="information">{i}</p>
                ))}
                <Button
                  variant="outlined"
                  startIcon={<HiAcademicCap />}
                  onClick={() => setQuizMode("quiz")}
                >
                  Start Quiz
                </Button>
              </div>
            </Grid>
            <Grid item xs={12} md={5} className="quiz-options">
              <div>
                <h3>Progress</h3>
                <p className="information">
                  Check the progress you made so far in the quiz.
                </p>

                <Button onClick={() => setQuizMode("progress")}>
                  Progress
                </Button>
              </div>
            </Grid>
          </Grid>
        </div>
      )}
      {quizMode === "quiz" && <Quiz />}

      <Modal
        open={quizMode === "progress"}
        onClose={handleClose}
        sx={{
          top: "20%",
          left: "20%",
          width: "60%",
        }}
      >
        <Progress />
      </Modal>
    </div>
  );
};

export default QuizMode;
