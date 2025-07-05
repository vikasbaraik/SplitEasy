const User = require('../models/userModel');

// Get Friends
const getFriends = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('friends', 'name email');
        res.json(user.friends);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add Friend
const addFriend = async (req, res) => {
    const { friendEmail } = req.body;

    try {
        const friend = await User.findOne({ email: friendEmail });
        if (!friend) return res.status(404).json({ message: 'Friend not found' });

        const user = await User.findById(req.user._id);
        if (user.friends.includes(friend._id)) {
            return res.status(400).json({ message: 'Friend already added' });
        }

        user.friends.push(friend._id);
        await user.save();

        res.json({ message: 'Friend added successfully', friends: user.friends });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Remove Friend
const removeFriend = async (req, res) => {
    const { friendId } = req.body;

    try {
        const user = await User.findById(req.user._id);
        user.friends = user.friends.filter(f => f.toString() !== friendId);
        await user.save();

        res.json({ message: 'Friend removed successfully', friends: user.friends });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getFriends, addFriend, removeFriend };
