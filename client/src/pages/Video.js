import React, { useEffect, useState } from 'react';
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
    const [timestamp, setTimestamp] = useState(0);
    const [focus, setFocus] = useState(0);
    
    useEffect(() => {
        dispatch(getVideoById(id))
        dispatch(getComments(id))
      }, [dispatch])
      // send array of timestamps to the videoplayer.  
      //if it hits that timestamp, send a message back up, 
      //saying it's time to show a comment.  Pause the video and have it show the comment.
    
    const video = useSelector(state => state.videos.video)
    const comments = useSelector(state => state.comments.comments)

    if (!video || !comments) return null

    return (
    <>
      <h1>Video Page</h1>
      <div className='comments-div'>
      <NewComment timestamp={timestamp}/>
        {comments.length > 0 ? comments.map((comment) => <Comment comment={comment} focus={focus} />) : null}
      </div>
      <div className='vid-div'>
      <VideoPlayer video={video} setTimestamp={setTimestamp} comments={comments} setFocus={setFocus}/>
      </div>
    </>

  )
}