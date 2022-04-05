const mongoose = require('mongoose');

const MIN_REVIEW_STAR = 1;
const MAX_REVIEW_STAR = 5;

const ReviewSchema = new mongoose.Schema({
    // what dorm this review is for
    // _id: {
    //     type: Number,
    //     required: true,
    // },
    review_dorm_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    review_user: {
        type: String,
        required: true,
    },
    review_rating: {
        type: Number,
        min: MIN_REVIEW_STAR,
        max: MAX_REVIEW_STAR,
        required: true,
    },
    review_message: {
        type: String,
        required: true,
    },
});

const Review = mongoose.model('Review', ReviewSchema);
module.exports = Review;