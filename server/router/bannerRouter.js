const express = require("express");
const { getBanner } = require("../data/bannerData");
const bannerRouter = express.Router();

bannerRouter.get("/", async (req, res) => {
  const banner = await getBanner();
  res.status(200).json({ banner: banner.banner });
});

module.exports = bannerRouter;
