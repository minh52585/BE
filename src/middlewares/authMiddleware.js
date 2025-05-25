import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../configs/enviroments.js";

// Middleware xác thực người dùng
export const verifyToken = (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return res.status(401).json({ message: "Unauthorized" });
	}

	const token = authHeader.split(" ")[1];

	try {
		const decoded = jwt.verify(token, JWT_SECRET);
		req.user = decoded; // Gán user đã giải mã vào request
		next();
	} catch (error) {
		res.status(401).json({ message: "Invalid token" });
	}
};

// Middleware kiểm tra quyền admin
export const isAdmin = (req, res, next) => {
	if (req.user?.role !== "admin") {
		return res.status(403).json({ message: "Access denied. Admins only." });
	}
	next();
};
