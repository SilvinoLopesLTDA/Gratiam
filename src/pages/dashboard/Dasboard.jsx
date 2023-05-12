import { useDispatch, useSelector } from "react-redux";
import { useRedirectLoggedOutUser } from "../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { getProducts } from "../../redux/features/product/productSlice";
import { useEffect } from "react";
import ProductList from "../../components/product/productList/ProductList";
import ProductSummary from "../../components/product/productSummary/ProductSummary";

const Dasboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (sessionStorage.getItem("shouldReloadDashboard")) {
      window.location.reload();
      sessionStorage.removeItem("shouldReloadDashboard");
    }
  }, []);
  useRedirectLoggedOutUser("/login");

  const isLoggedin = useSelector(selectIsLoggedIn);
  const { product, isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (isLoggedin === true) {
      dispatch(getProducts());
    }

    if (isError) {
      console.log(message);
    }
  }, [dispatch, isLoggedin, isError, message]);

  return (
    <div>
      <ProductSummary product={product} />
      <ProductList product={product} isLoading={isLoading} />
    </div>
  );
};

export default Dasboard;
