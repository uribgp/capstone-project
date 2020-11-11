import React, { useEffect, useRef, setState, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactPlayer from 'react-player';
import { addView, getVideoById } from '../../store/video/video-actions';
import {
  useWindowWidth,
} from '@react-hook/window-size'
import {
  decrementCommentVote,
  getComments,
  incrementCommentVote,
  postComment,
} from '../../store/comment/comment-actions';
import { Link, useParams } from 'react-router-dom';
import IconButton from '../Shared/IconButton/IconButton';
import { AiOutlineComment } from 'react-icons/ai';
import VideoComment from './VideoComment';
import CommentModal from '../Shared/Comment/CommentModal';
import FullscreenModal from '../Shared/FullscreenModal/FullscreenModal';
import LoginContainer from '../Login/Login.container';
import './video-player.style.scss';
import CreateVideoCommentContainer from './CreateVideoComment.container';
import { format } from 'timeago.js';
import LoadingSpinner from '../Shared/LoadingSpinner/LoadingSpinner';
import Input from '../Shared/Input/Input';
import Button from '../Shared/Button/Button';
import { likeComment } from '../../store/comment/comment-actions';
import VideoCommentContainer from './VideoComment.container';
import UserProfile from '../Shared/UserProfile/UserProfile';
import Textarea from '../Shared/Textarea/Textarea';
import GeneralCommentsContainer from './GeneralComments.container';
import ButtonIcon from '../Shared/Button/ButtonIcon';

export default function VideoPlayerContainer() {
  const player = useRef(null);
  const [play, setPlay] = useState(false);
  const [commentsToDisplay, setCommentsToDisplay] = useState([]);
  const [secondsPlayed, setSecondsPlayed] = useState(0);
  const [displayCommentModal, setDisplayCommentModal] = useState(false);
  const [feedbackComment, setFeedbackComment] = useState('');
  const [displayLoginModal, setDisplayLoginModal] = useState(false);
  const [reactPlayerLoading, setReactPlayerLoading] = useState(true);
  const [generalComment, setGeneralComment] = useState('');
  const [viewAdded, setViewAdded] = useState(false);
  const dispatch = useDispatch();
  const { id: videoId } = useParams();
  const firstMount = useRef(true);
  const videoCommentRef = useRef();
  const videoPlayerRef = useRef();
  const {
    video,
    video: {
      link: videoUrl,
      created_at: createdAt,
      total_views: views,
      user,
      description,
      title,
      categories,
      avatar,
      main_lift
    },
    loading: videoLoading,
  } = useSelector((state) => state.video);


  const { id: userId, username, authenticated } = useSelector(
    (state) => state.user
  );
  const { comments, loading: commentsLoading } = useSelector(
    (state) => state.comments
  );

  const width = useWindowWidth()

  // let timestamp = useSelector(state => state.videos.timestamp);

  useEffect(() => {
    dispatch(getVideoById(videoId));
    dispatch(getComments(videoId));
  }, []);

  useEffect(() => {
    if (
      comments.length > 10 &&
      videoCommentRef.current !== null &&
      videoCommentRef.current
    ) {
      const [...children] = videoCommentRef.current.children;
      const x = children;
      const xToArr = [...x];

      const item = [];
      let final;
      for (let i = 0; i < xToArr.length; i++) {
        [...final] = xToArr[i].classList;
        if (final.includes('video-comment-active')) {
          item.push(xToArr[i]);
        }
      }
      if (item.length > 0) {
        let activeItemOffsetTop = item[0].offsetTop;
        videoCommentRef.current.scrollTop = activeItemOffsetTop;
      }
    }
  }, [commentsToDisplay]);

  const displayCommentsWithSameTimestampAsVideo = (videoTimeInSeconds) => {
    const commentsWithSameTimestampAsVideotime = [];
    for (let i = 0; i < comments.length; i++) {
      if (comments[i].timestamp === videoTimeInSeconds) {
        commentsWithSameTimestampAsVideotime.push(comments[i].id);
      }
    }

    setCommentsToDisplay(commentsWithSameTimestampAsVideotime);
  };

  const closeLoginModal = () => {
    setDisplayLoginModal(false)
  }
  

  function handleOnProgress(event) {
    if (secondsPlayed === -1) {
      return;
    }
    const videoTimeRoundedToSeconds = Math.floor(event.playedSeconds);
    console.log(event);

    const videoDuration = videoPlayerRef.current.getDuration();

    const userWatchedMoreThanThirtyPercent =
      videoTimeRoundedToSeconds / videoDuration > 0.3;
    if (userWatchedMoreThanThirtyPercent && !viewAdded) {
      setViewAdded(true);
      dispatch(addView(videoId));
    }

    // Make sure the callback only runs once for each second.
    if (videoTimeRoundedToSeconds === secondsPlayed) {
      return;
    }
    setSecondsPlayed(videoTimeRoundedToSeconds);

    // Check if theres a timestamp at current play time of video.

    for (let i = 0; i < comments.length; i++) {
      if (comments[i].timestamp === videoTimeRoundedToSeconds) {
        setPlay(false);
        return displayCommentsWithSameTimestampAsVideo(
          videoTimeRoundedToSeconds
        );
      }
    }
  }

  const handleOnPlayClick = () => {
    setPlay(true);
    setCommentsToDisplay([]);
  };

  const handleOnEnded = () => {
    setCommentsToDisplay([]);
  };

  const handleOnCreateCommentClick = () => {
    if (authenticated) {
      setDisplayCommentModal(!displayCommentModal);
      setPlay(false);
    } else {
      setDisplayLoginModal(!displayLoginModal);
    }
  };

  const handleOnCommentChange = (event) => {
    setFeedbackComment(event.target.value);
  };

  const handleOnVideoReady = () => {
    setReactPlayerLoading(false);
  };

  const handleOnVideoCommentClick = (comment) => {
    videoPlayerRef.current.player.player.player.currentTime = comment.timestamp;
    setSecondsPlayed(-1);
    setCommentsToDisplay([comment.id]);
  };

  useEffect(() => {
    if (firstMount.current) {
      firstMount.current = false;
    }
  }, []);

  useEffect(() => {
    if(authenticated) {
      setDisplayLoginModal(false)
    }
  }, [authenticated])


  const handleOnCloseCommentModalClick = () => {
    setDisplayCommentModal(false);
  };

  const handleOnGeneralCommentChange = (event) => {
    setGeneralComment(event.target.value);
  };

  const handleOnGeneralCommentSubmit = () => {
    const commentData = {
      title: "Comment",
      text: generalComment,
      user_id: userId,
      video_id: videoId,
    }
    dispatch(postComment(commentData))
  };

  useEffect(() => {
    if(!firstMount.current) {
      generateVideoWidth()
      generateVideoHeight()

    }
  }, [width])

  const generateVideoHeight = () => {
    if(width > 1025 && width < 1980) {
      return 480
    } else {
      return 720
    }
  }

  const generateVideoWidth = () => {
    if(width > 1025 && width < 1980) {
      return 720
    } else {
      return 1270
    }
  }

  return (
    <div className="video-player-page">
      {displayCommentModal && (
        <CreateVideoCommentContainer
          onCommentSubmitClick={handleOnCloseCommentModalClick}
          onCloseClick={handleOnCloseCommentModalClick}
          onCloseClick={handleOnCloseCommentModalClick}
        />
      )}
      {displayLoginModal && (
        <FullscreenModal
        onCloseClick={closeLoginModal}
        onOutsideClick={closeLoginModal}
        >
          <LoginContainer />
        </FullscreenModal>
      )}{' '}
      <div className="video-wrap">
        {' '}
        {!commentsLoading && !videoLoading ? (
          <div>
            <ReactPlayer
              onReady={handleOnVideoReady}
              volume={0}
              width={generateVideoWidth()}
              height={generateVideoHeight()}
              progressInterval={1000}
              onPlay={handleOnPlayClick}
              onEnded={handleOnEnded}
              playing={play}
              muted={true}
              ref={videoPlayerRef}
              url={video.link}
              controls={true}
              loop={false}
              playsinline
              onProgress={(event) => handleOnProgress(event)}
            />
            <div className="video-info">
              <div className="categories">
              {main_lift}
                {categories.map((category) => (
                  <span className="category">{category}</span>
                ))}
              </div>
              <div className="video-info-upper">
                <div className="video-info-title">{title}</div>
                <div>
                  <span className="video-info-views">{views} views</span>
                  <span></span>
                  <span className="video-info-createdAt">
                    {format(createdAt)}
                  </span>
                </div>
              </div>
              <div className="video-info-container">
                <div className="video-info-user-profile">
                  <UserProfile profileImg={avatar} />
                  <div className="video-info-user">{user}</div>
                </div>
                <div className="video-info-description">{description}</div>
              </div>
              {!videoLoading && (
                <ButtonIcon
                  onClick={handleOnCreateCommentClick}
                  icon={<AiOutlineComment />}
                  text="Make comment"
                  buttonType="outline"
                />
              )}
            </div>
            <div style={{margin: "20px 0px", fontSize: 20, fontWeight: 600}}>{comments.length} Comments</div>
           {/*  <div className="video-player-general-comment-wrap">
              <Textarea
                value={generalComment}
                onChange={(e) => setGeneralComment(e.target.value)}
                placeholder="Make a comment"
              />
              <Button text="Post comment" onClick={handleOnGeneralCommentSubmit} />
            </div> */}
            <div className="video-comment-general-list">
              <GeneralCommentsContainer comments={comments} />
            </div>
          </div>
        ) : (
          <LoadingSpinner width={32} />
        )}{' '}
      </div>{' '}
      <div ref={videoCommentRef} className="video-comment-list">
        {' '}
        {!commentsLoading && !videoLoading ? (
          comments.map(
            ({
              text,
              timestamp,
              id,
              comment_user,
              formatted_timestamp,
              likes,
              dislikes,
              comment_avatar,
              user_id,
              coach
            }) => {
              if (timestamp !== null) {
                return (
                  <VideoCommentContainer
                    key={id}
                    id={id}
                    likes={likes}
                    dislikes={dislikes}
                    avatar={comment_avatar}
                    active={commentsToDisplay.includes(id)}
                    comment={text}
                    userId={user_id}
                    timestamp={timestamp}
                    formatted_timestamp={formatted_timestamp}
                    username={comment_user}
                    onClick={(comment) => handleOnVideoCommentClick(comment)}
                    coach={coach}
                  />
                );
              }
            }
          )
        ) : (
          <LoadingSpinner />
        )}{' '}
      </div>{' '}
    </div>
  );
}
