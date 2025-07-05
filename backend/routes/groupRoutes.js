const express = require('express');
const { createGroup, getGroups, addFriendToGroup, removeFriendFromGroup } = require('../controllers/groupController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/create', protect, createGroup);
router.get('/', protect, getGroups);
router.put('/add-friend/:groupId', protect, addFriendToGroup);
router.put('/remove-friend/:groupId', protect, removeFriendFromGroup);

module.exports = router;
