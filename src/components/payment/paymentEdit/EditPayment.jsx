import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getPayment, getPayments, selectIsLoading, selectPayments, updatePayment } from "../../../redux/features/payment/paymentSlice";
import { useState } from "react";
import { useEffect } from "react";
import Loader from "../../loader/Loader";
import EditFormPayment from "../PayForm/EditFormPayment";
import axios from "axios";
import { BACKEND_URL } from "../../../redux/features/payment/paymentService";

const EditPayment = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  const paymentEdit = useSelector(selectPayments);

  const [payment, setPayment] = useState(paymentEdit);
  const [paymentImage, setPaymentImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(getPayment(id));
  }, [dispatch, id]);

  useEffect(() => {
    setPayment(paymentEdit);

    setImagePreview(
      paymentEdit && paymentEdit.image ? `${paymentEdit.image.filePath}` : null
    );

    setDescription(
      paymentEdit && paymentEdit.description ? paymentEdit.description : ""
    );
  }, [paymentEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPayment({ ...payment, [name]: value });
  };

  const handleImageChange = (e) => {
    setPaymentImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const savePayment = async () => {
    const formData = new FormData();
    formData.append("name", payment?.name);
    formData.append("phone", payment?.phone);
    formData.append("description", payment?.description);
    formData.append("totalAmount", payment?.totalAmount);
    formData.append("expirateDate", payment?.expirateDate);
    formData.append("image", paymentImage);

    const newFormData = {
      completed: false,
    };
    await axios.patch(`${BACKEND_URL}/api/payments/${payment._id}`, newFormData);
  

    console.log(...formData);

    await dispatch(updatePayment({ id, formData }));
    navigate("/payments");
    await dispatch(getPayments());
  };

  const handleClick = () => {
    navigate("/payments");
    dispatch(getPayments())
  };

  return (
    <div>
      {isLoading && <Loader />}
      <button
        className="--btn --btn-primary"
        style={{ margin: "1.5em 0", paddingLeft: ".85em"}}
        onClick={handleClick}
      >
        {" "}
        <MdOutlineKeyboardDoubleArrowLeft style={{ marginRight: "0.3em" }} />
        Voltar{" "}
      </button>
      <h2> Editar Pagamento </h2>
      <EditFormPayment
        payment={payment}
        paymentImage={paymentImage}
        imagePreview={imagePreview}
        description={description}
        setDescription={setDescription}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        savePayment={savePayment}
      />
    </div>
  );
};

export default EditPayment;
