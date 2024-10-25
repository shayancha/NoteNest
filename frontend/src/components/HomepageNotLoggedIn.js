import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomepageNotLoggedIn = () => {
  const navigate = useNavigate();
  localStorage.clear();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gray-300 py-4">
        <div className="container mx-auto flex justify-between">
          <h1 className="text-red-500 text-xl font-bold">NoteNest</h1>
        </div>
      </header>

      <main className="container mx-auto p-6 text-center">
        <h2 className="text-3xl font-bold text-red-500 mb-4">Welcome to NoteNest!</h2>

        <div className="flex justify-center space-x-6 mb-6">
          <button
            className="bg-gray-300 px-4 py-2 rounded"
            onClick={() => navigate('/signup')}
          >
            Sign up
          </button>
          <button
            className="bg-gray-300 px-4 py-2 rounded"
            onClick={() => navigate('/signin')}
          >
            Sign in
          </button>
        </div>
      </main>
    </div>
  );
};

export default HomepageNotLoggedIn;
