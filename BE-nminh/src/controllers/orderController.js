import Order from "../models/order.js"

// get all orders
export const getAllOrders = async (req, res, next) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
}

//getorderById
export const getOrderById = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({
                success: false, message: "Không tìm thấy đơn hàng"
            });
        }
        res.status(200).json(order);
    } catch (error) {
        next(error);
    }
}

//addOrder
export const addOrder = async (req, res, next) => {
    try {
        const newOrder = new Order(req.body);
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        next(error);
    }
}

//updateOrder
export const updateOrder = async (req, res, next) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        if (!updatedOrder) {
            return res.status(404).json({
                success: false, message: "Không tìm thấy đơn hàng"
            });
        }
        res.status(200).json(updatedOrder);
    } catch (error) {
        next(error);
    }
}

//deleteOrder
export const deleteOrder = async (req, res, next) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) {
            return res.status(404).json({
                success: false, message: "Không tìm thấy đơn hàng"
            });
        }
        res.status(200).json({
            success: true, message: "Đơn hàng đã được xóa"
        });
    } catch (error) {
        next(error);
    }
}