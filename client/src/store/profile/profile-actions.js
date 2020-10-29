import axios from 'axios';

export const SET_PROFILE = '/profile/my';
export const SET_USER_PROFILE = '/profile/user';
export const SET_FOLLOWS = '/profile/follows';
export const ADD_FOLLOW = '/profile/follow';

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

export const loadFollows = (follows) => {
  return {
    type: SET_FOLLOWS,
    follows
  }
}

export const setFollow = (follow) => {
  return {
    type: ADD_FOLLOW,
    follow
  }
}

export const getProfile = (id) => {
    return async dispatch => {
      const res = await axios.get(`/api/profile?id=${id}`)

      if(res.statusText){
        dispatch(loadProfile(res.data.profile))
      }
      return res;
    }
  } 

  export const updateProfile = (new_username, new_email, description, new_avatar, new_banner, new_personal_video) => {
    let formData = new FormData()
    // new_username = request.json.get("username", None)
    // new_email = request.json.get("email", None)
    // new_about_me = request.json.get("about_me", None)
    // new_avatar_file = request.files["avatar"] or None
    // new_banner_file = request.files["banner"] or None.
    formData.append("new_user_name", 'demo')
    formData.append("new_email", 'demo')
    formData.append("new_about_me", description)
    formData.append("new_avatar", new_avatar.raw)
    formData.append("new_banner", new_banner.raw)
    formData.append("new_personal_video", new_personal_video.raw)

    let config = { headers: {
      'Content-Type': 'multipart/form-data'
    } }
      return async dispatch => {
        const res = await axios.patch('/api/profile/', formData, config)
        if (res.statusText) {
          // let signature = res.data.response
          // let formData2 = new FormData()
          // console.log(signature)
          // formData2.append("file", file.raw)
          // const res2 = await axios.post(signature['url'], formData2, signature['fields'])
          // console.log(res2)
          // dispatch(loadProfile(res.data.user));
        }
        return res;
      }
    }

  export const createFollow = (followId) => {
    console.log(followId)
    return async dispatch => {
      const res = await axios.post(`/api/followers/follow?follow=${followId}`)
      if (res.statusText) {
        dispatch(loadFollows(res.data.follows))
      }
      return res;
    }
  }

  export const getFollows = (followId) => {
    return async dispatch => {
      const res = await axios.get(`/api/followers/follow?follow=${followId}`)
      if (res.statusText) {
        dispatch(loadFollows(res.data.follows))
      }
      return res;
    }
  }

  export const deleteFollow = (followId) => {
    return async dispatch => {
      const res = await axios.delete(`/api/followers/follow?unfollow=${followId}`)
      dispatch(loadFollows(res.data.follows))
      return res;
    }
  }
