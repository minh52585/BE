import Order from "../models/order.js"

// Lấy tất cả đơn hàng
export const getAllOrders = async (req, res, next) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        next(error)
    }
};

// Lấy đơn hàng theo ID
export const getOrderById = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
        }
        res.status(200).json(order);
    } catch (error) {
        next(error);
    }
};

// Thêm đơn hàng
export const addOrder = async (req, res, next) => {
    try {
        const newOrder = new Order(req.body);
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        next(error)
    }
}

// Cập nhật đơn hàng
export const updateOrder = async (req, res, next) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        if (!updatedOrder) {
            return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
        }
        res.status(200).json(updatedOrder);
    } catch (error) {
        next(error);
    }
}

// Xóa đơn hàng
export const deleteOrder = async (req, res, next) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) {
            return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
        }
        res.status(200).json({ message: "Xóa đơn hàng thành công" });
    } catch (error) {
        next(error);
    }
}