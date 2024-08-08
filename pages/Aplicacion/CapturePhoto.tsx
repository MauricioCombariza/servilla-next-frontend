import React, { useState } from 'react';

const PhotoUpload: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setSelectedPhoto(e.target?.result as string);
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" capture="user" onChange={handlePhotoChange} />
      {selectedPhoto && <img src={selectedPhoto} alt="Selected" />}
    </div>
  );
};

export default PhotoUpload;