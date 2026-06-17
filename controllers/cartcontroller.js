import Cart from "../models/Cart.js";

// Add To Cart
export const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    const cartItem = await Cart.create({
      userId,
      productId,
      quantity
    });

    res.status(201).json({
      message: "Product Added To Cart",
      cartItem
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// View Cart
export const getCart = async (req, res) => {
  try {
    const cartItems = await Cart.find()
      .populate("productId")
      .populate("userId");

    res.status(200).json(cartItems);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Remove Cart Item
export const removeCartItem = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Item Removed From Cart"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Update Cart Item Quantity (Optional)
export const updateCartQuantity = async (req, res) => {
  try {
    const { quantity } = req.body;

    const cartItem = await Cart.findByIdAndUpdate(
      req.params.id,
      { quantity },
      { new: true }
    );

    if (!cartItem) {
      return res.status(404).json({
        message: "Cart Item Not Found"
      });
    }

    res.status(200).json({
      message: "Quantity Updated",
      cartItem
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};