const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: String,
    class: Number,
    subject: String,
    type: String,
    creator: String,
    fileUrl: String,
    fileType: String,
    thumbnailUrl: String,
    size: String,
},
{ timestamps: true });

const CourseModel = mongoose.model('Course', courseSchema);

module.exports = CourseModel;
