import React, { useEffect, useState } from 'react';
import axios from 'axios';

function GroupsPage() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/')
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
