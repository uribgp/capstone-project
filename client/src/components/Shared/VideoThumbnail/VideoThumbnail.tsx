import React, { ReactElement } from "react";
import { AiOutlineCalendar, AiOutlineEye, AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
import Image from "../Image/Image";
import UserProfile from "../UserProfile/UserProfile";
import "./video-thumbnail.style.scss";
interface Props {
  thumbnailUrl: string;
  title: string;
  views: number;
  id: string;
  avatar: string;
  uploadDate: string;
  ownerUsername: string;
}

export default function VideoThumbnail({
  thumbnailUrl,
  title,
  views,
  ownerUsername,
  id,
  uploadDate,
  avatar,
}: Props): ReactElement {
  return (
    <div className="video-thumbnail">
      <Link to={`/video/${id}`}>
        <Image
          className="video-thumbnail-image"
          src={thumbnailUrl}
          alt="Video Thumbnail"
        />
        <span className="video-thumbnail-title">{title}</span>
        <div className="video-thumbnail--information">
          <UserProfile size="small" src={avatar} alt="User Video Profile" />
          <div className="video-thumbnail-info">
            <span className="video-thumbnail-info-user">{ownerUsername}</span>
            <div className="video-thumbnail--information-date-views">
              <span className="video-thumbnail--information-date">
                {uploadDate}
              </span>
              <span className="video-thumbnail--information-views">
                {views} Views
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
