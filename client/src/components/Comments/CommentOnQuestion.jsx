import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import moment from "moment";
import { useSelector } from "react-redux";
import { deleteQuesComment, updateQuesComment } from "../../actions/comment";
import "./Comments.css";
// import { fetchAllQuestions } from "../../actions/question";

const CommentOnQuestion = ({ question }) => {
  const { id } = useParams();
  const User = useSelector((state) => state.currentUserReducer);
  const dispatch = useDispatch();
  const [showCommentBox, setShowCommentBox] = useState({});
  const [quesComment, setQuesComment] = useState("");

  const showContent = (cid, commentBody) => {
    setShowCommentBox((prevstate) => ({
      ...prevstate,
      [cid]: !prevstate[cid],
    }));
    setQuesComment(commentBody);
  };

  const handleUpdateQCSubmit = (e, commentId) => {
    e.preventDefault();
    if (quesComment === "") alert("Please provide a comment");
    else {
      dispatch(updateQuesComment({ id, commentId, quesComment }));
    }
    setShowCommentBox((prevstate) => ({
      ...prevstate,
      [commentId]: !prevstate[commentId],
    }));
  };

  const handleDelete = (quesCommentId) => {
    dispatch(deleteQuesComment(id, quesCommentId));
  };

  return (
    <div>
      {question.commentOnQuestion.map((comment) => (
        <div className="display-comment" key={comment._id}>
          <p>
            {comment.commentBody} -{" "}
            <Link
              to={`/Users/${comment.userId}`}
              className="user-link"
              style={{ color: "#0086d8", display: "inline" }}
            >
              {comment.userCommented}
            </Link>{" "}
            <span style={{ color: "#9199a1" }}>
              {moment(comment.commentedOn).format("DD-MM-YYYY HH:mm")}
            </span>
          </p>
          <div className="question-actions-user">
            <div>
              {User?.result?._id === comment?.userId && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      showContent(comment._id, comment.commentBody)
                    }
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(comment._id)}
                  >
                    Delete
                  </button>
                  {showCommentBox[comment._id] ? (
                    <form
                      onSubmit={(e) => handleUpdateQCSubmit(e, comment._id)}
                    >
                      <textarea
                        name=""
                        id=""
                        autoFocus
                        value={quesComment}
                        cols="90"
                        rows="2"
                        onChange={(e) => setQuesComment(e.target.value)}
                      ></textarea>
                      <br />
                      <input
                        type="Submit"
                        className="post-ans-btn"
                        defaultValue="Update Your comment"
                      />
                    </form>
                  ) : (
                    ""
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentOnQuestion;
