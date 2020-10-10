import React from 'react';
import '../../css/homepage.css';
import { useHistory } from 'react-router-dom';

export default function VideoCardMedium(props) {
    const history = useHistory();
    let video = props.video

    function searchID(e) {
        e.preventDefault()
        let id = e.target.id.trim()
        history.push(`/video/${id}`)
      }

    return (
        <div key={video.id} className='body__list'>
            <img className='body__img' id={video.id} onClick={searchID} src={video.thumbnail} alt='Featured Project'></img>
            <p id='bodyTitle'>
            {video.title}
            </p>
            <p id='bodyDes'>
                {video.description}
            </p>
            <p id='bodyBy'>By {video.username}</p>
        </div>
    )
};
