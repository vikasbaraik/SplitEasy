import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

function FriendsPage() {
    const [friends, setFriends] = useState([]);
    const [friendEmail, setFriendEmail] = useState('');
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    useEffect(() => { fetchFriends(); }, []);

    const fetchFriends = async () => {
        const res = await axios.get(`${API_BASE_URL}/api/friends`, config);
        setFriends(res.data);
    };

    const handleAddFriend = async () => {
        await axios.post(`${API_BASE_URL}/api/friends/add`, { friendEmail }, config);
        setFriendEmail('');
        fetchFriends();
    };

    const handleRemoveFriend = async (friendId) => {
        await axios.delete(`${API_BASE_URL}/api/friends/remove`, { data: { friendId }, headers: { Authorization: `Bearer ${token}` } });
        fetchFriends();
    };

    return (
        <div>
            <h2>Your Friends</h2>
            <ul>
                {friends.map(friend => (
                    <li key={friend._id}>
                        {friend.name} ({friend.email})
                        <button onClick={() => handleRemoveFriend(friend._id)}>Remove</button>
                    </li>
                ))}
            </ul>

            <h3>Add Friend by Email</h3>
            <input type="email" value={friendEmail} onChange={(e) => setFriendEmail(e.target.value)} />
            <button onClick={handleAddFriend}>Add Friend</button>
        </div>
    );
}

export default FriendsPage;
