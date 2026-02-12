const mongoose = require('mongoose');

const taskSchema = mongoose.Schema(
    {
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