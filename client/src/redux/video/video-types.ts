import { Action } from "redux"

export const FETCH_VIDEO_LOADING = 'FETCH_VIDEO_LOADING'
export const FETCH_VIDEO_ERROR = "FETCH_VIDEO_ERROR"
export const FETCH_VIDEO_SUCCESS = "FETCH_VIDEO_SUCCESS"
export const AUTOPLAY_VIDEO_DISABLE = "AUTOPLAY_VIDEO_DISABLE"
export const AUTOPLAY_VIDEO_ENABLE = "AUTOPLAY_VIDEO_ENABLE"
export const PLAY_VIDEO = "PLAY_VIDEO"
export const PAUSE_VIDEO = "PAUSE_VIDEO"


export interface PlayVideo {
  type: typeof PLAY_VIDEO
}

export interface PauseVideo {
  type: typeof PAUSE_VIDEO
}
export interface FetchVideoLoading {
type: typeof FETCH_VIDEO_LOADING,
}

export interface FetchVideoError {
type: typeof FETCH_VIDEO_ERROR
}

export interface FetchVideoSuccess {
type: typeof FETCH_VIDEO_SUCCESS,
video: any
}

export interface AutoplayVideoDisable {
  type: typeof AUTOPLAY_VIDEO_DISABLE,
  
}

export interface AutoplayVideoEnable {
  type: typeof AUTOPLAY_VIDEO_ENABLE
}


export type VideoActionTypes = FetchVideoLoading | FetchVideoError | FetchVideoSuccess | AutoplayVideoDisable | AutoplayVideoEnable | PlayVideo | PauseVideo