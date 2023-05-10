import React, {useEffect, useState} from 'react';
import axios from 'axios';

interface YouTubePreviewProps {
  videoUrl: string;
}

interface VideoData {
  title: string;
  thumbnail: string;
}
const extractVideoId = (url: string): string => {
  const regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\\?]*).*/;
  const match = url.match(regExp);

  return match && match[2].length === 11 ? match[2] : null;
};

export const YoutubePreview = (props: YouTubePreviewProps): JSX.Element => {
  const {videoUrl} = props;
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  useEffect(() => {
    const fetchVideoData = async (): Promise<void> => {
      try {
        if (videoData) return;
        const videoId = extractVideoId(videoUrl);
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${process.env.API_YOUTUBE_KEY}`
        );
        // eslint-disable-next-line no-console
        console.log('result');
        const {title, thumbnails} = response.data.items[0].snippet;
        const thumbnail = thumbnails.high.url;
        setVideoData({title, thumbnail});
        // eslint-disable-next-line no-console
        console.log(response.data.items[0]);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching this video data:');
      }
    };

    if (videoUrl) {
      fetchVideoData();
    }
  }, [videoUrl, videoData]);

  if (!videoData) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <iframe
        width="600"
        height="500"
        src={videoUrl}
        title="How I would learn Machine Learning (if I could start over)"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
};

export default YoutubePreview;
