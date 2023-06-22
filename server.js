import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";

// routers 
import authRouter from "./routes/authRouter.js";
import brandRouter from "./routes/brandRouter.js";
import cartRouter from "./routes/cartRouter.js";
import cartsummaryRouter from "./routes/cartsummaryRouter.js";
import categoryRouter from "./routes/categoryRouter.js";
import orderRouter from "./routes/orderRouter.js";
import productRouter from "./routes/productRouter.js";
import reviewRouter from "./routes/reviewRouter.js";
import saleRouter from "./routes/saleRouter.js";

// models
import User from "./models/usermodel.js";
import Login from "./models/loginmodel.js";
import Product from "./models/productmodel.js";
import Category from "./models/categorymodel.js";
import Order from "./models/ordermodel.js";
import Brand from "./models/brandmodel.js";
import Review from "./models/reviewmodel.js";
import Sale from "./models/salemodel.js";
import Cart from "./models/cartmodel.js";
import CartSummary from "./models/cartsummarymodel.js";

const app = express();

// middleware
app.use(cors());
app.use(helmet());
app.use(express.json());


// routes
app.use("/auth", authRouter);
app.use("/category", categoryRouter);
app.use("/products", productRouter);
app.use("/brands", brandRouter);
app.use("/orders", orderRouter);
app.use("/reviews", reviewRouter);
app.use("/sales", saleRouter);
app.use("/cart", cartRouter);
app.use("/cartsummary", cartsummaryRouter);



const uri = "mongodb://localhost:27017";
const options = { useNewUrlParser: true, useUnifiedTopology: true, family: 4 };

mongoose
  .connect(uri, options)
  .then(() => {
    console.log("Connected to MongoDB");

    const db = mongoose.connection;

    User.init(db);
    Login.init(db);
    Product.init(db);
    Category.init(db);
    Brand.init(db);
    Order.init(db);
    Review.init(db);
    Sale.init(db);
    Cart.init(db);
    CartSummary.init(db);

    app.listen(3000, () => {
      console.log("Server is listening on port 3000");
    });
  })
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

app.get("/", (req, res) => {
  res.send("Welcome to One Style Api");
});
