const axios = require('axios')

const SET_VIDEOS = 'videos/all';
const SET_VIDEO = '/video/single';
const SET_CATEGORIES = '/categories/all'

export const loadVideos = (videos) => { 
    return {
        type: SET_VIDEOS,
        videos
    }
}

export const setVideo = (video) => {
    return {
        type: SET_VIDEO,
        video
    }
}

export const loadCategories = (categories) => { 
    return {
        type: SET_CATEGORIES,
        categories: categories
    }
}


export const getVideos = () => {
    return async dispatch => {
      const res = await axios.get('/api/videos/')
      if(res.statusText){
      dispatch(loadVideos(res.data.videos))
    }
    return res;
  }
}


export const postVideo = (title, description, link, thumbnail) => {
    return async dispatch => {
        console.log("~~~")
      const res = await axios.post('/api/videos/', { title, description, link, thumbnail })
      
      if (res.statusText) {
        dispatch(setVideo(res.data.video));
      }
      return res;
    }
  }

  export const getCategories = () => {
    return async dispatch => {
        const res = await axios.get('/api/videos/categories')

    if(res.statusText){
      dispatch(loadCategories(res.data.categories))
    }
    return res;
  }
}


export default function videosReducer(state={}, action) {
    switch (action.type) {
        case SET_VIDEOS:
            return {...state, videos: action.videos};
        case SET_VIDEO:
            return {...state, video: action.video}
        case SET_CATEGORIES:
            return {...state, categories: action.categories}
        default:
            return state;
    }
}