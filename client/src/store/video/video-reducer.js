import { SET_VIDEO, SET_VIDEOS } from './video-actions';

export default function videosReducer(state={}, action) {
    switch (action.type) {
        case SET_VIDEOS:
            return {...state, videos: action.videos};
        case SET_VIDEO:
            return {...state, video: action.video};
        default:
            return state;
    }
}
