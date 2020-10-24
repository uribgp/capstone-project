import { SET_PROFILE, SET_USER_PROFILE, SET_FOLLOWS, ADD_FOLLOW } from './profile-actions';

export default function profileReducer(state={}, action) {
    switch (action.type) {
        case SET_PROFILE:
            return {...state, profile: action.profile};
        case SET_USER_PROFILE:
            return {...state, userProfile: action.userProfile};
        case SET_FOLLOWS:
            return {...state, follows: action.follows};
        case ADD_FOLLOW:
            return {...state, follows: [action.follow, ...state.follows]}
        default:
            return state;
    }
}
