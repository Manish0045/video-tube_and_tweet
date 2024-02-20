const express = require("express");
const router = express.Router();
const { registerUser } = require('../Controllers/user.controller');
const { upload } = require('../Middlewares/fileUpload.middleware');

router
    .post('/register', upload.fields([{ name: "avatar", maxCount: 1 }, { name: "coverImage", maxCount: 1 }]), registerUser)

module.exports = router;