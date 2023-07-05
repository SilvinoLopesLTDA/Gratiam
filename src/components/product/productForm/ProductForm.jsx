import ReactQuill from "react-quill";
import PropTypes from "prop-types";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import "./ProductForm.scss";
import Card from "../../card/Card";
import { useNavigate } from "react-router-dom";
import { WithContext as ReactTags } from "react-tag-input";
import { COLORS } from "./colors";

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
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (
      product.name &&
      product.category &&
      product.cost &&
      product.price &&
      product.colors &&
      product.quantity
    ) {
      saveProduct(product);
      navigate("/storage");
    } else {
      navigate("/add-product");
    }
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

  const suggestions = COLORS.map((color) => {
    return {
      id: color,
      text: color,
    };
  });

  const KeyCodes = {
    comma: 188,
    enter: 13,
  };

  const delimiters = [KeyCodes.comma, KeyCodes.enter];

  const [tags, setTags] = useState([]);

  const handleAddition = (tag) => {
    const updatedTags = [...tags, tag];
    setTags(updatedTags);

    const updatedProduct = {
      ...product,
      colors: updatedTags.map((tag) => tag.text),
    };
    handleInputChange({
      target: { name: "colors", value: updatedProduct.colors },
    });
  };

  const handleDelete = (i) => {
    const updatedTags = tags.filter((tag, index) => index !== i);
    setTags(updatedTags);

    const updatedProduct = {
      ...product,
      colors: updatedTags.map((tag) => tag.text),
    };
    handleInputChange({
      target: { name: "colors", value: updatedProduct.colors },
    });
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    setTags(newTags);
  };

  const handleTagClick = (index) => {
    console.log("The tag at index " + index + " was clicked");
  };

  const saveProductData = () => {
    const productData = {
      ...product,
      colors: tags.map((tag) => tag.text),
    };

    saveProduct(productData);
  };

  return (
    <div className="add-product">
      <Card cardClass={"card"}>
        <Card cardClass={"group"}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e);
              saveProduct(e);
            }}
          >
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
            saveProduct(e);
          }}
        >
          <label>
            {" "}
            Nome <span>{required}</span>
          </label>
          <input
            type="text"
            placeholder="Notebook..."
            name="name"
            value={product?.name}
            onChange={handleInputChange}
            className={isSubmitted && product?.name === "" ? "highlight" : ""}
          />
          <label>
            {" "}
            Categoria <span>{required}</span>
          </label>
          <input
            type="text"
            placeholder="Eletrônicos..."
            name="category"
            value={product?.category}
            onChange={handleInputChange}
            className={
              isSubmitted && product?.category === "" ? "highlight" : ""
            }
          />
          <label>
            {" "}
            Custo <span>(Coloque o ponto apenas na casa decimal)</span>{" "}
            <span>{required}</span>
          </label>
          <input
            type="text"
            placeholder="2499.99"
            name="cost"
            value={product?.cost}
            onChange={(e) => handlePriceChange(e)}
            className={isSubmitted && product?.cost === "" ? "highlight" : ""}
          />
          <label>
            {" "}
            Preço <span>(Coloque o ponto apenas na casa decimal)</span>{" "}
            <span>{required}</span>
          </label>
          <input
            type="text"
            placeholder="2499.99"
            name="price"
            value={product?.price}
            onChange={(e) => handlePriceChange(e)}
            className={isSubmitted && product?.price === "" ? "highlight" : ""}
          />
          <label>
            {" "}
            Quantidade <span>{required}</span>
          </label>
          <input
            type="number"
            placeholder="3"
            name="quantity"
            value={product?.quantity}
            onChange={handleInputChange}
            onWheel={(e) => e.currentTarget.blur()}
            onKeyDown={(e) => {
              if (
                e.key === "-" ||
                e.key === "e" ||
                e.key === "+" ||
                e.key === "."
              ) {
                e.preventDefault();
              }
            }}
            className={
              isSubmitted && product?.quantity === "" ? "highlight" : ""
            }
          />
          <label htmlFor="colors"> Cores </label>
          <div className="reactTags">
            <ReactTags
              tags={tags}
              suggestions={suggestions}
              delimiters={delimiters}
              handleDelete={handleDelete}
              handleAddition={handleAddition}
              handleDrag={handleDrag}
              handleTagClick={handleTagClick}
              inputFieldPosition="top"
              placeholder="Insira as cores do produto"
              autocomplete
              editable
            />
          </div>

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
            <button
              type="submit"
              onClick={saveProductData}
              className="--btn --btn-primary"
            >
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
  product: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
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
