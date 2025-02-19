import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDiscountedBill } from "../../redux/actions/billingActions";

const PaymentSummary = () => {
  const dispatch = useDispatch();
  const {
    actualBill,
    itemDiscount,
    discountedBill,
    overallDiscount,
    customerBillPrice,
  } = useSelector((state) => state.billing.paymentSummary);

  const handleDiscountedBillChange = (e) => {
    const newDiscountedBill = parseFloat(e.target.value);
    if (!isNaN(newDiscountedBill)) {
      dispatch(updateDiscountedBill(newDiscountedBill));
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Payment Summary</h2>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Actual Bill:</span>
          <span>£{actualBill.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Item Discount:</span>
          <span>£{itemDiscount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Discounted Bill:</span>
          <input
            type="number"
            value={discountedBill}
            onChange={handleDiscountedBillChange}
            className="w-20 px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-between">
          <span>Overall Discount:</span>
          <span>£{overallDiscount.toFixed(2)}</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between font-bold">
          <span>Customer Bill Price:</span>
          <span>£{customerBillPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentSummary;
