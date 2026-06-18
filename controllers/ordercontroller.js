import Order from "../models/Order.js";

// Place Order
export const createOrder = async (req, res) => {
  try {
    console.log("Order Request Body:");
    console.log(req.body);

    const order = await Order.create(req.body);

    res.status(201).json({
      message: "Order Placed Successfully",
      order
    });

  } catch (error) {
    console.log("ORDER ERROR:");
    console.log(error);

    res.status(500).json({
      message: error.message
    });
  }
};

// Get All Orders
export const getOrders = async (req, res) => {
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

// Update Order Status
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        orderStatus: req.body.orderStatus
      },
      {
        new: true
      }
    );

    res.status(200).json({
      message: "Order Status Updated",
      order
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// get user orders

export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      userId: req.params.userId
    }).populate("products.productId");

    res.status(200).json(orders);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};