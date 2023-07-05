import PropTypes from "prop-types";
import { SpinnerImg } from "../loader/Loader";
import styles from "./TransContainer.module.scss";
import moment from "moment/moment";

const TransContainer = ({ transaction, isLoading }) => {
  if (isLoading) {
    return <SpinnerImg />;
  }

  return (
    <div className={styles.cardContainer}>
      {transaction && transaction.length === 0 ? (
        <p>Não há transações aqui!</p>
      ) : (
        [...transaction].reverse().map((item, index) => {
          const createdDate = item.createdAt;
          const utcDate = moment.utc(createdDate);
          const formattedDate = utcDate
            .utcOffset(-3)
            .format("DD/MM/YYYY - HH:mm");
          return (
            <div key={item._id} className={styles.cartcard}>
              <h2>Transação #{index + 1}</h2>
              <p>ID da transação: {item._id}</p>
              <p>Nome do cliente: {item.client.name}</p>
              <p>Quantidade de itens: {item.items.length}</p>
              <p>Valor Total: R${item.totalAmount}</p>
              <p>Método de Pagamento: {item.paymentMethod}</p>
              <p>Data de criação: {formattedDate}</p>
            </div>
          );
        })
      )}
    </div>
  );
};

TransContainer.propTypes = {
  transaction: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  isLoading: PropTypes.bool,
};

export default TransContainer;
