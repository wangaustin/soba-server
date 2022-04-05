const mongoose = require('mongoose');

const SchoolSchema = new mongoose.Schema({
    // _id: {
    //     type: Number,
    //     required: true,
    // },
    school_name: {
        type: String,
        required: true,
    },
    school_address: {
        type: String,
        required: true,
    },
});

const School = mongoose.model('School', SchoolSchema);
module.exports = School;