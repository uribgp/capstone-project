import React, { useEffect, useRef, setState, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProfile } from '../../store/profile/profile-actions';
import LoadingSpinner from '../Shared/LoadingSpinner/LoadingSpinner';
import ProfileBanner from './ProfileBanner';
import PitchModal from './PitchModal';
import Container from '../Shared/Container/Container';
import Button from '../Shared/Button/Button';
import { createFollow, deleteFollow } from '../../store/profile/profile-actions';
import CoachingModal from './CoachingModal';
import MyVideosModal from './MyVideosModal';

export default function ProfileContainer() {
  const { profile } = useSelector((state) => state.profile);
  const { id } = useParams();
  const [showButton, setShowButton] = useState(null);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getProfile(id));
  }, []);

  const handleFollow = () => {
    dispatch(createFollow(id))
}

const handleUnfollow = () =>{
    dispatch(deleteFollow(id))
}

  if (!profile) {
    return <LoadingSpinner />;
  }

const setButton = () => {
  if(profile && profile.followingBool === false ){
    return <Button text='Subscribe' onClick={handleFollow} />
  } else if(profile && profile.followingBool === true){
    return <Button text='Unsubscribe' onClick={handleUnfollow} />
  } else {
    return null
  }
}

// <ProfileBanner
//   banner={profile.user.banner}
//   avatar={profile.user.avatar}
//   username={profile.user.username}
// />
  return (
    <div>
      <Container>
        <div className="banner_user_info">
          <div className="banner_user-avatar">
          </div>
            <div>
              <img src={profile.user.avatar} />

              <div className="banner_user-info">
                <div className="banner_user-info-name">
                  {profile.user.username}
                  {profile.user.coach ? profile.user.coach : null}
                </div>
              </div>
            </div>
          {setButton()}
        </div>
          <PitchModal props={profile.user}/>
          <MyVideosModal props={profile} />
          <CoachingModal props={profile}/>
      </Container>
    </div>
  );
}
