import { Video } from "../../types/video"

export const FETCH_SUPPORT_VIDEOS_ERROR = "FETCH_SUPPORT_VIDEOS_ERROR"
export const FETCH_SUPPORT_VIDEOS_SUCCESS = "FETCH_SUPPORT_VIDEOS_SUCCESS"
export const FETCH_SUPPORT_VIDEOS_LOADING = "FETCH_SUPPORT_VIDEOS_LOADING"

export interface FetchSupportVideosError {
  type: typeof FETCH_SUPPORT_VIDEOS_ERROR
}
export interface FetchSupportVideosLoading {
  type: typeof FETCH_SUPPORT_VIDEOS_LOADING
}

export interface FetchSupportVideosSuccess {
  type: typeof FETCH_SUPPORT_VIDEOS_SUCCESS
  videos: Video[]
}



export type SupportVideosActionTypes = FetchSupportVideosError | FetchSupportVideosLoading | FetchSupportVideosSuccess