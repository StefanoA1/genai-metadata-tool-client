import React from 'react';
import YouTube from 'react-youtube';

interface YouTubePreviewProps {
  videoUrl: string;
}
const extractVideoId = (url: string): string => {
  const regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\\?]*).*/;
  const match = url.match(regExp);

  return match && match[2].length === 11 ? match[2] : null;
};

export const YoutubePreview = (props: YouTubePreviewProps): JSX.Element => {
  const {videoUrl} = props;
  const videoId = extractVideoId(videoUrl);
  return videoUrl ? (
    <div>
      <h3>YouTube Video Preview</h3>
      <YouTube videoId={videoId} />
    </div>
  ) : null;
};
