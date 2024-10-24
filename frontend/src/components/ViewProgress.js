import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header'; // Adjust path based on your file structure

const ViewProgress = () => {
  const navigate = useNavigate();
  const progressData = [
    { resource: 'Video 1', progress: '80%', questions: 3 },
    { resource: 'Video 2', progress: '100%', questions: 0 },
    { resource: 'Video 3', progress: '50%', questions: 1 },
    { resource: 'PDF 1', progress: '60%', questions: 2 },
    { resource: 'PDF 2', progress: '40%', questions: 4 },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="container mx-auto p-6">
        <h2 className="text-3xl font-bold text-red-500 mb-4">Your Progress</h2>

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
                <td className="border px-4 py-2">{item.progress}</td>
                <td className="border px-4 py-2">{item.questions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default ViewProgress;
