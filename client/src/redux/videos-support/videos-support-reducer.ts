import { Reducer } from 'redux'
import { Video } from '../../types/video'
import {FETCH_SUPPORT_VIDEOS_ERROR, FETCH_SUPPORT_VIDEOS_LOADING, FETCH_SUPPORT_VIDEOS_SUCCESS, SupportVideosActionTypes} from './videos-support.types'

interface SupportVideos {
  videosSupport: Video[],
  loading: boolean;
  error: boolean; 
}

const DEFAULT_STATE: SupportVideos = {
  videosSupport: [],
  loading: true,
  error: false,
  }
  
  export const supportVideosReducer:Reducer<SupportVideos, SupportVideosActionTypes> = (state = DEFAULT_STATE, action): SupportVideos => {
  
      switch (action.type) {
          case FETCH_SUPPORT_VIDEOS_LOADING:
          return {
              ...state,
              error: true,
              loading: true,
          }
          case  FETCH_SUPPORT_VIDEOS_ERROR: 
          return {
            ...state,
            loading: false,
            error: true, 
          }
          case FETCH_SUPPORT_VIDEOS_SUCCESS:
            return {
              ...state,
              loading: false, 
              error: false, 
              videosSupport: [...action.videos],
            }
          
          default:
              return state;
      }
  }