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
    <div className="p-4">
      <div className="printable-receipt bg-white p-2 rounded-lg shadow-none">
        <div className="text-center mb-2">
          <h2 className="text-2xl font-bold">Style Mantra</h2>
          <p className="text-sm text-black-600">141-143 Ilford Lane</p>
          <p className="text-sm text-black-600">Tel Number: 0208-911-8010</p>
        </div>

        <div className="mb-3 text-sm">
          <div className="flex justify-between">
            <span>Date:</span>
            <span>{new Date().toLocaleString()}</span>
          </div>
          <div className="flex justify-between mb-1">
            <span>Payment Method:</span>
            <span className="font-medium">{saleData.paymentType}</span>
          </div>
          <div className="flex justify-between mb-1">
            <span>Cashier:</span>
            <span className="font-medium">Ali</span>
          </div>
        </div>

        <table className="w-full mb-3 text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-1">Item</th>
              <th className="text-left py-1">Size</th>
              <th className="text-right py-1">Quantity</th>
              <th className="text-right py-1">Price</th>
              <th className="text-right py-1">Discount</th>
              <th className="text-right py-1 truncate">Actual Price</th>
            </tr>
          </thead>
          <tbody>
            {saleData.cart.map((item) => (
              <tr key={item.barcode} className="border-b">
                <td className="py-1 truncate">{item.item}</td>
                <td className="py-1">{item.size || "-"}</td>
                <td className="text-right py-1">{item.quantity}</td>
                <td className="text-right py-1 truncate">£{item.price.toFixed(2)}</td>
                <td className="text-right py-1">
                  £{item.item_discount.toFixed(2)}
                </td>
                <td className="text-right py-1">£{item.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="payment-summary mb-3">
          <h3 className="text-lg font-bold mb-2">Payment Summary</h3>
          <div className="flex justify-between mb-1">
            <span>Total Amount:</span>
            <span>£{saleData.actualBill.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-1">
            <span>Item-Level Discount:</span>
            <span>£{saleData.itemDiscount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-1">
            <span>Discounted Total:</span>
            <span>£{saleData.discountedBill.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-1">
            <span>Total Discount Applied:</span>
            <span>£{saleData.overallDiscount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold border-t pt-1">
            <span>Amount to Pay:</span>
            <span>£{saleData.customerBillPrice.toFixed(2)}</span>
          </div>
        </div>

        <div className="thank-you text-center mt-2">
          <p className="text-sm text-black-600">Thank you for your purchase!</p>
          <div className="flex justify-center mt-2">
            <Barcode
              value={saleData.barcode}
              width={2}
              height={80}
              fontSize={14}
            />
          </div>
          <div>
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
          }

          body, html {
            margin: 0;
            padding: 0;
            visibility: hidden;
          }

          .printable-receipt {
            visibility: visible;
            position: fixed;
            top: 0;
            left: 0;
            width: 110mm;
            padding: 0;
            font-size: 16px;
          }

          .printable-receipt h2 {
            font-size: 20px;
          }

          .printable-receipt table {
            font-size: 16px;
          }

          // .printable-receipt * {
          //   visibility: visible;
          // }

          .no-print {
            display: none !important;
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
