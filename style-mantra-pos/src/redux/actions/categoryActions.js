import axios from "axios";
import { API_BASE_URL } from "../../constants";

export const FETCH_CATEGORIES = "FETCH_CATEGORIES";
export const ADD_CATEGORY = "ADD_CATEGORY";
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";
export const DELETE_CATEGORY = "DELETE_CATEGORY";

export const fetchCategories = () => async (dispatch) => {
  const response = await axios.get(`${API_BASE_URL}/categories`);
  dispatch({ type: FETCH_CATEGORIES, payload: response.data.categories });
};

export const addCategory = (category) => async (dispatch) => {
  const response = await axios.post(`${API_BASE_URL}/categories`, category);
  dispatch({ type: ADD_CATEGORY, payload: response.data.category });
};

export const updateCategory = (category) => async (dispatch) => {
  const { id, name, description } = category;
  const response = await axios.put(`${API_BASE_URL}/categories`, {
    name,
    description,
    id,
  });
  dispatch({ type: UPDATE_CATEGORY, payload: response.data.category });
};

export const deleteCategory = (id) => async (dispatch) => {
  await axios.delete(`${API_BASE_URL}/categories/${id}`);
  dispatch({ type: DELETE_CATEGORY, payload: id });
};
