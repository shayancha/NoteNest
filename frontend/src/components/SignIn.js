import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService'; // Ensure you have this service to call the backend

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // To store any error messages
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userData = { email, password };
      const response = await authService.login(userData);

      // If successful, store the token (optional) and navigate to logged-in page
      localStorage.setItem('user', JSON.stringify(response));
      navigate('/home-logged-in');
    } catch (error) {
      // Display error message from backend
      setErrorMessage(error.response?.data?.msg || 'Error logging in');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gray-300 py-4">
        <div className="container mx-auto flex justify-between">
          <button className="text-red-500 text-xl font-bold" onClick={() => navigate('/')}>Ketchup</button>
        </div>
      </header>

      <main className="container mx-auto p-6 text-center">
        <h2 className="text-3xl font-bold text-red-500 mb-4">Sign in</h2>

        <form className="space-y-4 max-w-md mx-auto" onSubmit={handleLogin}>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>} {/* Display warning message */}
          
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
          <button
            type="submit"
            className="bg-red-500 text-white px-4 py-2 rounded w-full"
          >
            Sign in
          </button>
        </form>
      </main>
    </div>
  );
};

export default SignIn;
