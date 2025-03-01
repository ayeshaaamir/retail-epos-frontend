import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/billingActions";
import { API_BASE_URL } from "../../constants";
import axios from "axios";

const BarcodeInput = () => {
  const [barcode, setBarcode] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!barcode) return;

    try {
      const response = await axios.get(
        `${API_BASE_URL}/inventory/GetPrice/${barcode}`
      );
      const item = response.data[0];

      if (item.stock <= 0) {
        alert("Item is out of stock");
        return;
      }

      dispatch(
        addToCart({
          barcode: item.barcode,
          item: item.item_name,
          size: item.size,
          qty: 1,
          price: parseFloat(item.price),
          item_discount: 0,
          total: parseFloat(item.price),
          image: item.image_url,
        })
      );

      setBarcode("");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={barcode}
        onChange={(e) => setBarcode(e.target.value)}
        placeholder="Scan barcode"
        className="p-2 border rounded w-full"
        autoFocus
      />
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">
        Add
      </button>
    </form>
  );
};

export default BarcodeInput;
