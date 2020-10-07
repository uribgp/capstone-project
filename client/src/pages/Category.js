import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function HomePage() {  
    const dispatch = useDispatch();
    const history = useHistory();
    
    const videos = useSelector(state => state.categories.videos)
    if (!videos) return null
    return (
    <>
    <h1>Category Page</h1>
    </>
  )
}