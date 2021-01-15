import {combineReducers} from 'redux'
import { commentsTimestampReducer } from './comments-timestamp/comments-timestamp.reducer'
import {userReducer} from './user/user-reducer'
import {videoReducer} from './video/video-reducer'
import { popularVideosReducer } from './videos-popular/videos-popular-reducer'
import { recentVideosReducer } from './videos-recent/videos-recent-reducer'
import { supportVideosReducer } from './videos-support/videos-support-reducer'
import { nutritionReducer } from './nutrition/nutrition-reducer'
import { paymentsReducer } from './payments/payments-reducer'



export const rootReducer = combineReducers({
  user: userReducer,
  video: videoReducer,
  videosPopular: popularVideosReducer,
  videosSupport: supportVideosReducer,
  videosRecent: recentVideosReducer, 
  commentsTimestamp: commentsTimestampReducer,
  nutrition: nutritionReducer,
  payments: paymentsReducer
})


export type RootState = ReturnType<typeof rootReducer>
