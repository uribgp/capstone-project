import { SET_COMMENT } from './comment-actions';

export default function commentsReducer(state={}, action) {
    switch (action.type) {
        case SET_COMMENT:
            return {...state, comment: action.comment};
        default:
            return state;
    }
}
