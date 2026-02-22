const mongoose = require('mongoose');
const User = require('./User');

const taskSchema = mongoose.Schema(
    {
        // The Relationship
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',  // This tells Mongoose which model this ID belongs to
            required: true,
        },
        title: {
            type: String,
            required: [true, 'Please add a text value']
        },
        isCompleted: {
            type: Boolean,
            default: false
        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Task', taskSchema);