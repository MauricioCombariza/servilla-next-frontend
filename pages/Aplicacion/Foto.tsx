import React, { useState, useRef } from 'react';
import { Layout } from '@/components/Layout';

const CameraCapture: React.FC = () => {
  const [photoData, setPhotoData] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      setStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement('canvas');
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL('image/jpeg');
    setPhotoData(dataUrl);
  };

  function dataURLToBlob(dataurl: string) {
  let arr = dataurl.split(','), mimeMatch = arr[0].match(/:(.*?);/);
  
  if (!mimeMatch || mimeMatch.length < 2) {
    throw new Error('Invalid data URL');
  }

  let mime = mimeMatch[1],
  bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while(n--){
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {type:mime});
}

  async function uploadImage(imageDataUrl: string) {
    const blob = dataURLToBlob(imageDataUrl);
    const formData = new FormData();
    formData.append('image', blob);
  
    const response = await fetch('/api/images', {
      method: 'POST',
      body: formData
    });
  
    if (!response.ok) {
      throw new Error(`Failed to upload image: ${response.statusText}`);
    }
  }

  return (
    <Layout>
      <button onClick={startCamera}>Start Camera</button>
      <button onClick={stopCamera} className="bg-green-500 text-white px-4 py-2 rounded-md">
        Stop Camera
      </button>
      <button onClick={capturePhoto} className="bg-blue-500 text-white px-4 py-2 rounded-md">
        Capture Photo
      </button>
      <video ref={videoRef} autoPlay muted style={{ display: 'block', maxWidth: '100%' }} />
      {photoData && <img src={photoData} alt="Captured Photo" />}
    </Layout>
  );
};

export default CameraCapture;