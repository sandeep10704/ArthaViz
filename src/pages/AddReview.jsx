import React, { useState } from 'react';
import axios from 'axios';

const AddReview = () => {
  const [reviewText, setReviewText] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [stars, setStars] = useState(5);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewData = {
      reviewText,
      customerName,
      stars
    };

    try {
      const response = await axios.post('https://arthaserve-1.onrender.com/home/reviews', reviewData);
      console.log(response.data);
      setMessage('Review submitted successfully!');
      setReviewText('');
      setCustomerName('');
      setStars(5);
    } catch (error) {
      console.error(error);
      setMessage('Failed to submit review. Please try again.');
    }
  };

  return (
    <div style={{
      maxWidth: '500px',
      margin: '20px auto',
      padding: '20px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      borderRadius: '8px',
      background: '#fff'
    }}>
      <h2 style={{ textAlign: 'center' }}>Add a Review</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Customer Name:</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Review Text:</label>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            required
            rows="4"
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          ></textarea>
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Stars:</label>
          <input
            type="number"
            min="1"
            max="5"
            value={stars}
            onChange={(e) => setStars(parseInt(e.target.value))}
            required
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Submit Review
        </button>
      </form>
      {message && (
        <p style={{ marginTop: '15px', textAlign: 'center' }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default AddReview;
