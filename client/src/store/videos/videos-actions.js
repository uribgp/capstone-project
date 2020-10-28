const axios = require('axios');

export const SET_VIDEOS = 'videos/all';
export const SET_VIDEO = '/videos/single';
export const SET_VIDEOS_BY_OWNER = 'videos/owner';
export const SET_FEATURED_VIDEOS = 'videos/get_featured';
export const VIDEOS_LOADING = 'videos/loading';
export const SET_POPULAR_VIDEOS = 'videos/popular';
export const SET_RECENT_VIDEOS = 'videos/recent';
export const SET_NEED_VIDEOS = 'videos/by_need';

export const loadVideos = (videos) => { 
    return {
        type: SET_VIDEOS,
        videos
    }
}

export const videosLoading = () => {
  return {
    type: VIDEOS_LOADING
  }
}

export const loadPopularVideos = (videos) => {
  return {
    type: SET_POPULAR_VIDEOS,
    videos
  }
}

export const setVideo = (video) => {
    return {
        type: SET_VIDEO,
        video
    }
}

export const loadNeedVideos = (videos) => {
  return {
    type: SET_NEED_VIDEOS,
    videos
  }
}

export const setVideosByOwner = (videos) => {
  return {
    type: SET_VIDEOS_BY_OWNER,
    videos
  }
}

export const loadFeaturedVideos = (videos) => {
  return {
    type: SET_FEATURED_VIDEOS,
    videos
  }
}

export const loadRecentVideos = (videos) => {
  return {
    type: SET_RECENT_VIDEOS,
    videos
  }
}

export const getVideos = () => {
  return async dispatch => {
      dispatch(videosLoading())
      const res = await axios.get('/api/videos/')

      if(res.statusText){
      dispatch(loadVideos(res.data.videos));
    }
    return res;
  }
}

export const getRecentVideos = (offset=0) => {
  return async dispatch => {
    const res = await axios.get(`/api/videos/by_recent?offset=${offset}`)

    if(res.statusText){
      dispatch(loadRecentVideos(res.data.videos))
    }
    return res;
  }
} 

export const getNeedVideos = () => {
  return async dispatch => {
    const res = await axios.get('/api/videos/by_need')

    if(res.statusText){
      dispatch(loadNeedVideos(res.data.videos))
    }
    return res
  }
}

export const addView = (vidId) => {
  return async dispatch => {
    const res = await axios.get(`/api/videos/add_view?id=${vidId}`)
    return res
  }
}


export const postVideo = (title, description, thumbnailFile, category_id, videoFile) => {
  let formData = new FormData()
  // how fast is it uploading larger files?
  // limit file size?
  // s3 bucket, is there a limitation?  Do I need to check settings.  
  // if a file is too big or s3 is getting full, protect myself.
  formData.append("title", title)
  formData.append("description", description)
  formData.append("thumbnail_file", thumbnailFile.raw)
  formData.append("category_id", category_id)
  formData.append("video_file", videoFile.raw)
  let config = { headers: {
    'Content-Type': 'multipart/form-data'
  } }
    return async dispatch => {
      const res = await axios.post('/api/videos/', formData, config)
      if (res.statusText) {
        // let signature = res.data.response
        // let formData2 = new FormData()
        // console.log(signature)
        // formData2.append("file", file.raw)
        // const res2 = await axios.post(signature['url'], formData2, signature['fields'])
        // console.log(res2)
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


export const getFeaturedVideos = () => {
  return async dispatch => {
    const res = await axios.get('/api/videos/search_by_featured')
    if (res.statusText) {
      dispatch(loadFeaturedVideos(res.data.videos))
    }
    return res;
  }
}

export const getPopularVideos = () => {
  return async dispatch => {
    const res = await axios.get('api/videos/search_popular')
    if (res.statusText) {
      dispatch(loadPopularVideos(res.data.videos))
    }
    return res;
  }
}