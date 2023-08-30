import PropTypes from "prop-types";
import styles from "./CategorySummary.module.scss";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import { useEffect } from "react";

const CategorySummary = ({ categories, getCategoryCount }) => {
  // Begin Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(categories.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(categories.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, categories]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % categories.length;
    setItemOffset(newOffset);
  };
  // End Pagination
  return (
    <div className={styles.categorySummary}>
      <h3>Resumo da Categoria</h3>
      <table className={styles.categoryTable}>
        <thead>
          <tr>
            <th>Categoria</th>
            <th>Quantidade</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((category, index) => {
            return (
              <tr key={index}>
                <td>{category}</td>
                <td>{getCategoryCount()[category]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="Próximo >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< Voltar"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeLinkClassName="activePage"
      />
    </div>
  );
};

CategorySummary.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    })
  ).isRequired,
  getCategoryCount: PropTypes.number,
};

export default CategorySummary;
