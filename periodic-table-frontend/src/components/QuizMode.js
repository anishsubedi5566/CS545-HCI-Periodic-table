import React, { useState } from "react";
import Quiz from "./Quiz/Quiz";
import Competitive from "./Quiz/Competitive";
import { Box, Button, Modal } from "@mui/material";
import "./Quiz/Quiz.css";
import { RiMedalFill } from "react-icons/ri";
import { HiAcademicCap } from "react-icons/hi";
import Progress from "./Quiz/Progress";
const QuizMode = () => {
  const [quizMode, setQuizMode] = useState("");
  const handleClose = () => {
    setQuizMode("");
  };
  return (
    <div>
      {quizMode === "" && (
        <Box className="quiz-options">
          <h3>Quiz on the Periodic Table of Elements</h3>
          <h4>Information</h4>
          <p className="information">
            This quiz is designed to test your knowledge of the periodic table
            of elements. You will be given 10 questions and you will have 30
            seconds to answer each question. You will be given 4 options to
            choose from. You will be awarded 1 point for each correct answer.
            There is no negative marking.
          </p>
          <Button
            variant="outlined"
            startIcon={<HiAcademicCap />}
            onClick={() => setQuizMode("quiz")}
          >
            Start Quiz
          </Button>
          <h4>Progress</h4>
          <p className="information">
            Check the progress you made so far in the quiz.
          </p>

          <Button onClick={() => setQuizMode("progress")}>Progress</Button>
        </Box>
      )}
      {quizMode === "quiz" && <Quiz />}
      {quizMode === "competitive" && <Competitive />}

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
