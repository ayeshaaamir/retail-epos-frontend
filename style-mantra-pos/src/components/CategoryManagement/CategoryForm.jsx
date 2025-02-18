import { useState } from "react";
import PropTypes from "prop-types";

const CategoryForm = ({ category, onSubmit, onCancel }) => {
  const [name, setName] = useState(category ? category.name : "");
  const [description, setDescription] = useState(
    category ? category.description : ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, description });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="p-2 bg-gray-500 text-white rounded"
        >
          Cancel
        </button>
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Save
        </button>
      </div>
    </form>
  );
};
CategoryForm.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default CategoryForm;
