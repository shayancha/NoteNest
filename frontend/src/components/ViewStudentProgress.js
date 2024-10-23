import React from 'react';
import { useNavigate } from 'react-router-dom';

const ViewStudentProgress = () => {
  const navigate = useNavigate();
  const students = [
    'Student 1',
    'Student 2',
    'Student 3',
    'Student 4',
    'Student 5',
    'Student 6',
    'Student 7'
  ];

  const goToStudentProgress = (student) => {
    const studentId = student.toLowerCase().replace(' ', ''); 
    navigate(`/created1/view-student-progress/${studentId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gray-300 py-4">
        <div className="container mx-auto flex justify-between">
          <button className="text-red-500 text-xl font-bold" onClick={()=>navigate('/home-logged-in')}>Ketchup</button>
          <span className="text-gray-700">Logged in</span>
        </div>
      </header>

      <main className="container mx-auto p-6 text-center">
        <h2 className="text-3xl font-bold text-red-500 mb-4">View Student Progress</h2>

        <div className="grid grid-cols-3 gap-6">
          {students.map((student, index) => (
            <button
              key={index}
              className="bg-gray-300 text-xl font-semibold px-6 py-4 rounded"
              onClick={() => goToStudentProgress(student)}
            >
              {student}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ViewStudentProgress;
