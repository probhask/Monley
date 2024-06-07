import React, { FormEvent, useState } from "react";
import { Button, OrderInput } from "../../components";
import { useMonleyContext } from "../../hooks/useMonleyContext";
import useOrderSlice from "../../store/hooks/useOrderSlice";
import { orderProduct } from "../../store/slice/order";
import type { OrderForm } from "../../types";
import { OrderFormError, orderFormValidationSchema } from "../../types";
import { useAppDispatch } from "../../store/hooks/hooks";

const OrderFormFill = () => {
  const {
    selectedColor,
    selectedSize,
    selectedQuantity,
    totalPrice,
    selectedItem,
    cartId,
  } = useMonleyContext();
  const { ordersLoading } = useOrderSlice();

  const [orderFormData, setOrderFormData] = useState<OrderForm>({
    name: "",
    address: "",
    cardNumber: Number(0),
    cardPin: Number(0),
  });
  const [orderFormDataError, setOrderFormDataError] = useState<
    OrderFormError | undefined
  >();
  const dispatch = useAppDispatch();

  const handleChange = (e?: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e?.target as HTMLInputElement;

    if (name === "cardNumber" || name === "cardPin") {
      return setOrderFormData({ ...orderFormData, [name]: parseInt(value) });
    } else {
      setOrderFormData({ ...orderFormData, [name]: value });
    }
  };

  const formSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = orderFormValidationSchema.safeParse(orderFormData);
    if (!result.success) {
      scroll(0, 0);

      const { address, cardNumber, cardPin, name } = result.error.format();
      setOrderFormDataError({ address, cardNumber, cardPin, name });
    } else {
      setOrderFormDataError(undefined);
      // console.log(orderFormData);
      if (
        selectedItem !== undefined &&
        selectedColor !== undefined &&
        selectedQuantity !== undefined &&
        selectedSize !== undefined
      ) {
        dispatch(
          orderProduct({
            productId: selectedItem.productId,
            product_Name: selectedItem.item_name,
            product_Image: selectedItem.image,
            quantity: selectedQuantity,
            color: selectedColor,
            size: selectedSize,
            current_price: selectedItem.current_price,
            total_Price: totalPrice,
            pay_Ammount: totalPrice,
            pay_Card_Number: orderFormData.cardNumber,
            pay_Card_Pin: orderFormData.cardPin,
            pay_Customer: orderFormData.name,
            address: orderFormData.address,
            cartId: cartId,
          })
        );
      }
    }
  };

  return (
    <form className="w-full px-2" onSubmit={formSubmit}>
      <div>
        <h1 className="font-semibold">Shipping Address</h1>
        <OrderInput
          type="text"
          name="name"
          placeholder="enter name"
          onchange={handleChange}
          error={orderFormDataError?.name?._errors}
        />
        <OrderInput
          type="text"
          name="address"
          placeholder="Address"
          onchange={handleChange}
          error={orderFormDataError?.address?._errors}
        />
      </div>
      <div className="mt-5">
        <h1 className="font-semibold mb-0.5">Payment Details</h1>
        <div>
          <h1 className="text-sm font-normal">Card Information</h1>

          <OrderInput
            type="number"
            name="cardNumber"
            placeholder="card number"
            onchange={handleChange}
            error={orderFormDataError?.cardNumber?._errors}
          />
          <OrderInput
            type="number"
            name="cardPin"
            placeholder="card pin"
            onchange={handleChange}
            error={orderFormDataError?.cardPin?._errors}
          />
        </div>
      </div>
      <div className="w-full flex items-center justify-center mt-7">
        <Button
          type="submit"
          classes={`h-10 w-[80%] md:w-[60%] lg:w-[40%] flex justify-center items-center border px-2 py-0.5 rounded-md hover:text-white font-semibold text-xl shadow-inner  ${
            ordersLoading
              ? "bg-gray-400 border-r-gray-700"
              : " border-orange-500 text-orange-500  hover:bg-orange-500"
          } `}
          text={`PAY ₹ ${totalPrice && totalPrice}`}
          disabled={ordersLoading}
        />
      </div>
    </form>
  );
};

export default OrderFormFill;
