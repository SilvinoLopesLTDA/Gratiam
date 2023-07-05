import { useDispatch, useSelector } from "react-redux";
import CartItems from "../../components/cart/CartItems";
import { useEffect } from "react";
import { getCartItems } from "../../redux/features/product/cartSlice";
import { useRedirectLoggedOutUser } from "../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";

const Cart = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (sessionStorage.getItem("shouldReloadDashboard")) {
      window.location.reload();
      sessionStorage.removeItem("shouldReloadDashboard");
    }
  }, []);
  useRedirectLoggedOutUser("/login");

  const isLoggedin = useSelector(selectIsLoggedIn);
  const { cart, isLoading, isError, message } = useSelector(
    (state) => state.cart
  );

  useEffect(() => {
    if (isLoggedin === true) {
      dispatch(getCartItems());
    }

    if (isError) {
      console.log(message);
    }
  }, [dispatch, isLoggedin, isError, message]);

  useEffect(() => {
    if (cart === undefined) {
      dispatch(getCartItems());
    }
  }, [cart, dispatch]);

  if (cart === undefined) {
    return (
      <div>
        Tivemos um problema técnico aqui. Tente novamente mais tarde ou tente
        atualizar a página!
      </div>
    );
  }

  return (
    <div>
      <h2>Carrinho do Cliente</h2>
      <CartItems cartItems={cart} isLoading={isLoading} />
    </div>
  );
};

export default Cart;
