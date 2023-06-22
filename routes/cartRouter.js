import express from "express";
import Cart from "../models/cartmodel.js";

const router = express.Router();
// get by user id
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    res.json({ cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// add to cart or update quantity
router.post("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      const newCart = new Cart({
        userId,
        items: [{ productId, quantity }],
      });
      await newCart.save();
      return res.status(201).json({ cart: newCart });
    }
    // Check if the product already exists in the cart or not and update the quantity
    const existingItem = cart.items.find((item) => item.productId.toString() === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }
    await cart.save();
    res.json({ cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// remove from cart
router.delete("/:userId/:productId", async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    // Find the index of the item to be removed
    const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);
    if (itemIndex === -1) {
      return res.status(404).json({ error: "Item not found in the cart" });
    }
    cart.items.splice(itemIndex, 1);
    await cart.save();
    res.json({ cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
