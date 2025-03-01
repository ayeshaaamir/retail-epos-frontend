import { useDispatch, useSelector } from "react-redux";
import {
  updateCartItem,
  removeFromCart,
  updatePaymentSummary,
} from "../../redux/actions/billingActions";
import { useEffect } from "react";

const Cart = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.billing);

  const totalItems = cart.length;
  const itemDiscount = cart.reduce((sum, item) => sum + item.item_discount, 0);
  const discountedBill = cart.reduce((sum, item) => sum + item.price, 0);
  const actualBill = cart.reduce((sum, item) => sum + item.total, 0);
  
  useEffect(() => {
    dispatch(updatePaymentSummary(actualBill, itemDiscount, discountedBill));
  }, [cart, dispatch, actualBill, itemDiscount, discountedBill]);

  const handlePriceChange = (rowData, newPrice) => {
    if (newPrice > rowData.total) {
      alert("Price cannot be increased. It can only be decreased.");
      return;
    }
    const discount = rowData.total - newPrice;
    if (discount < 0) {
      alert("Discount cannot be negative.");
      return;
    }

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

  return (
    <div className="bg-white p-8 rounded-lg shadow-xl space-y-8 overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-900">Cart Items</h2>
        <span className="bg-blue-600 text-white text-sm py-2 px-4 rounded-full">
          {totalItems} items
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
                    className="w-24 px-4 py-2 bg-red-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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

      <div className="flex flex-col space-y-4 font-bold text-lg mt-4">
        <div className="flex justify-between">
          <span>Total Items:</span>
          <span>{totalItems}</span>
        </div>
        <hr />
        <div className="flex justify-between">
          <span>Actual Bill:</span>
          <span>£{actualBill.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Total Discount:</span>
          <span>£{itemDiscount.toFixed(2)}</span>
        </div>
        <hr />
        <div className="flex justify-between">
          <span>Dicounted Bill:</span>
          <span>£{discountedBill.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default Cart;
