import axios, { AxiosPromise, AxiosResponse } from 'axios';
import { ThunkDispatch } from 'redux-thunk';
import { Video } from '../../types/video';
import { RootState } from '../root-reducer';
import {
  FETCH_POPULAR_VIDEOS_ERROR,
  FETCH_POPULAR_VIDEOS_LOADING,
  FETCH_POPULAR_VIDEOS_SUCCESS,
  PopularVideosActionTypes,
  FetchPopularVideosSuccess,
  FetchPopularVideosError,
  FetchPopularVideosLoading
} from './videos-popular.types';

export const fetchPopularVideosLoading = (): FetchPopularVideosLoading => ({
  type: FETCH_POPULAR_VIDEOS_LOADING,
});

export const fetchPopularVideosError = (): FetchPopularVideosError => ({
  type: FETCH_POPULAR_VIDEOS_ERROR,
});

export const fetchPopularVideosSuccess = (videos: Video[]): FetchPopularVideosSuccess => ({
  type: FETCH_POPULAR_VIDEOS_SUCCESS,
  videos,
});

export const fetchPopularVideos = () => {
  return async (
    dispatch: ThunkDispatch<any, any, PopularVideosActionTypes>,
    getState: any
  ) => {
    dispatch(fetchPopularVideosLoading())
    try {
      const response = await axios.get('api/videos/search_popular');
      console.log(response)
      dispatch(fetchPopularVideosSuccess(response.data.videos))
    } catch (error) {
      dispatch(fetchPopularVideosError())
      console.log(error);
    }
  };
};
