import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header'; // Adjust path based on your file structure

const HomeLoggedIn = () => {
  const navigate = useNavigate();
  const [createdCollections, setCreatedCollections] = useState([]);
  const [joinedCollections, setJoinedCollections] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state
  const [errorMessage, setErrorMessage] = useState(''); // For handling errors

  // Fetch user data including collections
  useEffect(() => {
    const fetchUserCollections = async () => {
      try {
        const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;
        if (!token) {
          setErrorMessage('User is not authenticated. Please log in again.');
          setLoading(false);
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Fetch created collections
        const responseCreated = await axios.get('http://localhost:5001/api/collections/created', config);
        const responseJoined = await axios.get('http://localhost:5001/api/collections/joined', config);
        // Set collections if they exist, otherwise set empty arrays
        // Handle joined collections
        if (Array.isArray(responseCreated.data['createdCollections'])) {
          setCreatedCollections(responseCreated.data['createdCollections']);  // Set collections to the array if it's directly in responseJoined.data
        } else {
          setCreatedCollections([]);  // Default to an empty array if no collections are found
        }
        
        if (Array.isArray(responseJoined.data['joinedCollections'])) {
          setJoinedCollections(responseJoined.data['joinedCollections']);  // Set collections to the array if it's directly in responseJoined.data
        } else {
          setJoinedCollections([]);  // Default to an empty array if no collections are found
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching collections:', error);
        setErrorMessage('Error fetching collections. Please try again.');
        setLoading(false);
      }
    };

    fetchUserCollections();
  }, []);

  useEffect(()=> {
    console.log(joinedCollections);
  }, [joinedCollections])

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />  {/* Use the Header component */}

      <main className="container mx-auto p-6 text-center">
        <h2 className="text-3xl font-bold text-red-500 mb-4">Welcome to Ketchup!</h2>

        <div className="flex justify-center space-x-6 mb-6">
          <button
            className="bg-gray-300 px-4 py-2 rounded"
            onClick={() => navigate('/create-collection')}
          >
            Create a Collection
          </button>
          <button
            className="bg-gray-300 px-4 py-2 rounded"
            onClick={() => navigate('/join-collection')}
          >
            Join a Collection
          </button>
        </div>

        {/* Error message */}
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

        {/* Loading state */}
        {loading ? (
          <p>Loading collections...</p>
        ) : (
          <>
            {/* Created Collections */}
            <h3 className="text-2xl font-bold mb-4">Created Collections</h3>
            {createdCollections.length > 0 ? (
              <div className="grid grid-cols-3 gap-6">
                {createdCollections.map((collection, index) => (
                  <button
                    key={index}
                    className="bg-gray-300 px-4 py-2 rounded"
                    onClick={() => navigate(`/created-collection/${collection._id}`)}
                  >
                    {collection.name}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No created collections yet.</p>
            )}

            {/* Joined Collections */}
            <h3 className="text-2xl font-bold mb-4 mt-8">Joined Collections</h3>
            {joinedCollections.length > 0 ? (
              <div className="grid grid-cols-3 gap-6">
                {joinedCollections.map((collection, index) => (
                  <button
                    key={index}
                    className="bg-gray-300 px-4 py-2 rounded"
                    onClick={() => navigate(`/joined-collection/${collection._id}`)}
                  >
                    {collection.name}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No joined collections yet.</p>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default HomeLoggedIn;

