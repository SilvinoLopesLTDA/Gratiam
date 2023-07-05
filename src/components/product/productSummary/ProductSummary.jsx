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
} from "../../../redux/features/product/productSlice";
import { useEffect } from "react";

// Icons
const productIcon = <BsCart4 size={40} color="#fff" />;
const categoryIcon = <BiCategory size={40} color="#fff" />;
const outOfStockIcon = <BsCartX size={40} color="#fff" />;

const ProductSummary = ({ product }) => {
  const dispatch = useDispatch();
  const outOfStock = useSelector(selectOutOfStock);
  const category = useSelector(selectCategory);

  useEffect(() => {
    dispatch(CALC_STORE_VALUE(product));
    dispatch(CALC_OUTOFSTOCK(product));
    dispatch(CALC_CATEGORY(product));
  }, [dispatch, product]);

  return (
    <div className="product-summary">
      <h3> Status do Estoque </h3>
      <div className="info-summary">
        <InfoBox
          icon={productIcon}
          title={"Total de Produtos"}
          count={product.length}
          bgColor="card1"
        />
        <InfoBox
          icon={outOfStockIcon}
          title={"Fora de Estoque"}
          count={outOfStock}
          bgColor="card3"
        />
        <InfoBox
          icon={categoryIcon}
          title={"Categorias"}
          count={category.length}
          bgColor="card4"
        />
      </div>
    </div>
  );
};

ProductSummary.propTypes = {
  product: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
};

export default ProductSummary;
