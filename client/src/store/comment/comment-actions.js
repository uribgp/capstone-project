const axios = require('axios');

export const SET_COMMENT = '/comments/add_comment'
export const SET_COMMENTS = '/comments/all'

export const setComment = (comment) => {
  return {
    type: SET_COMMENT,
    comment
  }
}

export const loadComments = (comments) => {
  return {
    type: SET_COMMENTS,
    comments
  }
}

export const getComments = (id) => {
  return async dispatch => {
    const res = await axios.get(`/api/comments?id=${id}`)
    if (res.statusText) {
      dispatch(loadComments(res.data.comments));
    }
    return res;
  }
}

export const postComment = (videoId, comment) => {
  return async dispatch => {
    const res = await axios.post(`/api/comments?id=${videoId}`, {
      comment
    })
    if (res.statusText) {
      dispatch(setComment(res.data.comment));
    }
    return res;
  }
}