import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header'; // Adjust path based on your file structure

const UploadVideo = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="container mx-auto p-6 text-center">
        <h2 className="text-3xl font-bold text-red-500 mb-4">Upload a Video</h2>

        <div className="bg-gray-300 p-10 text-xl">
          <p>Select a video from your computer</p>
          <input type="file" accept="video/*" className="mt-4" />
        </div>
      </main>
    </div>
  );
};

export default UploadVideo;
