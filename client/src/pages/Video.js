import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams} from "react-router";
import { getVideoById } from '../store/video/video-actions';
import { getComments } from '../store/comment/comment-actions';
import VideoPlayer from '../components/VideoPlayer';
import NewComment from '../components/Comment/NewComment';
import Comment from '../components/Comment/Comment';
import '../css/video.css';

export default function Video() {  
    const dispatch = useDispatch();
    const history = useHistory();
    let { id } = useParams();


    useEffect(() => {
        dispatch(getVideoById(id))
        dispatch(getComments(id))
      }, [dispatch])


    
    const video = useSelector(state => state.videos.video)
    const comments = useSelector(state => state.comments.comments)
    if (!video || !comments) return null

    return (
    <>
      <h1>Video Page</h1>
      <div className='comments-div'>
      <NewComment />
        {comments.length > 0 ? comments.map((comment) => <Comment comment={comment} />) : null}
      </div>
      <div className='vid-div'>
      <VideoPlayer video={video}/>
      </div>
    </>

  )
}