import express from "express";
import auth from "../middlewares/auth.js";
import { postAnswer, deleteAnswer } from "../controllers/answers.js";

const router = express.Router();

// router.patch("/post/:id", postAnswer);
router.patch("/post/:id", auth, postAnswer);
// router.patch("/delete/:id", deleteAnswer);
router.patch("/delete/:id", auth, deleteAnswer);

export default router;
