import PropTypes from "prop-types";
import "./ProductList.scss";
import { SpinnerImg } from "../../loader/Loader";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import { BsFillCartPlusFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import Search from "../../search/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_PRODUCTS,
  selectFilteredProducts,
} from "../../../redux/features/product/filterSlice";
import ReactPaginate from "react-paginate";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  deleteProduct,
  duplicateProduct,
  getProducts,
} from "../../../redux/features/product/productSlice";
import { Link } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import Export from "../../export/Export";
import { addToCart } from "../../../redux/features/product/cartSlice";
import { BiDuplicate } from "react-icons/bi";

const ProductList = ({ product, isLoading }) => {
  const [search, setSearch] = useState("");
  const filteredProduct = useSelector(selectFilteredProducts);
  const dispatch = useDispatch();

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  const delProduct = async (id) => {
    await dispatch(deleteProduct(id));
    await dispatch(getProducts());
  };

  const handleAddToCart = async (id) => {
    await dispatch(addToCart(id));
    await dispatch(getProducts());
  };

  const handleDuplicate = async (id) => {
    await dispatch(duplicateProduct(id));
    await dispatch(getProducts());
  };

  const confirmDelete = (id) => {
    Swal.fire({
      title: "Tem certeza?",
      text: "Deseja excluir permanentemente esse item do estoque?",
      icon: "warning",
      width: "50em",
      showCancelButton: true,
      confirmButtonColor: "#EF233C",
      cancelButtonColor: "#2B2D42",
      confirmButtonText: "Sim, Excluir",
      cancelButtonText: "Não, Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        delProduct(id);
        Swal.fire({
          icon: "success",
          title: "Item Excluido",
          text: "o Item de seu estoque foi deletado com sucesso!",
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          icon: "info",
          title: "Ação Cancelada",
          text: "Não se preocupe, seu item está securo :)",
        });
      }
    });
  };

  // Begin Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(filteredProduct.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredProduct.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredProduct]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProduct.length;
    setItemOffset(newOffset);
  };
  //End Pagination

  useEffect(() => {
    dispatch(FILTER_PRODUCTS({ product, search }));
  }, [product, search, dispatch]);

  return (
    <div className="product-list">
      <hr />
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3> Produtos em Estoque </h3>
          </span>
          <span>
            <Link to="/add-product">
              <button className="--btn --btn-primary">Adicionar Produto</button>
            </Link>
          </span>
          <span>
            <Search value={search} onChange={setSearch} />
          </span>
        </div>
        {isLoading && <SpinnerImg />}
        <div className="table">
          {!isLoading && product.length === 0 ? (
            <p>-- Nenhum Produto Cadastrado. Por favor, adicione um produto</p>
          ) : (
            <>
              <table>
                <thead>
                  <tr>
                    <th> s/n </th>
                    <th> Nome </th>
                    <th> Categoria </th>
                    <th> Cor </th>
                    <th> Custo </th>
                    <th> Preço </th>
                    <th> Quant. </th>
                    <th> Ações </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((product, index) => {
                    const {
                      _id,
                      name,
                      colors,
                      category,
                      cost,
                      price,
                      quantity,
                    } = product;
                    return (
                      <tr key={_id}>
                        <td>{index + 1}</td>
                        <td>{shortenText(name)}</td>
                        <td>{category}</td>
                        <td>
                          {colors.length
                            ? colors.join(", ")
                            : Array.isArray(colors)
                            ? "Nenhuma cor informada."
                            : ""}
                        </td>
                        <td>
                          {"R$"}
                          {cost}
                        </td>
                        <td>
                          {"R$"}
                          {price}
                        </td>
                        <td className={quantity <= 3 ? "low-quantity" : ""}>
                          {quantity}
                        </td>
                        <td className="icons">
                          <span>
                            <Link to={`/product-details/${_id}`}>
                              <AiOutlineEye
                                size={25}
                                color="purple"
                                title="Detalhes"
                              />
                            </Link>
                            <Link to={`/edit-product/${_id}`}>
                              <FaEdit size={20} color="green" title="Editar" />
                            </Link>
                            <FaTrashAlt
                              size={20}
                              color="red"
                              onClick={() => confirmDelete(_id)}
                              title="Deletar"
                            />
                            <BsFillCartPlusFill
                              size={20}
                              color="green"
                              onClick={() => handleAddToCart(_id)}
                              title="Adicionar ao carrinho"
                            />
                            <BiDuplicate
                              size={20}
                              color="blue"
                              onClick={() => handleDuplicate(_id)}
                              title="Duplicar"
                            />
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <Export products={filteredProduct} />
            </>
          )}
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="Próximo >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={10}
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
    </div>
  );
};

ProductList.propTypes = {
  product: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  isLoading: PropTypes.bool,
};

export default ProductList;
