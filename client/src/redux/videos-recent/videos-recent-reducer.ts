import { Reducer } from 'redux'
import { Video } from '../../types/video'
import {FETCH_RECENT_VIDEOS_ERROR, FETCH_RECENT_VIDEOS_LOADING, FETCH_RECENT_VIDEOS_SUCCESS, RecentVideosActionTypes} from './videos-recent-types'

interface RecentVideosState {
  videosRecent: Video[],
  loading: boolean;
  error: boolean; 
}

const DEFAULT_STATE: RecentVideosState = {
  videosRecent: [],
  loading: true,
  error: false,
  }
  
  export const recentVideosReducer:Reducer<RecentVideosState, RecentVideosActionTypes> = (state = DEFAULT_STATE, action): RecentVideosState => {
  
      switch (action.type) {
          case FETCH_RECENT_VIDEOS_LOADING:
          return {
              ...state,
              error: true,
              loading: true,
          }
          case  FETCH_RECENT_VIDEOS_ERROR: 
          return {
            ...state,
            loading: false,
            error: true, 
          }
          case FETCH_RECENT_VIDEOS_SUCCESS:
            console.log(action)
            return {
              ...state,
              loading: false, 
              error: false, 
              videosRecent: [...action.videos]
            }
          
          default:
              return state;
      }
  }