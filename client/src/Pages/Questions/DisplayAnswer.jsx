import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import moment from "moment";
import { useSelector } from "react-redux";
import Avatar from "../../components/Avatar/Avatar";
import { deleteAnswer } from "../../actions/question";
import CommentOnAnswer from "../../components/Comments/CommentOnAnswer";
import CommentSectionAnswer from "../../components/Comments/CommentSectionAnswer";

const DisplayAnswer = ({ question, handleShare }) => {
  const User = useSelector((state) => state.currentUserReducer);
  const { id } = useParams();
  const dispatch = useDispatch();
  const handleDelete = (answerId, noOfAnswers) => {
    dispatch(deleteAnswer(id, answerId, noOfAnswers - 1));
  };
  const [showCommentBox, setShowCommentBox] = useState({});

  const showContent = (id) => {
    setShowCommentBox((prevstate) => ({
      ...prevstate,
      [id]: !prevstate[id],
    }));
  };

  return (
    <div>
      {question.answer.map((ans) => (
        <div className="display-ans" key={ans._id}>
          <p>{ans.answerBody}</p>
          <div className="question-actions-user" style={{ marginTop: "-15px" }}>
            <div>
              <button type="button" onClick={handleShare}>
                Share
              </button>
              {User?.result?._id === ans?.userId && (
                <button
                  type="button"
                  onClick={() => handleDelete(ans._id, question.noOfAnswers)}
                >
                  Delete
                </button>
              )}
            </div>
            <div>
              <p>answered {moment(ans.answeredOn).fromNow()}</p>
              <Link
                to={`/Users/${ans.userId}`}
                className="user-link"
                style={{ color: "#0086d8" }}
              >
                <Avatar
                  backgroundColor="lightgreen"
                  px="8px"
                  py="5px"
                  borderRadius="4px"
                >
                  {ans.userAnswered.charAt(0).toUpperCase()}
                </Avatar>
                <div>{ans.userAnswered}</div>
              </Link>
            </div>
          </div>
          <span
            className="comment-box"
            style={{
              cursor: "pointer",
              color: "#009dff",
              display: "inline-block",
              marginTop: "6px",
            }}
            onClick={() => showContent(ans._id)}
          >
            Add a comment{" "}
          </span>
          {showCommentBox[ans._id] && (
            <CommentSectionAnswer
              setShowCommentBox={setShowCommentBox}
              ansId={ans._id}
            />
          )}
          {ans.commentOnAnswer.length !== 0 && (
            <section style={{ marginTop: "-15px" }}>
              <h5>Comments</h5>
              <CommentOnAnswer key={question._id} ans={ans} />
            </section>
          )}
        </div>
      ))}
    </div>
  );
};

export default DisplayAnswer;
