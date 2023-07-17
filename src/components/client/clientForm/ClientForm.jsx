import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const ClientForm = ({ client, handleInputChange, saveClient, required }) => {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (client.name && client.email && client.phone && client.isMember) {
      saveClient(client);
      navigate("/clients");
    } else {
      navigate("/add-client");
    }
  };

  return (
    <div className="add-product">
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            {" "}
            Nome <span>{required}</span>
          </label>
          <input
            type="text"
            placeholder="João"
            name="name"
            value={client?.name}
            onChange={handleInputChange}
            className={isSubmitted && client?.name === "" ? "highlight" : ""}
          />
          <label>
            {" "}
            Email <span>{required}</span>
          </label>
          <input
            type="text"
            placeholder="cachorros@email.com"
            name="email"
            value={client?.email}
            onChange={handleInputChange}
            className={isSubmitted && client?.email === "" ? "highlight" : ""}
          />
          <label>
            {" "}
            Telefone <span>{required}</span>
          </label>
          <input
            type="text"
            placeholder="61912345678"
            name="phone"
            value={client?.phone}
            onChange={handleInputChange}
            className={isSubmitted && client?.phone === "" ? "highlight" : ""}
          />
          <label>
            É Sócio? <span>{required}</span>
          </label>
          <select
            name="isMember"
            value={client?.isMember}
            onChange={handleInputChange}
            className={
              isSubmitted && client?.isMember === "" ? "highlight" : ""
            }
          >
            <option value="">Selecione alguma das opções:</option>
            <option value={true}>Sim</option>
            <option value={false}>Não</option>
          </select>
          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              {" "}
              Salvar{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

ClientForm.propTypes = {
  client: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  handleInputChange: PropTypes.func,
  saveClient: PropTypes.func,
  required: PropTypes.string,
};

export default ClientForm;
