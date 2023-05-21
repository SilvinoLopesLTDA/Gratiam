import { useState } from "react";
import "./Payments.scss";
import Modal from "../../components/modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createPayment,
  selectIsLoading,
  selectPayment,
} from "../../redux/features/payment/paymentSlice";
import Loader from "../../components/loader/Loader";
import PayCard from "../../components/payment/PayCard";
import Card from "../../components/card/Card";

const initialState = {
  name: "",
  description: "",
};

const Payments = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [payment, setPayment] = useState(initialState);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [productImage, setProductImage] = useState("");

  const isLoading = useSelector(selectIsLoading);

  const { name, description } = payment;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPayment({ ...payment, [name]: value });
  };

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const cancelAction = () => {
    setPayment(initialState);
    setImagePreview(null);
    setIsModalVisible(false);
  };
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    
    if (payment.name && payment.description) {
      console.log("Formulário enviado!");
    } else {
      console.log("Por favor, preencha todos os campos obrigatórios.");
    }
  };

  const { paymentSelect } = useSelector(selectPayment); // Acessa o estado atualizado do payment

  const savePayment = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    console.log(name)
    formData.append("description", description);
    formData.append("image", productImage);
  
    await dispatch(createPayment(formData)).unwrap(); // Aguarda a resposta da ação
  
  
    if (paymentSelect && paymentSelect._id) {
      navigate("/payments");
      setPayment(initialState);
      setImagePreview(null);
      setIsModalVisible(false);
    }
  };

  return (
    <>
      <div className="pay-header">
        {isLoading && <Loader />}
        <h3> Pagamentos </h3>
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
                  value={name}
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
                  value={description}
                  onChange={handleInputChange}
                  className={
                    isSubmitted && payment?.description === ""
                      ? "highlight"
                      : ""
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
              <button className="--btn --btn-primary" onClick={savePayment}>
                {" "}
                Adicionar{" "}
              </button>
            </div>
          </Modal>
        ) : null}
      </div>
      <div className="pay-container">
        {payment && payment._id && <PayCard id={payment._id} />}
      </div>
    </>
  );
};

export default Payments;
