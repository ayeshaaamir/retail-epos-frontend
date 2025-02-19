import {
  ADD_TO_CART,
  UPDATE_CART_ITEM,
  REMOVE_FROM_CART,
  APPLY_DISCOUNT,
  PROCESS_SALE,
  SET_PAYMENT_METHOD,
  SET_CATEGORIES,
  SET_PRODUCTS,
  SET_VARIANTS,
  ADD_NEW_CART_ITEM,
  UPDATE_PAYMENT_SUMMARY,
  UPDATE_OVERALL_DISCOUNT,
  UPDATE_DISCOUNTED_BILL,
} from "../actions/billingActions";

const initialState = {
  cart: [],
  discount: 0,
  subtotal: 0,
  total: 0,
  paymentMethod: null,
  receipt: null,
  categories: [],
  products: [],
  variants: [],
  paymentSummary: {
    actualBill: 0,
    itemDiscount: 0,
    discountedBill: 0,
    overallDiscount: 0,
    customerBillPrice: 0,
  },
};

const billingReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const cartItemId = Date.now();
      const newCartItem = {
        ...action.payload,
        cartItemId,
      };
      return {
        ...state,
        cart: [...state.cart, newCartItem],
      };
    }

    case UPDATE_CART_ITEM:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.cartItemId === action.payload.cartItemId
            ? { ...item, ...action.payload.updates }
            : item
        ),
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.cartItemId !== action.payload),
      };

    case ADD_NEW_CART_ITEM: {
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    }

    case APPLY_DISCOUNT:
      return {
        ...state,
        discount: action.payload,
        total: state.subtotal - action.payload,
      };

    case PROCESS_SALE:
      return {
        ...state,
        receipt: action.payload,
        cart: [],
        discount: 0,
        subtotal: 0,
        total: 0,
        paymentSummary: {
          ...state.paymentSummary,
          actualBill: 0,
          itemDiscount: 0,
          discountedBill: 0,
          overallDiscount: 0,
          customerBillPrice: 0,
        },
      };

    case SET_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };

    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };

    case SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };

    case SET_VARIANTS:
      return {
        ...state,
        variants: action.payload,
      };

    case UPDATE_PAYMENT_SUMMARY:
      return {
        ...state,
        paymentSummary: {
          ...state.paymentSummary,
          actualBill: action.payload.actualBill,
          itemDiscount: action.payload.itemDiscount,
          discountedBill: action.payload.discountedBill,
          overallDiscount:
            action.payload.actualBill - action.payload.discountedBill,
          customerBillPrice: action.payload.discountedBill,
        },
      };

    case UPDATE_DISCOUNTED_BILL: {
      const newDiscountedBill = action.payload;
      const actualBill = state.paymentSummary.actualBill;

      const overallDiscount = actualBill - newDiscountedBill;

      return {
        ...state,
        paymentSummary: {
          ...state.paymentSummary,
          discountedBill: newDiscountedBill,
          overallDiscount,
          customerBillPrice: newDiscountedBill,
        },
      };
    }

    case UPDATE_OVERALL_DISCOUNT: {
      const newOverallDiscount = action.payload;
      const discountedBill = state.paymentSummary.discountedBill;
      const customerBillPrice = discountedBill - newOverallDiscount;

      return {
        ...state,
        paymentSummary: {
          ...state.paymentSummary,
          overallDiscount: newOverallDiscount,
          customerBillPrice,
        },
      };
    }

    default:
      return state;
  }
};

export default billingReducer;
