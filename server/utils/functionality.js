const dateDiff = (date1, date2) => {
  //   console.log(date1, date2);
  // time diff
  let diff_In_Time = date2.getTime() - date1.getTime();
  // date diff
  let diff_In_Days = Math.round(diff_In_Time / (1000 * 3600 * 24));
  return diff_In_Days;
};
const getShortProduct = (product) => {
  const {
    productId,
    image,
    item_name,
    description,
    original_price,
    current_price,
    discount_percentage,
    rating,
  } = product;
  return {
    productId,
    image,
    item_name,
    description,
    original_price,
    current_price,
    discount_percentage,
    rating,
  };
};

const sort_By_SoldUnit = () => {
  return function (elem1, elem2) {
    if (elem1.soldUnit < elem2.soldUnit) return -1;
    else if (elem1.soldUnit > elem2.soldUnit) return 1;
    else return 0;
  };
};

exports.dateDiff = dateDiff;
exports.getShortProduct = getShortProduct;
exports.sort_By_SoldUnit = sort_By_SoldUnit;
