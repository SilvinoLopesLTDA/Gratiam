import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import ClientForm from "../../components/client/clientForm/ClientForm";
import Loader from "../../components/loader/Loader";
import {
  getClient,
  getClients,
  selectClient,
  selectIsLoading,
  updateClient,
} from "../../redux/features/client/clientSlice";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const EditClient = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);
    
  const clientEdit = useSelector(selectClient);

  const [client, setClient] = useState(clientEdit);

  useEffect(() => {
    dispatch(getClient(id));
  }, [dispatch, id]);

  useEffect(() => {
    setClient(clientEdit);
  }, [clientEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClient({ ...client, [name]: value });
  };

  const saveClient = async () => {
    const formData = {
      name: client.name,
      email: client.email,
      phone: client.phone,
      isMember: client.isMember,
    };

    await dispatch(updateClient({ id, formData }));
    await dispatch(getClients());
    navigate("/clients");
  };

  const handleClick = () => {
    navigate("/clients");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <button
        className="--btn --btn-primary"
        style={{ margin: "1.5em 0", paddingLeft: ".85em" }}
        onClick={handleClick}
      >
        {" "}
        <MdOutlineKeyboardDoubleArrowLeft style={{ marginRight: "0.5em" }} />
        Voltar{" "}
      </button>
      <h3 className="--mt">Alteração de Dados do Cliente</h3>
      <ClientForm
        client={client}
        handleInputChange={handleInputChange}
        saveClient={saveClient}
      />
    </div>
  );
};

export default EditClient;
