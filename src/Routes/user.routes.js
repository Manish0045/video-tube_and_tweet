const express = require("express");
const router = express.Router();
const { registerUser } = require('../Controllers/user.controller');
const { upload } = require('../Middlewares/fileUpload.middleware');

router
    .post('/register', upload.fields([{ name: 'avatar' }, { name: 'coverImage' }]), registerUser)

module.exports = router;