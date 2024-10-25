import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header'; // Adjust path based on your file structure

const JoinedCollection = () => {
  const navigate = useNavigate();
  const { collectionId } = useParams(); // Get the collectionId from the route parameters
  const [collection, setCollection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // Function to handle navigation to the JoinedPDF page and pass the PDF file path
  const viewPDF = (pdfFile) => {
    const pdfFilePath = pdfFile.filePath.startsWith('uploads/') 
      ? pdfFile.filePath 
      : `uploads/${pdfFile.filePath}`;
    
    const pdfUrl = `http://localhost:5001/${pdfFilePath}`;

    const pdfFileId = pdfFile._id;

    navigate('/joined-pdf', { state: { collectionId, pdfFileId, pdfUrl } });
  };

  // Function to handle navigation to the JoinedVideo page and pass the video file path
  const viewVideo = (videoFile) => {
    console.log("Video File: ", videoFile.filePath);
    const videoFilePath = videoFile.filePath.startsWith('uploads/') 
      ? videoFile.filePath
      : `uploads/${videoFile.filePath}`;
    
    const videoFileId = videoFile._id;
    const videoUrl = `http://localhost:5001/${videoFilePath}`;
    
    navigate('/joined-video', { state: { collectionId, videoFileId, videoUrl} });
  };

  // Fetch collection data when the component is mounted
  useEffect(() => {
    const fetchCollection = async () => {
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

        const response = await axios.get(`http://localhost:5001/api/collections/api/collections/${collectionId}`, config);
        setCollection(response.data); // Set collection data
        setLoading(false);
      } catch (error) {
        console.error('Error fetching collection:', error);
        setErrorMessage('Error fetching collection. Please try again.');
        setLoading(false);
      }
    };

    fetchCollection();
  }, [collectionId]);

  if (loading) {
    return <p>Loading collection...</p>;
  }

  if (errorMessage) {
    return <p className="text-red-500">{errorMessage}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Reusable Header component */}
      <Header />

      {/* Main content */}
      <main className="container mx-auto p-6">
        {/* Collection Name */}
        <h1 className="text-3xl font-bold text-red-500 mb-4">{collection?.name}</h1>

        {/* Button for viewing progress */}
        <button className="bg-gray-300 px-4 py-2 rounded mb-6">
          View Your Progress
        </button>

        {/* Display Videos */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Videos:</h2>
          <div className="grid grid-cols-3 gap-6">
            {collection?.videos.length > 0 ? (
              collection.videos.map((video, index) => (
                <div key={index} className="bg-gray-300 px-4 py-2 rounded text-center">
                  <button onClick={() => viewVideo(video)}>
                    {video.originalName || `Video ${index + 1}`} {/* Display actual video name */}
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No videos uploaded</p>
            )}
          </div>
        </div>

        {/* Display PDFs */}
        <div>
          <h2 className="text-xl font-bold mb-2">PDFs:</h2>
          <div className="grid grid-cols-3 gap-6">
            {collection?.pdfs.length > 0 ? (
              collection.pdfs.map((pdf, index) => (
                <div key={index} className="bg-gray-300 px-4 py-2 rounded text-center">
                  <button onClick={() => viewPDF(pdf)}>
                    {pdf.originalName || `PDF ${index + 1}`} {/* Display actual PDF name */}
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No PDFs uploaded</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default JoinedCollection;


// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Header from './Header'; // Adjust path based on your file structure

// const JoinedCollection = () => {
//   const navigate = useNavigate();
//   const { collectionId } = useParams(); // Get the collectionId from the route parameters
//   const [collection, setCollection] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [errorMessage, setErrorMessage] = useState('');

//   // Function to handle navigation to the JoinedPDF page and pass the PDF file path
//   const viewPDF = (pdfFile) => {
//     const pdfFilePath = pdfFile.filePath.startsWith('uploads/') 
//       ? pdfFile.filePath 
//       : `uploads/${pdfFile.filePath}`;
    
//     const pdfUrl = `http://localhost:5001/${pdfFilePath}`;
//     const pdfFileId = pdfFile._id;

//     navigate('/joined-pdf', { state: { collectionId, pdfFileId, pdfUrl } });
//   };

//   // Function to handle navigation to the JoinedVideo page and pass the video file path
//   const viewVideo = (videoFile) => {
//     console.log("Video File: ", videoFile.filePath);
//     const videoFilePath = videoFile.filePath.startsWith('uploads/') 
//       ? videoFile.filePath
//       : `uploads/${videoFile.filePath}`;
    
//     const videoFileId = videoFile._id;
//     const videoUrl = `http://localhost:5001/${videoFilePath}`;
    
//     navigate('/joined-video', { state: { collectionId, videoFileId, videoUrl} });
//   };

//   // Fetch collection data when the component is mounted
//   useEffect(() => {
//     const fetchCollection = async () => {
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

//         const response = await axios.get(`http://localhost:5001/api/collections/${collectionId}`, config);
//         setCollection(response.data); // Set collection data
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching collection:', error);
//         setErrorMessage('Error fetching collection. Please try again.');
//         setLoading(false);
//       }
//     };

//     fetchCollection();
//   }, [collectionId]);

//   if (loading) {
//     return <p>Loading collection...</p>;
//   }

//   if (errorMessage) {
//     return <p className="text-red-500">{errorMessage}</p>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Reusable Header component */}
//       <Header />

//       {/* Main content */}
//       <main className="container mx-auto p-6">
//         {/* Collection Name */}
//         <h1 className="text-3xl font-bold text-red-500 mb-4">{collection?.name}</h1>

//         {/* Button for viewing progress */}
//         <button className="bg-gray-300 px-4 py-2 rounded mb-6">
//           View Your Progress
//         </button>

//         {/* Display Videos */}
//         <div className="mb-6">
//           <h2 className="text-xl font-bold mb-2">Videos:</h2>
//           <div className="grid grid-cols-3 gap-6">
//             {collection?.videos.length > 0 ? (
//               collection.videos.map((video, index) => (
//                 <div key={index} className="bg-gray-300 px-4 py-2 rounded text-center">
//                   <button onClick={() => viewVideo(video)}>
//                     {video.originalName || `Video ${index + 1}`} {/* Display actual video name */}
//                   </button>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-500">No videos uploaded</p>
//             )}
//           </div>
//         </div>

//         {/* Display PDFs */}
//         <div>
//           <h2 className="text-xl font-bold mb-2">PDFs:</h2>
//           <div className="grid grid-cols-3 gap-6">
//             {collection?.pdfs.length > 0 ? (
//               collection.pdfs.map((pdf, index) => (
//                 <div key={index} className="bg-gray-300 px-4 py-2 rounded text-center">
//                   <button onClick={() => viewPDF(pdf)}>
//                     {pdf.originalName || `PDF ${index + 1}`} {/* Display actual PDF name */}
//                   </button>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-500">No PDFs uploaded</p>
//             )}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default JoinedCollection;
