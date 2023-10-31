import { useDispatch, useSelector } from "react-redux";
import { LogoutUser } from "../../services/authService";
import { SET_LOGIN, selectName } from "../../redux/features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { BsCartFill } from "react-icons/bs";
import "./Header.scss"

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = useSelector(selectName);

  const Logout = async () => {
    await LogoutUser();
    await dispatch(SET_LOGIN(false));
    navigate("/login");
  };

  return (
    <div className="--pad header">
      <div className="--flex-between header_layout">
        <h3>
          <span className="--fw-thin">Bem vindo(a) de volta, </span>
          <span className="--color-primary"> {name}</span>
          <span className="--fw-thin">!</span>
        </h3>
        <div className="--flex-between">
          <Link to="/cart">
            <BsCartFill size={33} color="red" title="Carrinho" />
          </Link>
          <button className="--btn --btn-primary btn_logout" onClick={Logout}>
            Sair
          </button>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Header;
