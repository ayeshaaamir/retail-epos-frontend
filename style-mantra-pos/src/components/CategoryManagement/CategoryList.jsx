import PropTypes from "prop-types";

const CategoryList = ({ categories, onEdit, onDelete }) => {
  return (
    <div className="space-y-2">
      {categories.map((category) => (
        <div
          key={category.id}
          className="p-4 border rounded flex justify-between items-center"
        >
          <div>
            <h3 className="font-bold">{category.name}</h3>
            <p>{category.description}</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(category)}
              className="p-2 bg-yellow-500 text-white rounded"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(category.id)}
              className="p-2 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

CategoryList.propTypes = {
  categories: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CategoryList;
