import React, { useEffect, useRef, setState, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProfile } from '../../store/profile/profile-actions';
import LoadingSpinner from '../Shared/LoadingSpinner/LoadingSpinner';
import VideoSection from '../Shared/VideoSection/VideoSection';
import ProfileBanner from './ProfileBanner';
import Pitch from './Pitch';

export default function ProfileContainer() {
    const { profile } = useSelector((state) => state.profile);
    const { id } = useParams()
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProfile(id));
      }, []);

      if(!profile) {
        return <LoadingSpinner />
    }

    // {profile.user.followers ? profile.user.followers : null }
    // {profile.user.following ? profile.user.following : null}
    return (
        <div>
            <ProfileBanner banner={profile.user.banner} avatar={profile.user.avatar} username={profile.user.username}   />
            <Pitch about_me={profile.user.about_me} personal_video={profile.user.personal_video}/>
            {profile.user.coach ? profile.user.coach : null}
            {profile.new_comments ? <VideoSection key={"Unseen comments"} sectionTitle="Unseen comments" videos={profile.new_comments} /> : null }
            {profile.no_comments ? <VideoSection key={"Not Commented On"} sectionTitle="Not Commented on" videos={profile.no_comments} /> : null }
            {profile.oldComments ? <VideoSection key={"Videos with Comments"} sectionTitle="Videos with comments" videos={profile.oldComments} /> : null }
        </div>
    )
}
