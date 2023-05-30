import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Card from "../../card/Card";
import "./PayForm.scss";
import { useDispatch } from "react-redux";
import {
  createPayment,
  getPayments,
} from "../../../redux/features/payment/paymentSlice";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";

const initialState = {
  name: "",
  description: "",
};

const PayForm = ({ payment }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [paymentData, setPaymentData] = useState(initialState);
  const [paymentImage, setPaymentImage] = useState(null);
  const [submittedPayments, setSubmittedPayments] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({ ...paymentData, [name]: value });
  };

  const savePayment = async (e) => {
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
      dispatch(getPayments());
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (paymentData.name && paymentData.description) {
      savePayment(paymentData);
      navigate("/payments");
    } else {
      console.log("Por favor, preencha todos os campos obrigatórios.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImagePreview(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
      setPaymentData((prevState) => ({
        ...prevState,
        image: file,
      }));
      setPaymentImage(file);
    } else {
      setImagePreview(null);
      setPaymentData((prevState) => ({
        ...prevState,
        image: null,
      }));
      setPaymentImage(null);
    }
  };

  const handleClick = () => {
    navigate("/payments");
  };

  return (
    <>
      <button
        className="--btn --btn-primary"
        style={{ margin: "1.5em 0", paddingLeft: ".85em" }}
        onClick={handleClick}
      >
        {" "}
        <MdOutlineKeyboardDoubleArrowLeft style={{ marginRight: "0.3em" }} />
        Voltar{" "}
      </button>
      <h2> Adicionar Pagamento </h2>
      <div className="add-payment">
        <Card cardClass={"card"}>
          <Card cardClass={"group"}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(e);
                savePayment(e);
              }}
            >
              <label> Imagem do Pagamento </label>
              <code className="--color-dark">
                {" "}
                Formatos Suportados: jpg, jpeg, png{" "}
              </code>
              <input
                type="file"
                name="image"
                onChange={(e) => handleImageChange(e)}
              />
              {imagePreview != null ? (
                <div className="image-container image-preview">
                  <img src={imagePreview} alt="Pagamento..." />
                </div>
              ) : (
                <div className="image-container image-msg">
                  <h4>Nenhuma imagem inserida para este Pagamento</h4>
                </div>
              )}
            </form>
          </Card>
        </Card>

        <div className="blockL" style={{ width: "100%" }}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e);
              savePayment(e);
            }}
          >
            <div className="form-container">
              <div className="form-group --form-control">
                <label htmlFor="name">
                  Nome <span> *</span>
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={payment?.name}
                  onChange={handleInputChange}
                  className={
                    isSubmitted && payment?.name === "" ? "highlight" : ""
                  }
                />
              </div>
              <div className="form-group --form-control">
                <label htmlFor="description">
                  {" "}
                  Descrição<span> *</span>
                </label>
                <textarea
                  name="description"
                  id="description"
                  value={payment?.description}
                  onChange={handleInputChange}
                  className={
                    isSubmitted && payment?.description === ""
                      ? "highlight"
                      : ""
                  }
                  cols="30"
                  rows="10"
                  style={{
                    width: "100%",
                    resize: "none",
                    fontSize: "1em",
                    fontWeight: "400",
                    fontFamily: "Poppins",
                    outline: "none",
                    height: "10em",
                    padding: ".5em",
                  }}
                ></textarea>
              </div>
              <div className="--my">
                <button className="--btn --btn-primary"> Salvar </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

PayForm.propTypes = {
  payment: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  handleInputChange: PropTypes.func,
  savePayment: PropTypes.func,
  setPaymentImage: PropTypes.func,
};

export default PayForm;
