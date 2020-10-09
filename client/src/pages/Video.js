import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams} from "react-router";
import { getVideoById } from '../store/video/video-actions';
import VideoPlayer from '../components/VideoPlayer';

export default function Video() {  
    const dispatch = useDispatch();
    const history = useHistory();
    let { id } = useParams();


    useEffect(() => {
        dispatch(getVideoById(id))
      }, [dispatch])
    

    const videos = useSelector(state => state.videos)

    if (!videos) return null
    return (
    <>
    <h1>Video Page</h1>
    <VideoPlayer />
    </>
  )
}
