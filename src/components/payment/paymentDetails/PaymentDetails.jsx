import Card from "../../card/Card";
import PropTypes from "prop-types";
import { SpinnerImg } from "../../loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { getPayment } from "../../../redux/features/payment/paymentSlice";
import { useEffect } from "react";
import { useRedirectLoggedOutUser } from "../../../customHook/useRedirectLoggedOutUser";
import { useNavigate, useParams } from "react-router-dom";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import styles from "./PaymentDetails.module.scss";

const PaymentDetails = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { payment, isLoading, isError, message } = useSelector(
    (state) => state.payment
  );

  const created = new Date(payment.createdAt);
  const updated = new Date(payment.updatedAt);

  const handleClick = () => {
    navigate("/payments");
  };

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getPayment(id));
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch, id]);

  return (
    <div className={styles.container}>
      <button
        className="--btn --btn-primary"
        style={{ margin: "1.5em 0", paddingLeft: ".85em" }}
        onClick={handleClick}
      >
        {" "}
        <MdOutlineKeyboardDoubleArrowLeft style={{ marginRight: "0.3em" }} />
        Voltar{" "}
      </button>
      <h3 className="--mt">Detalhes do Pagamento</h3>
      {isLoading && <SpinnerImg />}
      {payment && (
        <div className={styles.pay_detail}>
          <Card cardClass={styles.pay_group_image} >
            {payment.image ? (
              <img src={payment.image.filePath} alt={payment.image.fileName} />
            ) : (
              <div className="image-message">
                <h4>Nenhuma imagem inserida para este pagamento</h4>
              </div>
            )}
          </Card>
          <div className={styles.pay_info}>
            <h4>
              {" "}
              <span>Nome: </span>&nbsp; 
              {payment.name}
            </h4>
            <p>
              {" "}
              <span>Descrição:</span> <br /> {payment.description}
            </p>
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

PaymentDetails.propTypes = {
  payment: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default PaymentDetails;
