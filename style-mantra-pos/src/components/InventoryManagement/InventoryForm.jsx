import PropTypes from "prop-types";
import { useState } from "react";

const InventoryForm = ({
  inventoryData,
  products,
  sizeOptions,
  onSubmit,
  onCancel,
  isEditMode,
}) => {
  const [formData, setFormData] = useState({
    product_id: inventoryData.product_id || "",
    sku: inventoryData.sku || "",
    price: inventoryData.price || 0,
    stock: inventoryData.stock || 0,
    size: inventoryData.size || "",
    color: inventoryData.color || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedData = {
      productid: formData.product_id,
      price: formData.price,
      stock: formData.stock,
      size: formData.size,
      color: formData.color,
      sku: formData.sku,
    };
    onSubmit(formattedData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto space-y-4"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Product
        </label>
        <select
          value={formData.product_id}
          onChange={(e) =>
            setFormData({ ...formData, product_id: e.target.value })
          }
          className="w-full p-2 border rounded-md bg-gray-50 focus:ring focus:ring-blue-300"
          required
        >
          <option value="">Select a product</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.item_name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          SKU
        </label>
        <input
          type="text"
          value={formData.sku}
          onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
          disabled={isEditMode}
          className="w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Price (£)
        </label>
        <input
          type="number"
          value={formData.price}
          onChange={(e) =>
            setFormData({ ...formData, price: Number(e.target.value) })
          }
          className="w-full p-2 border rounded-md bg-gray-50 focus:ring focus:ring-blue-300"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Stock
        </label>
        <input
          type="number"
          value={formData.stock}
          onChange={(e) =>
            setFormData({ ...formData, stock: Number(e.target.value) })
          }
          className="w-full p-2 border rounded-md bg-gray-50 focus:ring focus:ring-blue-300"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Size
        </label>
        <select
          value={formData.size}
          onChange={(e) => setFormData({ ...formData, size: e.target.value })}
          className="w-full p-2 border rounded-md bg-gray-50 focus:ring focus:ring-blue-300"
          required
        >
          <option value="">Select a size</option>
          {sizeOptions.map((size, index) => (
            <option key={index} value={size.value}>
              {size.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Color
        </label>
        <input
          type="text"
          value={formData.color}
          onChange={(e) => setFormData({ ...formData, color: e.target.value })}
          className="w-full p-2 border rounded-md bg-gray-50 focus:ring focus:ring-blue-300"
          required
        />
      </div>

      <div className="flex justify-end gap-3 mt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Save
        </button>
      </div>
    </form>
  );
};

InventoryForm.propTypes = {
  inventoryData: PropTypes.object.isRequired,
  products: PropTypes.array.isRequired,
  sizeOptions: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isEditMode: PropTypes.bool.isRequired,
};

export default InventoryForm;
