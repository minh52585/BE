// 📁 controllers/orderController.js
import Order from "../models/order.js";
import Variant from "../models/variant.js";
import Product from '../models/Product.js';

import Discount from "../models/discount.js"; // nếu bạn có schema giảm giá

export const addOrder = async (req, res, next) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const {
      address,
      addressNote,
      shippingMethod,
      items,
      note,
      shippingFee = 0,
      discount_id,
    } = req.body;

    // 1. Tính tổng giá sản phẩm
    const subTotal = items.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);

    // 2. Tính giá trị giảm (nếu có)
    let discountValue = 0;

    if (discount_id) {
      const discount = await Discount.findById(discount_id).lean();
      if (discount) {
        if (discount.type === "percent") {
          discountValue = (subTotal * discount.value) / 100;
        } else {
          discountValue = discount.value;
        }
      }
    }

    // 3. Tính tổng tiền phải trả
    const totalAmount = subTotal - discountValue + shippingFee;

    const newOrder = await Order.create({
      user_id: req.user._id,
      address,
      addressNote,
      shippingMethod,
      items,
      note,
      shippingFee,
      totalAmount,
      discount_id: discount_id || null,
      status: "pending",
      paymentStatus: "unpaid",
    });

    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
};



export const getAllOrders = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Chỉ admin được phép xem tất cả đơn hàng" });
    }
    const orders = await Order.find()
      .populate("user_id", "fullname email phoneNumber")
      .populate("discount_id");
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};



export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user_id', 'fullname email phoneNumber')
      .populate('discount_id')
      .lean();

    if (!order) {
      return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
    }

    if (req.user.role !== 'admin' && order.user_id._id.toString() !== req.user._id) {
      return res.status(403).json({ message: 'Bạn không có quyền xem đơn hàng này' });
    }

    const variantIds = order.items.map(i => i.variant_id).filter(Boolean).map(id => id.toString());
    const productIds = order.items.map(i => i.product_id).filter(Boolean).map(id => id.toString());

    const [variants, products] = await Promise.all([
      Variant.find({ _id: { $in: variantIds } }).lean(),
      Product.find({ _id: { $in: productIds } }, '_id name imageUrl').lean()
    ]);

    const variantMap = new Map(variants.map(v => [v._id.toString(), { _id: v._id.toString(), format: v.format }]));
    const productMap = new Map(products.map(p => [
      p._id.toString(),
      { _id: p._id.toString(), name: p.name, image: p.imageUrl } // ✅ thêm image
    ]));

    order.items = order.items.map(item => {
      return {
        ...item,
        variant_id: item.variant_id
          ? variantMap.get(item.variant_id.toString()) || { _id: item.variant_id.toString(), format: '' }
          : undefined,
        product_id: productMap.get(item.product_id.toString()) || { _id: item.product_id.toString(), name: '', image: '' },
        image: productMap.get(item.product_id.toString())?.image || '' // ✅ set image riêng
      };
    });

    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};






export const updateOrderStatus = async (req, res, next) => {
  try {
    const { status, paymentStatus } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Không tìm thấy đơn hàng" });

    if (req.user.role !== "admin" && order.user_id.toString() !== req.user._id) {
      return res.status(403).json({ message: "Không có quyền cập nhật đơn này" });
    }

    if (status) order.status = status;
    if (paymentStatus) order.paymentStatus = paymentStatus;
    await order.save();

    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

export const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Không tìm thấy đơn hàng" });

    if (req.user.role !== "admin" && order.user_id.toString() !== req.user._id) {
      return res.status(403).json({ message: "Không có quyền xoá đơn này" });
    }

    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Xoá đơn thành công" });
  } catch (error) {
    next(error);
  }
};
