import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import {
  checkout,
  removeCartItem,
  removeUnityItem,
  clearCart,
  getCartItems,
} from "../../redux/features/product/cartSlice";
import { SpinnerImg } from "../loader/Loader";
import styles from "./Cart.module.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { getAllTransactions } from "../../redux/features/transaction/transactionSlice";

const initialState = {
  clientId: "",
  selectedClientName: "",
  paymentMethod: "",
  totalAmount: "",
};

const CartItems = ({ cartItems, isLoading }) => {
  const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;
  const API_URL = `${BACKEND_URL}/api/clients/`;
  const dispatch = useDispatch();
  const [paymentData, setPaymentData] = useState(initialState);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [clientList, setClientList] = useState([]);
  const [selectOpen] = useState(false);
  const [setSelectedClient] = useState("");

  useEffect(() => {
    const calculateTotalAmount = () => {
      let total = 0;
      cartItems.forEach((item) => {
        const price = item.product.price;
        const quantity = item.quantity;
        total += price * quantity;
      });
      setPaymentData((prevPaymentData) => ({
        ...prevPaymentData,
        totalAmount: total.toFixed(2),
      }));
    };

    calculateTotalAmount();
  }, [cartItems]);

  const handleRemoveItem = async (id) => {
    await dispatch(removeCartItem(id));
    await dispatch(getCartItems());
  };

  const handleRemoveUnityItem = async (id) => {
    await dispatch(removeUnityItem(id));
    await dispatch(getCartItems());
  };

  const handleClearCart = async () => {
    await dispatch(clearCart());
    await dispatch(getCartItems());
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData((prevPaymentData) => ({
      ...prevPaymentData,
      [name]: value,
    }));
  };

  const handleSelectChange = (e) => {
    const { value } = e.target;
    setSelectedClient(value);
    const selectedClientName = clientList.find(
      (client) => client._id === value
    )?.name;
    setPaymentData((prevPaymentData) => ({
      ...prevPaymentData,
      clientId: value,
      selectedClientName: selectedClientName || "",
    }));
  };

  const saveTrans = async () => {
    const formData = {
      clientId: paymentData.clientId,
      paymentMethod: paymentData.paymentMethod,
      totalAmount: paymentData.totalAmount,
    };

    await dispatch(checkout(formData));

    if (
      paymentData.clientId &&
      paymentData.paymentMethod &&
      paymentData.totalAmount
    ) {
      setPaymentData(initialState);
      dispatch(getAllTransactions());
    }
    handleClearCart();
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (
      paymentData.clientId &&
      paymentData.paymentMethod &&
      paymentData.totalAmount
    ) {
      saveTrans();
      dispatch(getAllTransactions());
    } else {
      console.log("Por favor, preencha todos os campos obrigatórios.");
    }
  };

  useEffect(() => {
    const fetchClientList = async () => {
      try {
        const response = await axios.get(API_URL);
        const data = response.data;
        setClientList(data);
      } catch (error) {
        console.error("Erro ao listar os clientes:", error);
      }
    };
    fetchClientList();
  }, [API_URL, selectOpen]);

  if (isLoading) {
    return <SpinnerImg />;
  }

  return (
    <div>
      <div className={styles.cardContainer}>
        {cartItems && cartItems.length === 0 ? (
          <p className={styles.placeholder}>O carrinho está vazio.</p>
        ) : (
          cartItems.map((item) => {
            return (
              <div key={item.product._id} className={styles.cartcard}>
                <h3>{item.product.name}</h3>
                <div className="--flex-between">
                  <h4>R${item.product.price}</h4>
                  <h4 className="--ml2">Quantidade: {item.quantity}</h4>
                </div>
                <button
                  className="--btn --btn-primary"
                  onClick={() => handleRemoveItem(item.product._id)}
                >
                  Remover Item
                </button>
                <button
                  className="--btn --btn-primary"
                  onClick={() => handleRemoveUnityItem(item.product._id)}
                >
                  Remover Unidade
                </button>
              </div>
            );
          })
        )}
      </div>
      {cartItems && cartItems.length > 0 && (
        <div>
          <div className="--flex-between">
            <div className="form-group --form-control">
              <label htmlFor="client">
                Cliente <span> *</span>
              </label>
              <select
                name="client"
                id="client"
                value={paymentData.clientId}
                onChange={handleSelectChange}
                className={
                  isSubmitted && !paymentData.clientId ? "highlight" : ""
                }
              >
                <option value="">Selecione um cliente</option>
                {clientList.map((client) => {
                  return (
                    <option
                      key={client._id}
                      value={client._id}
                      data-client-name={client.name}
                    >
                      {client.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-group --form-control">
              <label htmlFor="paymentMethod">
                Método de Pagamento <span> *</span>
              </label>
              <select
                name="paymentMethod"
                id="paymentMethod"
                className={
                  isSubmitted && paymentData?.paymentMethod === ""
                    ? "highlight"
                    : ""
                }
                value={paymentData?.paymentMethod}
                onChange={handleInputChange}
              >
                <option value="">Selecione um método de pagamento</option>
                <option value="Crédito">Crédito</option>
                <option value="Débito">Débito</option>
                <option value="Dinheiro">Dinheiro</option>
                <option value="Pix">Pix</option>
              </select>
            </div>
            <div className="form-group --form-control">
              <label htmlFor="totalAmount">
                Valor Total <span> *</span>
              </label>
              <input
                type="text"
                name="totalAmount"
                id="totalAmount"
                value={paymentData.totalAmount}
                onChange={handleInputChange}
                className={`${
                  isSubmitted && !paymentData.totalAmount ? "highlight" : ""
                } disabled`}
                readOnly
              />
            </div>
          </div>
          <hr />
          <div className="--flex-between --mt">
            <button className="--btn --btn-primary" onClick={handleClearCart}>
              Limpar Carrinho
            </button>
            <button className="--btn --btn-primary" onClick={handleCheckout}>
              Concluir Compra
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

CartItems.propTypes = {
  cartItems: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  isLoading: PropTypes.bool,
};

export default CartItems;
