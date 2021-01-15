import axios, { AxiosPromise, AxiosResponse } from 'axios';
import { ThunkDispatch } from 'redux-thunk';
import { Video } from '../../types/video';
import { RootState } from '../root-reducer';
import { supportVideosReducer } from './videos-support-reducer';
import {
  FETCH_SUPPORT_VIDEOS_ERROR,
  FETCH_SUPPORT_VIDEOS_LOADING,
  FETCH_SUPPORT_VIDEOS_SUCCESS,
  SupportVideosActionTypes,
  FetchSupportVideosSuccess,
  FetchSupportVideosError,
  FetchSupportVideosLoading
} from './videos-support.types';

export const fetchSupportVideosLoading = (): FetchSupportVideosLoading => ({
  type: FETCH_SUPPORT_VIDEOS_LOADING,
});

export const fetchSupportVideosError = (): FetchSupportVideosError  => ({
  type: FETCH_SUPPORT_VIDEOS_ERROR,
});

export const fetchSupportVideosSuccess = (videos: Video[]): FetchSupportVideosSuccess  => ({
  type: FETCH_SUPPORT_VIDEOS_SUCCESS,
  videos,
});



export const fetchNeedsSupportVideos = () => {
  return async (
    dispatch: ThunkDispatch<any, any, SupportVideosActionTypes>,
    getState: any
  ) => {
    dispatch(fetchSupportVideosLoading())
    try {
      const response = await axios.get('/api/videos/by_need')
      dispatch(fetchSupportVideosSuccess(response.data.videos))
    } catch (error) {
      dispatch(fetchSupportVideosError())
    }
  };
};

