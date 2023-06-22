import express from "express";
import Brand from "../models/brandmodel.js";

const router = express.Router();

//create
router.post("/", async (req, res) => {
  try {
    const brand = new Brand(req.body);
    await brand.save();
    res.status(201).json({ brand });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to create brand");
  }
});

//all brands
router.get("/", async (req, res) => {
  try {
    const brands = await Brand.find();
    res.status(200).json({ brands });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to fetch brands");
  }
});

//get brand by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const brand = await Brand.findById(id);
    if (!brand) {
      return res.status(404).send("Brand not found");
    }
    res.status(200).json({ brand });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to fetch brand");
  }
});

//update
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const brand = await Brand.findByIdAndUpdate(id, req.body, { new: true });
    if (!brand) {
      return res.status(404).send("Brand not found");
    }
    res.status(200).json({ brand });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to update brand");
  }
});

//delete
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const brand = await Brand.findByIdAndDelete(id);
    if (!brand) {
      return res.status(404).send("Brand not found");
    }
    res.status(200).json({ message: "Brand deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to delete brand");
  }
});

export default router;
