// import ReactQuill from "react-quill";
import PropTypes from "prop-types";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import Card from "../../card/Card";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getPayments } from "../../../redux/features/payment/paymentSlice";
import moment from "moment";

const PayFormEdit = ({
  payment,
  // eslint-disable-next-line no-unused-vars
  paymentImage,
  imagePreview,
  handleInputChange,
  handleImageChange,
  savePayment,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (
      payment.name &&
      payment.totalAmount &&
      payment.description &&
      payment.expirateDate &&
      payment.completed
    ) {
      savePayment(payment);
      navigate("/payments");
      dispatch(getPayments());
    } else {
      navigate("/edit-payment/:id");
    }
  };

  const expirateDate = payment.expirateDate;
  const formattedDate = moment(expirateDate).format("yyyy-MM-DD");

  return (
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
            <label> Imagem do Produto </label>
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
              <label htmlFor="phone">Número Telefone</label>
              <input
                type="text"
                name="phone"
                id="phone"
                value={payment?.phone}
                onChange={handleInputChange}
                className={
                  isSubmitted && payment?.phone === "" ? "highlight" : ""
                }
              />
            </div>
            <div className="form-group --form-control">
              <label htmlFor="totalAmount">
                Valor Total <span> *</span>
              </label>
              <input
                type="text"
                name="totalAmount"
                id="totalAmount"
                value={payment?.totalAmount}
                onChange={handleInputChange}
                className={
                  isSubmitted && payment?.totalAmount === "" ? "highlight" : ""
                }
              />
            </div>
            <div className="form-group --form-control">
              <label htmlFor="expirateDate">
                Data de Validade <span> *</span>
              </label>
              <input
                type="date"
                name="expirateDate"
                id="expirateDate"
                value={formattedDate}
                onChange={handleInputChange}
                className={
                  isSubmitted && payment?.expirateDate === "" ? "highlight" : ""
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
                  isSubmitted && payment?.description === "" ? "highlight" : ""
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
  );
};

PayFormEdit.propTypes = {
  payment: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  paymentImage: PropTypes.string,
  imagePreview: PropTypes.string,
  description: PropTypes.string,
  setDescription: PropTypes.func,
  handleInputChange: PropTypes.func.isRequired,
  handleImageChange: PropTypes.func.isRequired,
  savePayment: PropTypes.func.isRequired,
  required: PropTypes.string,
};

export default PayFormEdit;
