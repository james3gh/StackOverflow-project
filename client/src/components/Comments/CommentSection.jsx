import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { postQuesComment } from "../../actions/comment";

const CommentSection = ({ setShowCommentBox }) => {
  const { id } = useParams();
  const [quesComment, setQuesComment] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const User = useSelector((state) => state.currentUserReducer);

  const handleSubmitQuesComment = (e) => {
    setShowCommentBox(false);
    e.preventDefault();
    if (User === null) {
      alert("Login or Signup to answer a question");
      navigate("/Auth");
    } else {
      if (quesComment === "") alert("Enter Comment");
      else {
        dispatch(
          postQuesComment({
            id,
            commentBody: quesComment,
            userCommented: User.result.name,
            userId: User.result._id,
          })
        );
      }
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmitQuesComment}>
        <textarea
          name=""
          id=""
          autoFocus
          cols="90"
          rows="2"
          onChange={(e) => setQuesComment(e.target.value)}
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

export default CommentSection;
