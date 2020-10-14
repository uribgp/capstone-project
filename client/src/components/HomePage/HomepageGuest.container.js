import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getVideos, getPopularVideos, getRecentVideos, getNeedVideos } from '../../store/video/video-actions'
import LoadingSpinner from '../Shared/LoadingSpinner/LoadingSpinner'
import VideoSection from '../Shared/VideoSection/VideoSection'
import VideoThumbnailContainer from '../Shared/VideoThumbnail/VideoThumbnail.container'
export default function HomepageGuestContainer() {

  const dispatch = useDispatch()
  const {videos, loading} = useSelector(state => state.videos)
  // state.videos.popularVideos
  // state.videos.recentVideos
  // state.videos.needVideos

  useEffect(() => {
    dispatch(getVideos())
    dispatch(getPopularVideos())
    dispatch(getRecentVideos())
    dispatch(getNeedVideos())
  }, [])

  if(loading) {
    return <LoadingSpinner />
  }



  return (
    <div>
        <VideoSection sectionTitle="Popular Videos" videos={videos} />
        <VideoSection sectionTitle="Recent videos" videos={videos} />
        <VideoSection sectionTitle="People that need your support" videos={videos} />
    </div>
  )
}
