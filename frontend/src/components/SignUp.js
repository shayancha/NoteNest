import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import Header from './Header'; // Adjust path based on your file structure

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');  // Add name field
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Password match validation
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      const userData = { name, email, password };  // Include name in the request
      const response = await authService.register(userData);
      
      // Store the user data or token in localStorage
      localStorage.setItem('user', JSON.stringify(response));
      navigate('/signin');
    } catch (error) {
      // Handle registration error, display error message if any
      setErrorMessage(error.response?.data?.msg || 'Error signing up');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gray-300 py-4">
        <div className="container mx-auto flex justify-between">
          <button className="text-red-500 text-xl font-bold" onClick={() => navigate('/')}>NoteNest</button>
        </div>
      </header>

      <main className="container mx-auto p-6 text-center">
        <h2 className="text-3xl font-bold text-red-500 mb-4">Sign up</h2>

        {errorMessage && <p className="text-red-500">{errorMessage}</p>} {/* Display error message */}

        <form className="space-y-4" onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="Name"  // Add name input field
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded p-2 w-1/2"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded p-2 w-1/2"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded p-2 w-1/2"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border rounded p-2 w-1/2"
          />
          <button
            type="submit"
            className="bg-red-500 text-white px-4 py-2 rounded"
            // onClick={() => navigate('/signin')}
          >
            Sign up
          </button>
        </form>

        <p className="mt-4">
          Already have an account?{' '}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate('/signin')}
          >
            Click here to sign in!
          </span>
        </p>
      </main>
    </div>
  );
};

export default SignUp;
