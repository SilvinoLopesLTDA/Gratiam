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

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  const productEdit = useSelector(selectProduct);

  const [product, setProduct] = useState(productEdit);
  const [productImage, setProductImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  useEffect(() => {
    setProduct(productEdit);

    setImagePreview(
      productEdit && productEdit.image ? `${productEdit.image.filePath}` : null
    );

    setDescription(
      productEdit && productEdit.description ? productEdit.description : ""
    );
  }, [productEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", product?.name);

    formData.append("category", product?.category);
    formData.append("quantity", product?.quantity);
    formData.append("price", product?.price);
    formData.append("description", description);
    if (productImage) {
      formData.append("image", productImage);
    }

    console.log(...formData);

    await dispatch(updateProduct({ id, formData }));
    await dispatch(getProducts());
    navigate("/dashboard");
  };

  const handleClick = () => {
    sessionStorage.setItem("shouldReloadDashboard", "true");
    navigate("/dashboard", { replace: true });
  };

  return (
    <div>
      {isLoading && <Loader />}
      <button
        className="--btn --btn-primary"
        style={{ marginTop: "1em" }}
        onClick={handleClick}
      >
        {" "}
        Voltar{" "}
      </button>
      <h3 className="--mt">Edição de Produto</h3>
      <ProductForm
        product={product}
        productImage={productImage}
        imagePreview={imagePreview}
        description={description}
        setDescription={setDescription}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        saveProduct={saveProduct}
      />
    </div>
  );
};

export default EditProduct;
