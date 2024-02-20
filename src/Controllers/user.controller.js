const User = require("../Models/user.model");
const asyncHandler = require("../Utils/asyncHandler");
const { ApiError } = require("../Utils/ApiError");
const { uploadOnCloudinary } = require("../Utils/cloudinary");
const ApiResponse = require("../Utils/ApiResponse");

const registerUser = asyncHandler(async (req, res) => {
    const { username, password, fullname, email } = req.body;
    // console.log("email: " + email);

    // if (!fullname || !email || !username || !password) {
    //     throw new ApiError(401, "Enter all required fields");
    // }


    if ([username, password, fullname, email].some((field) => field?.trim() === "")) {
        throw new ApiError(401, "Fields cannot be empty!");
    }

    let existedUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existedUser) {
        throw new ApiError(409, "User already exists");
    }

    // console.log(req.files);
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;
    const avatarLocalPath = req.files?.avatar[0]?.path;
    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path;
    }
    // console.log(avatarLocalPath);
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar is not found");
    }

    // upload on cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);
    if (!avatar) {
        throw new ApiError(400, "Avatar is not found");
    }

    const user = await User.create({
        username: username.toLowerCase(),
        email,
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        password
    });


    const createdUser = await User.findById(user._id).select("-password -refreshToken");
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while creating the user");
    }

    return res.status(201).json(
        new ApiResponse(201, createdUser, "User registered successfully")
    )
})

module.exports = { registerUser };