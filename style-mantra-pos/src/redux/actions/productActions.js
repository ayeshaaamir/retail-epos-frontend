import axios from "axios";
import { API_BASE_URL } from "../../constants";

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";

export const fetchProducts = () => async (dispatch) => {
  try {
    const [productsRes, categoriesRes] = await Promise.all([
      axios.get(`${API_BASE_URL}/product`),
      axios.get(`${API_BASE_URL}/categories`),
    ]);

    const productsWithCategory = productsRes.data.products.map((product) => {
      const category = categoriesRes.data.categories.find(
        (cat) => cat.id === product.category_id
      );
      return {
        ...product,
        category_name: category ? category.name : "N/A",
      };
    });

    dispatch({
      type: FETCH_PRODUCTS,
      payload: {
        products: productsWithCategory,
        categories: categoriesRes.data.categories,
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

export const addProduct = (productData) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/product`, productData);
    dispatch({ type: ADD_PRODUCT, payload: response.data });
  } catch (error) {
    console.error("Error adding product:", error);
  }
};

export const updateProduct = (productData) => async (dispatch) => {
  try {
    const { id, ...rest } = productData;
    const response = await axios.put(`${API_BASE_URL}/product/${id}`, rest);
    dispatch({ type: UPDATE_PRODUCT, payload: response.data });
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    await axios.delete(`${API_BASE_URL}/product`, { data: { id } });
    dispatch({ type: DELETE_PRODUCT, payload: id });
  } catch (error) {
    console.error("Error deleting product:", error);
  }
};
