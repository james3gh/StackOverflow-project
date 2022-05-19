import express from "express";

const router = express.Router();
import {
  postQuestionComment,
  deleteQuesComment,
  postAnswerComment,
  deleteAnsComment,
  updateQuesComment,
  updateAnsComment,
} from "../controllers/comments.js";

router.patch("/postquestion/:id", postQuestionComment);
router.patch("/deletequescomment/:id", deleteQuesComment);
router.patch("/updatequescomment/:id", updateQuesComment);

// postanswer
router.patch("/postanswer/:id", postAnswerComment);
router.patch("/deleteanscomment/:id", deleteAnsComment);
router.patch("/updateanscomment/:id", updateAnsComment);

export default router;
