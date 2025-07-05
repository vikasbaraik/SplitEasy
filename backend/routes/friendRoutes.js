const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const { getFriends, addFriend, removeFriend } = require('../controllers/friendController');

const router = express.Router();

router.get('/', protect, getFriends);
router.post('/add', protect, addFriend);
router.delete('/remove', protect, removeFriend);

module.exports = router;
