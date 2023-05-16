import ReactQuill from "react-quill";
import PropTypes from "prop-types";
import "react-quill/dist/quill.snow.css";
import "./ProductForm.scss";
import Card from "../../card/Card";

const ProductForm = ({
  product,
  // eslint-disable-next-line no-unused-vars
  productImage,
  imagePreview,
  description,
  setDescription,
  handleInputChange,
  handleImageChange,
  saveProduct,
  required,
}) => {
  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    const cleanedValue = value.replace(",", ".");
    handleInputChange({ target: { name, value: cleanedValue } });
  };

  return (
    <div className="add-product">
      <Card cardClass={"card"}>
        <Card cardClass={"group"}>
          <form onSubmit={saveProduct}>
            <label> Imagem do Produto </label>
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
          </form>
        </Card>
      </Card>

      <div className="blockL">
        <form onSubmit={saveProduct}>
          <label>
            {" "}
            Nome <span>{required} </span>
          </label>
          <input
            type="text"
            placeholder="Notebook..."
            name="name"
            value={product?.name}
            onChange={handleInputChange}
          />
          <label>
            {" "}
            Categoria <span> {required} </span>
          </label>
          <input
            type="text"
            placeholder="Eletronicos..."
            name="category"
            value={product?.category}
            onChange={handleInputChange}
          />
          <label>
            {" "}
            Preço <span>(Coloque o ponto apenas na casa decimal)</span>{" "}
            <span>{required}</span>{" "}
          </label>
          <input
            type="text"
            placeholder="2499.99"
            name="price"
            value={product?.price}
            onChange={handlePriceChange}
          />
          <label>
            {" "}
            Quantidade
            <span>{required}</span>
          </label>
          <input
            type="text"
            placeholder="3"
            name="quantity"
            value={product?.quantity}
            onChange={handleInputChange}
          />

          <label style={{ marginBottom: "1rem" }}> Descrição </label>
          <ReactQuill
            theme="snow"
            placeholder="Nenhuma descrição informada"
            value={description}
            onChange={setDescription}
            modules={ProductForm.modules}
            formats={ProductForm.formats}
          />
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

ProductForm.modules = {
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
ProductForm.formats = [
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

ProductForm.propTypes = {
  product: PropTypes.object.isRequired,
  productImage: PropTypes.string,
  imagePreview: PropTypes.string,
  description: PropTypes.string,
  setDescription: PropTypes.func,
  handleInputChange: PropTypes.func.isRequired,
  handleImageChange: PropTypes.func.isRequired,
  saveProduct: PropTypes.func.isRequired,
  required: PropTypes.string.isRequired,
};

export default ProductForm;
