import { SET_VIDEO, SET_VIDEOS, SET_FEATURED_VIDEOS, SET_VIDEOS_BY_OWNER, SET_VIDEOS_BY_CATEGORY } from './video-actions';

export default function videosReducer(state={}, action) {
    switch (action.type) {
        case SET_VIDEOS:
            return {...state, videos: action.videos};
        case SET_VIDEO:
            return {...state, video: action.video};
        case SET_VIDEOS_BY_OWNER:
            return {...state, ownedVidoes: action.videos};
        case SET_FEATURED_VIDEOS:
            return { ...state, featuredVideos: action.videos};
        default:
            return state;
    }
}
