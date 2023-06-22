import express from "express";
import Review from "../models/reviewmodel.js";

const router = express.Router();

// crete
router.post("/new", async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).json({ review });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to create review");
  }
});
//get
router.get("/product/:productId", async (req, res) => {
    const { productId } = req.params;
    try {
      const reviews = await Review.find({ productid: productId });
      res.status(200).json({ reviews });
    } catch (err) {
      console.error(err);
      res.status(500).send("Failed to fetch reviews by product ID");
    }
  });
  



export default router;
