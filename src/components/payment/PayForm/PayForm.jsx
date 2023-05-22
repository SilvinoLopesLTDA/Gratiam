import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Modal from "../../modal/Modal";
import Card from "../../card/Card";

const initialState = {
  name: "",
  description: "",
};

const PayForm = ({
  payment,
  savePayment,
  handleInputChange,
}) => {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [paymentData, setPaymentData] = useState(initialState);

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

  const cancelAction = () => {
    setPaymentData(initialState);
    setImagePreview(null);
    setIsModalVisible(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
  
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
  
    if (file) {
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <div>
      <button
        className="--btn --btn-primary"
        onClick={() => setIsModalVisible(true)}
      >
        Adicionar Pagamento
      </button>
      {isModalVisible ? (
        <Modal
          onClose={() => cancelAction()}
          payClass="payContainer"
          contentClass="content"
        >
          <h2> Adicionar Pagamento </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e);
              savePayment(e);
            }}
          >
            <div className="form-group --form-control">
              <label> Imagem do Produto </label>
              <Card cardClass="group">
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
                    <img src={imagePreview} alt="Produto..." />
                  </div>
                ) : (
                  <div className="image-container image-msg">
                    <h4>Nenhuma imagem inserida para este produto</h4>
                  </div>
                )}
              </Card>
            </div>

            <div className="form-group --form-control">
              <label htmlFor="name">Nome</label>
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
              <label htmlFor="description"> Descrição </label>
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
              ></textarea>
            </div>
          </form>
          <div className="btn-pay">
            <button
              className="--btn"
              style={{
                backgroundColor: "var(--color-dark)",
                color: "var(--color-white)",
              }}
              onClick={() => cancelAction()}
            >
              {" "}
              Cancelar
            </button>
            <button
              className="--btn --btn-primary"
              onClick={(e) => savePayment(e, () => setIsModalVisible(false))}
            >
              {" "}
              Adicionar{" "}
            </button>
          </div>
        </Modal>
      ) : null}
    </div>
  );
};

PayForm.propTypes = {
  payment: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  handleInputChange: PropTypes.func.isRequired,
  savePayment: PropTypes.func.isRequired,
};

export default PayForm;
