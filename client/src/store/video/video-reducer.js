import { SET_VIDEO, SET_VIDEOS, SET_VIDEOS_BY_OWNER, SET_VIDEOS_BY_FEATURED } from './video-actions';

export default function videosReducer(state={}, action) {
    switch (action.type) {
        case SET_VIDEOS:
            return {...state, videos: action.videos};
        case SET_VIDEO:
            return {...state, video: action.video};
        case SET_VIDEOS_BY_OWNER:
            return {...state, ownedVideos: action.videos};
        default:
            return state;
    }
}
