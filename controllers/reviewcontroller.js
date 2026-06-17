import Review from "../models/Review.js";

// Add Review
export const addReview = async (req, res) => {
  try {
    const review = await Review.create(req.body);

    res.status(201).json({
      message: "Review Added Successfully",
      review
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Get Reviews By Product
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      productId: req.params.productId
    }).populate("userId");

    res.status(200).json(reviews);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};