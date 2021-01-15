import React, { ReactElement, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { idText } from "typescript";
import { clearActiveComments, setCommentsTimestampActive } from "../../../redux/comments-timestamp/comments-timestamp.actions";
import { RootState } from "../../../redux/root-reducer";
import { pauseVideo, playVideo } from "../../../redux/video/video-actions";
import { CommentsTimestamp } from "../../../types/comments-timestamp";
import { Video } from "../../../types/video";
import "./video-player.style.scss";

interface Props {
 
}

interface Progress {
  playedSeconds: number;
  loadedSeconds: number;
}

export default function VideoPlayerContainer({

}: Props): ReactElement {
  
  const {
    autoplay,
    play,
    video: { link: videoUrl },
  } = useSelector((state: RootState) => state.video);
  const {
    comments,
    activeCommentIds
  } = useSelector((state: RootState) => state.commentsTimestamp)

  const dispatch = useDispatch()
  const [previousVideoProgress, setPreviousVideoProgress] = useState<number>(0);
  const reactPlayerRef = useRef<ReactPlayer>(null);

  const firstMount = useRef(true);
  useEffect(() => {
    if (reactPlayerRef.current && !firstMount.current) {
      // Rewinds the video progress to the second where the comment timestamp is.
      
      const comment = comments.find(({id}) => id === activeCommentIds[0])
      if(comment) {
        setPreviousVideoProgress(comment.timestamp)
        dispatch(pauseVideo())
        // @ts-ignore
        reactPlayerRef.current.player.player.player.currentTime = comment.timestamp

      }
    }
  }, [activeCommentIds, comments]);

  useEffect(() => {
    if (firstMount.current) {
      firstMount.current = false;
    }
  }, []);

  const handleOnVideoProgress = (progress: Progress) => {
    const { playedSeconds } = progress;
    if (comments.length === 0 || autoplay === false) return;
    const videoProgressToSeconds = Math.trunc(playedSeconds);

    // Make sure we only check for comments at the same time as current videotime to prevent the video from stopping multiple for same comment.
    if (previousVideoProgress === videoProgressToSeconds) return;
    setPreviousVideoProgress(videoProgressToSeconds);

    if (
      hasCommentTimestampsAtSameTimeAsVideoProgress(
        comments,
        videoProgressToSeconds
      )
    ) {
      const commentIds = timestampCommentIdsEqualToVideoProgress(
        comments,
        videoProgressToSeconds
      );
      dispatch(setCommentsTimestampActive(commentIds))
      dispatch(pauseVideo())
    }
  };

  const timestampCommentIdsEqualToVideoProgress = (
    comments: CommentsTimestamp[],
    videoProgress: number
  ) => {
    const commentIds: number[] = [];
    comments.forEach(({ timestamp, id }) => {
      if (timestamp === videoProgress) {
        commentIds.push(id);
      }
    });

    return commentIds;
  };

  const handleOnPlay = () => {
    dispatch(playVideo())
    dispatch(clearActiveComments())
  }

  const hasCommentTimestampsAtSameTimeAsVideoProgress = (
    comments: CommentsTimestamp[],
    videoProgress: number
  ) => {
    return comments.some(({ timestamp }) => timestamp === videoProgress);
  };

  return (
    <div className="video-player-wrap">
      <ReactPlayer
        ref={reactPlayerRef}
        onPlay={handleOnPlay}
        height={"100%"}
        width={"100%"}
        
        url={videoUrl}
        onProgress={(progress) => handleOnVideoProgress(progress)}
        controls={true}
        muted={true}
        playing={play}
        progressInterval={500}
      />
    </div>
  );
}
