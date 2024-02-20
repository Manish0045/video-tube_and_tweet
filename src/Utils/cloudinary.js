const { v2: cloudinary } = require('cloudinary');
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const uploadOnCloudinary = async (filePath) => {
    try {
        if (!filePath) return false;
        // Upload the file
        const response = await cloudinary.uploader.upload(filePath);
        // Successfully uploaded the file
        // console.log("File Uploaded on cloudinary successfully", response.url);
        fs.unlinkSync(filePath);
        return response;
    } catch (error) {
        console.error('Cloudinary Upload Error:', error);
        fs.unlinkSync(filePath);//removes local temporary file
        return null;
        // return null;
    }
}

module.exports = { uploadOnCloudinary };