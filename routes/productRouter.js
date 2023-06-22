import express from "express";
import Product from "../models/productmodel.js";

const router = express.Router();

// get product by id 
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.status(200).json({ product });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to fetch product");
  }
});

// add a new product
router.post("/new", async (req, res) => {
  const { name, category , price , instock , brand } = req.body;
  try {
    const product = new Product({ name, category , price , instock , brand });
    await product.save();
    res.status(201).json({ product }).send("Product created successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to create product");
  }
});

// update a product
router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { name, category , price , instock , brand } = req.body;
  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { name, category , price , instock , brand },
      { new: true }
    );
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.status(200).json({ product });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to update product");
  }
});

// delete a product
router.delete("/remove/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to delete product");
  }
});

export default router;
