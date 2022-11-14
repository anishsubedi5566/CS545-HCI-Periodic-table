import React, { useState } from "react";
import Quiz from "./Quiz/Quiz";
import Competitive from "./Quiz/Competitive";
import { Box, Button } from "@mui/material";
import "./Quiz/Quiz.css";
import { RiMedalFill } from "react-icons/ri";
import { HiAcademicCap } from "react-icons/hi";
import Progress from "./Quiz/Progress";
const QuizMode = () => {
  const [quizMode, setQuizMode] = useState("");
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
          <Button onClick={() => setQuizMode("Progress")}>Progress</Button>
        </Box>
      )}
      {quizMode === "quiz" && <Quiz />}
      {quizMode === "competitive" && <Competitive />}
      {quizMode === "Progress" && <Progress />}
    </div>
  );
};

export default QuizMode;
