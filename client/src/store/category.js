const axios = require('axios');

const SET_CATEGORIES = '/categories/all';
const SET_VIDEOS_BY_CATEGORY = '/get_by_category'

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

  export default function categoriesReducer(state={}, action) {
    switch (action.type) {
        case SET_CATEGORIES:
            return {...state, categories: action.categories}
        case SET_VIDEOS_BY_CATEGORY:
            return {...state, videos: action.videos}
        default:
            return state;
    }
}