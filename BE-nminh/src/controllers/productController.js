import Product from "../models/Product.js";


// getall
export const getAllProducts = async (req, res, next) => {
	try {
		const products = await Product.find();
		res.json({ success: true, data: products });
	} catch (error) {
		next(error);
	}
};

// getbyid
export const getProductById = async (req, res, next) => {
	try {
		const product = await Product.findById(req.params.id);
		if (!product) {
			return res.status(404).json({
				success: false, message: "Không tìm thấy sản phẩm"
			});
		}
		res.json({ success: true, data: product });
	} catch (error) {
		next(error);
	}
};

// add
export const addProduct = async (req, res, next) => {
	try {
		const newProduct = new Product(req.body);
		await newProduct.save();
		res.status(201).json({
			success: true, data: newProduct
		});
	} catch (error) {
		next(error);
	}
}

// update
export const updateProduct = async (req, res, next) => {
	try {
		const updatedProduct = await Product.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);
		if (!updatedProduct) {
			return res.status(404).json({
				success: false, message: "Không tìm thấy sản phẩm"
			});
		}
		res.json({
			success: true, data: updatedProduct
		});
	} catch (error) {
		next(error);
	}
}

// delete
export const deleteProduct = async (req, res, next) => {
	try {
		const deletedProduct = await Product.findByIdAndDelete(req.params.id);
		if (!deletedProduct) {
			return res.status(404).json({ success: false, message: "Không tìm thấy sản phẩm" });
		}
		res.json({
			success: true, message: "Xóa sản phẩm thành công"
		});
	} catch (error) {
		next(error);
	}
}




