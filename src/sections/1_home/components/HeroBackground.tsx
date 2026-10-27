'use client';

import { useEffect, useRef, useState } from 'react';

const POSTER = '/bg_stop.webp';

export default function HeroBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [frameReady, setFrameReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let videoFrame: number | undefined;
    let animationFrame: number | undefined;
    const cancelPendingFrame = () => {
      if (videoFrame !== undefined) video.cancelVideoFrameCallback(videoFrame);
      if (animationFrame !== undefined) cancelAnimationFrame(animationFrame);
      videoFrame = undefined;
      animationFrame = undefined;
    };
    const canShowVideo = () => !video.error && !video.paused && video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA;
    const showPoster = () => {
      cancelPendingFrame();
      setFrameReady(false);
    };
    const showVideoWhenPainted = () => {
      cancelPendingFrame();
      if (!canShowVideo()) return;

      if (typeof video.requestVideoFrameCallback === 'function') {
        videoFrame = video.requestVideoFrameCallback(() => {
          videoFrame = undefined;
          if (canShowVideo()) setFrameReady(true);
        });
      } else {
        // Older browsers: allow a decoded frame two rendering cycles to paint.
        animationFrame = requestAnimationFrame(() => {
          animationFrame = requestAnimationFrame(() => {
            animationFrame = undefined;
            if (canShowVideo()) setFrameReady(true);
          });
        });
      }
    };
    const handleStall = () => {
      // A stalled network request can still leave plenty of playable data.
      if (video.readyState < HTMLMediaElement.HAVE_FUTURE_DATA) showPoster();
    };

    video.addEventListener('playing', showVideoWhenPainted);
    video.addEventListener('loadeddata', showVideoWhenPainted);
    video.addEventListener('waiting', showPoster);
    video.addEventListener('pause', showPoster);
    video.addEventListener('emptied', showPoster);
    video.addEventListener('loadstart', showPoster);
    video.addEventListener('stalled', handleStall);
    // Capture source errors too: they do not bubble to the video element.
    video.addEventListener('error', showPoster, true);
    // Autoplay may have started before React attached these listeners.
    showVideoWhenPainted();

    return () => {
      cancelPendingFrame();
      video.removeEventListener('playing', showVideoWhenPainted);
      video.removeEventListener('loadeddata', showVideoWhenPainted);
      video.removeEventListener('waiting', showPoster);
      video.removeEventListener('pause', showPoster);
      video.removeEventListener('emptied', showPoster);
      video.removeEventListener('loadstart', showPoster);
      video.removeEventListener('stalled', handleStall);
      video.removeEventListener('error', showPoster, true);
    };
  }, []);

  return (
    <div aria-hidden="true" className="absolute inset-y-0 left-1/2 z-0 w-screen min-w-[1440px] -translate-x-1/2">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={POSTER}
        className="size-full object-cover object-top"
      >
        <source src="/bg.av1.mp4" type={'video/mp4; codecs="av01.0.12M.08"'} />
        <source src="/bg.mp4" type={'video/mp4; codecs="avc1"'} />
      </video>
      <div
        className={`absolute inset-0 bg-cover bg-top bg-no-repeat ${frameReady ? 'invisible' : 'visible'}`}
        style={{ backgroundImage: `url("${POSTER}")` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#070707]/80 to-[#070707]/30" />
    </div>
  );
}
