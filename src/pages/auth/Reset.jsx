import { Link } from "react-router-dom"
import Card from "../../components/card/Card"
import styles from "./auth.module.scss"
import { MdPassword } from "react-icons/md"

const Reset = () => {
  return (
    <div className={`container ${styles.auth}`}>
      <Card> 
        <div className={styles.form}>
          <div className="--flex-center">
            <MdPassword size={35} color="#999"/>
          </div>
          <h2> Mude a senha </h2>
          <form >
          <input type="password" placeholder="Nova Senha" required name="password"/>
          <input type="password" placeholder="Confirmar Nova Senha" required name="password"/>
            <button type="submit" className="--btn --btn-primary --btn-block"> Alterar Senha</button>
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

export default Reset