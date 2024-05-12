import express from "express";
import { db } from "./Database/db.js";
import { usermodel } from "./Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import cors from "cors";
import multer from "multer";
import path from "path";
import { pizzamodel } from "./Models/pizzamodel.js";
import { burgermodel } from "./Models/burgermodel.js";
import bodyParser from "body-parser";
const app = express();
import mongoose from "mongoose";
import { cartmodel } from "./Models/cartmodel.js";
import { ordermodel } from "./Models/ordermodel.js";
import Razorpay from 'razorpay'
const jwtSecret = "harsh_manu";
const bcryptSalt = bcrypt.genSaltSync(10);

db();
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use("/", express.json());
app.use(cookieParser());
app.use(express.static("public"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./public/Images");
  },
  filename: function (req, file, cb) {
    // return cb(null, `${Date.now()}_${file.originalname}`)
    return cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("file"), (req, res) => {
  const { title, description, amount } = req.body;
  pizzamodel.create({
    photo: req.file.filename,
    title: title,
    description: description,
    amount: amount,
  });
  console.log("created photo");
});

app.get("/getallpizza", async (req, res) => {
  const alldata = await pizzamodel.find();
  // console.log(alldata);
  res.send(alldata);
});
app.get("/getpizza", async (req, res) => {
  const alldata = await pizzamodel.find().limit(3);
  // console.log(alldata);
  res.send(alldata);
});

app.post("/uploadburger", upload.single("file"), (req, res) => {
  const { title, description, amount } = req.body;
  burgermodel.create({
    photo: req.file.filename,
    title: title,
    description: description,
    amount: amount,
  });
  console.log("created burger");
});

app.get("/getallburger", async (req, res) => {
  const allburgerdata = await burgermodel.find();
  // console.log(allburgerdata);
  res.send(allburgerdata);
});
app.get("/getburger", async (req, res) => {
  const allburgerdata = await burgermodel.find().limit(3);
  // console.log(allburgerdata);
  res.send(allburgerdata);
});

// here bcrypt , hashsync is used to keep the password in hashed form in database

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await usermodel.create({
      username,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    console.log("new user created ");
    res.json(user);
  } catch (error) {
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const userDoc = await usermodel.findOne({ email });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);

    if (passOk) {
      jwt.sign(
        { email: userDoc.email, id: userDoc._id, name: userDoc.name },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(userDoc);
        }
      );
      // res.status(203).json(userDoc)
    } else {
      res.status(204).json("password notfound");
    }
  } else {
    res.status(205).json("email notfound");
  }
});

app.get("/profile", async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userDoc) => {
      if (err) throw err;
      const { username, email } = await usermodel.findById(userDoc.id);
      res.send({ username, email });
    });
  } else {
    res.send(null);
  }
});

app.post("/logout", async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    res.cookie("token", "").json("logout successfully");
  }
});

app.post("/addcartpizza", async(req, res) => {
  const {id} = req.body;
  console.log(req.body);
  const {token} = req.cookies;
  const item = await pizzamodel.findById(id);
  const {photo,title,description,amount} = item;
  
  if(token){
  jwt.verify(token,jwtSecret,{},async(err , userdata)=>{
    if(userdata){
      cartmodel.create({title:title,description:description,photo:photo,amount:amount})
      console.log("cart created");
    }
  })
  }

res.send(item);
});


app.get("/addcartpizza" , async(req, res)=>{
  res.send(await cartmodel.find());
})



app.post("/order",async(req,res)=>{
  const{cartdata , phone,address,street,pincode,country} = req.body;
console.log(req.body);
const order = await ordermodel.create({cartdata,phone,address,street,pincode,country});
res.send(order);
})

app.delete('/removeitem/:id' , async(req,res)=>{
const {id} = req.params;
await cartmodel.findByIdAndDelete(id);
res.send("deleted successfully")
})



// payment integration

app.post("/order", async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: "rzp_test_gYiq57okl7muXo",
      key_secret: "wg4q0kazhMfnfNmUEpg8N9xG",
    });

    const options = req.body;
    const order = await razorpay.orders.create(options);

    if (!order) {
      return res.status(500).send("Error");
    }

    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
});

app.post("/order/validate", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const sha = crypto.createHmac("sha256","wg4q0kazhMfnfNmUEpg8N9xG" );
  //order_id + "|" + razorpay_payment_id
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = sha.digest("hex");
  if (digest !== razorpay_signature) {
    return res.status(400).json({ msg: "Transaction is not legit!" });
  }

  res.json({
    msg: "success",
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
  });
});

app.listen(5000, () => {
  console.log("server is running");
});
