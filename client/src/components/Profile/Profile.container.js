import React, { useEffect, useRef, setState, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../../store/profile/profile-actions';
import LoadingSpinner from '../Shared/LoadingSpinner/LoadingSpinner';
import VideoSection from '../Shared/VideoSection/VideoSection';

export default function ProfileContainer() {
    const { profile } = useSelector((state) => state.profile);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProfile());
      }, []);
      console.log(profile)
    
      if(!profile) {
        return <LoadingSpinner />
    }

    return (
        <div>
            {profile.new_comments.length ? <VideoSection key={"Unseen comments"} sectionTitle="Unseen comments" videos={profile.new_comments} /> : null }
            {profile.no_comments.length ? <VideoSection key={"Not Commented On"} sectionTitle="Not Commented on" videos={profile.no_comments} /> : null }
            {profile.oldComments.length ? <VideoSection key={"Videos with Comments"} sectionTitle="Videos with comments" videos={profile.oldComments} /> : null }
        </div>
    )
}