import { useDispatch, useSelector } from "react-redux";
import { LogoutUser } from "../../services/authService";
import { SET_LOGIN, selectName } from "../../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

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
      <div className="--flex-between">
        <h3>
          <span className="--fw-thin">Bem vindo(a) de volta, </span>
          <span className="--color-primary"> {name}</span>
          <span className="--fw-thin">!</span>
        </h3>
        <button className="--btn --btn-primary" onClick={Logout}>
          Sair
        </button>
      </div>
      <hr />
    </div>
  );
};

export default Header;
