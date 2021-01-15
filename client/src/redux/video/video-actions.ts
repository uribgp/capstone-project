import { FETCH_VIDEO_ERROR, FETCH_VIDEO_LOADING, FetchVideoSuccess, FETCH_VIDEO_SUCCESS, FetchVideoError, FetchVideoLoading, VideoActionTypes, AUTOPLAY_VIDEO_ENABLE, AUTOPLAY_VIDEO_DISABLE, PlayVideo, PAUSE_VIDEO, PLAY_VIDEO, PauseVideo } from "./video-types"
import axios from 'axios'
import { Video } from "../../types/video"
import { ThunkAction, ThunkDispatch } from "redux-thunk"


export const fetchVideoSuccess = (video: Video): FetchVideoSuccess => ({
  type: FETCH_VIDEO_SUCCESS,
  video,
})

export const fetchVideoError = (): FetchVideoError => ({
  type: FETCH_VIDEO_ERROR
}) 

export const fetchVideoLoading = (): FetchVideoLoading => ({
  type: FETCH_VIDEO_LOADING
})

export const autoplayVideoEnable = () => ({
  type: AUTOPLAY_VIDEO_ENABLE
})

export const autoplayVideoDisable = () => ({
  type: AUTOPLAY_VIDEO_DISABLE
})

export const playVideo = (): PlayVideo => ({ 
  type: PLAY_VIDEO
})

export const pauseVideo = (): PauseVideo  => ({
  type: PAUSE_VIDEO
})
export const fetchVideoById = (id: string ) => {

  return async (dispatch: ThunkDispatch<any, any, VideoActionTypes> , getState:any ) => {
    dispatch(fetchVideoLoading())
    try {
      const response = await axios.get(`/api/videos/single`, {
        params: {
          id
        }
      })
      console.log(response)
      dispatch(fetchVideoSuccess(response.data.video))
    } catch (error) {
      dispatch(fetchVideoError())
    }
  }
}

