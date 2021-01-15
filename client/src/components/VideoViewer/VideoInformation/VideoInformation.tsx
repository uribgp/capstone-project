import React, { ReactElement } from "react";
import Image from "../../Shared/Image/Image";
import ToggleSwitch from "../../Shared/ToggleSwitch/ToggleSwitch";
import TitleSmallUppercase from "../../Shared/Typography/TitleSmall";
import TitleSmall from "../../Shared/Typography/TitleSmall";
import UserProfile from "../../Shared/UserProfile/UserProfile";
import "./video-information.style.scss";
import fontStyles from '../../../styles/typography.module.scss'
interface Props {
  title: string;
  description: string;
  views: number;
  user: string;
  onToggleAutoplayChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  autoplay: boolean;
  avatar: string;
  createdAt: string; 
}

export default function VideoInformation({
  title,
  description,
  views,
  avatar,
  user,
  autoplay,
  createdAt,
  onToggleAutoplayChange,
}: Props): ReactElement {

  return (
    <div className="video-information"> 
      <div className={`video-information-title-wrap`}>
      <div>
      <div className={`${fontStyles.textMedium} ${fontStyles.bold}`}>{title}</div>
        <span>{createdAt}</span>
        <span className="video-information-views">{views}</span>
      </div>
        <div className="video-information-autoplay-wrap">
        Pause on Feedback
          <ToggleSwitch
            onChange={(event) => onToggleAutoplayChange(event)}
            name="video-player-toggle"
            checked={autoplay}
          />
        </div>
      </div>
      <div className="video-information-user-and-description-wrap">
        <div className="video-information-user-wrap">
          <UserProfile
            size="medium"
            src={avatar}
            alt="user-profile"
            className="user-profile"
          />
          <div className="video-information-username">
          {user}
          </div>
        </div>
        <div className="video-information-user-description">
        {description}  
        </div>
      </div>
    </div>
  );
}
