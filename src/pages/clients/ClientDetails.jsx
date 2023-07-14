import { useDispatch, useSelector } from "react-redux";
import { useRedirectLoggedOutUser } from "../../customHook/useRedirectLoggedOutUser";
import { useNavigate, useParams } from "react-router-dom";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { useEffect } from "react";
import { getClient } from "../../redux/features/client/clientSlice";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { SpinnerImg } from "../../components/loader/Loader";

const ClientDetails = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { client, isLoading, isError, message } = useSelector(
    (state) => state.client
  );

  const created = new Date(client.createdAt);
  const updated = new Date(client.updatedAt);

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getClient(id));
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch, id]);

  const handleClick = () => {
    navigate("/clients");
  };

  return (
    <div className="product-detail">
      <button
        className="--btn --btn-primary"
        style={{ margin: "1.5em 0", paddingLeft: ".85em" }}
        onClick={handleClick}
      >
        {" "}
        <MdOutlineKeyboardDoubleArrowLeft style={{ marginRight: "0.3em" }} />
        Voltar{" "}
      </button>
      <h3 className="--mt">Detalhes do Cliente</h3>
      {isLoading && <SpinnerImg />}
      {client && (
        <div className="detail">
          <div className="info">
            <h4>
              <span className="badge">Nome: </span> &nbsp; {client.name}
            </h4>
            <hr />
            <p>
              <b>&rarr; Email: </b> {client.email}
            </p>
            <p>
              <b>&rarr; Telefone: </b>
              {client.phone}
            </p>
            <p>
              <b>&rarr; É Sócio: </b>
              {client.isMember ? "Sim" : "Não"}
            </p>
            <hr />
            <code className="--color-dark">
              Criado em: {created.toLocaleString("pt-BR")}
            </code>
            <br />
            <code className="--color-dark">
              Última Atualização: {updated.toLocaleString("pt-BR")}
            </code>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientDetails;
