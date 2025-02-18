import PropTypes from "prop-types";

const SearchBar = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search by name or description"
      value={value}
      onChange={onChange}
      className="w-full p-2 border rounded"
    />
  );
};
SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchBar;
