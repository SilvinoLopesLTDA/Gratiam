import PropTypes from "prop-types";
import { SpinnerImg } from "../../loader/Loader";
import styles from "./PayCard.module.scss";
import { FaCheckDouble, FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import {
  deletePayment,
  getPayments,
} from "../../../redux/features/payment/paymentSlice";
import { AiOutlineEye } from "react-icons/ai";
import { MdOutlineDoNotDisturbAlt } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { BACKEND_URL } from "../../../redux/features/payment/paymentService";

const PayCard = ({ payment, completedPayments, isLoading }) => {
  const dispatch = useDispatch();

  const setToComplete = async (payment) => {
    const newFormData = {
      completed: true,
    };
    try {
      await axios.patch(
        `${BACKEND_URL}/api/payments/${payment._id}`,
        newFormData
      );
      toast.success(`Pagamento: ${payment.name} concluido!`);
      dispatch(getPayments());
    } catch (error) {
      toast.error(error.message);
    }
  };

  const setToUncomplete = async (payment) => {
    const newFormData = {
      completed: false,
    };
    try {
      await axios.patch(
        `${BACKEND_URL}/api/payments/${payment._id}`,
        newFormData
      );
      toast.warn(`Pagamento: ${payment.name} desfeito!`);
      dispatch(getPayments());
    } catch (error) {
      toast.error(error.message);
    }
  };

  const delPayment = async (id) => {
    await dispatch(deletePayment(id));
    await dispatch(getPayments());
  };

  const confirmDelete = (id) => {
    Swal.fire({
      title: "Tem certeza?",
      text: "Deseja excluir permanentemente esse item do estoque?",
      icon: "warning",
      width: "50em",
      showCancelButton: true,
      confirmButtonColor: "#EF233C",
      cancelButtonColor: "#2B2D42",
      confirmButtonText: "Sim, Excluir",
      cancelButtonText: "Não, Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        delPayment(id);
        Swal.fire({
          icon: "success",
          title: "Item Excluído",
          text: "O item do seu estoque foi deletado com sucesso!",
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          icon: "info",
          title: "Ação Cancelada",
          text: "Não se preocupe, seu item está seguro :)",
        });
      }
    });
  };

  return (
    <div className={styles.cardContainer}>
      {isLoading && <SpinnerImg />}
      {!isLoading && payment.length === 0 ? (
        <p className={styles.placeholder}>
          -- Nenhum pagamento cadastrado. Por favor, adicione um pagamento!
        </p>
      ) : (
        <>
          <div className="--flex-between --my">
            <h3>
              <a href="#pendentes">Ir para Pagamentos Pendentes</a>
            </h3>
            <h3>
              <a href="#concluidos">Ir para Pagamentos Concluídos</a>
            </h3>
          </div>
          {payment.length > 0 && (
            <div>
              <h2 id="pendentes">Pagamentos Pendentes</h2>
              <div className={styles.gridContainer}>
                {payment
                  .filter((paymentItem) => !paymentItem.completed)
                  .map((paymentItem) => {
                    const { _id, name, description } = paymentItem;
                    const shortDescription =
                      description.substring(0, 145).trim() + "...";
                    return (
                      <div
                        key={_id}
                        className={`${styles.paycard} ${styles.pending}`}
                      >
                        <h2>{name}</h2>
                        <p>{shortDescription}</p>
                        <div className={styles.icons}>
                          <div className={styles.icons_states}>
                            <FaCheckDouble
                              color="green"
                              size={15}
                              onClick={() => setToComplete(paymentItem)}
                            />
                            <MdOutlineDoNotDisturbAlt
                              color="red"
                              size={21}
                              onClick={() => setToUncomplete(paymentItem)}
                            />
                          </div>
                          <div className={styles.icons_actions}>
                            <Link to={`/payment-details/${_id}`}>
                              <AiOutlineEye
                                size={25}
                                color="purple"
                                title="Detalhes"
                              />
                            </Link>
                            <Link to={`/edit-payment/${_id}`}>
                              <FaEdit size={20} color="green" title="Editar" />
                            </Link>
                            <FaTrashAlt
                              size={20}
                              color="red"
                              onClick={() => confirmDelete(_id)}
                              title="Deletar"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {completedPayments?.length > 0 && (
            <div>
              <h2 id="concluidos">Pagamentos Concluídos</h2>
              <div className={styles.gridContainer}>
                {completedPayments.map((completedPayment) => {
                  const { _id, name, description } = completedPayment;
                  const shortDescription =
                    description.substring(0, 145).trim() + "...";
                  return (
                    <div
                      key={_id}
                      className={`${styles.paycard} ${styles.completed}`}
                    >
                      <h2>{name}</h2>
                      <p>{shortDescription}</p>
                      <div className={styles.icons}>
                        <div className={styles.icons_states}>
                          <FaCheckDouble
                            color="green"
                            size={15}
                            onClick={() => setToComplete(completedPayment)}
                          />
                          <MdOutlineDoNotDisturbAlt
                            color="red"
                            size={21}
                            onClick={() => setToUncomplete(completedPayment)}
                          />
                        </div>
                        <div className={styles.icons_actions}>
                          <Link to={`/payment-details/${_id}`}>
                            <AiOutlineEye
                              size={25}
                              color="purple"
                              title="Detalhes"
                            />
                          </Link>
                          <Link to={`/edit-payment/${_id}`}>
                            <FaEdit size={20} color="green" title="Editar" />
                          </Link>
                          <FaTrashAlt
                            size={20}
                            color="red"
                            onClick={() => confirmDelete(_id)}
                            title="Deletar"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

PayCard.propTypes = {
  payment: PropTypes.array.isRequired,
  completedPayments: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
};

export default PayCard;
