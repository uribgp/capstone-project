import React from 'react';
import VideoSection from '../Shared/VideoSection/VideoSection';

export default function MyVideosModal({props}) {
return (
    <>
    {props.new_comments ? (
        <VideoSection
          key={'Unseen comments'}
          sectionTitle="Unseen comments"
          videos={props.new_comments}
          name={props.user.username}
        />
      ) : null}
      {props.no_comments ? (
        <VideoSection
          key={'Not Commented On'}
          sectionTitle="Not Commented on"
          videos={props.no_comments}
          name={props.user.username}
        />
      ) : null}
      {props.oldComments ? (
        <VideoSection
          key={'Videos with Comments'}
          sectionTitle="Videos with comments"
          videos={props.oldComments}
          name={props.user.username}
        />
      ) : null}
      </>
)
}