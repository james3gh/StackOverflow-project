import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import moment from "moment";
import { useSelector } from "react-redux";
import { deleteAnsComment, updateAnsComment } from "../../actions/comment";
import "./Comments.css";

const CommentOnAnswer = ({ ans }) => {
  const User = useSelector((state) => state.currentUserReducer);
  const { id } = useParams();
  const ansId = ans._id;
  const [showCommentBox, setShowCommentBox] = useState({});
  const [ansComment, setAnsComment] = useState("");

  const showContent = (id, commentBody) => {
    setShowCommentBox((prevstate) => ({
      ...prevstate,
      [id]: !prevstate[id],
    }));
    setAnsComment(commentBody);
  };
  const handleUpdateACSubmit = (e, commentId) => {
    e.preventDefault();
    if (ansComment === "") alert("Please provide a comment");
    else {
      dispatch(updateAnsComment({ id, commentId, ansId, ansComment }));
    }
    setShowCommentBox((prevstate) => ({
      ...prevstate,
      [commentId]: !prevstate[commentId],
    }));
  };
  const dispatch = useDispatch();
  const handleDelete = (commentId) => {
    dispatch(deleteAnsComment(id, commentId, ansId));
  };

  return (
    <div>
      {ans.commentOnAnswer.map((comment) => (
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
                      onSubmit={(e) => handleUpdateACSubmit(e, comment._id)}
                    >
                      <textarea
                        name=""
                        id=""
                        autoFocus
                        value={ansComment}
                        cols="90"
                        rows="2"
                        onChange={(e) => setAnsComment(e.target.value)}
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

export default CommentOnAnswer;
