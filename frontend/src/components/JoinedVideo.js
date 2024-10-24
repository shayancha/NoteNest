import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header'; // Adjust path based on your file structure

const JoinedVideo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const collectionId = location.state?.collectionId;
  const videoFileId = location.state?.videoFileId;
  const materialId = videoFileId;

  const [notes, setNotes] = useState('');
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [questionsList, setQuestionsList] = useState([]);
  const [currentTime, setCurrentTime] = useState(0); // Track current timestamp
  const [totalDuration, setTotalDuration] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingQuestion, setEditingQuestion] = useState('');

  const videoUrl = location.state?.videoUrl;

  const videoRef = useRef(null);

  // Fetch user progress when the component mounts
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(`http://localhost:5001/api/progress/${collectionId}/video/${materialId}`, config);
        if (response.data) {
          setCurrentTime(response.data.progress || 0); // Set current time from progress
          setNotes(response.data.notes || '');
          setQuestionsList(response.data.questions);
        }
      } catch (error) {
        console.error('Error fetching progress:', error);
      }
    };
  
    fetchProgress();
  }, [collectionId, materialId]);

  useEffect(() => {
    if (questionsList.length > 0 && !isEditingNotes){
      saveProgress();
    }
  }, [questionsList, currentTime, isEditingNotes]);

  // Save progress function
  const saveProgress = async () => {
    try {
      const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const data = {
        collectionId,
        materialId,
        materialType: 'video',
        progress: currentTime, // Save current timestamp as progress
        notes: notes,
        questions: questionsList,
      };
      await axios.post('http://localhost:5001/api/progress', data, config);
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  // Handle time update in the video player
  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setTotalDuration(videoRef.current.duration);
  };

  // Handle notes editing
  const handleEditNotes = () => {
    setIsEditingNotes(!isEditingNotes);
  };

  // Handle posting a new question
  const postQuestion = () => {
    if (newQuestion.trim() !== '') {
      setQuestionsList([...questionsList, { text: newQuestion, timestamp: currentTime }]);
      setNewQuestion('');
    }
  };

  // Handle editing an existing question
  const handleEditQuestion = (index) => {
    setEditingIndex(index);
    setEditingQuestion(questionsList[index].text);
  };

  // Handle saving an edited question
  const saveEditedQuestion = () => {
    const updatedQuestions = [...questionsList];
    updatedQuestions[editingIndex].text = editingQuestion;
    setQuestionsList(updatedQuestions);
    setEditingIndex(null);
  };

  // Handle deleting a question
  const deleteQuestion = (index) => {
    const updatedQuestions = questionsList.filter((_, i) => i !== index);
    setQuestionsList(updatedQuestions);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="container mx-auto p-6">
        <h2 className="text-3xl font-bold text-red-500 mb-4">Video Viewer</h2>

        <div className="grid grid-cols-2 gap-6">
          <div className="p-0">
            {/* Video Player Section */}
            {videoUrl ? (
              <video
                ref={videoRef}
                controls
                src={videoUrl}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                style={{ width: '100%', height: 'auto' }}
              />
            ) : (
              <p>No video available</p>
            )}
          </div>

          {/* Notes and Questions Section */}
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
                        <span>Timestamp {Math.floor(q.timestamp)} seconds</span>
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

