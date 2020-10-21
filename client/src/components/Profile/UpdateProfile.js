import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postVideo } from '../../store/video/video-actions';

export default function CreateVideo() {
const dispatch = useDispatch();
const [username, setUsername] = useState(null);
const [email, setEmail] = useState(null);
const [avatar, setAvatar] = useState(null);
const [banner, setBanner] = useState(null);
const [aboutMe, setAboutMe] = useState(null);
const currentUserId = useSelector(state => state.auth.id);

const handleUpdateProfile = () => {
    dispatch(postVideo(title, description, thumbnail, currentUserId, video))
}



const handleAvatarChange = (e) => {
    setAvatar({
        raw: e.target.files[0]
    });
}

const handleBannerChange = (e) => {
    setBanner({
        raw: e.target.files[0]
    });
}

return (
    <>
        <form className='update-form'>
        <input
        required
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
      required
      type="text"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Email"
    />
    <input
    required
    type="text"
    value={aboutMe}
    onChange={(e) => setAboutMe(e.target.value)}
    placeholder="About Me"
  />
        <label>
        File Upload
            <input 
            type="file"
                onChange={handleAvatarChange} />
        </label>
        <label>
        File Upload
            <input 
            type="file"
                onChange={handleBannerChange} />
        </label>
<button onClick={handleUpdateProfile}>Update Profile</button>
</form>
</>
)
}