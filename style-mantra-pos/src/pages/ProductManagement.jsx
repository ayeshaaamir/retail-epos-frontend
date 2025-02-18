import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../redux/actions/productActions";
import ProductForm from "../components/ProductManagement/ProductForm";
import ProductList from "../components/ProductManagement/ProductList";
import DeleteConfirmation from "../components/DeleteConfirmation";
import SearchBar from "../components/SearchBar";

const ProductManagement = () => {
  const dispatch = useDispatch();
  const { products, categories } = useSelector((state) => state.products);
  const [isFormVisible, setIsFormVisible] = React.useState(false);
  const [currentProduct, setCurrentProduct] = React.useState(null);
  const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] =
    React.useState(false);
  const [productToDelete, setProductToDelete] = React.useState(null);
  const [searchText, setSearchText] = React.useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddProduct = () => {
    setCurrentProduct(null);
    setIsFormVisible(true);
  };

  const handleEditProduct = (product) => {
    setCurrentProduct(product);
    setIsFormVisible(true);
  };

  const handleDeleteProduct = (id) => {
    setProductToDelete(id);
    setIsDeleteConfirmationVisible(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteProduct(productToDelete));
    setIsDeleteConfirmationVisible(false);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    Object.values(product).some((value) =>
      String(value).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Product Management</h1>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handleAddProduct}
          className="p-2 bg-green-500 text-white rounded"
        >
          Add Product
        </button>
        <SearchBar value={searchText} onChange={handleSearchChange} />
      </div>
      <ProductList
        products={filteredProducts}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
      />
      {isFormVisible && (
        <ProductForm
          product={currentProduct}
          categories={categories}
          onSubmit={(data) => {
            if (currentProduct) {
              dispatch(updateProduct({ id: currentProduct.id, ...data })).then(
                () => {
                  dispatch(fetchProducts()); // Refetch products after update
                }
              );
            } else {
              dispatch(addProduct(data)).then(() => {
                dispatch(fetchProducts()); // Refetch products after add
              });
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

export default ProductManagement;
