import { SET_VIDEO, SET_VIDEO_ERROR, SET_VIDEO_LOADING} from './video-actions';

const DEFAULT_STATE = {
 video: {},
 loading: true,
 error: false, 


}

export default function videoReducer(state= DEFAULT_STATE, action) {

    switch (action.type) {
        case SET_VIDEO:
            return {...state, video: action.video, loading: false, error: false};
        case SET_VIDEO_ERROR:
            return {...state, video: {}, error: true, loading: false};
        case SET_VIDEO_LOADING: 
            return {...state, error: false, loading: true}

        
        default:
            return state;
    }
}
