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
          <h2>Choose a quiz mode:</h2>

          <p>Solo mode: You will be quizzed on the elements and level up.</p>
          <Button
            variant="outlined"
            startIcon={<HiAcademicCap />}
            onClick={() => setQuizMode("quiz")}
          >
            Solo
          </Button>
          <p>
            Competitive mode: You will be quizzed on the elements and compete
            with other players.
          </p>
          <Button
            variant="outlined"
            startIcon={<RiMedalFill />}
            onClick={() => setQuizMode("competitive")}
          >
            Competitive
          </Button>
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
