const express = require("express");
const { getCart, addToCart, removeCartItem } = require("../data/cartData");
const { orderProduct, getUserOrder } = require("../data/orderData");
const orderRouter = express.Router();

orderRouter.get("/userOrder", async (req, res) => {
  // console.log(req.query);
  if (req.query.custId) {
    const cart = await getUserOrder(req.query);
    res.status(200).json({ order: cart });
  } else {
    res.status(300).send("please provide custId");
  }
});
orderRouter.post("/", async (req, res) => {
  console.log("order router");
  // console.log("req ", req.body);
  if (req.body) {
    const order = await orderProduct(req.body);
    console.log("sucess");

    res.status(200).json({ order: order });
  } else {
    console.log("fail");
    res.status(300).send("please provide data");
  }
});

module.exports = orderRouter;
