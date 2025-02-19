import axios from "axios";
import { API_BASE_URL } from "../../constants";

export const ADD_TO_CART = "ADD_TO_CART";
export const ADD_NEW_CART_ITEM = "ADD_NEW_CART_ITEM";
export const UPDATE_CART_ITEM = "UPDATE_CART_ITEM";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const APPLY_DISCOUNT = "APPLY_DISCOUNT";
export const PROCESS_SALE = "PROCESS_SALE";
export const SET_PAYMENT_METHOD = "SET_PAYMENT_METHOD";
export const SET_CATEGORIES = "SET_CATEGORIES";
export const SET_PRODUCTS = "SET_PRODUCTS";
export const SET_VARIANTS = "SET_VARIANTS";
export const UPDATE_PAYMENT_SUMMARY = "UPDATE_PAYMENT_SUMMARY";
export const UPDATE_DISCOUNTED_BILL = "UPDATE_DISCOUNTED_BILL";
export const UPDATE_OVERALL_DISCOUNT = "UPDATE_OVERALL_DISCOUNT";

export const fetchCategories = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/categories`);
    dispatch({ type: SET_CATEGORIES, payload: response.data.categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

export const fetchProductsByCategory = (categoryId) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/inventory/categoryid/${categoryId}`
    );
    dispatch({ type: SET_PRODUCTS, payload: response.data.products });
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

export const fetchVariantsByProduct = (productId) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/inventory/${productId}`);
    dispatch({ type: SET_VARIANTS, payload: response.data });
  } catch (error) {
    console.error("Error fetching variants:", error);
  }
};

export const addToCart = (item) => ({
  type: ADD_TO_CART,
  payload: item,
});

export const addNewCartItem = (product) => ({
  type: ADD_NEW_CART_ITEM,
  payload: product,
});

export const updateCartItem = (cartItemId, updates) => ({
  type: UPDATE_CART_ITEM,
  payload: { cartItemId, updates },
});

export const removeFromCart = (cartItemId) => ({
  type: REMOVE_FROM_CART,
  payload: cartItemId,
});

export const applyDiscount = (discount) => ({
  type: APPLY_DISCOUNT,
  payload: discount,
});

export const setPaymentMethod = (method) => ({
  type: SET_PAYMENT_METHOD,
  payload: method,
});

export const processSale = (saleData) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/sales`, saleData);
    dispatch({ type: PROCESS_SALE, payload: response.data });
    return response.data;
  } catch (error) {
    console.error("Error processing sale:", error);
    throw error;
  }
};

export const updatePaymentSummary = (
  actualBill,
  itemDiscount,
  discountedBill
) => ({
  type: UPDATE_PAYMENT_SUMMARY,
  payload: { actualBill, itemDiscount, discountedBill },
});

export const updateDiscountedBill = (discountedBill) => ({
  type: UPDATE_DISCOUNTED_BILL,
  payload: discountedBill,
});

export const updateOverallDiscount = (overallDiscount) => ({
  type: UPDATE_OVERALL_DISCOUNT,
  payload: overallDiscount,
});
