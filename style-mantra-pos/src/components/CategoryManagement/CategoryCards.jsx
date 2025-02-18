import PropTypes from "prop-types";

const CategoryCards = ({ categories, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <div
          key={category.id}
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
        >
          <h3 className="text-xl font-semibold text-gray-800">{category.name}</h3>
          <p className="text-gray-600 mt-2">{category.description}</p>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={() => onEdit(category)}
              className="px-3 py-1 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600 transition"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(category.id)}
              className="px-3 py-1 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

CategoryCards.propTypes = {
  categories: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CategoryCards;
