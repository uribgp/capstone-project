import { Reducer } from 'redux'
import { Video } from '../../types/video'
import { CommentsTimestampActionTypes } from '../comments-timestamp/comments-timestamp.types'
import {FETCH_POPULAR_VIDEOS_ERROR, FETCH_POPULAR_VIDEOS_LOADING, FETCH_POPULAR_VIDEOS_SUCCESS, PopularVideosActionTypes} from './videos-popular.types'

interface PopularVideosState {
  popularVideos: Video[],
  loading: boolean;
  error: boolean; 
}

const DEFAULT_STATE: PopularVideosState = {
  popularVideos: [],
  loading: true,
  error: false,
  }
  
  export const popularVideosReducer:Reducer<PopularVideosState, PopularVideosActionTypes> = (state = DEFAULT_STATE, action: PopularVideosActionTypes): PopularVideosState => {
  
      switch (action.type) {
          case FETCH_POPULAR_VIDEOS_LOADING:
          return {
              ...state,
              error: true,
              loading: true,
          }
          case  FETCH_POPULAR_VIDEOS_ERROR: 
          return {
            ...state,
            loading: false,
            error: true, 
          }
          case FETCH_POPULAR_VIDEOS_SUCCESS:
            return {
              ...state,
              loading: false, 
              error: false, 
              popularVideos: [...action.videos]
            }
          
          default:
              return state;
      }
  }