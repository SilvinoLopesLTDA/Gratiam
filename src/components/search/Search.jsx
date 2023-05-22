import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./Search.module.scss";
import { BiSearch } from "react-icons/bi";

const Search = ({ value, onChange }) => {
  const [searchTerm, setSearchTerm] = useState(value);

  useEffect(() => {
    setSearchTerm(value);
  }, [value]);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchTerm(inputValue);
    onChange(inputValue);
  };

  return (
    <div className={styles.search}>
      <BiSearch size={18} className={styles.icon} />
      <input
        type="text"
        placeholder="Pesquisar..."
        value={searchTerm}
        onChange={handleInputChange}
      />
    </div>
  );
};

Search.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Search;
