import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getProduct,
  getProducts,
  selectIsLoading,
  selectProduct,
  updateProduct,
} from "../../redux/features/product/productSlice";
import { useEffect, useState } from "react";
import ProductForm from "../../components/product/productForm/ProductForm";
import Loader from "../../components/loader/Loader";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  const productEdit = useSelector(selectProduct);

  const [product, setProduct] = useState({});
  const [productImage, setProductImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");
  const [colors, setColors] = useState([]);

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    setProduct(productEdit);

    setImagePreview(
      productEdit && productEdit.image ? productEdit.image.filePath : null
    );

    setDescription(
      productEdit && productEdit.description ? productEdit.description : ""
    );

    if (productEdit && productEdit.colors) {
      setColors(productEdit.colors);
    }
  }, [productEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };
  
  const saveProduct = async () => {
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("category", product.category);
    formData.append("quantity", product.quantity);
    formData.append("cost", product.cost);
    formData.append("price", product.price);
    formData.append("colors", colors);
    formData.append("description", description);
    if (productImage) {
      formData.append("image", productImage);
    }
    
    await dispatch(updateProduct({ id, formData }));
    await dispatch(getProducts());
    navigate("/storage");
  };

  const handleClick = () => {
    navigate("/storage");
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
      <h3 className="--mt">Edição de Produto</h3>
      {productEdit && (
        <ProductForm
          product={product}
          productImage={productImage}
          imagePreview={imagePreview}
          description={description}
          colors={colors}
          setColors={setColors}
          setDescription={setDescription}
          handleInputChange={handleInputChange}
          handleImageChange={handleImageChange}
          saveProduct={saveProduct}
        />
      )}
    </div>
  );
};

export default EditProduct;
