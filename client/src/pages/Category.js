import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams} from "react-router";
import { getVideosByCategory } from '../store/category/category-actions';

export default function Category() {  
    const dispatch = useDispatch();
    const history = useHistory();
    let { category } = useParams();

    useEffect(() => {
      dispatch(getVideosByCategory(category))
    }, [dispatch])
    
    const videos = useSelector(state => state.categories.videos)
    if (!videos) return null
    console.log(videos)
    return (
    <>
    <h1>Category Page</h1>
    </>
  )
}
