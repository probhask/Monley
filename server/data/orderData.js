const { log } = require("node:console");
const { randomUUID } = require("node:crypto");
const { readFile, readFileSync } = require("node:fs");
const fs = require("node:fs/promises");
const path = require("node:path");
const { removeCartItem } = require("./cartData");

const orderProduct = async (body) => {
  const orderContent = await fs.readFile(
    path.join(__dirname, "../database/order.json"),
    {
      encoding: "utf-8",
    }
  );

  const orderData = JSON.parse(orderContent);

  const orderId = randomUUID();
  const doc = {
    orderId,
    ...body,
    createdTime: new Date().toLocaleString(),
  };
  // console.log("order", orderData);
  const newData = [...orderData.order, doc];

  fs.writeFile(
    path.join(__dirname, "../database/order.json"),
    JSON.stringify({ order: newData })
  );

  const rawFileContent = await fs.readFile(
    path.join(__dirname, "../database/order.json"),
    {
      encoding: "utf-8",
    }
  );

  const data = JSON.parse(rawFileContent);
  const returnOreder = data.order
    .reverse()
    .filter((item) => item.orderId === orderId);
  if (returnOreder) {
    if (body.cartId) {
      removeCartItem({ cartId: body.cartId, custId: body.custId });
    }
  }
  const storedItems = returnOreder ?? [];
  return storedItems;
};

const getUserOrder = async ({ custId }) => {
  const orderContent = await fs.readFile(
    path.join(__dirname, "../database/order.json"),
    {
      encoding: "utf-8",
    }
  );

  const orderData = JSON.parse(orderContent);
  const UserData = Array.from(orderData.order).filter(
    (order) => order.custId === custId
  );
  // console.log(UserData);
  return UserData || [];
};
exports.orderProduct = orderProduct;
exports.getUserOrder = getUserOrder;
