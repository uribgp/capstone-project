import { bindActionCreators } from 'redux';
import { ADD_COMMENT, SET_COMMENT, SET_COMMENTS, LOADING_COMMENT } from './comment-actions';

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
        default:
            return state;
    }
}
