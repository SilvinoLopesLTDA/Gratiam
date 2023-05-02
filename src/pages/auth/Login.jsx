import { Link } from "react-router-dom"
import Card from "../../components/card/Card"
import styles from "./auth.module.scss"
import { BiLogIn } from "react-icons/bi"

const Login = () => {
  return (
    <div className={`container ${styles.auth}`}>
      <Card> 
        <div className={styles.form}>
          <div className="--flex-center">
            <BiLogIn size={35} color="#999"/>
          </div>
          <h2> Login </h2>
          <span className={styles.register}>
            <p>Não tem uma conta ainda ?<Link to="/register"> Registre-se aqui </Link></p>
          </span>
          <form >
            <input type="email" placeholder="Email" required name="email"/>
            <input type="password" placeholder="Senha" required name="password"/>
            <button type="submit" className="--btn --btn-primary --btn-block"> Entrar </button>
          </form>
          <p>Esqueceu a Senha?<Link to="/forgot"> Reedefina </Link></p>
          <span className={styles.register}>
            <Link to="/"> Home </Link>
          </span>
        </div>
      </Card>
    </div>
  )
}

export default Login