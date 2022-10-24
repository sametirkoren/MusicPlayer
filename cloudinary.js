const cloudinary = require('cloudinary')

cloudinary.config({
    cloud_name: "sametirkoren",
    api_key: "936685859177225",
    api_secret: "K6mqPNB0sjXnOW2DZODnntW6we4",
});

module.exports = {cloudinary}