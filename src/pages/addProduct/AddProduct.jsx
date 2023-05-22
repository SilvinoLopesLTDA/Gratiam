import { useState } from "react";
import ProductForm from "../../components/product/productForm/ProductForm";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  selectIsLoading,
} from "../../redux/features/product/productSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";

const initialState = {
  name: "",
  category: "",
  quantity: "",
  cost: "",
  price: "",
  colors: [],
};

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(initialState);
  const [productImage, setProductImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");

  const isLoading = useSelector(selectIsLoading);

  const { name, category, quantity, cost, colors, price } = product;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const generateSku = (category) => {
    const letter = category.slice(0, 3).toUpperCase();
    const number = Date.now();
    const sku = letter + "-" + number;
    return sku;
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("sku", generateSku(category));
    formData.append("category", category);
    formData.append("quantity", quantity);
    formData.append("cost", cost);
    formData.append("price", price);
    colors.forEach((color) => {
      formData.append("colors[]", color);
    });
    formData.append("description", description);
    formData.append("image", productImage);

    console.log(...formData);

    await dispatch(createProduct(formData));

    if (
      name &&
      category &&
      quantity &&
      cost &&
      price &&
      name.trim() !== "" &&
      category.trim() !== "" &&
      quantity.trim() !== "" &&
      cost.trim() !== "" &&
      price.trim() !== ""
    ) {
      navigate("/storage");
    }
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Adicionar Produto</h3>
      <p style={{ color: "var(--color-primary)" }}> * Campo obrigatório</p>
      <ProductForm
        product={product}
        productImage={productImage}
        imagePreview={imagePreview}
        description={description}
        setDescription={setDescription}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        saveProduct={saveProduct}
        required={"*"}
      />
    </div>
  );
};

export default AddProduct;
