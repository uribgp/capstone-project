import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {RootState } from '../../redux/root-reducer';
import { fetchPopularVideos } from '../../redux/videos-popular/videos-popular-actions';
import Container from '../Shared/Container/Container';
import VideoSection from './VideoSection';
import './video-dashboard.style.scss';
import { fetchNeedsSupportVideos } from '../../redux/videos-support/videos-support-actions';
import { fetchRecentVideos } from '../../redux/videos-recent/videos-recent-actions';

export default function VideoDashboardContainer(): ReactElement {
  const dispatch = useDispatch();
  const {
    videosPopular: {
      popularVideos,
      loading: popularVideosLoading,
      error: popularVideosError,
    },
    videosSupport: {
      videosSupport,
      loading: supportVideosLoading,
      error: supportVideosError,
    },
    videosRecent: {
      videosRecent,
      loading: recentVideosLoading, 
      error: recentVideosError
    }
  } = useSelector((state: RootState) => state);

  useEffect(() => {
    dispatch(fetchPopularVideos())
    dispatch(fetchNeedsSupportVideos())
    dispatch(fetchRecentVideos())
  }, [dispatch]);

  return (
    <div>
      <Container>
        <VideoSection
          loading={popularVideosLoading}
          error={popularVideosError}
          videos={popularVideos}
          title="Popular Videos"
        />
        <VideoSection
          title="Needs your support"
          loading={supportVideosLoading}
          error={supportVideosError}
          videos={videosSupport}
        />
        <VideoSection
          title="New videos"
          loading={recentVideosLoading}
          error={recentVideosError}
          videos={videosRecent}
        />
      </Container>
    </div>
  );
}
