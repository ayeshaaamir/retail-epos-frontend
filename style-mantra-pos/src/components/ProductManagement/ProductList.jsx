import PropTypes from "prop-types";

const ProductList = ({ products, onEdit, onDelete }) => {
  return (
    <div className="flex space-x-6 overflow-x-auto py-4">
      {products.map((product, index) => (
        <div
          key={product.id || index} // Fallback to index if id is not available
          className="w-64 p-4 bg-gray-50 border border-gray-300 rounded-lg flex flex-col justify-between items-start shadow-sm hover:shadow-lg transition-shadow duration-300"
        >
          {/* Product Info */}
          <div className="flex-1">
            {/* Product Name with Bold and Colorful */}
            <h3 className="text-lg font-bold text-black-600">
              {product.item_name}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-700 mt-1">{product.description}</p>

            {/* Design No and Category - Highlighted */}
            <div className="text-white bg-green-500 rounded-md mt-2 px-2 py-1">
              <p>
                Design No:{" "}
                <span className="font-semibold">{product.design_no}</span>
              </p>
              <p>
                Category:{" "}
                <span className="font-semibold">{product.category_name}</span>
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 mt-3">
            <button
              onClick={() => onEdit(product)}
              className="text-blue-600 border-2 border-blue-600 rounded-full px-4 py-2 hover:bg-blue-100 transition-all duration-200"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(product.id)}
              className="text-red-600 border-2 border-red-600 rounded-full px-4 py-2 hover:bg-red-100 transition-all duration-200"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ProductList;
