import { bindActionCreators } from 'redux';
import { ADD_COMMENT, SET_COMMENT, SET_COMMENTS, LOADING_COMMENT, COMMENT_VOTE_ERROR, INCREMENT_COMMENT_VOTE, DECREMENT_COMMENT_VOTE } from './comment-actions';

const DEFAULT_STATE = {
    comments: [],
    loading: true, 
    error: false,
}

export default function commentsReducer(state= DEFAULT_STATE, action) {
    switch (action.type) {
        case SET_COMMENT:
            return {...state, comment: action.comment};
        case LOADING_COMMENT: 
            return {
                ...state, error: false, loading: true,
            }
        case SET_COMMENTS:
            return {...state, loading: false,  comments: action.comments.sort((a, b) => a.timestamp - b.timestamp)};

        case ADD_COMMENT: 
            return {...state, comments: [action.comment, ...state.comments].sort((a,b) => (a.timestamp < b.timestamp) ? -1 : 1)}

        case COMMENT_VOTE_ERROR: 
        return {...state}

        case INCREMENT_COMMENT_VOTE: 
        return {
            ...state,
            comments: state.comments.map((comment ) => {
                return comment.id === action.commentId ?
                {...comment, likes: comment.likes + 1}
                :
                comment
            })
        }
        case DECREMENT_COMMENT_VOTE: 
        return {
            ...state,
            comments: state.comments.map((comment ) => {
                return comment.id === action.commentId ?
                {...comment, dislikes: comment.dislikes + 1}
                :
                comment
            })
        }
        default:
            return state;
    }
}
