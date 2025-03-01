import PropTypes from "prop-types";
import { useState } from "react";

const InventoryList = ({ inventory, onEdit, onDelete, onPrintBarcode }) => {
  const [selectedImage, setSelectedImage] = useState(null); // State to track the selected image

  // Function to open the image in a modal
  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  // Function to close the modal
  const closeImageModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {inventory.map((item) => (
          <div
            key={item.variantid}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* Image Section */}
            <div
              className="w-full h-48 bg-gray-200 flex items-center justify-center cursor-pointer"
              onClick={() => item.image_url && openImageModal(item.image_url)}
            >
              {item.image_url ? (
                <img
                  src={item.image_url}
                  alt={item.item_name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-500">No Image</span>
              )}
            </div>

            {/* Item Details Section */}
            <div className="p-4">
              <h3
                className="text-lg font-semibold truncate"
                title={item.item_name}
              >
                {item.item_name}
              </h3>
              <p
                className="text-sm text-gray-600 truncate"
                title={`SKU: ${item.sku}`}
              >
                SKU: {item.sku}
              </p>
              <p className="text-sm text-gray-600">Price: £{item.price}</p>
              <p className="text-sm text-gray-600">Stock: {item.stock}</p>
              <p
                className="text-sm text-gray-600 truncate"
                title={`Size: ${item.size}`}
              >
                Size: {item.size}
              </p>
              <p
                className="text-sm text-gray-600 truncate"
                title={`Color: ${item.color}`}
              >
                Color: {item.color}
              </p>
              <p
                className="text-sm text-gray-600 truncate"
                title={`Design No: ${item.design_no}`}
              >
                Design No: {item.design_no}
              </p>
              <p
                className="text-sm text-gray-600 truncate"
                title={`Category: ${item.categoryname}`}
              >
                Category: {item.categoryname}
              </p>
              <p
                className="text-sm text-gray-600 truncate"
                title={`Barcode: ${item.barcode}`}
              >
                Barcode: {item.barcode}
              </p>
            </div>

            {/* Actions Section */}
            <div className="p-4 bg-gray-50 flex justify-end space-x-2">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md transition"
                onClick={() => onEdit(item)}
              >
                ✏️ Edit
              </button>
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md transition"
                onClick={() => onPrintBarcode(item)}
              >
                🖨️ Barcode
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition"
                onClick={() => onDelete(item.sku)}
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for displaying the enlarged image */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeImageModal}
        >
          <div className="bg-white p-4 rounded-lg max-w-[90%] max-h-[90%] overflow-auto">
            <img
              src={selectedImage}
              alt="Enlarged"
              className="max-w-full max-h-full"
            />
          </div>
        </div>
      )}
    </div>
  );
};

InventoryList.propTypes = {
  inventory: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onPrintBarcode: PropTypes.func.isRequired,
};

export default InventoryList;
