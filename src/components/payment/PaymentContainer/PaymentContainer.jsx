import {
  selectIsLoading,
} from "../../../redux/features/payment/paymentSlice";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { SpinnerImg } from "../../loader/Loader";
import PayCard from "../PayCard/PayCard";
import "./PaymentContainer.scss";
import { Link } from "react-router-dom";

const PaymentContainer = ({ payment }) => {
  const isLoading = useSelector(selectIsLoading);

  return (
    <>
      <div className="pay-header">
        {isLoading && <SpinnerImg />}
        <h3> Pagamentos </h3>
        <Link to="/add-payment">
          <button className="--btn --btn-primary">Adicionar Pagamento</button>
        </Link>
      </div>
      <div className="pay-container">
        <PayCard payment={payment} />
      </div>
    </>
  );
};

PaymentContainer.propTypes = {
  payment: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
};

export default PaymentContainer;
