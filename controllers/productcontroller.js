import Product from "../models/Product.js";

// Add Product
export const addProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      message: "Product Added Successfully",
      product
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Get All Products
export const getProducts = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const category = req.query.category || "";

    const query = {};

    if (keyword) {
      query.name = {
        $regex: keyword,
        $options: "i"
      };
    }

    if (category) {
      query.category = category;
    }

    const products = await Product.find(query);

    res.status(200).json(products);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Get Single Product
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product Not Found"
      });
    }

    res.status(200).json(product);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Update Product
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        message: "Product Not Found"
      });
    }

    res.status(200).json({
      message: "Product Updated Successfully",
      product
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        message: "Product Not Found"
      });
    }

    res.status(200).json({
      message: "Product Deleted Successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
