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
    stock: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        enum: ['available', 'out of stock'],
        default: 'available',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }

});

module.exports = mongoose.model('Product', productSchema);