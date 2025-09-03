const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    name: String,
    event: String,
    rating: Number,
    text: String,
    date: String,
})

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;