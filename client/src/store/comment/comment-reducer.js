import { ADD_COMMENT } from './comment-actions';

export default function commentsReducer(state={}, action) {
    switch (action.type) {
        case ADD_COMMENT:
            return {...state, comment: action.comment};
        default:
            return state;
    }
}
