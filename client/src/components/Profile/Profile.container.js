import React, { useEffect, useRef, setState, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProfile } from '../../store/profile/profile-actions';
import LoadingSpinner from '../Shared/LoadingSpinner/LoadingSpinner';
import ProfileBanner from './ProfileBanner';
import PitchModal from './PitchModal';
import Container from '../Shared/Container/Container';
import Button from '../Shared/Button/Button';
import './ProfileContainer.scss';
import {
  createFollow,
  deleteFollow,
} from '../../store/profile/profile-actions';
import CoachingModal from './CoachingModal';
import MyVideosModal from './MyVideosModal';
import HorizontalMenuSelector from '../Shared/HorizontalMenuSelector/HorizontalMenuSelector';
import UserProfile from '../Shared/UserProfile/UserProfile';
import {FaCheckCircle} from 'react-icons/fa';
import { logOut } from '../../store/user/user-actions';

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

  const logout = () => {
    dispatch(logOut())
  }
  
  if (!profile) {
    return <LoadingSpinner />;
  }
  
  const setButton = () => {
    if (profile && profile.followingBool === false) {
      return <Button buttonType='secondary' text="Subscribe" onClick={handleFollow} />;
    } else if (profile && profile.followingBool === true) {
      return <Button buttonType='secondary' text="Unsubscribe" onClick={handleUnfollow} />;
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
    <button onClick={logout}></button>
    
      <div className="banner_user-info">
        <Container>
          <div className="banner_user-info-name">
          <div className="profile-flex">
          <div className="username-pr">
                {profile.user.username}
            </div>
              <div>
              <UserProfile profileImg={profile.user.avatar} />
            </div>
          </div>
          </div>
          {profile.user.coach ? (<div className={'coach'}><h4>Certified Coach</h4><FaCheckCircle  size={20} style={{ color: "blue"}}/></div>) : null}
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
