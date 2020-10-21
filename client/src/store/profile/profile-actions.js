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

  export const updateProfile = (new_username, new_email, description, new_avatar, new_banner) => {
    let formData = new FormData()
    // new_username = request.json.get("username", None)
    // new_email = request.json.get("email", None)
    // new_about_me = request.json.get("about_me", None)
    // new_avatar_file = request.files["avatar"] or None
    // new_banner_file = request.files["banner"] or None.
    formData.append("new_user_name", new_username)
    formData.append("new_email", new_email)
    formData.append("new_about_me", description)
    formData.append("new_avatar", new_avatar.raw)
    formData.append("new_banner", new_banner.raw)

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
