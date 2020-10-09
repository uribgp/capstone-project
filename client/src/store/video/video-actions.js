const axios = require('axios');

export const SET_VIDEOS = 'videos/all';
export const SET_VIDEO = '/videos/single';
export const SET_VIDEOS_BY_OWNER = 'videos/owner'

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

export const setVideosByOwner = (videos) => {
  return {
    type: SET_VIDEOS_BY_OWNER,
    videos
  }
}


export const getVideos = () => {
    return async dispatch => {
      const res = await axios.get('/api/videos/')
      if(res.statusText){
      dispatch(loadVideos(res.data.videos));
    }
    return res;
  }
}


export const postVideo = (title, description, link, thumbnail, id, category_id, file) => {
  let formData = new FormData()
  // how fast is it uploading larger files?
  // limit file size?
  // s3 bucket, is there a limitation?  Do I need to check settings.  
  // if a file is too big or s3 is getting full, protect myself.
  formData.append("title", title)
  formData.append("description", description)
  formData.append("link", link)
  formData.append("thumbnail", thumbnail)
  formData.append("id", id)
  formData.append("category_id", category_id)
  formData.append("file", file.raw)
  let config = { headers: {
    'Content-Type': 'multipart/form-data'
  } }
    return async dispatch => {
      const res = await axios.post('/api/videos/', formData, config)
      if (res.statusText) {
        dispatch(setVideo(res.data.video));
      }
      return res;
    }
  }

export const getVideosByOwner = () => {
  return async dispatch => {
    const res = await axios.get('/api/videos/by_owner')
    if (res.statusText){
      dispatch(setVideosByOwner(res.data.videos))
    }
    return res;
  }
}

export const getVideoById = (id) => {
  return async dispatch => {
    const res = await axios.get(`/api/videos/single?id=${id}`)
    if (res.statusText){
      dispatch(setVideo(res.data.video))
    }
    return res;
  }
}