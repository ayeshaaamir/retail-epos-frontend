import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../redux/actions/categoryActions";
import CategoryForm from "../components/CategoryManagement/CategoryForm";
import DeleteConfirmation from "../components/DeleteConfirmation";
import SearchBar from "../components/SearchBar";
import CategoryCards from "../components/CategoryManagement/CategoryCards";

const CategoryManagement = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] =
    useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleAddCategory = () => {
    setCurrentCategory(null);
    setIsFormVisible(true);
  };

  const handleEditCategory = (category) => {
    setCurrentCategory(category);
    setIsFormVisible(true);
  };

  const handleDeleteCategory = (id) => {
    setCategoryToDelete(id);
    setIsDeleteConfirmationVisible(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteCategory(categoryToDelete));
    setIsDeleteConfirmationVisible(false);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchText.toLowerCase()) ||
      category.description.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Category Management
      </h1>
      <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-md">
        <button
          onClick={handleAddCategory}
          className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition"
        >
          + Add Category
        </button>
        <SearchBar
          value={searchText}
          onChange={handleSearchChange}
          className="w-full md:w-1/3 border border-gray-300 rounded-lg p-2"
        />
      </div>
      <CategoryCards
        categories={filteredCategories}
        onEdit={handleEditCategory}
        onDelete={handleDeleteCategory}
      />
      {isFormVisible && (
        <CategoryForm
          category={currentCategory}
          onSubmit={(data) => {
            if (currentCategory) {
              dispatch(updateCategory({ ...currentCategory, ...data }));
            } else {
              dispatch(addCategory(data));
            }
            setIsFormVisible(false);
          }}
          onCancel={() => setIsFormVisible(false)}
        />
      )}
      {isDeleteConfirmationVisible && (
        <DeleteConfirmation
          onConfirm={handleConfirmDelete}
          onCancel={() => setIsDeleteConfirmationVisible(false)}
        />
      )}
    </div>
  );
};

export default CategoryManagement;
