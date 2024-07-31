import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ScanPage = () => {
  const { id } = useParams();
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const checkId = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/check/${id}`);
        if (response.data.used) {
          setStatus('expired');
        } else {
          await axios.post(`http://localhost:5000/api/use/${id}`);
          setStatus('valid');
        }
      } catch (error) {
        setStatus('error');
      }
    };

    checkId();
  }, [id]);

  return (
    <div>
      <p>Is working</p>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'valid' && <p>ID is valid! Welcome!</p>}
      {status === 'expired' && <p>This ID has expired.</p>}
      {status === 'error' && <p>There was an error processing your request.</p>}
    </div>
  );
};

export default ScanPage;
