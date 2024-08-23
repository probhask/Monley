require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cron = require("node-cron");
const shell = require("shelljs");
const https = require("https");

const itemRouter = require("./router/itemsRouter");
const bannerRouter = require("./router/bannerRouter");
const searchRouter = require("./router/searchRouter");
const customerRouter = require("./router/customerRouter");
const cartRouter = require("./router/cartRouter");
const orderRouter = require("./router/orderRouter");

const backendUrl = "https://monley.onrender.com";

const app = express();

app.use(bodyParser.json());

cron.schedule("*/14 * * * * ", () => {
  console.log("restarting server");

  https
    .get(backendUrl, (res) => {
      if (res.statusCode === 200) {
        console.log("server restarted");
      } else {
        console.error(
          "failed to restart server with status code",
          res.statusCode
        );
      }
    })
    .on("error", (err) => {
      console.error("error during restart: ", err.message);
    });
});

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH", "HEAD"],
  credentials: true,
};
app.use(cors(corsOptions));

app.use("/items", itemRouter);
app.use("/banner", bannerRouter);
app.use("/search", searchRouter);
app.use("/user", customerRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);

// console.log("process.env.PORT", process.env.PORT);
// console.log("process.env.FRONTEND_URL", process.env?.FRONTEND_URL);

app.listen(process.env.PORT, () => {
  console.log(
    `server is running at PORT :http://localhost:${process.env.PORT}`
  );
});
