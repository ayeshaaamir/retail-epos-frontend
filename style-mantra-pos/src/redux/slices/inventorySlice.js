import {
  FETCH_INVENTORY,
  ADD_INVENTORY,
  UPDATE_INVENTORY,
  DELETE_INVENTORY,
} from "../actions/inventoryActions";

const initialState = {
  inventory: [],
  products: [],
};

const inventoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_INVENTORY:
      return {
        ...state,
        inventory: action.payload.inventory,
        products: action.payload.products,
      };
    case ADD_INVENTORY:
      return {
        ...state,
        inventory: [...state.inventory, action.payload],
      };
    case UPDATE_INVENTORY:
      return {
        ...state,
        inventory: state.inventory.map((item) =>
          item.sku === action.payload.sku ? action.payload : item
        ),
      };
    case DELETE_INVENTORY:
      return {
        ...state,
        inventory: state.inventory.filter(
          (item) => item.sku !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default inventoryReducer;
