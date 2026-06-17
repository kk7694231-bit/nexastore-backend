import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

// Dashboard
export const getDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalProducts = await Product.countDocuments();

    const totalOrders = await Order.countDocuments();

    const orders = await Order.find();

    const totalRevenue = orders.reduce(
      (sum, order) => sum + (order.totalAmount || 0),
      0
    );

    res.status(200).json({
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Get All Users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json(users);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Get All Orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId")
      .populate("products.productId");

    res.status(200).json(orders);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// get analytics

export const getAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalProducts = await Product.countDocuments();

    const totalOrders = await Order.countDocuments();

    const orders = await Order.find();

    const totalRevenue = orders.reduce(
      (sum, order) => sum + (order.totalAmount || 0),
      0
    );

    const recentOrders = await Order.find()
  .sort({ createdAt: -1 })
  .limit(5);

const salesHistory = await Order.aggregate([
  {
    $group: {
      _id: {
        $dateToString: {
          format: "%Y-%m-%d",
          date: "$createdAt"
        }
      },
      revenue: {
        $sum: "$totalAmount"
      },
      orders: {
        $sum: 1
      }
    }
  },
  {
    $sort: {
      _id: 1
    }
  }
]);

res.status(200).json({
  totalUsers,
  totalProducts,
  totalOrders,
  totalRevenue,
  recentOrders,
  salesHistory
});

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};