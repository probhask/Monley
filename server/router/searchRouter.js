const express = require("express");
const { getSearch, getSearchSuggestion } = require("../data/searchData");

const searchRouter = express.Router();

searchRouter
  .get("/", async (req, res) => {
    // console.log(req.query);
    const items = await getSearch(req.query);
    // console.log("iteming", items);
    res.status(200).json({ search: items });
  })
  .get("/suggestion", async (req, res) => {
    // console.log(req.query);
    const items = await getSearchSuggestion(req.query);
    res.status(200).json({ search: items });
  });

module.exports = searchRouter;
