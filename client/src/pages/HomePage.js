import React, { useEffect } from 'react';
import { getVideos, postVideo } from '../store/video';
import { getCategories, getVideosByCategory } from '../store/category';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
// import Login from '../components/Login'


 export default function HomePage() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getVideos())
    dispatch(getCategories())
  }, [dispatch])

  function searchCategory(e) {
    e.preventDefault()
    let category = e.target.innerHTML.trim()
    dispatch(getVideosByCategory(category))
    history.push(`/category/${category}`)
  }

  const handlePostVideo = () => {
    dispatch(postVideo('abc', 'def', 'ghi', 'jkl', user.id, 1))
  }

  const videos = useSelector(state => state.videos.videos)
  const categories = useSelector(state => state.categories.categories)
  const user = useSelector(state => state.auth)
  if (!videos || !categories) return null

  return (
    <>
    <button onClick={handlePostVideo}>Create Video</button>
    <h1>{videos.map(video => video.title)}</h1>
    <h3>{categories.map(category => <a href={`category/${category.title}`} key={category.id} id='category-link' onClick={searchCategory}> {category.title} </a>)}</h3>
    </>
  )
}
