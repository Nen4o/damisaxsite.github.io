const Image = require('../models/Image');

const createImage = (data) => {
    return Image.create(data);
}

const getImageByName = (imgName) => {
    return Image.findOne({ imgName })
}

module.exports = {
    createImage,
    getImageByName,
}