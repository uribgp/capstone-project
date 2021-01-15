import React, { ReactElement, useState } from "react";
import Button from "../../Shared/Button/Button";
import Textarea from "../../Shared/Textarea/Textarea";
import buttonStyles from "../../Shared/Button/button.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { postCommentTimestamp } from "../../../redux/comments-timestamp/comments-timestamp.actions";
import { useFetch } from "../../../hooks/useFetch";
import { UsePost } from "../../../hooks/usePost";
import axios from "axios";
import { RootState } from "../../../redux/root-reducer";
import { CommentGeneral } from "../../../types/comment-general";
interface Props {
  onPostCommentSuccess: (comment: CommentGeneral) => void;
}

export default function PostCommentGeneral({
  onPostCommentSuccess,
}: Props): ReactElement {
  const {
    video: { id },
  } = useSelector((state: RootState) => state.video);

  const [comment, setComment] = useState({
    text: "",
    title: "1",
    video_id: id,
  });
  const dispatch = useDispatch();
  const [postComment] = UsePost("comments", comment);
  const handleOnCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setComment({ ...comment, text: event.currentTarget.value });
  };

  const onSubmitCommentClick = () => {
    axios.post("/api/comments/post", comment).then((response) => {
      onPostCommentSuccess(response.data.comment);
      setComment({ ...comment, text: "" });
    });
  };

  return (
    <div className="post-general-comment-section">
      <Textarea
        value={comment.text}
        onChange={(event) => handleOnCommentChange(event)}
      />
      <Button
        uniqueStyle={`${buttonStyles.baseButtonPrimary} ${buttonStyles.baseButton}`}
        onClick={onSubmitCommentClick}
      >
        Submit Comment
      </Button>
    </div>
  );
}
