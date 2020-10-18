import axios from 'axios'

export const SET_PROFILE = '/profile/my';
export const SET_USER_PROFILE = '/profile/user';

export const loadProfile = (profile) => { 
    return {
        type: SET_PROFILE,
        profile
    }
}

export const loadUserProfile = (profile) => {
  return {
    type: SET_USER_PROFILE,
    profile
  }
}

export const getProfile = () => {
    return async dispatch => {
      const res = await axios.get('/api/profile')
  
      if(res.statusText){
        dispatch(loadProfile(res.data.profile))
      }
      return res;
    }
  } 
  
  export const getUserProfile = (id) => {
    return async dispatch => {
      const res = await axios.get(`/api/profile/user?id=${id}`)
  
      if(res.statusText){
        dispatch(loadUserProfile(res.data.profile))
      }
      return res
    }
  }