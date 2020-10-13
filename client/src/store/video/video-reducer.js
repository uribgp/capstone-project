import { SET_VIDEO, SET_VIDEOS, SET_FEATURED_VIDEOS, SET_VIDEOS_BY_OWNER, VIDEOS_LOADING } from './video-actions';

const DEFAULT_STATE = {
 videos: [],
 loading: true, 
}

export default function videosReducer(state= DEFAULT_STATE, action) {
    switch (action.type) {
        case SET_VIDEOS:
            return {...state, videos: action.videos.slice(0, 4), loading: false};
        case SET_VIDEO:
            return {...state, video: action.video};
        case SET_VIDEOS_BY_OWNER:
            return {...state, ownedVidoes: action.videos};
        case SET_FEATURED_VIDEOS:
            return { ...state, featuredVideos: action.videos};
        case VIDEOS_LOADING: 
        return {...state, loading: true}
        default:
            return state;
    }
}
