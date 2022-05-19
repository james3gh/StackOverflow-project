import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { postAnsComment } from "../../actions/comment";

const CommentSectionAnswer = ({ setShowCommentBox, ansId }) => {
  const { id } = useParams();
  const [ansComment, setAnsComment] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const User = useSelector((state) => state.currentUserReducer);

  const handleSubmitAnsComment = (e) => {
    e.preventDefault();
    if (User === null) {
      alert("Login or Signup to answer a question");
      navigate("/Auth");
    } else {
      if (ansComment === "") alert("Enter Comment");
      else {
        dispatch(
          postAnsComment({
            ansId,
            id,
            commentBody: ansComment,
            userCommented: User?.result?.name,
            userId: User?.result?._id,
          })
        );
      }
    }
    setShowCommentBox(false);
  };
  return (
    <div>
      <form onSubmit={handleSubmitAnsComment}>
        <textarea
          name=""
          autoFocus
          id=""
          cols="90"
          rows="2"
          onChange={(e) => setAnsComment(e.target.value)}
        ></textarea>
        <br />
        <input
          type="Submit"
          className="post-ans-btn"
          defaultValue="Post Your comment"
        />
      </form>
    </div>
  );
};

export default CommentSectionAnswer;
