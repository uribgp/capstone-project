import React, { useEffect } from 'react';
import { getVideos, postVideo, getCategories } from '../store/video';
import { useDispatch, useSelector } from 'react-redux';
import Login from '../components/Login'


 export default function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVideos())
    dispatch(getCategories())
  }, [dispatch])

  const handlePostVideo = () => {
    dispatch(postVideo('abc', 'def', 'ghi', 'jkl', user.id))
  }

  const videos = useSelector(state => state.videos.videos)
  const categories = useSelector(state => state.videos.categories)
  const user = useSelector(state => state.auth.user)
  if (!videos || !categories) return null

  return (
    <>
    <button onClick={handlePostVideo}>Create Video</button>
    <h1>{videos.map(video => video.title)}</h1>
    <h3>{categories.map(category => category.title)}</h3>
    </>
  )
}
