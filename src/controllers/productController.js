const Product = require("../models/product.model");
export const getAllProducts = async () => {
	try {
		const products = await Product.find();
		res.json({ success: true, data: products });
	} catch (error) {
		next(error);
	}
};
