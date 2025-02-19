import React from "react";
import { useSelector } from "react-redux";

const PaymentSummary = () => {
  const { actualBill, totalDiscount, discountedBill } = useSelector(
    (state) => state.billing.paymentSummary
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Payment Summary</h2>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Actual Bill:</span>
          <span>£{actualBill.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Total Discount:</span>
          <span>£{totalDiscount.toFixed(2)}</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between font-bold">
          <span>Discounted Bill:</span>
          <span>£{discountedBill.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentSummary;