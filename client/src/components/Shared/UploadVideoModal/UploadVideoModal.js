import React, { useState, useEffect } from 'react';
import { postVideo } from '../../../store/videos/videos-actions';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../../store/category/category-actions';


export default function UploadVideoModal() {
    const dispatch = useDispatch();
    const [file, setFile] = useState(null);
    const [categoryChoiceId, setCategoryChoiceId] = useState(null);
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [thumbnailFile, setThumbnailFile] = useState(null);

useEffect(() => {
    dispatch(getCategories())
}, [])

const categories = useSelector(state => state.categories.categories)

const handleVideoChange = (e) => {
    setFile({
        raw: e.target.files[0]
    });
}

const handleThumbnailChange = (e) => {
    setThumbnailFile({
        raw: e.target.files[0]
    });
}

const handleUpload = () => {
    dispatch(postVideo(title, description, thumbnailFile, categoryChoiceId, file))
}

    return (
        <>
            <label>
            Video Upload
                <input 
                    type="file"
                    onChange={handleVideoChange} required/>
            </label>
            <div className='title-box'>
                <textarea placeholder='Name your video' onChange={e => setTitle(e.target.value)} required />
            </div>
            <div className='description-box'>
                <textarea placeholder='Brief Description of your lift' onChange={e => setDescription(e.target.value)} required />
            </div>
            

            <div className="categories">
                <select value={categoryChoiceId} onChange={e => setCategoryChoiceId(e.target.value)}>
                <option value="None">What lift is this?</option>
                {categories && categories.length && categories.map(category => { if(category.main === true){
                    return <option value={category.id}>{category.title}</option>
                }})}
                </select>
            </div>
                
            <label>
            Thumbnail Upload
                <input 
                    type="file"
                    onChange={handleThumbnailChange} required/>
            </label>
        <button onClick={handleUpload}>
            UploadVideo
        </button>
      </>
    )
  }
  