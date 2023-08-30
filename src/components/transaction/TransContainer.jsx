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
        [...transaction].map((item, index) => {
          const createdDate = item.createdAt;
          const utcDate = moment.utc(createdDate);
          const formattedDate = utcDate
            .utcOffset(-3)
            .format("DD/MM/YYYY - HH:mm");
          const reversedIndex = transaction.length - index;
          return (
            <div key={item._id} className={styles.cartcard}>
              <h2>Transação #{reversedIndex}</h2>
              <p>
                <b>ID da transação:</b> {item._id}
              </p>
              <p>
                <b>Nome do cliente:</b> {item.client.name}
              </p>
              <p>
                <b>Quantidade de produtos:</b> {item.items.length}
              </p>
              <p>
                <b>Valor de desconto:</b>{" "}
                {item.discount && item.discount.amount ? (
                  <>
                    {item.discount.type === "R$" && "R$"}
                    {item.discount.amount}
                    {item.discount.type === "%" && "%"}
                  </>
                ) : (
                  "R$0"
                )}
              </p>
              <p>
                <b>Valor Pago:</b> R${item.totalAmount}
              </p>
              <p>
                <b>Método de Pagamento:</b> {item.paymentMethod}
              </p>
              <p>
                <b>Data de criação:</b> {formattedDate}
              </p>
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
