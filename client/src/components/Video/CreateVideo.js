import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postVideo } from '../../store/video/video-actions';

export default function CreateVideo() {
const dispatch = useDispatch();
const [video, setVideo] = useState(null);
const [description, setDescription] = useState(null);
const [title, setTitle] = useState(null);
const [thumbnail, setThumbnail] = useState(null);
const currentUserId = useSelector(state => state.auth.id);

const handlePostVideo = () => {
    dispatch(postVideo(title, description, thumbnail, currentUserId, video))
}



const handleVideoChange = (e) => {
setVideo({
raw: e.target.files[0]
});
}

const handleThumbnailChange = (e) => {
    setThumbnail({
    raw: e.target.files[0]
    });
    }

return (
<>
<form className='video-form'>
<input
required
type="text"
value={title}
onChange={(e) => setTitle(e.target.value)}
placeholder="Video Title"
/>
<input
required
type="text"
value={description}
onChange={(e) => setDescription(e.target.value)}
placeholder="Video Description"
/>
<label>
File Upload
<input 
type="file"
onChange={handleVideoChange} />
</label>
<label>
File Upload
<input 
type="file"
onChange={handleThumbnailChange} />
</label>
<button onClick={handlePostVideo}>Upload Video</button>
</form>
</>
)
}