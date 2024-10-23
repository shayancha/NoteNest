import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CollectionDetails = () => {
  const { id } = useParams(); // Get the collection ID from the URL
  const [collection, setCollection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(`http://localhost:5001/api/collections/${id}`, config);
        setCollection(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching collection details');
        setLoading(false);
      }
    };

    fetchCollection();
  }, [id]);

  if (loading) return <p>Loading collection...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-red-500 mb-4">{collection.name}</h2>
      <div>
        <h3 className="text-xl font-bold">PDFs:</h3>
        {collection.pdfs.length > 0 ? (
          collection.pdfs.map((pdf, index) => <p key={index}>{pdf}</p>)
        ) : (
          <p>No PDFs available</p>
        )}
      </div>
      <div>
        <h3 className="text-xl font-bold">Videos:</h3>
        {collection.videos.length > 0 ? (
          collection.videos.map((video, index) => <p key={index}>{video}</p>)
        ) : (
          <p>No videos available</p>
        )}
      </div>
    </div>
  );
};

export default CollectionDetails;
