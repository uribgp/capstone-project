import { SET_CATEGORIES, SET_VIDEOS_BY_CATEGORY } from './category-actions';

export default function categoriesReducer(state={}, action) {
    switch (action.type) {
        case SET_CATEGORIES:
            return {...state, categories: action.categories}
        case SET_VIDEOS_BY_CATEGORY:
            return {...state, videos: action.videos}
        default:
            return state;
    }
}