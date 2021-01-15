import { Video } from "../../types/video"

export const FETCH_RECENT_VIDEOS_ERROR = "FETCH_RECENT_VIDEOS_ERROR"
export const FETCH_RECENT_VIDEOS_SUCCESS = "FETCH_RECENT_VIDEOS_SUCCESS"
export const FETCH_RECENT_VIDEOS_LOADING = "FETCH_RECENT_VIDEOS_LOADING"

export interface FetchRecentVideosError {
  type: typeof FETCH_RECENT_VIDEOS_ERROR
}
export interface FetchRecentVideosLoading {
  type: typeof FETCH_RECENT_VIDEOS_LOADING
}

export interface FetchRecentVideosSuccess {
  type: typeof FETCH_RECENT_VIDEOS_SUCCESS
  videos: Video[]
}



export type RecentVideosActionTypes = FetchRecentVideosError | FetchRecentVideosLoading | FetchRecentVideosSuccess