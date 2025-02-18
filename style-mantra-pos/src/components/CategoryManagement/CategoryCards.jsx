import PropTypes from "prop-types";

const CategoryCards = ({ categories, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <div
          key={category.id}
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
        >
          <h3 className="text-xl font-semibold text-gray-800">
            {category.name}
          </h3>
          <p className="text-gray-600 mt-2">{category.description}</p>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={() => onEdit(category)}
              className="text-blue-600 border-2 border-blue-600 rounded-full px-4 py-2 hover:bg-blue-100 transition-all duration-200"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(category.id)}
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

CategoryCards.propTypes = {
  categories: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CategoryCards;
