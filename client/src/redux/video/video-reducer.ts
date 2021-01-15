import { Reducer } from "redux";
import { Video } from "../../types/video";
import {
  VideoActionTypes,
  FETCH_VIDEO_ERROR,
  FETCH_VIDEO_LOADING,
  FETCH_VIDEO_SUCCESS,
  AUTOPLAY_VIDEO_ENABLE,
  AUTOPLAY_VIDEO_DISABLE,
  PLAY_VIDEO,
  PAUSE_VIDEO,
} from "./video-types";



const DEFAULT_STATE: VideoState = {
  video: {
    id: "0",
    title: '',
    description: '',
    created_at: "0",
    link: "",
    total_views: 0,
    thumbnail: "",
    user: "",
    avatar: "",
  },
  loading: true,
  error: false,
  autoplay: true,
  play: true,
};

interface VideoState {
  video: Video 
  loading: boolean;
  error: boolean;
  autoplay: boolean;
  play: boolean,
}

export const videoReducer:Reducer<VideoState, VideoActionTypes> = (state = DEFAULT_STATE, action: VideoActionTypes): VideoState  => {
  switch (action.type) {
    case FETCH_VIDEO_LOADING:
      return {
        ...state,
        loading: true,
      };
    case FETCH_VIDEO_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case FETCH_VIDEO_SUCCESS:
      console.log(action.video);
      return {
        ...state,
        loading: false,
        error: false,
        video: { ...action.video },
      };
    case AUTOPLAY_VIDEO_ENABLE: {
      return {
        ...state,
        autoplay: true,
      };
    }
    case AUTOPLAY_VIDEO_DISABLE: 
      return {
        ...state,
        autoplay: false,
      }
    
    case PLAY_VIDEO: 
      return {
        ...state, 
        play: true
      };

    case PAUSE_VIDEO:
      return {
        ...state,
        play: false
      }
    
    default:
      return state;
  }
}
