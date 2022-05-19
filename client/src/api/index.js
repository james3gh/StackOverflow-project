import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("Profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("Profile")).token
    }`;
  }
  return req;
});

export const logIn = (authData) => API.post("/user/login", authData);
export const signUp = (authData) => API.post("/user/signup", authData);

export const postQuestion = (questionData) =>
  API.post("/questions/Ask", questionData);
export const getAllQuestions = () => API.get("/questions/get");
// export const getDOB = (id)=>API.get("/")
export const deleteQuestion = (id) => API.delete(`/questions/delete/${id}`);
export const voteQuestion = (id, value, userId) =>
  API.patch(`/questions/vote/${id}`, { value, userId });

export const postAnswer = (id, noOfAnswers, answerBody, userAnswered, userId) =>
  API.patch(`/answer/post/${id}`, {
    noOfAnswers,
    answerBody,
    userAnswered,
    userId,
  });
export const deleteAnswer = (id, answerId, noOfAnswers) =>
  API.patch(`/answer/delete/${id}`, { answerId, noOfAnswers });

export const getAllUsers = () => API.get("/user/getAllUsers");
export const updateProfile = (id, updateData) =>
  API.patch(`/user/update/${id}`, updateData);

export const postQuesComment = (id, commentBody, userCommented, userId) =>
  API.patch(`/comment/postquestion/${id}`, {
    commentBody,
    userCommented,
    userId,
  });
export const deleteQuesComment = (id, quesCommentId) =>
  API.patch(`/comment/deletequescomment/${id}`, { quesCommentId });

// postAnsComment
export const postAnsComment = (id, ansId, commentBody, userCommented, userId) =>
  API.patch(`/comment/postanswer/${id}`, {
    ansId,
    commentBody,
    userCommented,
    userId,
  });
export const deleteAnsComment = (id, ansCommentId, ansId) =>
  API.patch(`/comment/deleteanscomment/${id}`, { ansCommentId, ansId });
export const updateQuesComment = (id, commentId, quesComment) =>
  API.patch(`/comment/updatequescomment/${id}`, { commentId, quesComment });
export const updateAnsComment = (id, commentId, ansId, ansComment) =>
  API.patch(`/comment/updateanscomment/${id}`, {
    commentId,
    ansId,
    ansComment,
  });
