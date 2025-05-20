import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const authController = {
  register: async (req, res) => {
    const { fullname, email, password, phoneNumber, address } = req.body;

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email đã được sử dụng" });
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

      res.status(201).json({ message: "Đăng ký thành công" });
    } catch (error) {
      res.status(500).json({ message: "Lỗi server", error });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Email không tồn tại" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Sai mật khẩu" });
      }

      const token = jwt.sign(
        {
          userId: user._id,
          email: user.email,
          fullname: user.fullname,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
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
      res.status(500).json({ message: "Lỗi server", error });
    }
  },

  updateUser: async (req, res) => {
    const { id } = req.params;
    const { fullname, phoneNumber, address } = req.body;

    try {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { fullname, phoneNumber, address },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "Người dùng không tồn tại" });
      }

      res.json({ message: "Cập nhật thành công", user: updatedUser });
    } catch (error) {
      res.status(500).json({ message: "Lỗi server", error });
    }
  },

  deleteUser: async (req, res) => {
    const { id } = req.params;

    try {
      const deletedUser = await User.findByIdAndDelete(id);

      if (!deletedUser) {
        return res.status(404).json({ message: "Người dùng không tồn tại" });
      }

      res.json({ message: "Xóa người dùng thành công" });
    } catch (error) {
      res.status(500).json({ message: "Lỗi server", error });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await User.find(); // Ẩn mật khẩu
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Lỗi server", error });
    }
  },
  getUserById: async (req, res) => {
    const { id } = req.params;

    try {
      const user = await User.findById(id).select("-password");

      if (!user) {
        return res.status(404).json({ message: "Không tìm thấy người dùng" });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Lỗi server", error });
    }
  },
};

export default authController;
