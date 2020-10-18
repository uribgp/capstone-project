import React, { useEffect, useRef, setState, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactPlayer from 'react-player';
import { getVideoById } from '../../store/video/video-actions';
import { getComments, postComment } from '../../store/comment/comment-actions';
import { useParams } from 'react-router-dom';
import IconButton from '../Shared/IconButton/IconButton';
import { AiOutlineComment } from 'react-icons/ai';
import VideoComment from './VideoComment';
import CommentModal from '../Shared/Comment/CommentModal';
import FullscreenModal from '../Shared/FullscreenModal/FullscreenModal';
import LoginContainer from '../Login/Login.container';
import './video-player.style.scss';
import CreateVideoCommentContainer from './CreateVideoComment.container';
export default function VideoPlayerContainer() {
  const player = useRef(null);
  const [play, setPlay] = useState(true);
  const [commentsToDisplay, setCommentsToDisplay] = useState([]);
  const [secondsPlayed, setSecondsPlayed] = useState(0);
  const [displayCommentModal, setDisplayCommentModal] = useState(false);
  const [feedbackComment, setFeedbackComment] = useState('');
  const [displayLoginModal, setDisplayLoginModal] = useState(false);

  const dispatch = useDispatch();
  const { id: videoId } = useParams();
  const firstMount = useRef(true);
  const videoCommentRef = useRef();
  const videoPlayerRef = useRef();
  const { video } = useSelector((state) => state.videos);
  const { id: userId, username, authenticated } = useSelector(
    (state) => state.user
  );
  const comments = useSelector((state) => state.comments.comments);
  // let timestamp = useSelector(state => state.videos.timestamp);

  useEffect(() => {
    dispatch(getVideoById(videoId));
    dispatch(getComments(videoId));
  }, []);

  useEffect(() => {
    if (videoCommentRef.current !== null && videoCommentRef.current) {
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

  function grabTimestamp() {
    let currentTime =
      player && player.current && player.current.getCurrentTime();
    if (currentTime) {
      /*       setTimestamp(currentTime) */
    }
  }

  const displayCommentsWithSameTimestampAsVideo = (videoTimeInSeconds) => {
    const commentsWithSameTimestampAsVideotime = [];
    for (let i = 0; i < comments.length; i++) {
      if (parseInt(comments[i].timestamp) === videoTimeInSeconds) {
        commentsWithSameTimestampAsVideotime.push(comments[i].id);
      }
    }

    setCommentsToDisplay(commentsWithSameTimestampAsVideotime);
  };

  function handleOnProgress(event) {
    if (secondsPlayed === -1) {
      return;
    }
    console.log(event);
    const videoTimeRoundedToSeconds = Math.floor(event.playedSeconds);

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

  if(!video) return null
  return (
    <div className="video-player-page">
      {' '}
      {displayCommentModal && <CreateVideoCommentContainer />}{' '}
      {displayLoginModal && (
        <FullscreenModal
          onOutsideClick={handleOnCreateCommentClick}
          onCloseClick={handleOnCreateCommentClick}
        >
          <LoginContainer />
        </FullscreenModal>
      )}{' '}
      <div className="video-wrap">
        {video && comments ? (
          <ReactPlayer
            width={'100%'}
            progressInterval={1000}
            onPlay={handleOnPlayClick}
            onEnded={handleOnEnded}
            playing={play}
            ref={videoPlayerRef}
            url={video.link}
            controls={true}
            loop={false}
            playsinline
            onProgress={(event) => handleOnProgress(event)}
            onPause={grabTimestamp}
          />
        ) : (
          <div>Loading </div>
        )}{' '}
        <IconButton
          onClick={handleOnCreateCommentClick}
          icon={<AiOutlineComment />}
        />{' '}
          <h1>{video.title}{video.created_at} views: {video.total_views} {video.user}</h1>
          {video.categories.map((category) => <h1>{category.title}</h1>)}
      </div>{' '}
      <div ref={videoCommentRef} className="video-comment-list">
        {' '}
        {video && comments ? (
          comments.map(({ text, timestamp, id, user, formatted_timestamp }) => {
            return (
              <VideoComment
                key={id}
                id={id}
                active={commentsToDisplay.includes(id)}
                comment={text}
                timestamp={timestamp}
                formatted_timestamp={formatted_timestamp}
                username={user}
                onClick={(comment) => handleOnVideoCommentClick(comment)}
              />
            );
          })
        ) : (
          <div>Loading </div>
        )}{' '}
      </div>{' '}
    </div>
  );
}
