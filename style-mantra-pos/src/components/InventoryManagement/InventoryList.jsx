import PropTypes from "prop-types";

const InventoryList = ({ inventory, onEdit, onDelete, onPrintBarcode }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-4 py-2 text-left">Item Name</th>
            <th className="px-4 py-2 text-left">SKU</th>
            <th className="px-4 py-2 text-left">Price</th>
            <th className="px-4 py-2 text-left">Stock</th>
            <th className="px-4 py-2 text-left">Size</th>
            <th className="px-4 py-2 text-left">Color</th>
            <th className="px-4 py-2 text-left truncate">Design No</th>
            <th className="px-4 py-2 text-left">Category</th>
            <th className="px-4 py-2 text-left">Barcode</th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item, index) => (
            <tr
              key={item.index}
              className={`border-b ${
                index % 2 === 0 ? "bg-gray-100" : "bg-white"
              } hover:bg-gray-200 transition`}
            >
              <td className="px-4 py-3 max-w-[200px] truncate" title={item.item_name}>
                {item.item_name}
              </td>
              <td className="px-4 py-3 max-w-[150px] truncate" title={item.sku}>
                {item.sku}
              </td>
              <td className="px-4 py-3">£{item.price}</td>
              <td className="px-4 py-3">{item.stock}</td>
              <td className="px-4 py-3 max-w-[100px] truncate" title={item.size}>
                {item.size}
              </td>
              <td className="px-4 py-3 max-w-[100px] truncate" title={item.color}>
                {item.color}
              </td>
              <td className="px-4 py-3 max-w-[150px] truncate" title={item.design_no}>
                {item.design_no}
              </td>
              <td className="px-4 py-3 max-w-[150px] truncate" title={item.categoryname}>
                {item.categoryname}
              </td>
              <td className="px-4 py-3 max-w-[150px] truncate" title={item.barcode}>
                {item.barcode}
              </td>
              <td className="px-4 py-3 flex justify-center space-x-2">
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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