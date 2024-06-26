const fs = require("node:fs/promises");
const path = require("node:path");

const getSearch = async ({ searchTerm, page, limit, filter }) => {
  searchTerm = searchTerm.toLowerCase();
  const startIndex = (Number(page) - 1) * limit;
  const endIndex = startIndex + Number(limit);
  const rawFileContent = await fs.readFile(
    path.join(__dirname, "../database/products.json"),
    {
      encoding: "utf-8",
    }
  );

  const data = JSON.parse(rawFileContent);
  const searchData = data.products.filter((product) => {
    if (
      product.item_name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.collection.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      product.gender.includes(searchTerm) ||
      product.keyword.includes(searchTerm) ||
      product.color.includes(searchTerm)
    )
      return product;
  });
  if (!filter) {
    return {
      item: searchData.slice(startIndex, endIndex),
      totalResult: searchData.length,
    };
  }

  const filterData = searchData.filter((product) => {
    if (
      product.current_price >= Number(filter.minPrice) &&
      product.current_price <= Number(filter.maxPrice) &&
      product.gender.includes(
        filter.gender === "all" ? product.gender[0] : filter.gender
      ) &&
      product.category.includes(
        filter.category === "all" ? "" : filter.category
      )
    ) {
      return product;
    }
  });

  if (!(filter.order === "desc")) {
    return {
      totalResult: filterData.length,
      item: filterData.slice(startIndex, endIndex),
    };
  }
  console.log("filter l;en", filterData.length);
  const reverseData = filterData?.reverse();
  const storedItems = reverseData.slice(startIndex, endIndex) ?? [];
  return { item: storedItems, totalResult: reverseData?.length };
};

const getSearchSuggestion = async ({ searchTerm }) => {
  searchTerm = searchTerm.toLowerCase();
  const rawFileContent = await fs.readFile(
    path.join(__dirname, "../database/products.json"),
    {
      encoding: "utf-8",
    }
  );

  const data = JSON.parse(rawFileContent);
  const searchData = data.products.filter((product) => {
    if (product.item_name.toLowerCase().includes(searchTerm)) return product;
  });
  const suggestiondata = searchData.slice(0, 4).map((data) => {
    return { productId: data.productId, item_name: data.item_name };
  });
  return suggestiondata || [];
};

exports.getSearch = getSearch;
exports.getSearchSuggestion = getSearchSuggestion;
