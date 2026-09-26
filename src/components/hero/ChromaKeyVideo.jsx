import React, { useEffect, useRef } from "react";

function ChromaKeyVideo({ src, threshold = 235, softness = 20, className }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });

    const handleLoadedMetaData = () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      video.play().catch((err)=>console.warn("Video play blocked: ", err));
      rafRef.current = requestAnimationFrame(processFrame);
    };

    const processFrame = () => {
      if (video.paused || video.ended) return;

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = frame.data;

      for (let i = 0; i < data.length; i += 4) {
        const min = Math.min(data[i], data[i + 1], data[i + 2]);

        if (min > threshold) {
          data[i + 3] = 0;
        } else if (min > threshold - softness) {
          const alpha = (threshold - min) / softness;
          data[i + 3] = Math.round(alpha * 255);
        }
      }

      ctx.putImageData(frame, 0, 0);
      rafRef.current = requestAnimationFrame(processFrame);
    };

    video.addEventListener("loadedmetadata", handleLoadedMetaData);

    

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetaData);

       if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [src, threshold, softness]);
  return (
    <>
      <video
        ref={videoRef}
        src={src}
        style={{ display: "none" }}
        muted
        playsInline
        loop
      />
      <canvas ref={canvasRef} className={className} />
    </>
  );
}

export default ChromaKeyVideo;
