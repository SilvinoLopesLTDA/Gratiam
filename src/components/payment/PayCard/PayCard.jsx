import PropTypes from "prop-types";
import Loader from "../../loader/Loader";
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

const PayCard = ({ payment, isLoading }) => {
  const dispatch = useDispatch();
  const currentItems = Array.isArray(payment) ? payment : [];

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
          title: "Item Excluido",
          text: "o Item de seu estoque foi deletado com sucesso!",
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          icon: "info",
          title: "Ação Cancelada",
          text: "Não se preocupe, seu item está securo :)",
        });
      }
    });
  };

  return (
    <div className={styles.cardContainer}>
      {isLoading && <Loader />}
      {!isLoading && payment.length === 0 ? (
        <p className={styles.placeholder}>
          -- Nenhum pagamento cadastrado. Por favor, adicione um pagamento!
        </p>
      ) : (
        currentItems.map((payment) => {
          const { _id, name, description } = payment;
          const shortDescription = description.substring(0, 145).trim() + "...";
          return (
            <div
              key={_id}
              className={
                payment.completed
                  ? `${styles.paycard} ${styles.completed}`
                  : `${styles.paycard}`
              }
            >
              <h2>{name}</h2>
              <p>{shortDescription}</p>
              <div className={styles.icons}>
                <div className={styles.icons_states}>
                  <FaCheckDouble
                    color="green"
                    size={15}
                    onClick={() => setToComplete(payment)}
                  />
                  <MdOutlineDoNotDisturbAlt
                    color="red"
                    size={21}
                    onClick={() => setToUncomplete(payment)}
                  />
                </div>
                <div className={styles.icons_actions}>
                    <Link to={`/payment-details/${_id}`}>
                      <AiOutlineEye size={25} color="purple" title="Detalhes" />
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
        })
      )}
    </div>
  );
};

PayCard.propTypes = {
  payment: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  isLoading: PropTypes.bool,
};

export default PayCard;
