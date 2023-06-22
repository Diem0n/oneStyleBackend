import express from "express";
import Order from "../models/ordermodel.js";

const router = express.Router();

// get all orders by user id
router.get("/orders/:userid", async (req, res) => {
  const { userid } = req.params;

  try {
    const orders = await Order.find({ userid });
    res.status(200).json({ orders });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to fetch orders for the user");
  }
});

// create an order
router.post("/orders/:userid", async (req, res) => {
  const { userid } = req.params;
  const { productid, orderstatus, deliveryaddress, paymentmethod, orderdate } =
    req.body;
  try {
    const order = new Order({
      userid,
      productid,
      orderstatus,
      deliveryaddress,
      paymentmethod,
      orderdate,
    });
    await order.save();
    res.status(201).json({ order });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to create order");
  }
});

// update an order 

router.put("/orders/:id", async (req, res) => {
  const { id } = req.params;
  const {
    userid,
    productid,
    orderstatus,
    deliveryaddress,
    paymentmethod,
    orderdate,
  } = req.body;

  try {
    const order = await Order.findByIdAndUpdate(
      id,
      {
        userid,
        productid,
        orderstatus,
        deliveryaddress,
        paymentmethod,
        orderdate,
      },
      { new: true }
    );
    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }
    res.status(200).json({ order });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to update order");
  }
});

export default router;
