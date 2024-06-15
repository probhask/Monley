const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const itemRouter = require("./router/itemsRouter");
const bannerRouter = require("./router/bannerRouter");
const searchRouter = require("./router/searchRouter");
const customerRouter = require("./router/customerRouter");
const cartRouter = require("./router/cartRouter");
const orderRouter = require("./router/orderRouter");

const app = express();

app.use(bodyParser.json());

// app.use(cors(corsOptiions));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});
const corsOptiions = {
  // origin: "http://localhost:5173",
  // origin: "http://localhost:5174",
  origin: "https://monley.netlify.app",
  method: "GET,POST,PUT,DELETE,PATCH,HEAD ",
  credentials: true,
};

app.use("/items", itemRouter);
app.use("/banner", bannerRouter);
app.use("/search", searchRouter);
app.use("/user", customerRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);

// app.get("/", (req, res) => {
//   res.json({ server: "monley" });
// });

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`server is running at PORT :http://localhost:${PORT}/items`);
});
