import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchVideoById } from "../../redux/video/video-actions";
import VideoPlayerContainer from "./VideoPlayer/VideoPlayer.container";
import VideoInformationContainer from "./VideoInformation/VideoInformation.container";
import { RootState } from "../../redux/root-reducer";
import CommentsGeneralContainer from "./CommentsGeneral/CommentsGeneral.container";
import { fetchCommentsTimestampByVideoId } from "../../redux/comments-timestamp/comments-timestamp.actions";
import Container from "../Shared/Container/Container";
import { useWindowWidth } from "@react-hook/window-size";
import CommentsTimestampSmallDeviceContainer from "./CommentsTimestamp/CommentsTimestampSmallDevice.container";
import CommentsTimestampLargeDeviceContainer from "./CommentsTimestamp/CommentsTimestampLargeDevice.container";
import "./video-viewer-container.style.scss";
import PostCommentTimestampFormContainer from "./CommentsTimestamp/PostCommentTimestampForm.container";
import FullscreenModal from "../Shared/FullscreenModal/FullscreenModal/FullscreenModal";
import PostCommentGeneral from "./CommentsGeneral/PostCommentGeneral";
import LoginModalContainer from "../Shared/LoginModal/LoginModal.container";
interface Props {}

interface ParamTypes {
  id: string;
}

export default function VideoViewerContainer({}: Props): ReactElement {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const { loading, error } = useSelector((state: RootState) => state.video);
  const { authenticated } = useSelector((state: RootState) => state.user);
  const width = useWindowWidth();
  const [
    toggleTimestampCommentModal,
    setToggleTimestampCommentModal,
  ] = useState<boolean>(false);
  useEffect(() => {
    dispatch(fetchVideoById(id));
    dispatch(fetchCommentsTimestampByVideoId(id));
  }, []);

  const handleTogglePostCommentTimestampClick = () => {
    setToggleTimestampCommentModal(!toggleTimestampCommentModal);
  };

  if (loading) {
    return (
      <Container>
        <div>loading</div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <div>error</div>;
      </Container>
    );
  }

  if (width < 1025) {
    return (
      <div className="video-player-page">
        <Container>
          <VideoPlayerContainer />
          <VideoInformationContainer />
          <CommentsTimestampSmallDeviceContainer />
          <CommentsGeneralContainer />
        </Container>
      </div>
    );
  } else {
    return (
      <div className="video-player-page">
        <div className="video-player-page-left-wrap">
          <VideoPlayerContainer />
          <VideoInformationContainer />
          <CommentsGeneralContainer />
        </div>
        <div className="video-player-page-right-wrap">
          <CommentsTimestampLargeDeviceContainer
            onPostCommentTimestampClick={handleTogglePostCommentTimestampClick}
          />
        </div>
        {toggleTimestampCommentModal && (
          <FullscreenModal
            onCloseClick={handleTogglePostCommentTimestampClick}
            onOutsideClick={() => null}
            backgroundType="white"
          >
            {authenticated ? (
              <PostCommentTimestampFormContainer
                onPostCommentTimestampSuccess={
                  handleTogglePostCommentTimestampClick
                }
              />
            ) : (
              <LoginModalContainer />
            )}
          </FullscreenModal>
        )}
      </div>
    );
  }
}
