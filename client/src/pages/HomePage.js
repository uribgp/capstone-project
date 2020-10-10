import React, { useEffect, useState } from 'react';
import { getVideos, postVideo, getFeaturedVideos } from '../store/video/video-actions';
import { getCategories, getVideosByCategory } from '../store/category/category-actions';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import '../css/homepage.css';
import Featured from '../components/HomePage/Featured';
// import Login from '../components/Login'


 export default function HomePage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [file, setFile] = useState(null);
  const currentUserId = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(getVideos())
    dispatch(getCategories())
    dispatch(getFeaturedVideos())
  }, [dispatch])

  function searchCategory(e) {
    e.preventDefault()
    let category = e.target.innerHTML.trim()
    dispatch(getVideosByCategory(category))
    history.push(`/category/${category}`)
  }

  const handlePostVideo = () => {
    dispatch(postVideo('abc', 'def', 'ghi', 'jkl', 555, 1, file))
  }

  const featuredVideos = useSelector(state => state.videos.featuredVideos)
  const category_list = useSelector(state => state.categories.categories)
  const user = useSelector(state => state.auth)
  const catList = useSelector(state => state.videos.videos)
  const catList2 = useSelector(state => state.videos.videos)

  const handleFileChange = (e) => {
    setFile({
      preview: URL.createObjectURL(e.target.files[0]),
      raw: e.target.files[0]
    });
  }

  function searchID(e) {
    e.preventDefault()
    let id = e.target.id.trim()
    history.push(`/video/${id}`)
  }

  if (!featuredVideos || !category_list) return null

  return (
    <>
      <div className='homeBody'>
        <div className='bodyBox'>
          <div className='subbarWrapper'>
            <div className='subbar__categories'>
            <label>
            Single Upload
            <input 
            type="file"
            // accept=".png,.jpg,.jpeg,.gif" Will need to decide what file types can be uploaded
            onChange={handleFileChange} />
            </label>
            <button onClick={handlePostVideo}>Create Video</button>
              {category_list.map((category,index)=>{
                  let link = `/category/${category.title}`
                  return (
                    <div  key={index}>
                      <a href={link} key={index} onClick={searchCategory} className='subbar__categoriesList'> {category.title}</a>
                    </div>
                  )
                })
              }
            </div>
          </div>

              <Featured videos={featuredVideos} />

          <div id='listLabel'>Squats</div>
            <div className='body'>
            {catList.map((projectBody,index)=>{
              let percentage2 = Math.floor(projectBody.total_funding / projectBody.funding_goal * 100)
              if (percentage2 > 100) {
                percentage2 = 100;
              }
            
              const progStyle2 = { width: `${percentage2}%` };
              return (
                  <div key={index} className='body__list'>
                        <img className='body__img' id={projectBody.id} onClick={searchID} src={projectBody.thumbnail} alt='Featured Project'></img>
                        <div id='projectpage-detail-progress'>
                        <div id='progress-container'>
                          </div>
                        </div>
                        <p id='bodyTitle'>
                        {projectBody.title}
                        </p>
                        <p id='bodyDes'>
                          {projectBody.description}
                        </p>
                        <p id='bodyBy'>By {projectBody.organization}</p>
                    </div>
                  )
                })
              }
            </div>
            <div id='listLabel'>Bench</div>
            <div className='body'>
              {catList2.map((projectBody2,index)=>{
                let percentage2 = Math.floor(projectBody2.total_funding / projectBody2.funding_goal * 100)
                if (percentage2 > 100) {
                  percentage2 = 100;
                }
              
                const progStyle2 = { width: `${percentage2}%` };
                return (
                  <div key={index} className='body__list'>
                        <img className='body__img' id={projectBody2.id} onClick={searchID} src={projectBody2.thumbnail} alt='Featured Project'></img>
                        <div id='projectpage-detail-progress'>
                        <div id='progress-container'>
                          <div id='progress-container-fill'  style={progStyle2} />
                          </div>
                        </div>
                        <p id='bodyTitle'>
                        {projectBody2.title}
                        </p>
                        <p id='bodyDes'>
                          {projectBody2.description}
                        </p>
                        <p id='bodyBy'>By {projectBody2.organization}</p>
                    </div>
                  )
                })
              }
            </div>
          </div>
      </div>
    </>
  )
}
