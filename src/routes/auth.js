import express from 'express';
import authController from '../controllers/authController.js';

const router = express.Router();

// Đăng ký và đăng nhập
router.post('/register', authController.register);
router.post('/login', authController.login);

// Lấy tất cả người dùng
router.get('/users', authController.getAllUsers);

// Lấy thông tin người dùng theo ID
router.get('/users/:id', authController.getUserById);
// Update người dùngdùng
router.put('/users/:id', authController.updateUser);
// Xóa người dùng
router.delete('/users/:id', authController.deleteUser);



export default router;
