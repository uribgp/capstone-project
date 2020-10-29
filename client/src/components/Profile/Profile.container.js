import React, { useEffect, useRef, setState, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProfile } from '../../store/profile/profile-actions';
import LoadingSpinner from '../Shared/LoadingSpinner/LoadingSpinner';
import ProfileBanner from './ProfileBanner';
import PitchModal from './PitchModal';
import Container from '../Shared/Container/Container';
import Button from '../Shared/Button/Button';

import {
  createFollow,
  deleteFollow,
} from '../../store/profile/profile-actions';
import CoachingModal from './CoachingModal';
import MyVideosModal from './MyVideosModal';
import HorizontalMenuSelector from '../Shared/HorizontalMenuSelector/HorizontalMenuSelector';
import UserProfile from '../Shared/UserProfile/UserProfile';

export default function ProfileContainer() {
  const { profile } = useSelector((state) => state.profile);
  const { id } = useParams();
  const [showButton, setShowButton] = useState(null);
  const [activeMenuItem, setActiveMenuItem] = useState('Profile');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile(id));
  }, [id]);

  const handleFollow = () => {
    dispatch(createFollow(id));
  };

  const handleUnfollow = () => {
    dispatch(deleteFollow(id));
  };

  if (!profile) {
    return <LoadingSpinner />;
  }

  const setButton = () => {
    if (profile && profile.followingBool === false) {
      return <Button text="Subscribe" onClick={handleFollow} />;
    } else if (profile && profile.followingBool === true) {
      return <Button text="Unsubscribe" onClick={handleUnfollow} />;
    } else {
      return null;
    }
  };

  const handleActiveMenuChange = (e) => {
    setActiveMenuItem(e.target.value);
  };

  return (
    <div className="profile-page">
      <ProfileBanner banner={profile.user.banner} />

      <div className="banner_user-info">
        <Container>
          <div className="banner_user-info-name">
            <div className="profile-flex">
                <div className="username-pr">
                {profile.user.username}
            </div>
              <div>
              <UserProfile profileImg={profile.user.avatar} />
              {profile.user.coach ? profile.user.coach : null}
            </div>
          </div>
          </div>
          {setButton()}
        </Container>
      </div>
      <Container>
        <HorizontalMenuSelector
          active={activeMenuItem}
          onChange={(e) => handleActiveMenuChange(e)}
          menuItems={['Profile', 'Coaching', 'Videos']}
        />

        {(activeMenuItem === 'Coaching' || activeMenuItem === '') && (
          <CoachingModal props={profile} />
        )}
        {(activeMenuItem === 'Videos' || activeMenuItem === '') && (
          <MyVideosModal props={profile} />
        )}

        {(activeMenuItem === 'Profile' || activeMenuItem === '') && (
<PitchModal props={profile.user} />
        
        )}
      </Container>
    </div>
  );
}
