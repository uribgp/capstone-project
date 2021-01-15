import React, { ReactElement, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/root-reducer'
import { AUTOPLAY_VIDEO_ENABLE } from '../../../redux/video/video-types'
import { Video } from '../../../types/video'
import VideoInformation from './VideoInformation'
import {autoplayVideoEnable, autoplayVideoDisable} from '../../../redux/video/video-actions'
interface Props {
  
}

export default function VideoInformationContainer({}: Props): ReactElement {
  
  const {loading, error, autoplay, video: {user, avatar, created_at, title, total_views, description}} = useSelector((state: RootState) => state.video)
  const {id} = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()

  const handleOnToggleAutoplayChange = (event: React.ChangeEvent<HTMLInputElement>) => {

  return event.currentTarget.checked ?  
  dispatch(autoplayVideoEnable())
  :
  dispatch(autoplayVideoDisable())
  }


  return (
    <VideoInformation 
    autoplay={autoplay}
    onToggleAutoplayChange={event => handleOnToggleAutoplayChange(event)}
    user={user}
    title={title}
    views={total_views}
    description={description}
    avatar={avatar}
    createdAt={created_at}
    />
  )
}
