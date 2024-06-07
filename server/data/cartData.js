const { log } = require("node:console");
const { randomUUID } = require("node:crypto");
const { readFile, readFileSync } = require("node:fs");
const fs = require("node:fs/promises");
const path = require("node:path");

const getCart = async ({ custId }) => {
  // console.log(custId);

  const rawFileContent = await fs.readFile(
    path.join(__dirname, "../database/cart.json"),
    {
      encoding: "utf-8",
    }
  );

  const data = JSON.parse(rawFileContent);
  let userCart = [];
  if (data) {
    userCart = data.cart.filter((cart) => cart.custId === custId);
  }
  if (userCart.length === 0) {
    return [];
  } else {
    const productRawContent = await fs.readFile(
      path.join(__dirname, "../database/products.json"),
      {
        encoding: "utf-8",
      }
    );

    const productData = JSON.parse(productRawContent);
    // console.log("product raw", productData);

    let fullCartData = userCart.map((cart) => {
      return productData.products
        .map((product) => {
          if (product.productId === cart.product) {
            return {
              ...cart,
              product: {
                productId: product.productId,
                image: product.image,
                item_name: product.item_name,
                current_price: product.current_price,
              },
            };
          }
        })
        .filter((item) => item !== undefined);
    });
    fullCartData = fullCartData.map((item) => {
      return item[0];
    });
    // console.log("fullcart data", fullCartData);
    return fullCartData;
  }
};
const addToCart = async ({
  productId,
  color,
  size,
  quantity,
  totalPrice,
  custId,
}) => {
  // console.log("data", data);
  const rawFileContent = await fs.readFile(
    path.join(__dirname, "../database/cart.json"),
    {
      encoding: "utf-8",
    }
  );

  const data = JSON.parse(rawFileContent);
  let change = false;
  const checkData = data.cart.map((cart) => {
    if (
      cart.custId === custId &&
      cart.product === productId &&
      cart.color === color &&
      cart.size === size
    ) {
      // console.log("all match");
      cart.quantity = cart.quantity + quantity;
      change = true;
    }
    return cart;
  });
  // console.log("cjeck data", checkData);
  if (change) {
    fs.writeFile(
      path.join(__dirname, "../database/cart.json"),
      JSON.stringify({ cart: checkData || [] })
    );
  } else {
    const ranndomCustId = randomUUID();
    const doc = {
      cartId: ranndomCustId,
      custId,
      product: productId,
      color,
      size,
      quantity,
      totalPrice,
      createdTime: new Date().toLocaleString(),
    };
    const newData = [...data.cart, doc];
    fs.writeFile(
      path.join(__dirname, "../database/cart.json"),
      JSON.stringify({ cart: newData || [] })
    );
  }

  const cartData = await getCart({ custId: custId });
  // console.log("cart dat", cartData);
  return cartData;
};

//
const removeCartItem = async ({ cartId, custId }) => {
  const rawFileContent = await fs.readFile(
    path.join(__dirname, "../database/cart.json"),
    {
      encoding: "utf-8",
    }
  );

  const data = JSON.parse(rawFileContent);
  const newData = data.cart.filter((cart) => cart.cartId !== cartId);
  fs.writeFile(
    path.join(__dirname, "../database/cart.json"),
    JSON.stringify({ cart: newData || [] })
  );
  console.log("cust id", custId);
  const cartData = await getCart({ custId });
  // console.log("cart dat", cartData);
  return cartData;
};

exports.getCart = getCart;
exports.addToCart = addToCart;
exports.removeCartItem = removeCartItem;
