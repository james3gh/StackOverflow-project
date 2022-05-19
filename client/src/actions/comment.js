import * as api from "../api";
import { fetchAllQuestions } from "./question";

export const postQuesComment = (quesCommentData) => async (dispatch) => {
  try {
    const { id, commentBody, userCommented, userId } = quesCommentData;
    const { data } = await api.postQuesComment(
      id,
      commentBody,
      userCommented,
      userId
    );
    dispatch({ type: "POST_QUESTION_COMMENT", payload: data });
    dispatch(fetchAllQuestions());
  } catch (error) {
    console.log(error);
  }
};

export const deleteQuesComment = (id, quesCommentId) => async (dispatch) => {
  try {
    await api.deleteQuesComment(id, quesCommentId);
    dispatch(fetchAllQuestions());
  } catch (error) {
    console.log(error);
  }
};

export const updateQuesComment =
  (updateQuesCommentData) => async (dispatch) => {
    try {
      const { commentId, id, quesComment } = updateQuesCommentData;
      const { data } = await api.updateQuesComment(id, commentId, quesComment);
      dispatch({ type: "UPDATE_QUESTION_COMMENT", payload: data });
      dispatch(fetchAllQuestions());
    } catch (error) {
      console.log(error);
    }
  };

// postAnsComment
export const postAnsComment = (ansCommentData) => async (dispatch) => {
  try {
    const { ansId, id, commentBody, userCommented, userId } = ansCommentData;
    const { data } = await api.postAnsComment(
      id,
      ansId,
      commentBody,
      userCommented,
      userId
    );
    dispatch({ type: "POST_ANSWER_COMMENT", payload: data });
    dispatch(fetchAllQuestions());
  } catch (error) {
    console.log(error);
  }
};

export const deleteAnsComment =
  (id, ansCommentId, ansId) => async (dispatch) => {
    try {
      await api.deleteAnsComment(id, ansCommentId, ansId);
      dispatch(fetchAllQuestions());
    } catch (error) {
      console.log(error);
    }
  };

export const updateAnsComment = (updateAnsCommentData) => async (dispatch) => {
  try {
    const { commentId, id, ansId, ansComment } = updateAnsCommentData;
    const { data } = await api.updateAnsComment(
      id,
      commentId,
      ansId,
      ansComment
    );
    dispatch({ type: "UPDATE_ANSWER_COMMENT", payload: data });
    dispatch(fetchAllQuestions());
  } catch (error) {}
};
