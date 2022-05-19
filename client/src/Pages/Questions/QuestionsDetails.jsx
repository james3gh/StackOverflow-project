import React, { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import copy from "copy-to-clipboard";

import upvote from "../../assests/sort-up.svg";
import downvote from "../../assests/sort-down.svg";
import "./Questions.css";
import Avatar from "../../components/Avatar/Avatar";
import DisplayAnswer from "./DisplayAnswer";
import CommentSection from "../../components/Comments/CommentSection";
import {
  postAnswer,
  deleteQuestion,
  voteQuestion,
} from "../../actions/question";
import CommentOnQuestion from "../../components/Comments/CommentOnQuestion";

const QuestionsDetails = () => {
  const { id } = useParams();
  const questionsList = useSelector((state) => state.questionsReducer);
  const currentQuestion_PersonId = questionsList?.data?.filter(
    (ques) => ques._id === id
  )[0].userId;
  const users = useSelector((state) => state.usersReducer);
  const currentQuestion_Person = users?.filter(
    (user) => user._id === currentQuestion_PersonId
  )[0];

  const [Answer, setAnswer] = useState("");
  const [showCommentBox, setShowCommentBox] = useState(false);
  const Navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const url = "https://stack-overflow-proj.netlify.app";
  const User = useSelector((state) => state.currentUserReducer);

  const handleShare = () => {
    copy(url + location.pathname);
    alert("Copied url : " + url + location.pathname);
  };

  const handlePostAns = (e, answerLength) => {
    e.preventDefault();
    if (User === null) {
      alert("Login or Signup to answer a question");
      Navigate("/Auth");
    } else {
      if (Answer === "") {
        alert("Enter an answer before submitting");
      } else {
        dispatch(
          postAnswer({
            id,
            noOfAnswers: answerLength + 1,
            answerBody: Answer,
            userAnswered: User.result.name,
            userId: User.result._id,
          })
        );
      }
    }
    setAnswer("");
  };

  const handleDelete = () => {
    if (User === null) {
      alert("Login or Signup to answer a question");
      Navigate("/Auth");
    } else {
      dispatch(deleteQuestion(id, Navigate));
    }
  };

  const handleUpVote = () => {
    if (User === null) {
      alert("Login or Signup to answer a question");
      Navigate("/Auth");
    } else {
      dispatch(voteQuestion(id, "upVote", User.result._id));
    }
  };

  const handleDownVote = () => {
    dispatch(voteQuestion(id, "downVote", User.result._id));
  };

  // var questionsList = [
  //   {
  //     _id: "1",
  //     upVotes: 3,
  //     downVotes: 2,
  //     noOfAnswers: 2,
  //     questionTitle: "What is a function?",
  //     questionBody: "It meant to be",
  //     questionTags: ["java", "node js", "react js", "mongo db", "express js"],
  //     userPosted: "mano",
  //     userId: 1,
  //     askedOn: "jan 1",
  //     answer: [
  //       {
  //         answerBody: "Answer",
  //         userAnswered: "kumar",
  //         answeredOn: "jan 2",
  //         userId: 2,
  //       },
  //     ],
  //   },
  //   {
  //     _id: "2",
  //     upVotes: 3,
  //     downVotes: 2,
  //     noOfAnswers: 0,
  //     questionTitle: "What is a function?",
  //     questionBody: "It meant to be",
  //     questionTags: ["javascript", "R", "python"],
  //     userPosted: "mano",
  //     askedOn: "jan 1",
  //     userId: 1,
  //     answer: [
  //       {
  //         answerBody: "Answer",
  //         userAnswered: "kumar",
  //         answeredOn: "jan 2",
  //         userId: 2,
  //       },
  //     ],
  //   },
  //   {
  //     _id: "3",
  //     upVotes: 3,
  //     downVotes: 2,
  //     noOfAnswers: 0,
  //     questionTitle: "What is a function?",
  //     questionBody: "It meant to be",
  //     questionTags: ["javascript", "R", "python"],
  //     userPosted: "mano",
  //     askedOn: "jan 1",
  //     userId: 1,
  //     answer: [
  //       {
  //         answerBody: "Answer",
  //         userAnswered: "kumar",
  //         answeredOn: "jan 2",
  //         userId: 2,
  //       },
  //     ],
  //   },
  // ];

  return (
    <div className="question-details-page">
      {questionsList.data === null ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {questionsList.data
            .filter((question) => question._id === id)
            .map((question) => (
              <div key={question._id}>
                <section className="question-details-container">
                  <h1>{question.questionTitle}</h1>
                  <div className="question-details-container-2">
                    <div className="question-votes">
                      <img
                        src={upvote}
                        alt=""
                        width="18"
                        className="votes-icon"
                        onClick={handleUpVote}
                      />
                      <p>{question.upVote.length - question.downVote.length}</p>
                      <img
                        src={downvote}
                        alt=""
                        width="18"
                        className="votes-icon"
                        onClick={handleDownVote}
                      />
                    </div>
                    <div style={{ width: "100%" }}>
                      <p className="question-body">{question.questionBody}</p>
                      <div className="question-details-tags">
                        {question.questionTags.map((tag, index) => (
                          <p key={index}>{tag}</p>
                        ))}
                      </div>
                      <div className="question-actions-user">
                        <div>
                          <button type="button" onClick={handleShare}>
                            Share
                          </button>
                          {User?.result?._id === question?.userId && (
                            <button type="button" onClick={handleDelete}>
                              Delete
                            </button>
                          )}
                        </div>
                        <div>
                          <p>asked {moment(question.askedOn).fromNow()}</p>
                          <Link
                            to={`/Users/${question.userId}`}
                            className="user-link"
                            style={{ color: "#0086d8" }}
                          >
                            <Avatar
                              backgroundColor="orange"
                              px="8px"
                              py="5px"
                              borderRadius="4px"
                            >
                              {question.userPosted.charAt(0).toUpperCase()}
                            </Avatar>
                            <div>{question.userPosted}</div>
                          </Link>
                          <p>
                            DOB of {question.userPosted} :{" "}
                            {currentQuestion_Person?.dateOfBirth}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                <span
                  className="comment-box"
                  style={{
                    cursor: "pointer",
                    color: "#00bfff",
                  }}
                  onClick={() => setShowCommentBox(!showCommentBox)}
                >
                  Add a comment{" "}
                </span>
                {showCommentBox && (
                  <CommentSection setShowCommentBox={setShowCommentBox} />
                )}
                {question.commentOnQuestion.length !== 0 && (
                  <section style={{ marginTop: "-15px" }}>
                    <h5>Comments</h5>
                    <CommentOnQuestion question={question} />
                  </section>
                )}
                {question.noOfAnswers !== 0 && (
                  <section>
                    <h3 style={{ marginTop: "10px" }}>
                      {question.noOfAnswers} Answers
                    </h3>
                    <DisplayAnswer
                      question={question}
                      handleShare={handleShare}
                      setShowCommentBox={setShowCommentBox}
                    />
                  </section>
                )}
                <section className="post-ans-container">
                  <h3>Your Answer</h3>
                  <form
                    onSubmit={(e) => {
                      handlePostAns(e, question.answer.length);
                    }}
                  >
                    <textarea
                      name=""
                      id=""
                      autoFocus
                      cols="30"
                      rows="10"
                      value={Answer}
                      onChange={(e) => setAnswer(e.target.value)}
                    ></textarea>
                    <br />
                    <input
                      type="Submit"
                      className="post-ans-btn"
                      defaultValue="Post Your Answer"
                    />
                  </form>
                  <p>
                    Browse other Question tagged
                    {question.questionTags.map((tag, index) => (
                      <Link to="/Tags" key={index} className="ans-tags">
                        {tag}
                      </Link>
                    ))}
                    <Link
                      to="/AskQuestion"
                      style={{ textDecoration: "none", color: "#009dff" }}
                    >
                      ask your own question.
                    </Link>
                  </p>
                </section>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default QuestionsDetails;
