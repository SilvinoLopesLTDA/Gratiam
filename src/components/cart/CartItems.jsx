import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import {
  checkout,
  removeCartItem,
  removeUnityItem,
  clearCart,
  getCartItems,
  addToCart,
} from "../../redux/features/product/cartSlice";
import { SpinnerImg } from "../loader/Loader";
import styles from "./Cart.module.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { getAllTransactions } from "../../redux/features/transaction/transactionSlice";
import { FaTrashAlt } from "react-icons/fa";
import { BsPlus } from "react-icons/bs";
import { AiOutlineMinus } from "react-icons/ai";

const initialState = {
  clientId: "",
  paymentMethod: "",
  discountAmount: "",
  discountType: "R$",
  totalAmount: "",
};

const CartItems = ({ cartItems, isLoading }) => {
  const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL;
  const API_URL = `${BACKEND_URL}/api/clients/`;
  const dispatch = useDispatch();
  const [paymentData, setPaymentData] = useState(initialState);
  const [, setIsSubmitted] = useState(false);
  const [clientList, setClientList] = useState([]);
  const [selectOpen] = useState(false);

  useEffect(() => {
    const calculateTotalAmount = () => {
      let subtotal = 0;
      cartItems.forEach((item) => {
        const price = item.product.price;
        const quantity = item.quantity;
        subtotal += price * quantity;
      });

      const discount = parseFloat(paymentData.discountAmount) || 0;
      const total = subtotal - discount;

      setPaymentData((prevPaymentData) => ({
        ...prevPaymentData,
        totalAmount: total.toFixed(2),
      }));
    };

    calculateTotalAmount();
  }, [cartItems, paymentData.discountAmount]);

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

  const saveTrans = async (e) => {
    e.preventDefault();
    const formData = {
      clientId: paymentData.clientId,
      paymentMethod: paymentData.paymentMethod,
      discountType: paymentData.discountType,
      discountAmount: parseFloat(paymentData.discountAmount) || 0,
      totalAmount: calculateTotal().toFixed(2),
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

  const calculateSubtotal = () => {
    let subtotal = 0;
    cartItems.forEach((item) => {
      const price = item.product.price;
      const quantity = item.quantity;
      subtotal += price * quantity;
    });
    return subtotal;
  };

  const calculateDiscount = () => {
    const subtotal = calculateSubtotal();
    const discountAmount = parseFloat(paymentData.discountAmount) || 0;
    const discountType = paymentData.discountType;

    if (discountType === "R$") {
      return discountAmount;
    } else if (discountType === "%") {
      const discountPercent = discountAmount / 100;
      return subtotal * discountPercent;
    }

    return 0;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const discount = calculateDiscount();
    return subtotal - discount;
  };

  const handleAddUnityItem = async (id) => {
    await dispatch(addToCart(id));
    await dispatch(getCartItems());
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (
      paymentData.clientId &&
      paymentData.paymentMethod &&
      paymentData.totalAmount
    ) {
      await saveTrans(e);
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

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    const filteredValue = value.replace(/[^0-9.,]/g, "");
    const dotFilter = filteredValue.replace(",", ".");
    const decimalCount = dotFilter.split(".").length - 1;
    let cleanedValue = dotFilter;
    if (decimalCount > 1) {
      const lastIndex = dotFilter.lastIndexOf(".");
      cleanedValue =
        dotFilter.substring(0, lastIndex) + dotFilter.substring(lastIndex + 1);
    }
    handleInputChange({ target: { name, value: cleanedValue } });
  };

  if (isLoading) {
    return <SpinnerImg />;
  }

  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartItems}>
        {cartItems && cartItems.length === 0 ? (
          <p className={styles.placeholder}>O carrinho está vazio.</p>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Imagem</th>
                  <th>Nome</th>
                  <th>Preço Unitário</th>
                  <th>Quant.</th>
                  <th>Valor Total</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => {
                  const {
                    product: { _id, name, price },
                    quantity,
                  } = item;
                  const totalValue = item.product.price * item.quantity;
                  console.log(item.product.quantity);
                  return (
                    <tr key={_id}>
                      <td className={styles.verticalAlign}>{index + 1}</td>
                      <td>
                        {item.product.image ? (
                          <img
                            src={item.product.image.filePath}
                            alt={item.product.name}
                            width={80}
                            height={80}
                          />
                        ) : (
                          <img
                            src="/public/assets/placeholder.jpg"
                            alt="Placeholder"
                            width={80}
                            height={80}
                          />
                        )}
                      </td>
                      <td className={styles.verticalAlign}>{name}</td>
                      <td className={styles.verticalAlign}>{"R$" + price}</td>
                      <td className={styles.verticalAlign}>{quantity}</td>
                      <td className={styles.verticalAlign}>
                        {formatCurrency(totalValue.toFixed(2))}
                      </td>
                      <td
                        className={`${styles.verticalAlign} ${styles.quantity}`}
                      >
                        <div className={styles.divQuantity}>
                          <button
                            className={styles.quantityButton}
                            onClick={() =>
                              handleRemoveUnityItem(item.product._id)
                            }
                          >
                            <AiOutlineMinus color="white" size={17} />
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={quantity}
                            className={styles.quantityInput}
                            readOnly
                          />
                          <button
                            className={styles.quantityButton}
                            onClick={() => {
                              if (item.product.quantity > 0) {
                                handleAddUnityItem(item.product._id);
                              }
                            }}
                          >
                            <BsPlus color="white" size={17} />
                          </button>
                          <FaTrashAlt
                            color="red"
                            size={24}
                            title="Excluir o item"
                            onClick={() => handleRemoveItem(item.product._id)}
                            style={{ cursor: "pointer" }}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </div>
      {cartItems && cartItems.length > 0 && (
        <div className={styles.cartSummary}>
          <div className={styles.summaryTitle}>Resumo do Pedido</div>
          <div className={styles.summaryRow}>
            <div className={styles.summaryLabel}>Subtotal:</div>
            <div className={styles.summaryValue}>
              <h5>{formatCurrency(calculateSubtotal().toFixed(2))}</h5>
            </div>
          </div>
          <div className={styles.summaryRow}>
            <div className={styles.summaryLabel}>
              Desconto <br /> (em R$ ou %):
            </div>
            <div
              className={styles.summaryValue}
              style={{ display: "flex", alignItems: "center" }}
            >
              <input
                type="text"
                name="discountAmount"
                value={paymentData.discountAmount}
                onChange={handlePriceChange}
                placeholder="Digite o desconto"
              />
              <select
                name="discountType"
                value={paymentData.discountType}
                onChange={handleInputChange}
                style={{ marginLeft: "8px", width: "6rem" }}
              >
                <option value="R$">R$</option>
                <option value="%">%</option>
              </select>
            </div>
          </div>
          <div className={styles.summaryRow}>
            <div className={styles.summaryLabel}>Total:</div>
            <div className={styles.summaryValue}>
              <h4>{formatCurrency(calculateTotal().toFixed(2))}</h4>
            </div>
          </div>
          <div className={styles.summaryRow}>
            <div className={styles.summaryLabel}>Cliente:</div>
            <div className={styles.summaryValue}>
              <select
                name="clientId"
                value={paymentData.clientId}
                onChange={handleInputChange}
              >
                <option value="">Selecione um cliente</option>
                {clientList.map((client) => (
                  <option key={client._id} value={client._id}>
                    {client.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={styles.summaryRow}>
            <div className={styles.summaryLabel}>Método de Pagamento:</div>
            <div className={styles.summaryValue}>
              <select
                name="paymentMethod"
                value={paymentData.paymentMethod}
                onChange={handleInputChange}
              >
                <option value="">Selecione um método de pagamento</option>
                <option value="Crédito">Crédito</option>
                <option value="Débito">Débito</option>
                <option value="Dinheiro">Dinheiro</option>
                <option value="Pix">Pix</option>
              </select>
            </div>
          </div>
          <button
            className={`${styles.cartButton} ${styles.checkoutButton} --btn `}
            onClick={handleCheckout}
          >
            Finalizar Pedido
          </button>
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
