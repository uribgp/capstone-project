import axios from "axios";

const GET_VIDEOS = 'videos/all';

export const loadVideos = (videos) => { 
    return {
        type: GET_VIDEOS,
        videos: videos
    }
}


export const getVideos = () => {
    return async dispatch => {
      const res = axios.get('/api/videos/')
      res.data = await res.json()
    if(res.ok){
      dispatch(loadVideos(res.data.videos))
    }
    return res;
  }
}


export default function videosReducer(state={}, action) {
    switch (action.type) {
        case GET_VIDEOS:
            return {...state, list: action.videos};
        default:
            return state;
    }
}