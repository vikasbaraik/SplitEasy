import axios from 'axios';
import React, { useEffect, useState } from 'react';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

function ProtectedTestPage() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchProtected = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };
                const res = await axios.get(`${API_BASE_URL}/api/protected`, config);
                setMessage(res.data.message);
            } catch (error) {
                setMessage(error.response.data.message);
            }
        };

        fetchProtected();
    }, []);

    return (
        <div>
            <h2>Protected Page</h2>
            <p>{message}</p>
        </div>
    );
}

export default ProtectedTestPage;
