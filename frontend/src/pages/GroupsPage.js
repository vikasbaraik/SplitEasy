import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/';

function GroupsPage() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get(API_BASE_URL)
      .then(response => setMessage(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Groups Page</h1>
      <p>{message}</p>
    </div>
  );
}

export default GroupsPage;
