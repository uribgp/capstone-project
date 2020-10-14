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
  const { video } = useSelector((state) => state.videos);
  const { id: userId, username, authenticated } = useSelector(
    (state) => state.user
  );
  const comments = useSelector((state) => state.comments.comments);
  const videoPlayerRef = useRef();
  // let timestamp = useSelector(state => state.videos.timestamp);

  useEffect(() => {
    dispatch(getVideoById(videoId));
    dispatch(getComments(videoId));
  }, []);

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

    if(secondsPlayed === -1) {
      return 
    }
    console.log(event)
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
        return displayCommentsWithSameTimestampAsVideo(videoTimeRoundedToSeconds);
      }
    }
  }

  const displayOneComment = (commentId) => {
    setSecondsPlayed(-1)
    setCommentsToDisplay([commentId])
  }

  const handleOnPlayClick = () => {
    setPlay(true);
    setCommentsToDisplay([]);
  };

  const handleOnEnded = () => {
    setCommentsToDisplay([]);
  };

  const handleOnCreateCommentClick = () => {
    return authenticated
      ? setDisplayCommentModal(!displayCommentModal)
      : setDisplayLoginModal(!displayLoginModal);
  };

  const handleOnCommentChange = (event) => {
    setFeedbackComment(event.target.value);
  };

  const handleOnCommentSubmit = () => {
    const currentSecondsInClip = Math.floor(
      videoPlayerRef.current.getCurrentTime()
    );


       dispatch(
        postComment(
          'comment',
          feedbackComment,
          currentSecondsInClip,
          videoId,
          userId
        )
      );
      setDisplayCommentModal()
  };

  const handleOnVideoCommentClick = (comment) => {
    console.log(comment)
    videoPlayerRef.current.player.player.player.currentTime = comment.timestamp;
    displayOneComment(comment.id)
  };

  useEffect(() => {
    console.log(play)
  }, [play])

  const generateTimestamp = (timestamp) => {};

  useEffect(() => {
    if (firstMount.current) {
      firstMount.current = false;
    }
  }, []);

  if (!comments || !video) {
    return <div> loading </div>;
  }

  return (
    <div className="video-player-page">
      {displayCommentModal && (
        <FullscreenModal
          onOutsideClick={handleOnCreateCommentClick}
          onCloseClick={handleOnCreateCommentClick}
        >
          <CommentModal
            buttonText="Submit"
            placeholder="Write your comment..."
            onCloseClick={handleOnCreateCommentClick}
            onCommentSubmit={handleOnCommentSubmit}
            onCommentChange={(event) => handleOnCommentChange(event)}
          />
        </FullscreenModal>
      )}
      {displayLoginModal && (
        <FullscreenModal
          onOutsideClick={handleOnCreateCommentClick}
          onCloseClick={handleOnCreateCommentClick}
        >
          <LoginContainer />
        </FullscreenModal>
      )}
      <div className="video-wrap">
        <ReactPlayer
            
          width={"100%"}
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
        <IconButton
          onClick={handleOnCreateCommentClick}
          icon={<AiOutlineComment />}
        />
      </div>
      <div className="video-comment-list">
        {comments.map(({ text, timestamp, id, user }) => {
          return (
            <VideoComment
            key={id}
              id={id}
              active={commentsToDisplay.includes(id)}
              comment={text}
              timestamp={timestamp}
              username={user}
              onClick={(comment) => handleOnVideoCommentClick(comment)}
            />
          );
        })}
      </div>
    </div>
  );
}
