import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/';

function GroupPage() {
    const [groups, setGroups] = useState([]);
    const [groupName, setGroupName] = useState('');
    const [friends, setFriends] = useState([]);
    const [selectedFriends, setSelectedFriends] = useState([]);

    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    // Fetch Groups and Friends on Load
    useEffect(() => {
        fetchGroups();
        fetchFriends();
    }, []);

    const fetchGroups = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}api/groups`, config);
            setGroups(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchFriends = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}api/friends`, config); // Replace with actual friends API when ready
            setFriends(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCreateGroup = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_BASE_URL}api/groups/create`, { name: groupName, members: selectedFriends }, config);
            setGroupName('');
            setSelectedFriends([]);
            fetchGroups(); // Refresh group list
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddFriend = async (groupId, friendId) => {
        try {
            await axios.put(`${API_BASE_URL}/api/groups/add-friend/${groupId}`, { friendId }, config);
            fetchGroups();
        } catch (error) {
            console.error(error);
        }
    };

    const handleRemoveFriend = async (groupId, friendId) => {
        try {
            await axios.put(`${API_BASE_URL}/api/groups/remove-friend/${groupId}`, { friendId }, config);
            fetchGroups();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Your Groups</h2>
            <ul>
                {groups.map(group => (
                    <li key={group._id}>
                        <h3>{group.name}</h3>
                        <p>Members:</p>
                        <ul>
                            {group.members.map(member => (
                                <li key={member._id}>
                                    {member.name} ({member.email})
                                    <button onClick={() => handleRemoveFriend(group._id, member._id)}>Remove</button>
                                </li>
                            ))}
                        </ul>

                        <h4>Add Friend:</h4>
                        <select onChange={(e) => handleAddFriend(group._id, e.target.value)}>
                            <option>Select Friend</option>
                            {friends.filter(f => !group.members.find(m => m._id === f._id)).map(friend => (
                                <option key={friend._id} value={friend._id}>{friend.name}</option>
                            ))}
                        </select>
                    </li>
                ))}
            </ul>

            <h2>Create Group</h2>
            <form onSubmit={handleCreateGroup}>
                <input type="text" value={groupName} onChange={(e) => setGroupName(e.target.value)} placeholder="Group Name" required />
                <h4>Select Members:</h4>
                {friends.map(friend => (
                    <div key={friend._id}>
                        <input
                            type="checkbox"
                            value={friend._id}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setSelectedFriends([...selectedFriends, friend._id]);
                                } else {
                                    setSelectedFriends(selectedFriends.filter(id => id !== friend._id));
                                }
                            }}
                        />
                        {friend.name}
                    </div>
                ))}
                <button type="submit">Create Group</button>
            </form>
        </div>
    );
}

export default GroupPage;
