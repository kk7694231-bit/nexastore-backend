import Wishlist from "../models/Wishlist.js";

// Add To Wishlist
export const addToWishlist = async (req, res) => {
  try {
    const wishlistItem = await Wishlist.create(req.body);

    res.status(201).json({
      message: "Added To Wishlist",
      wishlistItem
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// View Wishlist
export const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find()
      .populate("userId")
      .populate("productId");

    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Remove Wishlist Item
export const removeWishlistItem = async (req, res) => {
  try {
    await Wishlist.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Removed From Wishlist"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};