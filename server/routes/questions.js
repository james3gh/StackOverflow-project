import auth from "../middlewares/auth.js";
import express from "express";

const router = express.Router();

import {
  AskQuestion,
  getAllQuestions,
  deleteQuestion,
  voteQuestion,
} from "../controllers/questions.js";

router.post("/Ask", auth, AskQuestion);
router.get("/get", getAllQuestions);
router.patch("/vote/:id", auth, voteQuestion);
router.delete("/delete/:id", auth, deleteQuestion);

export default router;
