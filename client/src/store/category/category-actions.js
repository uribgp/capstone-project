const axios = require('axios');

export const SET_CATEGORIES = '/categories/all';
export const SET_VIDEOS_BY_CATEGORY = '/get_by_category'

export const loadCategories = (categories) => { 
    return {
        type: SET_CATEGORIES,
        categories: categories
    }
}

export const loadVideosByCategory = (videos) => {
    return {
      type: SET_VIDEOS_BY_CATEGORY,
      videos: videos
    }
  }

export const getCategories = () => {
    return async dispatch => {
        const res = await axios.get('/api/categories/')
    if(res.statusText){
      dispatch(loadCategories(res.data.categories))
    }
    return res;
  }
}

export const getVideosByCategory = (category) => {
    return async dispatch => {
      const res = await axios.get(`/api/categories/search_by_category?category=${category}`)

      if (res.statusText) {
        dispatch(loadVideosByCategory(res.data.videos))
      }
      return res;
    }
  }
