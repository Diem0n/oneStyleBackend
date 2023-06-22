import express from "express";
import Cart from "../models/cartmodel.js";
import Product from "../models/productmodel.js";

const router = express.Router();

// get by user id
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    let subtotal = 0;
    let totalItems = 0;
    for (const item of cart.items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        continue;
      }
      subtotal += product.price * item.quantity;
      totalItems += item.quantity;
    }
    const shippingCharges = 70;
    const totalPrice = subtotal + shippingCharges;
    res.json({ subtotal, shippingCharges, totalPrice, totalItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
