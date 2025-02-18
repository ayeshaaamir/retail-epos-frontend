import PropTypes from "prop-types";
import { useEffect } from "react";

const BarcodePrintModal = ({
  barcode,
  quantity,
  onQuantityChange,
  onPrint,
  onCancel,
}) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onCancel();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onCancel]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Print Barcode</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Barcode
          </label>
          <input
            type="text"
            value={barcode}
            disabled
            className="w-full mt-1 p-2 border rounded-md bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Quantity
          </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => onQuantityChange(Number(e.target.value))}
            min="1"
            max="100"
            className="w-full mt-1 p-2 border rounded-md"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
          >
            Cancel
          </button>
          <button
            onClick={onPrint}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            Print
          </button>
        </div>
      </div>
    </div>
  );
};

BarcodePrintModal.propTypes = {
  barcode: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  onQuantityChange: PropTypes.func.isRequired,
  onPrint: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default BarcodePrintModal;
