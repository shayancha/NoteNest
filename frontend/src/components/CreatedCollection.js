// import React, { useEffect, useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';

// const CreatedCollection = () => {
//   const navigate = useNavigate();
//   const [collections, setCollections] = useState([]); // Store collections from backend
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(true); // Add a loading state

//   // Fetch the created collections from the backend
//   useEffect(() => {
//     const fetchCollections = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           setMessage('No token found');
//           return;
//         }
    
//         const response = await axios.get('/api/collections', {
//           headers: {
//             Authorization: `Bearer ${token}`, // Ensure the token is included
//           },
//         });
//         setCollections(response.data);
//         setLoading(false); // Stop loading when data is fetched
//       } catch (error) {
//         console.error('Error fetching collections', error);
//         setMessage('Error fetching collections');
//         setLoading(false); // Stop loading on error
//       }
//     };

//     fetchCollections();
//   }, []);

//   const handleUploadPdf = () => {
//     navigate('/upload-pdf');
//   };

//   const handleUploadVideo = () => {
//     navigate('/upload-video');
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <header className="bg-gray-300 py-4">
//         <div className="container mx-auto flex justify-between">
//           <button className="text-red-500 text-xl font-bold" onClick={() => navigate('/home-logged-in')}>
//             Ketchup
//           </button>
//           <span className="text-gray-700">Logged in</span>
//         </div>
//       </header>

//       <main className="container mx-auto p-6 text-center">
//         <h2 className="text-3xl font-bold text-red-500 mb-4">Created Collections</h2>

//         {message && <p className="text-red-500 mb-4">{message}</p>}

//         {loading ? (
//           <p>Loading...</p>
//         ) : collections.length > 0 ? (
//           <div className="grid grid-cols-3 gap-6 mb-6">
//             {collections.map((collection, index) => (
//               <div key={index} className="bg-gray-300 p-4 rounded">
//                 <h3 className="text-xl font-bold mb-2">{collection.name}</h3>

//                 {/* Display videos */}
//                 <h4 className="text-lg font-semibold mb-2">Videos:</h4>
//                 {collection.videos.length > 0 ? (
//                   collection.videos.map((video, vidIndex) => (
//                     <Link
//                       key={vidIndex}
//                       to={`/collection/${collection._id}/video/${vidIndex}`}
//                       className="block bg-gray-200 text-xl font-semibold px-6 py-4 rounded mb-2"
//                     >
//                       {`Video ${vidIndex + 1}`}
//                     </Link>
//                   ))
//                 ) : (
//                   <p className="text-gray-600">No videos uploaded</p>
//                 )}

//                 {/* Display PDFs */}
//                 <h4 className="text-lg font-semibold mb-2 mt-4">PDFs:</h4>
//                 {collection.pdfs.length > 0 ? (
//                   collection.pdfs.map((pdf, pdfIndex) => (
//                     <Link
//                       key={pdfIndex}
//                       to={`/collection/${collection._id}/pdf/${pdfIndex}`}
//                       className="block bg-gray-200 text-xl font-semibold px-6 py-4 rounded mb-2"
//                     >
//                       {`PDF ${pdfIndex + 1}`}
//                     </Link>
//                   ))
//                 ) : (
//                   <p className="text-gray-600">No PDFs uploaded</p>
//                 )}

//                 {/* Buttons for inviting others and viewing progress */}
//                 <div className="flex justify-between mt-4">
//                   <button
//                     className="bg-gray-300 px-4 py-2 rounded"
//                     onClick={() => navigate(`/collection/${collection._id}/invite`)}
//                   >
//                     Invite others
//                   </button>
//                   <button
//                     className="bg-gray-300 px-4 py-2 rounded"
//                     onClick={() => navigate(`/collection/${collection._id}/progress`)}
//                   >
//                     View Progress
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-600">No collections created yet.</p>
//         )}

//         {/* Buttons for uploading new PDFs and videos */}
//         <div className="flex justify-center space-x-6 mt-6">
//           <button className="bg-gray-300 px-4 py-2 rounded" onClick={handleUploadPdf}>
//             Upload a PDF
//           </button>
//           <button className="bg-gray-300 px-4 py-2 rounded" onClick={handleUploadVideo}>
//             Upload a Video
//           </button>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default CreatedCollection;







// import React, { useEffect, useState } from 'react';
// import { useNavigate, Link, useParams } from 'react-router-dom'; // Add useParams to get collection _id from URL
// import axios from 'axios';

// const CreatedCollection = () => {
//   const navigate = useNavigate();
//   const { id } = useParams(); // Extract collection _id from URL
//   const [collection, setCollection] = useState(null); // Store the specific collection
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(true); // Add a loading state

//   // Fetch the collection with the specific _id from the backend
//   useEffect(() => {
//     const fetchCollection = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           setMessage('No token found');
//           return;
//         }

//         const response = await axios.get(`/api/collections/${id}`, { // Fetch specific collection by _id
//           headers: {
//             Authorization: `Bearer ${token}`, // Ensure the token is included
//           },
//         });
//         setCollection(response.data); // Store the specific collection
//         setLoading(false); // Stop loading when data is fetched
//       } catch (error) {
//         console.error('Error fetching collection', error);
//         setMessage('Error fetching collection');
//         setLoading(false); // Stop loading on error
//       }
//     };

//     fetchCollection();
//   }, [id]); // Run the effect when the collection ID changes

//   const handleUploadPdf = () => {
//     navigate('/upload-pdf');
//   };

//   const handleUploadVideo = () => {
//     navigate('/upload-video');
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <header className="bg-gray-300 py-4">
//         <div className="container mx-auto flex justify-between">
//           <button className="text-red-500 text-xl font-bold" onClick={() => navigate('/home-logged-in')}>
//             Ketchup
//           </button>
//           <span className="text-gray-700">Logged in</span>
//         </div>
//       </header>

//       <main className="container mx-auto p-6 text-center">
//         <h2 className="text-3xl font-bold text-red-500 mb-4">Collection Details</h2>

//         {message && <p className="text-red-500 mb-4">{message}</p>}

//         {loading ? (
//           <p>Loading...</p>
//         ) : collection ? (
//           <div className="bg-gray-300 p-4 rounded">
//             <h3 className="text-xl font-bold mb-2">{collection.name}</h3>

//             {/* Display videos */}
//             <h4 className="text-lg font-semibold mb-2">Videos:</h4>
//             {collection.videos.length > 0 ? (
//               collection.videos.map((video, vidIndex) => (
//                 <Link
//                   key={vidIndex}
//                   to={`/collection/${collection._id}/video/${vidIndex}`}
//                   className="block bg-gray-200 text-xl font-semibold px-6 py-4 rounded mb-2"
//                 >
//                   {`Video ${vidIndex + 1}`}
//                 </Link>
//               ))
//             ) : (
//               <p className="text-gray-600">No videos uploaded</p>
//             )}

//             {/* Display PDFs */}
//             <h4 className="text-lg font-semibold mb-2 mt-4">PDFs:</h4>
//             {collection.pdfs.length > 0 ? (
//               collection.pdfs.map((pdf, pdfIndex) => (
//                 <Link
//                   key={pdfIndex}
//                   to={`/collection/${collection._id}/pdf/${pdfIndex}`}
//                   className="block bg-gray-200 text-xl font-semibold px-6 py-4 rounded mb-2"
//                 >
//                   {`PDF ${pdfIndex + 1}`}
//                 </Link>
//               ))
//             ) : (
//               <p className="text-gray-600">No PDFs uploaded</p>
//             )}

//             {/* Buttons for inviting others and viewing progress */}
//             <div className="flex justify-between mt-4">
//               <button
//                 className="bg-gray-300 px-4 py-2 rounded"
//                 onClick={() => navigate(`/collection/${collection._id}/invite`)}
//               >
//                 Invite others
//               </button>
//               <button
//                 className="bg-gray-300 px-4 py-2 rounded"
//                 onClick={() => navigate(`/collection/${collection._id}/progress`)}
//               >
//                 View Progress
//               </button>
//             </div>
//           </div>
//         ) : (
//           <p className="text-gray-600">Collection not found.</p>
//         )}

//         {/* Buttons for uploading new PDFs and videos */}
//         <div className="flex justify-center space-x-6 mt-6">
//           <button className="bg-gray-300 px-4 py-2 rounded" onClick={handleUploadPdf}>
//             Upload a PDF
//           </button>
//           <button className="bg-gray-300 px-4 py-2 rounded" onClick={handleUploadVideo}>
//             Upload a Video
//           </button>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default CreatedCollection;




import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const CreatedCollection = () => {
  const { id } = useParams(); // Get the collection ID from the route
  const navigate = useNavigate();
  const [collection, setCollection] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch the specific collection by ID from the backend
  useEffect(() => {
    
    const fetchCollection = async () => {
      try {
        const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;
        if (!token) {
          setMessage('User not authenticated. Please log in again.');
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(`http://localhost:5001/api/collections/api/collections/${id}`, config); // Fetch collection by ID

        setCollection(response.data); // Set the collection data
        setLoading(false);
      } catch (error) {
        console.error('Error fetching collection:', error);
        setMessage('Error fetching collection.');
        setLoading(false);
      }
    };

    fetchCollection();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gray-300 py-4">
        <div className="container mx-auto flex justify-between">
          <button className="text-red-500 text-xl font-bold" onClick={() => navigate('/home-logged-in')}>
            Ketchup
          </button>
          <span className="text-gray-700">Logged in</span>
        </div>
      </header>

      <main className="container mx-auto p-6 text-center">

        {message && <p className="text-red-500 mb-4">{message}</p>}

        {loading ? (
          <p>Loading...</p>
        ) : collection ? (
          <div>
            <h2 className="text-3xl font-bold text-red-500 mb-4">{collection.name}</h2>

            {/* Display the join code */}
            <p className="text-lg font-bold mb-4">Join Code: {collection.joinCode ? collection.joinCode : 'No join code available'}</p>


            {/* Display videos */}
            <h4 className="text-lg font-semibold mb-2">Videos:</h4>
            {collection.videos.length > 0 ? (
              collection.videos.map((video, vidIndex) => (
                <Link
                  key={vidIndex}
                  to={`/collection/${collection._id}/video/${vidIndex}`}
                  className="block bg-gray-200 text-xl font-semibold px-6 py-4 rounded mb-2"
                >
                  {`Video ${vidIndex + 1}`}
                </Link>
              ))
            ) : (
              <p className="text-gray-600">No videos uploaded</p>
            )}

            {/* Display PDFs */}
            <h4 className="text-lg font-semibold mb-2 mt-4">PDFs:</h4>
            {collection.pdfs.length > 0 ? (
              collection.pdfs.map((pdf, pdfIndex) => (
                <Link
                  key={pdfIndex}
                  to={`/collection/${collection._id}/pdf/${pdfIndex}`}
                  className="block bg-gray-200 text-xl font-semibold px-6 py-4 rounded mb-2"
                >
                  {`PDF ${pdfIndex + 1}`}
                </Link>
              ))
            ) : (
              <p className="text-gray-600">No PDFs uploaded</p>
            )}

            <div className="flex justify-center space-x-6 mt-6">
              <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => navigate('/upload-pdf')}>
                Upload a PDF
              </button>
              <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => navigate('/upload-video')}>
                Upload a Video
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Collection not found.</p>
        )}
      </main>
    </div>
  );
};

export default CreatedCollection;

