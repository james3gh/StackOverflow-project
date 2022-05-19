import questions from "../models/questions.js";
import mongoose from "mongoose";

export const postQuestionComment = async (req, res) => {
  const { id: _id } = req.params;
  const { commentBody, userCommented, userId } = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("question unavailable");
  }
  try {
    const updatedQuestion = await questions.findByIdAndUpdate(_id, {
      $addToSet: {
        commentOnQuestion: [{ commentBody, userCommented, userId }],
      },
    });
    res.status(200).json(updatedQuestion);
  } catch (error) {
    res.status(400).json("error in updating");
  }
};

export const deleteQuesComment = async (req, res) => {
  const { id: _id } = req.params;
  const { quesCommentId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Question unavailable...");
  }
  if (!mongoose.Types.ObjectId.isValid(quesCommentId)) {
    return res.status(404).send("Answer unavailable...");
  }
  try {
    await questions.updateOne(
      { _id },
      { $pull: { commentOnQuestion: { _id: quesCommentId } } }
    );
    res.status(200).json({ message: "Successfully deleted..." });
  } catch (error) {
    res.status(405).json(error);
  }
};

export const updateQuesComment = async (req, res) => {
  const { id: _id } = req.params;
  const { quesComment, commentId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("question unavailable");
  }

  try {
    const updatedProfile = await questions.findByIdAndUpdate(
      { _id },
      {
        $set: {
          "commentOnQuestion.$[o].commentBody": quesComment,
        },
      },
      { arrayFilters: [{ "o._id": commentId }], new: true }
    );
    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(405).json({ message: error.message });
  }
};

// postAnswerComment
export const postAnswerComment = async (req, res) => {
  const { id: _id } = req.params;
  const { commentBody, userCommented, userId, ansId } = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("question unavailable");
  }
  if (!mongoose.Types.ObjectId.isValid(ansId)) {
    return res.status(404).send("question unavailable");
  }
  try {
    const updatedQuestion = await questions.findByIdAndUpdate(
      _id,
      {
        $addToSet: {
          "answer.$[o].commentOnAnswer": { commentBody, userCommented, userId },
        },
      },
      { arrayFilters: [{ "o._id": ansId }], new: true }
    );
    res.status(200).json(updatedQuestion);
  } catch (error) {
    res.status(400).json("error in updating");
  }
};

export const deleteAnsComment = async (req, res) => {
  const { id: _id } = req.params;
  const { ansCommentId, ansId } = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Question unavailable...");
  }
  if (!mongoose.Types.ObjectId.isValid(ansCommentId)) {
    return res.status(404).send("Answer unavailable...");
  }
  try {
    await questions.updateOne(
      { _id },
      {
        $pull: {
          "answer.$[o].commentOnAnswer": { _id: ansCommentId },
        },
      },
      { arrayFilters: [{ "o._id": ansId }] }
    );
    res.status(200).json({ message: "Successfully deleted..." });
  } catch (error) {
    res.status(405).json(error);
  }
};

export const updateAnsComment = async (req, res) => {
  const { id: _id } = req.params;
  const { ansComment, commentId, ansId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("question unavailable");
  }

  try {
    const updatedProfile = await questions.findByIdAndUpdate(
      { _id },
      {
        $set: {
          "answer.$[i].commentOnAnswer.$[j].commentBody": ansComment,
        },
      },
      { arrayFilters: [{ "i._id": ansId }, { "j._id": commentId }], new: true }
    );
    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(405).json({ message: error.message });
  }
};
