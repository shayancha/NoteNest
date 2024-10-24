import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header'; // Adjust path based on your file structure

const JoinCollection = () => {
  const [joinCode, setJoinCode] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleJoinCollection = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;

      if (!token) {
        setMessage('User not authenticated. Please log in.');
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        'http://localhost:5001/api/collections/join',
        { joinCode },
        config
      );

      setMessage('Successfully joined collection!');
      navigate('/home-logged-in'); // Redirect to home or wherever needed
    } catch (error) {
      console.error('Error joining collection:', error);
      setMessage('Invalid join code or unable to join collection.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="container mx-auto p-6 text-center">
        <h2 className="text-3xl font-bold text-red-500 mb-4">Join a Collection</h2>

        <form onSubmit={handleJoinCollection} className="space-y-4">
          <input
            type="text"
            placeholder="Enter join code"
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value)}
            className="border rounded p-2 w-full"
            required
          />
          <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded w-full">
            Join Collection
          </button>
        </form>

        {message && <p className="mt-4 text-red-500">{message}</p>}
      </main>
    </div>
  );
};

export default JoinCollection;

