import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPayment, selectPayment } from "../../redux/features/payment/paymentSlice";

const PayCard = ({ id }) => {
  const dispatch = useDispatch();
  const payments = useSelector(selectPayment);

  useEffect(() => {
    dispatch(getPayment(id));
  }, [dispatch, id]);

  console.log(payments);
  console.log(id);

  return (
    <div>
      {payments && (
        <div>
          <h2>{payments.name}</h2>
          <p>{payments.description}</p>
        </div>
      )}
    </div>
  );
};

export default PayCard;

