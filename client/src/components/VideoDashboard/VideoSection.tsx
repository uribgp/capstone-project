import React, { ReactElement } from 'react';
import { Video } from '../../types/video';
import TitleMedium from '../Shared/Typography/TitleMedium';
import VideoThumbnail from '../Shared/VideoThumbnail/VideoThumbnail';
import VideoThumbnailSkeleton from '../Shared/VideoThumbnail/VideoThumbnail.Skeleton';
import './video-section.style.scss';

interface Props {
  title: string;
  videos: Video[];
  loading: boolean;
  error: boolean;
}

export default function VideoSection({
  title,
  videos,
  error,
  loading,
}: Props): ReactElement {
  const renderPopularVideos = () => {
    if (loading) {
      return <VideoThumbnailSkeleton />;
    } else if (error) {
      return <div>Error</div>;
    } else {
      return videos.map(
        ({ total_views, avatar, user, title, id, created_at, thumbnail }: Video) => {
          return (
            <VideoThumbnail
              avatar={avatar}
              views={total_views}
              title={title}
              id={id}
              thumbnailUrl={thumbnail}
              uploadDate={created_at}
              ownerUsername={user}
            />
          );
        }
      );
    }
  };

  return (
    <div className="video-section">
      <TitleMedium text={title} />
      <div className="video-section-content">{renderPopularVideos()}</div>
    </div>
  );
}
