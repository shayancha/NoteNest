// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const JoinedCollection = () => {
//   const navigate = useNavigate();

//   // Function to handle navigation to the JoinedPDF page and pass the PDF file path
//   const viewPDF = (pdfFile) => {
//     console.log("PDF File: ", pdfFile); // Add this to check what `pdfFile` looks like
  
//     // Ensure there's no duplicate "uploads/uploads" in the path
//     const pdfFilePath = pdfFile.filePath.startsWith('uploads/') 
//       ? pdfFile.filePath 
//       : `uploads/${pdfFile.filePath}`;
  
//     console.log("Corrected PDF File Path: ", pdfFilePath); // Log to verify path
  
//     const pdfUrl = `http://localhost:5001/${pdfFilePath}`;
//     console.log("PDF URL: ", pdfUrl); // Add this to verify the URL being constructed
//     navigate('/joined-pdf', { state: { pdfUrl } });
//   };

//   const { collectionId } = useParams(); // Assuming you're passing collectionId via the route params
//   const [collection, setCollection] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [errorMessage, setErrorMessage] = useState('');

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

//         const response = await axios.get(`http://localhost:5001/api/collections/api/collections/${collectionId}`, config);
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
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-3xl font-bold text-red-500 mb-4">{collection?.name}</h1>

//       {/* Button for viewing progress */}
//       <button className="bg-gray-300 px-4 py-2 rounded mb-6">
//         View Your Progress
//       </button>

//       {/* Display Videos */}
//       <div className="mb-6">
//         <h2 className="text-xl font-bold mb-2">Videos:</h2>
//         <div className="grid grid-cols-3 gap-6">
//           {collection?.videos.length > 0 ? (
//             collection.videos.map((video, index) => (
//               <div key={index} className="bg-gray-300 px-4 py-2 rounded text-center">
//                 <a href={video.filePath} target="_blank" rel="noopener noreferrer">
//                   Video {index + 1}
//                 </a>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500">No videos uploaded</p>
//           )}
//         </div>
//       </div>

//       {/* Display PDFs */}
//       <div>
//         <h2 className="text-xl font-bold mb-2">PDFs:</h2>
//         <div className="grid grid-cols-3 gap-6">
//           {collection?.pdfs.length > 0 ? (
//             collection.pdfs.map((pdf, index) => (
//               <button key={index} onClick={() => viewPDF(pdf.filePath)}>
//                 {pdf.filePath ? `PDF ${index + 1}` : `PDF ${index + 1} (No file path)`}
//               </button>
//             ))
//           ) : (
//             <p className="text-gray-500">No PDFs uploaded</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JoinedCollection;





// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const JoinedCollection = () => {
//   const navigate = useNavigate();

//   // Function to handle navigation to the JoinedPDF page and pass the PDF file path
//   const viewPDF = (pdfFile) => {
//     try {
//       console.log("PDF File: ", pdfFile); // Add this to check what `pdfFile` looks like

//       if (!pdfFile) {
//         throw new Error("PDF file path is undefined or null.");
//       }

//       // Ensure there's no duplicate "uploads/uploads" in the path
//       const pdfFilePath = pdfFile.startsWith('uploads/')
//         ? pdfFile
//         : `uploads/${pdfFile}`;

//       console.log("Corrected PDF File Path: ", pdfFilePath); // Log to verify path

//       const pdfUrl = `http://localhost:5001/${pdfFilePath}`;
//       console.log("PDF URL: ", pdfUrl); // Add this to verify the URL being constructed

//       // Navigate to the PDF view page and pass the URL in state
//       navigate('/joined-pdf', { state: { pdfUrl } });
//     } catch (error) {
//       console.error("Error viewing PDF:", error.message);
//       alert(`Failed to open PDF. Error: ${error.message}`);
//     }
//   };

//   const { collectionId } = useParams(); // Assuming you're passing collectionId via the route params
//   const [collection, setCollection] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [errorMessage, setErrorMessage] = useState('');

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

//         const response = await axios.get(`http://localhost:5001/api/collections/api/collections/${collectionId}`, config);
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
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-3xl font-bold text-red-500 mb-4">{collection?.name}</h1>

//       {/* Button for viewing progress */}
//       <button className="bg-gray-300 px-4 py-2 rounded mb-6">
//         View Your Progress
//       </button>

//       {/* Display Videos */}
//       <div className="mb-6">
//         <h2 className="text-xl font-bold mb-2">Videos:</h2>
//         <div className="grid grid-cols-3 gap-6">
//           {collection?.videos.length > 0 ? (
//             collection.videos.map((video, index) => (
//               <div key={index} className="bg-gray-300 px-4 py-2 rounded text-center">
//                 <a href={video.filePath} target="_blank" rel="noopener noreferrer">
//                   Video {index + 1}
//                 </a>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500">No videos uploaded</p>
//           )}
//         </div>
//       </div>

//       {/* Display PDFs */}
//       <div>
//         <h2 className="text-xl font-bold mb-2">PDFs:</h2>
//         <div className="grid grid-cols-3 gap-6">
//           {collection?.pdfs.length > 0 ? (
//             collection.pdfs.map((pdf, index) => (
//               <button key={index} onClick={() => viewPDF(pdf.filePath)}>
//                 {pdf.filePath ? `PDF ${index + 1}` : `PDF ${index + 1} (No file path)`}
//               </button>
//             ))
//           ) : (
//             <p className="text-gray-500">No PDFs uploaded</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JoinedCollection;




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
                    Video {index + 1}
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
                <button key={index} onClick={() => viewPDF(pdf)}>
                  {pdf.filePath ? `PDF ${index + 1}` : `PDF ${index + 1} (No file path)`}
                </button>
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
