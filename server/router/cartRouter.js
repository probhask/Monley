const express = require("express");
const { getCart, addToCart, removeCartItem } = require("../data/cartData");
const cartRouter = express.Router();

cartRouter
  .get("/", async (req, res) => {
    if (req.query.custId) {
      const cart = await getCart(req.query);
      res.status(200).json({ cart: cart });
    } else {
      res.status(300).send("please provide custId");
    }
  })
  .put("/add", async (req, res) => {
    if (req.body.params) {
      const cart = await addToCart(req.body.params);
      res.status(200).json({ cart: cart });
    } else {
      res.status(300).send("please provide data");
    }
  })
  .delete("/remove", async (req, res) => {
    if (req.query) {
      const cart = await removeCartItem(req.query);
      res.status(200).json({ cart: cart });
    } else {
      res.status(300).send("plz provide cartId");
    }
  });

module.exports = cartRouter;
