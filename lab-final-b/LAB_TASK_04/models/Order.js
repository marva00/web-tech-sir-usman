
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        name: String,
        price: Number,
        quantity: {
            type: Number,
            default: 1
        }
    }],
    grandTotal: {
        type: Number,
        required: true
    },
    customerEmail: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Placed', 'Processing', 'Delivered'],
        default: 'Placed'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
