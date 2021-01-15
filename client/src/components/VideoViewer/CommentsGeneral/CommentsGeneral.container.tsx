import axios from "axios";
import React, { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../../hooks/useFetch";
import { CommentGeneral } from "../../../types/comment-general";
import PostCommentGeneral from './PostCommentGeneral'
import CommentGeneralCard from "./CommentGeneralCard";
import "./comments-general.style.scss";
interface Props {}

export default function CommentsGeneralContainer({}: Props): ReactElement {
  const {id} = useParams<{ id: string }>();
  const [comments, setComments] = useState<CommentGeneral[]>([])


  useEffect(() => {
    axios.get('/api/comments', {
      params: {
        id
      }
    })
    .then((response) => {
      console.log(response)
      setComments(response.data.general_comments)
    })
    .catch((error) => {
      console.log(error)
    })
  }, [])


  const handleOnPostCommentSuccess = (comment: CommentGeneral) => {
    console.log(comment)
    setComments([comment, ...comments])
  }
  

  return (
    <div className="comments-general-section">
      <div>{comments.length} Comments</div>
      <PostCommentGeneral onPostCommentSuccess={handleOnPostCommentSuccess} />
      {comments.map(
        ({
          comment_user,
          text,
          created_at,
          comment_avatar,
        }: CommentGeneral) => {
          return (
            <CommentGeneralCard
              avatar={comment_avatar}
              createdAt={created_at}
              username={comment_user}
              text={text}
            />
          );
        }
      )}
    </div>
  );
}
