import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams} from "react-router";
import { getVideoById } from '../store/video/video-actions';
import { getComments } from '../store/comment/comment-actions';
import VideoPlayer from '../components/VideoPlayer';
import NewComment from '../components/Comment/NewComment';
import '../css/video.css';

export default function Video() {  
    const dispatch = useDispatch();
    const history = useHistory();
    let { id } = useParams();


    useEffect(() => {
        dispatch(getVideoById(id))
        dispatch(getComments(id))
      }, [dispatch])


    
    const videos = useSelector(state => state.videos)
    const comments = useSelector(state => state.comments)
    if (!videos || !comments) return null
      console.log(comments)
    return (
    <>
      <h1>Video Page</h1>
      <NewComment />
      <div className='vid-div'>
        <VideoPlayer />
      </div>
    </>

  )
}