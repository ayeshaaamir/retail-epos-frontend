import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateDiscountedBill,
  processSale,
} from "../../redux/actions/billingActions";

const PaymentSummary = () => {
  const dispatch = useDispatch();
  const {
    actualBill,
    itemDiscount,
    discountedBill,
    overallDiscount,
    customerBillPrice,
  } = useSelector((state) => state.billing.paymentSummary);

  // Access cart from the root state, not paymentSummary
  const cart = useSelector((state) => state.billing.cart);

  const [paymentMethod, setPaymentMethod] = useState("Cash"); // Default payment method

  const handleDiscountedBillChange = (e) => {
    const newDiscountedBill = parseFloat(e.target.value);
    if (!isNaN(newDiscountedBill)) {
      dispatch(updateDiscountedBill(newDiscountedBill));
    }
  };

  const handleProcessSale = () => {
    if (!cart || cart.length === 0) {
      alert("Your cart is empty. Please add items before processing the sale.");
      return;
    }

    // Prepare the payload for the API
    const saleData = {
      cart: cart.map((item) => ({
        barcode: item.barcode,
        quantity: item.quantity || 1, // Default to 1 if quantity is missing
        item_discount: item.item_discount || 0, // Default to 0 if item_discount is missing
      })),
      paymentType: paymentMethod,
      discount: overallDiscount,
      paidAmount: customerBillPrice,
    };

    console.log("Sale Data Payload:", saleData); // Log the payload for debugging

    // Dispatch the processSale action
    dispatch(processSale(saleData))
      .then((response) => {
        alert("Sale processed successfully!");
        console.log("Sale Response:", response);
      })
      .catch((error) => {
        alert("Error processing sale. Please try again.");
        console.error("Sale Error:", error);
      });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Payment Summary</h2>
      <div className="space-y-3">
        {/* Total Amount Before Discount */}
        <div className="flex justify-between">
          <span>Total Amount:</span>
          <span>£{actualBill.toFixed(2)}</span>
        </div>

        {/* Discount Applied to Individual Items */}
        <div className="flex justify-between">
          <span>Item-Level Discount:</span>
          <span>£{itemDiscount.toFixed(2)}</span>
        </div>

        {/* Editable Discounted Bill */}
        <div className="flex justify-between">
          <span>Discounted Total:</span>
          <input
            type="number"
            value={discountedBill}
            onChange={handleDiscountedBillChange}
            className="w-20 px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Overall Discount (Item Discount + Additional Discount) */}
        <div className="flex justify-between">
          <span>Total Discount Applied:</span>
          <span>£{overallDiscount.toFixed(2)}</span>
        </div>

        <hr className="my-2" />

        {/* Final Amount to be Paid by Customer */}
        <div className="flex justify-between font-bold">
          <span>Amount to Pay:</span>
          <span>£{customerBillPrice.toFixed(2)}</span>
        </div>

        {/* Payment Method Dropdown */}
        <div className="flex justify-between items-center">
          <span>Select Payment Method:</span>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Cash">Cash</option>
            <option value="Card">Card</option>
          </select>
        </div>

        {/* Process Sale Button */}
        <button
          onClick={handleProcessSale}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Complete Purchase
        </button>
      </div>
    </div>
  );
};

export default PaymentSummary;
