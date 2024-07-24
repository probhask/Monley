import React, { createContext, useState } from "react";
import { ProductDeatils } from "../types";
import {
  checkSessionStorage,
  setSessionStorage,
} from "../utils/sessionStorage";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { AiOutlineShopping, AiOutlineShoppingCart } from "react-icons/ai";
import toast from "react-hot-toast";
import { useAppDispatch } from "../store/hooks/hooks";
import useUserSlice from "../store/hooks/useUserSlice";
import { addToCart } from "../store/actions/cartAction";
import { useNavigate } from "react-router-dom";

type MonleyContextState = {
  selectedQuantity: number;
  setSelectedQuantity(quantity: number): void;
  updateQuantity(quantity: number): void;
  incQty: () => void;
  decQty: () => void;
  selectedColor: string | undefined;
  setSelectedColor: (color: string) => void;
  listColor: (color: string) => void;
  selectedSize: string | undefined;
  setSelectedSize: (size: string) => void;
  listSize: (size: string) => void;
  totalPrice: number;
  setTotalPrice: (totalPrice: number) => void;
  calcTotalPrice: (qunatity: number, item: ProductDeatils) => void;
  selectedItem: ProductDeatils | undefined;
  setSelectedItem: (item: ProductDeatils) => void;
  updateSelectedItem: (item: ProductDeatils) => void;
  reset: () => void;
  cartId: string | undefined;
  setCartId: (cartId: string) => void;
  handleAddCart: (product: ProductDeatils) => void;
  handleBuyBtn: (product: ProductDeatils) => void;
};

export const MonleyContext = createContext<MonleyContextState | undefined>(
  undefined
);

export const MonleyContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { loginStatus } = useUserSlice();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [selectedQuantity, setSelectedQuantity] = useState<number>(
    checkSessionStorage("selectedQuantity")
  );
  const [totalPrice, setTotalPrice] = useState<number>(
    checkSessionStorage("totalPrice")
  );
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    checkSessionStorage("selectedColor") || undefined
  );
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    checkSessionStorage("selectedSize") || undefined
  );
  const [selectedItem, setSelectedItem] = useState<ProductDeatils | undefined>(
    checkSessionStorage("selectedItem") || undefined
  );
  const [cartId, setCartId] = useState<string | undefined>(
    checkSessionStorage("cartId") || undefined
  );

  // funvtions
  const incQty = (): void => {
    const qty = checkSessionStorage("selectedQuantity");
    setSessionStorage<number>("selectedQuantity", qty ? qty + 1 : 1);
    setSelectedQuantity(qty + 1);
  };
  const decQty = (): void => {
    if (selectedQuantity > 1) {
      const qty = checkSessionStorage("selectedQuantity");
      setSessionStorage<number>("selectedQuantity", qty ? qty - 1 : 1);
      setSelectedQuantity(qty - 1);
    }
  };
  const updateQuantity = (quantity: number): void => {
    setSessionStorage<number>("selectedQuantity", quantity);
    setSelectedQuantity(quantity);
  };
  const listColor = (color: string): void => {
    if (selectedColor !== color) {
      setSessionStorage<string>("selectedColor", color);
      setSelectedColor(color);
    } else {
      setSessionStorage<string>("selectedColor", "");
      setSelectedColor("");
    }
  };
  const listSize = (size: string): void => {
    if (selectedSize !== size) {
      setSessionStorage<string>("selectedSize", size);
      setSelectedSize(size);
    } else {
      setSessionStorage<string>("selectedSize", "");
      setSelectedSize("");
    }
  };
  const updateSelectedItem = (item: ProductDeatils): void => {
    setSessionStorage<ProductDeatils>("selectedItem", item);
    setSelectedItem(item);
  };
  const calcTotalPrice = (qunatity: number, item: ProductDeatils) => {
    setSessionStorage<number>("totalPrice", qunatity * item.current_price);

    setTotalPrice(qunatity * item.current_price);
  };
  const reset = (): void => {
    setSessionStorage<number>("selectedQuantity", 1);
    setSelectedQuantity(1);
    setSessionStorage<string>("selectedColor", "");
    setSelectedColor("");
    setSessionStorage<string>("selectedSize", "");
    setSelectedSize("");
    setSessionStorage<string>("selectedItem", "");
    setSelectedItem(undefined);
    setCartId(undefined);
    setSessionStorage<string>("cartId", "");
  };
  const handleAddCart = (product: ProductDeatils): void => {
    if (loginStatus) {
      if (
        selectedColor &&
        selectedSize &&
        selectedQuantity &&
        product !== undefined
      ) {
        const doc = {
          productId: product.productId,
          color: selectedColor,
          size: selectedSize,
          quantity: selectedQuantity,
          totalPrice: totalPrice,
        };
        dispatch(addToCart(doc));
      } else {
        toast.error("Please select color and size", {
          icon: <IoMdInformationCircleOutline className="text-red-800" />,
          className: "bg-red-500 text-white",
        });
      }
    } else {
      toast.error("please login first to add items to cart", {
        icon: <AiOutlineShoppingCart />,
        className: "bg-red-500 text-white",
      });
    }
  };

  const handleBuyBtn = (product: ProductDeatils): void => {
    if (loginStatus) {
      if (
        selectedColor &&
        selectedSize &&
        selectedQuantity &&
        product !== null &&
        product !== undefined
      ) {
        updateSelectedItem(product);
        navigate("/order");
      } else {
        toast.error("Please select color and size", {
          icon: <IoMdInformationCircleOutline className="text-blue-800" />,
          className: "bg-blue-500 text-white",
        });
      }
    } else {
      toast.error("please login first to buy", {
        icon: <AiOutlineShopping />,
        className: "bg-blue-500 text-white",
      });
    }
  };

  return (
    <MonleyContext.Provider
      value={{
        selectedQuantity,
        setSelectedQuantity,
        updateQuantity,
        incQty,
        decQty,
        selectedColor,
        setSelectedColor,
        listColor,
        selectedSize,
        setSelectedSize,
        listSize,
        totalPrice,
        setTotalPrice,
        calcTotalPrice,
        selectedItem,
        setSelectedItem,
        updateSelectedItem,
        reset,
        cartId,
        setCartId,
        handleAddCart,
        handleBuyBtn,
      }}
    >
      {children}
    </MonleyContext.Provider>
  );
};
