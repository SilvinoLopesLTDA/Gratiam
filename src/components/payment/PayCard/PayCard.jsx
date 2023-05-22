import PropTypes from "prop-types";
import Loader from "../../loader/Loader";
import styles from "./PayCard.module.scss";

const PayCard = ({ payment, isLoading }) => {
  const currentItems = Array.isArray(payment) ? payment : [];
  return (
    <div className={styles.cardContainer}>
      {isLoading && <Loader />}
      {!isLoading && payment.length === 0 ? (
        <p>-- Nenhum pagamento cadastrado. Por favor, adicione um pagamento!</p>
      ) : (
        currentItems.map((payment) => {
          const { _id, name, description } = payment;
          return (
            <div key={_id} className={styles.paycard}>
              <h2>{name}</h2>
              <p>{description}</p>
            </div>
          );
        })
      )}
    </div>
  );
};

PayCard.propTypes = {
  payment: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  isLoading: PropTypes.bool,
};

export default PayCard;
