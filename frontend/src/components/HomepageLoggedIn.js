// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const HomeLoggedIn = () => {
//   const navigate = useNavigate();
//   const [createdCollections, setCreatedCollections] = useState([]);
//   const [joinedCollections, setJoinedCollections] = useState([]);
//   const [loading, setLoading] = useState(true); // Add a loading state
//   const [errorMessage, setErrorMessage] = useState(''); // For handling errors

//   // Fetch user data including collections
//   useEffect(() => {
//     const fetchUserCollections = async () => {
//       try {
//         const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;
//         if (!token) {
//           setErrorMessage('User is not authenticated. Please log in again.');
//           setLoading(false);
//           return;
//         }

//         const config = {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         };

//         const responseCreated = await axios.get('http://localhost:5001/api/collections/created', config);
//         const responseJoined = await axios.get('http://localhost:5001/api/collections/joined', config);

//         console.log(responseJoined.data);

//         // Check if the response is structured as expected
//         if (responseCreated.data.createdCollections && Array.isArray(responseCreated.data.createdCollections)) {
//           setCreatedCollections(responseCreated.data.createdCollections);  // Set collections to createdCollections array
//         } else {
//           setCreatedCollections([]);  // Default to an empty array if no collections are found
//         }

//         if (responseJoined.data.joinedCollections && Array.isArray(responseJoined.data.joinedCollections)) {
//           setJoinedCollections(responseJoined.data.joinedCollections);  // Set collections to createdCollections array
//         } else {
//           setJoinedCollections([]);  // Default to an empty array if no collections are found
//         }

//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching collections:', error);
//         setErrorMessage('Error fetching collections. Please try again.');
//         setLoading(false);
//       }
//     };

//     fetchUserCollections();
//   }, []);

//   // Log collections state after fetching data
//   console.log("Collections before rendering:", joinedCollections);

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <header className="bg-gray-300 py-4">
//         <div className="container mx-auto flex justify-between">
//           <button className="text-red-500 text-xl font-bold" onClick={() => navigate('/home-logged-in')}>Ketchup</button>
//           <span className="text-gray-700">Logged in</span>
//         </div>
//       </header>

//       <main className="container mx-auto p-6 text-center">
//         <h2 className="text-3xl font-bold text-red-500 mb-4">Welcome to Ketchup!</h2>

//         <div className="flex justify-center space-x-6 mb-6">
//           <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => navigate('/create-collection')}>
//             Create a Collection
//           </button>
//           <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => navigate('/join-collection')}>
//             Join a Collection
//           </button>
//         </div>

//         <h3 className="text-2xl font-bold mb-4">Created Collections</h3>

//         {/* Show error messages */}
//         {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

//         {/* Show loading state */}
//         {loading ? (
//           <p>Loading collections...</p>
//         ) : (
//           <>
//             {/* Show collections if available */}
//             {createdCollections.length > 0 ? (
//               <div className="grid grid-cols-3 gap-6">
//                 {createdCollections.map((collection, index) => (
//                   <button
//                     key={index}
//                     className="bg-gray-300 px-4 py-2 rounded"
//                     onClick={() => navigate(`/collection/${collection._id}`)}
//                   >
//                     {collection.name}
//                   </button>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-500">No collections created yet.</p>
//             )}
//           </>
//         )}

//         <h3 className="text-2xl font-bold mb-4">Joined Collections</h3>

//         {/* Show loading state */}
//         {loading ? (
//           <p>Loading collections...</p>
//         ) : (
//           <>
//             {/* Show collections if available */}
//             {joinedCollections.length > 0 ? (
//               <div className="grid grid-cols-3 gap-6">
//                 {joinedCollections.map((collection, index) => (
//                   <button
//                     key={index}
//                     className="bg-gray-300 px-4 py-2 rounded"
//                     onClick={() => navigate(`/collection/${collection._id}`)}
//                   >
//                     {collection.name}
//                   </button>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-500">No collections joined yet.</p>
//             )}
//           </>
//         )}
//       </main>
//     </div>
//   );
// };

// export default HomeLoggedIn;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
        // Fetch joined collections
        const responseJoined = await axios.get('http://localhost:5001/api/collections/joined', config);

        console.log("Joined collections response:", responseJoined.data);

        // Handle created collections
        if (responseCreated.data.createdCollections && Array.isArray(responseCreated.data.createdCollections)) {
          setCreatedCollections(responseCreated.data.createdCollections);  // Set collections to createdCollections array
        } else {
          setCreatedCollections([]);  // Default to an empty array if no collections are found
        }

        // Handle joined collections
        if (Array.isArray(responseJoined.data)) {
          setJoinedCollections(responseJoined.data);  // Set collections to the array if it's directly in responseJoined.data
        } else {
          setJoinedCollections([]);  // Default to an empty array if no collections are found
        }

        // Set loading to false after both requests are done
        setLoading(false);

      } catch (error) {
        console.error('Error fetching collections:', error);
        setErrorMessage('Error fetching collections. Please try again.');
        setLoading(false);
      }
    };

    fetchUserCollections();
  }, []);

  // Log collections state after fetching data
  useEffect(() => {
    console.log("Joined collections:", joinedCollections);
  }, [joinedCollections]); // This will log when the joinedCollections state changes

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gray-300 py-4">
        <div className="container mx-auto flex justify-between">
          <button className="text-red-500 text-xl font-bold" onClick={() => navigate('/home-logged-in')}>Ketchup</button>
          <span className="text-gray-700">Logged in</span>
        </div>
      </header>

      <main className="container mx-auto p-6 text-center">
        <h2 className="text-3xl font-bold text-red-500 mb-4">Welcome to Ketchup!</h2>

        <div className="flex justify-center space-x-6 mb-6">
          <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => navigate('/create-collection')}>
            Create a Collection
          </button>
          <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => navigate('/join-collection')}>
            Join a Collection
          </button>
        </div>

        <h3 className="text-2xl font-bold mb-4">Created Collections</h3>

        {/* Show error messages */}
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

        {/* Show loading state */}
        {loading ? (
          <p>Loading collections...</p>
        ) : (
          <>
            {/* Show collections if available */}
            {createdCollections.length > 0 ? (
              <div className="grid grid-cols-3 gap-6">
                {createdCollections.map((collection, index) => (
                  <button
                    key={index}
                    className="bg-gray-300 px-4 py-2 rounded"
                    onClick={() => navigate(`/collection/created/${collection._id}`)}
                  >
                    {collection.name}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No collections created yet.</p>
            )}
          </>
        )}

        <h3 className="text-2xl font-bold mb-4">Joined Collections</h3>
        
        {/* Show loading state */}
        {loading ? (
          <p>Loading collections...</p>
        ) : (
          <>
            {/* Show joined collections if available */}
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
              <p className="text-gray-500">No collections joined yet.</p>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default HomeLoggedIn;
