const Group = require('../models/groupModel');
const User = require('../models/userModel');

// Create Group
const createGroup = async (req, res) => {
    const { name, members } = req.body;

    try {
        const newGroup = await Group.create({
            name,
            members: [...members, req.user._id],
            createdBy: req.user._id
        });
        res.status(201).json(newGroup);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Groups for Logged-in User
const getGroups = async (req, res) => {
    try {
        const groups = await Group.find({ members: req.user._id }).populate('members', 'name email');
        res.json(groups);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add Friend to Group
const addFriendToGroup = async (req, res) => {
    const { groupId } = req.params;
    const { friendId } = req.body;

    try {
        const group = await Group.findById(groupId);
        if (!group) return res.status(404).json({ message: 'Group not found' });

        if (!group.members.includes(friendId)) {
            group.members.push(friendId);
            await group.save();
        }

        res.json(group);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Remove Friend from Group
const removeFriendFromGroup = async (req, res) => {
    const { groupId } = req.params;
    const { friendId } = req.body;

    try {
        const group = await Group.findById(groupId);
        if (!group) return res.status(404).json({ message: 'Group not found' });

        group.members = group.members.filter(member => member.toString() !== friendId);
        await group.save();

        res.json(group);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createGroup, getGroups, addFriendToGroup, removeFriendFromGroup };
