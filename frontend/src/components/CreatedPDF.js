import React from 'react';
import { useNavigate } from 'react-router-dom';

const CreatedPDF = () => {
  const navigate = useNavigate();
  const students = [
    { name: 'Student 1', progress: '75%', questions: 3 },
    { name: 'Student 2', progress: '60%', questions: 5 },
    { name: 'Student 3', progress: '90%', questions: 2 },
    { name: 'Student 4', progress: '30%', questions: 4 },
    { name: 'Student 5', progress: '85%', questions: 1 },
    { name: 'Student 6', progress: '50%', questions: 0 },
    { name: 'Student 7', progress: '70%', questions: 4 },
  ];

  // Function to calculate the color based on progress (HSL color model)
  const getProgressBarColor = (progress) => {
    const progressValue = parseInt(progress, 10); // Convert '75%' to 75

    if (progressValue <= 32) {
      // Red scale: HSL from (0°, 100%, 30%) to (0°, 100%, 70%)
      const lightness = 30 + (progressValue / 32) * 40; // Scale from 30% to 70%
      return `hsl(0, 100%, ${lightness}%)`;
    } else if (progressValue <= 66) {
      // Yellow/Orange scale: HSL from (30°, 100%, 50%) to (60°, 100%, 60%)
      const hue = 30 + ((progressValue - 33) / 33) * 30; // Scale from 30° to 60°
      const lightness = 50 + ((progressValue - 33) / 33) * 10; // Scale from 50% to 60%
      return `hsl(${hue}, 100%, ${lightness}%)`;
    } else {
      // Green scale: HSL from (90°, 50%, 50%) to (120°, 50%, 40%)
      const hue = 90 + ((progressValue - 67) / 33) * 30; // Scale from 90° to 120°
      const lightness = 50 - ((progressValue - 67) / 33) * 10; // Scale from 50% to 40%
      return `hsl(${hue}, 50%, ${lightness}%)`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gray-300 py-4">
        <div className="container mx-auto flex justify-between">
          <button className="text-red-500 text-xl font-bold" onClick={() => navigate('/home-logged-in')}>
            NoteNest
          </button>
          <span className="text-gray-700">Logged in</span>
        </div>
      </header>

      <main className="container mx-auto p-6">
        <h2 className="text-3xl font-bold text-red-500 mb-4" onClick={() => navigate('/created1/replace-pdf')}>
          Created PDF 1
        </h2>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-gray-300 p-10">[PDF Preview]</div>

          <div>
            <button className="bg-gray-300 px-4 py-2 rounded mb-4">Replace PDF</button>

            <table className="table-auto w-full bg-white shadow rounded-lg">
              <thead>
                <tr>
                  <th className="px-4 py-2">Student</th>
                  <th className="px-4 py-2">Progress</th>
                  <th className="px-4 py-2">Questions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{student.name}</td>
                    <td className="border px-4 py-2">
                      <div className="w-full bg-gray-300 h-5 rounded relative">
                        <div
                          className="h-5 rounded"
                          style={{
                            width: student.progress,
                            backgroundColor: getProgressBarColor(student.progress),
                          }}
                        ></div>
                        <span className="absolute top-0 left-2">{student.progress}</span>
                      </div>
                    </td>
                    <td className="border px-4 py-2">{student.questions}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <button className="bg-red-500 text-white px-4 py-2 mt-4 rounded">Delete PDF</button>
      </main>
    </div>
  );
};

export default CreatedPDF;
