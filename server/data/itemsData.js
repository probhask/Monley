const { log } = require("node:console");
const { readFile } = require("node:fs");
const fs = require("node:fs/promises");
const path = require("node:path");
const {
  dateDiff,
  getShortProduct,
  compare,
  sort_By_SoldUnit,
} = require("../utils/functionality");

const getItems = async ({ page, limit }) => {
  // console.log(page, limit);
  const rawFileContent = await fs.readFile(
    path.join(__dirname, "../database/products.json"),
    {
      encoding: "utf-8",
    }
  );
  const data = JSON.parse(rawFileContent);
  const startIndex = (Number(page) - 1) * limit;
  const endIndex = startIndex + Number(limit);
  let shortData = [];
  if (data) {
    shortData = Array.from(data.products)
      .slice(startIndex, endIndex)
      .map((product, index) => {
        return getShortProduct(product);
      });
  }
  const storedItems = shortData ?? [];
  return storedItems;
};
const getItemDetail = async ({ itemId }) => {
  const rawFileContent = await fs.readFile(
    path.join(__dirname, "../database/products.json"),
    {
      encoding: "utf-8",
    }
  );
  const data = JSON.parse(rawFileContent);
  const matchProduct = data.products.filter((product) => {
    return product.productId === itemId;
  });
  return matchProduct;
};

const getFeatured = async () => {
  const rawFileContent = await fs.readFile(
    path.join(__dirname, "../database/products.json"),
    {
      encoding: "utf-8",
    }
  );
  const data = JSON.parse(rawFileContent);

  let shortData = [];

  if (data) {
    shortData = data.products
      .map((product, index) => {
        if (product.rating.stars > 3.5) {
          return getShortProduct(product);
        }
      })
      .filter((item) => item !== undefined);
  }

  const storedItems = shortData ?? [];
  return storedItems;
};
const getNewArrival = async () => {
  const rawFileContent = await fs.readFile(
    path.join(__dirname, "../database/products.json"),
    {
      encoding: "utf-8",
    }
  );
  const data = JSON.parse(rawFileContent);
  let shortData = [];
  if (data) {
    shortData = data.products
      .map((product, index) => {
        if (dateDiff(new Date(product.createdAt), new Date()) < 20) {
          return getShortProduct(product);
        }
      })
      .filter((item) => item !== undefined)
      .slice(0, 10);
  }

  const storedItems = shortData ?? [];
  return storedItems;
};
const getBestSeller = async () => {
  const rawFileContent = await fs.readFile(
    path.join(__dirname, "../database/products.json"),
    {
      encoding: "utf-8",
    }
  );
  const data = JSON.parse(rawFileContent);
  let bestSeller = [];
  if (data) {
    bestSeller = data.products
      .sort(sort_By_SoldUnit())
      .reverse()
      .filter((item) => item !== undefined);
  }

  let shortData = bestSeller
    .map((item) => {
      return getShortProduct(item);
    })
    .slice(0, 6);

  const storedItems = shortData ?? [];
  return storedItems;
};
const giveRatings = async ({ productId, custId, rating }) => {
  const rawFileContent = await fs.readFile(
    path.join(__dirname, "../database/products.json"),
    {
      encoding: "utf-8",
    }
  );
  const data = JSON.parse(rawFileContent);
  const newData = data.products.map((item) => {
    if (item.productId === productId) {
      item.rating.stars = Math.round((item.rating.stars + rating) / 2);
      item.rating.count += 1;
    }
    return item;
  });

  fs.writeFile(
    path.join(__dirname, "../database/products.json"),
    JSON.stringify({ products: newData })
  );
};

const getSimilar = async ({ collection, category, productId, gender }) => {
  const rawFileContent = await fs.readFile(
    path.join(__dirname, "../database/products.json"),
    {
      encoding: "utf-8",
    }
  );
  const data = JSON.parse(rawFileContent);
  const similarData = data.products.filter(
    (item) =>
      item.productId !== productId &&
      item.category.includes(category) &&
      item.gender.includes(gender)
  );
  return similarData || [];
};

exports.getItems = getItems;
exports.getItemDetail = getItemDetail;
exports.getFeatured = getFeatured;
exports.getNewArrival = getNewArrival;
exports.getBestSeller = getBestSeller;
exports.giveRatings = giveRatings;
exports.getSimilar = getSimilar;
