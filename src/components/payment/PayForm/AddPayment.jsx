import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Card from "../../card/Card";
import "./AddPayment.scss";
import { useDispatch } from "react-redux";
import {
  createPayment,
  getPayments,
} from "../../../redux/features/payment/paymentSlice";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import ReactQuill from "react-quill";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  phone: "",
  totalAmount: "",
  expirateDate: "",
  completed: false,
};

const AddPayment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [paymentData, setPaymentData] = useState(initialState);
  const [paymentImage, setPaymentImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [submittedPayments, setSubmittedPayments] = useState([]);
  const [paymentValue, setPaymentValue] = useState("");
  const [description, setDescription] = useState("");

  const handleInputChange = (e) => {
    if (e.target) {
      const { name, value } = e.target;
      setPaymentData({ ...paymentData, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    setPaymentImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const savePayment = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", paymentData.name);
    formData.append("phone", paymentData.phone);
    formData.append("totalAmount", paymentValue);
    formData.append("expirateDate", paymentData.expirateDate);
    formData.append("description", description);
    formData.append("image", paymentImage);

    await dispatch(createPayment(formData));

    if (
      paymentData.name.trim() !== "" &&
      description.trim() !== "" &&
      paymentData.expirateDate.trim() !== ""
    ) {
      const newPayment = { ...paymentData, totalAmount: paymentValue };
      setSubmittedPayments([...submittedPayments, newPayment]);
      setPaymentData(initialState);
      setPaymentValue("");
      navigate("/payments");
      dispatch(getPayments());
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (paymentData.name && description && paymentData.expirateDate) {
      savePayment(e);
      navigate("/payments");
    } else {
      return toast.error("Por favor, preencha todos os campos obrigatórios.");
    }
  };

  const handlePaymentValueChange = (e) => {
    const { value } = e.target;
    const filteredValue = value.replace(/[^0-9.,]/g, "");
    const dotFilter = filteredValue.replace(",", ".");
    const decimalCount = dotFilter.split(".").length - 1;
    let cleanedValue = dotFilter;
    if (decimalCount > 1) {
      const lastIndex = dotFilter.lastIndexOf(".");
      cleanedValue =
        dotFilter.substring(0, lastIndex) + dotFilter.substring(lastIndex + 1);
    }
    setPaymentValue(cleanedValue);
  };

  const handleClick = () => {
    navigate("/payments");
  };

  return (
    <>
      <button
        className="--btn --btn-primary"
        style={{ margin: "1.5em 0", paddingLeft: ".85em" }}
        onClick={handleClick}
      >
        {" "}
        <MdOutlineKeyboardDoubleArrowLeft style={{ marginRight: "0.3em" }} />
        Voltar{" "}
      </button>
      <h2> Adicionar Pagamento </h2>
      <div className="add-payment">
        <Card cardClass={"card"}>
          <Card cardClass={"group"}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(e);
              }}
            >
              <label> Imagem do Pagamento </label>
              <code className="--color-dark">
                {" "}
                Formatos Suportados: jpg, jpeg, png{" "}
              </code>
              <input
                type="file"
                name="image"
                accept=".jpg, .jpeg, .png"
                onChange={(e) => handleImageChange(e)}
              />
              {imagePreview != null ? (
                <div className="image-container image-preview">
                  <img src={imagePreview} alt="Pagamento..." />
                </div>
              ) : (
                <div className="image-container image-msg">
                  <h4>Nenhuma imagem inserida para este Pagamento</h4>
                </div>
              )}
            </form>
          </Card>
        </Card>

        <div className="blockL" style={{ width: "100%" }}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e);
            }}
          >
            <div className="form-container">
              <div className="form-group --form-control">
                <label htmlFor="name">
                  Nome <span> *</span>
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={paymentData.name}
                  onChange={handleInputChange}
                  className={
                    isSubmitted && paymentData.name === "" ? "highlight" : ""
                  }
                />
              </div>
              <div className="form-group --form-control">
                <label htmlFor="phone">Número Telefone</label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={paymentData.phone}
                  onChange={handleInputChange}
                  className={
                    isSubmitted && paymentData.phone === "" ? "highlight" : ""
                  }
                />
              </div>
              <div className="form-group --form-control">
                <label htmlFor="totalAmount">
                  Valor Total <span> *</span>
                </label>
                <input
                  type="text"
                  name="totalAmount"
                  id="totalAmount"
                  value={paymentValue}
                  onChange={handlePaymentValueChange}
                  className={
                    isSubmitted && paymentValue === ""
                      ? "highlight"
                      : ""
                  }
                />
              </div>
              <div className="form-group --form-control">
                <label htmlFor="expirateDate">
                  Data de Validade <span> *</span>
                </label>
                <input
                  type="date"
                  name="expirateDate"
                  id="expirateDate"
                  value={paymentData.expirateDate}
                  onChange={handleInputChange}
                  className={
                    isSubmitted && paymentData.expirateDate === ""
                      ? "highlight"
                      : ""
                  }
                />
              </div>
              <label style={{ marginBottom: "1rem", marginTop: "1rem" }}>
                {" "}
                Descrição <span> *</span>
              </label>
              <ReactQuill
                theme="snow"
                placeholder="Nenhuma descrição informada"
                value={description}
                onChange={setDescription}
                modules={AddPayment.modules}
                formats={AddPayment.formats}
              />
              <div className="--my">
                <button className="--btn --btn-primary"> Salvar </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

AddPayment.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};

AddPayment.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

AddPayment.propTypes = {
  payment: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default AddPayment;
