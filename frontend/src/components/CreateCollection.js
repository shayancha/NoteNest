import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header'; // Adjust path based on your file structure

const CreateCollection = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [pdfs, setPdfs] = useState([]);
  const [videos, setVideos] = useState([]);
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');

  // Check if token exists in localStorage on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    } else {
      setMessage('Error: No token found. Please log in.');
      // Optionally redirect to login page
      navigate('/signin');
    }
  }, [navigate]);

  const handleFileChange = (e, setFiles) => {
    const files = Array.from(e.target.files);
    setFiles(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('name', name);
  
    pdfs.forEach((pdf) => formData.append('pdfs', pdf));  // Adding pdfs array
    videos.forEach((video) => formData.append('videos', video));  // Adding videos array

    try {
      const response = await axios.post('http://localhost:5001/api/collections/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,  // Token added for authentication
        },
      });

      setMessage('Collection created successfully');
      navigate('/home-logged-in');
    } catch (error) {
      console.error('Error creating collection', error);
      setMessage('Error creating collection');
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="container mx-auto p-6 text-center">
        <h2 className="text-3xl font-bold text-red-500 mb-4">New Collection</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label className="block text-xl font-bold">Collection Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter collection name"
              className="border rounded p-2 w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-xl font-bold">Upload PDFs:</label>
            <input
              type="file"
              multiple
              onChange={(e) => handleFileChange(e, setPdfs)}
              accept=".pdf"
              className="border rounded p-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-xl font-bold">Upload Videos:</label>
            <input
              type="file"
              multiple
              onChange={(e) => handleFileChange(e, setVideos)}
              accept="video/*"
              className="border rounded p-2 w-full"
            />
          </div>

          <button
            type="submit"
            className="bg-red-500 text-white px-4 py-2 rounded w-full text-xl font-semibold"
          >
            Create Collection
          </button>

          {message && <p className="mt-4 text-red-500">{message}</p>}
        </form>
      </main>
    </div>
  );
};

export default CreateCollection;
