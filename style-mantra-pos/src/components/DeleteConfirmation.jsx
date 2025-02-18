import PropTypes from "prop-types";

const DeleteConfirmation = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded">
        <p>Are you sure you want to delete?</p>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={onCancel}
            className="p-2 bg-gray-500 text-white rounded"
          >
            No
          </button>
          <button
            onClick={onConfirm}
            className="p-2 bg-red-500 text-white rounded"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};
DeleteConfirmation.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default DeleteConfirmation;
