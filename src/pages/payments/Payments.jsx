import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useRedirectLoggedOutUser } from "../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { getPayments } from "../../redux/features/payment/paymentSlice";
import AddPayment from "../../components/payment/addPayment/AddPayment";

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

  useEffect(() => {
    if (isLoggedin === true) {
      dispatch(getPayments());
    }

    if (isError) {
      console.log(message);
    }
  }, [dispatch, isLoggedin, isError, message]);

  return (
    <div>
      <AddPayment payment={payment} isLoading={isLoading} />
    </div>
  );
};

Payments.propTypes = {
  payment: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default Payments;
