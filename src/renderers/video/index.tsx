import React, { useContext, useEffect, useMemo, useRef } from "react";
import { DocRenderer, VideoControlsApi } from "../../models";
import { DocViewerContext } from "../../store/DocViewerProvider";

const VideoRenderer: DocRenderer = ({ mainState: { currentDocument, config } }) => {
  const { registerVideoControls } = useContext(DocViewerContext);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const api = useMemo<VideoControlsApi>(
    () => ({
      play() {
        return videoRef.current?.play();
      },
      pause() {
        videoRef.current?.pause();
      },
      async togglePlay() {
        const video = videoRef.current;
        if (!video) return;
        if (video.paused) {
          await video.play();
          return;
        }
        video.pause();
      },
      seek(timeInSeconds: number) {
        if (!videoRef.current) return;
        videoRef.current.currentTime = timeInSeconds;
      },
      setVolume(volume: number) {
        if (!videoRef.current) return;
        videoRef.current.volume = Math.min(Math.max(volume, 0), 1);
      },
      setMuted(muted: boolean) {
        if (!videoRef.current) return;
        videoRef.current.muted = muted;
      },
      getState() {
        const video = videoRef.current;
        return {
          paused: video?.paused ?? true,
          currentTime: video?.currentTime ?? 0,
          duration: video?.duration ?? 0,
          volume: video?.volume ?? 1,
          muted: video?.muted ?? false,
        };
      },
    }),
    [],
  );

  useEffect(() => {
    registerVideoControls(api);
    return () => registerVideoControls(null);
  }, [api, registerVideoControls]);

  if (!currentDocument) return null;

  return (
    <div id="video-renderer" className="fv:w-full">
      <video
        ref={videoRef}
        className="fv:h-full fv:w-full fv:border-0"
        controls={!config?.videoControls?.disable}
        src={currentDocument.uri}
      />
    </div>
  );
};

export default VideoRenderer;

VideoRenderer.fileTypes = [
  "mp4",
  "mov",
  "avi",
  "webm",
  "video/mp4",
  "video/quicktime",
  "video/x-msvideo",
  "video/webm",
];
VideoRenderer.weight = 0;
