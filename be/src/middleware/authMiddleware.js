import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Thêm .js vào đường dẫn

const protect = async (req, res, next) => {
  let token;

  // Kiểm tra token trong header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Lấy token từ header
      token = req.headers.authorization.split(' ')[1];

      // Giải mã token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Lấy thông tin người dùng (trừ mật khẩu)
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Không được phép, token không hợp lệ' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Không được phép, không có token' });
  }
};

export { protect }; // Thay module.exports bằng export