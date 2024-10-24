import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header'; // Adjust path based on your file structure

const ViewSpecificStudentProgress = () => {
  const navigate = useNavigate();
  const progressData = [
    { resource: 'Video 1', progress: '15%', questions: 3 },
    { resource: 'Video 2', progress: '100%', questions: 0 },
    { resource: 'Video 3', progress: '50%', questions: 2 },
    { resource: 'PDF 1', progress: '60%', questions: 4 },
    { resource: 'PDF 2', progress: '30%', questions: 1 },
    { resource: 'PDF 3', progress: '90%', questions: 5 },
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
      <Header />

      <main className="container mx-auto p-6">
        <h2 className="text-3xl font-bold text-red-500 mb-4">Student 1</h2>

        <table className="table-auto w-full bg-white shadow rounded-lg">
          <thead>
            <tr>
              <th className="px-4 py-2">Resource</th>
              <th className="px-4 py-2">Progress</th>
              <th className="px-4 py-2">Questions</th>
            </tr>
          </thead>
          <tbody>
            {progressData.map((item, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{item.resource}</td>
                <td className="border px-4 py-2">
                  <div className="w-full bg-gray-300 h-5 rounded relative">
                    <div
                      className="h-5 rounded"
                      style={{
                        width: item.progress,
                        backgroundColor: getProgressBarColor(item.progress),
                      }}
                    ></div>
                    <span className="absolute top-0 left-2">{item.progress}</span>
                  </div>
                </td>
                <td className="border px-4 py-2">{item.questions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default ViewSpecificStudentProgress;
