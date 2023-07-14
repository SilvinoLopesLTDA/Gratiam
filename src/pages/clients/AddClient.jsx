import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createClient,
  getClients,
  selectIsLoading,
} from "../../redux/features/client/clientSlice";
import Loader from "../../components/loader/Loader";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import ClientForm from "../../components/client/clientForm/ClientForm";

const initialState = {
  name: "",
  email: "",
  phone: "",
  isMember: "",
};

const AddClient = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [client, setClient] = useState(initialState);

  const isLoading = useSelector(selectIsLoading);

  const { name, email, phone, isMember } = client;

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

    await dispatch(createClient(formData));

    if (
      name &&
      email &&
      phone &&
      isMember &&
      name.trim() !== "" &&
      email.trim() !== "" &&
      phone.trim() !== "" &&
      isMember.trim() !== ""
    ) {
      navigate("/clients");
      dispatch(getClients());
    }
  };

  const handleClick = () => {
    navigate("/clients");
    dispatch(getClients());
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
        <MdOutlineKeyboardDoubleArrowLeft style={{ marginRight: "0.3em" }} />
        Voltar{" "}
      </button>
      <h3 className="--mt">Cadastrar Cliente</h3>
      <p style={{ color: "var(--color-primary)" }}> * Campo obrigatório</p>
      <ClientForm
        client={client}
        handleInputChange={handleInputChange}
        saveClient={saveClient}
        required={"*"}
      />
    </div>
  );
};

export default AddClient;
