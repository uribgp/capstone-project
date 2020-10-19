import { SET_VIDEO, SET_VIDEOS, SET_FEATURED_VIDEOS, SET_VIDEOS_BY_OWNER, VIDEOS_LOADING, SET_POPULAR_VIDEOS, SET_RECENT_VIDEOS, SET_NEED_VIDEOS } from './videos-actions';

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
        case SET_POPULAR_VIDEOS:
            return {...state, popularVideos: action.videos}
        case SET_RECENT_VIDEOS:
            return {...state, recentVideos: action.videos}
        case SET_NEED_VIDEOS:
            return {...state, needVideos: action.videos}
        default:
            return state;
    }
}
