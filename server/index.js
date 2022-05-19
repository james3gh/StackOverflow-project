import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/users.js";
import questionRoutes from "./routes/questions.js";
import answerRoutes from "./routes/answers.js";
import commentRoutes from "./routes/comments.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();
const port = process.env.PORT || 5000;

const db_url = process.env.DATABASE_URL;

app.use(express.json({ limit: "30mb", extented: false }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("This is stack overflow proj with dob and comment section");
});

app.use("/user", userRoutes);
app.use("/questions", questionRoutes);
app.use("/answer", answerRoutes);
app.use("/comment", commentRoutes);

mongoose
  .connect(db_url)
  .then(() => {
    app.listen(port, () => {
      console.log(`server running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
