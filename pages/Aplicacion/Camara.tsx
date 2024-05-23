import React, { useRef, useState } from 'react';

const PhotoCapture: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);

  const startCamera = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const mediaStream = videoRef.current.srcObject as MediaStream;
      mediaStream.getTracks().forEach(track => track.stop());
    }
  };

  const capturePhoto = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        context.drawImage(videoRef.current, 0, 0, 640, 480);
        setPhoto(canvasRef.current.toDataURL('image/png'));
        stopCamera();
      }
    }
  };

  return (
    <div>
      <button onClick={startCamera}>Start Camera</button>
      <button onClick={capturePhoto}>Capture Photo</button>
      <button onClick={stopCamera}>Stop Camera</button>
      <video ref={videoRef} width="640" height="480" />
      <canvas ref={canvasRef} width="640" height="480" style={{ display: 'none' }} />
      {photo && <img src={photo} alt="Captured" />}
    </div>
  );
};

export default PhotoCapture;