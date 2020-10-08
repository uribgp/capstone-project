import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function Video() {  
    const dispatch = useDispatch();
    const history = useHistory();
    
    const videos = useSelector(state => state.videos)
    if (!videos) return null
    console.log(videos)
    return (
    <>
    <h1>Video Page</h1>
    </>
  )
}