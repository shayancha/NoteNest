// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Viewer, Worker } from '@react-pdf-viewer/core'; // Import Viewer and Worker
// import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // Import defaultLayoutPlugin
// import '@react-pdf-viewer/core/lib/styles/index.css'; // Import styles for the viewer
// import '@react-pdf-viewer/default-layout/lib/styles/index.css'; // Import styles for the default layout

// const JoinedPDF = () => {
//   const navigate = useNavigate();
//   const [notes, setNotes] = useState('');
//   const [isEditingNotes, setIsEditingNotes] = useState(false);
//   const [newQuestion, setNewQuestion] = useState('');
//   const [questionsList, setQuestionsList] = useState([]);
//   const [editingIndex, setEditingIndex] = useState(null);
//   const [editingQuestion, setEditingQuestion] = useState('');
//   const [currentPage, setCurrentPage] = useState(1); // Track the current page
//   const [totalPages, setTotalPages] = useState(null);

//   // Initialize the default layout plugin
//   const defaultLayoutPluginInstance = defaultLayoutPlugin();

//   // Function to handle when a page changes in the viewer
//   const onPageChange = (e) => {
//     const newPage = e.currentPage + 1; // Add +1 to fix the off-by-one issue
//     setCurrentPage(newPage); // Update the current page when the user navigates
//   };

//   const handleEditNotes = () => {
//     setIsEditingNotes(!isEditingNotes);
//   };

//   const postQuestion = () => {
//     if (newQuestion.trim() !== '') {
//       setQuestionsList([...questionsList, { text: newQuestion, page: currentPage }]); // Capture the current page when the question is posted
//       setNewQuestion(''); // Clear the input field
//     }
//   };

//   const handleEditQuestion = (index) => {
//     setEditingIndex(index);
//     setEditingQuestion(questionsList[index].text);
//   };

//   const saveEditedQuestion = () => {
//     const updatedQuestions = [...questionsList];
//     updatedQuestions[editingIndex].text = editingQuestion;
//     setQuestionsList(updatedQuestions);
//     setEditingIndex(null);
//   };

//   // Function to delete a question
//   const deleteQuestion = (index) => {
//     const updatedQuestions = questionsList.filter((_, i) => i !== index); // Remove the selected question
//     setQuestionsList(updatedQuestions);
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

//       <main className="container mx-auto p-6">
//         <h2 className="text-3xl font-bold text-red-500 mb-4">Joined PDF 1</h2>

//         <div className="grid grid-cols-2 gap-6">
//           <div className="p-0">
//             {/* PDF Viewer Section with the default layout plugin */}
//             <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
//               <div style={{ height: '600px' }}>
//                 <Viewer
//                   fileUrl="/pdfs/example-pdf.pdf"
//                   plugins={[defaultLayoutPluginInstance]} // Pass the plugin for layout with navigation
//                   onPageChange={onPageChange} // Detect page change
//                   onDocumentLoadSuccess={({ numPages }) => setTotalPages(numPages)} // Set the total number of pages on load
//                 />
//               </div>
//             </Worker>
//           </div>

//           {/* Notes and Question Section */}
//           <div className="grid grid-cols-1 gap-6">
//             <div>
//               <h3 className="text-xl font-bold">Notes</h3>
//               <textarea
//                 value={notes}
//                 onChange={(e) => setNotes(e.target.value)}
//                 placeholder="Add notes"
//                 className={`border rounded w-full h-40 p-2 mt-4 ${isEditingNotes ? '' : 'bg-gray-200 cursor-not-allowed'}`}
//                 disabled={!isEditingNotes}
//               ></textarea>
//               <button
//                 onClick={handleEditNotes}
//                 className="bg-green-400 px-4 py-2 mt-4 rounded text-white"
//               >
//                 {isEditingNotes ? 'Save' : 'Edit'}
//               </button>
//             </div>

//             <div>
//               <h3 className="text-xl font-bold">Add a Question</h3>
//               <textarea
//                 value={newQuestion}
//                 onChange={(e) => setNewQuestion(e.target.value)}
//                 placeholder="Add a new question"
//                 className="border rounded w-full h-40 p-2 mt-4"
//               ></textarea>
//               <button
//                 onClick={postQuestion}
//                 className="bg-green-400 px-4 py-2 mt-4 rounded text-white"
//               >
//                 Post Question
//               </button>
//             </div>

//             <div className="bg-white p-4 mt-6 rounded shadow">
//               <h4 className="text-xl font-bold mb-2">Posted Questions</h4>
//               {questionsList.length > 0 ? (
//                 <ul className="list-none">
//                   {questionsList.map((q, index) => (
//                     <li key={index} className="text-gray-700 mb-4">
//                       <div className="flex items-center justify-between">
//                         <textarea
//                           value={index === editingIndex ? editingQuestion : q.text}
//                           onChange={(e) => setEditingQuestion(e.target.value)}
//                           className={`border rounded w-full p-2 ${index === editingIndex ? '' : 'bg-gray-200 cursor-not-allowed'}`}
//                           disabled={index !== editingIndex}
//                         ></textarea>
//                         <div className="ml-4 flex space-x-2">
//                           {index === editingIndex ? (
//                             <button
//                               onClick={saveEditedQuestion}
//                               className="bg-green-400 px-4 py-2 rounded text-white"
//                             >
//                               Save
//                             </button>
//                           ) : (
//                             <button
//                               onClick={() => handleEditQuestion(index)}
//                               className="bg-blue-400 px-4 py-2 rounded text-white"
//                             >
//                               Edit
//                             </button>
//                           )}
//                           {/* Delete Button */}
//                           <button
//                             onClick={() => deleteQuestion(index)}
//                             className="bg-red-400 px-4 py-2 rounded text-white"
//                           >
//                             Delete
//                           </button>
//                         </div>
//                       </div>
//                       <div className="flex justify-between items-center mt-1 text-sm text-gray-500">
//                         <span>Page {q.page}</span> {/* Show the page number */}
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p className="text-gray-500">No questions posted yet.</p>
//               )}
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default JoinedPDF;


import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const JoinedPDF = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [notes, setNotes] = useState('');
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [questionsList, setQuestionsList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingQuestion, setEditingQuestion] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [totalPages, setTotalPages] = useState(null);

  // Get the PDF URL from location state
  const pdfUrl = location.state?.pdfUrl;

  // Initialize the default layout plugin
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const onPageChange = (e) => {
    const newPage = e.currentPage + 1;
    setCurrentPage(newPage);
  };

  const handleEditNotes = () => {
    setIsEditingNotes(!isEditingNotes);
  };

  const postQuestion = () => {
    if (newQuestion.trim() !== '') {
      setQuestionsList([...questionsList, { text: newQuestion, page: currentPage }]);
      setNewQuestion('');
    }
  };

  const handleEditQuestion = (index) => {
    setEditingIndex(index);
    setEditingQuestion(questionsList[index].text);
  };

  const saveEditedQuestion = () => {
    const updatedQuestions = [...questionsList];
    updatedQuestions[editingIndex].text = editingQuestion;
    setQuestionsList(updatedQuestions);
    setEditingIndex(null);
  };

  const deleteQuestion = (index) => {
    const updatedQuestions = questionsList.filter((_, i) => i !== index);
    setQuestionsList(updatedQuestions);
  };

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

      <main className="container mx-auto p-6">
        <h2 className="text-3xl font-bold text-red-500 mb-4">Joined PDF Viewer</h2>

        <div className="grid grid-cols-2 gap-6">
          <div className="p-0">
            {/* PDF Viewer Section */}
            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
              <div style={{ height: '600px' }}>
                {pdfUrl ? (
                  <Viewer
                    fileUrl={pdfUrl} // Use the actual PDF URL passed from the JoinedCollection component
                    plugins={[defaultLayoutPluginInstance]}
                    onPageChange={onPageChange}
                    onDocumentLoadSuccess={({ numPages }) => setTotalPages(numPages)}
                  />
                ) : (
                  <p>No PDF available</p>
                )}
              </div>
            </Worker>
          </div>

          {/* Notes and Question Section */}
          <div className="grid grid-cols-1 gap-6">
            <div>
              <h3 className="text-xl font-bold">Notes</h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add notes"
                className={`border rounded w-full h-40 p-2 mt-4 ${isEditingNotes ? '' : 'bg-gray-200 cursor-not-allowed'}`}
                disabled={!isEditingNotes}
              ></textarea>
              <button
                onClick={handleEditNotes}
                className="bg-green-400 px-4 py-2 mt-4 rounded text-white"
              >
                {isEditingNotes ? 'Save' : 'Edit'}
              </button>
            </div>

            <div>
              <h3 className="text-xl font-bold">Add a Question</h3>
              <textarea
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                placeholder="Add a new question"
                className="border rounded w-full h-40 p-2 mt-4"
              ></textarea>
              <button
                onClick={postQuestion}
                className="bg-green-400 px-4 py-2 mt-4 rounded text-white"
              >
                Post Question
              </button>
            </div>

            <div className="bg-white p-4 mt-6 rounded shadow">
              <h4 className="text-xl font-bold mb-2">Posted Questions</h4>
              {questionsList.length > 0 ? (
                <ul className="list-none">
                  {questionsList.map((q, index) => (
                    <li key={index} className="text-gray-700 mb-4">
                      <div className="flex items-center justify-between">
                        <textarea
                          value={index === editingIndex ? editingQuestion : q.text}
                          onChange={(e) => setEditingQuestion(e.target.value)}
                          className={`border rounded w-full p-2 ${index === editingIndex ? '' : 'bg-gray-200 cursor-not-allowed'}`}
                          disabled={index !== editingIndex}
                        ></textarea>
                        <div className="ml-4 flex space-x-2">
                          {index === editingIndex ? (
                            <button
                              onClick={saveEditedQuestion}
                              className="bg-green-400 px-4 py-2 rounded text-white"
                            >
                              Save
                            </button>
                          ) : (
                            <button
                              onClick={() => handleEditQuestion(index)}
                              className="bg-blue-400 px-4 py-2 rounded text-white"
                            >
                              Edit
                            </button>
                          )}
                          <button
                            onClick={() => deleteQuestion(index)}
                            className="bg-red-400 px-4 py-2 rounded text-white"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-1 text-sm text-gray-500">
                        <span>Page {q.page}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No questions posted yet.</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JoinedPDF;

