import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchInventory,
  addInventory,
  updateInventory,
  deleteInventory,
} from "../redux/actions/inventoryActions";
import InventoryForm from "../components/InventoryManagement/InventoryForm";
import InventoryList from "../components/InventoryManagement/InventoryList";
import DeleteConfirmation from "../components/DeleteConfirmation";
import BarcodePrintModal from "../components/InventoryManagement/BarcodePrintModal";
import SearchBar from "../components/SearchBar";
import { printBarcode } from "../services/printBarcodeService";

const InventoryManagement = () => {
  const dispatch = useDispatch();
  const { inventory, products } = useSelector((state) => state.inventory);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentInventory, setCurrentInventory] = useState(null);
  const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] =
    useState(false);
  const [skuToDelete, setSkuToDelete] = useState("");
  const [isBarcodeModalVisible, setIsBarcodeModalVisible] = useState(false);
  const [barcodeToPrint, setBarcodeToPrint] = useState("");
  const [barcodeQuantity, setBarcodeQuantity] = useState(1);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    dispatch(fetchInventory());
  }, [dispatch]);

  const handleAddInventory = () => {
    setCurrentInventory({
      productid: null,
      price: null,
      stock: null,
      size: "",
      color: "",
      sku: "",
    });
    setIsFormVisible(true);
  };

  const handleEditInventory = (item) => {
    setCurrentInventory(item);
    setIsFormVisible(true);
  };

  const handleDeleteInventory = (sku) => {
    setSkuToDelete(sku);
    setIsDeleteConfirmationVisible(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteInventory(skuToDelete));
    setIsDeleteConfirmationVisible(false);
  };

  const handleBarcodePrint = (item) => {
    setBarcodeToPrint(item.barcode);
    setIsBarcodeModalVisible(true);
  };

  const handlePrintBarcode = async () => {
    try {
      await printBarcode(barcodeToPrint, barcodeQuantity);
      setIsBarcodeModalVisible(false);
    } catch (error) {
      console.error("Error printing barcode:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const filteredInventory = inventory.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const sizeOptions = [
    { label: "XXL", value: "XXL" },
    { label: "XL", value: "XL" },
    { label: "L", value: "L" },
    { label: "M", value: "M" },
    { label: "S", value: "S" },
    { label: "XS", value: "XS" },
    { label: "10", value: "10" },
    { label: "12", value: "12" },
    { label: "14", value: "14" },
    { label: "16", value: "16" },
    { label: "18", value: "18" },
    { label: "20", value: "20" },
    { label: "22", value: "22" },
    { label: "24", value: "24" },
    { label: "26", value: "26" },
    { label: "28", value: "28" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Inventory Management</h1>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handleAddInventory}
          className="p-2 bg-green-500 text-white rounded"
        >
          Add Inventory
        </button>
        <SearchBar value={searchText} onChange={handleSearchChange} />
      </div>
      <InventoryList
        inventory={filteredInventory}
        onEdit={handleEditInventory}
        onDelete={handleDeleteInventory}
        onPrintBarcode={handleBarcodePrint}
      />
      {isFormVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-lg w-full">
            <InventoryForm
              inventoryData={currentInventory}
              products={products}
              sizeOptions={sizeOptions}
              onSubmit={(data) => {
                if (currentInventory.sku) {
                  dispatch(updateInventory(data)).then(() => {
                    dispatch(fetchInventory());
                    setIsFormVisible(false);
                  });
                } else {
                  dispatch(addInventory(data)).then(() => {
                    dispatch(fetchInventory());
                    setIsFormVisible(false);
                  });
                }
              }}
              onCancel={() => setIsFormVisible(false)}
              isEditMode={!!currentInventory.sku}
            />
          </div>
        </div>
      )}

      {isDeleteConfirmationVisible && (
        <DeleteConfirmation
          onConfirm={handleConfirmDelete}
          onCancel={() => setIsDeleteConfirmationVisible(false)}
        />
      )}
      {isBarcodeModalVisible && (
        <BarcodePrintModal
          barcode={barcodeToPrint}
          quantity={barcodeQuantity}
          onQuantityChange={(e) => setBarcodeQuantity(e.value)}
          onPrint={handlePrintBarcode}
          onCancel={() => setIsBarcodeModalVisible(false)}
        />
      )}
    </div>
  );
};

export default InventoryManagement;
