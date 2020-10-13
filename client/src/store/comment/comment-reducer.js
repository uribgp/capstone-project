import { SET_COMMENT, SET_COMMENTS } from './comment-actions';

export default function commentsReducer(state={}, action) {
    switch (action.type) {
        case SET_COMMENT:
            return {...state, comment: action.comment};
        case SET_COMMENTS:
            return {...state, comments: action.comments.sort((a, b) => a.timestamp - b.timestamp)};
        default:
            return state;
    }
}
