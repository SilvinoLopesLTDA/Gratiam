import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./ProductForm.scss";
import Card from "../../card/Card";

const ProductForm = ({
  product,
  productImage,
  imagePreview,
  description,
  setDescription,
  handleInputChange,
  handleImageChange,
  saveProduct,
  required,
}) => {
  const styleSpan = {
    fontSize: "1.2rem",
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    const cleanedValue = value.replace(",", ".");
    handleInputChange({ target: { name, value: cleanedValue } });
  };

  return (
    <div className="add-product">
      <form onSubmit={saveProduct}>
        <Card cardClass={"card"}>
          <Card cardClass={"group"}>
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
              <div className="image-preview">
                <img src={imagePreview} alt="Produto..." />
              </div>
            ) : (
              <p> Nenhuma imagem inserida para este produto </p>
            )}
          </Card>
        </Card>

        <div className="blockL">
          <label> Nome {required} </label>
          <input
            type="text"
            placeholder="Notebook..."
            name="name"
            value={product?.name}
            onChange={handleInputChange}
          />
          <label> Categoria {required} </label>
          <input
            type="text"
            placeholder="Eletronicos..."
            name="category"
            value={product?.category}
            onChange={handleInputChange}
          />
          <label>
            {" "}
            Preço{" "}
            <span style={styleSpan}>
              (Coloque o ponto apenas na casa decimal)
            </span>{" "}
            {required}{" "}
          </label>
          <input
            type="text"
            placeholder="2499.99"
            name="price"
            value={product?.price}
            onChange={handlePriceChange}
          />
          <label> Quantidade {required} </label>
          <input
            type="text"
            placeholder="3"
            name="quantity"
            value={product?.quantity}
            onChange={handleInputChange}
          />

          <label> Descrição {required} </label>
          <ReactQuill
            theme="snow"
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
        </div>
      </form>
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

export default ProductForm;
