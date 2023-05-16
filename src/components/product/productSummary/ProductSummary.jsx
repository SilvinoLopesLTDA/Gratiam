import PropTypes from "prop-types";
import "./ProductSummary.scss";
import { formatNumbers } from "./formatNumbers";
import { AiFillDollarCircle } from "react-icons/ai";
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
  selectTotalStoreValue,
} from "../../../redux/features/product/productSlice";
import { useEffect } from "react";

// Icons
const earningIcon = <AiFillDollarCircle size={40} color="#fff" />;
const productIcon = <BsCart4 size={40} color="#fff" />;
const categoryIcon = <BiCategory size={40} color="#fff" />;
const outOfStockIcon = <BsCartX size={40} color="#fff" />;

const ProductSummary = ({ product }) => {
  const dispatch = useDispatch();
  const totalStoreValue = useSelector(selectTotalStoreValue);
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
          icon={earningIcon}
          title={"Valor Total"}
          count={`R$${formatNumbers(totalStoreValue.toFixed(2))}`}
          bgColor="card2"
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
  product: PropTypes.object.isRequired,
};

export default ProductSummary;
