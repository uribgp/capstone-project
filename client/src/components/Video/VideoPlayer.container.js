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
import { format } from 'timeago.js';
import LoadingSpinner from '../Shared/LoadingSpinner/LoadingSpinner';
import { likeComment } from '../../store/comment/comment-actions';

export default function VideoPlayerContainer() {
  const player = useRef(null);
  const [play, setPlay] = useState(false);
  const [commentsToDisplay, setCommentsToDisplay] = useState([]);
  const [secondsPlayed, setSecondsPlayed] = useState(0);
  const [displayCommentModal, setDisplayCommentModal] = useState(false);
  const [feedbackComment, setFeedbackComment] = useState('');
  const [displayLoginModal, setDisplayLoginModal] = useState(false);
  const [reactPlayerLoading, setReactPlayerLoading] = useState(true)
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
      categories
    },
    loading: videoLoading,
  } = useSelector((state) => state.video);
  const { id: userId, username, authenticated } = useSelector(
    (state) => state.user
  );
  const {comments, loading: commentsLoading} = useSelector((state) => state.comments);

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

  const handleUpVote = (e) => {
    dispatch(likeComment(e.target.id, true, null))
}

  const handleDownVote = (e) => {
    dispatch(likeComment(e.target.id, null, true))
  }

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

  const handleOnVideoReady  = () => {
    setReactPlayerLoading(false)
  }

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

  const handleOnCloseCommentModalClick = () => {
    setDisplayCommentModal(false);
  };

  return (
    <div className="video-player-page">
      {displayCommentModal && (
        <CreateVideoCommentContainer
          onCommentSubmitClick={handleOnCloseCommentModalClick}
          onCloseClick={handleOnCloseCommentModalClick}
          onCloseClick={handleOnCloseCommentModalClick}
        />
      )}{' '}
      {displayLoginModal && (
        <FullscreenModal
          onOutsideClick={handleOnCreateCommentClick}
          onCloseClick={handleOnCreateCommentClick}
        >
          <LoginContainer />
        </FullscreenModal>
      )}
      <div className="video-wrap">
        {!commentsLoading && !videoLoading  ? (
          <div>
            <ReactPlayer
              onReady={handleOnVideoReady}
              volume={0}
              width={'100%'}
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
              onPause={grabTimestamp}
            />
            
            <div className="video-info">
              <div className="video-info-upper">
                <div className="video-info-user">{title}</div>
                <div>
                  <span className="video-info-views">{views} views</span>
                  <span></span>
                  <span className="video-info-createdAt">
                    {format(createdAt)}
                  </span>
                </div>
              </div>
              <div className="video-info-container">
              <div className="categories">
              {categories.length > 0? categories.map((category) => <p>{category.title}</p>) : null}
              </div>
                <div className="video-info-user">{user}</div>
                <div className="video-info-description">{description}</div>
                </div>
            {
              !videoLoading && 
              <IconButton
                onClick={handleOnCreateCommentClick}
                icon={<AiOutlineComment />}
              />

            }
            </div>
          <div className="video-comment-general-list">
            {comments.map(({text, timestamp,likes,dislikes, comment_user, created_at, id}) => {
              if(timestamp === null){
              console.log(text)
              return ( 
               <div className="video-comment-general">
                 <div className="video-comment-general-user">
                   {comment_user}
                 </div>
                <div className="video-comment-general-text">{text}</div>
              <div className="video-comment-general-created-at">{format(created_at)}</div>
              <div className="likes"><button id={id} onClick={handleUpVote}>Upvote</button>{likes} <button id={id} onClick={handleDownVote}>DownVote</button> {dislikes}
              </div>
               </div>
              )}
            })}
          </div>
          </div>
        ) : (
          <LoadingSpinner width={32} />
        )}
      </div>
      <div ref={videoCommentRef} className="video-comment-list">
        {!commentsLoading && !videoLoading ? (
          comments.map(({ text, timestamp, id, comment_user, formatted_timestamp, likes, dislikes  }) => {
            if(timestamp !== null){
            return (
              <VideoComment
                key={id}
                id={id}
                likes={likes}
                dislikes={dislikes}
                active={commentsToDisplay.includes(id)}
                comment={text}
                timestamp={timestamp}
                formatted_timestamp={formatted_timestamp}
                username={comment_user}
                onClick={(comment) => handleOnVideoCommentClick(comment)}
              />
            )};
          })
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </div>
  );
}
