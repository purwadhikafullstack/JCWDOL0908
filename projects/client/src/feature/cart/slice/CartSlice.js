import { createSlice } from "@reduxjs/toolkit";
import { getCart } from "../api/getCart";
import { ToastError, ToastSuccess } from "../../../helper/Toastify";
import { modifyCart } from "../api/modifyCart";
import { setLoading } from "../../LoaderSlice";
import { removeCart } from "../api/removeCart";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    refreshCart: (state, action) => {
      state.cart = action.payload;
    },
  },
});

export const { refreshCart } = cartSlice.actions;

export default cartSlice.reducer;

export const GetCart = () => {
  return async (dispatch) => {
    try {
      const response = await getCart();
      dispatch(refreshCart(response.data.data));
    } catch (error) {
      ToastError(error.response.data.message || "something went wrong");
    }
  };
};

export const addToCart = (data) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      await modifyCart(data);
      ToastSuccess("cart updated");
    } catch (error) {
      ToastError(error.response.data.message || "something went wrong");
    } finally {
      dispatch(GetCart());
      dispatch(setLoading(false));
    }
  };
};

export const RemoveFromCart = (id_product) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      await removeCart(id_product);
      ToastSuccess("cart updated");
    } catch (error) {
      ToastError(error.response.data.message || "something went wrong");
    } finally {
      dispatch(GetCart());
      dispatch(setLoading(false));
    }
  };
};

export const totalCartItems = (cart) => {
  return cart.reduce((total, item) => total + item.quantity, 0);
};

