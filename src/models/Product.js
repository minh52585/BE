import mongoose from 'mongoose';

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
    images: {
        type: String,
    },
    quantity: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        enum: ['Còn hàng', 'Hết hàng'],
        default: 'Còn hàng',
    }
}, {
    timestamps: true 
});

const Product = mongoose.model('Product', productSchema);

export default Product;