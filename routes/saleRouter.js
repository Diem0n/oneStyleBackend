import express from "express";
import Sale from "../models/salemodel.js";

const router = express.Router();

// Create a sale
router.post("/", async (req, res) => {
  try {
    const { productid, priceold, newprice, validtill } = req.body;
    const sale = new Sale({ productid, priceold, newprice, validtill });
    await sale.save();
    res.status(201).json({ sale });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to create sale");
  }
});

// Get all sales
router.get("/", async (req, res) => {
  try {
    const sales = await Sale.find();
    res.status(200).json({ sales });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to fetch sales");
  }
});

// Get a saleid by productid
router.get("/product/:productId", async (req, res) => {
  const { productId } = req.params;
  try {
    const sale = await Sale.findOne({ productid: productId });
    if (!sale) {
      res.status(404).send("Sale not found for the specified product ID");
    } else {
      res.status(200).json({ saleId: sale._id });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to fetch sale ID");
  }
});

// update
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const { productid, priceold, newprice, validtill } = req.body;
    const sale = await Sale.findByIdAndUpdate(
      id,
      { productid, priceold, newprice, validtill },
      { new: true }
    );
    if (!sale) {
      res.status(404).send("Sale not found");
    } else {
      res.status(200).json({ sale });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to update sale");
  }
});

// delete
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const sale = await Sale.findByIdAndDelete(id);
    if (!sale) {
      res.status(404).send("Sale not found");
    } else {
      res.status(200).json({ sale });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to delete sale");
  }
});

export default router;
