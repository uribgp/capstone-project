import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getVideos, getPopularVideos, getRecentVideos, getNeedVideos } from '../../store/video/video-actions'
import LoadingSpinner from '../Shared/LoadingSpinner/LoadingSpinner'
import VideoSection from '../Shared/VideoSection/VideoSection'
import VideoThumbnailContainer from '../Shared/VideoThumbnail/VideoThumbnail.container'

export default function HomepageGuestContainer() {

  const dispatch = useDispatch()
  const { videos } = useSelector(state => state)
  const [loading, setLoading] = useState(false)
  // state.videos.popularVideos
  // state.videos.recentVideos
  // state.videos.needVideos


  if (!videos){
    setLoading(true)
  }

  useEffect(() => {
    // dispatch(getVideos())
    dispatch(getPopularVideos())
    dispatch(getRecentVideos())
    dispatch(getNeedVideos())
  }, [])

  if(loading) {
    return <LoadingSpinner />
  }



  return (
    <div>
        {videos.popularVideos ? <VideoSection key={"Popular Videos"} sectionTitle="Popular Videos" videos={videos.popularVideos} /> : null}
        {videos.recentVideos ? <VideoSection key={"Recent Videos"} sectionTitle="Recent videos" videos={videos.recentVideos} /> : null}
        {videos.needVideos ? <VideoSection key={"Support these Videos"} sectionTitle="People that need your support" videos={videos.needVideos} /> : null}
    </div>
  )
}
