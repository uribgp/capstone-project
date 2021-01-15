import React, { ReactElement, useState } from "react";
import ReactPlayer, { ReactPlayerProps } from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { parseIsolatedEntityName } from "typescript";
import { RootState } from "../../../redux/root-reducer";
import ButtonIcon from "../../Shared/Button/ButtonIcon";
import Form from "../../Shared/Form/Form";
import Textarea from "../../Shared/Textarea/Textarea";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { postCommentTimestamp } from "../../../utils/comment-timestamp";
import { UsePost } from "../../../hooks/usePost";
import Button from "../../Shared/Button/Button";
import "./post-comment-timestamp-form.style.scss";
import buttonStyle from "../../Shared/Button/button.module.scss";
import { addCommentTimestamp } from "../../../redux/comments-timestamp/comments-timestamp.actions";
import ProfileImageAndName from "../../Shared/ProfileImageAndName/ProfileImageAndName";
import Title from "../../Shared/Typography/Title";
import { AiOutlineCheck } from "react-icons/ai";
interface Props {
  onPostCommentTimestampSuccess: () => void;
}

export default function PostCommentTimestampFormContainer({
  onPostCommentTimestampSuccess,
}: Props): ReactElement {
  const {
    autoplay,
    play,
    video: { link: videoUrl, id },
    
  } = useSelector((state: RootState) => state.video);
  const {
    username, 
    avatar,
  } = useSelector((state: RootState) => state.user)
  
  
  const [selectedVideoTime, setSelectedVideoTime] = useState(0);
  const [formStep, setFormStep] = useState(1);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();


  const handleOnSelectTimestampChange = (progress: ReactPlayerProps) => {
    const { playedSeconds } = progress;
    const playedSecondsToFullNum = Math.trunc(playedSeconds);
    setSelectedVideoTime(playedSecondsToFullNum);
  };

  const handleOnFormSubmit = () => {
    const commentTimestamp = {
      title: "title",
      text: comment,
      video_id: id,
      vote_status: "none",
      timestamp: selectedVideoTime,
    };

    postCommentTimestamp(commentTimestamp)
      .then((response) => {
        console.log(response);
        dispatch(addCommentTimestamp(response.data.comment));
        onPostCommentTimestampSuccess();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleOnCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setComment(event.currentTarget.value);
  };



  const handleNextFormStepClick = () => {
    if (formStep < 2) setFormStep((prev) => prev + 1);
  };

  const handlePrevFormStepClick = () => {
    if (formStep > 0) setFormStep((prev) => prev - 1);
  };

  console.log(buttonStyle)
  return (
    <Form onSubmit={(event) => event.preventDefault()}>
      {formStep === 1 && (
        <div className="form-step">
          <ReactPlayer
            url={videoUrl}
            onProgress={handleOnSelectTimestampChange}
            controls={true}
            muted={true}
            playing={false}
          />
          <div className="form-step--lower"> 
          <div className="form-step--selected-time text-medium">Selected Time {selectedVideoTime}</div>
          <Button uniqueStyle={`${buttonStyle.baseButtonIconPrimary}`} onClick={handleNextFormStepClick}>
          <GrFormNext />
          </Button>
          </div>
        </div>
      )}
      {formStep === 2 && (
        <div className="form-step">
          <ProfileImageAndName username={username} userAvatar={avatar} />
          <Textarea value={comment} placeholder={"Your comment here"} onChange={handleOnCommentChange} />
          <div className="form-step--lower">
            <Button uniqueStyle={buttonStyle.baseButtonIconPrimary} onClick={handlePrevFormStepClick}>
            <GrFormPrevious />
            </Button>
            <Button
              uniqueStyle={buttonStyle.baseButtonIconPrimary}
              onClick={handleOnFormSubmit}
            >
             <AiOutlineCheck />
            </Button>
          </div>
        </div>
      )}
    </Form>
  );
}
