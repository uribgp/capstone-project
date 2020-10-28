import { SET_PROFILE, SET_USER_PROFILE, SET_FOLLOWS } from './profile-actions';

const DEFAULT_STATE = {
    
}


export default function profileReducer(state={}, action) {
    switch (action.type) {
        case SET_PROFILE:
            return {...state, profile: action.profile};
        case SET_USER_PROFILE:
            return {...state, userProfile: action.userProfile};
        case SET_FOLLOWS:
            return {...state, follows: action.follows};
        default:
            return state;
    }
}
