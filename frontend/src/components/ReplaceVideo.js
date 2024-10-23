import React from 'react';
import { useNavigate } from 'react-router-dom';

const UploadVideo = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gray-300 py-4">
        <div className="container mx-auto flex justify-between">
        <button className="text-red-500 text-xl font-bold" onClick={() => navigate('/home-logged-in')}>Ketchup</button>
          <span className="text-gray-700">Logged in</span>
        </div>
      </header>

      <main className="container mx-auto p-6 text-center">
        <h2 className="text-3xl font-bold text-red-500 mb-4">Replace Video</h2>

        <div className="bg-gray-300 p-10 text-xl">
          <p>Select a video from your computer</p>
          <input type="file" accept="video/*" className="mt-4" />
        </div>
      </main>
    </div>
  );
};

export default UploadVideo;