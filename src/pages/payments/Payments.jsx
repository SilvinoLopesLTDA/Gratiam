import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRedirectLoggedOutUser } from "../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import {
  checkExpiredPayments,
  getPayments,
} from "../../redux/features/payment/paymentSlice";
import PaymentContainer from "../../components/payment/PaymentContainer/PaymentContainer";

const Payments = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (sessionStorage.getItem("shouldReloadDashboard")) {
      window.location.reload();
      sessionStorage.removeItem("shouldReloadDashboard");
    }
  }, []);
  useRedirectLoggedOutUser("/login");

  const isLoggedin = useSelector(selectIsLoggedIn);
  const { payment, isLoading, isError, message } = useSelector(
    (state) => state.payment
  );
  const completedPayments = Array.isArray(payment)
    ? payment.filter((item) => item.completed)
    : [];

  useEffect(() => {
    if (isLoggedin === true) {
      dispatch(getPayments());
    }

    if (isError) {
      console.log(message);
    }
  }, [dispatch, isLoggedin, isError, message]);

  const [checkExpiredExecuted, setCheckExpiredExecuted] = useState(false);

  useEffect(() => {
    if (isLoggedin && !checkExpiredExecuted) {
      dispatch(checkExpiredPayments())
        .then(() => {
          setCheckExpiredExecuted(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [dispatch, isLoggedin, checkExpiredExecuted]);

  return (
    <div>
      <PaymentContainer
        payment={payment}
        completedPayments={completedPayments}
        isLoading={isLoading}
      />
    </div>
  );
};

Payments.propTypes = {
  payment: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default Payments;
