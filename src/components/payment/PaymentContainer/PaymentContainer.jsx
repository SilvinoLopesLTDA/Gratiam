import { selectIsLoading } from "../../../redux/features/payment/paymentSlice";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { SpinnerImg } from "../../loader/Loader";
import PayCard from "../PayCard/PayCard";
import "./PaymentContainer.scss";
import { Link } from "react-router-dom";

const PaymentContainer = ({ payment, completedPayments }) => {
  const isLoading = useSelector(selectIsLoading);

  return (
    <>
      {isLoading && <SpinnerImg />}
      <div className="pay-header">
        <h3> Pagamentos </h3>
        <Link to="/add-payment">
          <button className="--btn --btn-primary">Adicionar Pagamento</button>
        </Link>
      </div>
      <hr className="dashed-hr" />
      <div className="pay-container">
        <PayCard payment={payment} completedPayments={completedPayments} />
      </div>
    </>
  );
};

PaymentContainer.propTypes = {
  payment: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  completedPayments: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
    .isRequired,
};

export default PaymentContainer;
