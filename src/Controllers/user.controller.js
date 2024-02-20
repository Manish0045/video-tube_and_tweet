const User = require("../Models/user.model");
const asyncHandler = require("../Utils/asyncHandler");


const registerUser = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: "OK"
    })
})

module.exports = { registerUser };