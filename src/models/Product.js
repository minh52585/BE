const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    },
    category: {
        type: String,
    },
    imageUrl: {
        type: String,
    },
    rating: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            comment: String,
            rating: Number,
            date: { type: Date, default: Date.now },
        },
    ],
});

module.exports = mongoose.model('Product', productSchema);