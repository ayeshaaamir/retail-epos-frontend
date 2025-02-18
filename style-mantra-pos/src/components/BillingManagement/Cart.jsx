import { useDispatch, useSelector } from "react-redux";
import {
  updateCartItem,
  removeFromCart,
} from "../../redux/actions/billingActions";

const Cart = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.billing);

  const handlePriceChange = (rowData, newPrice) => {
    // Ensure the new price is not greater than the current price
    if (newPrice > rowData.price) {
      alert("Price cannot be increased. It can only be decreased.");
      return;
    }

    // Calculate discount
    const discount = rowData.total - newPrice;

    // Ensure discount does not go negative
    if (discount < 0) {
      alert("Discount cannot be negative.");
      return;
    }

    // Dispatch the update action
    dispatch(
      updateCartItem(rowData.cartItemId, {
        price: newPrice,
        item_discount: discount,
      })
    );
  };

  const handleRemoveItem = (rowData) => {
    dispatch(removeFromCart(rowData.cartItemId));
  };

  const handleAddItem = (product) => {
    // Generate a unique ID for the new cart item
    const cartItemId = Date.now(); // Use a timestamp or UUID for uniqueness
    const newCartItem = {
      ...product,
      cartItemId, // Add the unique identifier
    };

    // Dispatch the action to add the new item
    dispatch({
      type: "ADD_NEW_CART_ITEM",
      payload: newCartItem,
    });
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-xl space-y-8 overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-900">Cart Items</h2>
        <span className="bg-blue-600 text-white text-sm py-2 px-4 rounded-full">
          {cart.length} items
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200 text-gray-800 text-left">
            <tr>
              <th className="px-4 py-3 text-sm font-medium">Item</th>
              <th className="px-4 py-3 text-sm font-medium">Size</th>
              <th className="px-4 py-3 text-sm font-medium">Quantity</th>
              <th className="px-4 py-3 text-sm font-medium">Price</th>
              <th className="px-4 py-3 text-sm font-medium">Discount</th>
              <th className="px-4 py-3 text-sm font-medium">Actual Price</th>
              <th className="px-4 py-3 text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {cart.map((rowData) => (
              <tr
                key={rowData.cartItemId} // Use cartItemId as the key
                className="hover:bg-gray-100 transition duration-300"
              >
                <td className="px-4 py-4 text-sm">{rowData.item}</td>
                <td className="px-4 py-4 text-sm">{rowData.size}</td>
                <td className="px-4 py-4 text-sm">{rowData.qty}</td>
                <td className="px-4 py-4">
                  <input
                    type="number"
                    value={rowData.price}
                    onChange={(e) =>
                      handlePriceChange(rowData, parseFloat(e.target.value))
                    }
                    className="w-20 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                  />
                </td>
                <td className="px-4 py-4 text-sm">
                  £{rowData.item_discount.toFixed(2)}
                </td>
                <td className="px-4 py-4 text-sm">
                  £{rowData.total.toFixed(2)}
                </td>
                <td className="px-4 py-4">
                  <button
                    onClick={() => handleRemoveItem(rowData)}
                    className="text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 px-4 py-2 rounded-lg"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between font-bold text-lg mt-4">
        <span>Total Items:</span>
        <span>{cart.length}</span>
      </div>
    </div>
  );
};

export default Cart;
