import PropTypes from "prop-types";
import { useEffect } from "react";
import Barcode from "react-barcode";

const Receipt = ({ saleData }) => {
  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    handlePrint();
    const timeout = setTimeout(() => {
      window.location.reload();
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex justify-center p-4">
      <div className="printable-receipt bg-white p-2 w-80 mx-auto">
        <div className="text-center mb-2">
          <h2 className="text-xl font-bold">Style Mantra</h2>
          <p className="text-xs text-black-600">141-143 Ilford Lane</p>
          <p className="text-xs text-black-600">Tel: 0208-911-8010</p>
        </div>

        <div className="mb-3 text-xs">
          <div className="flex justify-between">
            <span>Date:</span>
            <span>{new Date().toLocaleString()}</span>
          </div>
          <div className="flex justify-between mb-1">
            <span>Payment:</span>
            <span className="font-medium">{saleData.paymentType}</span>
          </div>
          <div className="flex justify-between mb-1">
            <span>Cashier:</span>
            <span className="font-medium">Ali</span>
          </div>
        </div>

        <table className="w-full mb-3 text-xs table-fixed">
          <thead>
            <tr className="border-b">
              <th className="text-left py-1 w-20">Item</th>
              <th className="text-left py-1 w-8">Size</th>
              <th className="text-right py-1 w-8">Qty</th>
              <th className="text-right py-1 w-12">Price</th>
              <th className="text-right py-1 w-12">Disc</th>
              <th className="text-right py-1 w-12">Total</th>
            </tr>
          </thead>
          <tbody>
            {saleData.cart.map((item) => (
              <tr key={item.barcode} className="border-b">
                <td className="py-1 truncate">{item.item}</td>
                <td className="py-1 truncate">{item.size || "-"}</td>
                <td className="text-right py-1">{item.quantity}</td>
                <td className="text-right py-1">£{item.price.toFixed(2)}</td>
                <td className="text-right py-1">
                  £{item.item_discount.toFixed(2)}
                </td>
                <td className="text-right py-1">£{item.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="payment-summary mb-3 text-xs">
          <h3 className="text-sm font-bold mb-2">Payment Summary</h3>
          <div className="flex justify-between mb-1">
            <span>Total Amount:</span>
            <span>£{saleData.actualBill.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-1">
            <span>Item Discount:</span>
            <span>£{saleData.itemDiscount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-1">
            <span>Discounted Total:</span>
            <span>£{saleData.discountedBill.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-1">
            <span>Total Discount:</span>
            <span>£{saleData.overallDiscount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold border-t pt-1">
            <span>Amount to Pay:</span>
            <span>£{saleData.customerBillPrice.toFixed(2)}</span>
          </div>
        </div>

        <div className="thank-you text-center mt-2">
          <p className="text-xs text-black-600">Thank you for your purchase!</p>
          <div className="flex justify-center mt-2">
            <Barcode
              value={saleData.barcode}
              width={1}
              height={60}
              fontSize={13}
              margin={0}
            />
          </div>
          <div className="text-xs mt-2">
            <p>
              Terms and conditions: You agree to the following terms and
              conditions displayed in store which includes:
              <br />
              NO RETURN OR REFUNDS ON SALE ITEMS.
              <br />
              Exchange within 7 days of purchase if the item is brought back in
              same condition with a valid proof of purchase.
              <br />
              Items ordered cannot be exchanged or returned.
              <br />
              Due to hygiene reasons there is no exchange of jewellery,
              accessories including scarves, hijaabs, duppata etc.
              <br />
              We recommend dry clean only for all clothings, we do not guarantee
              materials, colours, slippage, embroidery or stones on any
              materials including jewellery.
              <br />
              Stones are glued and can fall off.
              <br />
              Jewellery is handcrafted and delicate and can be broken easily if
              not cared for.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          * {
            box-sizing: border-box;
          }   

          @page {
            margin: 0;
            size: 80mm auto;
          }

          body, html {
            margin: 0;
            padding: 0;
            visibility: hidden;
            height: 100%;
            width: 80mm;
          }

          .printable-receipt {
            visibility: visible;
            position: fixed;
            top: 0;
            left: 0;
            width: 80mm;
            padding: 8px;
            font-size: 12px;
            color: black;
            background: white;
            box-shadow: none;
          }

          .printable-receipt * {
            visibility: visible;
          }

          .no-print, 
          .no-print * {
            display: none !important;
          }

          table {
            width: 100% !important;
            table-layout: fixed;
          }

          td, th {
            padding: 2px !important;
          }
        }
      `}</style>
    </div>
  );
};

Receipt.propTypes = {
  saleData: PropTypes.shape({
    paymentType: PropTypes.string.isRequired,
    cart: PropTypes.arrayOf(
      PropTypes.shape({
        barcode: PropTypes.string.isRequired,
        item: PropTypes.string.isRequired,
        size: PropTypes.string,
        quantity: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        item_discount: PropTypes.number.isRequired,
        total: PropTypes.number.isRequired,
      })
    ).isRequired,
    actualBill: PropTypes.number.isRequired,
    itemDiscount: PropTypes.number.isRequired,
    discountedBill: PropTypes.number.isRequired,
    overallDiscount: PropTypes.number.isRequired,
    customerBillPrice: PropTypes.number.isRequired,
    barcode: PropTypes.string.isRequired,
  }).isRequired,
};

export default Receipt;
