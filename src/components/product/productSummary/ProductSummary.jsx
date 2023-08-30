import PropTypes from "prop-types";
import "./ProductSummary.scss";
import { BsCart4, BsCartX } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import InfoBox from "../../infoBox/InfoBox";
import { useDispatch, useSelector } from "react-redux";
import {
  CALC_CATEGORY,
  CALC_OUTOFSTOCK,
  CALC_STORE_VALUE,
  selectCategory,
  selectOutOfStock,
  selectProduct,
} from "../../../redux/features/product/productSlice";
import { useEffect } from "react";
import { setFilteredProducts } from "../../../redux/features/product/filterSlice";
import { useState } from "react";
import Modal from "../../modal/Modal";
import CategorySummary from "../productList/CategorySummary";

// Icons
const productIcon = <BsCart4 size={40} color="#fff" />;
const categoryIcon = <BiCategory size={40} color="#fff" />;
const outOfStockIcon = <BsCartX size={40} color="#fff" />;

const ProductSummary = ({ product }) => {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const outOfStock = useSelector(selectOutOfStock);
  const category = useSelector(selectCategory);
  const products = useSelector(selectProduct);

  useEffect(() => {
    dispatch(CALC_STORE_VALUE(product));
    dispatch(CALC_OUTOFSTOCK(product));
    dispatch(CALC_CATEGORY(product));
  }, [dispatch, product]);

  const handleAllProductsClick = () => {
    dispatch(setFilteredProducts(products));
  };

  const handleOutOfStockClick = () => {
    const filteredProducts = products.filter(
      (product) => product.quantity === 0
    );
    dispatch(setFilteredProducts(filteredProducts));
  };

  const getCategoryCount = () => {
    const categoryCount = {};

    products.forEach((product) => {
      if (
        Object.prototype.hasOwnProperty.call(categoryCount, product.category)
      ) {
        categoryCount[product.category]++;
      } else {
        categoryCount[product.category] = 1;
      }
    });

    return categoryCount;
  };

  return (
    <div className="product-summary">
      <h3> Status do Estoque </h3>
      <div className="info-summary">
        <InfoBox
          icon={productIcon}
          title={"Total de Produtos"}
          count={product.length}
          bgColor="card1"
          onClick={handleAllProductsClick}
        />
        <InfoBox
          icon={outOfStockIcon}
          title={"Fora de Estoque"}
          count={outOfStock}
          bgColor="card2"
          onClick={handleOutOfStockClick}
        />
        <InfoBox
          icon={categoryIcon}
          title={"Categorias"}
          count={category.length}
          bgColor="card3"
          onClick={() => setIsModalVisible(true)}
        />
        {isModalVisible ? (
          <Modal onClose={() => setIsModalVisible(false)}>
            <CategorySummary
              categories={category}
              getCategoryCount={getCategoryCount}
            />
          </Modal>
        ) : null}
      </div>
    </div>
  );
};

ProductSummary.propTypes = {
  product: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
};

export default ProductSummary;
