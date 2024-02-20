const express = require("express");
const router = express.Router();
const { registerUser, loginUser, logoutUser } = require('../Controllers/user.controller');
const { upload } = require('../Middlewares/fileUpload.middleware');
const { verifyJWT } = require("../Middlewares/auth.middleware");

router
    .post('/register', upload.fields([{ name: 'avatar' }, { name: 'coverImage' }]), registerUser)
    .post('/login', loginUser)
    // secured routes
    .post('/logout', verifyJWT, logoutUser)

module.exports = router;