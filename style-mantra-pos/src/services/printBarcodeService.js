import axios from "axios";
import { API_BASE_URL } from "../constants";

export const printBarcode = async (barcodeToPrint, barcodeQuantity) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/barcode/print`, {
      barcode: barcodeToPrint,
      quantity: barcodeQuantity,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to print barcode");
  }
};
