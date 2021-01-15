import axios from "axios";
import { ThunkDispatch } from "redux-thunk";
import TimestampedComment from "../../components/VideoDashboard/TimestampedComment";
import { CommentsTimestamp } from "../../types/comments-timestamp";
import { CommentVote } from "../../types/comment-vote";
import {
  CommentsTimestampActionTypes,
  CommentsTimestampActiveAction,
  CommentsTimestampErrorAction,
  CommentsTimestampLoadingAction,
  CommentsTimestampSuccessAction,
  DECREMENT_ACTIVE_COMMENTS_TIMESTAMP_INDEX,
  DecrementACtiveCOmmentsTImestampIndex,
  FETCH_COMMENTS_TIMESTAMP_ERROR,
  FETCH_COMMENTS_TIMESTAMP_LOADING,
  FETCH_COMMENTS_TIMESTAMP_SUCCESS,
  IncrementActiveCommentsTimestampIndex,
  INCREMENT_ACTIVE_COMMENTS_TIMESTAMP_INDEX,
  SET_COMMENTS_TIMESTAMP_ACTIVE,
  CLEAR_ACTIVE_COMMENTS,
  ClearActiveComments,
  PostCommentsTimestamp,
  AddCommentTimestamp,
  ADD_COMMENT_TIMESTAMP,
  POST_COMMENT_TIMESTAMP_VOTE_ERROR,
  PostCommmentTimestampVoteError,
  UpvoteCommentTimestamp,
  UPVOTE_COMMENT_TIMESTAMP,
  DownvoteCommentTimestamp,
  DOWNVOTE_COMMENT_TIMESTAMP,
  NeutralizeCommentTimestamp,
  NEUTRALIZE_COMMENT_TIMESTAMP,
} from "./comments-timestamp.types";

const commentsTimestampLoading = (): CommentsTimestampLoadingAction => ({
  type: FETCH_COMMENTS_TIMESTAMP_LOADING,
});

const commentsTimestampError = (): CommentsTimestampErrorAction => ({
  type: FETCH_COMMENTS_TIMESTAMP_ERROR,
});

const commentsTimestampSuccess = (
  comments: CommentsTimestamp[]
): CommentsTimestampSuccessAction => ({
  type: FETCH_COMMENTS_TIMESTAMP_SUCCESS,
  comments,
});

export const clearActiveComments = (): ClearActiveComments => ({
  type: CLEAR_ACTIVE_COMMENTS,
});

export const setCommentsTimestampActive = (
  activeCommentIds: number[]
): CommentsTimestampActiveAction => ({
  type: SET_COMMENTS_TIMESTAMP_ACTIVE,
  activeCommentIds,
});

export const addCommentTimestamp = (
  comment: CommentsTimestamp
): AddCommentTimestamp => ({
  type: ADD_COMMENT_TIMESTAMP,
  comment,
});

export const decrementActiveCommentsTimestampIndex = (): DecrementACtiveCOmmentsTImestampIndex => ({
  type: DECREMENT_ACTIVE_COMMENTS_TIMESTAMP_INDEX,
});

export const incrementActiveCommentsTimestampIndex = (): IncrementActiveCommentsTimestampIndex => ({
  type: INCREMENT_ACTIVE_COMMENTS_TIMESTAMP_INDEX,
});

export const upvoteCommentTimestamp = (commentId: number): UpvoteCommentTimestamp => ({
  type: UPVOTE_COMMENT_TIMESTAMP,
  commentId
})

export const downvoteCommentTimestamp = (commentId: number): DownvoteCommentTimestamp => ({
  type: DOWNVOTE_COMMENT_TIMESTAMP,
  commentId
})

export const neutralizeCommentTimestamp = (commentId: number): NeutralizeCommentTimestamp => ({
  type: NEUTRALIZE_COMMENT_TIMESTAMP,
  commentId
})



export const postCommentTimestampVoteError = (
  commentId: number
): PostCommmentTimestampVoteError => ({
  type: POST_COMMENT_TIMESTAMP_VOTE_ERROR,
  commentId,
});

/* export const likeComment = (comment_id, like_comment, dislike_comment) => {
  return async (
    dispatch: ThunkDispatch<any, any, CommentsTimestampActionTypes>,
    getState: any
  ) => {
    try {
      const response = await axios.post(`/api/comments/likes?comment_id=${comment_id}`,{like_comment, dislike_comment})    
    } catch (error) {
      dispatch(commentVoteError(comment_id))
    }
  
  }
} */

export const postCommentTimestamp = (comment: string, commentId: string) => {
  return async (
    dispatch: ThunkDispatch<any, any, CommentsTimestampActionTypes>,
    getState: any
  ) => {
    dispatch(commentsTimestampLoading());
    axios
      .post("/api/comments/post", comment)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  };
};




export const postCommentTimestampVoteChange = (
  commentId: number,
  voteStatus: CommentVote
) => {
  return async (
    dispatch: ThunkDispatch<any, any, CommentsTimestampActionTypes>,
    getState: any
  ) => {
    axios
      .post(
        `/api/comments/likes?comment_id=${commentId}&vote_status=${voteStatus}`
      )
      .then((response) => {})
      .catch((error) => {
        dispatch(postCommentTimestampVoteError(commentId));
      });
  };
};

export const fetchCommentsTimestampByVideoId = (videoId: string) => {
  return async (
    dispatch: ThunkDispatch<any, any, CommentsTimestampActionTypes>,
    getState: any
  ) => {
    dispatch(commentsTimestampLoading());
    try {
      const response = await axios.get(`/api/comments?id=${videoId}`);
      console.log(response);
      dispatch(commentsTimestampSuccess(response.data.timed_comments));
    } catch (error) {
      console.log(error);
      dispatch(commentsTimestampError());
    }
  };
};
