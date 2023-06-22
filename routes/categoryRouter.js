import express from "express";
import Product from "../models/productmodel.js";


const router = express.Router();

router.get("/:name", async (req, res) => {
    const { name } = req.params;
    const products = await Product.find({ category: name });
    if (!products) {
        res.status(404).json({ message: "Category not found" });
        return;
    }
    res.status(200).json(products);
});

export default router;
