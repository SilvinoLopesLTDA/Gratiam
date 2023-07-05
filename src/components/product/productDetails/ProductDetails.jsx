import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useRedirectLoggedOutUser } from "../../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { getProduct } from "../../../redux/features/product/productSlice";
import Card from "../../card/Card";
import { SpinnerImg } from "../../loader/Loader";
import "./ProductDetails.scss";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";

const ProductDetails = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { product, isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  const created = new Date(product.createdAt);
  const updated = new Date(product.updatedAt);

  const { price, quantity } = product;
  const storeValue = price * quantity;

  const stockStatus = (quantity) => {
    if (quantity > 0) {
      return <span className="--color-success"> Em Estoque </span>;
    }
    return <span className="--color-danger"> Fora de Estoque</span>;
  };

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getProduct(id));
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch, id]);

  const handleClick = () => {
    navigate("/storage");
  };

  const removeTagsFromHTML = (html) => {
    const parser = new DOMParser();
    const parsedDocument = parser.parseFromString(html, "text/html");
    return parsedDocument.body.textContent || "Descrição não disponível!";
  };

  const formatDescription = (html) => {
    const descriptionWithoutTags = removeTagsFromHTML(html);
    return descriptionWithoutTags;
  };

  const formattedDescription = formatDescription(product.description);

  return (
    <div className="product-detail">
      <button
        className="--btn --btn-primary"
        style={{ margin: "1.5em 0", paddingLeft: ".85em" }}
        onClick={handleClick}
      >
        {" "}
        <MdOutlineKeyboardDoubleArrowLeft style={{ marginRight: "0.3em" }} />
        Voltar{" "}
      </button>
      <h3 className="--mt">Detalhes do Produto</h3>
      {isLoading && <SpinnerImg />}
      {product && (
        <div className="detail">
          <Card cardClass="group_image">
            {product?.image ? (
              <img src={product.image.filePath} alt={product.image.fileName} />
            ) : (
              <div className="image-message">
                <h4>Nenhuma imagem inserida para este produto</h4>
              </div>
            )}
          </Card>
          <div className="info">
            <h4>Disponibilidade: {stockStatus(product.quantity)}</h4>
            <hr />
            <h4>
              <span className="badge">Nome: </span> &nbsp; {product.name}
            </h4>
            <p>
              <b>&rarr; SKU: </b> {product.sku}
            </p>
            <p>
              <b>&rarr; Categoria: </b> {product.category}
            </p>
            <p>
              <b>&rarr; Cor: </b>{" "}
              {product.colors && product.colors.length > 0
                ? product.colors.join(", ")
                : "Nenhuma cor informada."}
            </p>
            <p>
              <b>&rarr; Custo: </b> {"R$"}
              {product.cost}
            </p>
            <p>
              <b>&rarr; Preço: </b> {"R$"}
              {product.price}
            </p>
            <p>
              <b>&rarr; Quantidade em Estoque: </b> {product.quantity}
            </p>
            <p>
              <b>&rarr; Valor em Estoque: </b> {"R$"}
              {storeValue.toFixed(2)}
            </p>
            <hr />
            <p>
              <b>&rarr; Descrição: </b>
            </p>
            <div>
              {product.description ? (
                <p className="desc">{formattedDescription}</p>
              ) : (
                <p className="desc">Descrição não disponível!</p>
              )}
            </div>
            <hr />
            <code className="--color-dark">
              Criado em: {created.toLocaleString("pt-BR")}
            </code>
            <br />
            <code className="--color-dark">
              Ultima Atualização: {updated.toLocaleString("pt-BR")}
            </code>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
