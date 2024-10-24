// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const ViewStudentProgress = () => {
//   const navigate = useNavigate();
//   const students = [
//     'Student 1',
//     'Student 2',
//     'Student 3',
//     'Student 4',
//     'Student 5',
//     'Student 6',
//     'Student 7'
//   ];

//   const goToStudentProgress = (student) => {
//     const studentId = student.toLowerCase().replace(' ', ''); 
//     navigate(`/created1/view-student-progress/${studentId}`);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <header className="bg-gray-300 py-4">
//         <div className="container mx-auto flex justify-between">
//           <button className="text-red-500 text-xl font-bold" onClick={()=>navigate('/home-logged-in')}>Ketchup</button>
//           <span className="text-gray-700">Logged in</span>
//         </div>
//       </header>

//       <main className="container mx-auto p-6 text-center">
//         <h2 className="text-3xl font-bold text-red-500 mb-4">View Student Progress</h2>

//         <div className="grid grid-cols-3 gap-6">
//           {students.map((student, index) => (
//             <button
//               key={index}
//               className="bg-gray-300 text-xl font-semibold px-6 py-4 rounded"
//               onClick={() => goToStudentProgress(student)}
//             >
//               {student}
//             </button>
//           ))}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default ViewStudentProgress;


import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './Header'; // Adjust path based on your file structure

const ViewStudentProgress = () => {
  const { collectionId, materialId } = useParams(); // Get the collectionId and materialId from the route
  const [studentsProgress, setStudentsProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(`http://localhost:5001/api/progress/${collectionId}/${materialId}/students`, config);
        
        if (Array.isArray(response.data['progressData'])) {
          setStudentsProgress(response.data['progressData']);  // Set collections to the array if it's directly in responseJoined.data
        } else {
          setStudentsProgress([]);  // Default to an empty array if no collections are found
        }
        setLoading(false);
      } catch (error) {
        setError('Error fetching student progress.');
        setLoading(false);
      }
    };

    fetchProgressData();
  }, [collectionId, materialId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
  
      <main className="container mx-auto p-6">
        <h2 className="text-3xl font-bold text-red-500 mb-4">Student Progress</h2>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Student</th>
              <th className="px-4 py-2">Progress</th>
              <th className="px-4 py-2">Questions</th>
              <th className="px-4 py-2">Notes</th>
            </tr>
          </thead>
          <tbody>
            {studentsProgress.map((progress, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{progress.userId.name}</td>
                <td className="border px-4 py-2">
                  {/* Assuming progress is for PDFs or videos */}
                  {progress.materialType === 'pdf' ? (
                    <div style={{ width: `${progress.progress}%`, backgroundColor: 'green', height: '20px' }}></div>
                  ) : (
                    <span>{progress.progress} seconds</span>
                  )}
                </td>
                <td className="border px-4 py-2">
                  {progress.questions.length > 0 ? (
                    <ul>
                      {progress.questions.map((q, qIndex) => (
                        <li key={qIndex}>
                          {q.text} - {q.timestamp || q.page}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No questions</p>
                  )}
                </td>
                <td className="border px-4 py-2">{progress.notes || 'No notes'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
  
};

export default ViewStudentProgress;
