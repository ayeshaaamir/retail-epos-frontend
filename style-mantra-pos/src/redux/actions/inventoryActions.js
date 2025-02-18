import axios from "axios";
import { API_BASE_URL } from "../../constants";
import { getProducts } from "../../services/productManagementService";

export const FETCH_INVENTORY = "FETCH_INVENTORY";
export const ADD_INVENTORY = "ADD_INVENTORY";
export const UPDATE_INVENTORY = "UPDATE_INVENTORY";
export const DELETE_INVENTORY = "DELETE_INVENTORY";

export const fetchInventory = () => async (dispatch) => {
  try {
    const [inventoryRes, productsRes] = await Promise.all([
      axios.get(`${API_BASE_URL}/inventory`),
      getProducts(),
    ]);

    dispatch({
      type: FETCH_INVENTORY,
      payload: {
        inventory: inventoryRes.data.inventory,
        products: productsRes.products,
      },
    });
  } catch (error) {
    console.error("Error fetching inventory:", error);
  }
};

export const addInventory = (inventoryData) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/inventory`, {
      items: [inventoryData],
    });
    dispatch({ type: ADD_INVENTORY, payload: response.data });
    return response.data;
  } catch (error) {
    console.error("Error adding inventory:", error);
  }
};

export const updateInventory = (inventoryData) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/inventory`, {
      items: [inventoryData],
    });
    dispatch({ type: UPDATE_INVENTORY, payload: response.data });
    return response.data;
  } catch (error) {
    console.error("Error updating inventory:", error);
  }
};

export const deleteInventory = (sku) => async (dispatch) => {
  try {
    await axios.delete(`${API_BASE_URL}/inventory`, { data: { sku } });
    dispatch({ type: DELETE_INVENTORY, payload: sku });
  } catch (error) {
    console.error("Error deleting inventory:", error);
  }
};
