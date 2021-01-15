import { CommentsTimestamp } from "../../types/comments-timestamp";

export const FETCH_COMMENTS_TIMESTAMP_LOADING =
  "FETCH_COMMENTS_TIMESTAMP_LOADING";
export const FETCH_COMMENTS_TIMESTAMP_ERROR = "FETCH_COMMENTS_TIMESTAMP_ERROR";
export const FETCH_COMMENTS_TIMESTAMP_SUCCESS =
  "FETCH_COMMENTS_TIMESTAMP_SUCCESS";
export const SET_COMMENTS_TIMESTAMP_ACTIVE = "SET_COMMENTS_TIMESTAMP_ACTIVE";
export const INCREMENT_ACTIVE_COMMENTS_TIMESTAMP_INDEX =
  "INCREMENT_ACTIVE_COMMENTS_TIMESTAMP_INDEX";
export const DECREMENT_ACTIVE_COMMENTS_TIMESTAMP_INDEX =
  "DECREMENT_ACTIVE_COMMENTS_TIMESTAMP_INDEX";

export const CLEAR_ACTIVE_COMMENTS = "CLEAR_ACTIVE_COMMENTS"
export const ADD_COMMENT_TIMESTAMP = "ADD_COMMENT_TIMESTAMP"
export const POST_COMMENT_TIMESTAMP_VOTE_ERROR = "POST_COMMENT_TIMESTAMP_VOTE_ERROR"

export const UPVOTE_COMMENT_TIMESTAMP = "UPVOTE_COMMENT_TIMESTAMP"
export const DOWNVOTE_COMMENT_TIMESTAMP = "DOWNVOTE_COMMENT_TIMESTAMP"
export const NEUTRALIZE_COMMENT_TIMESTAMP = "NEUTRALIZE_COMMENT_TIMESTAMP"
export interface CommentsTimestampActiveAction {
  type: typeof SET_COMMENTS_TIMESTAMP_ACTIVE;
  activeCommentIds: number[];
}

export interface PostCommmentTimestampVoteError {
  type: typeof POST_COMMENT_TIMESTAMP_VOTE_ERROR,
  commentId: number;
}

export interface CommentsTimestampLoadingAction {
  type: typeof FETCH_COMMENTS_TIMESTAMP_LOADING;
}

export interface CommentsTimestampErrorAction {
  type: typeof FETCH_COMMENTS_TIMESTAMP_ERROR;
}
export interface CommentsTimestampSuccessAction {
  type: typeof FETCH_COMMENTS_TIMESTAMP_SUCCESS;
  comments: CommentsTimestamp[];
}

export interface IncrementActiveCommentsTimestampIndex {
  type: typeof INCREMENT_ACTIVE_COMMENTS_TIMESTAMP_INDEX;
}

export interface DecrementACtiveCOmmentsTImestampIndex {
  type: typeof DECREMENT_ACTIVE_COMMENTS_TIMESTAMP_INDEX;
}

export interface ClearActiveComments {
  type: typeof CLEAR_ACTIVE_COMMENTS
}
export interface AddCommentTimestamp {
 type: typeof ADD_COMMENT_TIMESTAMP,
 comment: CommentsTimestamp
}

export interface UpvoteCommentTimestamp {
  type: typeof UPVOTE_COMMENT_TIMESTAMP
  commentId: number; 
}

export interface DownvoteCommentTimestamp {
  type: typeof DOWNVOTE_COMMENT_TIMESTAMP
  commentId: number; 
}

export interface NeutralizeCommentTimestamp {
  type: typeof NEUTRALIZE_COMMENT_TIMESTAMP,
  commentId: number; 
}

export interface PostCommentsTimestamp {
  text: string; 
  timestamp: number;
  video_id: string;
  title: string;
}


export type CommentsTimestampActionTypes =
  | CommentsTimestampErrorAction
  | CommentsTimestampLoadingAction
  | CommentsTimestampSuccessAction
  | CommentsTimestampActiveAction
  | IncrementActiveCommentsTimestampIndex
  | DecrementACtiveCOmmentsTImestampIndex
  | ClearActiveComments
  | AddCommentTimestamp
  | PostCommmentTimestampVoteError
  | UpvoteCommentTimestamp
  | DownvoteCommentTimestamp
  | NeutralizeCommentTimestamp
  ;
