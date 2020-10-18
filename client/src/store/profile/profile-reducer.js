import { SET_PROFILE, SET_USER_PROFILE } from './profile-actions';

export default function profileReducer(state={}, action) {
    switch (action.type) {
        case SET_PROFILE:
            return {...state, profile: action.profile};
        case SET_USER_PROFILE:
            return {...state, userProfile: action.userProfile};
        default:
            return state;
    }
}
