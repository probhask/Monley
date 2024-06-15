import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { LoadingSpinner } from "../components";
import {
  ImageView,
  ProductDescription,
  Ratings,
  SimilarItem,
} from "../features";
import { useAppDispatch } from "../store/hooks/hooks";
import { getItemsDetail } from "../store/slice/productDetail";
import { useMonleyContext } from "../hooks/useMonleyContext";
import useProductDetailSlice from "../store/hooks/useProductDetailSlice";

const ItemDetail = () => {
  const { id: productId } = useParams();

  const dispatch = useAppDispatch();
  const { reset } = useMonleyContext();

  const { itemDetail, itemDetailLoading } = useProductDetailSlice();
  useEffect(() => {
    if (productId) {
      dispatch(getItemsDetail(productId));
    }
    reset();
  }, [productId]);

  if (itemDetailLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex w-full justify-center">
      {itemDetail && (
        <div className="flex flex-col my-5 w-full md:w-[90%] lg:w-[90%] justify-center">
          {itemDetail && itemDetail.length > 0 && (
            <div className="flex flex-col md:flex-row w-full items-center">
              {/* image view */}
              <ImageView />

              {/* product Detail description*/}
              <ProductDescription />
            </div>
          )}
          <Ratings />
          <SimilarItem />
        </div>
      )}
    </div>
  );
};

export default ItemDetail;
