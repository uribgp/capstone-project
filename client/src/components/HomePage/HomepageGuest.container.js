import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getVideos } from '../../store/video/video-actions'
import VideoSection from '../Shared/VideoSection/VideoSection'
import VideoThumbnailContainer from '../Shared/VideoThumbnail/VideoThumbnail.container'
export default function HomepageGuestContainer() {

  const dispatch = useDispatch()
  const {videos, loading} = useSelector(state => state.videos)

  useEffect(() => {
    dispatch(getVideos())
  }, [])

  if(loading) {
    return <div>Loading</div>
  }


  return (
    <div>
  <VideoSection sectionTitle="Recent videos" videos={videos} />
    </div>
  )
}
