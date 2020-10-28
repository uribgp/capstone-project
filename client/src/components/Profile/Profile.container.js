import React, { useEffect, useRef, setState, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProfile } from '../../store/profile/profile-actions';
import LoadingSpinner from '../Shared/LoadingSpinner/LoadingSpinner';
import VideoSection from '../Shared/VideoSection/VideoSection';
import ProfileBanner from './ProfileBanner';
import Pitch from './Pitch';
import PaymentMethod from '../Shared/PaymentMethod/PaymentMethod';
import Container from '../Shared/Container/Container';
import Button from '../Shared/Button/Button';
import { createFollow, deleteFollow } from '../../store/profile/profile-actions';

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

  return (
    <div>
      <ProfileBanner
        banner={profile.user.banner}
        avatar={profile.user.avatar}
        username={profile.user.username}
      />
      <Container>
        <div className="banner_user_info">
          <div className="banner_user-avatar">
          </div>
            <div>
              <img src={profile.user.avatar} />

              <div className="banner_user-info">
                <div className="banner_user-info-name">
                  {profile.user.username}

                </div>
              </div>
            </div>
          {setButton()}
        </div>
        <Pitch
          about_me={profile.user.about_me}
          personal_video={profile.user.personal_video}
        />
        {profile.user.coach ? profile.user.coach : null}
        {profile.user.payment_methods ? (
          <div>
            {profile.user.payment_methods.map((payment) => (
              <PaymentMethod
                title={payment.title}
                cost={payment.cost}
                description={payment.description}
                key={payment.id}
                id={payment.id}
                userId={payment.user_id}
                coachId={payment.user_id}
              />
            ))}
          </div>
        ) : null}
        {profile.new_comments ? (
          <VideoSection
            key={'Unseen comments'}
            sectionTitle="Unseen comments"
            videos={profile.new_comments}
          />
        ) : null}
        {profile.no_comments ? (
          <VideoSection
            key={'Not Commented On'}
            sectionTitle="Not Commented on"
            videos={profile.no_comments}
          />
        ) : null}
        {profile.oldComments ? (
          <VideoSection
            key={'Videos with Comments'}
            sectionTitle="Videos with comments"
            videos={profile.oldComments}
          />
        ) : null}
      </Container>
    </div>
  );
}
