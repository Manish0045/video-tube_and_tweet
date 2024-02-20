const asyncHandler = require("../Utils/asyncHandler");
const { ApiError } = require("../Utils/ApiError");
const { jwt } = require("jsonwebtoken");
const User = require("../Models/user.model")

const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            throw new ApiError(401, "Unauthorized access request")
        }

        const decodedToken = await jwt.verify(token, process.env.ACCESS_TOKE_SECRET);

        const user = await User.findById(decodedToken._id).select("-password -refreshToken");
        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        }

        req.user = user;
        next();

    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }
})

module.exports = { verifyJWT };