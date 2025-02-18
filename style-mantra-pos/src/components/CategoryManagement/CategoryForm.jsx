import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";

const CategoryForm = ({ category, onSubmit, onCancel }) => {
  const [name, setName] = useState(category ? category.name : "");
  const [description, setDescription] = useState(
    category ? category.description : ""
  );

  const isFormValid = name.trim() !== "" && description.trim() !== "";

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, description });
  };

  useEffect(() => {
    setName(category ? category.name : "");
    setDescription(category ? category.description : "");
  }, [category]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
        <h2 className="text-xl font-semibold mb-6 text-center text-indigo-600">
          Category Form
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-fluid">
            <label className="block text-gray-700">Category Name</label>
            <InputText
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-inputtext border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter category name"
            />
          </div>
          <div className="p-fluid">
            <label className="block text-gray-700">Description</label>
            <InputTextarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full p-textarea border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter category description"
            />
          </div>
          <div className="flex justify-end space-x-4 mt-4">
            <Button
              type="button"
              label="Cancel"
              className="p-button-secondary p-button-text text-red-600"
              onClick={onCancel}
            />
            <Button
              type="submit"
              label="Save"
              className={`p-button p-button-primary ${
                isFormValid
                  ? "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-300 transition-all duration-300 ease-in-out transform hover:scale-105"
                  : "bg-gray-400 text-gray-700 cursor-not-allowed"
              } rounded-lg py-2 px-4 shadow-md`}
              disabled={!isFormValid}
            />
          </div>
        </form>
      </div>
    </div>
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
