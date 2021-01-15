import { Reducer } from "redux";
import TimestampedComment from "../../components/VideoDashboard/TimestampedComment";
import { CommentsTimestamp } from "../../types/comments-timestamp";
import {
  ADD_COMMENT_TIMESTAMP,
  CLEAR_ACTIVE_COMMENTS,
  CommentsTimestampActionTypes,
  DECREMENT_ACTIVE_COMMENTS_TIMESTAMP_INDEX,
  DOWNVOTE_COMMENT_TIMESTAMP,
  FETCH_COMMENTS_TIMESTAMP_ERROR,
  FETCH_COMMENTS_TIMESTAMP_LOADING,
  FETCH_COMMENTS_TIMESTAMP_SUCCESS,
  INCREMENT_ACTIVE_COMMENTS_TIMESTAMP_INDEX,
  NEUTRALIZE_COMMENT_TIMESTAMP,
  POST_COMMENT_TIMESTAMP_VOTE_ERROR,
  SET_COMMENTS_TIMESTAMP_ACTIVE,
  UPVOTE_COMMENT_TIMESTAMP,
} from "./comments-timestamp.types";

interface TimestampCommentsState {
  comments: CommentsTimestamp[];
  activeCommentIds: number[];
  activeCommentIndex: number,
  status: "loading" | "error" | "success";
}

const DEFAULT_STATE: TimestampCommentsState = {
  comments:[],
  activeCommentIds:[],
  activeCommentIndex: 0,
  status: "loading",
};


export const commentsTimestampReducer:Reducer<TimestampCommentsState, CommentsTimestampActionTypes> = (state = DEFAULT_STATE, action): TimestampCommentsState => {
  switch (action.type) {
    case FETCH_COMMENTS_TIMESTAMP_LOADING:
      return {
        ...state,
        status: "loading",
      };
    case FETCH_COMMENTS_TIMESTAMP_ERROR:
      return {
        ...state,
        status: "error",
      };
    case FETCH_COMMENTS_TIMESTAMP_SUCCESS:
      return {
        ...state,
        comments: [...action.comments],
        status: "success",
      };
    case SET_COMMENTS_TIMESTAMP_ACTIVE:
      return {
        ...state,
        activeCommentIds: [...action.activeCommentIds],
      };
    case CLEAR_ACTIVE_COMMENTS :
      return {
        ...state,
        activeCommentIds: [],
      }
    case DECREMENT_ACTIVE_COMMENTS_TIMESTAMP_INDEX: 
    return {
      ...state,
      activeCommentIndex: state.activeCommentIndex - 1
    }
    case INCREMENT_ACTIVE_COMMENTS_TIMESTAMP_INDEX:
      return {
        ...state,
        activeCommentIndex: state.activeCommentIndex + 1
      }
    case POST_COMMENT_TIMESTAMP_VOTE_ERROR:
      const comment = state.comments.find(({id}) => id === action.commentId)
      const newVoteStatus = {
        ...comment, 
        
      }
    return {
        ...state, 
        comments: [...state.comments]
      }

    case UPVOTE_COMMENT_TIMESTAMP:
      return {
        ...state, 
        comments: state.comments.map((comment) => {
          return comment.id === action.commentId ? 
          {...comment, likes: comment.likes + 1, like_status: "upvoted"}
          :
          comment
        })
      }
    case DOWNVOTE_COMMENT_TIMESTAMP:
      return {
        ...state, 
        comments: state.comments.map((comment) => {
          return comment.id === action.commentId ? 
          {...comment, likes: comment.likes - 1, like_status: "downvoted"}
          :
          comment
        })
      }
    case ADD_COMMENT_TIMESTAMP:
      return {
        ...state,
        comments: [...state.comments, action.comment].sort((a,b) => a.timestamp - b.timestamp)
      }
    default:
      return state;
  }
}