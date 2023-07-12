import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTransactions } from "../../redux/features/transaction/transactionSlice";
import TransContainer from "../../components/transaction/TransContainer";

const Transactions = () => {
  const dispatch = useDispatch();
  const { transaction, isLoading, isError, message } = useSelector(
    (state) => state.transaction
  );

  useEffect(() => {
    dispatch(getAllTransactions());
    if (isError) {
      console.log(message);
    }
  }, [dispatch, isError, message]);

  return (
    <div>
      <h3 style={{ margin: "2rem 0" }}>Histórico de Transações</h3>
      <TransContainer transaction={transaction} isLoading={isLoading} />
    </div>
  );
};

export default Transactions;
