import axios, { AxiosPromise, AxiosResponse } from 'axios';
import { ThunkDispatch } from 'redux-thunk';
import { Video } from '../../types/video';
import { RootState } from '../root-reducer';
import {
  FETCH_RECENT_VIDEOS_ERROR,
  FETCH_RECENT_VIDEOS_LOADING,
  FETCH_RECENT_VIDEOS_SUCCESS,
  RecentVideosActionTypes,
  FetchRecentVideosSuccess,
  FetchRecentVideosError,
  FetchRecentVideosLoading
} from './videos-recent-types';

export const fetchRecentVideosLoading = (): FetchRecentVideosLoading => ({
  type: FETCH_RECENT_VIDEOS_LOADING,
});

export const fetchRecentVideosError = (): FetchRecentVideosError => ({
  type: FETCH_RECENT_VIDEOS_ERROR,
});

export const fetchRecentVideosSuccess = (videos: Video[]): FetchRecentVideosSuccess => ({
  type: FETCH_RECENT_VIDEOS_SUCCESS,
  videos,
});

export const fetchRecentVideos = () => {
  return async (
    dispatch: ThunkDispatch<any, any, RecentVideosActionTypes>,
    getState: any
  ) => {
    dispatch(fetchRecentVideosLoading())
    try {
      const response = await axios.get('api/videos/by_recent');
      console.log(response)
      dispatch(fetchRecentVideosSuccess(response.data.videos))
    } catch (error) {
      dispatch(fetchRecentVideosError())
      console.log(error);
    }
  };
};
