import React from "react";

const Receipt = ({ saleData }) => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Receipt</h2>
      <div className="space-y-2">
        <p>Subtotal: £{saleData.subtotal.toFixed(2)}</p>
        <p>Discount: £{saleData.discount.toFixed(2)}</p>
        <p>Total: £{saleData.total.toFixed(2)}</p>
        <p>Payment Method: {saleData.paymentMethod}</p>
      </div>
    </div>
  );
};

export default Receipt;
