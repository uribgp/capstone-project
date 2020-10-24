import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// put follow action here
import { createFollow } from '../../store/video/profile-actions';

export default function FollowButton() {
const dispatch = useDispatch();
const { id: followId } = useParams();

const handleFollow = () => {
    dispatch(createFollow(followId))
}

return (
    <>
        <form className='follow-form'>
            <button onClick={handleFollow}>Follow</button>
        </form>
    </>
    )
}