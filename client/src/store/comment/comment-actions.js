const axios = require('axios');

export const SET_COMMENT = '/comments/add_comment';
export const SET_COMMENTS = '/comments/all';
export const ADD_COMMENT = 'ADD_COMMENT';
export const LOADING_COMMENT = 'LOADING_COMMENT';
export const INCREMENT_COMMENT_VOTE = "INCREMENT_COMMENT_VOTE"
export const DECREMENT_COMMENT_VOTE = "DECREMENT_COMMENT_VOTE"
export const COMMENT_VOTE_ERROR = "COMMENT_VOTE_ERROR"
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

export const addComment = (comment) => {
  return {
    type: ADD_COMMENT,
    comment
  }
}

export const commentLoading = () =>  {
  return {
    type: LOADING_COMMENT,
  }
}


export const incrementCommentVote = (commentId) => {
  return {
    type: INCREMENT_COMMENT_VOTE,
    commentId
  }
}

export const decrementCommentVote = (commentId) => {
  return {
    type: DECREMENT_COMMENT_VOTE,
    commentId
  }
}

export const commentVoteError = () => {
  return {
    type: COMMENT_VOTE_ERROR
  }
}

export const getComments = (id) => {
  return async dispatch => {
    dispatch(commentLoading())
    const res = await axios.get(`/api/comments?id=${id}`)
    if (res.statusText) {
      dispatch(loadComments(res.data.comments));
    }
    return res;
  }
}

export const postComment = (comment) => {

  return async dispatch => {
    const res = await axios.post(`/api/comments`, comment)
    if (res.statusText) {
      dispatch(addComment(res.data.comment));
      // connect to socket here, emit a new message
      // maybe close connection (fine tuning)
    }
    return res;
  }
}

export const likeComment = (comment_id, like_comment, dislike_comment) => {
  return async dispatch => {
    try {
      const res = await axios.post(`/api/comments/likes?comment_id=${comment_id}`,{like_comment, dislike_comment})    
    } catch (error) {
      dispatch(commentVoteError(comment_id))
    }
  
  }
}