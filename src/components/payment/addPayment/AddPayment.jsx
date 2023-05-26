import {
  createPayment,
  selectIsLoading,
  getPayments,
} from "../../../redux/features/payment/paymentSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { SpinnerImg } from "../../loader/Loader";
import PayCard from "../PayCard/PayCard";
import PayForm from "../PayForm/PayForm";
import './AddPayment.scss'

const initialState = {
  name: "",
  description: "",
};

const AddPayment = ({ payment }) => {
  const dispatch = useDispatch();
  const [paymentImage, setPaymentImage] = useState(null);
  const [paymentData, setPaymentData] = useState(initialState);
  const [submittedPayments, setSubmittedPayments] = useState([]);

  const isLoading = useSelector(selectIsLoading);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({ ...paymentData, [name]: value });
  };

  const savePayment = async (e, callback) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", paymentData.name);
    formData.append("description", paymentData.description);
    formData.append("image", paymentImage);
    await dispatch(createPayment(formData));

    if (paymentData.name && paymentData.description) {
      const newPayment = { ...paymentData };
      setSubmittedPayments([...submittedPayments, newPayment]);
      setPaymentData(initialState);
      callback();
      dispatch(getPayments());
    }
  };

  return (
    <>
      <div className="pay-header">
        {isLoading && <SpinnerImg />}
        <h3> Pagamentos </h3>
        <PayForm
          payment={payment}
          savePayment={savePayment}
          handleInputChange={handleInputChange}
          setPaymentImage={setPaymentImage} 
        />
      </div>
      <div className="pay-container">
        <PayCard payment={payment} />
      </div>
    </>
  );
};

AddPayment.propTypes = {
  payment: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
};

export default AddPayment;
