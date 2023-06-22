import express from "express";
import bcrypt from "bcrypt";
import User from "../models/usermodel.js";
import Login from "../models/loginmodel.js";


const router = express.Router();

router.post("/register", async (req, res) => {
  const { user } = req.body;
  const { password } = req.body;
  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      console.error(err);
      res.status(500).send("Failed to create user");
      return;
    }
    const hashedPass = hash;
    console.log("Hashed Password:");
    console.log(hashedPass);
    const userObj = new User(user);
    try {
      await userObj.save();
      const { _id } = userObj;
      const loginObj = new Login({
        email: req.body.email,
        passwordhash: hashedPass,
        userid: _id,
      });
      try {
        await loginObj.save();
      } catch (err) {
        console.error(err);
        res.status(500).send("Error inserting into login table");
        return;
      }
      res.status(200).json({_id});
    } catch (err) {
      console.error(err);
      res.status(500).send("Failed to create user");
    }
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Login.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const isPasswordValid = await bcrypt.compare(password, user.passwordhash);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid password" });
      return;
    }
    const { userid } = user;
    console.log("Userid:");
    console.log(userid);
    const userObj = await  User.findOne({_id : userid });
    res.status(200).json({ message: "Login successful" , userObj });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to login");
  }
});

export default router;
