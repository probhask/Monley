const { log, error } = require("node:console");
const { readFile, readFileSync } = require("node:fs");
const fs = require("node:fs/promises");
const path = require("node:path");
const { getShortProduct } = require("../utils/functionality");
const { randomUUID } = require("node:crypto");
const { match } = require("node:assert");

const getUser = async ({ email, password }) => {
  //   console.log(email, password);
  const rawFileContent = await fs.readFile(
    path.join(__dirname, "../database/customer.json"),
    {
      encoding: "utf-8",
    }
  );
  const data = JSON.parse(rawFileContent);
  const user = data.customer.filter((user) => {
    if (user.email === email && user.password === password) return user;
  });
  //   console.log("user", user);
  return user ?? [];
};
const getDetailUser = async ({ custId }) => {
  // console.log("c", custId);
  const rawFileContent = await fs.readFile(
    path.join(__dirname, "../database/customer.json"),
    {
      encoding: "utf-8",
    }
  );
  const data = JSON.parse(rawFileContent);
  const user = data.customer.filter((user) => user.custId === custId);
  // console.log("user", user);
  return user ?? [];
};

const createUser = async ({ name, image = "", email, password, address }) => {
  if ((name, email, password, address)) {
    const rawFileContent = await fs.readFile(
      path.join(__dirname, "../database/customer.json"),
      {
        encoding: "utf-8",
      }
    );
    const data = JSON.parse(rawFileContent);
    let findIsEmailExist = [];
    if (data) {
      findIsEmailExist = data.customer.filter((user) => user.email === email);
    }

    if (findIsEmailExist.length > 1) {
      console.log("ise email exist", findIsEmailExist);
      return { error: "email exist" };
    }
    findIsEmailExist = [];

    const custId = randomUUID();
    const userObj = {
      custId: custId,
      name,
      image: image || "",
      email,
      password,
      address,
      darkMode: false,
      createdTime: new Date().toLocaleString(),
    };
    const newData = [...data.customer, userObj];
    fs.writeFile(
      path.join(__dirname, "../database/customer.json"),
      JSON.stringify({ customer: newData || [] })
    );

    const newRawContent = await fs.readFile(
      path.join(__dirname, "../database/customer.json"),
      {
        encoding: "utf-8",
      }
    );
    const newRawParseData = JSON.parse(newRawContent);
    const custData =
      newRawParseData.customer &&
      newRawParseData.customer.filter((user) => (user.custId = custId));

    console.log("new customer", custData);
    if (custData) {
      return custData;
    } else {
      return { error: "not able to create" };
    }
  }

  return false;
};

const changeTheme = async ({ custId }) => {
  console.log("cutid.....", custId);
  if (custId) {
    const rawFileContent = await fs.readFile(
      path.join(__dirname, "../database/customer.json"),
      {
        encoding: "utf-8",
      }
    );
    const data = JSON.parse(rawFileContent);
    const newData = data.customer.map((user) => {
      // console.log("otside", user.custId, custId);
      if (user.custId === custId) {
        // console.log("match", user.custId, custId);
        user.darkMode = !user.darkMode;
      }
      return user;
    });
    // console.log("newDta", newData);
    if (newData) {
      fs.writeFile(
        path.join(__dirname, "../database/customer.json"),
        JSON.stringify({ customer: newData || data })
      );
    }

    const newRawContent = await fs.readFile(
      path.join(__dirname, "../database/customer.json"),
      {
        encoding: "utf-8",
      }
    );
    const filleData = JSON.parse(newRawContent);
    const custData = filleData.customer.filter(
      (user) => user.custId === custId
    );
    console.log("new custdaat", custData);
    if (custData) {
      return custData;
    } else {
      return { error: "not able to create" };
    }
  } else {
    return false;
  }
};

exports.getUser = getUser;
exports.getDetailUser = getDetailUser;
exports.createUser = createUser;
exports.changeTheme = changeTheme;

// {
//     "customer": [
//         {
//             "custId": "001",
//             "name": "Bhaskar Sharma",
//             "image": "",
//             "email": "bhaskar@gmail.com",
//             "password": "bhaskar+23",
//             "address": "A-18,MD Colony,Dehradun,India",
//             "createdTime": "5/20/2024, 6:25:56 PM"
//         }
//     ]
// }

// http://localhost:3000/user/createUser?name=suraj&email=suraj@gamil.com&password=suraj&address=address121312
