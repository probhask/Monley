const express = require("express");
const {
  getItems,
  getFeatured,
  getNewArrival,
  getBestSeller,
  getItemDetail,
  giveRatings,
  getSimilar,
} = require("../data/itemsData");
const itemRouter = express.Router();

itemRouter
  .get("/", async (req, res) => {
    const items = await getItems(req.query);
    // console.log("iteming", items);
    res.status(200).json({ items: items });
  })
  .get("/featured", async (req, res) => {
    const items = await getFeatured();
    res.status(200).json({ items: items });
  })
  .get("/newArrival", async (req, res) => {
    const items = await getNewArrival();
    res.status(200).json({ items: items });
  })
  .get("/bestSeller", async (req, res) => {
    const items = await getBestSeller();
    res.status(200).json({ items: items });
  })
  .get("/detail", async (req, res) => {
    const items = await getItemDetail(req.query);
    res.status(200).json({ items: items });
  })
  .put("/rating", async (req, res) => {
    // console.log(req.body.params);
    const ratings = await giveRatings(req.body.params);
  })
  .get("/similar", async (req, res) => {
    console.log(req.query);
    const items = await getSimilar(req.query);
    res.status(200).json({ items: items });
  });

module.exports = itemRouter;
