const express = require("express");
const router = express.Router();
const userRoutes = require("./user.routes");

router.use('/v1/users', userRoutes)

module.exports = router;