const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        status: {
            type: Boolean,
            default: false,
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true, // Disable Mongoose timestamps (use createdAt and updatedAt fields instead)
    }
);

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
