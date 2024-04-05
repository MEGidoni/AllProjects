const { register, login, getUserInfo , logout } = require('../controllers/UserController');
const { auth, adminAuth } = require('../middleWares/auth');
require('dotenv').config();
const router = require('express').Router();
router.post('/register', register);
router.post('/login', login);
router.post('/testauth', auth , getUserInfo);
router.post('/logout', logout);















module.exports = router ;