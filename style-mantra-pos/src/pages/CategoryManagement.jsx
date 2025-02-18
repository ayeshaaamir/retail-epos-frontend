import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../redux/actions/categoryActions";
import CategoryForm from "../components/CategoryManagement/CategoryForm";
import CategoryList from "../components/CategoryManagement/CategoryList";
import DeleteConfirmation from "../components/DeleteConfirmation";
import SearchBar from "../components/SearchBar";

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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Category Management</h1>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handleAddCategory}
          className="p-2 bg-green-500 text-white rounded"
        >
          Add Category
        </button>
        <SearchBar value={searchText} onChange={handleSearchChange} />
      </div>
      <CategoryList
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
