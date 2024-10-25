import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-gray-300 py-4">
      <div className="container mx-auto flex justify-between">
        <button className="text-red-500 text-xl font-bold" onClick={() => navigate('/home-logged-in')}>NoteNest</button>
        <span className="text-gray-700">Logged in</span>
      </div>
    </header>
  );
};

export default Header;
