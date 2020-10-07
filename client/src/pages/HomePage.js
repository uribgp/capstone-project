import React, { useEffect, useState } from 'react';
import { getVideos, postVideo } from '../store/video';
import { getCategories, getVideosByCategory } from '../store/category';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
// import Login from '../components/Login'


 export default function HomePage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [file, setFile] = useState(null);
  const currentUserId = useSelector(state => state.auth.id);

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
    console.log(file)
    // let formData = new FormData()
    // formData.append("user_id", currentUserId)
    // formData.append()
    dispatch(postVideo('abc', 'def', 'ghi', 'jkl', user.id, 1, file))
  }

  const videos = useSelector(state => state.videos.videos)
  const categories = useSelector(state => state.categories.categories)
  const user = useSelector(state => state.auth)

  const handleFileChange = (e) => {
    setFile({
      preview: URL.createObjectURL(e.target.files[0]),
      raw: e.target.files[0]
    });
  }

  if (!videos || !categories) return null

  return (
    <>
    <h1>{videos.map(video => video.title)}</h1>
    <h3>{categories.map(category => <a href={`category/${category.title}`} key={category.id} id='category-link' onClick={searchCategory}> {category.title} </a>)}</h3>
    <label>
    Single Upload
    <input 
    type="file"
    // accept=".png,.jpg,.jpeg,.gif" Will need to decide what file types can be uploaded
    onChange={handleFileChange} />
    </label>
    <button onClick={handlePostVideo}>Create Video</button>
    </>
  )
}
