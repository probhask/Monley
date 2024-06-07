const express = require("express");
const { getSearch } = require("../data/searchData");
const {
  getUser,
  createUser,
  changeTheme,
  getDetailUser,
} = require("../data/customerData");

const customerRouter = express.Router();

// login
customerRouter
  .get("/", async (req, res) => {
    console.log(req.query);
    const user = await getUser(req.query);
    if (user) {
      res.status(200).json({ user: user });
    } else {
      res.status(300).setHeader("failed to reach");
    }
  })
  .post("/", async (req, res) => {
    // console.log(req.body);
    const user = await getDetailUser(req.body);
    if (user) {
      res.status(200).json({ user: user });
    } else {
      res.status(300).setHeader("failed to reach");
    }
  })

  //creaet new user
  .post("/createUser", async (req, res) => {
    console.log(req.body);
    const newUser = await createUser(req.body);
    // console.log("neuser", newUser);
    if (newUser) {
      res.status(200).json({ user: newUser });

      if (newUser.error) {
        res.status(200).json({ error: newUser.error });
      } else {
        res.status(200).json({ user: newUser });
      }
    } else {
      res.status(300).json({ error: "new user creation failed" });
    }
  })
  .get("/changeMode", async (req, res) => {
    // console.log("query", req.query);
    const changeMode = await changeTheme(req.query);
    // console.log("changeMode", changeMode);
    if (changeMode) {
      if (changeMode.error) {
        res.status(200).json({ error: changeMode.error });
      } else {
        res.status(200).json({ user: changeMode });
      }
    } else {
      res.status(300).send("failed to raech data base");
    }
  });

module.exports = customerRouter;
