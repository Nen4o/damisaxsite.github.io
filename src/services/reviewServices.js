const Review = require('../models/Review');

const createReview = (data) => {
    return Review.create(data);
}

const getAllReviews = () => {
    return Review.find({});
}
module.exports = {
    createReview,
    getAllReviews,
}