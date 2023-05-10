import React from 'react';
import YouTube from 'react-youtube';
import {AppTitle} from '../app-title';
import style from './style.css';

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
    <div className={style.youtubePreviewContainer}>
      <AppTitle title={'YouTube Video Preview'} />
      <YouTube videoId={videoId} iframeClassName={style.youtubeIframe} />
    </div>
  ) : null;
};
