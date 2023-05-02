import { Link } from "react-router-dom"
import Card from "../../components/card/Card"
import styles from "./auth.module.scss"
import { AiOutlineMail } from "react-icons/ai"

const Forgot = () => {
  return (
    <div className={`container ${styles.auth}`}>
      <Card> 
        <div className={styles.form}>
          <div className="--flex-center">
            <AiOutlineMail size={35} color="#999"/>
          </div>
          <h2> Esqueceu a Senha ? </h2>
          <form >
            <input type="email" placeholder="Email" required name="email"/>
            <button type="submit" className="--btn --btn-primary --btn-block"> Obter Email de Redefinição </button>
          <div className={styles.links}>
            <p><Link to="/"> -Home </Link></p> 
            <p><Link to="/login"> -Entrar </Link></p>
          </div>
          </form>
        </div>
      </Card>
    </div>
  )
}

export default Forgot