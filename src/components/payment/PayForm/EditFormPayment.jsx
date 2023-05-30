// import ReactQuill from "react-quill";
import PropTypes from "prop-types";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import Card from "../../card/Card";
import { useNavigate } from "react-router-dom";

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
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (payment.name && payment.description) {
      savePayment(payment);
      navigate("/payments");
    } else {
      navigate("/edit-payment/:id");
    }
  };

  const savePaymentData = () => {
    const paymentData = {
      ...payment,
    };

    savePayment(paymentData);
  };

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
          <label> Nome</label>
          <input
            type="text"
            placeholder="Boleto 001..."
            name="name"
            value={payment?.name}
            onChange={handleInputChange}
            className={isSubmitted && payment?.name === "" ? "highlight" : ""}
          />
          <label> Descrição</label>
          <textarea
            type="text"
            placeholder="Pagar..."
            name="description"
            style={{
              width: "100%",
              resize: "none",
              fontSize: "1.5em",
              fontWeight: "400",
              fontFamily: "Poppins",
              outline: "none",
              height: "10em",
              padding: ".5em",
            }}
            value={payment?.description}
            onChange={handleInputChange}
            className={
              isSubmitted && payment?.description === "" ? "highlight" : ""
            }
          ></textarea>

          {/* <label style={{ marginBottom: "1rem" }}> Descrição </label>
          <ReactQuill
            theme="snow"
            placeholder="Nenhuma descrição informada"
            value={description}
            onChange={setDescription}
            modules={PaymentForm.modules}
            formats={PaymentForm.formats}
          /> */}

          <div className="--my">
            <button
              type="submit"
              onClick={savePaymentData}
              className="--btn --btn-primary"
            >
              Salvar
            </button>
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
