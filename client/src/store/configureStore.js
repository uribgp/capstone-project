import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import user from './user/user-reducer';
import videos from './video/video-reducer';
import categories from './category/category-reducer';
import comments from './comment/comment-reducer';
import logger from 'redux-logger';


const rootReducer = combineReducers({
  user, videos, categories, comments
});

let storeEnhancer;

if (process.env.NODE_ENV !== 'production') {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const middlewares = [thunk, logger]
  storeEnhancer = composeEnhancers(applyMiddleware(...middlewares));
} else {
  storeEnhancer = applyMiddleware(thunk);
}

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    storeEnhancer
  )
}