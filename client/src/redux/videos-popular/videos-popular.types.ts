import { Video } from "../../types/video"

export const FETCH_POPULAR_VIDEOS_ERROR = "FETCH_POPULAR_VIDEOS_ERROR"
export const FETCH_POPULAR_VIDEOS_SUCCESS = "FETCH_POPULAR_VIDEOS_SUCCESS"
export const FETCH_POPULAR_VIDEOS_LOADING = "FETCH_POPULAR_VIDEOS_LOADING"

export interface FetchPopularVideosError {
  type: typeof FETCH_POPULAR_VIDEOS_ERROR
}
export interface FetchPopularVideosLoading {
  type: typeof FETCH_POPULAR_VIDEOS_LOADING
}

export interface FetchPopularVideosSuccess {
  type: typeof FETCH_POPULAR_VIDEOS_SUCCESS
  videos: Video[]
}



export type PopularVideosActionTypes = FetchPopularVideosError | FetchPopularVideosLoading | FetchPopularVideosSuccess