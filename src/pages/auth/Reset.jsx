import { Link, useParams } from "react-router-dom";
import Card from "../../components/card/Card";
import styles from "./auth.module.scss";
import { MdPassword } from "react-icons/md";
import { useState } from "react";
import { toast } from "react-toastify";
import { resetPassword } from "../../services/authService";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const initialState = {
  password: "",
  password2: "",
};

const Reset = () => {
  const [formData, setFormData] = useState(initialState);
  const { password, password2 } = formData;
  const [visible, setVisible] = useState(true);

  const { resetToken } = useParams();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const reset = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      return toast.error("A senha teve conter mais de 6 caracteres");
    }

    if (password !== password2) {
      return toast.error(
        "As senhas não iguais, Por favor preencha o campo corretamente"
      );
    }

    const userData = {
      password,
      password2,
    };

    try {
      const data = await resetPassword(userData, resetToken);
      toast.success(data.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={`${styles.auth_square}`}>
      <Card>
        <div className={styles.form_square}>
          <div className="--flex-center">
            <MdPassword size={35} color="#999" />
          </div>
          <h2> Mude a senha </h2>
          <form onSubmit={reset}>
            <div className={styles.fields}>
              <label htmlFor="password"> Senha </label>
              <div className={styles.password}>
                <input
                  type={visible ? "text" : "password"}
                  placeholder={visible ? "123456" : "******"}
                  required
                  id="password"
                  name="password"
                  value={password}
                  onChange={handleInputChange}
                />
                <div
                  className={styles.toggleVisible}
                  onClick={() => setVisible(!visible)}
                >
                  {visible ? (
                    <AiOutlineEye color="#2b2d42" />
                  ) : (
                    <AiOutlineEyeInvisible color="#2b2d42" />
                  )}
                </div>
              </div>
            </div>
            <div className={styles.fields}>
              <label htmlFor="password2"> Confirmar Senha </label>
              <div className={styles.password}>
                <input
                  type={visible ? "text" : "password"}
                  placeholder={visible ? "123456" : "******"}
                  required
                  id="password2"
                  name="password2"
                  value={password2}
                  onChange={handleInputChange}
                />
                <div
                  className={styles.toggleVisible}
                  onClick={() => setVisible(!visible)}
                >
                  {visible ? (
                    <AiOutlineEye color="#2b2d42" />
                  ) : (
                    <AiOutlineEyeInvisible color="#2b2d42" />
                  )}
                </div>
              </div>
            </div>
            <button
              type="submit"
              className={`--btn --btn-primary --btn-block ${styles.btn_square}`}
            >
              {" "}
              Alterar Senha
            </button>
            <div className={styles.links}>
              <p>
                <Link to="/"> {"< "}Voltar</Link>
              </p>
              <p>
                <Link to="/login"> Entrar{" >"} </Link>
              </p>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Reset;
