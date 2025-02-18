import { useDispatch, useSelector } from "react-redux";
import {
  updateTotal,
  setPaymentMethod,
} from "../../redux/slices/paymentSummarySlice";
import { processSale } from "../../redux/actions/billingActions"; // Assuming processSale is still in billingSlice

const PaymentSummary = () => {
  const dispatch = useDispatch();

  // Select state from paymentSummarySlice
  const {
    actualBill,
    discountFromCart,
    additionalDiscount,
    total,
    paymentMethod,
  } = useSelector((state) => state.paymentSummary);

  // Select cart from billingSlice (if needed)
  const { cart } = useSelector((state) => state.billing);

  // Handle editing the total
  const handleTotalChange = (e) => {
    const newTotal = parseFloat(e.target.value);
    if (!isNaN(newTotal)) {
      dispatch(updateTotal(newTotal));
    }
  };

  // Handle checkout
  const handleCheckout = async () => {
    if (!paymentMethod || cart.length === 0) {
      alert("Please select a payment method and add items to the cart.");
      return;
    }

    const saleData = {
      cart,
      paymentMethod,
      actualBill,
      discountFromCart,
      additionalDiscount,
      total,
    };

    try {
      await dispatch(processSale(saleData));
      alert("Sale completed successfully!");
    } catch (error) {
      alert("Failed to process sale.");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Payment Summary</h2>
      <div className="space-y-2">
        <p>Actual Bill: £{actualBill.toFixed(2)}</p>
        <p>Discount Applied: £{(discountFromCart + additionalDiscount).toFixed(2)}</p>
        <div>
          <label>Total:</label>
          <input
            type="number"
            value={total}
            onChange={handleTotalChange}
            className="w-full p-2 border rounded"
            min="0"
          />
        </div>
        <select
          value={paymentMethod}
          onChange={(e) => dispatch(setPaymentMethod(e.target.value))}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Payment Method</option>
          <option value="Cash">Cash</option>
          <option value="Card">Card</option>
        </select>
        <button
          onClick={handleCheckout}
          className="w-full p-2 bg-green-500 text-white rounded"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default PaymentSummary;