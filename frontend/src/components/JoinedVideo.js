import React, { useState, useRef, useEffect } from 'react'; // Added useEffect
import { useNavigate, useLocation } from 'react-router-dom'; // Added useLocation for getting collection and material IDs
import axios from 'axios'; // Added axios for making API calls

const JoinedVideo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const videoRef = useRef(null); // To track the video element for getting timestamps

  // Retrieve collectionId and videoFileId from location state
  const collectionId = location.state?.collectionId;
  const materialId = location.state?.videoFileId;
  
  // State to manage notes, new question input, list of posted questions, and editing state
  const [notes, setNotes] = useState('');
  const [isEditingNotes, setIsEditingNotes] = useState(false); // Tracks if the user is editing notes
  const [newQuestion, setNewQuestion] = useState(''); // For adding new questions
  const [questionsList, setQuestionsList] = useState([]); // List of posted questions
  const [editingIndex, setEditingIndex] = useState(null); // Tracks the question being edited
  const [editingQuestion, setEditingQuestion] = useState(''); // Holds the question being edited
  const [progress, setProgress] = useState(null); // For storing user progress

  // Function to toggle between editing and saving notes
  const handleEditNotes = () => {
    if (isEditingNotes) {
      // When saving notes, disable the textarea
      setIsEditingNotes(false);
    } else {
      // When editing, enable the textarea
      setIsEditingNotes(true);
    }
    saveProgress(); // Save progress when notes are saved
  };

  // Function to handle posting a new question with a timestamp
  const postQuestion = () => {
    if (newQuestion.trim() !== '') {
      const videoTime = videoRef.current?.currentTime || 0; // Get current video time in seconds

      // Add the new question with the timestamp to the list of posted questions
      setQuestionsList([...questionsList, { text: newQuestion, timestamp: videoTime }]);
      setNewQuestion(''); // Clear the input field after posting

      saveProgress(); // Save progress when a question is posted
    }
  };

  // Function to format time in seconds into a readable format (MM:SS or HH:MM:SS)
  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return h > 0 ? `${h}:${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}` : `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Function to handle clicking the timestamp and setting the video time
  const jumpToTime = (time) => {
    if (videoRef.current && !isNaN(time)) {
      videoRef.current.currentTime = time;
    }
  };

  // Function to handle editing a posted question
  const handleEditQuestion = (index) => {
    setEditingIndex(index); // Set the question being edited
    setEditingQuestion(questionsList[index].text); // Copy the current question text to editing state

    saveProgress();
  };

  // Function to save the edited question
  const saveEditedQuestion = () => {
    const updatedQuestions = [...questionsList];
    updatedQuestions[editingIndex].text = editingQuestion; // Update the question text
    setQuestionsList(updatedQuestions); // Save the updated question list
    setEditingIndex(null); // Stop editing mode

    saveProgress(); // Save progress when a question is edited
  };

  // Function to delete a question
  const deleteQuestion = (index) => {
    const updatedQuestions = questionsList.filter((_, i) => i !== index); // Remove the selected question
    setQuestionsList(updatedQuestions); // Update the list of questions

    saveProgress(); // Save progress when a question is deleted
  };

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(`/api/progress?collectionId=${collectionId}&materialId=${materialId}&materialType=video`, config); 
        setProgress(response.data); // Set the progress state (notes, questions, etc.)
      } catch (error) {
        console.error('Error fetching progress:', error);
      }
    };
  
    fetchProgress();
  }, [collectionId, materialId]);

  // Function to save progress (calls backend)
  const saveProgress = async () => {
    try {
      const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const timestamp = videoRef.current?.currentTime || 0; // Get the current video time

      const data = {
        collectionId,
        materialId,
        materialType: 'video', // Type is 'video'
        progress: timestamp, // Save the current video timestamp
        notes,
        questions: questionsList, // Save the list of questions
      };
  
      await axios.post('/api/progress', data, config);
    } catch (error) {
      console.error('Error saving progress:', error);
    }
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
        <h2 className="text-3xl font-bold text-red-500 mb-4">Joined Video Viewer</h2>

        <div className="grid grid-cols-2 gap-6">
          {/* Video Player */}
          <div className="p-0">
            <video
              ref={videoRef} // Reference to the video element
              controls
              width="100%"
              className="rounded"
              style={{ height: 'auto' }}
            >
              <source src="/videos/example-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Stacked Notes and Question Section */}
          <div className="grid grid-cols-1 gap-6">
            {/* Notes Section */}
            <div>
              <h3 className="text-xl font-bold">Notes</h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add notes"
                className={`border rounded w-full h-40 p-2 mt-4 ${isEditingNotes ? '' : 'bg-gray-200 cursor-not-allowed'}`}
                disabled={!isEditingNotes} // Disable if not editing
              ></textarea>
              <button
                onClick={handleEditNotes}
                className="bg-green-400 px-4 py-2 mt-4 rounded text-white"
              >
                {isEditingNotes ? 'Save' : 'Edit'} {/* Button text toggles between Edit and Save */}
              </button>
            </div>

            {/* New Question Section */}
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

            {/* Display Posted Questions */}
            <div className="bg-white p-4 mt-6 rounded shadow">
              <h4 className="text-xl font-bold mb-2">Posted Questions</h4>
              {questionsList.length > 0 ? (
                <ul className="list-none">
                  {questionsList.map((q, index) => (
                    <li key={index} className="text-gray-700 mb-4">
                      <div className="flex items-center justify-between">
                        <textarea
                          value={index === editingIndex ? editingQuestion : q.text} // Display the editing text if editing
                          onChange={(e) => setEditingQuestion(e.target.value)} // Track changes only during editing
                          className={`border rounded w-full p-2 ${index === editingIndex ? '' : 'bg-gray-200 cursor-not-allowed'}`}
                          disabled={index !== editingIndex} // Enable editing only for the selected question
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
                          {/* Delete Button */}
                          <button
                            onClick={() => deleteQuestion(index)}
                            className="bg-red-400 px-4 py-2 rounded text-white"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-1 text-sm text-gray-500">
                        <a
                          href="#"
                          onClick={() => jumpToTime(q.timestamp)}
                          className="text-blue-500 underline"
                        >
                          {formatTime(q.timestamp)}
                        </a>
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

export default JoinedVideo;
