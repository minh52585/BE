import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js'; // nhớ thêm .js nếu dùng ES modules

const authController = {
  register: async (req, res) => {
    const { fullname, email, password, phoneNumber, address } = req.body;

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email đã được sử dụng' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        fullname,
        email,
        password: hashedPassword,
        phoneNumber,
        address,
      });

      await newUser.save();

      res.status(201).json({ message: 'Đăng ký thành công' });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server', error });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Email không tồn tại' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Sai mật khẩu' });
      }

      const token = jwt.sign(
        {
          userId: user._id,
          email: user.email,
          fullname: user.fullname,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.json({
        token,
        user: {
          fullname: user.fullname,
          email: user.email,
          phoneNumber: user.phoneNumber,
          address: user.address,
        },
      });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi server', error });
    }
  },
};

export default authController;
